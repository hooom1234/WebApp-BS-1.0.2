<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// เชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "MyPeenut";

$conn_user = new mysqli($servername, $username, $password, "user");
$conn_user->set_charset("utf8");

if ($conn_user->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit;
}

// ตรวจสอบว่าเป็น POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    $id = isset($input['id']) ? mysqli_real_escape_string($conn_user, $input['id']) : null;
    $password = isset($input['password']) ? mysqli_real_escape_string($conn_user, $input['password']) : null;

    // ตรวจสอบความครบถ้วน
    if (!$id || !$password) {
        echo json_encode(['status' => 'error', 'message' => 'กรุณากรอก id และ password ให้ครบ']);
        exit;
    }

    // ตรวจสอบว่า id ซ้ำหรือไม่
    $checkSQL = "SELECT id FROM parentacc WHERE id = '$id'";
    $checkResult = mysqli_query($conn_user, $checkSQL);
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(['status' => 'error', 'message' => 'รหัสผู้ใช้นี้ถูกใช้ไปแล้ว']);
        exit;
    }

    // เพิ่มข้อมูล
    $insertSQL = "INSERT INTO parentacc (id, password) VALUES ('$id', '$password')";
    $result = mysqli_query($conn_user, $insertSQL);

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'เพิ่มผู้รายงานสำเร็จ'], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'เกิดข้อผิดพลาด: ' . mysqli_error($conn_user)]);
    }

    exit;
}

// ถ้าไม่ใช่ POST
echo json_encode(['status' => 'error', 'message' => 'ไม่อนุญาตให้เรียกใช้งานด้วย method นี้']);
exit;
?>
