// 链式调用 传值
function taskA(A) {
    return A + 1;
}

function taskB(B) {
    return B + 2;
}

function taskC(C) {
    console.log(C + 3);
}

function errorFnc(error) {
    console.log(error);
}

var p = Promise.resolve(2);
p
    .then(taskA)
    .then(taskB)
    .catch(errorFnc)
    .then(taskC);
