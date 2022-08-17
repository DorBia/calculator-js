const changeModeButton = document.querySelector(".change-mode");
const display = document.querySelector(".calculator__display");
const clear = document.querySelector(".ac");
const changeSign = document.querySelector(".change-sign");
const numberButtons = document.querySelectorAll(".calculator__number");
const percent = document.querySelector(".percent");
const operators = document.querySelectorAll(".calculator__operator");
const equal = document.querySelector(".calculator__equal");



let currentValue = "";
let operator = "";
let storedValue = "";
let sum = "";

changeModeButton.addEventListener("click", () => {
    const pageBody = document.body;
    pageBody.classList.toggle("light-mode");
});


const smallerDisplayText = () => {
    if (display.innerText.length > 18){
        display.style = "font-size: 1.5rem";
    } else if (display.innerText.length > 12){
        display.style = "font-size: 2rem";
    } else if (display.innerText.length > 9){
        display.style = "font-size: 3rem";
    } else if (display.innerText.length > 6) {
        display.style = "font-size: 4rem";
    }  else if (display.innerText.length <= 6) {
        display.style = "font-size: 5rem";
    }
};

const updateDisplay = (number) => display.innerText = number;


numberButtons.forEach(number => {
    number.addEventListener("click", () => {
        if (sum) {
            storedValue = sum;
        }
        clear.innerText = "C"
        if(!currentValue){
            currentValue = number.innerText;
        } else {
            currentValue += number.innerText;
        }
        updateDisplay(currentValue);
        smallerDisplayText();
    })
});

clear.addEventListener("click", () => {
    updateDisplay("0");
    if(clear.innerText === "C"){
        clear.innerText = "AC";
        currentValue = "";
    } else {
        currentValue = "";
        sum = "";
        storedValue = "";
    }

    
    smallerDisplayText();
});

changeSign.addEventListener("click", () => {
    if(currentValue.includes("-")){
        currentValue = currentValue.slice(1);
    } else { 
        currentValue = "-" + currentValue;
    }
    updateDisplay(currentValue);
    smallerDisplayText();
});

percent.addEventListener("click", () => {
    if ((sum && operator === "add") || (sum && operator === "subtract")) {
        currentValue = (Number(sum) * Number(display.innerText) / 100).toString();
    } else {
        currentValue = (Number(display.innerText) / 100).toString();
    }
    
    updateDisplay(currentValue);
    smallerDisplayText();
});


operators.forEach((button) => {
    button.addEventListener("click", () => {
        operator = button.getAttribute("value");

        if(currentValue) {
            storedValue = currentValue;
            currentValue = "";
        }
    })
});


equal.addEventListener("click", () => {
    switch (operator) {
        case "add":
            sum = (Number(storedValue) + Number(currentValue)).toString();
            break;
        case "subtract":
            sum = (Number(storedValue) - Number(currentValue)).toString();
            break;
        case "multiply":
            sum = (Number(storedValue) * Number(currentValue)).toString();
            break;
        case "divide":
            sum = (Number(storedValue) / Number(currentValue)).toString();
            break;
    }
    storedValue = sum;
    updateDisplay(sum);
    smallerDisplayText();
})
