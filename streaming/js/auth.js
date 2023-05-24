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
function searchTemplate(){
  return `                <form action="" class="form__search-bar">
                <div>
    <input type="text" placeholder="Search" name="input__search" class="input__search" autoComplete="on" list="suggestions">
</div>
                    
                    <button type="submit"><img src="images/search.png"></button>
                </form>`;
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