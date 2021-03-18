const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mimeModel = require('./model/getmime.js');

http.createServer((req, res) => {
    // 请求路径
    var pathName = url.parse(req.url).pathname;

    if (pathName !== '/favicon.ico') {
        if (pathName === '/') {
            pathName = 'index.html';
        }

        // 请求文件的扩展名
        var extname = path.extname(pathName);
        
        fs.readFile(`static/${pathName}`, (error, data) => {
            if (error) {
                // 如果没有这个文件，返回404
                fs.readFile('./static/404.html', 'utf8', (error, data404) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.writeHead(404, {"Content-Type":"text/html;charset=UTF8"});
                        res.write(data404);
                        res.end();
                    }
                });
            } else {
                // 根据后缀名获取mime类型
                mimeModel.getMime(extname, function(mime) {
                    res.writeHead(200, {"Content-Type":`${mime};charset='utf-8'`});
                    res.write(data);
                    res.end();
                });
                
            }
        });
    }
}).listen(4300, () => {
    console.log(`服务以启动于:localhost:4300`);
});