<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";
$dbname = "user";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"];
$password = $data["password"];

// ใช้ Prepared Statements เพื่อป้องกัน SQL Injection
$stmt = $conn->prepare("SELECT password FROM studentacc WHERE id = ?");
$stmt->bind_param("s", $id); // "s" หมายถึง string
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // ตรวจสอบรหัสผ่านโดยใช้ password_verify เพื่อเปรียบเทียบกับรหัสผ่านที่แฮช
    if (password_verify($password, $row["password"])) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Student not found"]);
}

$stmt->close();
$conn->close();
?>
