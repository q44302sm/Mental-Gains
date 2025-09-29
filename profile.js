function editProfile() {
    window.location.href = "edit-profile.html";
}
function goToMainPage() {
    window.location.href = "ExercisePage.html"; // Redirects to the main page
}
document.addEventListener("DOMContentLoaded", () => {
    function animateNumber(element, start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = range / (duration / 10);
        
        let timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 10);
    }

    let stats = ["totalExercises", "longestStreak", "avgAccuracy", "totalQuizzes", "bestScore"];
    stats.forEach(id => {
        let element = document.getElementById(id);
        animateNumber(element, 0, parseInt(element.textContent), 1000);
    });
});
