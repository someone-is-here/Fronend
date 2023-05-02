let heart = document.getElementsByClassName("heart")[0]
heart.addEventListener("click", function(event){
    console.log("click");
    event.currentTarget.classList.toggle( "is-active");
});
