<?php
// แสดง error สำหรับ debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ตั้งค่าหัวข้อ HTTP
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// เชื่อมต่อฐานข้อมูล
$servername = "localhost";
$username = "root";
$password = "";
$database = "user"; // แก้ตรงนี้ถ้าฐานข้อมูลชื่ออื่น

$conn_user = new mysqli($servername, $username, $password, $database);
$conn_user->set_charset("utf8");

// ตรวจสอบการเชื่อมต่อ
if ($conn_user->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'เชื่อมต่อฐานข้อมูลไม่สำเร็จ']);
    exit;
}

// ตรวจสอบว่าเป็น POST หรือไม่
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // รับค่า JSON ที่ส่งมา
    $input = json_decode(file_get_contents("php://input"), true);

    // ตรวจสอบและป้องกัน SQL injection
    $id = isset($input['id']) ? mysqli_real_escape_string($conn_user, $input['id']) : null;
    $fname = isset($input['fname']) ? mysqli_real_escape_string($conn_user, $input['fname']) : null;
    $lname = isset($input['lname']) ? mysqli_real_escape_string($conn_user, $input['lname']) : null;
    $pass = isset($input['pass']) ? mysqli_real_escape_string($conn_user, $input['pass']) : null;

    // ตรวจสอบความครบถ้วนของข้อมูล
    if (!$id || !$fname || !$lname || !$pass) {
        echo json_encode(['status' => 'error', 'message' => 'กรุณากรอกข้อมูลให้ครบ']);
        exit;
    }

    // ตรวจสอบว่า id ซ้ำหรือไม่
    $checkSQL = "SELECT id FROM studentacc WHERE id = '$id'";
    $checkResult = mysqli_query($conn_user, $checkSQL);
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(['status' => 'error', 'message' => 'รหัสผู้ใช้นี้ถูกใช้ไปแล้ว']);
        exit;
    }

    // เพิ่มข้อมูลเข้า database
    $insertSQL = "INSERT INTO studentacc (id, fname, lname, pass) VALUES ('$id', '$fname', '$lname', '$pass')";
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
