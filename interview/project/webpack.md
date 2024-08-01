### webpack 构建项目
1. webpack5 必须要跟webpack-cli 一起装
2. cli 就是命令行工具 在命令行中写命令 使用npx调用 或者在script中写入
3. webpack-dev-server 启服务的包
4. webpack webpack-cli 打包

webpack5 自带treeShaking : 没用到的变量 || 走不进去的if（false） 不会被打包<br />webpack只能支持 js代码跟 json    不支持ts 如果要处理文件 loader 如果要增加功能 plugin<br />ts-loader 2653ms 很慢 swc技术 优化打包时间 322 ms
### url-loader 跟 file-loader区别
url-loader 默认生成base64 打到代码里 有配置项 可以自定义设置图片达到多少kb生成base64 或者 生成文件<br />file-loader 默认生成一个文件    没有配置项<br />webpack 支持ts写法:
```js
 {
                test: /\.ts$/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                tsx: true
                            }
                        }
                    }
                },
```
## css样式支持     直接在header写样式
style-loader css-loader [less-loader]<br />提取成css文件使用link引入 需要插件mini-css-extract-plugin
## 优化
optimization 分包 cache   缓存 一般选择 文件缓存  提升打包速度 externals cdn 需要在html引入cdn地址<br />访问一个网址的时候 第一步浏览器的DNS缓存 第二步查找etc目录下面的DNS缓存 第三步查找本地HOST文件对应的ip 第四步发送DNS请求 1.根域名查找 . 2.顶级域名查找 com. cn. 3.权威域名查找 baidu.com. 如果配置了CDN不会经过这个了CDN服务器去找DNS服务器就近分配
