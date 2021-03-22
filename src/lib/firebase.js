 //  aqui exportaras las funciones que necesites
const firebaseConfig = {
  apiKey: "AIzaSyCBbc4-QZcuS9hpij5G3SZUC3PS4yenuvQ",
  authDomain: "encounter-laboratoria2021.firebaseapp.com",
  projectId: "encounter-laboratoria2021",
  storageBucket: "encounter-laboratoria2021.appspot.com",
  messagingSenderId: "577031064049",
  appId: "1:577031064049:web:3b0acf39eaaad6ddbc5c50",
  measurementId: "G-NESVHDG3JE"
};
  
//  Initialize Firebase
firebase.initializeApp(firebaseConfig);

//  Obtiene los datos del usuario
export function getUser () {
  return firebase.auth().currentUser;
};

//  Registro de usuarios
export function registration(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      verify ();
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  };
  
  //  Login de usuarios
  export function signIn (emailSignIn, passwordSignIn) {
    firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
    .then((user) => {
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  };
  
  //  Salir de la sesión
  export function signOut() { 
    firebase.auth().signOut()
    .then(() => {
      console.log("saliendo");
  })
  .catch((error) => {
    console.log("error");
  });
};
  
  //  envía correo de verificación
  export function verify () {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
    console.log("enviando correo");
  }).catch(function(error) {
    console.log(error);
  });
  };
  
  //  Firestore
  const db = firebase.firestore();

//  guarda los post en firebase 
export const savePost = (title, postDescription, likes) =>
          db.collection("posts").doc().set({
            title,
            postDescription,
            likes,
          });

//  obtiene un post con un determinado id          
export const getPostById = async (id) => {
  const doc = await db.collection("posts").doc(id).get();
  return doc.data();
};

// guarda los correos de los usuarios que dan like en firebase 
export const likePost = (id, email) => {
  const updateRef = db.collection('posts').doc(id)
  return updateRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(email)
  });
};

// obtiene todas las publicaciones
export const getAllPosts = async () => {
  const querySnapshot = await db.collection('posts').get();
  const posts = [];
  querySnapshot.forEach(doc => {
    const post = doc.data();
    post.id = doc.id;
    posts.push(post);
  });
  return posts;
};

//  elimina posts
export const deletePost = id => db.collection("posts").doc(id).delete();

//  obtiene el post a editar
export const editPost = id => db.collection("posts").doc(id).get();

// actualiza el post una vez editado
export const upDatePost = (id, updatedPost) => db.collection("posts").doc(id).update(updatedPost);





  



















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