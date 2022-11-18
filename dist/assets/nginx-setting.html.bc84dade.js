import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as i,a as e,d as n,b as t,r as a}from"./app.99eb8281.js";const _={},c=e("h1",{id:"nginx-配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#nginx-配置","aria-hidden":"true"},"#"),n(" nginx 配置")],-1),l=e("p",null,"user www www; worker_processes auto; error_log /www/wwwlogs/nginx_error.log crit; pid /www/server/nginx/logs/nginx.pid; worker_rlimit_nofile 51200;",-1),p=e("p",null,"events { use epoll; worker_connections 51200; multi_accept on; }",-1),d=e("p",null,"http { include mime.types; #include luawaf.conf;",-1),m=e("pre",null,[e("code",null,`    include proxy.conf;

    default_type  application/octet-stream;

    server_names_hash_bucket_size 512;
    client_header_buffer_size 32k;
    large_client_header_buffers 4 32k;
    client_max_body_size 50m;

    sendfile   on;
    tcp_nopush on;

    keepalive_timeout 60;

    tcp_nodelay on;

    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 256k;
    fastcgi_intercept_errors on;

    gzip on; # 开启Gzip
    gzip_static on; # 开启静态文件压缩
    gzip_min_length  1k; # 不压缩临界值，大于1K的才压缩
    gzip_buffers     4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 2;
    gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
    gzip_vary on;
    gzip_proxied   expired no-cache no-store private auth;
    gzip_disable   "MSIE [1-6]\\.";

    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn_zone $server_name zone=perserver:10m;

    server_tokens off;
    access_log off;
    
upstream codingmore_web_pool{
    server 127.0.0.1:8081;
}

upstream codingmore_admin_pool{
    server 127.0.0.1:9002;
}

server {
    listen       80;
    server_name  codingmore.top;
    access_log /home/www/codingmore_web.log;
    error_log /home/www/codingmore_web.error;

    location /admin/ {
        alias /www/wwwroot/itwanger/dist/; # 根目录
        index index.html;
    }

    location /api/ {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_pass http://codingmore_admin_pool/;
    }
    
    #将所有请求转发给pool池的应用处理
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://codingmore_web_pool;
    }
}

server
    {
    listen 888;
    server_name phpmyadmin;
    index index.html index.htm index.php;
    root  /www/server/phpmyadmin;
        location ~ /tmp/ {
            return 403;
        }

    #error_page   404   /404.html;
    include enable-php.conf;

    location ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
    }

    location ~ .*\\.(js|css)?$
    {
        expires      12h;
    }

    location ~ /\\.
    {
        deny all;
    }

    access_log  /www/wwwlogs/access.log;
}

include /www/server/panel/vhost/nginx/*.conf;
`)],-1),h=e("p",null,"}",-1),f={href:"http://docsify.tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},g={href:"http://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},w=e("h1",{id:"https-server",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#https-server","aria-hidden":"true"},"#"),n(" HTTPS server")],-1),u={href:"http://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},x=e("pre",null,[e("code",null,`ssl_certificate      /home/cert/nginx/tobebetterjavaer.com_cert_chain.pem;
ssl_certificate_key  /home/cert/nginx/tobebetterjavaer.com_key.key;

ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;

ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;

root   /home/www/toBeBetterJavaer/dist;
index  index.html index.htm;
`)],-1),v=e("p",null,"}",-1),b={href:"http://docsify.tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},y=e("pre",null,[e("code",null,`ssl_certificate      /home/cert/nginx/docsify.tobebetterjavaer.com_cert_chain.pem;
ssl_certificate_key  /home/cert/nginx/docsify.tobebetterjavaer.com_key.key;

ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;

ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;

root   /home/www/toBeBetterJavaer;
index  index.html index.htm;
`)],-1),k=e("p",null,"}",-1);function z(j,$){const r=a("ExternalLinkIcon");return s(),i("div",null,[c,l,p,d,m,h,e("p",null,[n("server { listen 80; server_name "),e("a",f,[n("docsify.tobebetterjavaer.com"),t(r)]),n(),e("a",g,[n("tobebetterjavaer.com"),t(r)]),n(" *.tobebetterjavaer.com; return 301 https://$server_name$request_uri; }")]),w,e("p",null,[n("server { listen 443 ssl; server_name "),e("a",u,[n("tobebetterjavaer.com"),t(r)]),n(";")]),x,v,e("p",null,[n("server { listen 443 ssl; server_name "),e("a",b,[n("docsify.tobebetterjavaer.com"),t(r)]),n(";")]),y,k])}const H=o(_,[["render",z],["__file","nginx-setting.html.vue"]]);export{H as default};
