## 前后端分离项目，如何解决跨域问题？

跨域问题是前后端分离项目中非常常见的一个问题，举例来说，编程猫（[codingmore](https://github.com/itwanger/coding-more)）学习网站的前端服务跑在 8080 端口下，后端服务跑在 9002 端口下，那么前端在请求后端接口的时候就会出现跨域问题。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-1.png)

403 Forbidden 是HTTP协议中的一个状态码（Status Code），意味着后端服务虽然成功解析了请求，但前端却没有访问该资源的权限。

那怎么解决这个问题呢？通常有两个思路：

- 前端使用 Nodejs 代理（开发环境下，生产环境下可以用 Nginx 替代）
- 或者后端开启跨域资源共享

### 一、关于跨域

跨域对于前后端开发者来说，就像一块狗皮膏药，无论是面试还是开发中，都会经常遇到。

之所以出现跨域问题，是因为[浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)，为了隔离潜在的恶意文件，为了防御来自歪门邪道的攻击，浏览器限制了从同一个源加载的文档或脚本与来自另一个源的资源进行交互。

前面我们提到了，前端跑在 8080 端口下，后端跑在 9002 端口下，这种情况就属于不同的源（域名不同，协议不同，端口不同），所以 8080 端口下的前端请求直接访问 9002 端口下的后端接口时就访问失败了。

那正确的打开方式是什么呢？我们前面也提到了，前端使用 Nodejs 代理或者后端开启跨域资源共享，我们一一来实践下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-2.gif)


### 二、Nodejs 代理

在 Nodejs 出现之前，JavaScript 编写的程序通常需要在用户的浏览器上执行，Node.js 出现后，JavaScript 也能用于服务端编程了。Nodejs 一系列的内置模块使得程序可以脱离 IIS、Apache 这种 Web 服务作为独立的服务器执行。

我们使用 Nodejs 来解决跨域问题的思路就是，在本地创建一个虚拟服务器，对 8080 端口下的前端请求进行代理，同时接收 9002 端口下的服务器端响应，这样服务端和服务端进行数据的交互就不会出现跨域问题了。

第一步，配置 Nodejs 代理服务

```
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:9002', // 你请求的第三方接口
        changeOrigin: false, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { // 路径重写，
          '^/api': '' // 替换target中的请求地址，也就是说以后你在请求http://api.codingmore.top/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      },
    },
}
```

第二步，配置前端访问请求路径

```
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"/api"'
  // VUE_APP_BASE_API: '"http://localhost:9002"'
})
```

第三步，重启前端服务

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-3.png)

再次点击「登录」按钮，可以看到请求的 URL 发生了改变，原来是 `http://localhost:9002/users/login`，现在是 `http://localhost:8080/api/users/login`。与此同时，可以看到多了一个 Remote Address，端口也是 8080，也就是说经过 Nodejs 的代理，前后端的交互在同一个源下面了，这样就不会发生跨域问题了。

同时，可以看得到，服务器端返回的状态码变成了 200，表示请求成功。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-4.png)

### 三、开启跨域资源共享

跨域资源共享，也就是 Cross-Origin Resource Sharing，简拼为 CORS，是一种基于 HTTP 头信息的机制，通过允许服务器标识除了它自己以外的资源，从而实现跨域访问。

第一步，开启 CORS 支持

在 Spring Boot 应用中，加入 CORS 的支持简单到不忍直视，添加一个配置类就可以了。

```java
@Configuration
public class GlobalCorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // 设置你要允许的网站域名
        config.addAllowedOrigin("http://localhost:8080");
        //允许跨域发送cookie
        config.setAllowCredentials(true);
        //放行全部原始头信息
        config.addAllowedHeader("*");
        //允许所有请求方法跨域调用
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

第二步，重启后端服务，再次点击登录按钮，发现请求已经可以正常访问了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-5.png)

本例中，后端返回 `Access-Control-Allow-Origin: http://localhost:8080` 就表示，跑在 9002 端口下的后端接口可以被 8080 端口的前端请求访问。

如果允许所有域名进行跨域调用的话，只需改变一行代码即可。

```java
//允许所有域名进行跨域调用
config.addAllowedOriginPattern("*");
// 设置你要允许的网站域名
//        config.addAllowedOrigin("http://localhost:8080");
```

对于 login 这种简单的请求来说，它们是不会触发 CORS 预检的，因此不需要在服务器端增加其他配置就可以了。那什么是简单请求呢？

1）请求方法是以下三种方法之一：

- HEAD
- GET
- POST

2）HTTP 的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值 `application/x-www-form-urlencoded、multipart/form-data、text/plain`

那对于会触发 CORS 预检的非简单请求（比如说请求方法是 PUT 或 DELETE，或者 Content-Type 字段的类型是 `application/json`，或者请求消息头包含了一些自定义的字段），该怎么办呢？

非简单请求在正式通信之前，会增加一次 HTTP 查询请求，称为“预检”请求。预检请求通过后，才会返回正常的响应内容。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-6.png)

拿编程猫的文章管理页来举例，该页面会向后端发起一个 `posts/queryPageable` 的分页查询，该请求包含了一个自定义的消息头 Authorization，于是浏览器认为该请求是一个非简单请求，然后就会自动发起一次 OPTIONS 请求，但由于我们的 Spring Boot 项目整合了 SpringsScurity 安全管理框架，没有对OPTIONS请求放开登录认证，导致验证失败，文章分页请求的响应数据就没有返回回来。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-7.png)

第三步，通过以下代码给 OPTIONS 请求放行。

```java
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = httpSecurity
                .authorizeRequests();
        //允许跨域请求的OPTIONS请求
        registry.antMatchers(HttpMethod.OPTIONS)
                .permitAll();
    }
}
```

再次重启后端服务，重新访问文章列表接口，发现有响应数据了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-8.png)

非简单请求必须首先使用 OPTIONS 请求方法发起一个预检请求到服务器端，以获知服务器是否允许该实际请求。"预检请求“的使用，避免了跨域请求对服务器的用户数据造成未预期的影响。

我们来通过两张图片简单总结一下预检请求的整个过程，第一张，发起 OPTIONS 预检请求：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-9.png)

第二章，发起正式请求：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/cors-10.png)


### 四、源码路径

编程猫后端源码：

>https://github.com/itwanger/coding-more

编程猫后台管理的前端源码：

>https://github.com/itwanger/codingmore-admin-web

参考链接：

>跨域：https://segmentfault.com/a/1190000015597029
>CORS：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS
>阮一峰：https://www.ruanyifeng.com/blog/2016/04/cors.html
>简单请求+预检请求：https://github.com/amandakelake/blog/issues/62

---

**本篇已收录至 GitHub 上星标 1.6k+ star 的开源专栏《Java 程序员进阶之路》，据说每一个优秀的 Java 程序员都喜欢她，风趣幽默、通俗易懂。内容包括 Java 基础、Java 并发编程、Java 虚拟机、Java 企业级开发、Java 面试等核心知识点。学 Java，就认准 Java 程序员进阶之路**😄。

[https://github.com/itwanger/toBeBetterJavaer](https://github.com/itwanger/toBeBetterJavaer)

star 了这个仓库就等于你拥有了成为了一名优秀 Java 工程师的潜力。也可以戳下面的链接跳转到《Java 程序员进阶之路》的官网网址，开始愉快的学习之旅吧。

[https://tobebetterjavaer.com/](https://tobebetterjavaer.com/)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/aop-log-5.png)


*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。








