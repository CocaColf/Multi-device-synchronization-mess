/* 
 * 把源目录的md文件转为html并拷贝到目的目录
 */
import * as fs from 'fs';
import {Marked} from 'marked-ts';

export default function markedTrans(_src: string, _dst: string): void {
    let filedata: string = '';

    // 创建读取流
    let readAble = fs.createReadStream(_src);
    // 创建写入流
    let writeAble = fs.createWriteStream(_dst);

    readAble.on('data', (chunk) => {
        filedata += chunk;
    });

    readAble.on('end', ():void => {
        // 把读取流的数据写入
        writeAble.write(Marked.parse(filedata));
    });
}


