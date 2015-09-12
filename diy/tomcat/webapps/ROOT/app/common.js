function findNextSqrt(x) {
    if (Math.sqrt(x) % 1 > 0) {
        return findNextSqrt(x + 1);
    } else {
        return x;
    }
}


var getNumberArr = function (upperLimit, repeatCount) {
    var numberArr = [];
    var counter = 0;
    while (numberArr.length < (repeatCount * upperLimit)) {
        numberArr.push((counter++ % upperLimit));
    }
    return numberArr;
}
