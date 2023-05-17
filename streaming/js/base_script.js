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
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  if(document.getElementById("sidenav").style.width == "10rem"){
    closeNav()
  }else {
    document.getElementById("sidenav").style.width = "10rem";
    document.body.style.opacity = "0.9";
  }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
      document.body.style.opacity = "1";
}
