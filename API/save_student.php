<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "MyPeenut";
$dbname = "report";

$conn = new mysqli($servername, $username, $password, $dbname);

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->studentId, $data->type, $data->level, $data->detail, $data->time, $data->reporter)) {
    echo json_encode(["status" => "error", "message" => "ข้อมูลไม่ครบถ้วน"]);
    exit;
}

$studentId = $data->studentId;
$type = $data->type;
$level = $data->level;
$detail = $data->detail;
$time = $data->time;
$reporter = $data->reporter;

$sql = "INSERT IGNORE INTO student (studentId, type, level, detail, time, reporter) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $studentId, $type, $level, $detail, $time, $reporter);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
