const fs = require('fs');

exports.getData = function (filePath, callback) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            throw err;
        }

        if (stats.isFile()) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    throw err;
                }
                callback(data);
            });
        }
    });
}