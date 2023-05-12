import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, get, set, update, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
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


function getLabelTemplate(item, link){
    return `<li class="item">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text"><a href="${link}">${item}</a></span>
                </li>`;
}
 const dbRef = ref(getDatabase());
    get(child(dbRef, `labels/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const listWIthLabels = snapshot.val();
    let listWithLi = "";
for (var i = 0; i < listWIthLabels.length; i++) {
  if(listWIthLabels[i] !== undefined){
    console.log(listWIthLabels[i]);
    console.log(Object.keys(listWIthLabels[i]))
    console.log(Object.values(listWIthLabels[i]))
    listWithLi += getLabelTemplate(Object.keys(listWIthLabels[i])[0], Object.values(listWIthLabels[i])[0]);
  }
}

    document.getElementById("labels__list").innerHTML += listWithLi;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
//document.getElementById("labels__list").innerHTML
document.getElementById("button_submit").addEventListener("click", function(event){

});