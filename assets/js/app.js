// Variables
const listaTweets = document.getElementById('lista-tweets');

// Event Listeners

eventListeners();

function eventListeners() {
    
     document.querySelector('#formulario').addEventListener('submit', agregarTweet);
     listaTweets.addEventListener('click', borrarTweet);
     document.addEventListener('DOMContentLoaded', localStorageListo);
}



// Funciones


// Añadir tweet del formulario
function agregarTweet(e) {

     e.preventDefault();
     // leer el valor del textarea
     const tweet = document.getElementById('tweet').value;
     // crear boton de eliminar
     const botonBorrar = document.createElement('i');
     botonBorrar.classList = 'borrar-tweet fas fa-trash-alt';
     //botonBorrar.innerText = 'X';

     // Crear elemento y añadirle el contenido a la lista
     const li = document.createElement('p');
     const i = document.createElement('i');
     const div = document.createElement('div');
     i.classList ='fas fa-lightbulb';
     li.innerText = tweet;
     // añade el botón de borrar al tweet
     div.appendChild(i);
     div.appendChild(botonBorrar);
     div.appendChild(li);
     // añade el tweet a la lista
     listaTweets.appendChild(div).classList.add('idea');
     // Añadir a Local Storage
     agregarTweetLocalStorage(tweet);

     document.getElementById('tweet').value= ''
}
// Elimina el Tweet del DOM
function borrarTweet(e) {
     e.preventDefault();
     if(e.target.className === 'borrar-tweet fas fa-trash-alt') {
          const idea =  e.target.parentElement;
          
          idea.remove();
          console.log(idea);
          const value = e.target.parentElement.lastChild.innerText;
          borrarTweetLocalStorage(value);
          
     } 
}
// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
     let tweets;

     tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet) {
          // crear boton de eliminar
          const botonBorrar = document.createElement('i');
          botonBorrar.classList = 'borrar-tweet fas fa-trash-alt';
          //botonBorrar.innerText = 'X';

          // Crear elemento y añadirle el contenido a la lista
          const p = document.createElement('p');
          const div = document.createElement('div');
          const i = document.createElement('i')
          i.classList ='fas fa-lightbulb';
          p.innerText = tweet;
          // añade el botón de borrar al 
          div.appendChild(i);
          div.appendChild(botonBorrar);
          div.appendChild(p);
          // añade el tweet a la lista
          listaTweets.appendChild(div).classList.add('idea');
     });
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
     let tweets;
     tweets = obtenerTweetsLocalStorage();
     // Añadir el nuevo tweet
     tweets.push(tweet);
     // Convertir de string a arreglo para local storage
     localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
     let tweets;
     // Revisamos los valoes de local storage
     if(localStorage.getItem('tweets') === null) {
          tweets = []; 
     } else {
          tweets = JSON.parse(localStorage.getItem('tweets') );
     }
     return tweets;
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {

     let tweets, tweetBorrar;
     // Elimina la X del tweet
     tweetBorrar = tweet;
     tweets = obtenerTweetsLocalStorage();

     tweets.forEach(function(tweet, index) {
          if(tweetBorrar === tweet) {
               tweets.splice(index, 1);
          }
     }) ;

     localStorage.setItem('tweets', JSON.stringify(tweets) );
     
}

function bienvenido() {
     alert("👋 Hola \n\n💻 ¿Quieres guardar algo ? ");
   }