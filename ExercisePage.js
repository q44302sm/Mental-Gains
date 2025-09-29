document.addEventListener("DOMContentLoaded", function () {
    const muscleGroups = document.querySelectorAll("#muscle-list li");
    const exerciseTitle = document.getElementById("exercise-title");
    const exerciseList = document.getElementById("exercise-list");

    // Array to store selected exercises
    let selectedExercises = [];

    // Exercise data (for now, static, later can be from a database)
    const exercises = {
        chest: { 
            title: "Chest Exercises", 
            exercises: [
                { image: "https://img.freepik.com/free-photo/man-workingout-local-gym_93675-129483.jpg?t=st=1742234004~exp=1742237604~hmac=e2660edb6de43d50d8961998d97c8aa9fd2c1144398990041c8ec2287398a7b3&w=1380", name: "Bench Press" },
                { image: "https://img.freepik.com/free-photo/handsome-black-man-is-engaged-gym_1157-29627.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Dumbbell Press" },
                { image: "https://img.freepik.com/free-photo/portrait-smiling-athlete-looking-camera_651396-1088.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Chest Fly" },
                { image: "https://img.freepik.com/premium-photo/shirtless-man-exercising-gym_1048944-25277495.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Cable chest fly" },
                { image: "https://img.freepik.com/free-photo/smiling-fit-young-black-athlete-doing-pushups-light-wooden-floor-against-white-wall_346278-1709.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Push-ups" }
            ]
        },
        shoulders: { 
            title: "Shoulder Exercises", 
            exercises: [
                { image: "https://img.freepik.com/free-photo/handsome-young-athlete-working-out-gym_7502-5025.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Dumbbell Shoulder Press" },
                { image: "https://img.freepik.com/free-photo/front-view-man-training-with-machine_23-2149517275.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Machine Shoulder Press" },
                { image: "https://img.freepik.com/free-photo/front-view-man-training-gym_23-2149517272.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Cable Lateral Raises" },
                { image: "https://img.freepik.com/free-photo/young-man-making-sport-exercises-home_1328-3078.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Dumbbell Lateral Raises" },
                { image: "https://cdn.trainfitness.ai/assets/38c2d0ad1c/mediumThumbnail.jpg", name: "Rear Delt Fly" }
            ]
        },
        back: { 
            title: "Back Exercises", 
            exercises: [
                { image: "https://img.freepik.com/free-photo/strong-beautiful-athletic-woman-training-gym_158595-1917.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Lat Pulldown" },
                { image: "https://img.freepik.com/free-photo/young-muscular-athlete-training-gym-doing-strength-exercises-practicing_155003-35976.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Seated Rows" },
                { image: "https://img.freepik.com/free-photo/handsome-young-athlete-working-out-gym_7502-5024.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Bent-over Rows" },
                { image: "https://img.freepik.com/free-photo/back-view-muscular-topless-male-athlete-showing-calisthenic-moves-pull-up-pullbar-head-looking-left-side-direction_346278-1571.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Pull-Ups" },
                { image: "https://t3.ftcdn.net/jpg/07/91/54/28/360_F_791542808_f0edOzJhq2RxedTg2bf3n2VGXVZTUIDT.jpg", name: "Muscle Ups" }
            ]
        },
        legs: { 
            title: "Leg Exercises", 
            exercises: [
                { image: "https://img.freepik.com/free-photo/close-up-man-doing-crossfit-workout_23-2149080462.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Squats" },
                { image: "https://img.freepik.com/free-photo/handsome-man-is-engaged-gym_1157-29935.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Leg Press" },
                { image: "https://img.freepik.com/free-photo/pretty-woman-working-her-quads-machine-press-gym_231208-3396.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Leg Extension"},
                { image: "https://cdn.shopify.com/s/files/1/0449/8453/3153/files/leg_curl_1200x.jpg?v=1739000697", name: "Leg Curl" },
                { image: "https://img.freepik.com/free-photo/one-young-woman-working-hard-gym-she-is-lifting-weights-sport-fitness_639032-1625.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Deadlifts" }
            ]
        },
        biceps: { 
            title: "Biceps Exercises", 
            exercises: [
                { image: "https://img.freepik.com/free-photo/man-lifting-barbell_23-2147688564.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Barbell Curl" },
                { image: "https://img.freepik.com/free-photo/muscular-lifting-heavy-fit-body_1303-528.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Dumbbell Curl" },
                { image: "https://img.freepik.com/premium-photo/young-bodybuilder-doing-weightlifting_13339-157456.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Concentration Curl" },
                { image: "https://img.freepik.com/free-photo/young-handsome-man-working-out-gym-bodybuilding_23-2149552317.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Cable Curl" },
                { image: "https://img.freepik.com/free-photo/back-view-woman-performing-pull-ups_23-2147789572.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Underhand Pullup" }
            ]
        },
        triceps: { 
            title: "Triceps Exercises", 
            exercises: [
                { image: "https://cdn.shopify.com/s/files/1/1497/9682/files/4.Skull_Crusher_Tricep_Extension.jpg?v=1674836311", name: "Lying Tricep Extensions" },
                { image: "https://img.freepik.com/free-photo/girl-swings-her-back-exercise-machine_169016-62766.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Cable Tricep Pushdowns" },
                { image: "https://img.freepik.com/free-photo/side-view-sporty-woman-exercising-with-weights_23-2148429370.jpg?ga=GA1.1.1946205578.1742320643&semt=ais_hybrid", name: "Skull Crushers" },
                { image: "https://img.freepik.com/free-photo/strong-tattooed-white-unlabeled-tank-t-shirt-male-athlete-shows-calisthenic-moves-holding-dip-position-parallel-bars_346278-1591.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Dips" },
                { image: "https://img.freepik.com/premium-photo/young-man-doing-push-ups-red-rubber-ground-his-workout_1048944-20223168.jpg?ga=GA1.1.1946205578.1742320643&semt=ais_hybrid", name: "Diamond Push-ups" }
            ]
        },
        sixpack: { 
            title: "Six Pack Exercises", 
            exercises: [
                { image: "https://img.freepik.com/free-photo/full-length-portrait-pretty-fit-sportsgirl-doing-plank_171337-9001.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Plank" },
                { image: "https://img.freepik.com/free-photo/fitness-woman-with-slim-body-doing-abdominal-crunches-exercise-mat-home-active-woman-exercising-with-hiit-workout_662251-1328.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Crunches" },
                { image: "https://img.freepik.com/free-photo/fitness-man_23-2148138026.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Leg Raises" },
                { image: "https://img.freepik.com/free-photo/nice-blonde-doing-abs-floor-gym-beautiful-female-fitness-woman_146671-16465.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Sit-ups" },
                { image: "https://img.freepik.com/premium-photo/young-man-exercising-horizontal-bar-gym_380164-256912.jpg?ga=GA1.1.494391025.1742233993&semt=ais_hybrid", name: "Front-lever" }
            ]
        }
    };

    // Function to add an exercise to the session
    function addToSession(exerciseName, button) {
        // Retrieve the current session from localStorage or initialize an empty array
        let selectedExercises = JSON.parse(localStorage.getItem('selectedExercises')) || [];

        if (!selectedExercises.includes(exerciseName)) {
            selectedExercises.push(exerciseName);
            console.log(`Added "${exerciseName}" to session.`);
            console.log("Current session:", selectedExercises);

            // Save the updated session back to localStorage
            localStorage.setItem('selectedExercises', JSON.stringify(selectedExercises));

            // Change the button text to "Added"
            button.textContent = "Added";
            button.disabled = true; // Optional: Disable the button after adding
        } else {
            console.log(`"${exerciseName}" is already in the session.`);
            console.log("Current session:", selectedExercises);
            button.textContent = "Already Added";
        }
    }

    // Function to render exercises for a muscle group
    function renderExercises(muscle) {
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
                <button class="add-to-session">Add to session</button>
            `;
            exerciseList.appendChild(div);

            // Add event listener to the "Add to session" button
            const addButton = div.querySelector(".add-to-session");
            if (addButton) { // Check if the button exists
                // Check if the exercise is already in the session
                if (selectedExercises.includes(exercise.name)) {
                    addButton.textContent = "Added";
                    addButton.disabled = true;
                }

                addButton.addEventListener("click", () => {
                    addToSession(exercise.name, addButton); // Pass the button to the function
                });
            } else {
                console.error("Add to session button not found!");
            }
        });
    }

    // Click event for each muscle group
    muscleGroups.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove active class from all, then set the clicked one
            muscleGroups.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");

            // Get muscle group and render exercises
            const muscle = this.getAttribute("data-muscle");
            renderExercises(muscle);
        });
    });

    // Initialize the page with the default muscle group (e.g., biceps)
    const defaultMuscleGroup = document.querySelector("#muscle-list li.active");
    if (defaultMuscleGroup) {
        defaultMuscleGroup.click(); // Simulate a click to load the default exercises
    }
});