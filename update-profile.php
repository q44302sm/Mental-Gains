<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    // Assuming database connection is handled by your teammate
    $conn = new mysqli("localhost", "root", "", "fitness_db");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Update user details (assuming user ID is stored in session)
    session_start();
    $userId = $_SESSION["user_id"];
    $sql = "UPDATE users SET username='$username', dob='$dob', email='$email', phone='$phone' WHERE id=$userId";

    if ($conn->query($sql) === TRUE) {
        header("Location: profile.html"); // Redirect back to profile
        exit();
    } else {
        echo "Error updating record: " . $conn->error;
    }

    $conn->close();
}
?>
