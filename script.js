// global variables
window.output = '';
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
        if (e.key == 'Backspace' || 'c') {
            window.output = '0';
        }
        if (e.key == '/') {
            return ('divide');
        }
        if (e.key == '%') {
            return ('percent');
        }
        if (e.key == '+') {
            return ('plus');
        }
        if (e.key == '-') {
            return ('minus');
        }
        if (e.key == '*') {
            return ('mult');
        }
        if (e.key == '=') {
            return ('equals');
        }
        if (e.key == ',') {
            return ('comma');
        }
    }
}

function getButton(e) {
    const position = (document.elementFromPoint(e.clientX, e.clientY));
    const button = position.id;
    return fillDisplay(position.id);
}

function fillDisplay(value) {
    const onlyInclude = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (value in onlyInclude) {
        window.output = `${value}`;
        const display = document.querySelector('.output');
        display.textContent = `${window.output}`;
    } else return;
}