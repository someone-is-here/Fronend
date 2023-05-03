let heart = document.getElementsByClassName("heart")[0]
heart.addEventListener("click", function(event){
    event.currentTarget.classList.toggle( "is-active");
});
