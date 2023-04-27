let elArr = document.getElementsByClassName("navbar__list-item-link");

for (let el of elArr){
    let location = window.location.href;
    let link = el.href;

    if(el.classList != null && el.classList.contains('selected')){
        el.classList.remove('selected');
    }

    if(link === location) {
        el.classList.add('selected');
    }
}

elArr = document.getElementsByClassName("menu-additional-link");

for (let el of elArr){
    let location = window.location.href;
    let link = el.href;

    if(el.classList != null && el.classList.contains('selected')){
        el.classList.remove('selected');
    }

    if(link === location) {
        el.classList.add('selected');
    }
}