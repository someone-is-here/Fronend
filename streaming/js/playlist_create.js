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


window.createClickListener = function(el) {
  el.classList.toggle("checked");
  let checked = document.querySelectorAll(".checked"),
    btnText = document.querySelector(".btn-text");
  if (checked && checked.length > 0) {
    btnText.innerText = `${checked.length} Selected`;
  } else {
    btnText.innerText = "Select tracks:";
  }
}

function trackTemplate(item, path) {
  return `<li class="item" onclick="createClickListener(this)">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text" data-link="${path}">${item}</span>
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
                                         track,
                                         dbRef + `users/` + item + '/albums/' + alb + '/tracks/' + track
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

let files =[];
let reader = new FileReader();
let pictureInput = document.getElementById("id_playlist_cover");

pictureInput.onchange = event => {
    files = event.target.files;
    reader.readAsDataURL(files[0]);
};

let uploadedProgress = document.getElementById("uploadProgress");

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("button_submit").addEventListener("click", function (event) {
            try {
                event.preventDefault();
                const playlistTitle = document.getElementById("id_title").value;
                const imageToUpload = files[0];
                const filename = imageToUpload.name;
                const metaData = {
                    contentType: imageToUpload.type
                }
                const storageRef = sRef(storage, "images/playlists/" + user.uid + filename);
                const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);


                uploadTask.on('state-changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadedProgress.innerHTML = "Uploaded " + progress + "%";
                }, (error) => {
                    alert("Error! Image not uploaded!");
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("Set playlist into db");
                        let checked = document.querySelectorAll(".checked");
                        console.log(checked);
                        let checked_arr = [...checked]; // converts NodeList to Array
                        let tracksObj = {};
                        checked_arr.forEach(item => {
                            console.log(item);
                            let span_tag = item.querySelector('.item-text');
                            let value = span_tag.innerHTML;
                            tracksObj[value] = span_tag.dataset.link;
                            console.log(tracksObj);
                        });
                        let playlistObj = {
                            [playlistTitle]: {
                                cover: downloadURL,
                                likes: 0,
                                tracks: tracksObj
                            }
                        };

                        set(ref(database, 'users/' + user.uid + '/playlists/'), playlistObj);
                        alert("Playlist added successfully!");
                        window.location.replace("playlists.html");
                    });
                });
            }catch (error) {
                  document.getElementById("id__span-display-error-messages").innerHTML = error.message;
            }
        });
    } else {
        window.location.replace("login.html");
    }
});
