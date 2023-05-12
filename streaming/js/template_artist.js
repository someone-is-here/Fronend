const container = document.getElementById("artists");
const items = [{
    photo: 'url',
    name: 'Niall Horan',
    tour_dates: 2,
    labels: ['Syco', 'Columbia'],
    instruments: ['vocals', 'guitar'],
    genres: ['pop', 'soul', 'soft-rock', 'folk-pop', 'pop rock']
}];

// function getItemTemplate(item){
//     return `<div class="div__track-item">
//     <div class="div__track-cover">
//         <img alt="" src="${item.image}" class="div__track-cover-img"/>
//         <h3><a href="${item.trackId}" class="item-link">${item.name}</a></h3>
//     </div>
// </div>`
// }
container.innerHTML = ''

for(let item of items){
    container.insertAdjacentHTML("beforeend", getItemTemplate(item));
}
/*
 // Select your input type file and store it in a variable
const input =document.getElementById("id_bform_pre-picture");

// This will upload the file after having read it
const upload = (file) => {
  fetch('register.html', { // Your POST endpoint
    method: 'POST',
    headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
      "Content-Type": "You will perhaps need to define a content-type here"
    },
    body: file // This is your file object
  }).then(
    response => response.json() // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error => console.log(error) // Handle the error response object
  );
};

// Event handler executed when a file is selected
const onSelectFile = () => upload(input.files[0]);

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);
*/
