// Function to show browser notification
export const showNotification = (title, options) => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications.");
        return;
    }

    // If notifications are not yet granted, request permission
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, options); // Show the notification
            } else {
                console.log("Permission for notifications denied.");
            }
        });
    } else if (Notification.permission === "granted") {
        // If permission is granted, show the notification
        new Notification(title, options);
    } else {
        console.log("Notifications are denied.");
    }
};
