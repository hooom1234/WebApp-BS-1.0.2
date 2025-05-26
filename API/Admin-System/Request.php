<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";
$dbname = "report";

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลไม่ได้']);
    exit;
}

// =============================
// ดึงข้อมูลแบบเจาะจง (GET)
// =============================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['student'])) {
        $student = $conn->real_escape_string($_GET['student']);

        $sql = "SELECT student, parent, status FROM request WHERE student = '$student'";
        $result = $conn->query($sql);

        if ($result && $row = $result->fetch_assoc()) {
            echo json_encode($row, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['error' => 'ไม่พบข้อมูล'], JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo json_encode(['error' => 'กรุณาระบุ student'], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// =============================
// อัปเดตข้อมูล status (PATCH)
// =============================
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = json_decode(file_get_contents("php://input"), true);

    $student = $conn->real_escape_string($input['student'] ?? '');
    $status  = $conn->real_escape_string($input['status'] ?? '');

    if (!$student || !$status) {
        echo json_encode(['status' => 'error', 'message' => 'กรุณาระบุ student และ status']);
        exit;
    }

    // ตรวจสอบว่ามีข้อมูลของ student นี้หรือไม่ก่อนอัปเดต
    $checkSql = "SELECT 1 FROM request WHERE student = '$student'";
    $checkResult = $conn->query($checkSql);
    if ($checkResult->num_rows === 0) {
        echo json_encode(['status' => 'error', 'message' => 'ไม่พบ student นี้ในระบบ']);
        exit;
    }

    $sql = "UPDATE request SET status = '$status' WHERE student = '$student'";

    if ($conn->query($sql)) {
        echo json_encode(['status' => 'success'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'อัปเดตล้มเหลว: ' . $conn->error]);
    }

    exit;
}

?>
