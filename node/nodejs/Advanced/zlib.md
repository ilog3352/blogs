## gzip
```js
// gzip压缩
// 引入所需的模块
const zlib = require('zlib'); // zlib 模块提供数据压缩和解压缩功能
const fs = require('node:fs'); // 引入 Node.js 的 fs 模块用于文件操作

// 创建可读流和可写流
const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream('index.txt.gz'); // 创建可写流，将压缩后的数据写入 index.txt.gz 文件

// 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
readStream.pipe(zlib.createGzip()).pipe(writeStream)

//gzip 解压
const readStream = fs.createReadStream('index.txt.gz')
const writeStream = fs.createWriteStream('index2.txt')
readStream.pipe(zlib.createGunzip()).pipe(writeStream)

```
## deflate
```js
// deflate压缩
const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
const writeStream = fs.createWriteStream('index.txt.deflate'); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
readStream.pipe(zlib.createDeflate()).pipe(writeStream);

// deflate 解压
const readStream = fs.createReadStream('index.txt.deflate')
const writeStream = fs.createWriteStream('index3.txt')
readStream.pipe(zlib.createInflate()).pipe(writeStream)

```
## http请求压缩
```js
const zlib = require('zlib'); 
const http = require('node:http'); 
const server = http.createServer((req,res)=>{
    const txt = '小满zs'.repeat(1000);

    //res.setHeader('Content-Encoding','gzip')
    res.setHeader('Content-Encoding','deflate')
    res.setHeader('Content-type','text/plan;charset=utf-8')
   
    const result = zlib.deflateSync(txt);
    res.end(result)
})

server.listen(3000)
```
## gzip 和 deflate 区别

1. **压缩算法**：Gzip 使用 Deflate 算法，结合 LZ77 和哈夫曼编码。
2. **压缩效率**：Gzip 压缩率更高，因使用哈夫曼编码。
3. **压缩速度**：Gzip 较慢，因需额外的哈夫曼编码步骤；Deflate 更快。
4. **应用场景**：Gzip 常用于文件压缩，deflate 常用于网络传输和 HTTP 内容编码，提升传输效率。
