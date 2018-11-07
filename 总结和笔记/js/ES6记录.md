---
layout: post
title: ES6记录
date: 2018/03/28
categories: CSS
---
**let**
在ES6之前，var定义的变量会发生变量提升，且没有块级作用域，于是要通过立即执行函数等方式构建块级作用域。但在ES6中，由let定义的变量作用于块级作用域，不会发生变量提升

```js
{
    let a = 1;
    var b = 2;
}
console.log(a);     // a没有定义
console.log(b);     // 2
```
在之前有一个很经典的例子，很好的展示了没有块级作用域的情况：

```js
var a = [];
for(var i = 0; i < 10; i++) {
    var c = i;
    a[c] = function() {
        console.log(i);
    }
}
console.log(a[6]());  // 9
```

所以在之前，要构建一个块级作用域是通过`立即执行函数`这种方式进行：

```js
var a = [];
for(var i = 0; i < 10; i++) {
    var c = i;
    (function() {
        a[i] = c;
    }());
}
console.log(a[6]);  // 6
```

在ES6的时代，就不必那么大费周章的去担心块级作用域的问题，直接使用`let`就好：

```js
var a = [];
for(var i = 0; i < 10; i++) {
    let c = i;
    a[i] = c;
}
console.log(a[6]);  // 6
```

**const**

const用来声明常量，只在其块级作用域内有效

`const PI = 3.14;`

**变量的解构赋值**

解构只能用于数组或对象

+ 数组解构赋值: 根据对应位置匹配

```js
var [a,b,c] = [1,2,3];  // a=1 b=2 c=3
var [,,d] = [1,2,3];    // d = 3;
var [e, ...f] = [1,2,3,4];  // f = [2,3,4]
var [foo] = 'hello';    //解构失败会等于undefined
var [foo] = undefined;  // 不能对 undefined 或 null 进行解构
var [foo = true] = [];  // 允许指定默认值
```

+ 对象解构赋值： 根据属性名匹配

```js
var {foo, bar} = {foo: "aaa", bar: "bbb"};
var {foo: baz} = {foo: "ccc"};  // baz: "ccc"

var {p: [x, {y}} = o;
var o = {
    p: [
        "hello",
        {y:"world"}
    ]
};  // x: "hello" y: "world"
```
+ 解构赋值的一些用途

    + 很方便的交换变量值

    `[x,y] = [y, x];`

    + 从函数返回多个值

    ```js
    function example() {
        return [1,2,3];
    }
    var [a,b,c] = example();
    ```

**字符串的扩展**

+ `contains(要找的字符串，[开始位置])`
+ `endsWith(要找的字符串，[前多少个字符])`
+ `startsWith(要找的字符串，[开始位置])`

```js
var s = "Hello world!";
s.contains("Hello");    // true
s.startsWith("Hello");  // true
s.endsWith("!");    // true
```

+ 重复字符串

`"XL".repeat(3);`

+ 模板字符串

可以当作普通字符串使用，比如：

```js
`JavaScript是没有"类"的`;
```

可以定义多行字符串，比如：

```js
`<p>
    哈哈
</p>
`
```

可以在字符串中嵌入变量

```js
var name = "DLO", time = "2017-12-16", task = "考六级";
console.log(`Hello ${name}, ${time}要${task}`);
```

**数组的扩展**

+ 将一组数值转化为数组(数值个数不能小于两个)

```js
Array.of(1,2,3);    // [1,2,3]
```

+ 查找数组元素

`find(回调函数，[绑定回调函数this])` 查找第一个符合条件的数组元素 未找到则返回undefined
`findIndex(回调函数，[绑定回调函数this])` 查找第一个符合条件的数组元素 未找到则返回 -1

```js
[1,3,10,18].find(function(value, index, array) {
    return value > 9;
});
```

填充数组 `数组.fill(填充值，[开始位置],[结束位置])`

```js
['a', 'b', 'c'].fill(6, 0, 2);  // [6,6,'c']
```

+ 遍历数组

对键名进行遍历

```js
for(let e of ['a', 'b'].keys()) {
    console.log(e);
}
```

对键值进行遍历

```js
for(let e of ['a', 'b'].values()) {
    console.log(e);
}
```

对键值对遍历

```js
for(let e of ['a', 'b'].entries()) {
    console.log(e);
}
```

**对象的扩展**

+ 对象复制

```js
var target = {a:1, b:1};
var source1 = {b:2, c:1};
var source2 = {c:3};
Object.assign(target, source1, source2);    // 第一个是目标对象，后面是复制对象
target; // {a:1, b:2, c:3}
```

**Symbol类型**

```js
var symbol = Symbol('symbolName');
symbol.name;    // symbolName
typeof symbol;  // Symbol
```

**Proxy**   
在访问对象之前先进行一层拦截

```js
var person = {
    name: "XL",
    age: 21
}
var proxy = new Proxy(person, {
    // get方法设置 拦截条件
    get: function(target, property) {
        if(property in target) {
            return target[property];
        } else {
            console.log("错误");
        }
    }
});
console.log(proxy.name);    // Xl
console.log(proxy.age);     // 21
console.log(proxy.job);     // 错误
```

**函数的扩展**

+ 允许为函数参数带默认值

```js
function p(x=0, y=1) {
    this.x = x;
    this.y = y;
}
```

+ rest参数 
用于获取函数的多余参数 ...values 这部分是一个数组，所以也可以使用数组的方法

```js
function sum(...values) {
    let sum = 0;

    for (const i of values) {
        sum += i;
    }

    return sum;
}
sum(1,3,6);     // 10
```

+ 扩展运算符 
三个点 ...  作用是把数组里的元素转化为逗号相隔

```js
var a = [1];
var b = [2,3];
var c = [4,5,6];
var d = [0,...a, ...b, ...c];   // [ 0, 1, 2, 3, 4, 5, 6 ]
```

+ 箭头函数

```js
var f = v => v * v;
function f(v) {
    return v * v;
}

var sum = (num1, num2) => num1 + num2;
function sum(num1, num2) {
    return num1 + num2;
};

[1,2,3].map(x => x * x);
[1,2,3].map(function(x) {
    return x * x;
});
```

**Set**
Set类似数组，但成员是唯一的

`add(value)` 添加某个值
`delete(value)` 删除某个值
`has(value)` 返回一个布尔值，表示该值是否为Set成员
`clear()` 清除所有成员
`.size` 返回成员数目

```js
var s = new Set();
[2,3,4,2,2,2].map(x => s.add(x));
for(i of s) {
    console.log(i);
}   // 2,3,4
```

一个很好的例子，比如数组去重：

```js
function dedupe(array) {
    // Array.from() 把一个可迭代的类型转化为数组
    return Array.from(new Set(array));
}
```

**for of遍历**

+ js的 for in遍历获取键名

```js
var arr = ['a', 'b', 'c'];
for(i in arr) {
    console.log(i);
}   // 0, 1, 2
```

+ js的 for of遍历获取键值 不能用于对象的遍历

```js
var arr = ['a', 'b', 'c'];
for(i of arr) {
    console.log(i);
}   // a, b, c
```