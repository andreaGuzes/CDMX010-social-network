import {registration} from "../firebase.js"
export const registerTemplate = (target) =>{
  const registerContent = `
  <div class="cabecera">  
    <div class="top">
      <div class="layer">
        <img src="img/encounter-logo.png" alt="Encounter, the feminist sound space">
      </div>
    </div>
    <div class="bottom-register">
      <div class="submit">
        <input class="input" type="text" placeholder="Name" style="text-align: center">
        <input class="input" type="text" placeholder="Last Name" style="text-align: center">
        <input class="input" type="text" placeholder="User" style="text-align: center">
        <input id= "email" class="input" type="text" placeholder="Email" style="text-align: center">
        <input id= "password" class="input" type="password" placeholder="Password" maxlength="16" style="text-align: center">
        <input class="input" type="password" placeholder="Confirm Password" maxlength="16" style="text-align: center">
        <button id="register">SUBMIT</button> 
        <div id="come-back-two">+</div>
        <p>Come back</p>
      </div>
    </div>
      `;

    target.innerHTML = registerContent;
    
    const register = document.getElementById("register");
    // document.getElementById('newAccountLink').addEventListener('click', (e) => {
    //   e.preventDefault();
    //   onNavigate('/register')
    // });

    register.addEventListener("click", () => { 
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        registration(email, password);
});
};

