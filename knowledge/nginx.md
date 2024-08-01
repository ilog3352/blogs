## nginx 命令
1. 启动 ./nginx 
2. 停止 ./nginx -s stop 直接退出 ./nginx -s quit 跑完接口退出 
3. 重启 ./nginx -s reload
4. 查看配置文件是否出错 ./nginx -t
5. 查看版本 ./nginx -v
6. 指定配置文件 ./nginx -c conf/nginx.conf

## 负载均衡
1. 默认是轮询的方式
2. 权重分配 `weight` = 3
3. 灾备技术 backup 目标服务器会作为备用服务器

用法

```conf
http {
    upstream aaa {  #这里的aaa替换ip
        server 89.0.142.86:80 weight=3;
        server 89.0.142.86:80 weight=2;
        server 89.0.142.86:80 weight=1 backup;
    }
    server {
        location / {
            proxy_pass http://aaa;
        }
    }
}

```
## 配置https
下载openssl 配置环境变量

1. 先生成私钥在终端中输入 生成一个private.key文件
```sh
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
```

2. 生成证书请求文件CSR  临时文件 用后可删
```sh
openssl req -new -key private.key -out server.csr -subj "/C=CN/ST=GD/L=SZ/O=IT/CN=www.localhost.com"
```
3. 通过csr生成证书
```sh
openssl x509 -req -in server.csr -signkey private.key -out server.crt
```
注:每个server都是独立的 配置的跨域图片等都需要在配置一次 在文件最后有注释的https配置 打开注释 替换路径即可

## 限速技术
限制一分钟接口多少个 limit为自定义变量  限制内存为10兆 每秒发送5个请求
```conf
limit_req_zone $binary_remote_addr zone=limit:10m rate=5r/s
```
## 缓存技术
```conf
proxy_cache_path C:/nginx_cache levels=1:2 keys_zone=cachename:10m max_size=1g inactive=60m;
```


## nginx 配置文件讲解
``` conf

#user  nobody;
#启动的进程 根据cpu核心 4核
worker_processes 1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
events {
    # 最大并发连接数 worker_processes * worker_connections 每秒处理的请求数
    worker_connections 1024;
}


http {
    # meme类型 文件类型 
    include mime.types;
    default_type application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;
    
    sendfile on; # nginx特性 处理静态大文件 分布加载 性能好
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout 65;   # 超时时间
    #压缩 html css js
    gzip  on;
    gzip_comp_level 5;#1-9 压缩的级别 取中
    gzip_types text/css text/javascript application/javascript text/plain text/html application/x-javascript application/x-httpd-php image/jpeg image/gif image/png;    #压缩类型 要压缩的文件
    #负载均衡 默认是轮询 
    #weight=3 权重
    #灾备技术 backup 备份服务器
    upstream aaa {  #这里的aaa替换ip
        server 127.0.0.1:9001 
        server 127.0.0.1:9002
        server 127.0.0.1:9003
    }

    #限速技术 限制一分钟接口多少个 limit为自定义变量  限制内存为10兆 每秒发送5个请求
    limit_req_zone $binary_remote_addr zone=limit:10m rate=5r/s
    #缓存技术           #路径绝对路径  #缓存的目录结构      #缓存名字  #缓存的大小  最大1g    #失效时间一小时没用到就删除
    proxy_cache_path C:/nginx_cache levels=1:2 keys_zone=cachename:10m max_size=1g inactive=60m;
    #http服务器管理
    server {
        listen 8090;    #端口 可以有多个
        server_name localhost; #域名

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
        location / {    # 代理 / 代理的路径 
            proxy_pass http://aaa;
            root html;  #html的跟目录
            index index.html index.htm; #文件
            try_files $uri $uri/ /index.html; #如果请求的资源不存在，则尝试回退到index.html 404
        }
        #处理跨域
        location /api {         #限制的5 短时间可以10  nodelay没延迟  超过就503
            limit_req zone=limit burst=10 nodelay 或者 delay=10
            proxy_pass http://aaa
            #请求接口只需要 /api/list 就可以   代理转发的地址为   http://localhost:9090/api/list
            #如果需要去掉/api
            rewrite ^/api/(.*) /$1 break;
        }
        #匹配图片 做防盗链 我的图片被盗  不能看 可以配置白名单 跟在localhost后就行
        location ~*.*\.(jpg|jpeg|gif|png|bmp|ico)$ {
            proxy_cache cachename;
            proxy_cache_methods GET;
            proxy_cache_key $host$uri$is_args$args;
            proxy_cache_valid 200 304 5m;#200位置为状态码 缓存5分钟1d为一天
            proxy_cache_min_uses 2; #触发两次缓存

            root html/static;   定位到html/static
            valid_referers none blocked loaclhost;  除了localhost其他都不允许
            #none 允许referer为空
            # blocked 允许referer没有 
            #允许来源是loaclhost 
            #$invalid_referer 根据上边条件 如果条件成立 $invalid_referer为空
            if ($invalid_referer) {
                return 403;
            }
         }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #   错误码 转到哪里
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    # HTTPS server
    #       每个server都是独立的 配置的跨域图片等都需要在配置一次 https跟http都可以访问
     #配置https 下载openssl 配置环境变量
      #1. 先 生成私钥 在终端中输入 生成一个private.key文件
     #    openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
      #  2. 生成证书请求文件CSR
      #   openssl req -new -key private.key -out server.csr -subj "/C=CN/ST=GD/L=SZ/O=IT/CN=www.localhost.com"
    #    3. 通过csr生成证书
      #   openssl x509 -req -in server.csr -signkey private.key -out server.crt
        #密钥没用csr文件没用
    server {
        listen       443 ssl;
        server_name  localhost;
        ssl_certificate      cert.pem;  #更换路径
        ssl_certificate_key  cert.key;  #更换路径   就可以了
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }  
}

```

## 内置变量
| 变量                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| $arg_*name*                | 表示请求行中的任意参数，*name* 为参数名称                    |
| $args                      | 表示请求行中的参数部分                                       |
| $binary_remote_addr        | 二进制形式表示的客户端地址                                   |
| $body_bytes_sent           | 发送到客户端的字节数，不包括响应头                           |
| $bytes_received            | 接受到客户端的字节数                                         |
| $bytes_sent                | 发送到客户端的字节数                                         |
| $connection                | 连接序列号                                                   |
| $connection_requests       | 当前连接的请求数量                                           |
| $connection_time           | 连接时间，单位为：ms                                         |
| $cookie_*name*             | 表示任意 cookie，*name* 为 cookie 名称                       |
| $date_gmt                  | GMT 时间                                                     |
| $date_local                | 本地时间                                                     |
| $host                      | 按照以下顺序获取主机信息：请求行中的主机名，或“Host”请求头字段中的主机名，或与请求匹配的服务器名。 |
| $hostname                  | 主机名                                                       |
| $http_*name*               | 表示任意请求头；*name* 为请求头名称，其中破折号被下划线替换并转换为小写；如：$http_user_agent，$http_x_forwarded_for |
| $proxy_add_x_forwarded_for | 将 $remote_addr 的值附加到“X−Forwarded−For”客户端请求头中，由逗号分隔。如果客户端请求头中不存在“X−Forwarded−For”，则 $proxy_add_x_forwarded_for 等于 $remote_addr 。 |
| $proxy_host                | 代理服务器的地址和端口                                       |
| $proxy_port                | 代理服务器的端口                                             |
| $query_string              | 同 $args                                                     |
| $remote_addr               | 客户端地址                                                   |
| $remote_port               | 客户端端口                                                   |
| $remote_user               | Basic 身份验证中提供的用户名                                 |
| $request                   | 完整请求行                                                   |
| $request_body              | 请求体                                                       |
| $request_body_file         | 保存请求体的临时文件                                         |
| $request_length            | 请求长度（包括请求行、头部和请求体）                         |
| $request_method            | 请求方法                                                     |
| $request_time              | 请求处理时间，单位为：ms                                     |
| $request_uri               | 完整请求行                                                   |
| $scheme                    | 请求协议，http 或 https                                      |
| $server_addr               | 接受请求的服务器地址                                         |
| $server_name               | 接受请求的服务器名称                                         |
| $server_port               | 接受请求的服务器端口                                         |
| $server_protocol           | 请求协议，通常为 HTTP/1.0、HTTP/1.1 或 HTTP/2.0              |
| $ssl_cipher                | 建立 SSL 连接所使用的加密套件名称                            |
| $ssl_ciphers               | 客户端支持的加密套件列表                                     |
| $ssl_client_escaped_cert   | 客户端 PEM 格式的证书                                        |
| $ssl_protocol              | 建立 SSL 连接的协议                                          |
| $status                    | 响应状态码                                                   |
| $time_iso8601              | ISO 8601 标准格式的本地时间                                  |
| $time_local                | Common Log 格式的本地时间                                    |
| $upstream_addr             | upstream 服务器的 ip 和端口                                  |
| $upstream_bytes_received   | 从 upstream 服务器接收的字节数                               |
| $upstream_bytes_sent       | 发送给 upstream 服务器的字节数                               |
| $upstream_http_*name*      | 表示 upstream 服务器任意响应头，*name* 为响应头名称，其中破折号被下划线替换并转换为小写 |
| $upstream_response_length  | upstream 服务器的响应长度，单位为：字节                      |
| $upstream_response_time    | upstream 服务器的响应时间，单位为：秒                        |
| $upstream_status           | upstream 服务器的响应状态码                                  |
| $uri                       | 请求 uri                                                     |