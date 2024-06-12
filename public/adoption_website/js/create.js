document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createAccountForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = form.username.value;
        const password = form.password.value;

        // Validate username and password format
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;

        if (!usernameRegex.test(username)) {
            message.textContent = 'Username can only contain letters (both upper and lower case) and digits.';
            return;
        }

        if (!passwordRegex.test(password)) {
            message.textContent = 'Password must be at least 4 characters long and contain at least one letter and one digit.';
            return;
        }

        // Submit form data to the server
        fetch('/create_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.text())
        .then(data => {
            message.textContent = data;
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'An error occurred while processing your request.';
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

setInterval(updateClock,1000);
updateClock();
