// Este es el punto de entrada de tu aplicacion
import {loadFirebase, onNavigate, routes} from './router.js'
import * as firebaseClient from "./lib/firebase.js" 
//import '../firebase.js/auth' 


loadFirebase(firebaseClient);

document.addEventListener('DOMContentLoaded', () => {
  //onAuthStateChanged(function(user){ 
    firebase.auth().onAuthStateChanged(function(user){  
      if (user) {
          //console.log("usuario activo");
          let emailVerified = user.emailVerified;
          if (emailVerified === true){
            onNavigate('/home')
          }
          //console.log(user.uid);
  
          //console.log(user.emailVerified);
        } else  {
          swal("no existe usuario activo");
          onNavigate('/')
          // No user is signed in.
        }
      });
});
