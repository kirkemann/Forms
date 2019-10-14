// JavaScript Document

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('email');
// Form
const form = document.getElementById('myForm');
// Validation colors
const green = '#4CAF50';
const red = '#F44336';


//FORNAVN OG EFTERNAVN VALIDATE START

// Validators
function validateFirstName() {
  // check if is empty
  if (checkIfEmpty(firstName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}


function validateLastName() {
  // check if is empty
  if (checkIfEmpty(lastName)) return;
  // is if it has only letters
  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}
function checkIfEmpty(field){
	if(isEmpty(field.value.trim())){
		// set field invalid
		setInvalid(field, `${field.name} må ikke være tom`);
		return true;
	}else {
		// set field valid
		setValid(field);
		return false;
	}
}

function isEmpty(value){
	if(value === '') return true;
	return false;
	
}
function setInvalid(field, message){
	field.className = 'invalid';
	field.nextElementSibling.innerHTML = message;
	field.nextElementSibling.style.color = red;
}
function setValid(field){
	field.className = 'valid';
	field.nextElementSibling.innerHTML = '';
	field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field){
	if(/^[a-zA-Z ]+$/.test(field.value)){
		setValid(field);
		return true;
	} else {
		setInvalid(field, `${field.name} må kun indholde bogstaver`);
		return false;
	}
}

// FORNAVN OG EFTERNAVN VALIDATE SLUT

// PASSWORD VALIDATE START

function validatePassword(){
	if(checkIfEmpty(password)) return;
	if(!meetLength(password, 4, 100)) return;
	//check password against our character set
	// 1- a
	// 2- a 1
	// 3- A a 1
	// 4- A a 1 @
	if(!containsCharacters(password, 4)) return;
	return true;	
}

function containsCharacters(field, code) {
	let regEx;
	switch (code) {
		case 1:
			regEx = /(?=.*[a-zA-Z])/;
			return matchWithRegEx(regEx, field, 'skal indholde mindst et bogstav');
			
		case 2:
			regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
			return matchWithRegEx(regEx, field, 'skal indholde mindst et bogstav og et tal');
		case 3:
			regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
			return matchWithRegEx(regEx, field, 'skal indholde mindst et lille bogstav og et stor bogstav og et tal');
		case 4:
			regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
			return matchWithRegEx(regEx, field, 'skal indholde mindst et lille bogstav og et stor bogstav og et tal og et symbol');
		case 5:
			regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return matchWithRegEx(regEx, field, 'Skal være en godkendt email adresse');
		default:
			return false;
	}
}

function matchWithRegEx(regEx, field, message) {
	if (field.value.match(regEx)) {
		setValid(field);
		return true;
	} else {
		setInvalid(field, message);
		return false;
	}
	
}


function meetLength(field, minLength, maxLength){
	if(field.value.length >= minLength && field.value.length < maxLength){
		setValid(field);
		return true;
	}else if(field.value.length < minLength){
		setInvalid(field, `${field.name} skal være mindst ${minLength} tegn lang`);
		return false;
	}else {
		setInvalid(field, `$(field.name) skal være korter $(maxLength) tegn`);
		return false;
	}
}

// PASSWORD VALIDATE SLUT


// CONFIRM PASSWORD VALIDATE START

function validateConfirmPassword(){
	if(password.className !== 'valid') { 
		setInvalid(confirmPassword, 'Password skal være valideret');
		return;
	}
	if (password.value !== confirmPassword.value) {
		setInvalid(confirmPassword, 'Password skal være ens');
		return ;
	} else {
		setValid(confirmPassword);
	}
	return true;
}
// CONFIRM PASSWORD VALIDATE SLUT


// EMAIL VALIDATE START

function validateEmail(){
	if(checkIfEmpty(email)) return;
	if(!containsCharacters(email, 5)) return;
	return true;
}

// EMAIL VALIDATE SLUT


//LOADERBAR START 
form.addEventListener('submit', function(event){
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) 
  {
    const name = firstName.value;
    const container = document.querySelector('div.container');
    const loader = document.createElement('div');
    loader.className = 'progress';
    const loadingBar = document.createElement('div');
    loadingBar.className = 'indeterminate';
    loader.appendChild(loadingBar);
    container.appendChild(loader);
    setTimeout(function() {
      const loaderDiv = document.querySelector('div.progress');
      const panel = document.createElement('div');
      panel.className = 'card-panel green';
      const text = document.createElement('span');
      text.className = 'white-text';
      text.appendChild(document.createTextNode(`Sign up successful, welcom to SocialApe ${name}`));
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);
  }
});
//LOADERBAR SLUT 

