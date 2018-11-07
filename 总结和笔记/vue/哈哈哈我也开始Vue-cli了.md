---
layout: post
title: 来看看Vue-cli和Vue-route
date: 2018/06/30
categories: 生活
---
&#160;&#160;&#160;&#160;把Vue基础部分过了一遍，写了几个小demo，于是开始用`Vue-cli`创建项目了，也该潮一下了，不要老是script引入了哈哈哈。
&#160;&#160;&#160;&#160;首先 **下载** `vue-cli`，使用npm下载，`npm install -g vue-cli`。下载好后用`vue -V`查看版本，看是否安装好，别说为啥它是大V，vue就是比较骚。
&#160;&#160;&#160;&#160;要 **创建一个Vue项目** ，使用`vue init <template> <project-name>`初始化项目，`template`有很多可选，我采用的是`webpack`。

```
webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。

webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。

browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。

browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。

simple-一个最简单的单页应用模板。
```

然后就会有很多确认项，包括工程名，git，Vue-route等，根据需要进行选择。配置好后便开始初始化一个项目。

&#160;&#160;&#160;&#160;完事后，`cd project-name`进入项目，`npm install`安装依赖，`npm run dev`在服务端运行项目。先来看看这个工程里各个文件/文件夹是些什么。

```js
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|---node_modules                     // npm模块   
|-- src                              // 源码目录
    |-- assets                       // 静态资源
|   |-- components                     // vue公共组件
|   |-- store                          // vuex的状态管理
    |-- router                          // 路由配置
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
```

&#160;&#160;&#160;&#160;引入依赖，以`Bootstrap`为例
首先`npm install --save Bootstrap`，之后便可以在`package.json`依赖（dependencies）里看到它。然后在`src/main.js`里全局引入Bootstrap，`import 'bootstrap/dist/css/bootstrap.min.css'`。然后就可以在组件中随意使用了。

**使用Ajax库 axios**
当然要用Ajax啊，不然怎么去调用api获取数据，axios是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。`npm install --save axios vue-axios`。在`src/main.js`里引入这两个库，`import axios from 'axios' import VueAxios from 'vue-axios'``Vue.use(VueAxios, axios)`。在组件的`mounted`方法通过axios获取数据，把获取的数据传给组件的一个data。

**自定义css样式**
在合适的目录下编写自己的css，然后在需要应用该样式的组件的`script`里使用`import`导入自己的css。

**编写自己的组件**
在`src/components`下编写自己的组件，`组件名.vue`。一个组件由`template`，`script`，`style`三部分组成。
```js
<template>
    <h1>{{ about }}</h1>
</template>

<script>
export default {
    // 暴露出去的组件名
    name: 'About',
    data() {
        return {
            about: '关于我'
        }
    }
}
</script>

<style scoped>

</style>
```

**路由**
路由的配置是在`src/router/index.js`下进行的。先要导入需要路由导向的路由，`import About from '@/components/About'`。一个路由的格式为：
```js
{
    // 路径·
    path: '/about',
    name: 'About',
    // 对应组件
    component: About
}
```
然后在`App.vue`里使用`<router-link to='/about'>关于</router-link>`配置路由，这部分会被渲染成一个a标签，点击后就会渲染路由对应组件的模板。

+ 动态路由
会根据参数的变化，加载不同的组件，注意这里需要有`beforeRouteUpdate`，否则路由只会挂载一次，不会发生改变。
```js
mounted() {
    this.player = this.getPlayer(this.$route.params.uid);
    // 下面这是子路由
    this.profile = '/Player/' + this.$route.params.uid + '/profile';
    this.status = '/Player/' + this.$route.params.uid + '/status';

},
beforeRouteUpdate(to, from, next) {
    this.player = this.getPlayer(to.params.uid);
    this.profile = '/Player/' + to.params.uid + '/profile';
    this.status = '/Player/' + to.params.uid + '/status';
    next();
},
methods: {
    getPlayer(uid) {
        // 这个地方应该是要去服务端获取数据,然后把数据赋给 data 
        switch(uid) {
            case '1':
                return {uid: 1, name: '库里', point: 26};
            case '2':
                return {uid: 2, name: '哈登', point: 32};
            default:
                return {uid: -1};
        }
    }
}
```