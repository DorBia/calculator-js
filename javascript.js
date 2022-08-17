const changeModeButton = document.querySelector(".change-mode");
const display = document.querySelector(".calculator__display");
const clear = document.querySelector(".ac");
const changeSign = document.querySelector(".change-sign");
const numberButtons = document.querySelectorAll(".calculator__number");
const percent = document.querySelector(".percent");
const operators = document.querySelectorAll(".operator");


changeModeButton.addEventListener("click", () => {
    const pageBody = document.body;
    pageBody.classList.toggle("light-mode");
});

const smallerDisplayText = () => {
    if (display.innerText.length > 15){
        display.setAttribute("style", "font-size: 1.5rem");
    } else if (display.innerText.length > 12){
        display.setAttribute("style", "font-size: 2rem");
    } else if (display.innerText.length > 9){
        display.setAttribute("style", "font-size: 3rem");
    } else if (display.innerText.length > 6) {
        display.setAttribute("style", "font-size: 4rem");
    }  else if (display.innerText.length <= 6) {
        display.setAttribute("style", "font-size: 5rem");
    }
};

numberButtons.forEach(item => {
    item.addEventListener("click", () => {
        clear.innerText = "C"
        if(display.innerText == "0"){
            display.innerText = item.innerText;
        } else {
            display.innerText += item.innerText;
            console.log(typeof display.innerText)
            smallerDisplayText();
        }
    })
});

clear.addEventListener("click", () => {
    display.innerText = "0";
    clear.innerText = "AC";
    smallerDisplayText();
});

changeSign.addEventListener("click", () => {
    if(Array.from(display.innerText)[0] == "-"){
        display.innerText = display.innerText.slice(1);
    } else { 
        display.innerText = "-" + display.innerText;
    }
});

percent.addEventListener("click", () => {
    display.innerText = Number(display.innerText) / 100;
    smallerDisplayText();
})