/* 
 * Promise的链式调用
 * 只有发生错误时，状态变为reject就会去执行错误处理函数，之前的then都不会被调用
*/
function taskA() {
    console.log('taskA');
    // throw new Error('发生错误');
}

function taskB() {
    console.log('taskB');
}

function taskC() {
    console.log('taskC');
}

function errorFnc(error) {
    console.log(error);
}

var p = Promise.resolve();
p
    .then(taskA)
    .then(taskB)
    .catch(errorFnc)
    .then(taskC);

