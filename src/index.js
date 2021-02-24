// import { loginTemplate} from "./lib/views/login.js";
// import {registerTemplate } from "./lib/views/register.js";
import {onNavigate, routes} from './router.js'
import { registration, signIn } from "./lib/firebase.js" 
// import {render} from "./router.js"
// Este es el punto de entrada de tu aplicacion

const rootDiv = document.getElementById("root");
// loginTemplate(rootDiv)
// registerTemplate()


// document.getElementById('root').innerHTML = loginTemplate;

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function(user) {  
      if (user) {
        // const emailVerified = user.emailVerified;
          console.log("usuario activo");
          // home(user);
          console.log(user);
          // let emailVerified = user.emailVerified;
          // emailVerified===true
  
          console.log(user.emailVerified);
          let emailVerified = user.emailVerified;
          onNavigate('/');
          // User is signed in.
          // let displayName = user.displayName;
          // let email = user.email;
          // console.log(displayName);
          // console.log(email);
        } else {
          console.log("no existe usuario activo");
          // emailVerified===false
          onNavigate('/')
          // No user is signed in.
        }
      });
});



// const newUser = document.querySelector("#newAccount");
// newUser.addEventListener("click", () => {
// 	registerTemplate();
// });


// const registro = document.getElementById("NewAccount");
// render(registro, registerTemplate);




/*
crear una funcion que despliegue mi home, cuando el usuario de click (addEventListener) en 
el botón de Submit y este sea admitido por el observador. Clausula: la manipulación del DOM
tiene que ir en login.js
*/

// const displayHome = document.getElementById("home");
// if (user.emailVerified){
//     content()
// };

