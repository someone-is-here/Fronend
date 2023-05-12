
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  // import { getDatabase, ref, set, update, child } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
  // import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  //     onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
  // import { getStorage, ref as ref_, getDownloadURL, uploadBytes} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// Create the file metadata

const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var file = document.getElementById("id_picture");
const storage = getStorage();
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  },
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);


document.getElementById("submit__form").addEventListener("click",function(event){

});
