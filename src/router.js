import {loginTemplate} from "./lib/views/login.js";
import {registerTemplate} from "./lib/views/register.js";
import {homeTemplate} from "./lib/views/home.js";

// const contact = (target) => {
//     const html = `<h1>contacto</h1>`
//     target.innerHTML = html
// }

let firebase = null

export const loadFirebase = (firebaseFromIndex) => {
    firebase = firebaseFromIndex
}

export const routes = {
    "/": loginTemplate,
    "/register": registerTemplate,  
    "/home" : homeTemplate,
    // "/contact": contact,  
};

const rootDiv = document.getElementById("root");
// rootDiv.innerHTML= routes [window.location.pathname];

export const onNavigate = (pathname) => { 
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    const view = routes[pathname]
    view(rootDiv, firebase);
};

window.onpopstate = () => {
    const view= routes[window.location.pathname]
    view(rootDiv, firebase);
};


// document.querySelector('.come-back-two').addEventListener('click', (e) => {
//   e.preventDefault();
//   onNavigate('/')
// });
// export const onNavifate = (pathname) => {

//     window.history.pushState (
//         {},
//         pathname,
//         window.location.origin + pathname
//         )
//         rootDiv.innerHTML = routes[pathname];
//         if(pathname=="/"){
//             console.log("login")
//             loginWithMail();
//             navLinkVisibilityWithoutLogin();
            
//         }else if(pathname=="/home") {
//             console.log("registro")
//             loginWithMail();
//             navLinkVisibilityWithoutLogin();
//         }else if(pathname=="/home") {
//             onsole.log("home")
//             loginWithMail();
//             navLinkVisibilityWithoutLogin();
//         }
// }
