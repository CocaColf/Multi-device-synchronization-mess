---
layout: post
title: Java/script事件
date: 2017/8/27
categories: JavaScript
---


事件流描述的是从页面中接收事件的顺序。

**事件冒泡**

事件开始由最具体的元素（文档层次最深的节点）接收然后逐级传播到不具体的节点。浏览器基本都支持事件冒泡。

**事件捕获**

不太具体的节点应该先接收事件，具体的节点应该最后接收到事件。事件捕获的用意在于事件到达预定目标前捕获它。由于老版本浏览器不支持，所以特殊时候再考虑事件捕获。

**DOM事件流**

“DOM二级事件”规定事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。

**事件处理程序**

+ 事件就是用户或浏览器自身执行的某种操作，如click；而响应某个事件的函数就是事件处理程序，以on开头，如onclick。

+ HTML事件处理程序，在接收事件的元素标签内添加事件处理程序

+ DOM0级事件处理程序
 + 获取对事件元素的引用，然后把事件处理作为一个属性加入。以这种方式加入的事件会在事件冒泡流阶段被处理。

```js
var btn = document.getElementById("btn");
btn.onclick = function() {

}

btn.onclick = null	//删除该事件处理
```

+ DOM2级事件处理程序

 + “ DOM2 级事件” 定义了两个方法，用于处理指定和删除事件处理程序的操作： addEventListener()和 removeEventListener()。所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。使用它的好处在于可以在一个元素上添加多个事件处理。

```js
var btn = document.getElementById("btn");
btn.addEventListener("click", function() {
	//处理
}, false);
```

值得注意的是，使用removeEventListener()移除事件处理时，对添加的匿名函数处理程序无效，只对参数传入addEventListener()的有效。

```js
var btn = document.getElementById("btn");
function handle() {
	//
};
btn.addEventListener("click", handle, false);
btn.removerEvnetListener("click", handle, false);
```

+ IE事件处理程序

 + IE的两个方法是attachEvent() 和 detachEvent()。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。

```js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){	//注意这里是onclick
	alert("Clicked");
});
```

**事件对象**

在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。

````js
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(event){
	alert(event.type);	//click
});
```

+ type 被触发的事件的类型
+ target 事件的目标
+ 要阻止特定事件的默认行为，可以使用 preventDefault()方法
+ stopPropagation()方法用于立即停止事件在 DOM 层次中的传播，即取消进一步的事件捕获或冒泡

```js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
	alert("Clicked");
	event.stopPropagation();
};
document.body.onclick = function(event){
	alert("Body clicked");
};
```

点击按钮本来会出现两个弹框，但是由于在btn里停止了事件冒泡，于是body里的事件根本不会发生

+ stopImmediatePropagation() 取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用
+ preventDefault() 取消事件的默认行为


