// Import the showNotification function from notifications.js
import { showNotification } from './notifications.js';

// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskContainer = document.getElementById('tasks-container');
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.dataset.id = task.id;

         // Add importance class based on task's importance level
         if (task.importance === 'Low') {
            listItem.classList.add('low');
        } else if (task.importance === 'Medium') {
            listItem.classList.add('medium');
        } else if (task.importance === 'High') {
            listItem.classList.add('high');
        }

        const createdAt = new Date(task.createdAt).toLocaleString();

        listItem.innerHTML = `
            <div>
                <h4>${task.name}</h4>
                <div class="date-time">Added on: ${createdAt}</div>
                <div class="reminder">Reminder: ${task.reminder || 'No reminder set'}</div>
            </div>
            <div>
                 <button class="complete ${task.completed ? 'completed' : ''}" onclick="completeTask('${task.id}')">
            ${task.completed ? "Completed" : "Complete"}
        </button>
        <button class="delete" onclick="removeTask('${task.id}')">Delete</button>
    </div>
        `;

        if (task.completed) {
            listItem.classList.add('completed');
        }

        taskContainer.appendChild(listItem);
    });
};

// Save tasks to LocalStorage
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add new task to LocalStorage
const addNewTask = () => {
    const taskDescription = document.getElementById('task-input').value;
    if (!taskDescription) return;

    const taskReminder = prompt("Set a reminder (optional):");
    const taskImportance = document.getElementById('importance').value;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: Date.now().toString(),
        name: taskDescription,
        completed: false,
        reminder: taskReminder || null,
        importance: taskImportance,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks); // Save updated tasks to LocalStorage
    loadTasks(); // Refresh task list
    document.getElementById('task-input').value = ''; // Clear input field

    // Show notification when a new task is added
    showNotification("Task Added", { body: `New task: ${taskDescription}` });
};

// Mark task as completed or incomplete in LocalStorage
const completeTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed; // Toggle completion
        saveTasks(tasks); // Save updated tasks to LocalStorage
        loadTasks(); // Refresh task list

        // Show notification based on task status
        const status = task.completed ? "completed" : "marked incomplete";
        showNotification("Task Status Changed", { body: `Task ${status}: ${task.name}` });
    }
};

// Delete task from LocalStorage
const removeTask = (id) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks); // Save updated tasks to LocalStorage
    loadTasks(); // Refresh task list
};

// Expose functions to global scope for HTML to access
window.addNewTask = addNewTask;
window.completeTask = completeTask;
window.removeTask = removeTask;

// Initial load of tasks when the page is ready
document.addEventListener("DOMContentLoaded", loadTasks);
