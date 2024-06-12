// login.js

const fs = require('fs');
const path = require('path');

// Function to perform user login
function loginUser(username, password, callback) {
    // Read the login file
    fs.readFile(path.join(__dirname,'..', 'logins.txt'), 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        // Split the file data into lines
        const lines = data.split('\n');
        
        // Iterate through each line to check for matching credentials
        for (const line of lines) {
            const [storedUsername, storedPassword] = line.split(':');
            if (storedUsername === username && storedPassword === password) {
                // Match found, return success
                return callback(null, true);
            }
        }

        // No match found, return failure
        return callback(null, false);
    });
}

module.exports = { loginUser };
