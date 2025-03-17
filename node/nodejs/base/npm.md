## package.json

执行`npm init`便可以初始化一个package.json

1. `name`：项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。
2. `version`：项目版本号，通常采用语义化版本号规范。
3. `description`：项目描述。
4. `main`：项目的主入口文件路径，通常是一个 JavaScript 文件。
5. `keywords`：项目的关键字列表，方便他人搜索和发现该项目。
6. `author`：项目作者的信息，包括姓名、邮箱、网址等。
7. `license`：项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 MIT、Apache 等）。
8. `dependencies`：项目所依赖的包的列表，这些包会在项目运行时自动安装。
9. `devDependencies`：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。
10. `peerDependencies`：项目的同级依赖，即项目所需要的模块被其他模块所依赖。
11. `scripts`：定义了一些脚本命令，比如启动项目、运行测试等。
12. `repository`：项目代码仓库的信息，包括类型、网址等。
13. `bugs`：项目的 bug 报告地址。
14. `homepage`：项目的官方网站地址或者文档地址。

## npm install原理

默认采用扁平化的方式安装，使用的算法是广度优先遍历

扁平化只是理想状态 当依赖版本相同时，会采用扁平化安装，当依赖版本不同时，会采用嵌套安装

## npm install 的执行流程
![图片描述](/node/1.png)

FAQ:

1. 为什么会找这么多.npmrc文件
   -  **npm 需要找所有的配置文件，这是因为它们可能包含不同的配置项，而不仅仅是相同配置项的不同值。**
   - 高优先级的配置会覆盖低优先级的配置
   - 项目级别 > 用户级别 > 全局级别 > node内置级别

## package-lock.json作用

- `version` 该参数指定了当前包的版本号
- `resolved` 该参数指定了当前包的下载地址
- `integrity` 用于验证包的完整性
- `dev` 该参数指定了当前包是一个开发依赖包
- `bin` 该参数指定了当前包中可执行文件的路径和名称
- `engines` 该参数指定了当前包所依赖的 Node.js 版本范围
- `package-lock.json` 帮我们做了缓存，他会通过 **name + version + integrity** 信息生成一个唯一的key，这个key能找到对应的index-v5 下的缓存记录 在npm cache 文件夹

## npm run 原理

package.json 中 scripts 字段定义了脚本命令，npm run 命令会根据 scripts 字段中的命令来执行相应的脚本。

查找规则
1. 当前项目查找node_modules/.bin目录下的命令
2. 如果没找到就去全局的node_modules 去找可执行命令vite
3. 环境变量 
4. 报错

## npm 生命周期

 nodejs的sonsole.log跟浏览器console.log 是不同的

 ```js
 script:{
     "predev": "node prev.js",
     "dev": "node index.js",
     "postdev": "node post.js"
 }
 ```
 predev 是前置脚本，在dev之前执行
 
 postdev 是后置脚本，在dev之后执行

## 发布npm包

1. 添加npm账号  必须是官方源
2. 包名不能重复 版本不能重复
```sh
npm adduser
npm login 
npm publish
```

## 搭建npm私服 
https://verdaccio.org/zh-cn/


