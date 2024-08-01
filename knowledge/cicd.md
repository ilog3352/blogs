### CICD
是什么?
1. 持续集成
2. 持续交付
3. 持续部署

## 自动部署
### 1. 配置config
```js
// 配置 config.js

export const config = [
    {
        name: '项目A',
        value: '项目A',
        // ...
        ssh: {
            host: '8.140.49.19',
            username: 'root',
            port: 22,
            password: 'Zhangshuo0927',
            passphrase: '',//密钥没有
        },
        targetDir: 'D:/web/study/vitepress/docs', // 上传目标目录
        targetFile: 'docs.zip',// 压缩一下
        deployDir: '/home/cicd/',//上传到服务器的目录
        releaseDir: 'blog' // 上传成功后服务器文件夹的名称
    },
    // {}可以做多台服务器
]
```
### 2. 命令行交互
```js
// 命令行交互 helper.js

import inquirer from 'inquirer'     // 命令行交互的库
import { config } from '../config.js'   // 引入配置

export async function commanderLine() {
    const res = await inquirer.prompt([
        {
            type: 'list',
            message: "请选择项目",
            name: 'project',
            choices: config,
        }
    ])
    // return 选择的项目
    const opts = config.find(v => v.value === res.project)
    return opts
}
```
### 3. 压缩文件
```js
npm i archiver
export function compressFile(targetDir, localFile) {
    return new Promise((resolve) => {
        const output = fs.createWriteStream(localFile)
        const archive = archiver('zip', {
            zlib: { level: 9 } // 1-9
        })
        archive.pipe(output)  // 压缩完的流交给可写流处理 
        archive.directory(targetDir, 'dist')   // 压缩的目录
        archive.finalize()
        archive.on('close', () => {
            console.log((archive.pointer() / 1024 / 1024).toFixed(2), 'MB')
            resolve()
        })

    })
}
```
### 4. 连接ssh
```js
npm i node-ssh
import * as ssh from 'node-ssh'
const sshClient = new ssh.NodeSSH()
async function sshConnect(sshConfig) {
    return new Promise((resolve) => {
        sshClient.connect(sshConfig).then(() => {
            console.log('连接成功')
            resolve()
        })
    })
}
```
### 5. 上传文件
```js
export function uploadFile(ssh, config, local) {
    return new Promise((resolve) => {
        ssh.putFile(local, config.deployDir + config.releaseDir).then(() => {
            console.log('上传成功');
            resolve();
        })
    })
}
```
### 6. 自动执行ssh命令 操作文件
```conf

```