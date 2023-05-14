import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
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
  const storage = getStorage();


const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});

let files =[];
let reader = new FileReader();
let pictureInput = document.getElementById("id_picture");

pictureInput.onchange = event => {
    files = event.target.files;
    reader.readAsDataURL(files[0]);
};

reader.onload = function() {
  console.log(reader.result); //img.src
};
// let uploadedImg= document.getElementById("uploadedImg");
let uploadedProgress = document.getElementById("uploadProgress");

async function uploadProcess(){
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
      console.log(downloadURL);
    });
  });
}

document.getElementById("submit__form").onclick = uploadProcess;