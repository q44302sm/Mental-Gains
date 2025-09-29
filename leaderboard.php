<?php
header('Content-Type: application/json');
$mysqli = new mysqli("localhost", "root", "", "leaderboard_db");

$type = $_GET['type'] ?? 'exercise'; // Default type
$sort = $_GET['sort'] ?? 'time';     // Default sorting

$query = "";

if ($type === "exercise") {
    if ($sort === "time") {
        $query = "SELECT name, total_time AS value FROM exercise_leaderboard ORDER BY total_time ASC";
    } else {
        $query = "SELECT name, exercises_completed AS value FROM exercise_leaderboard ORDER BY exercises_completed ASC";
    }
} elseif ($type === "quiz") {
    if ($sort === "accuracy") {
        $query = "SELECT name, accuracy AS value FROM quiz_leaderboard ORDER BY accuracy ASC";
    } else {
        $query = "SELECT name, total_questions AS value FROM quiz_leaderboard ORDER BY total_questions ASC";
    }
}

$result = $mysqli->query($query);
$leaderboard = [];

while ($row = $result->fetch_assoc()) {
    $leaderboard[] = $row;
}

echo json_encode($leaderboard);
?>
