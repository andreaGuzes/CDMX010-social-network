import {loginTemplate} from "./lib/views/login.js";
import {registerTemplate} from "./lib/views/register.js";
import {homeTemplate} from "./lib/views/home.js";

let firebase = null;

export const loadFirebase = (firebaseFromIndex) => {
    firebase = firebaseFromIndex;
};

export const routes = {
    "/": loginTemplate,
    "/register": registerTemplate,  
    "/home" : homeTemplate,  
};

const rootDiv = document.getElementById("root");

export const onNavigate = (pathname) => { 
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    );
    const view = routes[pathname];
    view(rootDiv, firebase);
};

window.onpopstate = () => {
    const view = routes[window.location.pathname];
    view(rootDiv, firebase);
};
