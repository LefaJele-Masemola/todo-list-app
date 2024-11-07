// Fetch tasks when page is loaded
document.addEventListener("DOMContentLoaded", loadOperations);

function loadOperations() {
    fetch('/api/operations')
        .then(response => response.json())
        .then(operationData => {
            const operationContainer = document.getElementById('tasks-container');
            operationContainer.innerHTML = '';

            operationData.forEach(operation => {
                const listItem = document.createElement('li');
                listItem.classList.add('task-item');
                listItem.dataset.id = operation._id;
                
                const createdAt = new Date(operation.createdAt).toLocaleString();
                
                listItem.innerHTML = `
                    <div>
                        <h4>${operation.name}</h4>
                        <div class="date-time">Added on: ${createdAt}</div>
                        <div class="reminder">Reminder: ${operation.reminder || 'No reminder set'}</div>
                    </div>
                    <div>
                        <button class="complete" onclick="completeOperation('${operation._id}')">Complete</button>
                        <button class="delete" onclick="removeOperation('${operation._id}')">Delete</button>
                    </div>
                `;

                if (operation.completed) {
                    listItem.classList.add('completed');
                }

                operationContainer.appendChild(listItem);
            });
        })
        .catch(error => console.log('Error loading operations:', error));
}

// Add new operation
function addNewTask() {
    const taskDescription = document.getElementById('task-input').value;
    if (!taskDescription) return;

    const taskReminder = prompt("Set a reminder (optional):");

    const taskData = {
        name: taskDescription,
        completed: false,
        reminder: taskReminder || null,
    };

    fetch('http://localhost:5000/api/operations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    })
    .then(response => response.json())
    .then(() => {
        loadOperations(); // Refresh operations list
        document.getElementById('task-input').value = ''; // Clear input field
    })
    .catch(error => console.log('Error adding operation:', error));
}

// Mark operation as completed
function completeOperation(id) {
    fetch(`http://localhost:5000/api/operations/${id}/complete`, {
        method: 'PATCH',
    })
    .then(response => response.json())
    .then(() => {
        loadOperations(); // Refresh operations list
    })
    .catch(error => console.log('Error completing operation:', error));
}

// Delete operation
function removeOperation(id) {
    fetch(`http://localhost:5000/api/operations/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        loadOperations(); // Refresh operations list
    })
    .catch(error => console.log('Error removing operation:', error));
}
