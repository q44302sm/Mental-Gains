document.addEventListener("DOMContentLoaded", function () {
    const categoryList = document.querySelectorAll("#category-list li");
    const statsTitle = document.getElementById("stats-title");
    const statsList = document.getElementById("stats-list");

    // Stats data (for now, static, later can be from a database)
    const statsData = {
        exercises: {
            title: "Exercise Stats",
            stats: [
                { name: "Total Exercises Completed", value: "50" },
                { name: "Longest Workout Streak", value: "6 days" },
                { name: "Most Frequent Exercise", value: "Barbell Curl" },
                { name: "Average Reps per Exercise", value: "10 per set" },
                { name: "Total Workout Time", value: "20 hours" },
                { name: "Calories Burned", value: "1,200 kcal" }
            ]
        },
        quizzes: {
            title: "Quiz Stats",
            stats: [
                { name: "Total Quizzes Completed", value: "50" },
                { name: "Highest Score", value: "95%" },
                { name: "Average Score", value: "85%" },
                { name: "Average Time to Answer", value: "12 seconds" },
                { name: "Most Frequent Quiz Course", value: "Comp11120" },
                { name: "Highest Average Quiz Course", value: "Comp16321" },
                { name: "Most Challenging Quiz", value: "Quiz 1: File Systems" }
            ]
        }
    };

    // Click event for each category
    categoryList.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove active class from all, then set the clicked one
            categoryList.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");

            // Get category and update title
            const category = this.getAttribute("data-category");
            if (!statsData[category]) return; // Avoid errors if key is missing

            statsTitle.textContent = statsData[category].title;

            // Update stats display
            statsList.innerHTML = ""; // Clear existing stats
            statsData[category].stats.forEach((stat) => {
                const div = document.createElement("div");
                div.classList.add("stats-item");
                div.innerHTML = `
                    <h3>${stat.name}</h3>
                    <p>${stat.value}</p>
                `;
                statsList.appendChild(div);
            });
        });
    });

    // Load default stats (Exercises)
    categoryList[0].click();
});