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
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        limit: 10240
                    }
                }
            }
        ]
    },
    output: {
        'filename': 'bulid.js',
        'path': path.resolve(__dirname, 'bulid')
    }
}

