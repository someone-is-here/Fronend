  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDd2TdBKvjDRzfaScSO5GZJOnJCQAIt9nA",
    authDomain: "streaming-service-a0d17.firebaseapp.com",
    projectId: "streaming-service-a0d17",
    storageBucket: "streaming-service-a0d17.appspot.com",
    messagingSenderId: "970367674144",
    appId: "1:970367674144:web:de960ab528bbca0c83d945",
    measurementId: "G-EZE9Q32626"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

let elArr = document.getElementsByClassName("navbar__list-item-link");

for (let el of elArr){
    let location = window.location.href;
    let link = el.href;

    if(el.classList != null && el.classList.contains('selected')){
        el.classList.remove('selected');
    }

    if(link === location) {
        el.classList.add('selected');
    }
}

elArr = document.getElementsByClassName("menu-additional-link");

for (let el of elArr){
    let location = window.location.href;
    let link = el.href;

    if(el.classList != null && el.classList.contains('selected')){
        el.classList.remove('selected');
    }

    if(link === location) {
        el.classList.add('selected');
    }
}

const elAll = document.getElementsByClassName("small__heart");
for (let el of elAll){
    el.addEventListener('click',function(event){
        el = event.currentTarget.parentNode.parentNode.getElementsByClassName("span__hearts-amount")[0];
        let el_content = +el.innerHTML;
        if(event.currentTarget.classList.contains("small__heart-red")){
            event.currentTarget.classList.remove("small__heart-red");
            el.innerHTML = el_content - 1;
        } else {
            event.currentTarget.classList.add("small__heart-red");
            el.innerHTML = el_content + 1;
        }
    });
}