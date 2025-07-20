<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start(); // เริ่ม session

$servername = "localhost";
$username = "root";  
$password = "MyPeenut";       
$dbname = "user";     

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}

// รับข้อมูลจาก React Native
$data = json_decode(file_get_contents("php://input"), true);
$admin_id = $data["id"];
$admin_password = $data["password"];

// ใช้ Prepared Statements ป้องกัน SQL Injection
$sql = "SELECT id FROM adminacc WHERE id = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $admin_id, $admin_password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $_SESSION["admin_id"] = $admin_id; // เก็บ admin_id ใน session

    // Session Saving System

    $logInf = fopen("../../log.num", "w"); // creates a file
    fwrite($logInf, $admin_id);
    fclose($logInf);
    /*$logInf = fopen("../../log.hs", "w"); // hashes the file
    fwrite($logInf, hash("sha256", $admin_id));
    fclose($logInf);*/
    $logInf = fopen("../../log.typ", "w"); // creates another file, user type
    fwrite($logInf, "a");
    fclose($logInf);
    /*$logInf = fopen("../../log.hst", "w"); // hashes the file
    fwrite($logInf, hash("sha256", $admin_id));
    fclose($logInf);*/
    $logInf = fopen("../../log.tim", "w"); // creates a timestamp
    fwrite($logInf, time());
    fclose($logInf);
    $logInf = fopen("../../log.key", "w"); // creates a thing
    fwrite($logInf, $admin_password);
    fclose($logInf);

    
    echo json_encode(["status" => "success", "message" => "Login Success", "id" => $admin_id]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid ID or Password"]);
}

$stmt->close();
$conn->close();
?>
