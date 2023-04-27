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
//}
container.innerHTML = ''

for(let item of items){
    container.insertAdjacentHTML("beforeend", getItemTemplate(item));
}