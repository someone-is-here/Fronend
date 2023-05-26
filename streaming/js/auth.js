import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyDd2TdBKvjDRzfaScSO5GZJOnJCQAIt9nA",
    authDomain: "streaming-service-a0d17.firebaseapp.com",
    projectId: "streaming-service-a0d17",
    storageBucket: "streaming-service-a0d17.appspot.com",
    messagingSenderId: "970367674144",
    appId: "1:970367674144:web:de960ab528bbca0c83d945",
    measurementId: "G-EZE9Q32626"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

window.userSignOut = function userSignOut(e) {
  signOut(auth).then(() => {});
}
function resultOfSearch(title, image, info){
  return ` <div class="div__search-result">
                <img src="${image}" class="img__search-result">
                    <div><span class="span__search-result__title">${title}</span><br>
                    <span class="span__search-additional__info">Likes: ${info}</span></div>
                </div><br>`;
}
function searchTemplate(){
  return `                   <div class="div__search-container form__search-bar">

    <input type="text" placeholder="Search" id="input__search" class="input__search" autoComplete="on" onkeyup="searchFunction(this)">

                    <button type="submit"><img src="images/search.png"></button>
                </div>
                <div class="div__search-result__container">
               
                </div>`;
}
function menuTemplateLogin(res) {

  return `         <li>${searchTemplate()}</li>          
                <li class="menu-additional__list-item menu-additional-email">${res}</li>
                <li class="menu-additional__list-item"><a href="change_subscription.html" class="menu-additional-link">Subscription</a></li>
                <li class="menu-additional__list-item"><a href="login.html" class="menu-additional-link" onclick="userSignOut()">Logout</a></li>`;
}
function menuTemplateLoginArtist(res) {
  return `      <li>${searchTemplate()}</li>           
                <li class="menu-additional__list-item menu-additional-email">${res}</li>
                <li class="menu-additional__list-item"><a href="login.html" class="menu-additional-link" onclick="userSignOut()">Logout</a></li>`;
}
function menuBaseTemplate(){
  return `      <li>${searchTemplate()}</li>    
                <li class="menu-additional__list-item"><a href="login.html" class="menu-additional-link">Login</a></li>
                <li class="menu-additional__list-item"><a href="register.html" class="menu-additional-link">Register</a></li>`;
}
const menuContainer = document.getElementById("menu__additional");
document.addEventListener("DOMContentLoaded", function(){
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let role = snapshot.val().role_id;
        if (role === "2") {
          menuContainer.insertAdjacentHTML("beforeend", menuTemplateLoginArtist(snapshot.val().login));
        } else if (role === "3") {
          menuContainer.insertAdjacentHTML("beforeend", menuTemplateLogin(snapshot.val().login));
        }
      }
    }).catch(e=>{
      console.log(e);
    });
  } else {
    menuContainer.insertAdjacentHTML("beforeend", menuBaseTemplate());
  }
});
});

const dbRef = ref(getDatabase());
function getInfo(){
  get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const usersList = snapshot.val();
    for(let item in usersList){
        if(usersList[item].role_id === "2"){
            try {
                 get(child(dbRef, `users/` + item + '/playlists/')).then((snapshot) => {
                      get(child(dbRef, `users/` + item + '/albums/')).then((snapshot2) => {
                          if (snapshot.exists() || snapshot2.exists()) {
                            window.playlistsList = snapshot.val();
                            window.albumsList = snapshot2.val();
                             window.tracksList = {};
                             for(let alb in snapshot.val()){
                             get(child(dbRef, `users/` + item + '/albums/' + alb + '/tracks/')).then((snapshot3) => {
                                 window.tracksList = Object.assign(window.tracksList, snapshot3.val());
                             });
                        }
                          }
                      });
                });
            } catch (e) {

            }

        }
    }
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}

window.searchFunction = (el) => {
  let input_value = el.value.toLocaleUpperCase();
  const containerForOutput = document.getElementsByClassName("div__search-result__container")[0];
  containerForOutput.innerHTML = "";

  if(input_value.length === 0){
    containerForOutput.style.display = 'none';
    return;
  }
  containerForOutput.style.display = 'block';

  if(window.playlistsList) {
    for (let item in window.playlistsList){
      if (item.toUpperCase().indexOf(input_value) > -1) {
         containerForOutput.insertAdjacentHTML("beforeend", resultOfSearch(item,
             window.playlistsList[item].cover, window.playlistsList[item].likes));
      }
    }
  }
  if(window.tracksList) {
    for (let item in window.tracksList){
      if (item.toUpperCase().indexOf(input_value) > -1) {
         containerForOutput.insertAdjacentHTML("beforeend", resultOfSearch(item,
             window.tracksList[item].cover, window.tracksList[item].likes));
      }
    }
  }
  if(window.albumsList) {
    for (let item in window.albumsList){
      if (item.toUpperCase().indexOf(input_value) > -1) {
         containerForOutput.insertAdjacentHTML("beforeend", resultOfSearch(item,
             window.albumsList[item].cover, window.albumsList[item].likes));
      }
    }
  }
};

getInfo();