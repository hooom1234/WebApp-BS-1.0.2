<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start(); // เริ่ม session

if (isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "success", "user_id" => $_SESSION["user_id"]]);
} else {
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
}
?>
