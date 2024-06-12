function submitPetInfo() {
    const petType = document.getElementById('petType').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const compatibilityDogs = document.getElementById('otherDogs').checked ? 'yes' : 'no';
    const compatibilityCats = document.getElementById('otherCats').checked ? 'yes' : 'no';
    const compatibilityChildren = document.getElementById('familyChildren').checked ? 'yes' : 'no';
    const comment = document.getElementById('comment').value;
  
    const ownerEmail = document.getElementById('ownerEmail').value;

    fetch('/submit_pet_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            petType,
            breed,
            age,
            gender,
            compatibilityDogs,
            compatibilityCats,
            compatibilityChildren,
            comment,
            ownerEmail
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pet information submitted successfully!');
        } else {
            alert('Failed to submit pet information.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting pet information.');
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

function validateForm(){
    var petType = document.getElementById('petType').value;
    var breed = document.getElementById('breed').value;
    var age = document.getElementById('age').value;
     var gender = document.querySelector('input[name="gender"]:checked');
     
    var ownerEmail = document.getElementById('ownerEmail').value;
    if (!petType || !breed || !age || !gender || !ownerEmail) {
        alert('Please fill in all fields.');
        return;
      }

    var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.test(ownerEmail)) {
    alert('Please enter a valid email address.');
   
    
  }
  else{
    submitPetInfo();
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

setInterval(updateClock,1000);
updateClock();