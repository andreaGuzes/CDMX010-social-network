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

//export const auth = firebase.auth();
//export const onAuthStateChanged = firebase.auth().onAuthStateChanged;


export function getUser () {
  return firebase.auth().currentUser
};

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
  
 
 //construir una funcion para exportarla donde reciba como como parametro el ui y el documento
// edithlikes
/*
export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};
*/
const db = firebase.firestore();


export const savePost = (title, postDescription, likes) =>
          db.collection("posts").doc().set({
            title,
            postDescription,
            likes,
          });

          
export const getPostById = async (id) => {
  const doc = await db.collection("posts").doc(id).get();
  return doc.data()
}


export const likePost = (id, email) => {
  const updateRef = db.collection('posts').doc(id)
  return updateRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(email)
  })
}


// export const getAllPosts = async () => {
//   await db.collection('posts').onSnapshot((querySnapshot) => {
//     const posts = [];
//     querySnapshot.forEach(doc => {
//       const post = doc.data();
//       post.id = doc.id;
//       posts.push(post);
//     }); 
//   }) 
// }

export const getAllPosts = async () => {
  const querySnapshot = await db.collection('posts').get()
  const posts = [];
  querySnapshot.forEach(doc => {
    const post = doc.data();
    post.id = doc.id;
    posts.push(post);
  });
  return posts;
}

export const deletePost = id => db.collection("posts").doc(id).delete();

export const editPost = id => db.collection("posts").doc(id).get();

export const upDatePost = (id, updatedPost) => db.collection("posts").doc(id).update(updatedPost);


// export const getLikes = () => db.collection("likes").doc(id).get();
 


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