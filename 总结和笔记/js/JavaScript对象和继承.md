---
layout: post
title: JavaScript对象和继承
date: 2017/8/17
categories: JavaScript
---


#### 创建对象

**工厂模式**

用函数来封装以特定的接口来创建对象

```js
function createPerson(name, age) {
	var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
    	alert(this.name);
    	};
    return o;
}

var person1 = new creatPerson(“kobe”, 38);
person1.sayName();	//kobe
```

虽然可以无数次的调用这个函数创建对象，工厂模式虽然解决了创建相似对象的问题，但没有解决如何识别一个对象类型的问题

**构造函数模式**

构造函数模式不需要显式的创建对象，直接将属性和方法赋给this对象

```js
function Person(age, name) {
	this.age = age;
    this.name = name;
    this.sayName = function() {
    	alert(this.name);
    	};
}

var person = new Person("kobe", 38);
person.sayName();
```

当使用new操作符创建对象后，对象自动获得了一个constructor属性指向构造函数

```js
alert(person.constructor == Person)	//true
alert(person instanceof Person)		//true
```

但构造函数模式存在缺点，每个方法都要在每个对象上重新建立一次，虽然可以把公共方法建立在构造函数外部，以全局函数来实现，但那样的话影响封装性，这个问题可以通过原型模式解决

**原型模式**

每个函数都有一个prototype属性，这是一个对象，用来建立所有实例的共享属性和方法

```js
function Person() {

}
Person.prototype.name = "kobe";
Person.prototype.age = 38;

var person = new Person();
person.age	//38
person.name = "Brant";
alert(person.name)	//Brant
````

原型也有一个constructor属性，指向构造函数，如 person.prototype.constructor = Person;这个属性相当于一个指针。

而创建一个实例后，实例内存在一个_proto_属性，这个属性是一个指向原型的指针，用来查找原型内属性和方法。这个指针可以用isprototypeof()来判断

```js
alert (Person.prototype.isprototypeof(person))		//true
```

实例自己可以创建和原型同名的属性，那样的话实例从原型内继承的属性将会被覆盖。使用delete操作符删除的话，实例又可以继续访问原型属性。实例可以用hasOwnProperty(属性/方法)方法或者 属性/方法 in 实例 来判断方法是不是来自原型。

如果原型使用属性集合方式来写，那么constructor属性将不再指向Person了。因为用这种方式书写prototype对象，本质上就是重定义了这个对象，那么相应的constructor属性也将指向新的（Object构造函数），不过此时可以在原型里添加constructor属性来指定构造函数。

原型模式最大的缺点恰好也是来自共享。因为实例的指针会指向原型，所以一个实例改变原型一个内容，其余实例的相同内容也会被改变。而有时候实例确实需要一点私密点的东西。

```js
//现在给原型增加一个属性
Person.prototype.friends = ["kobe", "russell"];
person.friends.push("XL");
var person2 = new Person();
person2.friedns = ["kobe", "russell", "XL"]；
```

所以很少会单独使用原型模式，一般组合使用原型模式和构造模式。

**组合使用原型模式和构造模式**

构造函数定义实例属性，而原型函数构造共享方法和属性，于是每个实例都有自己的一份属性，同时又有共享方法，还支持传递参数。

```js
function Person(name, age, job) {
	this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["russell", "kobe"];
}
Person.prototype = {
	constructor: Person;
    sayname: function() {
    alert(this.name);
    }
}
```

这种方式使用最广泛。

#### 继承

**原型链**

当创造一个函数，那么这个函数将会有一个prototype对象，而这个对象有指向这个函数的指针，而函数创建的实例又有指向原型的指针，如果说把这个原型变成另一个函数的实例，那么这个实例又将指向自己的原型，依次上推，于是便形成了一个原型链，于是最上层原型的方法和属性会被下层继承。最顶层的是Object.prototype

```js
function SuperType() {
	this.prototype = true;
}
SuperType.prototype.getSuperValue = function() {
	return this.prototype;
}
function SubType() {
	this.prototype = false;
}
//继承
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
	return this.prototype;
}

var instance = new SubType();
alert(instance.getSuperValue());	//true

alert(instance instanceof Object);	//true
alert(instance instanceof SuperType);	//true
alert(instance instanceof SubType);		//true
alert(instance.constructor)		//SuperType
```

但通过原型链继承有一些缺点

+ 包含引用类型值的原型

```js
function A() {
	this.colors = ["red", "black"];
}

function B() {

}
B.prototype = new A();

var instance1 = new B();
instance1.colors.push("white");

var instance2 = new B();
alert(B.colors);	// "red, black, white"
```

也就是具有相同原型的实例重写了原型内属性的话，就会影响到所有的实例。

+ 不能传递参数

**借用构造函数**

基本思想就是在子类型的构造函数里调用超类型构造函数，利用call() 和 apply()方法

```js
function A(name) {
	this.colors = ["red", "black"];
    this.name = name;
}

function B() {
	A.call(this, "kobe");
}

var instance1 = new B();
instance1.colors.push("white");

var instance2 = new B();
alert(B.colors);	// "red, black"
```

**组合继承**

思路是将原型链作为原型属性的继承，构造函数作为实例属性的继承。这样的话，既通过原型上定义方法实现了函数复用，又能够保证每个实例都有自己的一份属性。

```js
function A(name) {
	this.colors = ["red", "black"];
	this.name = name;
}
A.prototype.sayName = function() {
	alert(this.name);
}

function B(name) {
	A.call(this, name);
}

B.prototype = new A();

var instance1 = new B("XL");
instance1.colors.push("white");
instance1.sayName();	//XL

var instance2 = new B("F");
alert(B.colors);	// "red, black"
instance2.sayName();	//F
```

**寄生式继承**

创建一个仅用于封装继承过程的函数，在函数内部增强对象，然后返回对象。

```js
function creatAnotherPerson(original) {
	var clone = object(original);
	clone.sayHi = function() {
		alert("Hi");
	};

	return clone;
}

var person = {
	name: "XL";
	age: 21;
};

person = creatAnotherPerson(person);
person.sayHi();	//Hi
```

**寄生组合式继承**

由于在组合继承里会两次调用超类的构造函数，所以为了减少这种调用，有了寄生组合继承。

```js
unction inherit(A, B) {
	var prototype = object(A);	//创建对象
	prototype.constructor = B;	//增强对象
	B.prototype = prototype;	//指定对象
}

function A(name) {
	this.name = name;
}
A.prototype.sayName = function() {
	alert(this.name);
};

function B(name) {
	A.call(this, name);
}

inherit(A, B);

var b = new B("Xl");
b.sayName();	//Xl
```





