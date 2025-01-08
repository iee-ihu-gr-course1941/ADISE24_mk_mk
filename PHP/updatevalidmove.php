<?php
header('Content-Type: application/json');
include 'dbconnect.php';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$stmt_update = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET validmove = 'no' ");
$stmt_update->execute();
$stmt_update->close();


    echo json_encode(['status' => 'success']);
}
?>