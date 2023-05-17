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

function menuTemplateLogout() {
  return `
    <li><a href="login.html" class="sidenav-link" onclick="userSignOut()">Logout</a></li>
    <li><a href="#" class="sidenav-link">Contact</a></</li>`;
}
function menuBaseTemplate(){
  return `
  <li><a href="login.html" class="sidenav-link">Login</a></li>
  <li><a href="register.html" class="sidenav-link">Register</a></li>`;
}
function generateArtistFunctionality(login) {
  return `      <li><a class="sidenav-link">${login}</a></li>
                <li><a href="add_instrument.html" class="sidenav-link">Add instrument</a></li>
                <li><a href="create_track.html" class="sidenav-link">Add track</a></li>
                <li><a href="add_genre.html" class="sidenav-link">Add genre</a></li>
                <li><a href="add_label.html" class="sidenav-link">Add label</a></li>`;
}
function generateUserFunctionality(login) {
  return `  <li><a class="sidenav-link">${login}</a></li>
            <li><a href="change_subscription.html" class="sidenav-link">Subscription</a></li>`;
}
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email)

    const dbRef = ref(getDatabase());
    console.log(`users/${uid}`);
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let role = snapshot.val().role_id;
    if (role === "2"){
        document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += generateArtistFunctionality(snapshot.val().login);
    }else if(role === "3"){
        document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += generateUserFunctionality(snapshot.val().login);
    }
    document.getElementsByClassName("ul__sidenav-list")[0].innerHTML += menuTemplateLogout();
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