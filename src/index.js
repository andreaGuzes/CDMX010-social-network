// Este es el punto de entrada de tu aplicacion
import {onNavigate, routes} from './router.js'
 




const rootDiv = document.getElementById("root");

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function(user) {  
      if (user) {
          //console.log("usuario activo");
          let emailVerified = user.emailVerified;
          if (emailVerified === true){
            onNavigate('/home')
          }
          //console.log(user.uid);
  
          //console.log(user.emailVerified);
        } else  {
          alert("no existe usuario activo");
          onNavigate('/')
          // No user is signed in.
        }
      });
});

