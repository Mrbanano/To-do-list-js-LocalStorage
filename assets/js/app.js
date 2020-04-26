// Variables
const body = document.body.classList;
const tweetTextArea = document.getElementById("tweet");
const BntAgregar = document.getElementById("btn");
const listaTweets = document.getElementById("lista-tweets");
const botonModo = document.querySelector("#switch");
const cards = document.getElementsByClassName('idea');
var divDark = false;
// Event Listeners

eventListeners();
establecerModo();


function eventListeners() {
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);
  listaTweets.addEventListener("click", borrarTweet);
  document.addEventListener("DOMContentLoaded", localStorageListo);
  botonModo.addEventListener("click", cambiarModo);
}

// Funciones
function establecerModo() {
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    botonModo.classList.add("active");
    tweetTextArea.classList.add("darkfontA");
    BntAgregar.classList.add("darkfontB");
    divDark = true;
  } else {
    document.body.classList.remove("dark");
    botonModo.classList.remove("active");
    tweetTextArea.classList.remove("darkfontA");
    BntAgregar.classList.remove("darkfontB");
    divDark = false;
  }
}
function GuardarModo() {
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "true");
    divDark = true;
  } else {
    localStorage.setItem("dark-mode", "false");
    divDark = false;
  }
}
function cambiarModo(e) {
  e.preventDefault();
  body.toggle("dark");
  botonModo.classList.toggle("active");
  tweetTextArea.classList.toggle("darkfontA");
  BntAgregar.classList.toggle("darkfontB");
  //location.reload();
  GuardarModo();
}

function confirmarBorrado() {
  //Ingresamos un mensaje a mostrar
  var mensaje = confirm("¿Quieres eleminar esta idea?");
  //Detectamos si el usuario acepto el mensaje
  if (mensaje) {
    return true;
  }
  //Detectamos si el usuario denegó el mensaje
  else {
    return false;
  }
}

// crear boton de eliminar
function CrearBotonBorrar() {
  const botonBorrar = document.createElement("i");
  botonBorrar.classList = "borrar-tweet fas fa-trash-alt";
  return botonBorrar;
}

function CrearIcono() {
  const i = document.createElement("i");
  i.classList = "fas fa-lightbulb";
  return i;
}
function CrearParafo(tweet){
     const p = document.createElement("p");
    p.innerText = tweet;
    return p;
}
//crear div
function CrearDiv(icono,boton,parrafo) {
  var clase = "idea";

  if (divDark === true) {
    clase = clase + " " + "darkidea";
  } else {
    clase = clase;
  }
  const div = document.createElement("div");
  
  div.classList = clase;
  div.appendChild(icono);
  div.appendChild(boton);
  div.appendChild(parrafo);

  return div;
}

// Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  // leer el valor del textarea
  const tweet = tweetTextArea.value;
  if (tweet.length === 0) {
    alert("👋 Hey \n\n💻 No podemos guardar ideas en blanco ");
  } else {
     const icono = CrearIcono();
     const boton = CrearBotonBorrar();
     const p= CrearParafo(tweet);
     const div=CrearDiv(icono,boton,p)
    listaTweets.appendChild(div);
    // Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
    document.getElementById("tweet").value = "";
  }
}
// Elimina el Tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet fas fa-trash-alt") {
    const borrar = confirmarBorrado();
    if (borrar) {
      const idea = e.target.parentElement;
      idea.remove();
      console.log(idea);
      const value = e.target.parentElement.lastChild.innerText;
      borrarTweetLocalStorage(value);
    } else {
      return true;
    }
  }
}
// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet) {
     const icono = CrearIcono();
     const boton = CrearBotonBorrar();
     const p= CrearParafo(tweet);
     const div=CrearDiv(icono,boton,p)
    listaTweets.appendChild(div);
  });
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  // Añadir el nuevo tweet
  tweets.push(tweet);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  // Revisamos los valoes de local storage
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  // Elimina la X del tweet
  tweetBorrar = tweet;
  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function bienvenido() {
  alert("👋 Hola \n\n💻 ¿Quieres guardar algo ? ");
}
