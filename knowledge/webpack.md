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
## 从0到1 初始化webpack
初始化
```sh
npm init -y #初始化package.json
tsc --init #初始化tsconfig.json
```
新建文件：
1. index.html
2. webpack.config.js
3. src > index.ts,App.vue
webpack5 必须要跟cli一起装 cli为命令行工具
```sh
npm i webpack webpack-cli -D #打包
npm i webpack-dev-server -D #启动服务
```
## 注意事项
- `__dirname__` 项目根目录 esm没有__dirname__
- process.cwd() 项目根目录 esm cjs都有__dirname__ 
- webpack5 自带tree-shaking : 没有用到的代码不打包 走不进去的if不打包
- webpack 天然支持js json 另外ts css html等都需要loader
- 处理文件loader 增加功能plugin
- `npm i ts-loader typescript -D` ts-loader依赖typescript
- `npm i -D @swc/core swc-loader` 使用swc-loader 替换ts-loader swc很快 js ts jsx tsx
- 使用html-webpack-plugin插件 自动在html文件中引入打包后的js文件 并把html跟js打包在一起
- 使用 mini-css-extract-plugin link引入css文件 style-loader 是写在style标签里面
## url-loader file-loader 区别
- url-loader 转成base64参杂在代码里 可配置limit
- file-loader 只是压缩文件 不可配置limit

## webpack 配置

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')   // 支持vue3
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/**
 * @type {import('webpack').Configuration}
 */
const conifg = {
    mode: 'development',    // 打包模式
    entry: './src/main.ts',     // 入口文件
    output: {                   // 出口文件
        filename: '[chunkhash].js',      // 打包后的文件名
        path: path.resolve(process.cwd(), 'dist'),      // 打包后的目录__dirname__在esm下不支持
        clean: true     // 清空打包目录 
    },
    module: {       // 增加loader
        rules: [
            {
                test: /\.ts$/, // 匹配ts结尾的文件
                use: {
                    loader: 'swc-loader',  // 使用swc-loader
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',   // 支持vue里的ts
                                tsx: true
                            }
                        }
                    }
                },
                exclude: /node_modules/     // 排除node_modules
            }, {
                text: /\.(png|svg|jpg|jpeg|gif)$/i,  // 匹配png结尾的文件
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,   // 10kb下会压缩为base64
                        name: 'static/[name].[hash].[ext]',// 文件名字hash为防止缓存
                    }
                }
            }, {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],//从右往左执行
            }, {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ],
    optimization: { // 代码分包
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // 把moment拆出来
                moment: {
                    name: 'moment',
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: 10,
                    chunks: 'all'//静态模块 动态模块 共享模块全部拆分
                }
            }
        }
    },
    cache: {        // 提升打包速度 做缓存
        type: 'filesystem',  // 文件存储 或者内存存储
        //cacheDirectory自定义缓存位置
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],//引入文件 不加后缀 一个一个试从左往右
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    //cdn
    externals: {
        vue: 'Vue'      // 需要在html文件中引入cdn地址
    }
}

module.exports = conifg
```
