创建项目是 -m npm 指定npm
删除远程仓库 git remote rm origin
查看原程分支 git branch -r
查看已提交文件 git log
--allow-unrelated-histories  pull 的时候 允许合并

git push -f  强制合并

git config --global --unset http.https://github.com.proxy 取消代理

git config --global http.https://github.com.proxy 'http://127.0.0.1:7890' 配置代理

npm config list 查看代理信息（当前配置）

设置http/https代理

npm config set proxy http://代理服务器地址:端口

npm config set https-proxy http://server:port

设置需要用户名和密码的http/https代理

npm config set proxy http://username:password@server:port

npm confit set https-proxy http://username:password@server:port

取消http/https代理

npm config delete proxy

npm config delete https-proxy

查看镜像信息（当前配置）

npm config get registry 

npm设置淘宝镜像或默认镜像

npm config set registry=https://registry.npm.taobao.org

npm config set registry=https://registry.npmjs.org

npm取消淘宝镜像

npm config delete registry

设置http/https代理或镜像

设置命令与npm相同，只需要把命令里的npm换成pnpm

## 两行命令更新powershell
```sh
winget search Microsoft.PowerShell
winget install --id Microsoft.Powershell --source winget
```
