---
layout: post
title: DOM
date: 2017/8/24
categories: JavaScript
---

**Node**类型

结构中每一个位置，包括元素，属性，文本等都是一个节点类型

+ nodeType &#160;&#160;&#160;&#160;判断节点类型，如 1
+ nodeValue &#160;&#160;&#160;&#160;节点的值
+ nodeName &#160;&#160;&#160;&#160;节点的名字，如 P
+ childNodes &#160;&#160;&#160;&#160;子节点，一个数组形式返回，值得注意的是连原编码中的换行符都可以是一个子节点
+ parentNode &#160;&#160;&#160;&#160;父节点
+ nextSibling &#160;&#160;&#160;&#160;后一个兄弟节点
+ previousSibling &#160;&#160;&#160;&#160;前一个兄弟节点
+ nextElementSibling &#160;&#160;&#160;&#160; 后一个元素兄弟节点
+ firstChild &#160;&#160;&#160;&#160;第一个子节点
+ lastChild &#160;&#160;&#160;&#160;最后一个子节点
+ appendChild() &#160;&#160;&#160;&#160;添加子节点到节点列表末尾，返回新节点
+ insertBefore() &#160;&#160;&#160;&#160;插入新节点，接受两个参数，新节点和参考节点，方法返回新节点
+ replaceChild() &#160;&#160;&#160;&#160;替换节点，接受两个参数，新节点和被替换节点。方法返回被替换节点
+ removeChild() &#160;&#160;&#160;&#160;删除节点，参数是这个节点

**Document类型**

JavaScript 通过 Document 类型表示文档。在浏览器中， document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面。

文档子节点

+ document.documentElement 取得对&lt;html>的引用
+ document.body document.title都可以取得这些值

文档查找元素

+ getElementById(id)
+ getElementsByTagName()
+ getElementsByName()

**Element类型**

+ 要访问Element的节点名，可以使用tagName属性。可是，比如div.tagName实际上输出的是"DIV"而非"div"。在 HTML 中，标签名始终都以全部大写表示；而在 XML（有时候也包括 XHTML）中，标签名则始终会与源代码中的保持一致。假如你不确定自己的脚本将会在 HTML 还是 XML 文档中执行，最好是在比较之前将标签名转换为相同的大小写形式。

```js
if(element.tagName.toLowerCase() == "div") {}
```

取得特性

+ getAttribute()
+ setAttribute(要设置的属性， 属性的值)
+ removeAttribute()

创建元素

+ 使用 document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名


 ```js
 var div = document.createElement("div");
 ```
 
  在使用 createElement()方法创建新元素的同时，也为新元素设置了 ownerDocuemnt 属性。此时，还可以操作元素的特性，为它添加更多子节点，以及执行其他操作。
 
```js
div.id = "myNewDiv";
div.className = "box";

```

在新元素上设置这些特性只是给它们赋予了相应的信息。由于新元素尚未被添加到文档树中，因此设置这些特性不会影响浏览器的显示。要把新元素添加到文档树，可以使用appendChild(),insertBefore(),replaceChild()方法。下面的代码会把新创建的元素添加到文档的<body>元素中。

```js
document.body.appendChild(div);
```

一旦将元素添加到文档树中，浏览器就会立即呈现该元素。此后，对这个元素所作的任何修改都会实时反映在浏览器中

+ 元素的子节点

元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的childNodes属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。不同浏览器在看待这些节点方面存在显著的不同，所以在遍历节点对特定节点做操作时要进行nodeType检测

**Text类型**

+ nodeValue 的值为节点所包含的文本；
+ 使用下列方法可以操作节点中的文本。
 + appendData(text)：将 text 添加到节点的末尾。
 + deleteData(offset, count)：从 offset 指定的位置开始删除 count 个字符。
 + insertData(offset, text)：在 offset 指定的位置插入 text。
 + replaceData(offset, count, text)：用 text 替换从 offset 指定的位置开始到 offset+count为止处的文本。
 + splitText(offset)：从 offset 指定的位置将当前文本节点分成两个文本节点。
 + substringData(offset, count)：提取从 offset 指定的位置开始到 offset+count 为止
处的字符串。

+ document.creatTextNode()创建一个文本节点，然后加入文档树才可以看到实例效果

**DocumentFragment类型**

这是一个“仓库”，主要用于存储要大规模添加的节点。比如在一个ul下要添加三个li标签，如果单独一个个加的话，会造成浏览器反复渲染，所以可以把它先放到仓库里，然后一次性添加。

```js
var ul = document.getElementById("myul");
var fragment = document.creatDocumentFragment();
var li = null;

for(var i = 0; i < 3; i++) {
	li = document.creatElement("li");
    fragment.appendChild(li);
}
ul.appendChild(fragment);
```





