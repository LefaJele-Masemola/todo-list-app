// Import the showNotification function from notifications.js
import { showNotification } from './notifications.js';

const suggestionData = [
    { text: "Take breaks!", priority: "low" },
    { text: "Prioritize tasks!", priority: "medium" },
    { text: "Complete urgent items!", priority: "high" }
];

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

// Load suggestions when the page is ready
document.addEventListener("DOMContentLoaded", showFloatingSuggestions);

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
                <div class="reminder">Reminder: ${task.reminder ? task.reminder: 'No reminder set'}</div>
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
    const reminderDate = document.getElementById('reminder-date').value;
    const reminderTime = document.getElementById('reminder-time').value;
    const taskImportance = document.getElementById('importance').value;
    if (!taskDescription) return;

    // Combine date and time for the reminder
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
    saveTasks(tasks); // Save updated tasks to LocalStorage
    loadTasks(); // Refresh task list
    document.getElementById('task-input').value = ''; // Clear input field
    document.getElementById('reminder-date').value = ''; // Clear date input
    document.getElementById('reminder-time').value = ''; // Clear time input

    // Show notification when a new task is added
    showNotification("Task Added", { body: `New task: ${taskDescription}` });
};

/// Mark task as completed and toggle button
const completeTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed; // Toggle completion
        saveTasks(tasks); // Save updated tasks to LocalStorage
        loadTasks(); // Refresh task list

        // Show notification when a task is completed
        showNotification("Task Updated", { body: `Task status: ${task.completed ? 'Completed' : 'Incomplete'} - ${task.name}` });
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


//task suggestions
const suggestTasks = (tasks) => {
    const now = new Date();
    let suggestions = [];

    tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        const hoursUntilDue = (dueDate - now) / (1000 * 60 * 60);

        // Rule 1: Urgent tasks due within 24 hours
        if (hoursUntilDue < 24 && task.priority === 'High') {
            suggestions.push(task);
        }
        // Rule 2: Work tasks on weekdays
        else if (task.category === 'Work' && [1, 2, 3, 4, 5].includes(now.getDay())) {
            suggestions.push(task);
        }
        // Rule 3: Tasks based on user's past time of completion
        else if (task.preferredTime === getCurrentTimeOfDay()) {
            suggestions.push(task);
        }
    });

    return suggestions.slice(0, 3); // Limit suggestions to top 3
};

const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    else if (hour < 18) return 'afternoon';
    return 'evening';
};
