### PWA技术 Progressive Web App
可以实现
1. 渐进式Web应用
2. 离线缓存技术
3. 消息推送

1. 渐进式Web应用 配置项
```json
manifest.json
{
    "name":"app", //  应用名称
    "short_name":"app", //  应用短名称
    "display":"standalone", //  显示方式 全屏
}
通过link标签引入 
<link rel="manifest" href="/manifest.json">
```
2. 离线缓存
### 注意
1. 独立于主线程执行 例如 script defer
2. server worker 不能操作dom 没有 window
3. 通过postMessage 交互
4. 必须上线https 
```js
sw.js
self.addEventListener('install', (event) => {
    // 安装 做缓存

})
通过navigator引入server worker文件
navigator.serviceWorker.register('/sw.js'); 返回的是一个promise
生命周期:
 - 注册
 - 安装
 - 激活
```