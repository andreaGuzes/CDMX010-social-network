// Este es el punto de entrada de tu aplicacion
import {onNavigate, routes} from './router.js'
import { registration, signIn, verify } from "./lib/firebase.js" 




const rootDiv = document.getElementById("root");

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function(user) {  
      if (user) {
          console.log("usuario activo");
          let emailVerified = user.emailVerified;
          if (emailVerified === true){
            onNavigate('/home')
          }
          console.log(user);
  
          console.log(user.emailVerified);
        } else  {
          console.log("no existe usuario activo");
          onNavigate('/')
          // No user is signed in.
        }
      });
});

