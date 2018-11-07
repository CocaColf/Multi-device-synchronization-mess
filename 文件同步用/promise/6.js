// Promise.race() 接收promise对象组成的数组，当某个对象状态变为完成或失败时进行下一步
function timeDelay(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay);
        }, delay);
    });
}

Promise.race([
    timeDelay(1),
    timeDelay(300),
    timeDelay(1000)
]).then((value) => {
    console.log(value);
})