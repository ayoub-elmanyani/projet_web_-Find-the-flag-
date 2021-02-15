var rec = document.body;
var envoi = document.getElementById('submit');

var password = document.getElementById('newpassword');
var spanPassword = document.getElementById('1');
var image = document.getElementById('image');


var findpassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/;


image.addEventListener('mouseover', f_over);
image.addEventListener('mouseout', f_up);
rec.addEventListener('mousemove', f_valid);
rec.addEventListener('mousemove', f_validTrue);
envoi.addEventListener('click', f_valid);






function f_valid(e) {

  if (password.validity.valueMissing) {
    e.preventDefault();
    spanPassword.textContent = 'password required';
    spanPassword.style.color = 'red';
  }
  else if (findpassword.test(password.value) == false) {
    event.preventDefault();
    spanPassword.textContent = 'Of 8 to 15 caracteres including\n1 lowercase, 1 uppercase, 1 number,\n1 special caracter #$^+()=!*@%&';
    spanPassword.style.color = 'red';
  }
  else {}

}

function f_validTrue(e) {

  if(findpassword.test(password.value)) {
    spanPassword.textContent = 'password accepted';
    spanPassword.style.color = 'green';
  }

  else {}
}


function f_over(){
  image.src = "image/close.jpg";
  password.type="text";
}



function f_up(){
  image.src = "image/open.jpg";
  password.type="password";
}
