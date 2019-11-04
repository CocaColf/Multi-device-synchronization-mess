var path = require('path');

module.exports = {
    mode: 'development',
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
    output: {
        'filename': 'bulid.js',
        'path': path.resolve(__dirname, 'bulid')
    }
}

