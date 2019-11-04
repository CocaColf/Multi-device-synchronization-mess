var path = require('path');

// plugin是webpack运行到某个时期时进行一些操作来辅助打包
var  htmlWebapckPlugin = require('html-webpack-plugin');

// clean-webpack-plugin在3.0后导出方式发生更改，现在是这样使用。且不需要传入文件夹，默认清理output配置里的文件夹
var {CleanWebpackPlugin} = require('clean-webpack-plugin');

var webpack = require('webpack');

module.exports = {
    mode: 'development',
    // source map
    devtool: 'cheap-module-eval-soure-map',     // development: cheap-module-eval-soure-map  production: cheap-modul-soure-map
    devServer: {
        contentBase: './build',     // 开启服务的文件目录
        open: true,      // 自动打开浏览器
        hot: true,      // 开启 hot module replace
        hotOnly: true
    },

    entry: {
        'main': './src/index.js'
    },

    module: {
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options:  {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                // loader的使用顺序： 从下至上，从右至左
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // 模块化的css，不会影响全局
                            modules: true   
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new htmlWebapckPlugin({
            template: './src/index.html'    // 以哪个html为模板生成
        }),

        new CleanWebpackPlugin(),

        new webpack.HotModuleReplacementPlugin()
    ],

    output: {
        'filename': 'bulid.js',
        'path': path.resolve(__dirname, 'bulid')
    }
}

