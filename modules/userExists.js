// userExists.js

const fs = require('fs');

// Function to check if a username exists in the logins.txt file
function userExists(username) {
    // Read the contents of the logins.txt file
    const fileContents = fs.readFileSync('logins.txt', 'utf8');

    // Split the file contents into an array of lines
    const lines = fileContents.split('\n');

    // Check if the username exists in any of the lines
    for (const line of lines) {
        // Extract the username from each line (assuming username is the first field separated by ':')
        const existingUsername = line.split(':')[0];

        // If the username exists, return true
        if (existingUsername === username) {
            return true;
        }
    }

    // If the username does not exist, return false
    return false;
}

// Export the userExists function to make it accessible from other files
module.exports = userExists;
