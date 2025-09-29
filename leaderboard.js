function goToExercisePage() {
    window.location.href = "ExercisePage.html"; // Redirects to the main page
}
function goToMainPage() {
    window.location.href = "leaderboard.html"; // Redirects to the main page
}
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseSortBy = urlParams.get("sort") || "time"; // Default: sort by time
    const quizSortBy = urlParams.get("sort") || "accuracy"; // Default: sort by accuracy

    if (document.getElementById("exerciseLeaderboard")) {
        updateExerciseHeader(exerciseSortBy);
        fetchExerciseLeaderboard(exerciseSortBy);
    }

    if (document.getElementById("quizLeaderboard")) {
        updateQuizHeader(quizSortBy);
        fetchQuizLeaderboard(quizSortBy);
    }
});

function updateExerciseHeader(sortBy) {
    document.getElementById("exerciseMetric").textContent =
        sortBy === "time" ? "Total Time (minutes)" : "Total Exercises Completed";
}

function updateQuizHeader(sortBy) {
    document.getElementById("quizMetric").textContent =
        sortBy === "accuracy" ? "Accuracy (%)" : "Total Questions Answered";
}

function fetchExerciseLeaderboard(sortBy) {
    fetch(`leaderboard?type=exercise&sort=${sortBy}`)
        .then(response => response.json())
        .then(data => {
            let leaderboardHTML = "";
            data.forEach((entry, index) => {
                leaderboardHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${entry.name}</td>
                        <td>${entry.value}</td>
                    </tr>
                `;
            });
            document.getElementById("exerciseLeaderboard").innerHTML = leaderboardHTML;
        })
        .catch(error => console.error("Error fetching exercise leaderboard:", error));
}

function fetchQuizLeaderboard(sortBy) {
    fetch(`leaderboard?type=quiz&sort=${sortBy}`)
        .then(response => response.json())
        .then(data => {
            let leaderboardHTML = "";
            data.forEach((entry, index) => {
                leaderboardHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${entry.name}</td>
                        <td>${entry.value}</td>
                    </tr>
                `;
            });
            document.getElementById("quizLeaderboard").innerHTML = leaderboardHTML;
        })
        .catch(error => console.error("Error fetching quiz leaderboard:", error));
}

function changeExerciseSort(sortBy) {
    window.location.href = `leaderboardEx.html?sort=${sortBy}`;
}

function changeQuizSort(sortBy) {
    window.location.href = `leaderboardQuiz.html?sort=${sortBy}`;
}
