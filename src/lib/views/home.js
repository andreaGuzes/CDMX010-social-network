import {savePost, getPost, signOut} from "../firebase.js"
export const homeTemplate = async (target) => {
    const html = `
    <div class = "cabecera2">  
    <div class = "top2">
      <div class = "layer2">
        <img src = "img/encounter-logo.png" alt = "Encounter, the feminist sound space">
      </div>
    </div>
    <div class = "body2">
      <div class = "login2">
      </div>
    </div>
    </div>
    <div>
    <form id = "post-form">
    <div>
    <textarea id = "post-title" autofocus>
    </textarea>
    </div>
    <div>
    <textarea id = "post-description">
    </textarea>
    </div>
    <button id = "btn-post-form">SAVE
    </button>
    </form>
    </div>
    <div id = "postConteiner">
    </div>
    <button id= "signOutBtn">Cerrar Sesión</button>
        `;
  
        target.innerHTML = html
  // }
        const postForm = document.getElementById("post-form");
        const postContainer = document.getElementById("postConteiner");
          
          const querySnapshot = await getPost();
          // console.log(querySnapshot)
          const posts = []
          querySnapshot.forEach(doc => {
            // console.log(doc.data())
            const post = doc.data();
            posts.push(post);
          });

          postContainer.innerHTML = posts.map(post => `
        <div id= "postContainer">
          <div id = "btnContenedor" class="btnContenedor">
            <p id = "btn">...</p>
              <div id = "btnLista" class="btnLista">
                  <p id = "btnEdit">Editar</p>
                  <p id = "btnDelete">Borrar</p>
              </div>
          </div>
          <div>
            <h3 id="postTitle">${post.title}</h3>
            <p id="postDescription">${post.postDescription}</p>
          </div>
        </div>
        `).join('');

        postForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const title = postForm["post-title"];
          // console.log(title.value);
          const postDescription = postForm["post-description"];
          // console.log(postDescription.value);
          await savePost (title.value, postDescription.value);
          title.focus();
        });

        const signOff = document.getElementById("signOutBtn");
        signOff.addEventListener("click", ()  => {
          signOut()
        });
        };
      
        