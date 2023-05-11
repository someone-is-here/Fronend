document.getElementById("submit__login-form").addEventListener("click",function (event){

    const emailField =  document.getElementById("id_email").value;
    const pssw1 = document.getElementById('id_password').value;

    signInWithEmailAndPassword(auth, emailField, pssw1)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })
        window.location.replace("index.html");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });
});
