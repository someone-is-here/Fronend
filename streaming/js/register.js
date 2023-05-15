import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, update, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
      onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

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
const storage = getStorage();

const auth = getAuth();
const user = auth.currentUser;

let files =[];
let reader = new FileReader();
let pictureInput = document.getElementById("id_bform_pre-picture");

pictureInput.onchange = event => {
    files = event.target.files;
    reader.readAsDataURL(files[0]);
};

let uploadedProgress = document.getElementById("uploadProgress");

window.userSignOut = function userSignOut(e) {
  signOut(auth).then(() => {});
}
function menuTemplateLogin(res) {
  return `                <li class="menu-additional__list-item menu-additional-email">${res}</li>
                <li class="menu-additional__list-item"><a href="#" class="menu-additional-link">Subscription</a></li>
                <li class="menu-additional__list-item"><a href="login.html" class="menu-additional-link" onclick="userSignOut()">Logout</a></li>`;
}
function menuBaseTemplate(){
  return `
                <li class="menu-additional__list-item"><a href="login.html" class="menu-additional-link">Login</a></li>
                <li class="menu-additional__list-item"><a href="register.html" class="menu-additional-link">Register</a></li>`;
}
function unsetFields(hiddenFields){
    for(let el of hiddenFields){
        console.log(el);
        el.setAttribute("disabled", true);
    }
}
function uploadProcess(){
  const imageToUpload = files[0];
  const filename = imageToUpload.name;
  const metaData = {
    contentType: imageToUpload.type
  }
  const storageRef = sRef(storage, "images/" + filename);
  const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);

  uploadTask.on('state-changed', (snapshot)=>{
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploadedProgress.innerHTML = "Uploaded " + progress + "%";
  }, (error) => {
    alert("Error! Image not uploaded!");
  },() => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        console.log("file uploaded");
        window.pictureURL = downloadURL;
        console.log("URL: " + window.pictureURL);
    });
  });
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user.email)
    document.getElementById("menu__additional").innerHTML = menuTemplateLogin(user.email);
  } else {
    document.getElementById("menu__additional").innerHTML = menuBaseTemplate();
  }
});
document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("register_3").style.visibility='visible';
    document.getElementById("register_3").style.position='static';
    document.getElementById("id_aform_pre-role").selectedItem = 3;
});
document.getElementById("id_aform_pre-role").addEventListener("change", (event) => {
    event.preventDefault();
    let role_id = event.target.options[event.target.selectedIndex].value;
    if (role_id == 2){
        document.getElementById("register_3").style.visibility='hidden';
        document.getElementById("register_3").style.position='absolute';

        document.getElementById("id_cform_pre-subscription").value=0;
        document.getElementById("register_2").style.position='static';
        document.getElementById("register_2").style.visibility='visible';
    }else if(role_id==3){
        document.getElementById("register_2").style.visibility='hidden';
        document.getElementById("register_2").style.position='absolute';
        document.getElementById("id_bform_pre-name").value = '';
        document.getElementById("id_bform_pre-website").value = '';
        document.getElementById("id_bform_pre-tour_dates").value = '';
        document.getElementById("id_bform_pre-country").value = 0;
        document.getElementById("id_bform_pre-picture").value = '';
        document.getElementById("register_3").style.position='static';
        document.getElementById("register_3").style.visibility='visible';
    }
});
document.getElementById("submit__c-form").addEventListener("click", function(event){
    event.preventDefault();

    const hiddenFields = document.getElementById("register_2");

    console.log(hiddenFields.getElementsByTagName("input"));
    console.log(hiddenFields.getElementsByTagName("select"));
    unsetFields(hiddenFields.getElementsByTagName("input"));
    unsetFields(hiddenFields.getElementsByTagName("select"));

    const el = document.getElementById("id_aform_pre-role");
    const role = el.options[el.selectedIndex].value;
    const emailField =  document.getElementById("id_aform_pre-email").value;
    const pssw1 = document.getElementById('id_aform_pre-password1').value;
    const pssw2 = document.getElementById('id_aform_pre-password2').value;
    console.log(emailField, pssw1, pssw2)
 if(pssw1 === pssw2){
    createUserWithEmailAndPassword(auth, emailField, pssw1)
    .then((userCredential) => {
     // Signed in
      const user = userCredential.user;
             const selectSubscription = document.getElementById("id_cform_pre-subscription");
             set(ref(database, 'users/' + user.uid), {
                login: document.getElementById("id_aform_pre-login").value,
                email: emailField,
                role_id: role,
                subscription: selectSubscription.options[selectSubscription.selectedIndex].text
            });

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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
 }
});
document.getElementById("submit__b-form").addEventListener("click", function(event){
    event.preventDefault();
    const hiddenFields = document.getElementById("register_3");
    console.log(hiddenFields.getElementsByTagName("input"));
    console.log(hiddenFields.getElementsByTagName("select"));
    unsetFields(hiddenFields.getElementsByTagName("input"));
    unsetFields(hiddenFields.getElementsByTagName("select"));

    const el = document.getElementById("id_aform_pre-role");
    const role = el.options[el.selectedIndex].value;
    const emailField =  document.getElementById("id_aform_pre-email").value;
    const pssw1 = document.getElementById('id_aform_pre-password1').value;
    const pssw2 = document.getElementById('id_aform_pre-password2').value;

  if(pssw1 === pssw2) {
    createUserWithEmailAndPassword(auth, emailField, pssw1)
    .then((userCredential) => {
     // Signed in
     const user = userCredential.user;
            const selectCountry = document.getElementById("id_bform_pre-country");
            uploadProcess();
            console.log("Set user into db");
            set(ref(database, 'users/' + user.uid), {
                login: document.getElementById("id_aform_pre-login").value,
                email: emailField,
                role_id: role,
                name: document.getElementById("id_bform_pre-name").value,
                website: document.getElementById("id_bform_pre-website").value,
                tour_dates: document.getElementById("id_bform_pre-tour_dates").value,
                country: selectCountry.options[selectCountry.selectedIndex].text,
                picture: window.pictureURL
            });
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
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
}
});
