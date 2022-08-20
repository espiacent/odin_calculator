// global variables
window.currentValue = '';
window.cachedValue = '';
window.operator = '';
// window.secondOperation = false;

// event listeners
const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', getClick));
// document.addEventListener('keydown', getKey);

//input functions
// 1: Button
function getKey(e) {
    return;
}

// 2: Click
function getClick(e) {
    // define arrays to get keys (in groups) 
    const numbKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const calcKeys = ['plus', 'minus', 'mult', 'divide', 'equals'];
    const otherKeys = ['percent', 'allclear', 'clear', 'neg', 'comma'];
    // define arrays for check input
    const position = (document.elementFromPoint(e.clientX, e.clientY));
    const buttonValue = position.id;
    // split inputs in three categories (numbers, operators, other) with subcategories for all inputs
    if (numbKeys.includes(buttonValue)) {
        fillDisplayNum(buttonValue);
    } if (calcKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case 'plus':
                console.log('plus')
                window.operator = 'plus';
                window.cachedValue = window.currentValue;
                window.currentValue = '';
                break;
            case 'equals':
                console.log('equals')
                mainOperator(window.operator, window.cachedValue, window.currentValue);
                break;
            default:
                return;
        }
    }
    if (otherKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case 'allclear':
                clearAll();
                break;
            case 'comma':
                break;
            default:
                return;
        }
    }
}

// output field function
function fillDisplayNum(buttonValue) {
    // add value to global number variable
    window.currentValue += buttonValue;
    // limit number length in output field so there is no overlay
    let checkLength = window.currentValue;
    if (checkLength.length > 10) {
        return;
    }
    // check for double leading zero and remove if necessary
    let floatNum = parseFloat(window.currentValue);
    if (floatNum % 1 == 0) {
        floatNum.toFixed(0);
        window.currentValue = floatNum;
    } else {
        floatNum.toFixed(1);
        window.currentValue = floatNum;
    }
    // new global variable to output
    const display = document.querySelector('.output');
    display.textContent = `${window.currentValue}`;
}

// function to clear output field
function clearAll() {
    console.log('clearing')
    // clear all global variables
    window.currentValue = '0';
    window.cachedValue = '';
    window.operator = '';
    //clear output field
    const display = document.querySelector('.output');
    display.textContent = `${window.currentValue}`;
}

function mainOperator(op, num1, num2) {
    if (op == 'plus') {
        console.log('operation plus')
        Add(num1, num2);
    }
}

// calculation functions
function Add(num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    sum = num1 + num2
    result = sum.toFixed();
    console.log('adding')
    window.currentValue = result;
    const display = document.querySelector('.output');
    display.textContent = `${window.currentValue}`;
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
