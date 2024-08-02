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
