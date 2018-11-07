---
layout: post
title: CSS学习总结
date: 2017/7/8
categories: CSS
---


+  外联样式表和内联样式表


内联样式表：

```xml
<style type="text/css">
	样式选择器
</style>
```

外联样式表：

```xml
<link rel="stylesheet" href="样式表所在的目录" media="使用设备所对应的值">
```

外联样式表比较好用，因为易控制和复用

+  继承


当一个属性被应用于某元素时，该属性会被子元素所继承，但可以使用内部样式来消除继承


#### CSS属性

 +  控制文本


**1.font**

把下面多个属性联合成一个

**2.font-family**

指定应该使用的自性或字体族。可以同时指定多个，最后一个为通用字体（serif, sans-serif, monospace)

**3.font-size**

指定字体大小(长度，绝对尺寸，相对尺寸，百分比)

**4.font-weight**

指定字体应为正常体或粗体(normal, bold, bolder, lighter, 100~900)

**5.font-style**

指定字体应为正常体、斜体、伪斜体(noraml, italic, oblique)

**6.font-variant**

指定字体为正常或小型大写字母(normal, small-caps)

 + 文本格式化


**1.color**

指定文本颜色。

**2.text-align**

指定文本在包含元素中的水平对齐

left：与包含元素的左边框中的文本对齐

right：与包含元素的右边框中的文本对齐

center：将内容在包含元素居中放置

justify：将文本拉伸至整个包含元素的宽度

start：将行内内容对齐于行内盒子的起始处

end：将行内内容对齐于行内盒子的结尾处

**3.vertical-align**

指定文本在包含元素中的垂直对齐，尤其对于图片及文本片段很有用。

baseline：与父元素的基线对齐（默认）

sub：将元素作为下角标

super：将元素作为上角标

top：将文本顶端及图片顶端与行内最高元素的顶端对齐

text-top：将文本顶端与图片顶端与行内最高文本的顶端对齐

middle：将元素垂直中点与父元素垂直中点对齐

bottom：将文本底部与图片底部与行内最低元素的底部对齐

text-bottom：将文本底部及图片底部与行内最低文本的底部对齐


**4.text-decoration**

指定文本是否有上划线、下划线、中划线(underline, overline, line-through, none)

**5.text-indent**

指定从左侧边框起文本的缩进。

**6.text-transform**

指定文本的内容为全部大写、小写、首字母大写

none:不发生变化

capitalize：大写每个单词的首字母

uppercase：将元素内容全部设置为大写

lowercase：将元素全部内容设置为小写


**7.text-shadow**

指定文本应具有投影

```css
.dropshadow {
text-shadow: #999999 10px 10px 3px;
}
```

**8.letter-spacing**

控制字符间的宽度。（字距）

**9.word-spacing**

控制单词间的距离

**10.white-space**

指定空格是否应该被压缩、保留或阻止换行

**11.direction**

指定文本行文方向

ltr：文本由左向右流动

rtl：文本由右向左流动

inherit：文本流动方向与父元素相同


 + ###### 文本伪类


**1.first-letter伪类**

指定仅适用于元素中首字符的规则，常用于杂志文章什么的开头

```css
p.introduction: first-letter {
font-size: 40px;
}
```

**2.first-line伪类**

能够以与段落中其他部分不同的方式渲染第一行。

```css
p.introduction: first-line {
font-weight: bold;
}
```

#### 选择器

**1.简单选择器**

通过元素名称

**2.通用选择器**

需要将某个规则应用于全部元素时使用，一般用于设置文档的默认值（font-size什么的）

```css
* {

}
```

**3.类型选择器**

将相同的规则应用于多个元素

```css
h1, h2, h3 {

}
```

**4.类选择器**

将规则与一个（或多个）包含class特性的元素相匹配

如果有这么一个元素 

```css
<aside class="BackgroundNote">This paragraph contains an aside</aside>
```

选择器有两种方式

```css
1. 
.BackgroundNote {

}

2. 
aside.BackgroundNote {

}
```

如果有多个元素都带有class特性且值相同，（比如一个&lt;div>和另一个&lt;div>）若是希望他们的显示方式一样，那么就使用方式1。

**5.id选择器**

因为id特性必须保持唯一，所以不必表明元素名称。使用 

```css
#id名称 ｛
}
```

**6.子选择器**

匹配某一元素的直接子元素，如

```css
td > b {

}
```

**7.后代选择器**

匹配一种元素类型，该元素为另一个元素的后代元素（嵌套在另一个元素内），使用空格

```css
table b {

}
```

**8.相邻兄弟选择器**

匹配一种作为其他元素相邻兄弟的选择器。如 如果希望第一级标题后的第一个段落和其他&lt;p>元素不同，就可以使用这种选择器

```css
h1+p {

}
```

**9.一般兄弟选择器**

**10.特性选择器**

#### 长度

**1.相对单位**

1.px


像素

2.em


1单位的em与当前字体的高度等价

3.ex


为小写字母x的高度

**2.绝对单位**

**3.百分比**

如果页面有两个段落，想让每个段落占据一半页面，就可以设置width为50%； 如果一个p位于另一个元素500px内部，则为每个段落占据包含元素宽度的50%（250px）

#### 盒子模型

**border 盒子的边框**

* 属性


 * border-color 边框颜色


 * border-style 指定边框线的样式


    * none:不存在边框
    * solid 实线
    * dotted 边框为一系列的点
    * dashed 边框为一系列短线
    * groove 边框具有切入效果
    * ridge 边框与groove相反
    * inset 边框使盒子看起来内嵌与页面
    * outset 边框使盒子看起来突出于画布
    * hidden 与none相同，但作为表格元素的边框冲突解决方案

 * border-width 边框宽度


 * 略缩形式表达

```css
p {
border： 4px solid red;
}
```


**margin 盒子边框到下一个盒子的距离（外边距）**

 * margin-bottom
 * margin-top
 * margin-left
 * margin-right


**padding 元素内容到盒子边框的距离（内边距）**

 * padding-bottom
 * padding-top
 * padding-left
 * padding-right

**内容盒子属性**

 * height 盒子高度
 * width 盒子宽度


（width和height也可以设置为关键字auto,含义为大小刚好能容纳其内容）

 * line-height 文本行的高度（行距）
 * max-height 盒子最大高度
 * min-height 盒子最小高度
 * max-width 最大宽度
 * min-width 最小宽度


 （最大和最小可以避免太高或太宽难以阅读的情况发生）
 
 * overflow 当放入的内容比盒子要大时使用
  * hidden 溢出内容被隐藏
  * visible 溢出内容在盒子外可见
  * scroll 盒子添加滚动条以允许用户查看内容
  * auto 盒子在必要时增加滚动条
  * inherit 继承父元素overflow属性


块级元素都从新行开始，包含该块级元素的盒子会占据浏览器的全部宽度

行内元素就占据自身位于包含的块级元素的一个大小

##### 链接

color

background-color 高亮显示链接

text-decoration 控制链接是否下划线 none/underline

链接伪类

 * link 链接总体样式
 * visited 已访问的链接样式
 * hover 当链接上有鼠标悬浮时的样式
 * active 链接正在被点击时的样式


```css
a : link {
	color:#0000ff;
    text-decoration : none;
}
a : visited {
	color : #333399;
    text-decoration : none;
}
```

##### 背景

background-color

background-image

```css
body {
background-image : url("images/background.jpg");
}
```

background-repeat

如果盒子比图片大，图片会重复显示，于是用这个属性控制

 * repeat 默认值，很少使用
 * repeat-x 横向重复
 * repeat-y 纵向重复
 * no-repeat 不重复

background-attachment

 * fixed 用户如果上下滚动页面，图片不动
 * scroll 滚动时图片在页面相同位置
 
background-position

定位背景

 * x%y% 沿x和y轴的百分比
 * x y 沿x和y轴以像素计算的绝对长度
 * left 
 * center
 * right
 * top
 * bottom

background

缩略形式 （颜色 图片 重复 滚动 定位）

##### 列表

* list-style-type


控制标记符号的外观（那个点点或数字）

 *  none
 *  disc 实心圆（默认）
 *  circle 空心圆
 *  square 实心方块
 *  decimal 数字
 *  decimal-leading-zero 数字前加0
 *  lower-latin 小写拉丁字符
 *  upper-latin 大写拉丁字符
 *  lower-roman 小写罗马数字
 *  upper-roman 大写罗马数字

* list-style-position


指定项目符号在包含主题内容的盒子内侧还是外侧显示

 *  inside 符号在文本块内显示
 *  outside （默认值）

* list-style-image


指定一个图片

```css
li {
list-style-image : url("images/bulletpoint.jpg");
}
```

* list-style


略缩形式 （类型 位置 图片）

* marker-offset

##### ：focus和：active伪类

：focus伪类是在一个元素获得焦点时，用额外的样式与其关联使之更醒目

：active伪类是在元素被激活时，比如用户单击链接时对其关联更多样式

```css
input {
border : none;
background-color : #dddddd;
}

input :focus {
background-color : #c4c4c4;
}
在这个表单里当填写信息时的那个表单颜色会更深
```

##### ：before和：after伪元素

可以在选择器中定义的元素的每个实例之前或之后添加文本

```css
p:after {
content : "这是一个文本";  
color : #fc00f000;
}
其中的content是个属性，添加文档内容
```

#### css定位与布局

**正常流**

块级元素从顶部至底部流动，独占一个新行；行级元素从左至右流动

**position属性**

 * static  默认值  和正常流相同


 * relative 盒子的位置可以相对其在正常流中的位置偏移（相对定位）

应该仅指定左侧或者右侧，以及顶部或底部偏移的二者之一，同时指定的话有一个会被忽略

 * absolute 盒子完全使用以包含左上角为原点的x及y的坐标进行定位（绝对定位）

在默认情况下，绝对定位的元素总出现在相对定位的元素之上

 * fixed  位置以浏览器窗口左上角为原点计算得出，并且不随用户滚动窗口而改变位置
 
**z-index属性**

 当元素之间的定位发生重叠时，z-index属性的值越大（数字）的元素越接近显示位置的顶部
 
**使用float属性实现流动**

可以把盒子浮动至包含盒子的左侧或右侧。 

任何时候设置float属性时，必须设置width值，否则块级元素占了整个页面一行的宽度而没有流动空间

 *  left
 *  right
 *  none
 *  inherit

**clera属性**

浮动元素旁边没有内容，周围的内容被推至浮动元素之下

*  left
*  right
*  none  允许两侧出现浮动内容
*  both