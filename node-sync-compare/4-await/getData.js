const fs = require('fs');

exports.getData = async function (filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if(err) {
                reject(err);
            } else {
                if (stats.isFile()) {
                    fs.readFile(filePath, (err, data) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            }
        })
    })
}