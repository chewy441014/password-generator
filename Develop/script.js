// Assignment code here
function generatePassword() {
  // Get password info from the getPassInfo function, this info is required for making the correct password
  [passLength, lowercase, uppercase, numeric, special] = getPassInfo();
  // Initialize the new password outside the loop so that each step of the loop builds the password one character at a time. 
  var newPass = "";
  // Iterate through the length of the password, each iteration will add one character to the new password. 
  for (let i = 0; i < passLength; i++) {
    // Initialize the random characters and assign them if the user wants that type
    var randChars = ["", "", "", ""];
    if (lowercase) {
      randChars[0] = getRandomLc();
    }
    if (uppercase) {
      randChars[1] = getRandomUp();
    }
    if (numeric) {
      randChars[2] = getRandomNum();
    }
    if (special) {
      randChars[3] = getRandomSpe();
    }
    // Show the array of random characters to the console
    console.log(randChars);
    // Loop to select a random index of the allowable characters. Looping is required so that the index does not select a random value which is blank. 
    while (true) {
      // Get a random index for randChars
      var randNum = getRandomInt(0, 3);
      // If that value is acceptable, then add it to new password and break out of the while loop. Otherwise, get a new random index and try again. 
      // This code runs after the validation has been performed so the assumption is that the randChars array is not empty
      if (randChars[randNum] != "") {
        newPass = newPass + randChars[randNum];
        console.log(newPass);
        break;
      }
    }
  }
  // Return the new password
  return newPass;
}

// Get a random lower case letter from char code and convert it to a string
function getRandomLc() {
  return String.fromCharCode(getRandomInt(97, 122));
}

// Get a random upper case letter from char code and convert it to a string
function getRandomUp() {
  return String.fromCharCode(getRandomInt(65, 90));
}

// Get a random number from char code and convert it to a string
function getRandomNum() {
  return String.fromCharCode(getRandomInt(48, 57));
}

// Get a random special character from char code and convert it to a string
function getRandomSpe() {
  var randArray = [String.fromCharCode(getRandomInt(33, 47)), String.fromCharCode(getRandomInt(58, 64)), String.fromCharCode(getRandomInt(91, 96)), String.fromCharCode(getRandomInt(123, 126))];
  return randArray[getRandomInt(0, 3)];
}

// Asks the user for the password information and handles looping through the validation steps in case they did not enter the data as expected. 
function getPassInfo() {
  // Loop to require the correct field to be input
  while (true) {
    // Ask the user for info, convert it to an integer. 
    var passLength = parseInt(prompt("How many characters long do you want this password to be? ", 12));
    // If the type is wrong, try again, otherwise check if the number is between 8 and 128 inclusive, if not try again
    if (typeof (passLength) === 'number') {
      if (passLength > 7 && passLength < 129) {
        break;
      } else {
        alert("Please input a number between 8 and 128. ");
      }
    } else {
      alert("Please input a number between 8 and 128. ");
    }
  }
  // Initialize and ask the user for more info (confirm returns type bool)
  var lowercase = confirm("Include lower case letters? OK: Yes, CANCEL: No. ");
  var uppercase = confirm("Include upper case letters? OK: Yes, CANCEL: No. ");
  var numeric = confirm("Include numbers? OK: Yes, CANCEL: No. ");
  var special = confirm("Include special characters? OK: Yes, CANCEL: No. ");
  // Loop to require at least one selection
  while (!lowercase && !uppercase && !numeric && !special) {
    // Log the boolean selections
    console.log([lowercase, uppercase, numeric, special]);
    lowercase = confirm("Include lower case letters? OK: Yes, CANCEL: No. ");
    uppercase = confirm("Include upper case letters? OK: Yes, CANCEL: No. ");
    numeric = confirm("Include numbers? OK: Yes, CANCEL: No. ");
    special = confirm("Include special characters? OK: Yes, CANCEL: No. ");
  }
  // Return all the password info which has now been verified and has types
  // [number, boolean, boolean, boolean, boolean]
  return [passLength, lowercase, uppercase, numeric, special];
}

// Get a random number between min and max inclusive.
function getRandomInt(min, max) {
  // Round min up to the nearest integer
  min = Math.ceil(min);
  // Round max down to the nearest integer
  max = Math.floor(max);
  // max - min + 1 is the range of the set
  // Adding min gives the offset of the set
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Starter code

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
