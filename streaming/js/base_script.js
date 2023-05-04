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

const elAll = document.getElementsByClassName("small__heart");
for (let el of elAll){
    el.addEventListener('click',function(event){
        el = event.currentTarget.parentNode.parentNode.getElementsByClassName("span__hearts-amount")[0];
        let el_content = +el.innerHTML;
        if(event.currentTarget.classList.contains("small__heart-red")){
            event.currentTarget.classList.remove("small__heart-red");
            el.innerHTML = el_content - 1;
        } else {
            event.currentTarget.classList.add("small__heart-red");
            el.innerHTML = el_content + 1;
        }
    });
}