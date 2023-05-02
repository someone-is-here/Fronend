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
        <img src="./images/play_button.png" class="play__icon-hidden"/>
        <img alt="" src="${item.image}" class="div__track-cover-img"/>
        <h3><a href="${item.trackId}" class="item-link">${item.name}</a></h3>
    </div>
</div>`
}

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

