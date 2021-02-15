var rec = document.body;
var envoi = document.getElementById('7');
var prenom = document.getElementById('1');
var spanPrenom = document.getElementById('2');
var emailA = document.getElementById('3');
var spanEmail = document.getElementById('4');
var message = document.getElementById('5');
var spanMessage = document.getElementById('6');
var find =/^[a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèêàçîï]+)?$/;
var emailf = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
rec.addEventListener('mousemove', f_valid);
rec.addEventListener('mousemove', f_validTrue);
envoi.addEventListener('click', f_valid);





function f_valid(e) {
  if (prenom.validity.valueMissing) {
    e.preventDefault();
    spanPrenom.textContent = 'Name required';
    spanPrenom.style.color = 'red';
  }
  else if (find.test(prenom.value) == false) {
    event.preventDefault();
    spanPrenom.textContent = 'Incorrect form';
    spanPrenom.style.color = 'red';
  }
  else if (prenom.value.length > 25) {
    e.preventDefault();
    spanPrenom.textContent = 'The name is too long';
    spanPrenom.style.color = 'red';
  }

  else if (emailA.validity.valueMissing) {
    e.preventDefault();
    spanEmail.textContent = 'Email required';
    spanEmail.style.color = 'red';
  }
  else if (emailf.test(emailA.value) == false) {
    event.preventDefault();
    spanEmail.textContent = 'Incorrect form';
    spanEmail.style.color = 'red';
  }
  else if (emailA.value.length > 50) {
    event.preventDefault();
    spanEmail.textContent = 'The email is too long';
    spanEmail.style.color = 'red';
  }
  else if (message.validity.valueMissing) {
    event.preventDefault();
    spanMessage.textContent = 'Message required';
    spanMessage.style.color = 'red';
  }
  else if (message.value.length < 30) {
    event.preventDefault();
    spanMessage.textContent = 'The text is too short';
    spanMessage.style.color = 'red';
  }
  else if (message.value.length > 200) {
    event.preventDefault();
    spanMessage.textContent = 'The text is too long';
    spanMessage.style.color = 'red';
  }
  else {}

}

function f_validTrue(e) {

  if (find.test(prenom.value) & prenom.value.length <= 25) {
    spanPrenom.textContent = 'form accepted';
    spanPrenom.style.color = 'green';
  }
  if(emailf.test(emailA.value) & emailA.value.length <= 50) {
    spanEmail.textContent = 'form accepted';
    spanEmail.style.color = 'green';
  }
  if(message.value.length >= 30 & message.value.length <=200) {
    spanMessage.textContent = 'text accepted';
    spanMessage.style.color = 'green';
  }
  else {}
}
