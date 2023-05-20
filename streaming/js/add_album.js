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

let files =[];
let reader = new FileReader();
let pictureInput = document.getElementById("id_album_cover");

pictureInput.onchange = event => {
    files = event.target.files;
    reader.readAsDataURL(files[0]);
};

let uploadedProgress = document.getElementById("uploadProgress");
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("button_submit").addEventListener("click", function (event) {
            event.preventDefault();
            const albumTitle = document.getElementById("id_album_title").value;
            const albumYear = document.getElementById("id_album_year").value;
            const imageToUpload = files[0];
            const filename = imageToUpload.name;
            const metaData = {
                contentType: imageToUpload.type
            }
            const storageRef = sRef(storage, "images/albums/" + user.uid + filename);
            const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);


            uploadTask.on('state-changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploadedProgress.innerHTML = "Uploaded " + progress + "%";
            }, (error) => {
                alert("Error! Image not uploaded!");
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("Set album into db");
                    let albumObj = {
                        [albumTitle]:{
                            year: albumYear,
                            cover: downloadURL,
                            likes: 0
                        }
                    };

                    set(ref(database, 'users/' + user.uid + '/albums/'), albumObj);
                    alert("Album added successfully!");
                    window.location.replace("add_track.html");
                });
            });
        });
    } else {
        window.location.replace("login.html");
    }
});
