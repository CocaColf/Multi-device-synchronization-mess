---
layout: post
title: 几种常用的CSS布局总结
date: 2018/03/28
categories: CSS
---
&#160;&#160;&#160;&#160;其实对于布局感觉有时候就是随便在用，靠感觉，在一天走在路上的时候突然想起来这件事，于是觉得有必要总结一下。

&#160;&#160;&#160;&#160;**水平居中**
结构都是：
```html
<div class="demo">
    <div class="parent">
        <div class="child"></div>
    </div>
</div>
```
+ text-algin + inline-block

```CSS
.parent{
    text-align: center;
}
.child{
    display: inline-block;
}
```

+ table + margin

```css
.child2 {
    display: table;
    margin: 10px auto;
}

```

+ absolute + transform

```css
.parent3 {
    position: relative;
}
.child3 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
```

+ flex + justify-content

```css
.parent4 {
    display: flex;
    justify-content: center;
}
```

&#160;&#160;&#160;&#160;**垂直居中**

+ 第一种
```css
.parent{
    height: 100px;
    position: relative;
}       
.child{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
```

+ 第二种

```css
.parent{
    height: 300px;
    display: flex;
    align-items: center;
}
```

+ 第三种

```css
.parent3{
    height: 100px;
    display: table-cell;
    vertical-align: middle;
}
```

&#160;&#160;&#160;&#160;**水平垂直居中**

+ 第一种

```css
.parent{
    height: 300px;
    width: 300px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
.child{
    display: inline-block;
}
```

+ 第二种

```css
.parent2 {
    height: 300px;
    width: 200px; 
    position: relative;
}
.child2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```

+ 第三种
这是一种很灵活的方式：
```html
 <div class="demo"></div>
```

```css
.demo {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

这样就实现了一个垂直水平居中，如果只需要水平或垂直居中，那么调节top等四个属性就好

&#160;&#160;&#160;&#160;**一栏固定，一栏自适应**

```html
<div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

+ 第一种
```css
.left{
    float: left;
    width: 100px;
}
.right{
    margin-left: 120px;
}
```

+ 第二种 利用BFC

```css
.left{
    float: left;
    width: 100px;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}
```

&#160;&#160;&#160;&#160;**等宽多列布局**

```html
<div class="parent">
    <div class="column">1</div>
    <div class="column">2</div>
    <div class="column">3</div>
    <div class="column">4</div>
</div>
```

```css
.column{
    float: left;
    width: 25%;
    padding-left: 20px;
    box-sizing: border-box;
   
}
```
&#160;&#160;&#160;&#160;**一栏固定，另一边多栏等宽自适应**

```html
 <div class="parent2">
    <div class="left3">left2</div>
    <div class="right3">right2</div>
    <div class="right3">right2</div>
</div>
```

```css
.parent2{
    display: table; 
    width: 100%;
}
.left3{
    display:table-cell; 
    width: 100px;
    margin-right: 20px;
    background-color: #000;
}
.right3{
    display:table-cell; 
    background-color: gray;
    border: 1px solid red;
}
```
&#160;&#160;&#160;&#160;**双飞翼布局**

```html
<div class="container">
    <div class="header">header</div>
    <div class="wrapper clearfix">
        <div class="main col">main</div>
        <div class="left col">left</div>
        <div class="right col">right</div>
    </div>
    <div class="footer">footer</div>
</div>
```

```css
 .container {
     width: 500px;
}
.wrapper {
    padding: 0 100px 0 100px;
}
.col {
    position: relative; 
    float: left;
}
.header,.footer {
    height: 50px; 
}
.main {
    width: 100%;
    height: 200px;
}
.left {
    width: 100px; 
    height: 200px; 
    margin-left: -100%;
    left: -100px;
}
.right {
    width: 100px; 
    height: 200px; 
    margin-left: -100px; 
    right: -100px;
}
.clearfix::after {
    content: ""; 
    display: block; 
    clear: both; 
    visibility: hidden; 
    height: 0; 
    overflow: hidden;
}
```

&#160;&#160;&#160;&#160;**和双飞翼布局差不多的杂牌布局**
```html
<div class="header">header</div>
<div class="wrapper">
    <div class="main col">
        main
    </div>
    <div class="left col">
        left
    </div>
    <div class="right col">
        right
    </div>
</div>
<div class="footer">footer</div>
```

```css
.wrapper { 
    position: relative; 
}
.main {
    margin:0 100px; 
    height: 200px;
}
.left { 
    position: absolute; 
    left: 0; 
    top: 0; 
    height: 200px;
}
.right { 
    position: absolute; 
    right: 0; 
    top: 0; 
    height: 200px;
}
```

