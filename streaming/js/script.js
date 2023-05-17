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


