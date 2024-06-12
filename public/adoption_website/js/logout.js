document.addEventListener('DOMContentLoaded', function() {
    // Find the logout button element
    const logoutBtn = document.getElementById('logoutBtn');
    // Find the logout message element
    const logoutMessage = document.getElementById('logoutMessage');

    // Add click event listener to the logout button
    logoutBtn.addEventListener('click', function() {
        // Send a GET request to the server to logout
        fetch('/logout')
            .then(response => {
                // Check if the response status is OK (200)
                if (response.ok) {
                    // Clear the logout message and display the success message
                    logoutMessage.textContent = '';
                    logoutMessage.textContent = 'You have been successfully logged out.';
                } else {
                    // Display an error message if logout fails
                    logoutMessage.textContent = '';
                    logoutMessage.textContent = 'You are not logged in.';
                }
            })
            .catch(error => {
                // Display an error message if there's an error in the fetch request
                logoutMessage.textContent = '';
                logoutMessage.textContent = 'An error occurred while logging out.';
                console.error('Error logging out:', error);
            });
    });
});

function updateClock(){
    let daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const now =new Date();
    const hours = now.getHours().toString().padStart(2,0);
    const minutes = now.getMinutes().toString().padStart(2,0);
    const seconds = now.getSeconds().toString().padStart(2,0);;
    const day =daysOfWeek[now.getDay()];
    const date = now.getDate();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const timeString = `${date}/${month}/${year}, ${day}, ${hours}:${minutes}:${seconds} `;
    document.getElementById("clock").textContent = timeString;

}

setInterval(updateClock,1000);
updateClock();
function checkLoginAndRedirect() {
    fetch('/checklogin') // Assuming you have a route to check login status
    .then(response => {
        if (response.ok) {
            // User is logged in, redirect to giveaway.html
            window.location.href = 'giveaway.html';
        } else {
            // User is not logged in, redirect to login.html
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Error checking login status:', error);
    });
}