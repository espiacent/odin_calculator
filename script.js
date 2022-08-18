// global variables
window.value = '';
window.op = '';
window.num1 = '';
window.num2 = '';

// event listeners
const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', getClick));
document.addEventListener('keydown', getKey);

//input functions
// 1: Button
function getKey(e) {
    return;
}

// 2: Click
function getClick(e) {
    // set Clear Button
    const clearButton = document.getElementById('clear');
    clearButton.textContent = 'C';
    // define arrays for check input
    const numberKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const calcKeys = ['plus', 'minus', 'mult', 'divide', 'equals'];
    const otherKeys = ['percent', 'clear', 'neg', 'comma'];
    const position = (document.elementFromPoint(e.clientX, e.clientY));
    const buttonValue = position.id;
    // split inputs in three categories (numbers, operators, other) with subcategories for all inputs
    if (buttonValue in numberKeys) {
        fillDisplayNum(buttonValue);
    } if (calcKeys.includes(buttonValue)) {
        return;
    } if (otherKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case 'clear':
                clearOutput();
                break;
            case 'comma':
                break;
            default:
                return;
        }
    } else {
        return;
    }
}

// output field function
function fillDisplayNum(buttonValue) {
    // add value to global number variable
    window.value += buttonValue;
    // limit number length in output field so there is no overlay
    let checkLength = window.value;
    if (checkLength.length > 10) {
        return;
    }
    // check for double leading zero and remove if necessary
    let floatNum = parseFloat(window.value);
    if (floatNum % 1 == 0) {
        floatNum.toFixed(0);
        window.value = floatNum;
    } else {
        floatNum.toFixed(1);
        window.value = floatNum;
    }
    // new global variable to output
    const display = document.querySelector('.output');
    display.textContent = `${window.value}`;
}

// function to clear output field
function clearOutput() {
    // clear all global variables
    window.value = '0';
    window.op = '';
    window.num1 = '';
    window.num2 = '';
    //clear output field
    const display = document.querySelector('.output');
    display.textContent = `${window.value}`;
    // reset Clear Button
    const clearButton = document.getElementById('clear');
    clearButton.textContent = 'AC';
}

// calculation functions
function Add(num1, num2) {
    return num1 + num2;
}

function Sub(num1, num2) {
    return num1 - num2;
}

function Mult(num1, num2) {
    return num1 * num2;
}

function Div(num1, num2) {
    return num1 / num2;
}

function Neg(num1) {
    return (num1 * -1);
}
