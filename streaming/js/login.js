import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword,
  onAuthStateChanged, GoogleAuthProvider, signInWithRedirect,
  getRedirectResult, signInWithPopup,
  FacebookAuthProvider, TwitterAuthProvider} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";



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
  const GoogleProvider = new GoogleAuthProvider(app);
  const FacebookProvider = new FacebookAuthProvider(app);
  const TwitterProvider = new TwitterAuthProvider(app);

  const auth = getAuth();
    function unsetFields(hiddenFields){
    for(let el of hiddenFields){
        console.log(el);
        el.setAttribute("disabled", true);
    }
}

document.getElementById("submit__login-form").addEventListener("click",function (event){
    const emailField =  document.getElementById("id_email").value;
    const pssw1 = document.getElementById('id_password').value;

    signInWithEmailAndPassword(auth, emailField, pssw1)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })
        window.location.replace("index.html");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });
});

document.getElementById("button__google").addEventListener("click", function(ev){
signInWithPopup(auth, GoogleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert(user.displayName);
    // ...
  })
    .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...

    alert(errorMessage);
  });
 });

document.getElementById("button__facebook").addEventListener("click", function(ev){
signInWithPopup(auth, FacebookProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    alert(errorMessage);
  });
 });

document.getElementById("button__twitter").addEventListener("click", function(ev){
signInWithPopup(auth, TwitterProvider)
  .then((result) => {
    // This gives you the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    alert(errorMessage);
  });
 });