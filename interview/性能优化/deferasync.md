# script 上的defer和async区别

script标签引用的js文件会阻塞代码正常渲染。

async加载不会阻塞会并行加载，执行会阻塞。

defer加载不会阻塞等html代码加载完成后才会执行，还是并行加载


![alt text](../../public/asyncdefer.png)
