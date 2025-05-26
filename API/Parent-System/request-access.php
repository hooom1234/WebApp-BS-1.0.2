<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";
$dbname = "report";

// เชื่อมต่อฐานข้อมูล
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}
$conn->set_charset("utf8");

// รับข้อมูลจาก client
$data = json_decode(file_get_contents("php://input"), true);
$parent = $data['parent'] ?? '';
$student = $data['student'] ?? '';

// ตรวจสอบข้อมูลที่ส่งมา
if (!$parent || !$student) {
    die(json_encode(["error" => "Parent ID and Student ID are required"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// ตรวจสอบว่ามีคำขออยู่แล้วหรือไม่
$check = $conn->prepare("SELECT * FROM request WHERE student = ? AND parent = ?");
$check->bind_param("ss", $student, $parent);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["message" => "คุณได้ส่งคำขอไปแล้ว"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
$check->close();

// เพิ่มคำขอใหม่ (status เริ่มต้นเป็น false)
$sql = "INSERT INTO request (student, parent, status) VALUES (?, ?, 'false')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $student, $parent);
$stmt->execute();
$stmt->close();

$conn->close();

echo json_encode(["message" => "ส่งคำขอเรียบร้อยแล้ว"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
