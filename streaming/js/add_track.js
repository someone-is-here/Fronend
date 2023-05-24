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

let filesPicture = [], filesTrack = [];
let reader = new FileReader();
let reader2 = new FileReader();
let pictureInput = document.getElementById("id_track_cover");
let trackInput = document.getElementById("id_track");

pictureInput.onchange = event => {
    filesPicture = event.target.files;
    reader.readAsDataURL(filesPicture[0]);
};

let audio = document.createElement('audio');

trackInput.onchange = event => {
    filesTrack = event.target.files;
     reader2.onload = function (e) {
         console.log(e);
            audio.src = e.target.result;
            console.log(audio.src);
            audio.addEventListener('loadedmetadata', function(){
                let audioDur = audio.duration;
                console.log(audioDur);
                window.duration = audioDur.toFixed(2);
            },false);
        };
     reader2.readAsDataURL(filesTrack[0]);
}

let selectAlbum = document.getElementById("id_album_select");


let uploadedProgressPicture = document.getElementById("uploadProgress");
let uploadedProgressTrack = document.getElementById("uploadProgressTrack");

function getOptionTemplate(name){
    return `<option value="${name}">${name}</option>`
}
function setAlbums(albumsList){
    let resultList = "";
    console.log(albumsList);
    for (let item in albumsList){
        console.log(item);
        resultList += getOptionTemplate(item);
    }
    selectAlbum.innerHTML = resultList;
}
const dbRef = ref(getDatabase());
onAuthStateChanged(auth, (user) => {
    if (user) {
        try { get(child(dbRef, `users/` + user.uid + `/albums/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setAlbums(snapshot.val());
            } else {
                alert("No albums found! Create album first.");
                window.location.replace("add_album.html");
            }
        }).catch((error) => {
            console.error(error);
        });
        } catch (e){
            console.log(e.message);
        }

        document.getElementById("button_submit").addEventListener("click", function (event) {
            try {
                event.preventDefault();
                const trackTitle = document.getElementById("id_track_title").value;

                const imageToUpload = filesPicture[0];
                const filename = imageToUpload.name;
                const metaData = {
                    contentType: imageToUpload.type
                }
                const storageRef = sRef(storage, "images/tracks/" + user.uid + filename);
                const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);

                uploadTask.on('state-changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadedProgressPicture.innerHTML = "Uploaded " + Math.floor(progress) + "%";
                }, (error) => {
                    document.getElementById("id__span-display-error-messages").innerHTML = error.message;
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("Set album into db");
                        const trackToUpload = filesTrack[0];
                        const filename = trackToUpload.name;
                        const metaData = {
                            contentType: trackToUpload.type
                        }
                        const storageRef = sRef(storage, "tracks/" + user.uid + filename);
                        const uploadTask = uploadBytesResumable(storageRef, trackToUpload, metaData);
                        uploadTask.on('state-changed', (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            uploadedProgressTrack.innerHTML = "Uploaded " + Math.floor(progress) + "%";
                        }, (error) => {
                            alert("Error! Track not uploaded!");
                        }, () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURLTrack) => {
                                let albumName = selectAlbum.options[selectAlbum.selectedIndex].text;
                                get(child(dbRef, 'users/' + user.uid + '/albums/' + albumName + '/tracks/')).then((snapshot) => {
                                let trackObj = snapshot.val();
                                trackObj[trackTitle] = {
                                        cover: downloadURL,
                                        track: downloadURLTrack,
                                        timing: window.duration,
                                        streaming: 0,
                                        likes: 0
                                    };

                            update(ref(database, 'users/' + user.uid + '/albums/' + albumName + '/tracks/'), trackObj);
                            alert("Track added successfully!!!");
                            window.location.replace("add_track.html");

                    }).catch((error)=>{
                         let trackObj = {
                                    [trackTitle]: {
                                        cover: downloadURL,
                                        track: downloadURLTrack,
                                        timing: window.duration,
                                        streaming: 0,
                                        likes: 0
                                    }
                                };
                         set(ref(database, 'users/' + user.uid + '/albums/' + albumName + '/tracks/'), trackObj);
                         alert("Track added successfully!!!");
                         window.location.replace("add_track.html");
                         });
                            });
                        });
                    });
                });
            } catch (error) {
                  document.getElementById("id__span-display-error-messages").innerHTML = error.message;
            }
        });
    } else {
        window.location.replace("login.html");
    }
});
