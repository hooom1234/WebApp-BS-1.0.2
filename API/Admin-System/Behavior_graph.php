<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";

// Connect to database
$conn = new mysqli($servername, $username, $password, "report");
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
$conn->set_charset("utf8");

// Get studentId only
$studentId = isset($_GET['student']) ? $_GET['student'] : null;

if (!$studentId) {
    die(json_encode(["error" => "Student ID is required"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// Query the student table
$sql = "SELECT level, time FROM student WHERE studentId = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode(["error" => "SQL Prepare Failed: " . $conn->error]));
}
$stmt->bind_param("s", $studentId);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();
$conn->close();

// Return data as JSON
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
