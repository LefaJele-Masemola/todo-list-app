# Task Manager Application

## Overview
This Task Manager web application(to do list) allows users to manage their daily tasks with features such as adding, updating, and deleting tasks. The app also includes Focus Mode, task importance, and reminder notifications. Tasks are stored in the browser’s Local Storage for persistence, allowing the user to manage tasks even after page refresh.

## Technologies Used
- **Frontend:**
  - HTML5, CSS3, JavaScript ES6
  - DOM Manipulation
  - Notifications API (for task-related notifications)
  
- **Backend:**
  - Node.js (used for the server)

- **Database:**
  - MongoDB (though Local Storage is currently being used for simplicity in this implementation)

## Features
- **Task Management:** Add, edit, delete, and mark tasks as completed.
- **Focus Mode:** A distraction-free mode to help users stay focused on their tasks.
- **Task Importance:** Categorize tasks based on priority (Low, Medium, High).
- **Due Date Reminder:** Set a date and time to be reminded of the task.
- **Floating Suggestions:** Displays helpful suggestions to encourage productivity.
- **Notifications:** Alerts users when tasks are added, completed, or updated.
- **Local Storage:** Tasks are stored in the browser’s Local Storage to ensure data persistence across sessions.

## Setup Instructions

### Prerequisites
To run this project locally, ensure you have the following installed:
- **Node.js** (for running the server, though Local Storage is used for data storage)

### Steps to run the project:
1. Clone this repository to your local machine:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd <project-directory>
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open the app in your browser:
   - Go to [http://localhost/task-manager](http://localhost:5000/)

### Local Storage Usage
Currently, the application saves tasks in the browser's Local Storage. Each task has a unique ID, and the tasks are persisted across sessions. You can view the tasks even after a page refresh.

**Note:** While MongoDB was considered for the backend database, it is not being used in this version of the app. Local Storage is used instead to keep things lightweight and easy to manage in the frontend.

## How to Use

1. **Adding a Task:**
   - Enter the task description.
   - Set the due date and time.
   - Select the task's importance (Low, Medium, High).
   - Click "Add Task" to save it.

2. **Viewing Tasks:**
   - All tasks will be displayed under the "Active Tasks" section.
   - Tasks are color-coded based on their importance.

3. **Completing a Task:**
   - Click the "Complete" button to mark the task as completed. This will toggle the task’s status.

4. **Deleting a Task:**
   - Click the "Delete" button next to any task to remove it from your task list.

5. **Focus Mode:**
   - Click "Enable Focus Mode" to enter a distraction-free mode, where only task-related content is displayed. To exit Focus Mode, click the "Exit Focus Mode" button.

6. **Notifications:**
   - Notifications will appear for actions like adding or completing tasks.

## Project Structure
```
/todo-list-app
/Frontend                # Contains the styles for the application
│   ├── style.css
│
├── /css                  # Contains the styles for the application
│   ├── style.css
│
├── /js                   # JavaScript functionality
│   ├── script.js         # Main app logic
│   ├── notifications.js  # Handles notifications
│/src                  # Contains the styles for the application
├── /config
├── /controllers
├── /models
├── /routes
├── app.js           # Main HTML file (views the app)
│
├── package.json          # Node.js project metadata and dependencies
└── README.md             # Project documentation
```

## Future Improvements
- Implement MongoDB for task persistence in a cloud database instead of Local Storage.
- Improve the backend by adding authentication features for user-specific task management.
- Add user settings to customize the focus mode, task categories, and notifications.
- Improve task suggestions based on user preferences and task history.

## Contributing
Contributions are welcome! Feel free to fork the project, create a branch, and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
![image](https://github.com/user-attachments/assets/317bb7db-2949-4025-86d2-a19986f70ad3)


![image](https://github.com/user-attachments/assets/2f65aa48-752d-4c63-9274-5588cb649f39)



Let me know if you need any additional details!
