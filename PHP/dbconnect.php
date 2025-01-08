<?php
$servername = "localhost";  // or the IP address of your database server
$username = "root";  // Your MySQL username
$password = "";  // Your MySQL password
$dbname = "ataxx";  // Your database name

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
