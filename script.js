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

function Op(op, num1, num2) {
    if (op == '+') {
        return Add(num1, num2);
    }
    if (op == '-') {
        return Sub(num1, num2);
    }
    if (op == '*') {
        return Mult(num1, num2);
    }
    if (op == "/") {
        return Div(num1, num2);
    }
    if (op == "--") {
        return Neg(num1)
    }
}

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', getButton));

document.addEventListener('keydown', getKey);

function getKey(e) {
    const numberkeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (e.key in numberkeys) {
        return e.key
    } else {
        if (e.key == 'Backspace' || 'c') {
            return ('clear');
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
    return button
}