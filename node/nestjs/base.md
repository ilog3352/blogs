# nestjs
Nest（NestJS）是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。

nest是使用webpack构建的,是基于Angular rxjs promise express fastify组合而成
## 创建/启动项目
```sh
npm i -g @nest/cli
nest new server
npm run start:dev
```
## 目录结构
```js
src
  |- app.controller.spec.ts // controller 的测试文件
  |- app.controller.ts      // controller，路由和预处理
  |- app.module.ts          // module，为模块注册用
  |- app.service.ts         // service 真正的逻辑
  |- main.ts                // 程序入口

// 取消生成测试文件 在nest-cli.json中添加
 "generateOptions": {
        "spec": false
    }
```
### nuxtjs nestjs nextjs
- nuxtjs 是vue的ssr框架
- nestjs 是angular的ssr框架
- nextjs 是react的ssr框架 