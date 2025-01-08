<?php

header('Content-Type: application/json');

global $mysqli,$stmt_verify,$stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';
   $stmt_update = $mysqli->prepare("UPDATE ataxx.ataxx_board
SET
  `content` = CASE
    WHEN `row` = 0 AND `column` = 0 THEN 'white'
    WHEN `row` = 0 AND `column` = 1 THEN NULL
    WHEN `row` = 0 AND `column` = 2 THEN NULL
    WHEN `row` = 0 AND `column` = 3 THEN NULL
    WHEN `row` = 0 AND `column` = 4 THEN NULL
    WHEN `row` = 0 AND `column` = 5 THEN NULL
    WHEN `row` = 0 AND `column` = 6 THEN 'black'

    WHEN `row` = 1 AND `column` = 0 THEN NULL
    WHEN `row` = 1 AND `column` = 1 THEN NULL
    WHEN `row` = 1 AND `column` = 2 THEN NULL
    WHEN `row` = 1 AND `column` = 3 THEN NULL
    WHEN `row` = 1 AND `column` = 4 THEN NULL
    WHEN `row` = 1 AND `column` = 5 THEN NULL
    WHEN `row` = 1 AND `column` = 6 THEN NULL

    WHEN `row` = 2 AND `column` = 0 THEN NULL
    WHEN `row` = 2 AND `column` = 1 THEN NULL
    WHEN `row` = 2 AND `column` = 2 THEN NULL
    WHEN `row` = 2 AND `column` = 3 THEN NULL
    WHEN `row` = 2 AND `column` = 4 THEN NULL
    WHEN `row` = 2 AND `column` = 5 THEN NULL
    WHEN `row` = 2 AND `column` = 6 THEN NULL

    WHEN `row` = 3 AND `column` = 0 THEN NULL
    WHEN `row` = 3 AND `column` = 1 THEN NULL
    WHEN `row` = 3 AND `column` = 2 THEN NULL
    WHEN `row` = 3 AND `column` = 3 THEN NULL
    WHEN `row` = 3 AND `column` = 4 THEN NULL
    WHEN `row` = 3 AND `column` = 5 THEN NULL
    WHEN `row` = 3 AND `column` = 6 THEN NULL

    WHEN `row` = 4 AND `column` = 0 THEN NULL
    WHEN `row` = 4 AND `column` = 1 THEN NULL
    WHEN `row` = 4 AND `column` = 2 THEN NULL
    WHEN `row` = 4 AND `column` = 3 THEN NULL
    WHEN `row` = 4 AND `column` = 4 THEN NULL
    WHEN `row` = 4 AND `column` = 5 THEN NULL
    WHEN `row` = 4 AND `column` = 6 THEN NULL

    WHEN `row` = 5 AND `column` = 0 THEN NULL
    WHEN `row` = 5 AND `column` = 1 THEN NULL
    WHEN `row` = 5 AND `column` = 2 THEN NULL
    WHEN `row` = 5 AND `column` = 3 THEN NULL
    WHEN `row` = 5 AND `column` = 4 THEN NULL
    WHEN `row` = 5 AND `column` = 5 THEN NULL
    WHEN `row` = 5 AND `column` = 6 THEN NULL

    WHEN `row` = 6 AND `column` = 0 THEN 'black'
    WHEN `row` = 6 AND `column` = 1 THEN NULL
    WHEN `row` = 6 AND `column` = 2 THEN NULL
    WHEN `row` = 6 AND `column` = 3 THEN NULL
    WHEN `row` = 6 AND `column` = 4 THEN NULL
    WHEN `row` = 6 AND `column` = 5 THEN NULL
    WHEN `row` = 6 AND `column` = 6 THEN 'white'
    ELSE `content`
  END;"
   );
        $stmt_update->execute();
    
        
    

    if ($stmt_update->affected_rows > 0) {
        $response = array("status" => "success", "message" => "there were changes");
        
        $stmt_update->close();
    } else {
        $response = array("status" => "success", "message" => "no changes");
    }


    echo json_encode($response);

    // Close both statements
   

}
?>
