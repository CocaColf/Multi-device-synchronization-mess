---
layout: post
title: ECMAscript常用原生方法总结
date: 2017/12/14
categories: JavaScript
---
&#160;&#160;&#160;&#160;JavaScript一共有五种数据基本数据类型：
+ `Undefined`
    + 就一个值 undefined
    + 一个变量声明后未初始化，自动赋值 undefined
    + 对未声明的变量进行typeof也会返回undefined

+ `Null`
    + 就一个值 null
    + 使用typeof返回object
    + 如果某个保存对象的变量还没有保存真正的对象时，可以先把null赋值给这个变量

+ `Boolean`
    + 有两个字面值 true 和 false
    + 转型函数Boolean()
        + true -> true, false -> false
        + 空字符串 -> false, 非空字符串 -> true
        + 任何非零数字（包括无穷大） -> true, 0和NAN -> false
        + 任何对象 -> true, null -> false
        + undefined -> false

+ `Number`
    + isFinite()
    + NAN和任何值都不相等，包括本身
    + Number()
    + parseInt()
    + parseFloat()

+ `String`
    + toString()
    + string()

还有一种复杂数据类型——`object`。

&#160;&#160;&#160;&#160;判断变量的类型用typeof,typeof variable返回值有
+  `undefined` 这个值未定义
+ `boolean` 这个值是布尔值
+ `number` 这个值是数字
+ `string` 这个值是字符串
+ `object` 这个值是对象或null
+ `function` 这个值是函数

** 全等和相等 **
&#160;&#160;&#160;&#160;相等 == 是先转换再比较，而全等 === 是不转换直接比较

+ 如果一个操作数是布尔值，那么先把布尔值转化为数值，true转为1，false转为0
+ 如果字符串与数字，那么先把字符串转为数值
+ 如果其中一个是对象，那么先调用对象的valueOf()把对象转化为基本类型值

其中要注意的是

+ null 和 undefined是相等的
+ 若其中一个是NAN，那么相等返回false，不等返回true，包括它自己
+ 如果两个都是对象，那么就比较它们是不是同一个对象

&#160;&#160;&#160;&#160;对待ES的方法，应该是并不需要刻意去记，在使用里慢慢的熟悉，但最近感觉自己有时候会印象不太深刻，于是干脆总结一下，当作一个复习。

**Number类型**

1.确定一个数是否是无穷的， `isFinite(number)`
2.确定一个参数是否为非数值 `isNaN(number)`
3.处理成整数 `Number(parameter)`
4.处理成整数更常用 `parseInt(parameter, [基数])`
5.处理成浮点数 `parseFloat(parameter)`
6.返回数字的字符串形式 `number.toString([基数])`
7.按指定的小数位返回数值 `number.toFix(小数位)` 会自动进行四舍五入

**String类型**

1.转化为字符串 `value.toString([基数])` Null和Undefined没有这个方法
2.在不知道是否为null或undefined时转化为字符串 `String(value)`
3.访问字符串中特定字符 `value.charAt(位置)` 返回字符串中这个位置的字符
4.访问字符串中特定字符的字符编码 `value.charCodeAt(位置)` 返回字符串中这个位置的字符的字符编码
5.基于原字符串创建新字符串 `value.slice(开始，结束)` `value.substring(开始，结束)` `value.substr(开始，要返回的字符个数)` **对原字符串无影响**
6.从字符串中查找字符 `value.indexOf(要查找的字符)` `value.lastIndexOf(要查找的字符)` 返回索引
7.删除前后空格 `value.trim()` 对原字符串无影响，返回新字符串
8.大小写转化 `value.toLowerCase()` `value.toUpperCase()`
9.模式匹配方法 

+ `text.match(正则表达式)` 返回匹配项组成的数组
+ `text.search(正则表达式)` 返回第一个匹配项的索引
+ `text.replace(被替代的组合， 替换组合)`

10. 转化为数组 `value.splice(字符串分隔符)`

**Array类型**

1.返回数组的字符串表示 `array.toString()`
2.分割数组 `array.join(分隔符)`
3.把值加入数组末尾 `array.push(值)` 返回修改后数组的长度
4.从数组末尾移除一项 `array.pop()` 返回被移除的项
5.移除数组第一个项 `array.shift()` 返回该项
6.在数组前端加任意项 `array.unshift(值)` 返回修改后数组长度
7.反转数组项 `array.reverse()`
8.对数组项排序 `array.sort()`
9.合并数组或项，成为新数组 `array.concat(数组或项)`
10.基于当前数组创建一个或多个项的新数组 `array.slice(范围)` 返回一个新数组，对原数组不会有影响
11.删除、插入、替换 `array.splice(开始位置，要删除的项，插入的项)` 会改变原数组，并返回删除的项
12.在数组中查找 `array.indexOf(要查找的项，[开始查找的位置])` 返回要查找项在数组中的索引
13.反向在数组中查找 `array.lastIndexOf(要查找的项，[开始位置])` 返回索引
14.迭代方法 `array.迭代函数(function(item, index, array){ })`

+ every(): 对数组内每一项运行指定函数，如果函数对每一项都返回true，则返回true
+ filter(): 对数组内每一项运行指定函数，返回true的项组成的数组
+ forEach(): 对数组内每一项运行指定函数，无返回值
+ map(): 对数组内每一项运行指定函数，返回函数调用结果组成的数组，对原数组无影响
+ some(): 对数组内每一项运行指定函数，如果函数对任一项返回true，则返回true

**Math对象**

1.返回最大项 `Math.max(各个项)`
2.返回最小项 `Math.min(各个项)`
3.对于数组可以 `Math.max.call(Math, 数组)`
4.`Math.ceil(数)` 向上舍入,将数值向上舍入为最近整数
5.`Math.floor(数)` 向下舍入,将数值向下舍入为最近整数
6.`Math.round(数)` 四舍五入
7.随机数 `值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)`
8.num的power次幂 `Math.pow(num, power)`