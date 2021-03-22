import { onNavigate } from "../../router.js"
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

        target.innerHTML = html;

        document.getElementById('access').addEventListener('click', (e) => {
          e.preventDefault();
          const emailSignIn = document.getElementById("emailSignIn").value;
            const passwordSignIn = document.getElementById("passwordSignIn").value;
            signIn(emailSignIn, passwordSignIn);
        });

        document.getElementById('newAccountLink').addEventListener('click', (e) => {
          e.preventDefault();
          onNavigate('/register');
        });
    
};

