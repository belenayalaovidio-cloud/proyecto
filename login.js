function ingresar(){

let usuario=document.getElementById("usuario").value;

let password=document.getElementById("password").value;

if(usuario=="admin" && password=="1234"){

window.location="index.html";

}else{

document.getElementById("mensaje").innerHTML="Usuario o contraseña incorrectos";

document.getElementById("mensaje").style.color="red";

}

}