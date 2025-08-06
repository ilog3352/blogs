# 常用命令
**使用命令创建文件会自动引入**
```sh
#创建一个restful风格的api 模块叫user
nest g res user
#起手是 nest g 后边跟操作 名字
#比如创建一个service文件名字叫post
nest g s post
```

| name          | alias       | description                                  | chinese |
|---------------|-------------|----------------------------------------------|---------|
| application   | application | Generate a new application workspace         |创建nest项目，workspace 关联|
| class         | cl         | Generate a new class                         |创建clase|
| configuration | config      | Generate a CLI configuration file            |创建配置文件|
| controller    | co         | Generate a controller declaration            |创建controller文件|
| decorator     | d          | Generate a custom decorator                  |创建自定义装饰器|
| filter        | f          | Generate a filter declaration                |创建过滤器|
| gateway       | ga         | Generate a gateway declaration               |创建网关层dome|
| guard         | gu         | Generate a guard declaration                 |
| interceptor   | itc        | Generate an interceptor declaration          |nest的拦截器（axios拦截器）|
| interface     | itf        | Generate an interface                        |声明文件|
| library       | lib        | Generate a new library within a monorepo     |编写库/工具 需要|
| middleware    | mi         | Generate a middleware declaration            |中间件|    
| module        | mo         | Generate a module declaration                |
| pipe         | pi         | Generate a pipe declaration                  |管道|
| provider      | pr         | Generate a provider declaration              |依赖注入|
| resolver      | r          | Generate a GraphQL resolver declaration      |
| resource      | res        | Generate a new CRUD resource                 |快速编写api|
| service       | s          | Generate a service declaration               |创建service文件|
| sub-app       | app        | Generate a new application within a monorepo | 创建子应用|