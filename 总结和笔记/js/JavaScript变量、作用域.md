---
layout: post
title: Javascript变量、作用域
date: 2017/12/2
categories: JavaScript
---


##### 变量声明


&#160;&#160;&#160;&#160;首先，用var定义的变量将成为定义该变量的作用域中的局部变量；省略var操作符创建的是全局变量

##### 变量类型

&#160;&#160;&#160;&#160;变量包含两种不同数据类型的值：**基本类型和引用类型**。基本类型就是指简单的数据段，引用类型指那些可能由多个值构成的对象。

&#160;&#160;&#160;&#160;在给一个变量赋值的时候，解析器会要对这个值确定类型。如果是基本数据类型(Undefined，Null，String，Number，Boolean)，那么就是按值访问的，因为可以直接操作变量；然而引用类型的值是保存在内存中的对象中的，而js不允许直接操作对象的内存空间，所以操作对象时，实际上操作的是对象的引用，而不是对实际的对象进行操作。


##### 基本类型和引用类型的不同

**1.属性的添加**

&#160;&#160;&#160;&#160;对于基本类型，我们不能给它添加属性，而可以给引用类型添加类型。比如

```js
var student = new Object();
student.name = 'xiaoming';
```

**2.变量复制**

&#160;&#160;&#160;&#160;在复制变量时，基本类型的复制只是值的传递，它在内存里开辟了一个新的空间，所以赋值变量和被赋值变量是独立存在的，互不影响。

```js
var num1 = 10;
var num2 = num1;

num2 = 25;
alert(num1);	// 10

num1和num2是独立的，它们在内存中有自己的独立位置

```

而引用类型的复制就是彼此影响的。大家经常在说，”引用类型的值是按照引用访问的“。这种说法实际上不太严谨，正确的说法应该是：**在进行简单的复制时是对引用进行操作，而涉及到属性的变化时，就是对对象进行操作”**。

```js
var obj1 = new Object();
var obj2 = obj1;
// 在上面这一步，obj2和obj1两个变量具有一样的值，这是因为复制的时候，是把obj1里的值赠送一份给内存中另一份变量obj2,但实际上它赠送的是一个指针，指向的是内存中一个对象。

obj2.name = 'xiaoming';
alter(obj1.name);	//xiaoming
//当obj2是在改变属性的时候，实际上是对指向的那个对象的特性进行操作，而由于obj1和obj2都是指向这个对象，所以obj1的值当然也会发生变化
```

**3.参数传递**

```js
function plus(num) {
    num += 20;
    return num;
}

var exnum = 10;
var res = plus(exnum);

alter(exnum);	// 10
alter(res);		// 30
```

上面，num实际上是plus函数的一个局部变量，当exnum传递给plus时，实际上进行的是值的传递，所以这个时候进入函数的exnum和我外面声明的这个exnum实际上可以看作内存中两个互不影响的变量，所以执行操作后exnum任然不会变。

```js
function changeName(obj) {
	obj.name = "xiaoming";
}

var person = new Object();
changeName(person);

alert(person.name);		// xiaoming
//因为引用类型进行属性操作时是受影响的，而传递person的时候，已经传递了指针
```

##### 执行环境和作用域

&#160;&#160;&#160;&#160;执行环境实际上是一种权限，变量或者函数它对于哪一部分数据具有权限访问。比如全局执行环境，函数执行环境。而每个环境都有一个代表，这个代表叫做变量对象，这个环境所有的变量或者对象都保存在这个对象中。当代码在一个环境中执行的时候，就会创建这个对象的作用域链，作用域链使得对变量或者对象的访问是有序的。这个**作用域链只能是由内层执行环境（比如函数）到最外层执行环境（比如全局执行环境）**
比如js红皮书里一个例子：

```js
var color = "blue";

function changeColor() {
	var anotherColor = "red";
    //在这里可以访问color, anotherColor
    
    function swapColor() {
    	var tempColor = anotherColor;
        another = color;
        color = tempColor;
        
        //在这里可以访问color，anothColor，tempColor
    }
    
    swapColor();
}

//这里只能访问color
changeColor();

```

**JavaScript没有块级作用域**

块级作用域就是if/else/for/while它们大括号之间的部分。

```js
if(true) {
	var name = "XL;
}
alert(name);	//XL
```

如果是像c和Java这种有块级作用域的语言，那么在if内声明的变量就会在if之外被毁灭掉，但是js不会，js在外部依然可以访问它。那么这就会带来**污染全局环境的问题**。
所以一个经典的例子是：

```js
for(var i = 0; i < 10; i++) {
	//
}
alert(i);	// 10
```