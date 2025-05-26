<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "MyPeenut";


$conn_user = new mysqli($servername, $username, $password, "user");
if ($conn_user->connect_error) {
    die(json_encode(["error" => "Connection to user DB failed: " . $conn_user->connect_error]));
}
$conn_user->set_charset("utf8");


$conn_report = new mysqli($servername, $username, $password, "report");
if ($conn_report->connect_error) {
    die(json_encode(["error" => "Connection to report DB failed: " . $conn_report->connect_error]));
}
$conn_report->set_charset("utf8");

// รับ parentId
$parentId = isset($_GET['parent']) ? $_GET['parent'] : null;
if (!$parentId) {
    die(json_encode(["error" => "Parent ID is required"], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// ดึง student พร้อมสถานะคำขอ
$sql1 = "SELECT 
            s.id, 
            s.fname, 
            s.lname,
            r.status
         FROM user.studentacc s
         INNER JOIN report.link l ON s.id = l.student
         LEFT JOIN report.request r ON r.student = s.id AND r.parent = ?
         WHERE l.parent = ?";

$stmt1 = $conn_report->prepare($sql1);
if (!$stmt1) {
    die(json_encode(["error" => "SQL1 Prepare Failed: " . $conn_report->error]));
}
$stmt1->bind_param("ss", $parentId, $parentId);
$stmt1->execute();
$result1 = $stmt1->get_result();

$students = [];
while ($row = $result1->fetch_assoc()) {
    $students[] = $row;
}
$stmt1->close();
// see เฉยๆ

$sql2 = "SELECT * 
        FROM  report.link l
        WHERE l.parent = ?";

$stmt2 = $conn_report->prepare($sql2);
if (!$stmt2) {
    die(json_encode(["error" => "SQL2 Prepare Failed: " . $conn_report->error]));
}
$stmt2->bind_param("s", $parentId);
$stmt2->execute();
$result2 = $stmt2->get_result();

$links = [];
while ($row = $result2->fetch_assoc()) {
    $links[] = $row;
}
$stmt2->close();


$conn_user->close();
$conn_report->close();


echo json_encode([
    "students" => $students, 
    "links" => $links
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);