---
layout: post
title: Python学习（一）
date: 2018/03/30
categories: Python
---
&#160;&#160;&#160;&#160;昨天下午，得知正在华南理工大学复试的室友成功被录取，大半年的辛苦考研最后终于收获了成功。在电话里向他表示了祝贺，也得知他研究生的方向选择的是“深度学习”，而不是本专业的方向。导师要他学一下python，恰好我在最近也有意向看看python，这位传说中每个人都该懂一点的语言。
&#160;&#160;&#160;&#160;中午打完篮球赛，洗完澡便坐在电脑前看了一下午python。学过一些高级语言，换门语言上手果然只是一会儿会儿的事情，除了python的缩进让我有点想笑以外，不得不说它还真挺简洁的。在此做一点记录。

+ 输出
```py
print('hello world')
print('1+1=', 1+1)
```

+ 输入 input返回的数据类型是字符串
```py
name = input()
print('hello ',name)
```

+ 空值 为 none

+ 地板除
```py
print(10 // 3) 
# 结果为3
```

+ 获取字符的整数表示
```py
ord('A') 
# 65
```

+ 获取整数对应的字符
```py
chr(65)
 # A
```

+ len获取数目
```py
len('哈哈') 
# 2

len('AbcD') 
# 4
```

+ 格式化输出
```py
print('hello %s, 年龄是 %d' % ('某某', 21))
print( 'growth rate: %d %%' % 7) 
# 对百分号转义
```

+ **list** 是一种有序的集合，可以随时添加和删除其中的元素

    + 创建一个list
    ```py
    clist = list(range(10))

    classList = [1, 'A', 'all']
    ```
    + 访问
    ```py
    print(classList[1])
    print(classList[-1]) 
    # 访问最后一个
    ```

    + 追加
    ```py
    classList.append('appendItem') #追加元素到末尾
    classList.insert(1, 'appendToOne')  # 添加到指定位置
    ```

    + 删除
    ```py
    classList.pop() # 删除末尾元素  会返回被删除元素
    classList.pop(1)    # 删除指定位置元素
    ```

+ **元组**：tuple tuple一旦初始化就不能修改

```py
classTuple = (1,2)
classTuple[1]
#当元组里只有一个值时，加逗号消除和数字的歧义
classTuple = (2,)
```

+ 条件判断
```py
a = input('请输入一个数:')
a = int(a)  # 因为input返回的是字符串，所以要先转化为整数

if a > 2:
    print('a大于2')
else:
    print('a小于2')
```

+ 循环

    + for...in循环
    ```py
    list = range(20)
    sum = 0
    for i in list:
        sum += i
    print(sum)

    for chr in 'ABC':
        print(chr)
    ```

    + while
    ```py
    i = 20
    sum = 0
    while i >= 0:
        sum += i
        i -= 1
    print(sum)
    ```

    + break 跳出循环 contiune 跳出当前循环

+ **字典**  dick  `是键值对形式 一个键只能对应一个value，所以后面的同名key的value会替代前面的`  `查找快但内存占用大`
    + 创建
    ```py
    dick = {'控卫':'拉塞尔', '分卫': '科比'}
    print(dick['控卫']) # 拉塞尔
    ```

    + 判断key 是否存在
    ```py
    print('分卫' in dick)
    dick.get('前锋', '詹姆斯')  #判断是否存在并赋值
    ```

    + 删除一个 key-value
    ```py
    dick.pop('前锋')
    ```

    + 迭代字典

        + 迭代键
        ```py
        for key in dick:
            print(key)
        ```

        + 迭代值    `.values()或者 .item()`
        ```py
        for value in dick.values():
            print(value)
        ```

        + 同时迭代键值
        ```py
        for k, v in dick.items():
            # 拼接字符串
            print(k + '=' + v)
        ```


+ **set** `存储key，不存储value,而且会自动过滤重复的key` `就是一个集合` `创建set需要提供一个list`

    + 创建
    ```py
    cset = set([1,2,3,3,4,5,5])
    print(cset) 
    # {1,2,3,4,5} 
    ```

    + 添加 删除元素
    ```py
    cset.add(7)
    cset.remove(2)
    ```

    + 取两个set的交集
    ```py
    dset = set([1,2,3])
    cset & dset 
    # {1,2,3}
    ```

     + 取两个set的并集
     ```py
    cset | dset     
    # {1,2,3,4,5}
    ```

+ 函数
    
```py
def add(x, y):
    return x + y
```

如果暂时没有想好函数某个地方怎么写，就先 pass
```py
def add2(x, y):
        if not isinstance(x, (int, float)):
            # raise TypeError('传入的参数不对')
            pass
        return x + y
```

函数返回多个值
```py
def returnMuch(m, n, degree):
    if m < 0 or n < 0 or degree < 0:
        raise TypeError('输入的值要大于0!')
    else:
        m = m * degree
        n = n * degree
    return m , n

x,y = returnMuch(1,2,10)    # x = 10 y = 20 多值返回时返回的实际是个tumple
```

可以传入默认参数
```py
def variable(x, y = 2):
    pass
```

可变参数: 传入参数的数目不讲究
```py
def couldChange(*var):
    sum = 0
    for i in var:
        sum += i
    return sum

couldChange([1,3,5,7])
```

关键字参数  `它可以扩展函数的功能,提供必要的选择外，其余的都是可选的`
```py
def keyVar(a, b, **varList):
    # **varList是一个关键字，实际上就是一个字典
    print('first:',a,'second',b,'other',varList)

keyVar(1,2,food='meat',drink='cocacola')    # first: 1 second 2 other {'food': 'meat', 'drink': 'cocacola'}
```

命名关键字参数  传入一个关键字参数，指定关键字参数的键名必须是什么

```py
def keyVar2(a, b, *, food, drink):
    pass
```

若已经有了一个可变参数，那么就可以省略 *
```py
def keyVar3(a, b, *args, food, drink):
    pass
```

此外，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。


+ **切片**

```py
clist = list(range(10))
clist[0:3]  # 截取前三个
clist[-1: -2]
clist[0:9:2]    # 截取前九个数，每隔两个取一个
clist[::5]  # 对于所有数每五个取一个
clist[:]    # 复制一个list
```

对于tuple也可以切片，结果依然为tuple
`(1,3,5,6)[0:2]`

对于字符串都可以用切片
`amkelhsakh'[3:8]`


+ **列表生成器**

```py
[x * x for x in range(10)]  #[1,4,9...]
[x * x for x in range(10) if x % 2 == 0]    # [4,16,...]

aDick = {'1':'A', '2':'B','3':'c'}
[k + '=' + v for k,v in aDick.items()]  # ['1=A', '2=B', '3=c']
```

+ **生成器 generator**

把列表生成器的中括号改为括号就成为了一个generator
`g = (x * x for x in range(10))`

它保存的实际上是一种算法,而不必像list一样一下子保存那么多数目的数据，从而节省内存

```py
for i in g:
    print(i)
```

比如，我要构造一个数列，1,2,3,8,27,...
首先使用普通函数：

```py
def defineFunc(max):
    n,a,b = 0, 1, 1
    while n < max:
        print(b)
        a,b = b, a * (b + 1)
        n += 1
defineFunc(6)
```

改为生成器:

```py
# 构造一个生成器
def defineFunc2(max):
    n,a,b = 0, 1, 1
    while n < max:
        yield b
        a,b = b, a * (b + 1)
        n += 1

# 取出结果
for i in defineFunc2(6):
    print(i)
```

generator和函数的执行流程是不一样的，函数是顺序执行，遇到return语句或者最后一行函数语句就返回，而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行













