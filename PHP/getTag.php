<?php

header('Content-Type: application/json');

// Include database connection
include 'dbconnect.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Decode the incoming JSON data
    $getTagData = json_decode(file_get_contents('php://input'), true);
    
    // Check if 'tag' exists in the input data
    if (isset($getTagData['tag'])) {
        
        // Get the 'tag' value from the request data
        $token = $getTagData['tag'];

        // Prepare the SQL query to select etiketaPaikth based on idPaikth
        $stmt_verify = $mysqli->prepare("SELECT etiketaPaikth FROM ataxx.paiktes WHERE idPaikth = ?");
        $stmt_verify->bind_param("s", $token);  // Bind the token parameter
        $stmt_verify->execute();  // Execute the statement

        // Bind the result column to the variable $etiketaPaikth
        $stmt_verify->bind_result($etiketaPaikth);
        
        // Check if fetch() succeeds
        if ($stmt_verify->fetch()) {
            // If a result is found, add it to the response data
            $getTagData['tag'] = $etiketaPaikth;
        } else {
            // If no result is found, return an error in the response
            $getTagData['error'] = "No player found with the given token.";
        }

        // Send back the modified data as JSON
        echo json_encode($getTagData, JSON_PRETTY_PRINT);

        // Close the prepared statement
        $stmt_verify->close();
    } else {
        // If 'tag' is missing from the request data, return an error
        echo json_encode(['error' => 'Tag is missing from the request.'], JSON_PRETTY_PRINT);
    }
}
?>
