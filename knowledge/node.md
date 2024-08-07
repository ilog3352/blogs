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