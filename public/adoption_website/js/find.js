function findPets() {
    const petType = document.getElementById('petType').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    fetch('/findpet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ petType, breed, age, gender })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('petResults').innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('petResults').innerHTML = 'An error occurred while finding pets.';
    });
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
