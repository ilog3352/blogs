## 秒传

A上传文件时携带MD5值，B上传文件时，如果MD5值相同 就粘贴A的文件 改个名字

MD5 是文件的唯一标识 散列函数的一种

**spark-md5** 生成文件的MD5值

`https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js`

## 大文件上传
大文件上传 分片上传 可以并行上传 最大并发数为6，IE浏览器为5

*file对象继承Blob，Blob有一个方法slice，进行分片*

使用spark-md5生成MD5，前端计算非常慢，阻塞线程，使用web-worker

multer 中间件

- 文件上传中间件
- **上传file 一定要写在最下面 读到file就停了**

通过文件流合并 / appendFile合并
### web-worker
- 多线程
- 无法访问DOM和window对象
- 可以计算，IO操作




### 断点续传
在上传文件时 每个文件都有一个md5值，如果中途断网已经上传过，再次上传时会找到已经上传的切片，直接跳过即可，即做判断是否存在当前上传的切片


