## 文件流下载

#### node端代码 知识点看注释
```js

import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('./static'))

app.post('/download', function (req, res) {
    const fileName = req.body.fileName
    const filePath = path.join(process.cwd(), './static', fileName)
    const content = fs.readFileSync(filePath)
    // application/octet-stream（二进制流数据
    res.setHeader('Content-Type', 'application/octet-stream')
    // Content-Disposition 指定服务器返回的内容在浏览器中的处理方式。它可以用于控制文件下载、内联显示或其他处理方式
    // attachment：指示浏览器将响应内容作为附件下载。通常与 filename 参数一起使用，用于指定下载文件的名称
    // 默认是inline
    // inline：指示浏览器直接在浏览器窗口中打开响应内容，如果内容是可识别的文件类型（例如图片或 PDF），则在浏览器中内联显示
    res.setHeader('Content-Disposition', 'attachment;filename=' + fileName)
    res.send(content)
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})

```
#### 前端代码 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
     <button id="btn">download</button>

     <script>
         const btn = document.getElementById('btn')
         btn.onclick = () => {
            fetch('http://localhost:3000/download',{
                method:"post",
                body:JSON.stringify({
                    fileName:'1.png'
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>res.arrayBuffer()).then(res=>{
                const blob = new Blob([res],{type:'image/png'})
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = '1.png'
                a.click()
            })
         }
     </script>
</body>
</html>
```