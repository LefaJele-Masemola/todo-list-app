// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskContainer = document.getElementById('tasks-container');
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.dataset.id = task.id;

        const createdAt = new Date(task.createdAt).toLocaleString();

        listItem.innerHTML = `
            <div>
                <h4>${task.name}</h4>
                <div class="date-time">Added on: ${createdAt}</div>
                <div class="reminder">Reminder: ${task.reminder || 'No reminder set'}</div>
            </div>
            <div>
                <button class="complete" onclick="completeTask('${task.id}')">Complete</button>
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

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: Date.now().toString(),
        name: taskDescription,
        completed: false,
        reminder: taskReminder || null,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks); // Save updated tasks to LocalStorage
    loadTasks(); // Refresh task list
    document.getElementById('task-input').value = ''; // Clear input field
};

// Mark task as completed in LocalStorage
const completeTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = true;
        saveTasks(tasks); // Save updated tasks to LocalStorage
        loadTasks(); // Refresh task list
    }
};

// Delete task from LocalStorage
const removeTask = (id) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks); // Save updated tasks to LocalStorage
    loadTasks(); // Refresh task list
};

// Initial load of tasks when the page is ready
document.addEventListener("DOMContentLoaded", loadTasks);
