<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";  
$password = "MyPeenut";      
$dbname = "report";    

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

$conn->set_charset("utf8");

$parentId = isset($_GET['parent']) ? $_GET['parent'] : '';
$studentId = isset($_GET['student']) ? $_GET['student'] : '';

if (!$parentId || !$studentId) {
    die(json_encode(["error" => "Parent ID and Student ID are required"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// ตรวจสอบว่ามี request ที่ได้รับอนุญาตหรือไม่
$check_sql = "SELECT * FROM request WHERE parent = ? AND student = ? AND status = 'true'";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("ss", $parentId, $studentId);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows == 0) {
    die(json_encode(["error" => "Access denied"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// ดึงข้อมูลของ student
$sql = "SELECT * FROM student WHERE studentId = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $studentId);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
