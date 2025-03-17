1. [NodeJs](https://nodejs.org/zh-cn): 基于chrome v8引擎的js运行时环境

2. NodeJs特点：
   - 高效处理并发请求
   - 非阻塞I/O
   - 基于libuv实现事件循环

3. 使用[npm](https://www.npmjs.com/)包管理(类似pip/Maven)，拥有百万级模块

4. 应用场景：
   - 适合：I/O密集型应用（如Web服务器、API服务）
   - 不适合：CPU密集型应用(如图像/音频处理)
   - 解决方案：C++插件或cluster模块
