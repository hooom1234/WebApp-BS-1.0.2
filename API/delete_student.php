<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";
$dbname = "user";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$id = $_GET['id'] ?? '';

if (!empty($id)) {
    $sql = "DELETE FROM studentacc WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "ลบข้อมูลสำเร็จ"]);
    } else {
        echo json_encode(["success" => false, "message" => "ลบข้อมูลไม่สำเร็จ"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ไม่มี ID ที่ส่งมา"]);
}

$conn->close();
?>
