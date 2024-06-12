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


function findPet(){
    let breed = document.getElementById("breed").value;
    if(breed=== ""){
        alert("Enter a breed");
    }
    let age = document.getElementById("age").value;
    if(age===""){
        alert("Enter age");
    }
    
}

function validateForm(){
    var petType = document.getElementById('petType').value;
    var breed = document.getElementById('breed').value;
    var age = document.getElementById('age').value;
     var gender = document.querySelector('input[name="gender"]:checked');
     var ownerName = document.getElementById(`ownerName`).value;
    var ownerEmail = document.getElementById('ownerEmail').value;
    if (!petType || !breed || !age || !gender || !ownerEmail||!ownerName) {
        alert('Please fill in all fields.');
        return;
      }

    var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.test(ownerEmail)) {
    alert('Please enter a valid email address.');
   
    
  }

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
