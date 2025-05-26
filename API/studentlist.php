<?php
header("Content-Type: application/json; charset=UTF-8");  // กำหนด charset เป็น UTF-8
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";  
$password = "MyPeenut";      
$dbname = "user";    

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

$conn->set_charset("utf8");  // บังคับ MySQL ใช้ UTF-8

$sql = "SELECT id, fname, lname FROM studentacc";  
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "SQL error: " . $conn->error], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)); 
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$conn->close();

// ใช้ JSON_UNESCAPED_UNICODE เพื่อให้ JSON แสดงภาษาไทยถูกต้อง
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
