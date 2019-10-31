var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/index.js'
    },
    output: {
        'filename': 'bulid.js',
        'path': path.resolve(__dirname, 'bulid')
    }
}