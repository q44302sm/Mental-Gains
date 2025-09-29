document.addEventListener("DOMContentLoaded", function () {
    const courseList = document.querySelectorAll("#course-list li");
    const quizTitle = document.getElementById("quiz-title");
    const quizList = document.getElementById("quiz-list");

    // Array to store selected quizzes
    let selectedQuizzes = [];

    // Quiz data (for now, static, later can be from a database)
    const quizzes = {
        Comp11120: { 
            title: "Comp11120 Quizzes", 
            quizzes: [
                { name: "Full Binary Trees" },
                { name: "Bayesian Updating" },
                { name: "Conjunctive Normal Form" }
            ]
        },
        Comp11212: { 
            title: "Comp11212 Quizzes", 
            quizzes: [
                { name: "Regular Expressions" }
            ]
        },
        Comp12111: { 
            title: "Comp12111 Quizzes", 
            quizzes: [
                { name: "Binary Adders" }
            ]
        },
        Comp13212: { 
            title: "Comp13212 Quizzes", 
            quizzes: [
                { name: "Descriptive Statistics" }
            ]
        },
        Comp15111: { 
            title: "Comp15111 Quizzes", 
            quizzes: [
                { name: "Control Flow" },
                { name: "Representation" },
                { name: "Tables" }
            ]
        },
        Comp15212: { 
            title: "Comp15212 Quizzes", 
            quizzes: [
                { name: "File Systems" }
            ]
        },
        Comp16321: { 
            title: "Comp16321 Quizzes", 
            quizzes: [
                { name: "State and Types" },
                { name: "Iteration" }
            ]
        },
        Comp16421: { 
            title: "Comp16421 Quizzes", 
            quizzes: [
                { name: "Assignment and Types" }
            ]
        }
    };

    // Function to add a quiz to the session
    function addToSession(quizName, button) {
        // Retrieve the current session from localStorage or initialize an empty array
        let selectedQuizzes = JSON.parse(localStorage.getItem('selectedQuizzes')) || [];

        if (!selectedQuizzes.includes(quizName)) {
            selectedQuizzes.push(quizName);
            console.log(`Added "${quizName}" to session.`);
            console.log("Current session:", selectedQuizzes);

            // Save the updated session back to localStorage
            localStorage.setItem('selectedQuizzes', JSON.stringify(selectedQuizzes));

            // Change the button text to "Added"
            button.textContent = "Added";
            button.disabled = true; // Optional: Disable the button after adding
        } else {
            console.log(`"${quizName}" is already in the session.`);
            console.log("Current session:", selectedQuizzes);
            button.textContent = "Already Added";
        }
    }

    // Function to render quizzes for a course
    function renderQuizzes(course) {
        if (!quizzes[course]) return; // Avoid errors if key is missing

        quizTitle.textContent = quizzes[course].title;

        // Update quiz display
        quizList.innerHTML = ""; // Clear existing quizzes
        quizzes[course].quizzes.forEach((quiz) => {
            const div = document.createElement("div");
            div.classList.add("quiz");
            div.innerHTML = `
                <div class="quiz-content">
                    <p>${quiz.name}</p>
                </div>
                <button class="add-to-session">Add to session</button>
            `;
            quizList.appendChild(div);

            // Add event listener to the "Add to session" button
            const addButton = div.querySelector(".add-to-session");
            if (addButton) { // Check if the button exists
                // Check if the quiz is already in the session
                if (selectedQuizzes.includes(quiz.name)) {
                    addButton.textContent = "Added";
                    addButton.disabled = true;
                }

                addButton.addEventListener("click", () => {
                    addToSession(quiz.name, addButton); // Pass the button to the function
                });
            } else {
                console.error("Add to session button not found!");
            }
        });
    }

    // Click event for each course
    courseList.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove active class from all, then set the clicked one
            courseList.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");

            // Get course and render quizzes
            const course = this.getAttribute("data-course");
            renderQuizzes(course);
        });
    });

    // Initialize the page with the default course (e.g., Comp15111)
    const defaultCourse = document.querySelector("#course-list li.active");
    if (defaultCourse) {
        defaultCourse.click(); // Simulate a click to load the default quizzes
    }
});