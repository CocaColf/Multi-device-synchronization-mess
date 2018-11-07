---
layout: post
title: React组件之间的消息传递
date: 2018/05/01
categories: JavaScript
---
&#160;&#160;&#160;&#160;React是单向数据流，数据主要从父组价传递到子组件。如果顶层（父级）的某个props改变了，React会重渲染所有的子节点。但组件之间往往需要消息传递，以同步一些状态。

#### 父组件向子组件传递消息
&#160;&#160;&#160;&#160;父组件王子组件传递消息主要是用props，父组件把需要传递的消息赋给子组件的某个property，子组件再在自己的逻辑里接收并进行处理。

#### 子组件向父组件传递信息
&#160;&#160;&#160;&#160;子组件传递信息给父组件，需要父组件传递回调函数给子组件，子组件再对回调函数进行调用。
&#160;&#160;&#160;&#160;构建一个父组件，它从自己的`state`里读取一个`ParentTitle`；子组件是一个按钮，点击这个按钮，子组件的state里的`title`会传递到父组件以更改父组件的Title。
```js
// 父组件 Parent
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ParentTitle: '父组件默认Title'
        }
    }

    getPTitle(newTitle) {
        this.setState({
            ParentTitle: newTitle
        })
    }

    render() {
        return (
            <div>
                <p>{ this.state.ParentTitle }</p>
                <Child getPTitle={ this.getPTitle.bind(this) } />
            </div>
        );
    }
}

// 子组件
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '子组件的消息'
        }
        this.sendTitle = this.sendTitle.bind(this);
    }

    sendTitle() {
        this.props.getPTitle(this.state.title);
    }

    render() {
        return (
            <button onClick={ this.sendTitle }>传递消息给父组件</button>
        )
    }
}
```
&#160;&#160;&#160;&#160;代码如上所示，父组件要更新Title是通过`getPTitle`函数来实现的，它接收一个新的Title。我们把这个函数赋给子组件，当成一个属性`getPTitle`（这里只是仅仅取了个相同的名字）传递过去。在子组件内部，当点击按钮时，子组件会触发`sendTitle`函数，这个函数又会触发属性里的`getPTitle`函数并传值。如此一来，就实现了子组件对父组件的消息传递。

#### 子组件和子组件之间的消息传递
&#160;&#160;&#160;&#160;子组件之间是无法传递属性或者回调函数的，所以子组件之间的消息传递需要依靠父组件当作一个中间桥梁，了解了上面两种消息传递后，这个就不难写出来了。
