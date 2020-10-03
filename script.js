// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowercaseArray = "abcdefghijklmnopqrstuvwxyz".split("");
var uppercaseArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numericArray = "0123456789".split("");
var specialCharactersArray = " !\"#$%&'()*+,-./:;<=>?@[]\\^_`{|}~".split("");
var parameterTypesArray = [
	"lowercaseArray",
	"uppercaseArray",
	"numericArray",
	"specialCharactersArray",
];

// Write password to the #password input
function writePassword() {
	displayError(false);
	var params = getParams();
	var password = generatePassword(params);
	var passwordText = document.querySelector("#password");

	passwordText.value = password;

	copyToClipboard();
	displayError("Ps. I copied your new password to the clipboard");
}

//Get all of the parameters for the password generation
function getParams() {
	//Get the value for length and whether the box is checked for the other 4
	var passwordLength = document.getElementById("passwordLength").value;
	var lowercase = document.getElementById("lowerCaseCheckbox").checked;
	var uppercase = document.getElementById("upperCaseCheckbox").checked;
	var numeric = document.getElementById("numericCheckbox").checked;
	var specialCharacters = document.getElementById("specialCharacterCheckbox")
		.checked;

	//Return an object with each of the params
	return {
		passwordLength: passwordLength,
		lowercase: lowercase,
		uppercase: uppercase,
		numeric: numeric,
		specialCharacters: specialCharacters,
	};
}

//Generate the password based on params
function generatePassword(params) {
	//If the password length is outside of the bounds change it to the nearest end
	if (!params.passwordLength) {
		displayError("Ok lazy, I'll choose the password length for you. \n");
		params.passwordLength = Math.floor(Math.random() * 120) + 8;
	} else if (params.passwordLength < 8) {
		displayError(
			"Did you not see the instructions? It said choose a password length between 8 and 128. I'm not too picky though. \n"
		);
		params.passwordLength = 8;
	} else if (params.passwordLength > 128) {
		displayError(
			"Sadly I'm not that powerful... Here's the next best thing. \n"
		);
		params.passwordLength = 128;
	}

	var possibleValuesArray = [];
	//For each type of characters they want add that list of characters to the possible values array
	if (params.lowercase) possibleValuesArray.push(...lowercaseArray);
	if (params.uppercase) possibleValuesArray.push(...uppercaseArray);
	if (params.numeric) possibleValuesArray.push(...numericArray);
	if (params.specialCharacters)
		possibleValuesArray.push(...specialCharactersArray);

	//If no items are checked give them a random array of possible values
	if (possibleValuesArray.length === 0) {
		displayError(
			"Ummm... You can't create a password from nothing. I got your back though"
		);
		possibleValuesArray.push(...getRandomCharacterArray());
	}

	var password = "";
	//Run through this loop for each piece of the password
	for (var i = 0; i < params.passwordLength; i++) {
		//Add the index chosen randomly within the scope of the possibleValuesArray
		password +=
			possibleValuesArray[
				Math.floor(Math.random() * possibleValuesArray.length)
			];
	}

	return password;
}

function displayError(errorMessage) {
	if (errorMessage) {
		var error = document.createElement("p");
		error.textContent = errorMessage;
		document.querySelector(".errorMessage").append(error);
	} else document.querySelector(".errorMessage").innerHTML = "";
}

//Return a random character array
function getRandomCharacterArray() {
	var arrayNum = Math.floor(Math.random() * 4);

	//Depending on the random number choose a different array
	switch (arrayNum) {
		case 0:
			return lowercaseArray;
		case 1:
			return uppercaseArray;
		case 2:
			return numericArray;
		case 3:
			return specialCharactersArray;
	}
}

//Copy the password to the clipboard
function copyToClipboard() {
	/* Get the text field */
	var copyText = document.getElementById("password");

	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	/* Copy the text inside the text field */
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
