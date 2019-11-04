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
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",     // babel与webpack沟通
                options: {
                    // babel转义
                    presets: [["@babel/preset-env", {
                        useBuiltIns: 'usage'    // 仅打包入使用的es6语法，否则会打入整个polyfill
                    }]] 
                }
            }
        ]
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

