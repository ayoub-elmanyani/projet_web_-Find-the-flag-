var rec = document.body;
var envoi = document.getElementById('submit');

var prenom = document.getElementById('prenom');
var spanPrenom = document.getElementById('1');
var nom = document.getElementById('nom');
var spanNom = document.getElementById('2');
var username = document.getElementById('username');
var spanUsername = document.getElementById('3');
var sexeM = document.getElementById('sexeM');
var sexeF = document.getElementById('sexeF');
var spanSexe = document.getElementById('4');
var age = document.getElementById('age');
var spanAge = document.getElementById('5');
var email = document.getElementById('email');
var spanEmail = document.getElementById('6');
var password = document.getElementById('password');
var spanPassword = document.getElementById('7');
var retapepassword = document.getElementById('retapepassword');
var spanRetapepassword = document.getElementById('8');
var image = document.getElementById('image');
var image1 = document.getElementById('image1');





var findprenom =/^[a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+)?$/;
var findnom =/^[a-zA-ZéèîïÉÈÏÎ][a-zA-Zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+)?$/;
var findusername =/^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/;
var findage =/^(0?[3-9]|[1-9][0-9]|100)$/;
var findemail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var findpassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;

rec.addEventListener('mousemove', f_valid);
rec.addEventListener('mousemove', f_validTrue);
envoi.addEventListener('click', f_valid);
image.addEventListener('mouseover', f_over);
image1.addEventListener('mouseover', f_over1);
image.addEventListener('mouseout', f_up);
image1.addEventListener('mouseout', f_up1);





function f_valid(e) {
  if (prenom.validity.valueMissing) {
    e.preventDefault();
    spanPrenom.textContent = 'First name required';
    spanPrenom.style.color = 'red';
  }
  else if (findprenom.test(prenom.value) == false) {
    event.preventDefault();
    spanPrenom.textContent = 'Incorrect form';
    spanPrenom.style.color = 'red';
  }
  else if (prenom.value.length > 25) {
    e.preventDefault();
    spanPrenom.textContent = 'The first name is too long';
    spanPrenom.style.color = 'red';
  }
  else if (nom.validity.valueMissing) {
    e.preventDefault();
    spanNom.textContent = 'Last name required';
    spanNom.style.color = 'red';
  }
  else if (findnom.test(nom.value) == false) {
    event.preventDefault();
    spanNom.textContent = 'Incorrect form';
    spanNom.style.color = 'red';
  }
  else if (nom.value.length > 25) {
    e.preventDefault();
    spanNom.textContent = 'The last name is too long';
    spanNom.style.color = 'red';
  }
  else if (username.validity.valueMissing) {
    event.preventDefault();
    spanUsername.textContent = 'username required';
    spanUsername.style.color = 'red';
  }
  else if (findusername.test(username.value) == false) {
    event.preventDefault();
    spanUsername.textContent = 'Incorrect form';
    spanUsername.style.color = 'red';
  }
  else if (username.value.length > 15) {
    event.preventDefault();
    spanUsername.textContent = 'The username is too long';
    spanUsername.style.color = 'red';
  }
  else if (username.value.length < 5) {
    event.preventDefault();
    spanUsername.textContent = 'The username is too short';
    spanUsername.style.color = 'red';
  }
  else if (!(sexeM.checked) & !(sexeF.checked)) {
    event.preventDefault();
    spanSexe.textContent = 'sexe required';
    spanSexe.style.color = 'red';
  }
  else if (age.validity.valueMissing) {
    event.preventDefault();
    spanAge.textContent = 'age required';
    spanAge.style.color = 'red';
  }
  else if (findage.test(age.value) == false) {
    event.preventDefault();
    spanAge.textContent = 'Incorrect form or your age isn\'t accepted';
    spanAge.style.color = 'red';
  }
  else if (email.validity.valueMissing) {
    e.preventDefault();
    spanEmail.textContent = 'Email required';
    spanEmail.style.color = 'red';
  }
  else if (findemail.test(email.value) == false) {
    event.preventDefault();
    spanEmail.textContent = 'Incorrect form';
    spanEmail.style.color = 'red';
  }
  else if (email.value.length > 50) {
    event.preventDefault();
    spanEmail.textContent = 'The email is too long';
    spanEmail.style.color = 'red';
  }
  else if (password.validity.valueMissing) {
    e.preventDefault();
    spanPassword.textContent = 'password required';
    spanPassword.style.color = 'red';
  }
  else if (findpassword.test(password.value) == false) {
    event.preventDefault();
    spanPassword.textContent = 'Of 8 to 15 caracteres including\n      1 lowercase, 1 uppercase, 1 number,\n      1 special caracter #$^+()=!*@%&';
    spanPassword.style.color = 'red';
  }
  else if (retapepassword.validity.valueMissing) {
    e.preventDefault();
    spanRetapepassword.textContent = 'retape your password';
    spanRetapepassword.style.color = 'red';
  }
  else if (!(password.value == retapepassword.value)) {
    event.preventDefault();
    spanRetapepassword.textContent = 'It\'s not the same password';
    spanRetapepassword.style.color = 'red';
  }


  else {}

}

function f_validTrue(e) {

  if (findprenom.test(prenom.value) & prenom.value.length <= 25) {
    spanPrenom.textContent = 'form accepted';
    spanPrenom.style.color = 'green';
  }
  if(findnom.test(nom.value) & nom.value.length <= 25) {
    spanNom.textContent = 'form accepted';
    spanNom.style.color = 'green';
  }
  if(findusername.test(username.value) & username.value.length <= 15 & username.value.length >= 5) {
    spanUsername.textContent = 'form accepted';
    spanUsername.style.color = 'green';
  }
  if (sexeM.checked | sexeF.checked) {
    event.preventDefault();
    spanSexe.textContent = 'sexe entred';
    spanSexe.style.color = 'green';
  }
  if (findage.test(age.value)) {
    spanAge.textContent = 'age accepted';
    spanAge.style.color = 'green';
  }
  if(findemail.test(email.value) & email.value.length <= 50) {
    spanEmail.textContent = 'form accepted';
    spanEmail.style.color = 'green';
  }
  if(findpassword.test(password.value)) {
    spanPassword.textContent = 'password accepted';
    spanPassword.style.color = 'green';
  }
  if(password.value == retapepassword.value & password.value != "") {
    spanRetapepassword.textContent = 'the same password';
    spanRetapepassword.style.color = 'green';
  }

  else {}
}


function f_over(){
  image.src = "image/close.jpg";
  password.type="text";
}

function f_over1(){
  image1.src = "image/close.jpg";
  retapepassword.type="text";
}

function f_up(){
  image.src = "image/open.jpg";
  password.type="password";
}

function f_up1(){
  image1.src = "image/open.jpg";
  retapepassword.type="password";
}
