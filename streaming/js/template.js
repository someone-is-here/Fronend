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

function getItemTemplate(name, cover){
    return `<div class="div__track-item">
    <div class="div__track-cover">
      <a href="#" class="glightbox_video play__icon-hidden">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="30" stroke="white" stroke-width="2" fill="none" class="outer_circle"/>
                    <circle cx="50" cy="50" r="15" stroke="white" stroke-width="2" fill="white" class="inner-circle"/>
                    <polygon points="47,45 55,50 47,55" style="fill:#6a00ff;stroke:#6a00ff;stroke-width:1" class="play"/>
                </svg>
                </a>
        <img alt="" src="${cover}" class="div__track-cover-img"/>
        <li><h3><a href="#" class="item-link">${name}</a></h3></li>
    </div>
</div>`
}

const containerPopular = document.getElementById("popular");
const containerAlbums = document.getElementById("albums");
const containerPlaylists = document.getElementById("playlists");

containerPopular.innerHTML = '';
containerAlbums.innerHTML = '';
containerPlaylists.innerHTML = '';

const dbRef = ref(getDatabase());

function compare( a, b ) {
  if ( a[Object.keys(a)].likes > b[Object.keys(b)].likes ){
    return -1;
  }
  if ( a[Object.keys(a)].likes < b[Object.keys(b)].likes ){
    return 1;
  }
  return 0;
}

get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const usersList = snapshot.val();
    for(let item in usersList){
        if(usersList[item].role_id === "2"){
            try {
                get(child(dbRef, `users/` + item + '/albums/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());

                        const albumsList = snapshot.val();
                        const albums = Object.entries(albumsList).map((e) => ( { [e[0]]: e[1] } ));
                        console.log(albums);

                        const sorted = albums.sort(compare);
                        let counter = 10;
                        for(let i=0; i < sorted.length; i++){
                            for(let alb in sorted[i]){
                            containerAlbums.insertAdjacentHTML("beforeend", getItemTemplate(
                                         alb,
                                         sorted[i][alb].cover));
                            if(--counter === 0){
                                break;
                            }
                            }
                        }
                    }
                });
                get(child(dbRef, `users/` + item + '/playlists/')).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        const playlistsList = snapshot.val();
                        const playlists = Object.entries(playlistsList).map((e) => ( { [e[0]]: e[1] } ));
                        console.log(playlists);

                        const sorted = playlists.sort(compare);

                        let counter = 10;
                        for(let i=0; i < sorted.length; i++){
                             for(let pl in sorted[i]){
                            containerPlaylists.insertAdjacentHTML("beforeend", getItemTemplate(
                                         pl,
                                         sorted[i][pl].cover));
                            if(--counter === 0){
                                break;
                            }
                        }
                        }
                    }
                });
                 get(child(dbRef, `users/` + item + '/playlists/')).then((snapshot) => {
                      get(child(dbRef, `users/` + item + '/albums/')).then((snapshot2) => {
                          if (snapshot.exists() || snapshot2.exists()) {
                              const playlistsList = snapshot.val();
                              const albumsList = snapshot2.val();
                              const playlists = Object.entries(playlistsList).map((e) => ( { [e[0]]: e[1] } ));
                              const albums = Object.entries(albumsList).map((e) => ( { [e[0]]: e[1] } ));
                              const concatList = playlists.concat(albums);
                              const sorted = concatList.sort(compare);
                              let counter = 10;
                        for(let i=0; i < sorted.length; i++){
                             for(let item in sorted[i]){
                            containerPopular.insertAdjacentHTML("beforeend", getItemTemplate(
                                         item,
                                         sorted[i][item].cover));
                            if(--counter === 0){
                                break;
                            }
                        }
                        }
                          }
                      });
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