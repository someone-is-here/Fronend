import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";



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
