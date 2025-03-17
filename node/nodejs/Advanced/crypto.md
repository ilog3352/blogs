## crypto
### 对称加密

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
### 非对称加密

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
### hash函数 
- 不可逆 不可解密
```js
// md5包裹密码存数据库
const hash = crypto.createHash('md5')   //md5 不是特安全 它具有唯一性
hash.update('hello')
const result = hash.digest('hex')   // 加密了hello 输出16进制
// 读取文件内容 转换为md5 上传服务端 后端拿到文件内容 生成md5 匹配前后端md5 验证文件完整性

```