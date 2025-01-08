<?php

header('Content-Type: application/json');

global $mysqli, $stmt_update;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'dbconnect.php';

    $logInData = json_decode(file_get_contents('php://input'), true);

    $username = $logInData['playerUsername'];
    $password = $logInData['playerPassword'];
    $token = $logInData['playerToken'];

    //$hash = password_hash($password, PASSWORD_DEFAULT);

    // Verify existing credentials before updating
    /*$stmt_verify = $mysqli->prepare("SELECT idPaikth FROM naumaxiaDB.paiktes WHERE usernamePaikth = ? ");
    $stmt_verify->bind_param("s", $username);
    $stmt_verify->execute();
    $stmt_verify->store_result();*/


    $stmt_verify = $mysqli->prepare("SELECT usernamePaikth FROM ataxx.paiktes WHERE usernamePaikth = ? ");
    $stmt_verify->bind_param("s", $username);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($usernameDB);
    $stmt_verify->fetch();

    $stmt_verify = $mysqli->prepare("SELECT passwordPaikth FROM ataxx.paiktes WHERE usernamePaikth = ? ");
    $stmt_verify->bind_param("s", $username);
    $stmt_verify->execute();
    $stmt_verify->store_result();
    $stmt_verify->bind_result($passwordDB);
    $stmt_verify->fetch();


    if (strcmp($username, $usernameDB) == 0 && password_verify($password, $passwordDB)) {
        $response = array("status" => "success", "message" => "successful login!");
        $stmt_update = $mysqli->prepare("UPDATE ataxx.paiktes SET idPaikth = ? WHERE usernamePaikth = ? ");
        $stmt_update->bind_param("ss", $token, $username);
       $stmt_update->execute();
       
    } else {
        $response = array("status" => "error", "message" => "wrong username or password!");
    }

   if ($stmt_verify->num_rows === 0) {
        $response = array("status" => "error", "message" => "wrong username or password!");
        
    } 
   
    
       
        $stmt_verify->close();
            
   
    echo json_encode($response);

    }
//}

    // Close both statements

?>