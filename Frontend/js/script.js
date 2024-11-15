// Import the showNotification function from notifications.js
import { showNotification } from './notifications.js';

// Suggestion data
const suggestionData = [
    { text: "Take breaks!", priority: "low" },
    { text: "Prioritize tasks!", priority: "medium" },
    { text: "Complete urgent items!", priority: "high" }
];

// Display suggestions in floating bubbles
const showFloatingSuggestions = () => {
    const container = document.getElementById('floatingSuggestions');
    container.innerHTML = '';

    suggestionData.forEach((suggestion, index) => {
        const bubble = document.createElement('div');
        bubble.className = `suggestionBubble ${suggestion.priority}Priority`;
        bubble.style.top = `${Math.random() * 80}%`;
        bubble.style.left = `${Math.random() * 80}%`;
        bubble.style.animationDelay = `${index * 1.5}s`;
        bubble.textContent = suggestion.text;
        container.appendChild(bubble);
    });
};

// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskContainer = document.getElementById('tasks-container');
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.dataset.id = task.id;

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
                <div class="reminder">Reminder: ${task.reminder ? task.reminder : 'No reminder set'}</div>
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
window.addNewTask = () => { // Added window. to make it globally accessible
    const taskDescription = document.getElementById('task-input').value;
    const reminderDate = document.getElementById('reminder-date').value;
    const reminderTime = document.getElementById('reminder-time').value;
    const taskImportance = document.getElementById('importance').value;

    if (!taskDescription) return;

    const taskReminder = reminderDate && reminderTime ? `${reminderDate} ${reminderTime}` : null;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: Date.now().toString(),
        name: taskDescription,
        completed: false,
        reminder: taskReminder,
        importance: taskImportance,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    loadTasks();
    document.getElementById('task-input').value = '';
    document.getElementById('reminder-date').value = '';
    document.getElementById('reminder-time').value = '';

    // Show notification
    showNotification("Task Added", { body: `New task: ${taskDescription}` });
};

// Mark task as completed
const completeTask = (taskId) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        loadTasks();
    }
};

// Remove task from LocalStorage
const removeTask = (taskId) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    loadTasks();
};

// Event listener to load tasks and show floating suggestions after page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();  // Load tasks when the page loads
    showFloatingSuggestions();  // Load suggestions when the page is ready
});

// Event listener for the Add Task button
document.getElementById('addTaskBtn').addEventListener('click', addNewTask);
