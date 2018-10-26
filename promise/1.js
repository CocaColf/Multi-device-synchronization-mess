function asyncFunc() {

    // 返回一个Promise对象
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // 成功时执行的回调
            resolve('promise async function success');
        }, 1000);
    });
}

//  .then()成功时  .catch 失败时
asyncFunc().then(function(value) {
    console.log(value);
}).catch(function(error) {
    console.log(error);
});