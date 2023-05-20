import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, get, update, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
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

function trackTemplate(counter, title, image, streams, likes, timing, track){
    return ` <li class="li__data">
            <div class="div__align-items">
           <ul class="ul__data-item">
               <li> <img src="${image}" class="img__track-icon"/></li>
               <li>
                   <span class="span__additional-tools">
                   <span>
                       <a href="#">
                       <svg role="img" height="24" width="24" aria-hidden="true"
                            class="button__play-small" viewBox="0 0 24 24" data-encore-id="icon">
                           <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6
                           19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                   </a></span><span class="span__text">${counter}</span>
               </span></li>
               <li><div><a href="#" class="a__remove-style">${title}</a>
                   <div class="div__plays-amount">${streams}</div>
               </div></li>

               <li><span class="span__additional-tools"><span class="span__heart">
                   <button type="button" name="play" class="button__remove-background"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="small__heart">
                   <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782
                   3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348
                   8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262
                   0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501
                    1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg></button><span class="span__hearts-amount">${likes}</span></span> ${timing}</span></li>
             </ul>
            </div>
           <div class="div__align-items">
           <audio controls>
                <source src="${track}" type="audio/mpeg">
            </audio>
         </li>`;
}

const mainList = document.getElementById("id_full_list");
const dbRef = ref(getDatabase());

get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const usersList = snapshot.val();
    for(let item in usersList){
        if(usersList[item].role_id === "2"){
            try {
                get(child(dbRef, `users/` + item + '/albums/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        for(let alb in snapshot.val()){
                             get(child(dbRef, `users/` + item + '/albums/' + alb + '/tracks/')).then((snapshot) => {
                                 const tracksList = snapshot.val();
                                 console.log(tracksList);
                                 let counter = 1;
                                 for(let track in tracksList) {
                                    let timing = tracksList[track].timing;
                                    let timeRes = `${Math.floor(timing / 60)}:${Math.ceil(timing - Math.floor(timing / 60) * 60)}`;
                                     mainList.insertAdjacentHTML("beforeend", trackTemplate(
                                         counter++,
                                         track,
                                         tracksList[track].cover,
                                         tracksList[track].streaming,
                                         tracksList[track].likes,
                                         timeRes,
                                         tracksList[track].track
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

