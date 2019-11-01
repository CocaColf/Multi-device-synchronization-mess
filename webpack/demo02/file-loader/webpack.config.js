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
            }
        ]
    },
    output: {
        'filename': 'bulid.js',
        'path': path.resolve(__dirname, 'bulid')
    }
}

