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