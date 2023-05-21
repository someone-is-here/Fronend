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

function trackTemplate(track){
    return ` <audio controls>
                <source src="${track}" type="audio/mpeg">
            </audio>`;
}
window.play = counter => {
    const audioContainer = document.getElementsByClassName("div__tracks-container")[counter-1];
    const audio = audioContainer.querySelector("audio");
    console.log(audio);

    if(!audio.paused){
        document.getElementsByClassName("button__play-small")[counter-1].innerHTML=
            ` <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6
                           19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>`;

        audio.pause();
    }else {
        document.getElementsByClassName("button__play-small")[counter-1].innerHTML=`<path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" fill="white"></path>`;
        audio.play();
    }
}

window.addHeart = (element, counter)=>{
  let el = document.getElementsByClassName("span__hearts-amount")[counter-1];
        let el_content = +el.innerHTML;
        if(element.classList.contains("small__heart-red")){
            element.classList.remove("small__heart-red");
            el.innerHTML = el_content - 1;
            const path = document.getElementsByClassName("span__path")[counter-1].innerHTML;
             get(child(dbRef, path)).then((snapshot) => {
                 const track = snapshot.val();
                 track.likes = track.likes - 1;
                 update(ref(database, path + `/`), track);
             });
        } else {
            element.classList.add("small__heart-red");
            el.innerHTML = el_content + 1;
            const path = document.getElementsByClassName("span__path")[counter-1].innerHTML;
             get(child(dbRef, path)).then((snapshot) => {
                 const track = snapshot.val();
                 track.likes = track.likes + 1;
                 update(ref(database, path + `/`), track);
             });
        }
}

function mainTemplate(counter, title, image, likes, tracks){
    let trackCounter=0;
    for(let item in tracks){
        trackCounter += 1;
    }

    return `<div class="div__container-header">
        <img src="${image}" class="img__playlist-icon"/>
        <div class="div__playlist-info">
            <h1 class="h1__playlist-title"><a href="#" class="a__playlist-link">${title}</a></h1>
            <span class="span__additional-info">
            <span>${trackCounter} tracks</span>
            </span>
        </div>
    </div>`;
}
function playlistTemplate(counter, title, image, likes, tracks, path){
    let trackList = "";
    for(let item in tracks){
        console.log(item);
        trackList += trackTemplate(tracks[item]);
    }

    console.log(trackList);
    return `<li class="li__data">
            <div class="div__align-items">
           <ul class="ul__data-item">
               <li>
                   <span class="span__additional-tools">
                   <span>
                       <button onclick="play(${counter})">
                       <svg role="img" height="24" width="24" aria-hidden="true"
                            class="button__play-small" viewBox="0 0 24 24" data-encore-id="icon">
                           <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6
                           19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                   </button></span><span class="span__text">${counter}</span></span></li>
               <li><a href="#" class="a__remove-style">${title}</a></li>

               <li><span class="span__additional-tools"><span class="span__heart">
                   <button type="button" name="play" class="button__remove-background"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="small__heart"  onclick="addHeart(this, ${counter})">
                   <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782
                   3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348
                   8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262
                   0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501
                    1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg></button><span class="span__hearts-amount">${likes}</span></span> </span></li>
             </ul>
            </div>
            <div style="display: none" class="div__tracks-container">
               ${trackList}
                <span class="span__path" style="display:none;">${path}</span>
            </div>
         </li>
`;
}

const mainList = document.getElementById("id_full_list");
const dbRef = ref(getDatabase());

onAuthStateChanged(auth, (user1) => {
    if (user1) {
     get(child(dbRef, `users/${user1.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
          let counter = 1;
          let user = snapshot.val();
          if (user.role_id === "2") {
              try {
                  get(child(dbRef, `users/` + user1.uid + '/playlists/')).then((snapshot) => {
                      if (snapshot.exists()) {
                          console.log(snapshot.val());
                          const playlistsList = snapshot.val();
                          for (let pl in playlistsList) {
                              get(child(dbRef, `users/` + user1.uid + '/playlists/' + pl + '/tracks/')).then((snapshot) => {
                                  if (counter === 1) {
                                      document.getElementById("main_section").insertAdjacentHTML("beforeend", mainTemplate(
                                          counter,
                                          pl,
                                          playlistsList[pl].cover,
                                          playlistsList[pl].likes,
                                          snapshot.val()));
                                  }
                                  mainList.insertAdjacentHTML("beforeend", playlistTemplate(
                                      counter++,
                                      pl,
                                      playlistsList[pl].cover,
                                      playlistsList[pl].likes,
                                      snapshot.val(),
                                      `users/` + user1.uid + '/playlists/' + pl));
                              });
                          }
                      }
                  });
              } catch (e) {

              }
          }
      }
      });
    }

});

