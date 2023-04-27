const container = document.getElementById("popular");
const items = [{
    image: 'url',
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
container.innerHTML = ''

for(let item of items){
    container.insertAdjacentHTML("beforeend", getItemTemplate(item));
}