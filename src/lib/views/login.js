import { onNavigate } from '../../router.js'
import {signIn} from "../firebase.js"

export const loginTemplate = (target) => {
    const html = `
        <div class="cabecera">
        <div class="top">
          <div class="layer">
            <img src="img/encounter-logo.png" alt="Encounter, the feminist sound space">
          </div>
        </div>
        <div class="bottom">
          <div class="login">
            <input id= "emailSignIn" class="input" type="email" placeholder="Email" style="text-align: center">
            <input id= "passwordSignIn" class="input" type="password" placeholder="Contraseña" maxlength="16" style="text-align: center">
            <button id="access">LOGIN</button> 
          </div>
          <div class="not-password-yet">
            <div id="newAccount" style="text-align:center"><a href="#" id="newAccountLink">+</a></div>
            <p>Not password yet?</p>
          </div>
        </div>
        `;

        target.innerHTML = html


        document.getElementById('access').addEventListener('click', (e) => {
          e.preventDefault();
          const emailSignIn = document.getElementById("emailSignIn").value
             console.log(emailSignIn);
            const passwordSignIn = document.getElementById("passwordSignIn").value;
            signIn(emailSignIn, passwordSignIn);
                console.log("este usuario si pudo ingresar");
        });

        document.getElementById('newAccountLink').addEventListener('click', (e) => {
          e.preventDefault();
          onNavigate('/register')
        });
        
//         const access = document.getElementById("access");
//          access.addEventListener("click", () => { 

//             const emailSignIn = document.getElementById("emailSignIn").value
//              console.log(emailSignIn);
//             const passwordSignIn = document.getElementById("passwordSignIn").value;
//             signIn(emailSignIn, passwordSignIn);
//                 console.log("este usuario si pudo ingresar");
//  });

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     let errorCode = error.code;
//     console.log(errorCode)
//     let errorMessage = error.message;
//     console.log(errorMessage)
//   });
};

