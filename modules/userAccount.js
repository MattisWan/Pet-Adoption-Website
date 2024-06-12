const fs = require('fs');

function createUserAccount(username, password) {
    return new Promise((resolve, reject) => {
        if (!isValidUsername(username) || !isValidPassword(password)) {
            return reject("Invalid username or password format.");
        }

        if (isUsernameTaken(username)) {
            return reject("Username is already in use. Please choose a different one.");
        }

        // Write to login file
        fs.appendFile('logins.txt', `${username}:${password}\n`, (err) => {
            if (err) {
                console.error('Error writing to login file:', err);
                return reject("An error occurred while creating the account.");
            }
            console.log('Account created:', username);
            resolve("Account created successfully.");
        });
    });
}

function isValidUsername(username) {
    // Validate username format (letters and digits only)
    return /^[a-zA-Z0-9]+$/.test(username);
}

function isValidPassword(password) {
    // Validate password format (at least 4 characters with at least one letter and one digit)
    return /^(?=.*[A-Za-z])(?=.*\d).{4,}$/.test(password);
}

function isUsernameTaken(username) {
    // Dummy function to check if username already exists
    // You would implement your own logic to check against existing usernames
    // This might involve querying a database
    // For demonstration purposes, we assume a synchronous check against a list of existing usernames
    const existingUsernames = ['user1', 'user2', 'user3']; // Dummy data
    return existingUsernames.includes(username);
}

module.exports = { createUserAccount };
