var rec = document.body;
var image = document.getElementById('image');


image.addEventListener('mouseover', f_over);
image.addEventListener('mouseout', f_up);


function f_over(){
  image.src = "image/close.jpg";
  password.type="text";
}



function f_up(){
  image.src = "image/open.jpg";
  password.type="password";
}
