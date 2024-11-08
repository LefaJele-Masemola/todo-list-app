// Check notification permission and request if not granted
export function requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            } else {
                console.log('Notification permission denied');
            }
        });
    }
}

// Show desktop notification
export function showDesktopNotification(title, message) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: message,
            icon: 'icon.png',  // Optional: Path to your icon
            tag: 'task-notification',  // Optional: A tag to group notifications
        });

        // Optional: Add an event listener to handle clicks on the notification
        notification.onclick = () => {
            console.log('Notification clicked!');
            // You can redirect or trigger another action here
        };

        // Close the notification after 5 seconds
        setTimeout(() => notification.close(), 5000);
    } else {
        console.log('Notification permission not granted');
    }
}
