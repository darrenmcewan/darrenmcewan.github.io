<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["submit"])) {
    // Retrieve the movie or TV show name from the form
    $search = $_POST["search"];

    // Set up the email parameters
    $to = "darren@mcewan.me";  // Replace with your email address
    $subject = "New Request";
    $message = "Movie or TV Show: " . $search;

    // Send the email
    $headers = "From: darren@mcewan.me";  // Replace with your email address or a custom email
    mail($to, $subject, $message, $headers);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Requests</title>
    <link rel="stylesheet" type="text/css" href="../css/requests.css">
</head>
<body>
    <h1>Requests</h1>
    <h3>Search for a movie or tv show</h3>
    <form action="requests.php" method="post">
        <input type="text" name="search" placeholder="Search for a movie or tv show">
        <input type="submit" name="submit" value="Submit">
    </form>
    <script src="../js/requests.js"></script>
</body>
</html>
