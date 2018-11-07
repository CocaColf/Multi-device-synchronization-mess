---
layout: post
title: this
date: 2017/8/30
categories: JavaScript
---


this是JavaScript中一个很复杂的机制，也是我上次面试深信服没有答好的一个问题。看完了《你不知道的JavaScript》第二章，对this有了更多的了解。

为什么要用this？this提供了一个很优雅的隐式的传递对象引用以及自动匹配合适的上下文对象的一种方式。比如可以使得一个方法直接传入一个对象，而不用对每个对象都去编写一个方法。

调用位置
==-

调用位置就是函数在代码中被调用的位置，而不是声明的位置。
调用栈是为了到达当前执行位置要经过的一系列函数。
调用位置就在当前正在执行的函数的前一个调用中。

```js
function baz() {
	//当前调用栈是baz
	//当前调用位置是全局作用域

	console.log("baz");
	bar();	//bar()的调用位置
}

function bar() {
	//当前调用栈是 baz -> bar
	//当前调用位置是在baz中

	console.log("bar");
	foo();	//foo的调用位置
}

function foo() {
	//当前调用栈是 baz -> bar -> foo
	////当前调用位置是在bar中

	console.log("foo");
}

baz();	//baz的调用位置
```

函数执行过程中调用位置如何决定this的绑定对象。

绑定规则
==-

**默认绑定**

当独立函数调用时，发生默认绑定，此时this作用于全局对象

```js
function foo() {
	console.log(this.a);
}
var a = 2;
foo();	// 2
```

如果使用严格模式，那么此时全局对象无法使用默认绑定。

```js
function foo() {
	"use strict";
    
	console.log(this.a);
}
var a = 2;
foo();	// TypeError
```

**隐式绑定**

隐式绑定是指这个this是否被某个对象所包含或拥有

```js
function foo() {
	console.log(this.a);
}
var obj = {
	a: 2,
	foo: foo
};
obj.foo();	// 2
```

所以在foo调用时，它的落脚点是在obj这个对象的域里，隐式绑定规则会把函数调用中的this绑定到这个对象上。

但是在隐式绑定中，要注意**隐式丢失**的问题。

隐式丢失就是隐式绑定的函数会丢失绑定对象，那么这样的话就会应用默认绑定，从而把this绑定在全局对象或者undefined上。

```js
function foo() {
	console.log(this.a);
}
var obj = {
	a: 2,
	foo: foo
};
var bar = obj.foo;
var a = "abc";
bar();	//"abc"
```

在这个地方，虽然bar是obj.foo的一个引用，但实际上它是引用了foo函数本身，所以就是一个纯粹的函数调用，使用默认绑定。

```js
function foo() {
	console.log(this.a);
}

function doFoo(fn) {
	fn();
}
var obj = {
	a: 2,
	foo: foo
};
var a = "abc";
doFoo(foo);	// "abc"
```

当使用回调函数时，会发生隐式丢失。
在上面这个程序里，实际上对于 doFoo(foo), fn其实是引用了foo， 所以在执行时，foo实际上是运行在doFoo这个域里，而doFoo()是直接调用无修饰的函数，所以会进行默认绑定。

同样的道理，可以体现在setTimeout()里

```js
function foo() {
	console.log(this.a);
}

var obj = {
	a: 2,
	foo: foo
};

var a = "abc";

setTimeout(obj.foo, 1000);	//"abc"

```

在这里，也相当于调用了一个回调函数。

```js
function setTimeout(fn, 1000) {
	fn();
}
```

**显式绑定**

对于隐式绑定，就是在一个对象内部强制性的添加了一个指向这个函数的属性，如果不使用这个强制手段来绑定对象，该怎么做呢？这时候就需要用到call() 和 apply()方法。

这两个方法的第一个参数是一个对象，它们会把这个对象绑定到this上，然后在调用函数的时候指定这个this。

```js
function foo() {
	console.log(this.a);
}

var obj = {
	a: 2,
};

foo.call(obj);	// 2
```

所以通过call方法，实现了把this绑定到了obj对象上。

但是显式绑定也无法解决绑定丢失的问题，但是可以通过**硬绑定**来解决。

```js
function foo() {
	console.log(this.a);
}

var obj = {
	a: 2,
};

var bar = function() {
	foo.call(obj);
};

bar();	//2
setTimeout(bar, 1000);	// 2
bar.call(window);	// 2
```

上面就是一个硬绑定的例子，创建了一个bar()函数，在这个函数内部手动的把foo绑定到obj上面，那么无论怎么改变，只要最终是调用了bar(),那么foo就始终是绑定在了obj身上。很强硬！

利用这个可以实现一个bind函数

```js
function foo(something) {
	return this.a + something;
}

var obj = {
	a: 2,
};

function bind(fn, obj) {
	return function() {
		return fn.call(obj, arguments);
	};
}

var bar = bind(foo, obj);
var b = bar(3);
console.log(b);	//5
```

**new绑定**

new绑定就是在用new操作符操作函数。当使用new调用函数时会发生下面的事情：

+ 创建一个全新的对象
+ 这个对象和原型建立链接
+ 这个对象会绑定到函数调用的this
+ 如果函数没有返回其他对象，那么new表达式中的函数调用就会自动返回这个新对象

```js
function foo(a) {
	this.a = a;
}
var bar = new foo(3);
console.log(bar.a)	// 3
```

绑定方式的优先级
==-

隐式绑定对比显式绑定

```js
function foo() {
	console.log(this.a);
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo();	// 2
obj2.foo();	// 3

obj1.foo.call(obj2);	//3
obj2.foo.call(obj1);	//2
```

所以显式绑定 > 隐式绑定

实际上四种的对比是：**new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**


