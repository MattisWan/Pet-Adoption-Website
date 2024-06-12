const express = require('express');
const path = require('path');
const port = 3000;
var count = 1;
const session = require('express-session');
const { loginUser } = require('./modules/login');
const app = express();
const { createUserAccount } = require('./modules/userAccount');
const fs = require('fs');
const  userExists  = require('./modules/userExists');


app.use(
	express.json(),
	express.urlencoded({
		extended: true,
  }));

  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/', (req, res) => {
  console.log('Got body:', req.body);
  res.send("Received your request! Name: " + req.body.username);
});



app.post('/create_account', (req, res) => {
  const { username, password } = req.body;
  // Check if the username already exists
  if (userExists(username)) {
    return res.json({ success: false, message: 'Username already exists.' });
}

  createUserAccount(username, password)
      .then(message => res.json({ success: true, message }))
      .catch(error => res.json({ success: false, message: error }));
});



app.post('/login', (req, res) => {
  const { username, password } = req.body;

  loginUser(username, password, (err, success) => {
      if (err) {
          return res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
      }

      if (success) {
          req.session.username = username; // Store username in session
          return res.json({ success: true });
      } else {
          return res.status(401).json({ success: false, message: 'Incorrect username or password.' });
      }
  });
});

app.post('/submit_pet_info', (req, res) => {
  const {
      petType,
      breed,
      age,
      gender,
      compatibilityDogs,
      compatibilityCats,
      compatibilityChildren,
      comment,
      ownerEmail
  } = req.body;

  const petInfo = `${count}:${req.session.username}:${petType}:${breed}:${age}:${gender}:${compatibilityDogs}:${compatibilityCats}:${compatibilityChildren}:${comment}:${ownerEmail}\n`;

  fs.appendFile('pet_info.txt', petInfo, (err) => {
      if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).json({ success: false, message: 'An error occurred while saving pet information.' });
      }
      console.log('Pet information saved to pet_info.txt');
      res.json({ success: true, message: 'Pet information saved successfully.' });
      count++;
  });
});


app.get('/checklogin', (req, res) => {
  if (req.session && req.session.username) {
      // User is logged in
      res.sendStatus(200); // OK status code
  } else {
      // User is not logged in
      res.sendStatus(401); // Unauthorized status code
  }
});

// Define route to logout
app.get('/logout', (req, res) => {
  // Check if the user is logged in
  if (req.session && req.session.username) {
      // Destroy the session
      req.session.destroy(err => {
          if (err) {
              console.error('Error destroying session:', err);
              res.status(500).send('An error occurred while logging out.');
          } else {
              // Session destroyed successfully
              res.send('You have been successfully logged out.');
          }
      });
  } else {
      // User is not logged in
      res.status(401).send('You are not currently logged in.');
  }
});

app.post('/findpet', (req, res) => {
  const { petType, breed, age, gender } = req.body;

  fs.readFile('pet_info.txt', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return res.status(500).send('Error reading file.');
      }

      const lines = data.split('\n');
      const matchingRecords = lines.filter(line => {
          const [num, ownerName, recordPetType, recordBreed, recordAge,recordGender, compatibleDogs, compatibleCats, compatibleChildren, comment, email] = line.split(':');
          return recordPetType === petType &&
                 recordBreed === breed &&
                 parseFloat(recordAge) === parseFloat(age) &&
                 recordGender.toLowerCase() === gender.toLowerCase();
      });

      const formattedRecords = matchingRecords.map(line => {
        const [num, ownerName, recordPetType, recordBreed, recordAge, recordGender, compatibleDogs, compatibleCats, compatibleChildren, comment, email] = line.split(':');
        return `Owner Name: ${ownerName}, Pet Type: ${recordPetType}, Breed: ${recordBreed}, Age: ${recordAge}, Gender: ${recordGender}, Compatible Dogs: ${compatibleDogs}, Compatible Cats: ${compatibleCats}, Compatible Children: ${compatibleChildren}, Comments: ${comment}, Email: ${email}`;
    });

    res.send(formattedRecords.join('<br><br>'));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});