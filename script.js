// global variables
window.displayValue = '0';
window.currentResult = '';
window.cachedResult = '';
window.firstValue = '';
window.secondValue = '';
window.operation = '';
window.dotApplied = false;
window.secondOperator = false;
window.plusAgain = false;
window.minusAgain = false;
window.multAgain = false;
window.divideAgain = false;
window.shiftKey = false;


// event listeners
const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('mouseup', getClick));
document.addEventListener('keyup', getKey, highLightButton);
document.addEventListener('keydown', getWhich);
document.addEventListener('keydown', highLightButton);


function getWhich(e) {
    console.log(e.which);
    if (e.which == 16) {
        console.log('shift true')
        window.shiftKey = true;
    }
}

const keys = document.querySelectorAll('.button');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function highLightButton(e) {
    const allowedKeys = [49, 50, 51, 52, 53, 54, 56, 57, 8, 27, 40, 190, 189, 187, 221];
    if (window.shiftKey == true && e.which == 55) {
        const key = document.querySelector(`.button[data-key="divide"]`);
        key.classList.add('hl');
        window.shiftKey = false;
    } if (window.shiftKey == true && e.which == 48) {
        const key = document.querySelector(`.button[data-key="equals"]`);
        key.classList.add('hl');
        window.shiftKey = false;
    } else if (window.shiftKey == false && e.which == 55) {
        const key = document.querySelector(`.button[data-key="seven"]`);
        key.classList.add('hl');
    } else if (window.shiftKey == false && e.which == 48) {
        const key = document.querySelector(`.button[data-key="zero"]`);
        key.classList.add('hl');
    } else {
        if (allowedKeys.includes(e.which)) {
            const key = document.querySelector(`.button[data-key="${e.which}"]`);
            key.classList.add('hl');
            window.shiftKey = false;
        }
    }
}

function removeTransition(e) {
    if (e.propertyName != 'filter') return;
    this.classList.remove('hl');
}

//input functions
// 1: Button
function getKey(e) {
    // define arrays to get keys (in groups) 
    const numbKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const calcKeys = ['+', '-', '*', '/', '=', 'n', 'Enter'];
    const otherKeys = ['Backspace', 'c', 'Escape', 'a', '.'];
    // define arrays for check input
    let buttonValue = e.key;
    // split inputs in three categories (numbers, operators, other) with subcategories for all inputs
    if (numbKeys.includes(buttonValue)) {
        fillDisplayNum(buttonValue);
    } if (calcKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case '+':
                if (window.plusAgain == true) {
                    window.minusAgain == false;
                    window.operation = 'plus';
                    Add(window.firstValue, window.secondValue);
                    window.plusAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.minusAgain == false;
                    window.operation = 'plus';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.plusAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case '-':
                if (window.minusAgain == true) {
                    window.plusAgain == false;
                    window.operation = 'minus';
                    Sub(window.firstValue, window.secondValue);
                    window.minusAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.plusAgain == false;
                    window.operation = 'minus';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.minusAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case '*':
                if (window.multAgain == true) {
                    window.multAgain == false;
                    window.operation = 'mult';
                    Mult(window.firstValue, window.secondValue);
                    window.multAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.multAgain == false;
                    window.operation = 'mult';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.multAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case '/':
                if (window.divideAgain == true) {
                    window.divideAgain == false;
                    window.operation = 'divide';
                    Div(window.firstValue, window.secondValue);
                    window.divideAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.divideAgain == false;
                    window.operation = 'divide';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.divideAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case 'n':
                Neg(window.displayValue);
                break;
            case '=':
                clearOperators()
                mainOperation(window.operation);
                break;
            case 'Enter':
                clearOperators()
                mainOperation(window.operation);
                break;
            default:
                return;
        }
    }
    if (otherKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case 'Escape':
                clearAll();
                break;
            case 'a':
                clearAll();
                break;
            case 'Backspace':
                clearLast();
                break;
            case 'c':
                clearLast();
                break;
            case '.':
                if (window.dotApplied == false) {
                    window.displayValue += '.';
                    const display = document.querySelector('.output');
                    display.textContent = `${window.displayValue}`;
                    window.dotApplied = true;
                    break;
                } else {
                    break;
                }
            default:
                return;
        }
    }
}

// 2: Click
function getClick(e) {
    // define arrays to get keys (in groups) 
    const numbKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const calcKeys = ['plus', 'minus', 'mult', 'divide', 'equals', 'neg'];
    const otherKeys = ['allclear', 'clear', 'dot'];
    // define arrays for check input
    const position = (document.elementFromPoint(e.clientX, e.clientY));
    const buttonValue = position.id;
    // split inputs in three categories (numbers, operators, other) with subcategories for all inputs
    if (numbKeys.includes(buttonValue)) {
        fillDisplayNum(buttonValue);
    } if (calcKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case 'plus':
                if (window.plusAgain == true) {
                    window.minusAgain == false;
                    window.operation = 'plus';
                    Add(window.firstValue, window.secondValue);
                    window.plusAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.minusAgain == false;
                    window.operation = 'plus';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.plusAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case 'minus':
                if (window.minusAgain == true) {
                    window.plusAgain == false;
                    window.operation = 'minus';
                    Sub(window.firstValue, window.secondValue);
                    window.minusAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.plusAgain == false;
                    window.operation = 'minus';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.minusAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case 'mult':
                if (window.multAgain == true) {
                    window.multAgain == false;
                    window.operation = 'mult';
                    Mult(window.firstValue, window.secondValue);
                    window.multAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.multAgain == false;
                    window.operation = 'mult';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.multAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case 'divide':
                if (window.divideAgain == true) {
                    window.divideAgain == false;
                    window.operation = 'divide';
                    Div(window.firstValue, window.secondValue);
                    window.divideAgain == false;
                    window.secondOperator = true;
                    window.dotApplied = false;
                    break;
                } else {
                    window.divideAgain == false;
                    window.operation = 'divide';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.divideAgain = true;
                    window.dotApplied = false;
                    break;
                }
            case 'neg':
                Neg(window.displayValue);
                break;
            case 'equals':
                clearOperators()
                mainOperation(window.operation);
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
            case 'clear':
                clearLast();
                break;
            case 'dot':
                if (window.dotApplied == false) {
                    window.displayValue += '.';
                    const display = document.querySelector('.output');
                    display.textContent = `${window.displayValue}`;
                    window.dotApplied = true;
                    break;
                } else {
                    break;
                }
            default:
                return;
        }
    }
}

// output field function
function fillDisplayNum(buttonValue) {
    if (window.secondOperator == false) {

        // add value to global number variable
        window.displayValue += buttonValue;
        // limit number length in output field so there is no overlay
        let checkLength = window.displayValue;
        if (checkLength.length > 10) {
            return;
        }
        // check for double leading zero and remove if necessary
        let floatNum = parseFloat(window.displayValue);
        if (floatNum % 1 == 0) {
            floatNum.toFixed(0);
            window.displayValue = floatNum;
        } else {
            floatNum.toFixed(1);
            window.displayValue = floatNum;
        }
        // new global variable to output
        const display = document.querySelector('.output');
        display.textContent = `${window.displayValue}`;
    } else {
        window.secondOperator = false;
        window.displayValue = buttonValue;
        window.secondValue = buttonValue;
        // limit number length in output field so there is no overlay
        let checkLength = window.displayValue;
        if (checkLength.length > 10) {
            return;
        }
        // new global variable to output
        const display = document.querySelector('.output');
        display.textContent = `${window.displayValue}`;
        return;
    }
}

// function to clear output field
function clearAll() {
    // clear all global variables
    window.displayValue = '0';
    window.currentResult = '';
    window.cachedResult = '';
    window.cachedValue = '';
    window.currentValue = '';
    window.operator = '';
    clearOperators()
    //clear output field
    const display = document.querySelector('.output');
    display.textContent = `${window.displayValue}`;
}

function clearLast() {
    // clear recent global variables
    window.currentValue = '';
    window.displayValue = '0';
    //clear output field
    const display = document.querySelector('.output');
    display.textContent = `${window.displayValue}`;
}

function mainOperation(op) {
    if (op == 'plus') {
        window.dotApplied = false;
        window.operation = '';
        Add(window.firstValue, window.displayValue);
    }
    if (op == 'minus') {
        window.dotApplied = false;
        window.operation = '';
        Sub(window.firstValue, window.displayValue);
    }
    if (op == 'mult') {
        window.dotApplied = false;
        window.operation = '';
        Mult(window.firstValue, window.displayValue);
    }
    if (op == 'divide') {
        window.dotApplied = false;
        window.operation = '';
        Div(window.firstValue, window.displayValue);
    }
    if (op == 'neg') {
        Neg(num);
    }
}

// calculation functions
function Add(num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    sum = num1 + num2
    result = sum.toString()
    window.firstValue = result;
    window.displayValue = result;
    const display = document.querySelector('.output');
    if (result.length > 10) {
        result = result.substring(0, 10);
        display.textContent = result;
    } else {
        display.textContent = result;
    }
}

function Sub(num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    sum = num1 - num2;
    result = sum.toString()
    window.firstValue = result;
    window.displayValue = result;
    const display = document.querySelector('.output');
    if (result.length > 10) {
        result = result.substring(0, 10);
        display.textContent = result;
    } else {
        display.textContent = result;
    }
}

function Mult(num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    sum = num1 * num2;
    result = sum.toString()
    window.firstValue = result;
    window.displayValue = result;
    const display = document.querySelector('.output');
    if (result.length > 10) {
        result = result.substring(0, 10);
        display.textContent = result;
    } else {
        display.textContent = result;
    }
}

function Div(num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    sum = num1 / num2;
    result = sum.toString()
    window.firstValue = result;
    window.displayValue = result;
    const display = document.querySelector('.output');
    if (result.length > 10) {
        result = result.substring(0, 10);
        display.textContent = result;
    } else {
        display.textContent = result;
    }
}

function Neg(num1) {
    num1 = parseFloat(num1)
    sum = num1 * -1;
    result = sum.toString();
    window.firstValue = result;
    window.displayValue = result;
    const display = document.querySelector('.output');
    if (result.length > 10) {
        result = result.substring(0, 10);
        display.textContent = result;
    } else {
        display.textContent = result;
    };
}

function clearOperators() {
    window.plusAgain = false;
    window.minusAgain = false;
    window.multAgain = false;
    window.divideAgain = false;
    window.dotApplied = false;
}