import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


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

function logout(){
   signOut(auth).then(() => {
       window.location.replace("login.html");
   }).catch((error) => {

     const errorCode = error.code;
     const errorMessage = error.message;
        alert(errorMessage);
   });

}
function menuTemplateLogin(res) {
  return `
    <a class="sidenav-link">${res}</a>
    <a href="#" class="sidenav-link" onclick="logout">Logout</a>`;
}
function menuBaseTemplate(){
  return `
  <a href="login.html" class="sidenav-link">Login</a>
  <a href="register.html" class="sidenav-link">Register</a>`;
}
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email)
    document.getElementById("ul__sidenav-list").innerHTML += menuTemplateLogin(user.email);
  } else {
    document.getElementById("ul__sidenav-list").innerHTML += menuBaseTemplate();
  }
});