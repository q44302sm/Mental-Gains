document.addEventListener('click', function(e) {
    if (e.target.classList.contains('check-btn')) {
        if (e.target.style.backgroundColor === "rgb(76, 175, 80)") {
            e.target.style.backgroundColor = "";
            e.target.style.color = "";
        } else {
            e.target.style.backgroundColor = "#4CAF50";
            e.target.style.color = "white";
        }
    }
});

let selectedExercises = [];
try {
    const storedExercises = localStorage.getItem('selectedExercises');
    if (storedExercises) {
        selectedExercises = JSON.parse(storedExercises);
    }
} catch (error) {
    console.error("Error loading selected exercises:", error);
    selectedExercises = [];
}

function loadExercises() {
    const exerciseList = document.querySelector(".exercise-list");
    exerciseList.innerHTML = "";

    const exerciseCount = document.querySelector(".exercise-count");
    
    if (selectedExercises.length === 0) {
        exerciseCount.textContent = "No exercises selected";
        return;
    }
    
    exerciseCount.textContent = `${selectedExercises.length} exercises selected`;

    selectedExercises.forEach((exercise, index) => {
        let exerciseDiv = document.createElement("div");
        exerciseDiv.classList.add("exercise");

        let exerciseName = document.createElement("span");
        exerciseName.classList.add("exercise-name");
        exerciseName.textContent = exercise;

        let checkButton = document.createElement("button");
        checkButton.classList.add("check-btn");
        checkButton.id = `check-btn-${index + 1}`;
        checkButton.textContent = "✔";
        checkButton.onclick = function () {
            goToQuestion(index + 1);
        };

        exerciseDiv.appendChild(exerciseName);
        exerciseDiv.appendChild(checkButton);
        exerciseList.appendChild(exerciseDiv);
    });
}

function endSession() {
    const allButtons = document.querySelectorAll('.check-btn');
    allButtons.forEach(button => {
        button.style.backgroundColor = "";
        button.style.color = "";
    });

    for (let i = 1; i <= selectedExercises.length; i++) {
        sessionStorage.removeItem(`exerciseDone${i}`);
    }

    window.location.href = "overview.html";
}

function goToQuestion(exerciseIndex) {
    sessionStorage.setItem(`exerciseDone${exerciseIndex}`, "true");
    
    sessionStorage.setItem("currentExerciseIndex", exerciseIndex);
    
    window.location.href = "question.html";
}

window.onload = function() {
    loadExercises();
    
    for (let i = 1; i <= selectedExercises.length; i++) {
        let button = document.getElementById(`check-btn-${i}`);
        if (button && sessionStorage.getItem(`exerciseDone${i}`) === "true") {
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
        }
    }
};