const fs = require('fs');
const event = require('events');

let EventEmitter = new event.EventEmitter();

exports.getData = function (filePath) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            throw err;
        } else {
            if (stats.isFile()) {
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        // 发布事件
                        EventEmitter.emit('iGotIt', data);
                    }
                });
            }
        }
    })
}

// 订阅事件
EventEmitter.on('iGotIt', (data) => {
    console.log(data.toString());
});