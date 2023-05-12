import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, update, get, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

window.userSignOut = function userSignOut(e) {
  signOut(auth).then(() => {});
}

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

function menuTemplateLogin(res) {
  return `
    <a class="sidenav-link">${res}</a>
    <a href="login.html" class="sidenav-link" onclick="userSignOut()">Logout</a>`;
}
function menuBaseTemplate(){
  return `
  <a href="login.html" class="sidenav-link">Login</a>
  <a href="register.html" class="sidenav-link">Register</a>`;
}
function generateArtistFunctionality() {
  return `      <a href="add_instrument.html" class="sidenav-link">Add instrument</a>
                <a href="create_track.html" class="sidenav-link">Add track</a>
                <a href="add_genre.html" class="sidenav-link">Add genre</a>
                <a href="add_label.html" class="sidenav-link">Add label</a>`;
}
function generateUserFunctionality() {
  return `<a href="change_subscription.html" class="sidenav-link">Subscription</a>`;
}
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email)
    document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += menuTemplateLogin(user.email);

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    if (user.role_id === 2){
        document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += generateArtistFunctionality();
    }else if(user.role_id === 3){
        document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += generateUserFunctionality();
    }
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

  } else {
    document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += menuBaseTemplate();
  }
});