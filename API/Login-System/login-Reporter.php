<?php
/*header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";  // ค่าเริ่มต้นของ XAMPP
$password = "MyPeenut";       // ค่าเริ่มต้นของ XAMPP
$dbname = "user";     // ชื่อฐานข้อมูลของคุณ

$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}


// ถ้ารับ GET request ให้ debug ข้อมูลทั้งหมด
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql_debug = "SELECT * FROM reporteracc";
    $result_debug = $conn->query($sql_debug);

    if ($result_debug->num_rows > 0) {
        
        $users = [];
        while ($row = $result_debug->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $users]);
    } else {
        echo json_encode(["status" => "error", "message" => "No data found"]);
    }
    exit();
}

// รับข้อมูลจาก React Native
$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data["id"];
$user_password = $data["password"];

// ตรวจสอบข้อมูลในฐานข้อมูล
$sql = "SELECT * FROM reporteracc WHERE id = '$user_id' AND password = '$user_password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "success", "message" => "Login Success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid ID or Password"]);


}


$conn->close();*/
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
$user_id = $data["id"];
$user_password = $data["password"];

// ใช้ Prepared Statements ป้องกัน SQL Injection
$sql = "SELECT id FROM reporteracc WHERE id = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $user_id, $user_password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $_SESSION["user_id"] = $user_id; // เก็บ user_id ใน session
    echo json_encode(["status" => "success", "message" => "Login Success", "id" => $user_id]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid ID or Password"]);
}

$stmt->close();
$conn->close();

?>
