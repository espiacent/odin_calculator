// global variables
window.value = '';
window.op = '';
window.num1 = '';
window.num2 = '';

// main operate function
function Op(op, num1, num2) {
    if (op == 'plus') {
        return Add(num1, num2);
    }
    if (op == 'minus') {
        return Sub(num1, num2);
    }
    if (op == 'mult') {
        return Mult(num1, num2);
    }
    if (op == "divide") {
        return Div(num1, num2);
    }
    if (op == "neg") {
        return Neg(num1)
    }
    if (op == "clear") {
        return Clear()
    }
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

// event listeners
const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', getButton));
document.addEventListener('keydown', getKey);

//input functions
function getKey(e) {
    const numberkeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (e.key in numberkeys) {
        return fillDisplay(e.key);
    } else {
        return;
        // if (e.key == 'Backspace' || 'c') {
        //     return fillDisplay('clear');
        // }
        // if (e.key == '/') {
        //     console.log('divide');
        // }
        // if (e.key == '%') {
        //     console.log('percent');
        // }
        // if (e.key == '+') {
        //     console.log('plus');
        // }
        // if (e.key == '-') {
        //     console.log('minus');
        // }
        // if (e.key == '*') {
        //     console.log('mult');
        // }
        // if (e.key == '=') {
        //     console.log('equals');
        // }
        // if (e.key == ',') {
        //     console.log('comma');
        // }
    }
}

function getButton(e) {
    const position = (document.elementFromPoint(e.clientX, e.clientY));
    const button = position.id;
    fillDisplay(position.id);
    return;
}

function fillDisplay(value) {
    const onlyInclude = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (value in onlyInclude) {
        window.value += value;
        const display = document.querySelector('.output');
        display.textContent = `${window.value}`;
        // clear maybe own function    
    } if (value == 'clear') {
        window.value = '';
        const display = document.querySelector('.output');
        display.textContent = '0';
    } else { return; }
}