// tree shaking: 打包时只引入某个文件里被使用过的导出方法，其余的过滤掉。只支持es module

import { add } from './common';

add(1, 2);