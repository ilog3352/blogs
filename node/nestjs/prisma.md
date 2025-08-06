# prisma
`prisma`是sql的orm框架，不用写sql语句，避免sql注入风险,提供了许多API

## 安装
```sh
npm i prisma -D
npx prisma init                         #  数据库  账号 密码     路径           库名
# 多出一个.env文件 用于链接库  DATABASE_URL="mysql://root:123456@localhost:3306/question"
# prisma目录 schema.prisma 修改为mysql
```
## 创建表
```js
model User {
    id       String   @id @default(cuid())
    name     String
    createAt DateTime @default(now()) // 解决数据库慢8小时问题
    updateAt DateTime @default(now()) @updatedAt // 如果有更新，自动更新时间
}
```
执行`npx prisma migrate dev --name init`生成表
## CRUD
```ts
import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PositionService {
    constructor(private prisma: PrismaService) { }
    create(createPositionDto: CreatePositionDto) {
        return this.prisma.user.create({
            data:createPositionDto
        })
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: string) {
        return this.prisma.user.findFirst({
            where: { id }
        })
    }

    update(id: string, updatePositionDto: UpdatePositionDto) {
        return this.prisma.user.update({
            where: { id },
            data: updatePositionDto
        });
    }

    remove(id: string) {
        return this.prisma.user.delete({
            where: { id }
        })
    }
}

```




## uuid/cuid
uuid:mac地址+随机数+时间戳生成 222323lkj-osidjf23fs-wo4ijf4 node通过c++查询uuid 做分布式集群管理推荐使用

cuid 更轻量级 sdofj89ag3jodf89lxj web开发使用


## restful 风格
- 什么操作对应什么方法
- 版本控制  
```js
// 在main.js添加一行代码
app.enableVersioning({
        type: VersioningType.URI
    })
```
