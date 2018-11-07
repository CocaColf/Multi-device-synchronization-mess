/* 
 * 相当于：Promise.resolve() new Promise的快捷方式
 * new Promise(function(resolve,undefined) {
 *      resolve(value);
 * })
*/
Promise.resolve(42).then(function(value) {
    console.log(value);
});

Promise.reject('error').catch(function(error) {
    console.log(error + '!!');
});