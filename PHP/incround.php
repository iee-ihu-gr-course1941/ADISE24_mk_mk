<?php
header('Content-Type: application/json');
include 'dbconnect.php';

$stmt_update = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET round = round + 1");
$stmt_update->execute();
$stmt_update->close();


    echo json_encode(['status' => 'success']);

?>