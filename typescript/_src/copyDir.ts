/* 
 * 2018/12/06
 * 拷贝文件夹到另一个目录，用ts重写
 */
import * as fs from 'fs';
import markedTrans from './markedTrans';

interface Dir {
    srcPath: string;
    dstPath: string;
}

interface DirHasCallback extends Dir {
    callback : (args: Dir) => void
}
export default function copyDir(path: Dir): void {
    let copyDir: (path: Dir) => void = function(path: Dir): void {
        fs.readdir(path.srcPath, (err, files) => {
            if (err) {
                throw err;
            } else {
                let len = files.length;
                for (let i = 0; i < len; i++) {
                    let _src = `${path.srcPath}/${files[i]}`,
                        _dst;

                    fs.stat(_src, (err, stats) => {
                        // 如果是文件，直接复制
                        if (stats.isFile()) {
                            let extNameArr = files[i].split('.');
                            extNameArr[1] = 'html';
                            _dst = `${path.dstPath}/${extNameArr.join('.')}`;

                            markedTrans(_src, _dst);
                        } else if (stats.isDirectory()) {
                            _dst = `${path.dstPath}/${files[i]}`;

                            existAndCopy({srcPath: _src,dstPath: _dst,callback: copyDir});
                        }
                    })
                }
            }
        })
    }

    let existAndCopy: (args: DirHasCallback) => void = function(args: DirHasCallback): void {
        fs.stat(args.dstPath, (err, stats) => {
            if (err) {
                fs.mkdir(args.dstPath, (err) => {
                    if (err) {
                        throw err;
                    }
                })
            }

            args.callback({srcPath: args.srcPath, dstPath: args.dstPath});
        })
    }
}