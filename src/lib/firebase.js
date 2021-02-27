 // aqui exportaras las funciones que necesites
const firebaseConfig = {
  apiKey: "AIzaSyCBbc4-QZcuS9hpij5G3SZUC3PS4yenuvQ",
  authDomain: "encounter-laboratoria2021.firebaseapp.com",
  projectId: "encounter-laboratoria2021",
  storageBucket: "encounter-laboratoria2021.appspot.com",
  messagingSenderId: "577031064049",
  appId: "1:577031064049:web:3b0acf39eaaad6ddbc5c50",
  measurementId: "G-NESVHDG3JE"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function registration(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      verify ()
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
  };
  
  export function signIn (emailSignIn, passwordSignIn) {
    firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then((user) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  };
  
  export function signOut() { 
    firebase.auth().signOut()
    .then(() => {
      console.log("saliendo")
    // Sign-out successful.
  })
  .catch((error) => {
    console.log("error")
    // An error happened.
  });
};
  
  export function verify () {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("enviando correo");
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
  };
  

/*
export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};
*/
const db = firebase.firestore();
// db.collection("posts").orderBy("", "desc")

export const savePost = (title, postDescription) =>
          db.collection("posts").doc().set({
            title,
            postDescription,
            
          });
          
export const getPost = () => db.collection("posts").get();



// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current
//     // session only. Closing the window would clear any existing state even
//     // if a user forgets to sign out.
//     // ...
//     // New sign-in will be persisted with session persistence.
//     return firebase.auth().signInWithEmailAndPassword(email, password);
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     let errorCode = error.code;
//     console.log(errorCode)
//     let errorMessage = error.message;
//     console.log(errorMessage)
//   });



  



















/*
EXPERIMENTO 01

export function createPost(post){
  let {title, paragraph} = post;
  let createPost =`
      <div class="content">
          <h5>${title}</h5>
          <p>${paragraph}</p>
          <button>Cerrar sesión</button>
       `;
   return createPost;
  // if (user.emailVerified){ 
  //    contenido.innerHTML = `
  //    <p>Bienvenida</p>
  //    <button>Cerrar sesión</button>
  //     `
  //     };}
};

function setPost(settingContent){
  let postContainer = document.getElementById("home");
  contenido.addEventListener("click", () =>{
      if (user.emailVerified){  
          let emptyContent = '';
          settingContent.
      }
}
*/