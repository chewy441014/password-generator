/*
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
*/

// Assignment code here
function generatePassword() {
  [passLength, lowercase, uppercase, numeric, special] = getPassInfo();
  var newPass = "";
  for (let i = 0; i < passLength; i++) {
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
    console.log(randChars);
    while (true) {
      var randNum = getRandomInt(0,3);
      if (randChars[randNum] != "") {
        newPass = newPass + randChars[randNum];
        console.log(newPass);
        break;
      }
    }
  }
  return newPass;
}

function getRandomLc() {
  return String.fromCharCode(getRandomInt(97, 122));
}

function getRandomUp() {
  return String.fromCharCode(getRandomInt(65, 90));
}

function getRandomNum() {
  return String.fromCharCode(getRandomInt(48, 57));
}

function getRandomSpe() {
  var randArray = [String.fromCharCode(getRandomInt(33,47)), String.fromCharCode(getRandomInt(58,64)), String.fromCharCode(getRandomInt(91,96)), String.fromCharCode(getRandomInt(123,126))];
  return randArray[getRandomInt(0,3)];
}

function getPassInfo() {
  while (true) {
    var passLength = parseInt(prompt("How many characters long do you want this password to be? ", 12));
    if (typeof (passLength) === 'number') {
      // the user input is the correct type
      if (passLength > 7 && passLength < 129) {
        break;
      } else {
        alert("Please input a number between 8 and 128. ");
      }
    } else {
      alert("Please input a number between 8 and 128. ");
    }
  }
  var lowercase = confirm("Include lower case letters? OK: Yes, CANCEL: No. ");
  var uppercase = confirm("Include upper case letters? OK: Yes, CANCEL: No. ");
  var numeric = confirm("Include numbers? OK: Yes, CANCEL: No. ");
  var special = confirm("Include special characters? OK: Yes, CANCEL: No. ");
  while (!lowercase && !uppercase && !numeric && !special) {
    console.log([lowercase, uppercase, numeric, special]);
    lowercase = confirm("Include lower case letters? OK: Yes, CANCEL: No. ");
    uppercase = confirm("Include upper case letters? OK: Yes, CANCEL: No. ");
    numeric = confirm("Include numbers? OK: Yes, CANCEL: No. ");
    special = confirm("Include special characters? OK: Yes, CANCEL: No. ");
  }
  return [passLength, lowercase, uppercase, numeric, special];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  console.log(passwordText);

  passwordText.value = password;

  

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
