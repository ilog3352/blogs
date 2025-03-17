
HTTP缓存分为两种：**强缓存和协商缓存**，这两种缓存都通过 HTTP 响应头来控制，目的是提高网站性能。

## 强缓存

强缓存之后则不需要向服务器发送请求，而是从浏览器缓存读取分为（*内存缓存*）| （*硬盘缓存*）

**内存缓存和硬盘缓存是浏览器决定的**

1. memory cache(内存缓存) 内存缓存存储在浏览器内存当中，速度块，关闭浏览器后，内存缓存消失

2. disk cache(硬盘缓存) 硬盘缓存是存储在计算机硬盘中，空间大，但是读取效率比内存缓存慢

### Expires
Expires: 该字段指定响应的到期时间，即资源不再被视为有效的日期和时间。它是一个 HTTP 1.0 的头部字段，但仍然被一些客户端和服务器使用。
Expires 的判断机制是：当客户端请求资源时，会获取本地时间戳，然后拿本地时间戳与 Expires 设置的时间做对比，如果对比成功，走强缓存，对比失败，则对服务器发起请求。

```js
import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.setHeader('Expires', new Date('2024-3-30 23:17:00').toUTCString()) //设置过期时间
    res.json({
        name: 'cache',
        version: '1.0.0'
    })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
```
### Cache-Control（推荐）

Cache-Control 的值如下：

- max-age：浏览器资源缓存的时长(秒)。
- no-cache：不走强缓存，走协商缓存。
- no-store：禁止任何缓存策略。
- public：资源即可以被浏览器缓存也可以被代理服务器缓存(CDN)。
- private：资源只能被客户端缓存。


#### 如果 max-age 和 Expires 同时出现 max-age 优先级高

```js
import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=20') //20秒
    res.json({
        name: 'cache',
        version: '1.0.0'
    })
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})

```

## 协商缓存

**强缓存**优先于协商缓存，协商缓存状态码为304，强缓存为200

### Last-Modified

Last-Modified 和 If-Modified-Since：服务器通过 Last-Modified 响应头告知客户端资源的最后修改时间。客户端在后续请求中通过 If-Modified-Since 请求头携带该时间，服务器判断资源是否有更新。如果没有更新，返回 304 状态码。

```js
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
const getModifyTime = () => {
    return fs.statSync('./index.js').mtime.toISOString() //获取文件最后修改时间
}
const app = express()
app.use(cors())
app.get('/api', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, max-age=2592000')//表示走协商缓存
    const ifModifiedSince = req.headers['if-modified-since'] //获取浏览器上次修改时间
    res.setHeader('Last-Modified', getModifyTime())
    if (ifModifiedSince && ifModifiedSince === getModifyTime()) {
        console.log('304')
        res.statusCode = 304
        res.end()
        return
    } else {
        console.log('200')
        res.end('value')
    }
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})

```
### ETag
ETag 和 If-None-Match：服务器通过 ETag 响应头给资源生成一个唯一标识符。客户端在后续请求中通过 If-None-Match 请求头携带该标识符，服务器根据标识符判断资源是否有更新。如果没有更新，返回 304 状态码。

```js
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import crypto from 'node:crypto'
const getFileHash = () => {
    return crypto.createHash('sha256').update(fs.readFileSync('index.js')).digest('hex')
}
const app = express()
app.use(cors())
app.get('/api', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, max-age=2592000')//表示走协商缓存
    const etag = getFileHash()
    const ifNoneMatch = req.headers['if-none-match']
    if(ifNoneMatch === etag) {
        res.sendStatus(304)
        return
    }
    res.setHeader('ETag', etag)
    res.send('Etag')
    
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})

```