// Request permission for desktop notifications
export const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
};

// Function to show a desktop notification
export const showNotification = (title, options = {}) => {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, options);
    } else {
        console.log("Notifications are not supported or permission is denied.");
    }
};

// Request notification permission once when the page loads
document.addEventListener("DOMContentLoaded", requestNotificationPermission);
