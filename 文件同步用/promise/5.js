// Promise.all() 接收promise对象组成的数组，当所有对象状态全部变为完成或失败时进行下一步
function timeDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay);
        }, delay);
    });
}

Promise.all([
    timeDelay(1),
    timeDelay(30),
    timeDelay(100)
]).then((value) => {
    console.log(value);
})