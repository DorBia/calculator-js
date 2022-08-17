const changeModeButton = document.querySelector(".change-mode");
const display = document.querySelector(".calculator__display");


changeModeButton.addEventListener("click", () => {
    const pageBody = document.body;
    pageBody.classList.toggle("light-mode");
});

const smallerDisplayText = () => {
    if (display.innerText.length > 12){
        display.setAttribute("style", "font-size: 2rem");
    } else if (display.innerText.length > 9){
        display.setAttribute("style", "font-size: 3rem");
    } else if (display.innerText.length > 6) {
        display.setAttribute("style", "font-size: 4rem");
    } 
};
