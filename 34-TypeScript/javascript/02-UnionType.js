"use strict";
function addTwo(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        num1 + '' + num2;
    }
    return +num1 + +num2;
}
