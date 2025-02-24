全局变量 node:global browser: window
ECMAscript2020: globalThis
cross-env 库

## 内置api
1. __dirname 当前路径 不包括当前文件
2. __filename   当前路径 包括当前文件
3. buffer
4. process

jsdom 可以使用dom api

## path
1. path.basename() 返回给定路径的最后一部分   
2. path.dirname() 返回给定路径的目录部分
3. path.extname() 返回文件扩展名   带.
4. path.join() 拼接路径
5. path.resolve() 拼接路径 
6. path.parse() 解析路径 将路径转为对象
7. path.format() 格式化路径  将对象转为路径
8. path.sep  路径分隔符     解决分隔符问题
## os
1. os.platform() 获取操作系统平台   win32 window
2. os.release() 获取操作系统版本 win11 打印11
3. os.type() 
4. os.version() window 11 pro 
## process
1. process.argv 获取命令行参数
2. process.cwd() 获取当前工作目录
3. process.exit() 退出
4. process.env 获取操作系统环境变量 可以修改 在进程里生效 退出恢复
5. process.memoryUsage() 获取内存使用情况
## child_process
1. child_process.exec() 异步方法，回调函数 返回buffer 执行shell命令 可以打开软件
2. child_process.execSync() 同步方法 直接返回buffer 执行小命令 
3. child_process.spawn() 返回的流 执行shell命令 第二个参数是数组 跟参数 -v 有回调函数
4. child_process.execFile() 执行可执行文件
5. fork() 创建子进程
## fs
1. fs.readFile() 读取文件 异步 同步 promise 
2. fs.createReadStream() 读取文件流   处理大文件 一段一段返回
3. fs.mkdir('./aaa/a',{recursive:true}) 创建文件夹  创建多层文件夹
4. fs.rmSync('./aaa/a',{recursive:true}) 删除文件
5. fs.renameSync('./aaa/a','./aaa/b') 重命名
6. fs.watch('./aaa.txt',(event,filename)=>{}) 监听文件
7. fs.writeFileSync('./aaa.txt','hello',{flag:'a'}) 写入文件 追加api: appendFileSync
8. fs.createWriteStream()  写入文件流
9. fs.linkSync 硬链接 
10 fs.symlinkSync 软链接 快捷方式 

## ffmpeg
1. 基本格式转换 gif mp4 avi 等 `ffmpeg -i test.mp4 test.gif`
2. 提取视频中的音频  `ffmpeg -i test.mp4 test.mp3`
3. 裁剪视频     `ffmpeg -ss 5 -to 10 -i mov_bbb.mp4 test1.mp4`
4. 加水印          `ffmpeg -i mov_bbb.mp4 -vf drawtext=fontsize=30:text="Hello":x=10:y=10:fontcolor=red test2.mp4`
5. 删除水印         `ffmpeg -i test2.mp4 -vf delogo=w=150:h=30:x=10:y=10  test3.mp4`
## 发布订阅模式 eventEmitter 
```js
// on off once emit
const eventEmitter = require('events')
const bus = new eventEmitter()
bus.on('event',(data)=>{console.log(data)})
bus.once('event',(data)=>{console.log(data)})    // 触发一次
const fn = () =>{}
bus.on('event',fn)
bus.off('event',fn) //off 这样使用
bus.emit('event','实参')   // 触发事件
// 默认只能监听十个  bus.setMaxListeners(20)  getMaxListeners()
Object.setPrototypeOf,获取原型上的属性
```
## util
1. util.promisify() 将回调函数转换为promise
2. util.callbackify()   将promise转换为回调函数
3. util.format() 格式化
## pngquant

  - 只能处理.png格式   压缩图片
  - -quality 60 压缩质量 0-100 数字越大图片越大
  - --speed=1  1-10 数字越大速度越高质量越低
  - pngquant 44kb.png -quality 60 --output test.png
## crypto
#### 对称加密

```js
// 双方协商定义一个密钥以及iv
// 第一个参数 algorithm 接受一个算法 aes-256-cbc
// 第二个参数 key 密钥 32 位
// 第三个参数 iv 初始化向量 16 位  每次生成的密钥不一样

let key = crypto.randomBytes(32)
let iv = Buffer.from(crypto.randomBytes(16))
const cipher = crypto.createCipheriv('aes-256-cbc',key,iv)
cipher.update('hello','utf-8','base64')
const result = cipher.final('hex') // 16进制
// 解密
const decipher = crypto.createDecipheriv('aes-256-cbc',key,iv)
decipher.update(result,'hex','utf-8')
const result2 = decipher.final('utf-8')
```
#### 非对称加密

```js
    // 生成公钥和私钥 公钥可以公开 私钥管理员拥有
    // 公钥加密 私钥解密
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,    // 越大越安全越慢
    })

    // 加密
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('hello'))

    // 解密
    const decrypted = crypto.privateDecrypt(privateKey, encrypted)
```
#### hash函数 
- 不可逆 不可解密
```js
// md5包裹密码存数据库
const hash = crypto.createHash('md5')   //md5 不是特安全 它具有唯一性
hash.update('hello')
const result = hash.digest('hex')   // 加密了hello 输出16进制
// 读取文件内容 转换为md5 上传服务端 后端拿到文件内容 生成md5 匹配前后端md5 验证文件完整性

```
## 编写脚手架
## markdown转html
## zlib压缩 gzip压缩文件 deflte压缩http传输
## http
1. 动静分离（缓存）
2. 邮件服务
3. 反向代理
## express 
1. 防盗链