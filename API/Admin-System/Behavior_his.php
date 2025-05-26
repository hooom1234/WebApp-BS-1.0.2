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

// รับ studentId จาก query parameter
$studentId = isset($_GET['student']) ? $_GET['student'] : '';

if (!$studentId) {
    die(json_encode(["error" => "Student ID is required"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// ดึงข้อมูลของ student
$sql = "SELECT studentId, type, level, detail, time, reporter FROM student WHERE studentId = ?";
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
