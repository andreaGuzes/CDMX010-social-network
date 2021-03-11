import {savePost, getPostById, getUser, signOut, deletePost, editPost, upDatePost, likePost, getAllPosts} from "../firebase.js"

const CardPost = (post, email) => {
  return `
  <div id= "postContainer">
  <div id = "btnContenedor" class="btnContenedor">
  <p id ="btn">...</p>
  <div id= "btnLista" class= "btnLista">
  <li id="btnEdits" class="btnEdit" data-id="${post.id}" >Edit</li>
  <li id="btnDeletes" class="btnDelete" data-id="${post.id}">Delete</li>              
  </div>
  </div>
  <div class = "postPlace">
  <h3 id="postTitle">${post.title}</h3>
  <p id="postDescription">${post.postDescription}</p>
  </div>
  <div class="containerLikeBtn">
  <button id="likeBtn" class="likeButtons" data-id="${post.id}">
  <i class= "fa fa-thumbs-up"></i>
  </button>
  <div class="inputLikes" data-id="${post.id}"></div>
  </div>
  </div>
  `
}

export const homeTemplate = async (target) => {
  const html = `
  <div class = "cabeceraHome">  
  <div class = "topHome">
  <div class = "layerHome">
  <img src = "img/encounter-logo.png" alt = "Encounter, the feminist sound space">
  </div>
  </div>
  </div>
  <div class = "main">
  <h1 class="welcome">Bienvenida, comparte tus publicaciones aquí:</h1>
  <div class = "bodyHome">
  <div class = "loginHome"></div>
  </div>
  <form id = "post-form">
  <div>
  <textarea id = "post-title" autofocus required></textarea>
  </div>
  <div>
  <textarea id = "post-description" required></textarea>
  </div>
  <button id = "btn-post-form">SAVE</button>
  </form>
  <div id = "postConteiner"></div>
  </div>
  <p id= "signOutBtn">SING OFF</p>
  <footer id = "footer-home"><b>encounter</b>, the feminist sound space</footer>
  `;
  
  target.innerHTML = html
  
  const postForm = document.getElementById("post-form");
  const postContainer = document.getElementById("postConteiner");
  let editStatus = false;
  
  let id = "";
  const user = getUser()
  
  

 // onGetPosts((querySnapshot) => {
  //const prueba = async (onGetPosts) => {  
     async function renderPosts () { 
  const posts = await getAllPosts();
  const postTemplates = posts.map(post => CardPost(post, user.email));               
  postContainer.innerHTML = postTemplates.join('');
// }
// renderPosts();

   //DELATE
  const btnDelete = document.querySelectorAll(".btnDelete");
  
  btnDelete.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      let confirmDelete = confirm('¿Desea eliminar esta publicación?');
      if (confirmDelete) {
        await  deletePost(e.target.dataset.id)
        renderPosts();
      }
    })
  })
  
  // EDIT
  
  const btnsEdit = document.querySelectorAll(".btnEdit");
  btnsEdit.forEach(btn => {
    btn.addEventListener("click", async e => {
      const doc = await editPost(e.target.dataset.id);
      const post = doc.data();
      editStatus = true;
      id = doc.id;
      //console.log(id)
      
      postForm["post-title"].value = post.title;
      postForm["post-description"].value = post.postDescription;
      postForm["btn-post-form"].innerText ="Update";
    
      
    }) 
  })
  
  let likeBtns = document.querySelectorAll(".likeButtons");
  likeBtns.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const postId = e.currentTarget.dataset.id
      const foundPost = await getPostById(postId)
      //debugger
      if (! foundPost.likes.includes(user.email)) {
        foundPost.likes.push(user.email)
        likePost(postId, user.email)
        //renderPosts(); 
      } else {
        console.log('Este usario ', user.email, ' ya dio like')
      } 
       let conteo = foundPost.likes.length;
        const countLike = document.querySelector(`.inputLikes[data-id="${postId}"]`);
        countLike.innerHTML = conteo;
    });
    
  });
}
renderPosts();
   
  //save
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = postForm["post-title"];
    // console.log(title.value);
    const postDescription = postForm["post-description"];
    // console.log(postDescription.value);
    title.focus();
    if (!editStatus) {
      await savePost (title.value, postDescription.value, []);
      postForm.reset();
      renderPosts();
    } else {
      await upDatePost (id, {
        title: title.value,
        postDescription: postDescription.value
        
      });
      editStatus =false;
      id = "";
      postForm["btn-post-form"].innerText="SAVE";
      postForm.reset();
      renderPosts();
    }
    
  });
  
  
 

  
  // disabled="${post.likes.includes(email)}"
  

  const signOff = document.getElementById("signOutBtn");
  signOff.addEventListener("click", ()  => {
    signOut()
  });
};



// <button id="likeBtn" class="likeBtn">
//     <i class= "fa fa-thumbs-up"></i>
//   </button>
//   <input type="number" id="inputLike" class= "inputLike" value = "0" name = "">
//   </div>