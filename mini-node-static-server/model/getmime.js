const fs = require('fs')
// const event = require('events').EventEmitter;

// var EventEmitter = new event.EventEmitter();

exports.getMime = function(extName, callback) {
    fs.readFile('./mime.json', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            var Mime = JSON.parse(data.toString());
            var result = Mime[extName] || 'text/html';
            // console.log(result)
            callback(result);
            // EventEmitter.emit('mimeData', result);

        }
    });
}

// readData('jpg');
// EventEmitter.on('mimeData', function(res) {
//     console.log(res);
// })
