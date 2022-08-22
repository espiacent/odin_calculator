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
    const calcKeys = ['plus', 'minus', 'mult', 'divide', 'equals', 'neg'];
    const otherKeys = ['allclear', 'clear', 'dot'];
    // define arrays for check input
    const position = (document.elementFromPoint(e.clientX, e.clientY));
    const buttonValue = position.id;
    console.log(position.id)
    // split inputs in three categories (numbers, operators, other) with subcategories for all inputs
    if (numbKeys.includes(buttonValue)) {
        fillDisplayNum(buttonValue);
    } if (calcKeys.includes(buttonValue)) {
        switch (buttonValue) {
            case 'plus':
                if (window.plusAgain == true) {
                    window.minusAgain == false;
                    console.log('plus again')
                    window.operation = 'plus';
                    Add(window.firstValue, window.secondValue);
                    window.plusAgain == false;
                    window.secondOperator = true;
                    break;
                } else {
                    window.minusAgain == false;
                    console.log('plus')
                    window.operation = 'plus';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.plusAgain = true;
                    break;
                }
            case 'minus':
                if (window.minusAgain == true) {
                    window.plusAgain == false;
                    console.log('minus again')
                    window.operation = 'minus';
                    Sub(window.firstValue, window.secondValue);
                    window.minusAgain == false;
                    window.secondOperator = true;
                    break;
                } else {
                    window.plusAgain == false;
                    console.log('minus')
                    window.operation = 'minus';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.minusAgain = true;
                    break;
                }
            case 'mult':
                if (window.multAgain == true) {
                    window.multAgain == false;
                    console.log('mult again')
                    window.operation = 'mult';
                    Mult(window.firstValue, window.secondValue);
                    window.multAgain == false;
                    window.secondOperator = true;
                    break;
                } else {
                    window.multAgain == false;
                    console.log('mult')
                    window.operation = 'mult';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.multAgain = true;
                    break;
                }
            case 'divide':
                if (window.divideAgain == true) {
                    window.divideAgain == false;
                    console.log('divide again')
                    window.operation = 'divide';
                    Div(window.firstValue, window.secondValue);
                    window.divideAgain == false;
                    window.secondOperator = true;
                    break;
                } else {
                    window.divideAgain == false;
                    console.log('divide')
                    window.operation = 'divide';
                    window.firstValue = window.displayValue;
                    window.secondOperator = true;
                    window.divideAgain = true;
                    break;
                }
            case 'neg':
                console.log('case neg')
                Neg(window.displayValue);
                break;
            case 'equals':
                console.log('equals')
                window.plusAgain = false;
                window.minusAgain = false;
                window.multAgain = false;
                window.divideAgain = false;
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
                    console.log(buttonValue)
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
        console.log('input1')

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
        console.log('input2')
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
    console.log('clearing all')
    // clear all global variables
    window.displayValue = '0';
    window.currentResult = '';
    window.cachedResult = '';
    window.cachedValue = '';
    window.currentValue = '';
    window.operator = '';
    window.dotApplied = false;
    window.plusAgain = false;
    window.minusAgain = false;
    window.multAgain = false;
    window.divideAgain = false;
    //clear output field
    const display = document.querySelector('.output');
    display.textContent = `${window.displayValue}`;
}

function clearLast() {
    console.log('clearing last')
    // clear recent global variables
    window.currentValue = '';
    window.displayValue = '0';
    //clear output field
    const display = document.querySelector('.output');
    display.textContent = `${window.displayValue}`;
}

function mainOperation(op) {
    if (op == 'plus') {
        console.log('operation plus')
        window.dotApplied = false;
        window.operation = '';
        Add(window.firstValue, window.displayValue);
    }
    if (op == 'minus') {
        console.log('operation minus')
        window.dotApplied = false;
        window.operation = '';
        Sub(window.firstValue, window.displayValue);
    }
    if (op == 'mult') {
        console.log('operation mult')
        window.dotApplied = false;
        window.operation = '';
        Mult(window.firstValue, window.displayValue);
    }
    if (op == 'divide') {
        console.log('operation divide')
        window.dotApplied = false;
        window.operation = '';
        Div(window.firstValue, window.displayValue);
    }
    if (op == 'neg') {
        console.log('operation negative')
        Neg(num);
    }
}

// calculation functions
function Add(num1, num2) {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    sum = num1 + num2
    result = sum.toString()
    console.log('adding')
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
    console.log('subtracting')
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
    console.log('negating')
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
