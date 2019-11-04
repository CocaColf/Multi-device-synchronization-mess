var path = require('path');

// plugin是webpack运行到某个时期时进行一些操作来辅助打包
var  htmlWebapckPlugin = require('html-webpack-plugin');

// clean-webpack-plugin在3.0后导出方式发生更改，现在是这样使用。且不需要传入文件夹，默认清理output配置里的文件夹
var {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // source map
    devtool: 'cheap-module-eval-soure-map',     // development: cheap-module-eval-soure-map  production: cheap-modul-soure-map
    entry: {
        'main': './src/index.js'
    },

    module: {
        /* 这里babel的转义使用的是@babel/plugin-transform-runtime插件
            它和使用preset polyfill不一样的是前者使用的是全局修改的方式
            而它是闭包使用
            所以在编写类库时这种方式更好
            此外，babel配置比较多，所以一般都抽离到.babelrc文件中
        */
    },

    plugins: [
        new htmlWebapckPlugin({
            template: './src/index.html'    // 以哪个html为模板生成
        }),

        new CleanWebpackPlugin()
    ],

    output: {
        'filename': 'bulid.js',
        'path': path.resolve(__dirname, 'bulid')
    }
}

