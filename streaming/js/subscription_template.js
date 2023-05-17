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

const dbRef = ref(getDatabase());


function getSubscriptionTemplate(name, cost, isSelected){
    if (isSelected){
        document.getElementById("id_cost").innerHTML = cost;
         return `<li class="item">
                  <span class="item-text"><option value="${cost}" class="option__box" selected>${name}</option></span>
                </li>`;
    }
    return `<li class="item">
                  <span class="item-text"><option value="${cost}" class="option__box">${name}</option></span>
                </li>`;
}


onAuthStateChanged(auth, (user) => {
  if (user) {
      get(child(dbRef, `subscriptions/`)).then((snapshot) => {
          get(child(dbRef, `users/`+user.uid)).then((snapshot2) => {
        if (snapshot.exists()) {
            const listWithSubscriptions = snapshot.val();
            console.log(snapshot.val());
            let listWithSubsc = "";
            for (let key in listWithSubscriptions) {
                if(snapshot2.val().subscription === key) {
                    listWithSubsc += getSubscriptionTemplate(key, listWithSubscriptions[key], true);
                }else{
                     listWithSubsc += getSubscriptionTemplate(key, listWithSubscriptions[key]);
                }
            }
            const el = document.getElementById("id_cform_pre-subscription");
            el.onclick = function(ev){
                document.getElementById("id_cost").innerHTML = ev.target.value;
            };
            el.innerHTML += listWithSubsc;
        } else {
          console.log("no subscriptions");
        }
        });
    });

    document.getElementById("button_submit").addEventListener("click", function(event) {
      const selectSubscription = document.getElementById("id_cform_pre-subscription");
             ref(database, 'users/' + user.uid + `/subscription/`).remove();
             set(ref(database, 'users/' + user.uid + `/subscription/`), {
                subscription: selectSubscription.options[selectSubscription.selectedIndex].text
            });
});
  }else{
    window.location.replace("login.html");
  }
});

