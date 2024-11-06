<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Task Manager</h1>

        <h3>Enter a Task:</h3>
        <input type="text" id="task-input" placeholder="Task description" required>
        <button onclick="addNewTask()">Add Task</button>

        <h3>Active Tasks:</h3>
        <ul class="task-list" id="tasks-container"></ul>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
