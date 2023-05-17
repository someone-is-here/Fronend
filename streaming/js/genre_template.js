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
  onAuthStateChanged
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

window.createClickListener = function(el) {
  el.classList.toggle("checked");
  let checked = document.querySelectorAll(".checked"),
    btnText = document.querySelector(".btn-text");
  if (checked && checked.length > 0) {
    btnText.innerText = `${checked.length} Selected`;
  } else {
    btnText.innerText = "Select genres";
  }
}

function getGenresTemplate(item) {
  return `<li class="item" onclick="createClickListener(this)">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text">${item}</span>
                </li>`;
}

const dbRef = ref(getDatabase());
get(child(dbRef, `genres/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const listWithGenres = snapshot.val();
    console.log(snapshot.val());
    let listWithLi = "";
    for (let key in listWithGenres) {
          listWithLi += getGenresTemplate(listWithGenres[key]);
    }
    document.getElementById("genres__list").innerHTML += listWithLi;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("button_submit").addEventListener("click", function(event) {
      let setGenre = function (isUpdate){
      let checked = document.querySelectorAll(".checked");
        console.log(checked);
        let checked_arr = [...checked]; // converts NodeList to Array
        let genreObj = {};
        checked_arr.forEach(item => {
          console.log(item);
          let span_tag = item.querySelector('span');
          let value = span_tag.innerHTML;
          genreObj[value] = value;
          console.log(genreObj);
      });
        if(isUpdate) {
          update(ref(database, 'users/' + user.uid + `/genres/`), genreObj);
        }else{
          set(ref(database, 'users/' + user.uid + `/genres/`), genreObj);
        }
        alert("Updated successfully!");
        window.location.reload();

}
try {get(child(dbRef, `users/` + user.uid + `/genres/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setGenre(true);
      } else {
        console.log("No genre exists");
        setGenre();
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch (e){
    console.log(e);
  }
});
  }else{
    window.location.replace("login.html");
  }
});

