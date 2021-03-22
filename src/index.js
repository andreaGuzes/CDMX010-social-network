// Este es el punto de entrada de tu aplicacion
import { loadFirebase, onNavigate } from './router.js'
import * as firebaseClient from './lib/firebase.js' 
 
loadFirebase(firebaseClient);

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function(user){  
      if (user) {
          let emailVerified = user.emailVerified;
          if (emailVerified === true){
            onNavigate('/home');
          }
        } else  {
          swal("no existe usuario activo");
          onNavigate('/');
        }
      });
});
