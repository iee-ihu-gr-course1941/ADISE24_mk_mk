<?php

header('Content-Type: application/json');

// Include database connection
include 'dbconnect.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    // Decode the incoming JSON data
    $getupdateStatusBoardData = json_decode(file_get_contents('php://input'), true);
    $rowst=$getupdateStatusBoardData['rowst'];
    $columnst=$getupdateStatusBoardData['columnst'];   
    $rowdes = $getupdateStatusBoardData['rowdes'];
    $columndes = $getupdateStatusBoardData['columndes'];
    $tag = $getupdateStatusBoardData['tag'];

   if($rowst !=-1 && $columnst !=-1){
    $stmt = $mysqli->prepare("UPDATE ataxx.ataxx_board SET content = NULL WHERE `row` = ? and `column` = ?  ");
        $stmt->bind_param("ii", $rowst, $columnst);
        $stmt->execute();
        $stmt->close();
   }
   $stmt = $mysqli->prepare("UPDATE ataxx.ataxx_board SET content = ? WHERE `row`= ? AND `column` = ?");
   $stmt->bind_param("sii", $tag, $rowdes, $columndes);
   $stmt->execute();
   $stmt->close();

   $directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],  // Horizontal and vertical
    [-1, -1], [1, 1], [-1, 1], [1, -1]  // Diagonal directions
      ];


  foreach ($directions as $direction) {
    $dx = $direction[0];
    $dy = $direction[1];

    $adjacentX = $rowdes + $dx;
    $adjacentY = $columndes + $dy;

    // Check if the adjacent cell is within the board boundaries
    if ($adjacentX >= 0 && $adjacentX <= 6 && $adjacentY >= 0 && $adjacentY <= 6) {
        // Select content of the adjacent cell
        $stmt = $mysqli->prepare("SELECT content FROM ataxx.ataxx_board WHERE `row` = ? AND `column` = ?");
        $stmt->bind_param("ii", $adjacentX, $adjacentY);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();

        if ($result->num_rows > 0) {
          

            $result2 = $result->fetch_assoc();
            // If the adjacent cell contains the opponent's pawn, change it to the current player's pawn
            if ($result2['content'] !== null && $result2['content'] !== $tag) {
                // Update opponent's pawn to current player's pawn
                $stmt = $mysqli->prepare("UPDATE ataxx.ataxx_board SET content = ? WHERE `row` = ? AND `column` = ?");
                $stmt->bind_param("sii", $tag, $adjacentX, $adjacentY);
                $stmt->execute();
                $stmt->close();
                $response = array("status" => "success", "message" => "successful change the pawn!");
                echo json_encode($response);
            }
        }
    }


   }

   

}

?>