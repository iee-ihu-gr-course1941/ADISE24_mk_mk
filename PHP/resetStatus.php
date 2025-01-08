<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $stmt_verify = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'not active',winner = NULL, round=0 , validmove ='yes'");
    $stmt_verify->execute();

    if ($stmt_verify->affected_rows > 0) {
        $response2 = array("status" => "success", "message" => "successful update!");
        $stmt_verify->close();
    } else {
        $response2 = array("status" => "error", "message" => "error for the update!");
    }


    echo json_encode($response2);

    // Close both statements
}
?>
