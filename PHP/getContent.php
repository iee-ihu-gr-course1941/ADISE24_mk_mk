<?php
header('Content-Type: application/json');
include 'dbconnect.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Initialize the board state as a 7x7 grid filled with null values
    $boardState = array_fill(0, 7, array_fill(0, 7, null));

    // SQL query to get only the `content` field for all the positions in the board
    $sql = "SELECT `row`, `column`, `content` FROM ataxx.ataxx_board ORDER BY `row`, `column`";
    $result = $mysqli->query($sql);

    // Check if there are rows to retrieve
    if ($result->num_rows > 0) {
        // Process each row returned by the query
        while ($row = $result->fetch_assoc()) {
            // Only store the `content` at the correct position on the board
            $boardState[$row['row']][$row['column']] = $row['content'];
        }
        
        // Return the board state as a JSON response
        echo json_encode($boardState);
    } else {
        echo json_encode(["message" => "No data found."]);
    }

    // Close the connection
    $mysqli->close();
}

?>
