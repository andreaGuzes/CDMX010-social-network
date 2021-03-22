//Pinta todos los posts publicados en el home
export const CardPost = (post, email) => {
  return `
  <div id= "postContainer">
  <div id = "btnContenedor" class="btnContenedor">
  <p id ="btn">...</p>
  <div id= "btnLista" class= "btnLista">
  <li id="btnEdits" class="btnEdit" data-id="${post.id}">Edit</li>
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
  <div class="inputLikes" data-id="${post.id}">${post.likes.length}</div>
  </div>
  </div>
  `
};

//Interfaz del formulario para escribir y guardar un nuevo post
export const homeTemplate = (target, firebase) => {
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
  <div id="postConteiner"></div>
  </div>
  <p id= "signOutBtn">SING OFF</p>
  <footer id = "footer-home"><b>encounter</b>, the feminist sound space</footer>
  `;
  
  //Este método pinta la interfaz 
  target.innerHTML = html;
  
  //obtiene el id del formulario
  const postForm = document.getElementById("post-form");
  
  //obtine el id del div en donde se publicarán los post
  const postContainer = document.getElementById("postConteiner");

  //variable que cambia cuando el usuario edita un post
  let editStatus = false;
  
  let id = "";
  const user = firebase.getUser();
   
// renderiza todos los posts  
  async function renderPosts () {
    const posts = await firebase.getAllPosts();
    const postTemplates = posts.map(post => CardPost(post, user.email));           
    postContainer.innerHTML = postTemplates;
  
    // DELATE
  const btnDelete = document.querySelectorAll(".btnDelete");
  btnDelete.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      let confirmDelete = confirm('¿Desea eliminar esta publicación?');
      if (confirmDelete) {
        await firebase.deletePost(e.target.dataset.id);
        renderPosts();
      };
    });
  });

  // const btnDelete = document.querySelectorAll(".btnDelete");
  // btnDelete.forEach(btn => {
  //   btn.addEventListener("click".then ((e) => {
  //     let confirmDelete = confirm('¿Desea eliminar esta publicación?')
  //     //.then (() => {
  //       if (confirmDelete) {
  //         firebase.deletePost(e.target.dataset.id);
  //         renderPosts();
  //     };
  //   //});
    
  //   }));
  // });

  
  // EDIT
  const btnsEdit = document.querySelectorAll(".btnEdit");
  btnsEdit.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const doc = await firebase.editPost(e.target.dataset.id);
      const post = doc.data();
      editStatus = true;
      id = doc.id;
      postForm["post-title"].value = post.title;
      postForm["post-description"].value = post.postDescription;
      postForm["btn-post-form"].innerText ="Update";
    }); 
  });
  
  const likeBtns = document.querySelectorAll(".likeButtons");
  likeBtns.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const postId = e.currentTarget.dataset.id;
      const foundPost = await firebase.getPostById(postId);
      if (! foundPost.likes.includes(user.email)) {
        foundPost.likes.push(user.email);
        firebase.likePost(postId, user.email);
      } else {
        console.log('Este usario ', user.email, ' ya dio like');
      }  
      renderPosts();  
    });
  });
};

  renderPosts();
   
  //save
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = postForm["post-title"];
    const postDescription = postForm["post-description"];
    if (!editStatus) {
      await firebase.savePost(title.value, postDescription.value, []);
      postForm.reset();
      renderPosts();
    } else {
      await firebase.upDatePost(id, {
        title: title.value,
        postDescription: postDescription.value
      });
      editStatus = false;
      id = "";
      postForm["btn-post-form"].innerText="SAVE";
      postForm.reset();
      renderPosts();
    };
  });
  
  const signOff = document.getElementById("signOutBtn");
  signOff.addEventListener("click", ()  => {
    firebase.signOut();
  });
};
