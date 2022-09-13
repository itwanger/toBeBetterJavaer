import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{o as n,c as r,e as o}from"./app.610296d2.js";const t={},s=o(`<p>user www www; worker_processes auto; error_log /www/wwwlogs/nginx_error.log crit; pid /www/server/nginx/logs/nginx.pid; worker_rlimit_nofile 51200;</p><p>events { use epoll; worker_connections 51200; multi_accept on; }</p><p>http { include mime.types; #include luawaf.conf;</p><pre><code>    include proxy.conf;

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

    gzip on; # \u5F00\u542FGzip
    gzip_static on; # \u5F00\u542F\u9759\u6001\u6587\u4EF6\u538B\u7F29
    gzip_min_length  1k; # \u4E0D\u538B\u7F29\u4E34\u754C\u503C\uFF0C\u5927\u4E8E1K\u7684\u624D\u538B\u7F29
    gzip_buffers     4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 2;
    gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
    gzip_vary on;
    gzip_proxied   expired no-cache no-store private auth;
    gzip_disable   &quot;MSIE [1-6]\\.&quot;;

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
        alias /www/wwwroot/itwanger/dist/; # \u6839\u76EE\u5F55
        index index.html;
    }

    location /api/ {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_pass http://codingmore_admin_pool/;
    }
    
    #\u5C06\u6240\u6709\u8BF7\u6C42\u8F6C\u53D1\u7ED9pool\u6C60\u7684\u5E94\u7528\u5904\u7406
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
</code></pre><p>}</p><p>server { listen 80; server_name docsify.tobebetterjavaer.com tobebetterjavaer.com *.tobebetterjavaer.com; return 301 https://$server_name$request_uri; }</p><h1 id="https-server" tabindex="-1"><a class="header-anchor" href="#https-server" aria-hidden="true">#</a> HTTPS server</h1><p>server { listen 443 ssl; server_name tobebetterjavaer.com;</p><pre><code>ssl_certificate      /home/cert/nginx/tobebetterjavaer.com_cert_chain.pem;
ssl_certificate_key  /home/cert/nginx/tobebetterjavaer.com_key.key;

ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;

ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;

root   /home/www/toBeBetterJavaer/dist;
index  index.html index.htm;
</code></pre><p>}</p><p>server { listen 443 ssl; server_name docsify.tobebetterjavaer.com;</p><pre><code>ssl_certificate      /home/cert/nginx/docsify.tobebetterjavaer.com_cert_chain.pem;
ssl_certificate_key  /home/cert/nginx/docsify.tobebetterjavaer.com_key.key;

ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;

ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;

root   /home/www/toBeBetterJavaer;
index  index.html index.htm;
</code></pre><p>}</p>`,13),i=[s];function _(a,c){return n(),r("div",null,i)}var d=e(t,[["render",_],["__file","nginx-setting.html.vue"]]);export{d as default};
