import {savePost, getPost, signOut, onGetPosts, deletePost, editPost, upDatePost} from "../firebase.js"

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
            <textarea id = "post-title" autofocus></textarea>
          </div>
          <div>
            <textarea id = "post-description"></textarea>
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

        onGetPosts((querySnapshot) => {
          const posts = []
          querySnapshot.forEach(doc => {
            // console.log(doc.data())
            const post = doc.data();
            post.id = doc.id;
            posts.push(post);
            
          postContainer.innerHTML = posts.map(post => `
          <div id= "postContainer">
            <div id = "btnContenedor" class="btnContenedor">
              <p id ="btn">...</p>
                <div id= "btnLista" class= "btnLista">
                  <li id="btnEdit" class="btnEdit" data-id="${post.id}" >Edit</li>
                  <li id="btnDelete" class="btnDelete" data-id="${post.id}">Delete</li>              
                </div>
            </div>
            <div class = "postPlace">
              <h3 id="postTitle">${post.title}</h3>
              <p id="postDescription">${post.postDescription}</p>
            </div>
          </div>
          `).join('');

          //DELATE
        const btnDelete = document.querySelectorAll(".btnDelete");
        btnDelete.forEach(btn => {
          btn.addEventListener("click", async (e) => {
           await  deletePost(e.target.dataset.id)
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
            postForm["post-title"].value = post.title;
            postForm["post-description"].value = post.postDescription;
            postForm["btn-post-form"].innerText ="Update"
          })
        })
      });
    })
        //save
        postForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const title = postForm["post-title"];
          // console.log(title.value);
          const postDescription = postForm["post-description"];
          // console.log(postDescription.value);
          if (!editStatus) {
          await savePost (title.value, postDescription.value);
          } else {
            await upDatePost (id, {
              title: title.value,
              postDescription: postDescription.value

            })
          }

      //     let likeBtns= document.querySelectorAll(".likeBtn");
      //   let countLike = document.querySelectorAll(".inputLike");
      //   likeBtns.forEach(btn => {
      //   btn.addEventListene("click", () => {
      //     countLike.value = parseInt(countLike.value) + 1;
      //     countLike.style.color = "#12ff00"
      //   });
      // })
       
      // let countClick = 0;  
      // function counClickAdd(){
      //   countClick += 1;
      //  }
      //  $("")

  
          postForm.reset();

          title.focus();
        });

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