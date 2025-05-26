<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";

// สร้างการเชื่อมต่อกับฐานข้อมูล
$conn_user = new mysqli($servername, $username, $password, "user");
$conn_report = new mysqli($servername, $username, $password, "report");

// ตั้งค่า character set ให้เป็น UTF-8
$conn_user->set_charset("utf8");
$conn_report->set_charset("utf8");

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
if ($conn_user->connect_error || $conn_report->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลไม่ได้']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = mysqli_real_escape_string($conn_user, $_GET['id']);

        $sql = "
            SELECT s.id, s.fname, s.lname, l.parent 
            FROM user.studentacc s 
            LEFT JOIN report.link l 
            ON s.id = l.student
            WHERE s.id = '$id'
        ";
        
        $result = mysqli_query($conn_user, $sql);

        if ($result) {
            if ($row = mysqli_fetch_assoc($result)) {
                echo json_encode($row, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['error' => 'ไม่พบข้อมูลนักเรียน'], JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(['error' => 'ดึงข้อมูลล้มเหลว: ' . mysqli_error($conn_user)], JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo json_encode(['error' => 'ไม่ได้ระบุรหัสนักเรียน (id)'], JSON_UNESCAPED_UNICODE);
    }
    exit;
}



// =============================
// UPDATE ข้อมูล
// =============================
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    
    $input = json_decode(file_get_contents("php://input"), true);

    // รับค่าที่ส่งมา (ถ้ามี)
    $id = $input['id'] ;
    $fname = $input['fname'];
    $lname = $input['lname'] ;
    $parent = $input['parent'] ?? null;

    if ($id && ($fname || $lname || $parent)) {
        
        $updateFields = [];
        if ($fname !== null) $updateFields[] = "s.fname = '" . mysqli_real_escape_string($conn_user, $fname) . "'";
        if ($lname !== null) $updateFields[] = "s.lname = '" . mysqli_real_escape_string($conn_user, $lname) . "'";
        if ($parent !== null) $updateFields[] = "l.parent = '" . mysqli_real_escape_string($conn_user, $parent) . "'";

        $updateSQL = "
            UPDATE user.studentacc s
            JOIN report.link l ON (s.id = l.student)
            SET " . implode(", ", $updateFields) . "
            WHERE s.id = '" . mysqli_real_escape_string($conn_user, $id) . "'
        ";

        $result = mysqli_query($conn_user, $updateSQL);

        if ($result) {
            echo json_encode(['status' => 'success'], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'อัปเดตล้มเหลว: ' . mysqli_error($conn_user)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ข้อมูลไม่ครบ']);
    }
    exit;
}

?>
