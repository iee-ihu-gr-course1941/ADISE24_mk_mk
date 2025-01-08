<?php

header('Content-Type: application/json');

global $mysqli, $stmt_verify, $stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    // Parse the incoming JSON data
    $updateStatusData = json_decode(file_get_contents('php://input'), true);
    $token = $updateStatusData['id'];

    // Verify player token
    $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM ataxx.paiktes WHERE idPaikth = ?");
    $stmt_verify->bind_param("s", $token);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($etiketaPaikth);
    $stmt_verify->fetch();
    $updateStatusData['id']=$etiketaPaikth;    

    // Fetch the round number
    $stmt_verify_1 = $mysqli->prepare("SELECT round FROM ataxx.statuspaixnidiou");
    $stmt_verify_1->execute();
    $res = $stmt_verify_1->get_result();
    $result = $res->fetch_row();
    $stmt_verify_1->close();
    $updateStatusData['round'] = $result[0];

    $stmt_lose = $mysqli->prepare("SELECT winner FROM ataxx.statuspaixnidiou");
    $stmt_lose->execute();
    $stmt_lose->store_result();
    $stmt_lose->bind_result($gameResult);
    $stmt_lose->fetch();
    $stmt_lose->close();

    
   
    $stmt_lose = $mysqli->prepare("SELECT validmove FROM ataxx.statuspaixnidiou");
    $stmt_lose->execute();
    $stmt_lose->store_result();
    $stmt_lose->bind_result($gamevalidmove);
    $stmt_lose->fetch();
    $stmt_lose->close();





    // Check if the game needs to be initialized
    if ($result[0] > 0 && $result[0] < 2) {
        $stmt_update_1 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'initialized'");
        $stmt_update_1->execute();
        $stmt_update_1->close();

        if ($gameResult != NULL) {
            $updateStatusData['end_of_game'] = true;
            if (strcmp($etiketaPaikth, "white") == 0) {
                $updateStatusData['winner'] = $gameResult;
            } else {
                $updateStatusData['winner'] = $gameResult;
            }
        }

        
        
    }
    // Game is active
    else if ($result[0] == 2) {
        $stmt_update_2 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'active'");
        $stmt_update_2->execute();
        $stmt_update_2->close();


    }
    // Check if the game should be ended
    else if ($result[0] > 2) {
        $sql_check_empty_ss = "SELECT * FROM ataxx.ataxx_board WHERE content IS NULL";
        $sql_check_empty = $mysqli->prepare($sql_check_empty_ss);
        $sql_check_empty->execute();
        $sql_check_empty->store_result();
        
        if (strcmp($etiketaPaikth, "white") == 0) {
            $sql_check_winner_ss = "SELECT * FROM ataxx.ataxx_board WHERE content = 'black' ";
            $sql_check_looser_ss= "SELECT * FROM ataxx.ataxx_board WHERE content = 'white'";
        } else {
            $sql_check_winner_ss = "SELECT * FROM ataxx.ataxx_board WHERE content = 'white'";
            $sql_check_looser_ss= "SELECT * FROM ataxx.ataxx_board WHERE content = 'black'";
        }
        $sql_check_winner = $mysqli->prepare($sql_check_winner_ss);
        $sql_check_looser= $mysqli->prepare($sql_check_looser_ss);
        
        $sql_check_looser->execute();
        $sql_check_looser->store_result();

            $sql_check_winner->execute();
            $sql_check_winner->store_result();
        if($sql_check_winner->num_rows < 1){
            $updateStatusData['end_of_game']=true;
            if (strcmp($etiketaPaikth, "white") == 0) {
                $updateStatusData['winner'] = "white";
                $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'white'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            } else {
                $updateStatusData['winner'] = "black";
                $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'black'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            }

        }
        if($sql_check_looser->num_rows < 1){
            $updateStatusData['end_of_game']=true;
            if (strcmp($etiketaPaikth, "white") == 0) {
                $updateStatusData['winner'] = "black";
                $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'black'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            } else {
                $updateStatusData['winner'] = "white";
                $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'white'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            }

        }


        if ($sql_check_empty->num_rows < 1) {
            
            $sql_check_empty->close();
            // Prepare and execute the winner query
            

            // If more than 24 pieces of the same color are found, the game ends
            if ($sql_check_winner->num_rows > 24) {
                $updateStatusData['end_of_game'] = true;
                if (strcmp($etiketaPaikth, "white") == 0) {
                    $updateStatusData['winner'] = "black";
                    $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'black'");
                    $stmt_update_3->execute();
                    $stmt_update_3->close();
                } else {
                    $updateStatusData['winner'] = "white";
                    $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'white'");
                    $stmt_update_3->execute();
                    $stmt_update_3->close();
                }
            }  
            if ($sql_check_looser->num_rows > 25) {
                $updateStatusData['end_of_game'] = true;
                if (strcmp($etiketaPaikth, "white") == 0) {
                    $updateStatusData['winner'] = "white";
                    $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'white'");
                    $stmt_update_3->execute();
                    $stmt_update_3->close();
                } else {
                    $updateStatusData['winner'] = "black";
                    $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'black'");
                    $stmt_update_3->execute();
                    $stmt_update_3->close();
                }
            }     
            
            
        }
    $stmt_lose = $mysqli->prepare("SELECT validmove FROM ataxx.statuspaixnidiou");
    $stmt_lose->execute();
    $stmt_lose->store_result();
    $stmt_lose->bind_result($gamevalidmove);
    $stmt_lose->fetch();
    $stmt_lose->close();
         if(strcmp($gamevalidmove,"no") == 0){
            if($sql_check_winner->num_rows < $sql_check_looser->num_rows){
                $updateStatusData['end_of_game'] = true;
                if (strcmp($etiketaPaikth, "white") == 0) {
                    $updateStatusData['winner'] = "white";
                    $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'white'");
                    $stmt_update_3->execute();
                    $stmt_update_3->close();
                } else {
                    $updateStatusData['winner'] = "black";
                    $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'black'");
                    $stmt_update_3->execute();
                    $stmt_update_3->close();
                }
            
         }else if($sql_check_winner->num_rows == $sql_check_looser->num_rows){
            $updateStatusData['end_of_game'] = true;
            $updateStatusData['winner']="draw";
         }else{
            $updateStatusData['end_of_game'] = true;
            if (strcmp($etiketaPaikth, "white") == 0) {
                $updateStatusData['winner'] = "black";
                $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'black'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            } else {
                $updateStatusData['winner'] = "white";
                $stmt_update_3 = $mysqli->prepare("UPDATE ataxx.statuspaixnidiou SET game_status = 'ended', winner = 'white'");
                $stmt_update_3->execute();
                $stmt_update_3->close();
            }

         }


        $sql_check_winner->close();
    }

    // Send the updated JSON response back to the client
}
    
    $modified_json_data = json_encode($updateStatusData, JSON_PRETTY_PRINT);
    echo $modified_json_data;
}
?>
