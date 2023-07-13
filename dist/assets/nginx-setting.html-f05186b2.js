import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as a,a as e,d as n,b as r,e as s}from"./app-1c5b5ce3.js";const T={},Q=s(`<h1 id="nginx-配置" tabindex="-1"><a class="header-anchor" href="#nginx-配置" aria-hidden="true">#</a> nginx 配置</h1><p>user www www;<br> worker_processes auto;<br> error_log /www/wwwlogs/nginx_error.log crit;<br> pid /www/server/nginx/logs/nginx.pid;<br> worker_rlimit_nofile 51200;</p><p>events<br> {<br> use epoll;<br> worker_connections 51200;<br> multi_accept on;<br> }</p><p>http<br> {<br> include mime.types;<br> #include luawaf.conf;</p><pre><code>    include proxy.conf;

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
</code></pre><p>}</p>`,6),_=e("br",null,null,-1),c=e("br",null,null,-1),d={href:"http://docsify.tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},m={href:"http://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},p=e("br",null,null,-1),h={class:"MathJax",jax:"SVG",style:{position:"relative"}},g={style:{"vertical-align":"-0.357ex"},xmlns:"http://www.w3.org/2000/svg",width:"11.693ex",height:"1.359ex",role:"img",focusable:"false",viewBox:"0 -443 5168.3 600.8","aria-hidden":"true"},u=s('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D460" d="M131 289Q131 321 147 354T203 415T300 442Q362 442 390 415T419 355Q419 323 402 308T364 292Q351 292 340 300T328 326Q328 342 337 354T354 372T367 378Q368 378 368 379Q368 382 361 388T336 399T297 405Q249 405 227 379T204 326Q204 301 223 291T278 274T330 259Q396 230 396 163Q396 135 385 107T352 51T289 7T195 -10Q118 -10 86 19T53 87Q53 126 74 143T118 160Q133 160 146 151T160 120Q160 94 142 76T111 58Q109 57 108 57T107 55Q108 52 115 47T146 34T201 27Q237 27 263 38T301 66T318 97T323 122Q323 150 302 164T254 181T195 196T148 231Q131 256 131 289Z"></path></g><g data-mml-node="mi" transform="translate(469,0)"><path data-c="1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path></g><g data-mml-node="mi" transform="translate(935,0)"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mi" transform="translate(1386,0)"><path data-c="1D463" d="M173 380Q173 405 154 405Q130 405 104 376T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Q21 294 29 316T53 368T97 419T160 441Q202 441 225 417T249 361Q249 344 246 335Q246 329 231 291T200 202T182 113Q182 86 187 69Q200 26 250 26Q287 26 319 60T369 139T398 222T409 277Q409 300 401 317T383 343T365 361T357 383Q357 405 376 424T417 443Q436 443 451 425T467 367Q467 340 455 284T418 159T347 40T241 -11Q177 -11 139 22Q102 54 102 117Q102 148 110 181T151 298Q173 362 173 380Z"></path></g><g data-mml-node="mi" transform="translate(1871,0)"><path data-c="1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path></g><g data-mml-node="msub" transform="translate(2337,0)"><g data-mml-node="mi"><path data-c="1D45F" d="M21 287Q22 290 23 295T28 317T38 348T53 381T73 411T99 433T132 442Q161 442 183 430T214 408T225 388Q227 382 228 382T236 389Q284 441 347 441H350Q398 441 422 400Q430 381 430 363Q430 333 417 315T391 292T366 288Q346 288 334 299T322 328Q322 376 378 392Q356 405 342 405Q286 405 239 331Q229 315 224 298T190 165Q156 25 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 114 189T154 366Q154 405 128 405Q107 405 92 377T68 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mi" transform="translate(484,-150) scale(0.707)"><path data-c="1D45B" d="M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z"></path></g></g><g data-mml-node="mi" transform="translate(3295.3,0)"><path data-c="1D44E" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"></path></g><g data-mml-node="mi" transform="translate(3824.3,0)"><path data-c="1D45A" d="M21 287Q22 293 24 303T36 341T56 388T88 425T132 442T175 435T205 417T221 395T229 376L231 369Q231 367 232 367L243 378Q303 442 384 442Q401 442 415 440T441 433T460 423T475 411T485 398T493 385T497 373T500 364T502 357L510 367Q573 442 659 442Q713 442 746 415T780 336Q780 285 742 178T704 50Q705 36 709 31T724 26Q752 26 776 56T815 138Q818 149 821 151T837 153Q857 153 857 145Q857 144 853 130Q845 101 831 73T785 17T716 -10Q669 -10 648 17T627 73Q627 92 663 193T700 345Q700 404 656 404H651Q565 404 506 303L499 291L466 157Q433 26 428 16Q415 -11 385 -11Q372 -11 364 -4T353 8T350 18Q350 29 384 161L420 307Q423 322 423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 181Q151 335 151 342Q154 357 154 369Q154 405 129 405Q107 405 92 377T69 316T57 280Q55 278 41 278H27Q21 284 21 287Z"></path></g><g data-mml-node="mi" transform="translate(4702.3,0)"><path data-c="1D452" d="M39 168Q39 225 58 272T107 350T174 402T244 433T307 442H310Q355 442 388 420T421 355Q421 265 310 237Q261 224 176 223Q139 223 138 221Q138 219 132 186T125 128Q125 81 146 54T209 26T302 45T394 111Q403 121 406 121Q410 121 419 112T429 98T420 82T390 55T344 24T281 -1T205 -11Q126 -11 83 42T39 168ZM373 353Q367 405 305 405Q272 405 244 391T199 357T170 316T154 280T149 261Q149 260 169 260Q282 260 327 284T373 353Z"></path></g></g></g>',1),f=[u],b=e("mjx-assistive-mml",{unselectable:"on",display:"inline"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("mi",null,"s"),e("mi",null,"e"),e("mi",null,"r"),e("mi",null,"v"),e("mi",null,"e"),e("msub",null,[e("mi",null,"r"),e("mi",null,"n")]),e("mi",null,"a"),e("mi",null,"m"),e("mi",null,"e")])],-1),w=e("br",null,null,-1),x=e("h1",{id:"https-server",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#https-server","aria-hidden":"true"},"#"),n(" HTTPS server")],-1),v=e("br",null,null,-1),y=e("br",null,null,-1),k={href:"http://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},j=e("pre",null,[e("code",null,`ssl_certificate      /home/cert/nginx/tobebetterjavaer.com_cert_chain.pem;
ssl_certificate_key  /home/cert/nginx/tobebetterjavaer.com_key.key;

ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;

ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;

root   /home/www/toBeBetterJavaer/dist;
index  index.html index.htm;
`)],-1),z=e("p",null,"}",-1),H=e("br",null,null,-1),L=e("br",null,null,-1),M={href:"http://docsify.tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},Z=e("pre",null,[e("code",null,`ssl_certificate      /home/cert/nginx/docsify.tobebetterjavaer.com_cert_chain.pem;
ssl_certificate_key  /home/cert/nginx/docsify.tobebetterjavaer.com_key.key;

ssl_session_cache    shared:SSL:1m;
ssl_session_timeout  5m;

ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers  on;

root   /home/www/toBeBetterJavaer;
index  index.html index.htm;
`)],-1),D=e("p",null,"}",-1);function B(S,$){const t=l("ExternalLinkIcon");return o(),a("div",null,[Q,e("p",null,[n("server {"),_,n(" listen 80;"),c,n(" server_name "),e("a",d,[n("docsify.tobebetterjavaer.com"),r(t)]),n(),e("a",m,[n("tobebetterjavaer.com"),r(t)]),n(" *.tobebetterjavaer.com;"),p,n(" return 301 https://"),e("mjx-container",h,[(o(),a("svg",g,f)),b]),n("request_uri;"),w,n(" }")]),x,e("p",null,[n("server {"),v,n(" listen 443 ssl;"),y,n(" server_name "),e("a",k,[n("tobebetterjavaer.com"),r(t)]),n(";")]),j,z,e("p",null,[n("server {"),H,n(" listen 443 ssl;"),L,n(" server_name "),e("a",M,[n("docsify.tobebetterjavaer.com"),r(t)]),n(";")]),Z,D])}const E=i(T,[["render",B],["__file","nginx-setting.html.vue"]]);export{E as default};
