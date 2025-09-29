document.addEventListener("DOMContentLoaded", function () {
    const muscleGroups = document.querySelectorAll("#muscle-list li");
    const exerciseTitle = document.getElementById("exercise-title");
    const exerciseList = document.getElementById("exercise-list");

    // Exercise data (for now, static, later can be from a database)
    const exercises = {
        chest: { 
            title: "Chest Exercises", 
            exercises: [
                { image: "https://hips.hearstapps.com/hmg-prod/images/incline-barbell-bench-press-640731bc88b98.jpg?resize=980:*", name: "Bench Press" }
            ]
        },
        shoulders: { 
            title: "Shoulder Exercises", 
            exercises: [
                { image: "https://hips.hearstapps.com/hmg-prod/images/arnold-press-1659362810.jpg?resize=980:*", name: "Shoulder Press" }
            ]
        },
        back: { 
            title: "Back Exercises", 
            exercises: [
                { image: "https://mikereinold.com/wp-content/uploads/rookie-mistakes-the-pullup-main.jpg", name: "Pull-Ups" },
                { image: "https://training.fit/wp-content/uploads/2020/02/latzug-enger-griff-800x448.png", name: "Lat Pulldown" }
            ]
        },
        legs: { 
            title: "Leg Exercises", 
            exercises: [
                { image: "https://www.spotebi.com/wp-content/uploads/2014/10/squat-exercise-illustration.jpg", name: "Squats" }
            ]
        },
        biceps: { 
            title: "Biceps Exercises", 
            exercises: [
                { image: "https://liftmanual.com/wp-content/uploads/2023/04/ez-barbell-curl.jpg", name: "Barbell Curl" }
            ]
        },
        triceps: { 
            title: "Triceps Exercises", 
            exercises: [
                { image: "https://hips.hearstapps.com/hmg-prod/images/dips-1608221119.jpg?crop=1xw:1xh;center,top&resize=980:*", name: "Tricep Dips" }
            ]
        },
        sixpack: { 
            title: "Six Pack Exercises", 
            exercises: [
                { image: "https://training.fit/wp-content/uploads/2019/08/crunches-liegend.png", name: "Crunches" }
            ]
        }
    };

    // Array to store selected exercises
    let selectedExercises = [];

    // Click event for each muscle group
    muscleGroups.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove active class from all, then set the clicked one
            muscleGroups.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");

            // Get muscle group and update title
            const muscle = this.getAttribute("data-muscle");
            if (!exercises[muscle]) return; // Avoid errors if key is missing

            exerciseTitle.textContent = exercises[muscle].title;

            // Update exercise display
            exerciseList.innerHTML = ""; // Clear existing exercises
            exercises[muscle].exercises.forEach((exercise) => {
                const div = document.createElement("div");
                div.classList.add("exercise");
                div.innerHTML = `
                    <img src="${exercise.image}" alt="${exercise.name}">
                    <p>${exercise.name}</p>
                    <button class="add-to-workout">Add to Workout</button>
                `;
                exerciseList.appendChild(div);

                // Add event listener to the "Add to Workout" button
                const addButton = div.querySelector(".add-to-workout");
                addButton.addEventListener("click", () => {
                    // Add the exercise to the selectedExercises array
                    selectedExercises.push(exercise);
                    console.log("Exercise added to workout:", exercise.name);
                    console.log("Selected Exercises:", selectedExercises);
                });

            });
        });
    });
});