const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});

items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");
            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else{
                btnText.innerText = "Select songs";
            }
    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, get, update, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

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

function trackTemplate(item) {
  return `<li class="item" onclick="createClickListener(this)">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text">${item}</span>
                </li>`;
}

const dbRef = ref(getDatabase());
const mainList = document.getElementById("id_tracks_list");

get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const usersList = snapshot.val();
    for(let item in usersList){
        if(usersList[item].role_id === "2"){
            try {
                get(child(dbRef, `users/` + item + '/albums/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        for(let alb in snapshot.val()){
                             get(child(dbRef, `users/` + item + '/albums/' + alb + '/tracks/')).then((snapshot) => {
                                 const tracksList = snapshot.val();
                                 for(let track in tracksList) {
                                    mainList.insertAdjacentHTML("beforeend", trackTemplate(
                                         track
                                        ));
                                 }
                             });
                        }
                    }
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