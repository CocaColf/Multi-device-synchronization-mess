---
layout: post
title: js中的异步非阻塞IO的处理
date: 2018/08/15
categories: Node.js
---
&#160;&#160;&#160;&#160;很多人都说，Node让前端工程师开始“抢后端的饭碗”，我先不论“抢”这个字眼，单论会js和会Node，我并不认为二者有任何可等价性，一个会js的人不见得就能很快的上手Node，而我认为，要上手Node，很关键一点在于要把思维从同步的世界转到异步，很多人包括早期的我，总感觉能用Node写一点东西，但总是感觉膈应，很重要的一点在于不理解异步代码。关于Node的`EventLoop`之后会专门写一篇理解，暂且不论，先来看看Node的异步解决方案。关于Node的异步，也是有一段历史的变迁的，而我正好从这个变迁一步步用过来的，今天突然想捋捋。
&#160;&#160;&#160;&#160;通过一个小例子来阐述这个过程：在当前目录下，有一个`test.txt`文件，我们用Node来读取这个文件里的内容。很简单的写出这段代码：

```js
fs.readFile('./test.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});
```

但现在我要封装一个`getData`函数，然后可以在其他文件里调用这个函数来获取任何文件的内容。然而Node是异步的，你在拿到数据的时候直接`return`是拿不到值的，因为函数在异步执行之前已经返回了`undefind`

### callback
&#160;&#160;&#160;&#160;第一个解决方案就是利用回调函数，在你要进行处理的位置才执行回调函数，在执行回调函数之前，其他的代码你随便执行，所以就不会发生阻塞。所以在初学Node时，基本上所有的api全是各种回调函数。

```js
exports.getData = function(filePath, callback) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.log(err);
        } else {
            if (stats.isFile()) {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(data.toString());
                    }
                })
            }
        }
    });
}
```

&#160;&#160;&#160;&#160;然而显而易见，我们才进行两个异步操作，就嵌套了好几层，可以预见代码在多一点，嵌套会更深，于是就有了**“callback hell”**这种声音，至今依然是很多Node黑子抓的一点，然而那是他们还停留在过去。

### 发布订阅模式 EventEmitter
&#160;&#160;&#160;&#160;Node提供了一个events模块，里面有一个EventEmitter对象，可以进行事件的发布和订阅，Node里也有很多模块是基于evnets这个实现的。比如在我刚学Node的时候，我就对`XX.on('data', () => ...)`这样的一些事件处理迷糊，这个on哪里来的，这个data事件又是什么东西。直到我了解到这个模块。
&#160;&#160;&#160;&#160;EventEmitter有一个`emit`函数用来发布事件，`on`函数用来订阅对应的事件，当收到事件发布了的消息时，就进行相应的处理。

```js
const evnet = require('events');

let EventEmitter = new evnet.EventEmitter();

exports.getData = function(filePath) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.log(err);
        } else {
            if (stats.isFile()) {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // 发布事件
                        EventEmitter.emit('iGetData', data);
                    }
                })
            }
        }
    });
}

// 另一个文件里引入getData
event.getData('./test.txt');
// 进行事件处理
EventEmitter.on('iGetData', (data) => {
    // do something
});
```

### Promise
&#160;&#160;&#160;&#160;终于在ES6里，Promise出现了，异步的处理更加的优雅了。关于Promise推荐[这个](http://liubin.org/promises-book/)。Promise使用`then`避免了回调函数的嵌套，使得异步处理看起来更优雅。

```js
exports.getData = function(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.log(err);
            } else {
                if (stats.isFile()) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            }
        });
    })
}

// 使用
promise.getData('./test.txt').then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});

```

### async
&#160;&#160;&#160;&#160;然而当异步比较多的时候，使用Promise不可避免出现很长一串的`.then()`，代码看起来就和面条一样，然后它们之间又可以进行链式调用`.then().then()`，所以Promise优雅有限，于是在ES7里出现了`async`，它只是Promise的语法糖，`async`修饰的方法，本质上返回的还是一个`Promise对象`。使用`await`表示等待异步方法执行完成，实际上就相当于转异步为同步，于是代码看起来就和习惯性的同步一样了，但是要注意`await`只能在异步方法里调用，因为在外部使用的话，会阻塞代码的运行。

```js
exports.getData = async function(filePath) {
    var resultEvent = new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.log(err);
            } else {
                if (stats.isFile()) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            }
        })});

    return resultEvent.then((data) => {
        return data
    }).catch((err) => {
        return err;
    })
}

// 使用
async function logData() {
    var Data = await Aysnc.getData('./test.txt');
    console.log(Data);
}
logData();
```



