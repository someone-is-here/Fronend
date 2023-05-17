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
    btnText.innerText = "Select label";
  }
}

function getLabelTemplate(item, link) {
  return `<li class="item" onclick="createClickListener(this)">
                    <span class="checkbox">
                        <i class="fa-solid fa-check check-icon"></i>
                    </span>
                    <span class="item-text"><a data-href="${link}" style="a__link__no-style">${item}</a></span>
                </li>`;
}

const dbRef = ref(getDatabase());
get(child(dbRef, `labels/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const listWithLabels = snapshot.val();
    console.log(snapshot.val());
    let listWithLi = "";
    for (let key in listWithLabels) {
          listWithLi += getLabelTemplate(key, listWithLabels[key]);
    }
    document.getElementById("labels__list").innerHTML += listWithLi;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("button_submit").addEventListener("click", function(event) {
      let setLabel = function (isUpdate){
      let checked = document.querySelectorAll(".checked");
        console.log(checked);
        let checked_arr = [...checked]; // converts NodeList to Array
        let labelObj = {};
        checked_arr.forEach(item => {
          console.log(item);
          let a_tag = item.querySelector('a');
           let nameLabel = a_tag.innerHTML;
          let link = a_tag.dataset.href;g
          labelObj[nameLabel] = link;
          console.log(labelObj);
      });
        if(isUpdate) {
          update(ref(database, 'users/' + user.uid + `/labels/`), labelObj);
        }else{
          set(ref(database, 'users/' + user.uid + `/labels/`), labelObj);
        }

}
try {get(child(dbRef, `users/` + user.uid + `/labels/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setLabel(true);
      } else {
        console.log("No label exists");
        setLabel();
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

