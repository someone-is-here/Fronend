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
function getItemTemplate(name, link, country, picture, tour_dates, instruments, genres, labels){
    console.log(instruments);
    console.log(genres);
    console.log(labels);
    const main = ` <div class="div__artist-item__header">
                 <li><h1 class="li_artist-name"><a href="${link}" class="a__link__no-style">${name}</a></h1></li>
                 <span class="span__artist-tour">${country}</span>
                <img src="${picture}"class="img__artist"/>
                                 <br>
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
    if(labels !== undefined) {
        for (var i = 0; i < labels.length; i++) {
            if (labels[i] !== undefined) {
                console.log(labels[i]);
                console.log(Object.keys(labels[i]));
                console.log(Object.values(labels[i]));
                labelsList += labelTemplateItem(Object.keys(labels[i])[0], Object.values(labels[i])[0]);
            }
        }
    }

    let labelsTemplate = `<div class="div__container-item__body">
                 <span class="span__headline">Labels:</span>
                        <ul class="ul__artist">
                        ${labelsList}                     
                </ul>
             </div>`;

    return `      
         <div class="div__artist__container-item">
            ${main}
            ${instrTemplate}
            ${genreTemplate}       
            ${labelsTemplate}     
        </div>`;
}


const container = document.getElementById("artists");
console.log(container);

const dbRef = ref(getDatabase());
const user = auth.currentUser;
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const usersList = snapshot.val();
    for(let item in usersList){
        if(usersList[item].role_id === "2"){
                container.insertAdjacentHTML("beforeend", getItemTemplate(usersList[item].name,
                                         usersList[item].website,
                                         usersList[item].country,
                                         usersList[item].picture,
                                         usersList[item].tour_dates,
                                         usersList[item].instruments,
                                         usersList[item].genres,
                                         usersList[item].labels));
        }
    }
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
