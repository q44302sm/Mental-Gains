document.addEventListener('DOMContentLoaded', () => {
    // Retrieve selected exercises and quizzes from localStorage
    const selectedExercises = JSON.parse(localStorage.getItem('selectedExercises')) || [];
    const selectedQuizzes = JSON.parse(localStorage.getItem('selectedQuizzes')) || [];

    // Log initial selected exercises and quizzes
    console.log('Initial Selected Exercises:', selectedExercises);
    console.log('Initial Selected Quizzes:', selectedQuizzes);

    // Function to display selected items
    function displayItems(items, listId, storageKey) {
        const tbody = document.getElementById(listId);

        // Clear the table body before re-rendering
        tbody.innerHTML = '';

        // Display each item
        items.forEach((item, index) => {
            const row = document.createElement('tr');

            // Item Name Cell
            const nameCell = document.createElement('td');
            nameCell.textContent = item;
            row.appendChild(nameCell);

            // Remove Button
            const actionCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.classList.add('remove-btn');
            removeButton.addEventListener('click', () => {
                // Remove the item from the array
                items.splice(index, 1);

                // Update localStorage
                localStorage.setItem(storageKey, JSON.stringify(items));

                // Log the updated list/array
                console.log(`Updated ${storageKey}:`, items);

                // Re-render the list
                displayItems(items, listId, storageKey);
            });
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            // Append the row to the table body
            tbody.appendChild(row);
        });
    }

    // Display exercises
    displayItems(selectedExercises, 'exercise-list', 'selectedExercises');

    // Display quizzes
    displayItems(selectedQuizzes, 'quiz-list', 'selectedQuizzes');

    // Add event listener to the "Start" button
    const startButton = document.getElementById('start-btn');
    startButton.addEventListener('click', () => {
        alert('Session started!');
        console.log('Session started with the following:');
        console.log('Selected Exercises:', selectedExercises);
        console.log('Selected Quizzes:', selectedQuizzes);
    });
});