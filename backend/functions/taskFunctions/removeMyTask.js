import { db } from '../registerFunctions/databaseHandler.js';

function removeMyTask(id) {
    const prepped = db.prepare(`DELETE FROM tasks WHERE id = ?`);
    prepped.run(id);
}

function removeAllTasks() {
    console.log("Removing all tasks from the database")
    const prepped = db.prepare(`DELETE FROM tasks`);
    prepped.run();
}

function clearUsersTable() {
    try {
        db.prepare("DELETE FROM users").run();
        console.log("All users have been removed from the users table.");
    } catch (error) {
        console.error("Failed to clear users table:", error);
    }
}

function showUsersTable() {
    try {
        const users = db.prepare("SELECT * FROM users").all();
        console.log(users);
        return users;
    } catch (error) {
        console.error("Failed to show users table:", error);
        return [];
    }
}

function showMessagesTable() {
    try {
        const messages = db.prepare("SELECT * FROM messages").all();
        console.log(messages);
        return messages;
    } catch (error) {
        console.error("Failed to show messages table:", error);
        return [];
    }
}

showMessagesTable()

function showNotifications() {
    try {
        const users = db.prepare("SELECT * FROM notifications").all();
        console.log(users);
        return users;
    } catch (error) {
        console.error("Failed to show notifications table:", error);
        return [];
    }
}

function showLinks() {
    try {
        const users = db.prepare("SELECT * FROM links").all();
        console.log(users);
        return users;
    } catch (error) {
        console.error("Failed to show links table:", error);
        return [];
    }
}

showLinks();




function dropUsersTable() {
    try {
        db.run("DROP TABLE IF EXISTS users");
        console.log("Users table dropped successfully");
    } catch (error) {
        console.error("Failed to drop users table:", error);
    }
}

function dropNotificationsTable() {
    try {
        db.run("DROP TABLE IF EXISTS notifications");
        console.log("notifications table dropped successfully");
    } catch (error) {
        console.error("Failed to drop notifications table:", error);
    }
}


function dropTasksTable() {
    try {
        db.run("DROP TABLE IF EXISTS tasks");
        console.log("Tasks table dropped successfully");
    } catch (error) {
        console.error("Failed to drop tasks table:", error);
    }
}


export default removeMyTask