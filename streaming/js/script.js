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