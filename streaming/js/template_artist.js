import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  child
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import {
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";


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
const auth = getAuth();

function instrTemplateItem(instrument){
    return `<li class="li__artist li__artist-green">${instrument}</li>`;
}
function genreTemplateItem(genre){
    return ` <li class="li__artist li__artist-purple">${genre}</li>`;
}
function labelTemplateItem(name, link){
    return `<li class="li__artist li__artist-blue"><a href="${link}" class="a__link__no-style">${name}</a></li>`;
}
function getItemTemplate(name, picture, tour_dates, instruments, genres, labels){
    const main = ` <div class="div__artist-item__header">
                 <li><h1 class="li_artist-name"><a href="index.html" class="a__link__no-style">${name}</a></h1></li>
                <img src="${picture}"class="img__artist"/>
                <span class="span__artist-tour">Tour dates: </span><span class="span__artist-tour-number">  ${tour_dates}</span>
             </div>`;
    let instrList = "";
    for (let i in instruments){
        instrList += instrTemplateItem(i);
    }
    let instrTemplate = ` <div class="div__container-item__body">
                 <span class="span__headline">Instruments:</span>
                        <ul class="ul__artist">
                    ${instrList}
                </ul>
             </div>`;
    let genreList = "";
     for (let g in genres){
        genreList += genreTemplateItem(g);
    }
    let genreTemplate = `   <div class="div__container-item__body">
                 <span class="span__headline">Genres:</span>
                        <ul class="ul__artist">
                        ${genreList}
                </ul>
             </div>`;
    let labelsList = "";
    for (var i = 0; i < labels.length; i++) {
      if (labels[i] !== undefined) {
        console.log(labels[i]);
        console.log(Object.keys(labels[i]));
        console.log(Object.values(labels[i]));
        labelsList += labelTemplateItem(Object.keys(labels[i])[0],Object.values(labels[i])[0]);
      }
    }

    let labelsTemplate = `<div class="div__container-item__body">
                 <span class="span__headline">Labels:</span>
                        <ul class="ul__artist">
                            <li class="li__artist li__artist-blue"><a href="#" class="a__link__no-style">Syco</a></li>
                     
                </ul>
             </div>`

    return `      
         <div class="div__artist__container-item">
            ${main}
            ${instrTemplate}
            ${genreTemplate}       
            ${labelsTemplate}     
        </div>
             `
}


const container = document.getElementById("artists");
console.log(container);
// const items = [{
//     photo: 'url',
//     name: 'Niall Horan',
//     tour_dates: 2,
//     labels: ['Syco', 'Columbia'],
//     instruments: ['vocals', 'guitar'],
//     genres: ['pop', 'soul', 'soft-rock', 'folk-pop', 'pop rock']
// }];

const dbRef = ref(getDatabase());
const user = auth.currentUser;
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const usersList = snapshot.val();
    console.log(usersList);
    for(let item in usersList){
        console.log(Object.keys(item));
        console.log(item.role_id);
    }
    // document.getElementById("labels__list").innerHTML += listWithLi;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


//
// container.innerHTML = ''
//
// for(let item of items){
//     container.insertAdjacentHTML("beforeend", getItemTemplate(item));
// }
