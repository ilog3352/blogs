## nginx 命令
1. 启动 ./nginx 
2. 停止 ./nginx -s stop 直接退出 ./nginx -s quit 跑完接口退出 
3. 重启 ./nginx -s reload
4. 查看配置文件是否出错 ./nginx -t
5. 查看版本 ./nginx -v
6. 指定配置文件 ./nginx -c conf/nginx.conf

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
            root html;  #html的跟目录
            index index.html index.htm; #文件
            try_files $uri $uri/ /index.html; #如果请求的资源不存在，则尝试回退到index.html
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