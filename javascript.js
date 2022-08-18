const changeModeButton = document.querySelector(".change-mode");
const display = document.querySelector(".calculator__display");
const clear = document.querySelector(".ac");
const changeSign = document.querySelector(".change-sign");
const numberButtons = document.querySelectorAll(".calculator__number");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".calculator__decimal")
const operators = document.querySelectorAll(".calculator__operator");
const equal = document.querySelector(".calculator__equal");


let currentValue = "";
let operator = "";
let previousOperator = "";
let storedValue = "";
let sum = "";
let isEqualOn = false;

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

const doMath = (number1, number2, op) => {
    switch (op) {
        case "add":
            sum = (Number(number1) + Number(number2)).toString();
            break;
        case "subtract":
            sum = (Number(number1) - Number(number2)).toString();
            break;
        case "multiply":
            sum = (Number(number1) * Number(number2)).toString();
            break;
        case "divide":
            sum = (Number(number1) / Number(number2)).toString();
            break;
    }
    return sum;
}


numberButtons.forEach(number => {
    number.addEventListener("click", () => {
        if (sum) {
            storedValue = sum;
        }
        clear.innerText = "C"
        if(!currentValue || currentValue === "0"){
            currentValue = number.innerText;
        } else {
            currentValue += number.innerText;
        }
        updateDisplay(currentValue);
        smallerDisplayText();
    })
});

decimal.addEventListener("click", () => {
    if (!currentValue || isEqualOn) {
        currentValue = "0.";
    } else if (currentValue && !currentValue.includes(".")) {
        currentValue += ".";
    }
    updateDisplay(currentValue);
    smallerDisplayText();
})

clear.addEventListener("click", () => {
    if(clear.innerText === "C"){
        clear.innerText = "AC";
        currentValue = "";
    } else {
        currentValue = "";
        sum = "";
        storedValue = "";
    }

    updateDisplay("0");
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
    button.addEventListener("click", event => {
        operator = event.target.value;

        if(storedValue && currentValue) {
            if (!previousOperator) {
                storedValue = doMath(storedValue, currentValue, operator);
            } else {
                storedValue = doMath(storedValue, currentValue, previousOperator);
            }
                currentValue = "";
                updateDisplay(sum);
                smallerDisplayText();
            
        } else if(currentValue) {
            storedValue = currentValue;
            currentValue = "";
        }

        previousOperator = operator;
    })
});

equal.addEventListener("click", () => {
    isEqualOn = true;
    let number1 = "";
    let number2 = "";

    if (currentValue){
        number1 = storedValue; 
        number2 = currentValue;
    } else {
        if(sum) {
            number1 = sum; 
            number2 = sum;
        } else {
            number1 = storedValue; 
            number2 = storedValue;
        }
    }
    
    doMath(number1, number2, operator);
    storedValue = sum;
    updateDisplay(sum);
    smallerDisplayText();
})
