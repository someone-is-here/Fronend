const items = [{
    image: 	'https://i.scdn.co/image/ab67616d00001e0228ccaf8cb23d857cb9361ec4',
    name: 'Name',
    trackId: 2
},{
    image: 	'https://i.scdn.co/image/ab67616d00001e0228ccaf8cb23d857cb9361ec4',
    name: 'Name',
    trackId: 2
},{
    image: 	'https://i.scdn.co/image/ab67616d00001e0228ccaf8cb23d857cb9361ec4',
    name: 'Name',
    trackId: 2
}];

function getItemTemplate(item){
    return `<div class="div__track-item">
    <div class="div__track-cover">
      <a href="#" class="glightbox_video play__icon-hidden">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="30" stroke="white" stroke-width="2" fill="none" class="outer_circle"/>
                    <circle cx="50" cy="50" r="15" stroke="white" stroke-width="2" fill="white" class="inner-circle"/>
                    <polygon points="47,45 55,50 47,55" style="fill:#6a00ff;stroke:#6a00ff;stroke-width:1" class="play"/>
                </svg>
                </a>
        <img alt="" src="${item.image}" class="div__track-cover-img"/>
        <li><h3><a href="${item.trackId}" class="item-link">${item.name}</a></h3></li>
    </div>
</div>`
}
// <img src="./images/play_button.png" class="play__icon-hidden"/>
const containerPopular = document.getElementById("popular");
containerPopular.innerHTML = '';

for(let item of items){
    containerPopular.insertAdjacentHTML("beforeend", getItemTemplate(item));
}
const containerAlbums = document.getElementById("albums");
containerAlbums.innerHTML = '';

for(let item of items){
    containerAlbums.insertAdjacentHTML("beforeend", getItemTemplate(item));
}

const containerPlaylists = document.getElementById("playlists");
containerPlaylists.innerHTML = '';

for(let item of items){
    containerPlaylists.insertAdjacentHTML("beforeend", getItemTemplate(item));
}

