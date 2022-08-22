/* ----- GET ACCESS TO HTML ------- */
const allButtons = document.querySelectorAll("button");
const changeModeButton = document.querySelector(".change-mode");
const display = document.querySelector(".calculator__display");
const clear = document.querySelector(".ac");
const changeSign = document.querySelector(".change-sign");
const numberButtons = document.querySelectorAll(".calculator__number");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".calculator__decimal")
const operators = document.querySelectorAll(".calculator__operator");
const equal = document.querySelector(".calculator__equal");


/* --------- VARIABLES ------- */
// basic variables
let currentValue = "";
let operator = "";
let storedValue = "";
let sum = "";

// needed specifically for some functions

// for using operators as equal
let previousOperator = "";

//to reverse sum and make it as a current one and to make % out of the sum
let isEqualOn = false;

// to not add numbers accidentally by using operators after reversing the sum
let isReverseOn = false;

// to be able add old number by using only equal, without changing old number each time
let isOperatorOn = false;
let tempValue = "";


/* ------ KEYBOARD PRESS AS CLICK ------ */

window.addEventListener("keypress", e => {
    allButtons.forEach(btn => {
        if (btn.value == e.key) {
            btn.click();
        } else if (btn.getAttribute("data-operation") == e.key) {
            btn.click()
        }
    });
    if (e.key === "Enter") {
        equal.click();
    }
});

/* ------ REUSABLE FUNCTIONS ------- */

// make font-size on the display smaller/bigger depending on the length of the text
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

// update display with the number given and make sure there are only up to 8 decimal places
const updateDisplay = (number) => {
    let separated = "";
    if(number.includes(".")){
        separated = number.split(".")
        if (separated[1].length > 8){
            number = (Number(number).toFixed(8)).toString();
        }
    }

    display.innerText = number
    if (number === "") {
        display.innerText = "0";
    } else if(number === "-") {
        display.innerText = "-0";
    }
};

/*just do some math, using 3 parameters - 2 numbers and the operator 
so it works with operator buttons and not just the equal button */
const doMath = (num1, num2, operation) => {

    switch (operation) {
        case "add":
            sum = (Number(num1) + Number(num2)).toString();
            break;
        case "subtract":
            sum = (Number(num1) - Number(num2)).toString();
            break;
        case "multiply":
            sum = (Number(num1) * Number(num2)).toString();
            break;
        case "divide":
            sum = (Number(num1) / Number(num2)).toString();
            break;
    }
    return sum;
};

/* ------- ACTUAL CLICK EVENTS ------- */

// add functionality to change the theme between dark and light
changeModeButton.addEventListener("click", () => {
    const pageBody = document.body;
    pageBody.classList.toggle("light-mode");
    const headingText = document.querySelector(".title");
    headingText.classList.toggle("colored-text");
});

// for each number 0-9 when they are pressed "unclick" the +/= and equals buttons, change AC to C
numberButtons.forEach(number => {
    number.addEventListener("click", () => {
        //check if equal button is on, if yes reset current value to not add after previous number
        if (isEqualOn) {
            currentValue = "";
        }

        if(!currentValue || currentValue === "0"){
            currentValue = number.value;
        } else {
            currentValue += number.value;
        }

        isEqualOn = false;
        isReverseOn = false;
        clear.innerText = "C"
        updateDisplay(currentValue);
        smallerDisplayText();
    })
});

// for decimal button
decimal.addEventListener("click", () => {

    if (!currentValue) {
        currentValue = "0.";
    } else if (currentValue && !currentValue.includes(".")) {
        currentValue += ".";
    }
    updateDisplay(currentValue);
    smallerDisplayText();
});

//clear - if the current value is C, clear only operator and current value, else clear everything
clear.addEventListener("click", () => {

    if(clear.innerText === "C"){
        clear.innerText = "AC";
    } else {
        sum = "";
        storedValue = "";
    }

    currentValue = "";
    operator = "";
    updateDisplay("0");
    smallerDisplayText();
});

/* set reverse button to be "clicked" - if there is current value do *(-1) on that value
else if equal button is "clicked" - do *(-1) on the sum and set it as current, clear the sum */
changeSign.addEventListener("click", () => {

    isReverseOn = true;

    if (currentValue === "-") {
        currentValue = "";
    } else if (currentValue) {
        currentValue = (Number(currentValue) * (-1)).toString();
    } else if(isEqualOn) {
        currentValue = (Number(sum) * (-1)).toString();
        sum = "";
    } else if (!currentValue) {
        currentValue = "-";
    } else if (currentValue === "-") {
        currentValue = "";
    }
    
    updateDisplay(currentValue);
    smallerDisplayText();
});

/* percent button - if reverse or equal buttons are "clicked", divide number shown by 100
else if add or subtract and has previous value - get chosen percent from the stored value */
percent.addEventListener("click", () => {

    if (isReverseOn || isEqualOn) {
        currentValue = (Number(display.innerText) / 100).toString();
    } else if ((storedValue && previousOperator === "add") || (storedValue && previousOperator === "subtract")) {
        currentValue = (Number(storedValue) * Number(display.innerText) / 100).toString();
    } else {
        currentValue = (Number(display.innerText) / 100).toString();
    }
    
    updateDisplay(currentValue);
    smallerDisplayText();
});

/* set operator
if the +/- and equal buttons are "clicked" avoid doing math
if there are 2 numbers and previous operation, do previous, to prevent things like "30 + 30 -" showing 0
else if there is current value only just store it and clear current
always set previousOperator value and clear the current one, 
"click" the operator button, "unclick" the equal and +/- buttons */
operators.forEach((button) => {
    button.addEventListener("click", event => {

        operator = event.target.value;

        if (isReverseOn && isEqualOn) {
            storedValue = currentValue;
            currentValue = "";
        } else if(storedValue && currentValue) {
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
        operator = "";
        isOperatorOn = true;
        isEqualOn = false;
        isReverseOn = false;
    })
});

// "click" equal button, if there is no previous operator avoid any action, else set 2 new variables
equal.addEventListener("click", () => {

    isEqualOn = true;

    /* to be able to add current number to the sum later on just by hitting equals,
    but without changing it each time equals is used,
    only changes if operator was chosen before */
    if(currentValue) {
        tempValue = currentValue;
    } else if(!currentValue && isOperatorOn) {
        tempValue = storedValue;
    }

    if (!previousOperator) {
        void(0);
    } else {
        let number1 = "";
        let number2 = "";
        /* if there is current value, then just doMath stored operator current e.g.(stored + currentValue)
        else if there is a sum, check if the operator button is on, if yes just doMath on 2 sums
        else if operator is off then doMath on sum and temporary number
        if first use, and not passed current value, doMath on stored value */
        if (currentValue){
            number1 = storedValue; 
            number2 = currentValue;
        } else {
            if(sum) {
                if(isOperatorOn){
                    number1 = sum; 
                    number2 = sum;
                } else {
                    number1 = sum;
                    number2 = tempValue;
                }

            } else {
                number1 = storedValue; 
                number2 = storedValue;
            }
        }

        doMath(number1, number2, previousOperator);
        updateDisplay(sum);
        smallerDisplayText();
        storedValue = sum;
        currentValue = "";
        isOperatorOn = false;
    }
});
