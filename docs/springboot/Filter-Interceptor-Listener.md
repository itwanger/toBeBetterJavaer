---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: Spring Boot 整合 Thymeleaf 模板引擎
---

### 前言

先说作用。

- 过滤器（Filter）：当有一堆请求，只希望符合预期的请求进来。
- 拦截器（Interceptor）：想要干涉预期的请求。
- 监听器（Listener）：想要监听这些请求具体做了什么。

再说区别。

过滤器是在请求进入容器后，但还没有进入 Servlet 之前进行预处理的。如下图所示。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-2a28621b-2cc1-4d29-87a1-cf6a01d95443.png)

拦截器是在请求进入控制器（Controller） 之前进行预处理的。

虚线内就是过滤器和拦截器的作用范围：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-dd48851b-c123-4fd8-b82d-9ae87b33745d.png)


过滤器依赖于 Servlet 容器，而拦截器依赖于 Spring 的 IoC 容器，因此可以通过注入的方式获取容器当中的对象。

监听器用于监听 Web 应用中某些对象的创建、销毁、增加、修改、删除等动作，然后做出相应的处理。

### 过滤器

- 过滤敏感词汇（防止sql注入）
- 设置字符编码
- URL级别的权限访问控制
- 压缩响应信息

过滤器的创建和销毁都由 Web 服务器负责，Web 应用程序启动的时候，创建过滤器对象，为后续的请求过滤做好准备。

过滤器可以有很多个，一个个过滤器组合起来就成了 FilterChain，也就是过滤器链。



在 Spring 中，过滤器都默认继承了 OncePerRequestFilter，顾名思义，OncePerRequestFilter 的作用就是确保一次请求只通过一次过滤器，而不重复执行。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-aaa1c537-c8ed-4c5d-b27f-93c1409f2748.png)

在编程喵实战项目中，我们就是通过继承 OncePerRequestFilter 来实现 JWT 登录授权过滤的。

```java
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
	@Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        // 从客户端请求中获取 JWT
        String authHeader = request.getHeader(this.tokenHeader);
        // 该 JWT 是我们规定的格式，以 tokenHead 开头
        if (authHeader != null && authHeader.startsWith(this.tokenHead)) {
            // The part after "Bearer "
            String authToken = authHeader.substring(this.tokenHead.length());
            // 从 JWT 中获取用户名
            String username = jwtTokenUtil.getUserNameFromToken(authToken);
            LOGGER.info("checking username:{}", username);

            // SecurityContextHolder 是 SpringSecurity 的一个工具类
            // 保存应用程序中当前使用人的安全上下文
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // 根据用户名获取登录用户信息
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                // 验证 token 是否过期
                if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                    // 将登录用户保存到安全上下文中
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
                            null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        chain.doFilter(request, response);
    }
}
```

我们利用 Spring Initializr 来新建一个 Web 项目 codingmore-filter-interceptor-listener。

添加一个过滤器 MyFilter ：

```java
@WebFilter(urlPatterns = "/*", filterName = "myFilter")
public class MyFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        long start = System.currentTimeMillis();
        chain.doFilter(request,response);
        System.out.println("Execute cost="+(System.currentTimeMillis()-start));
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
```

@WebFilter 注解用于将一个类声明为过滤器，urlPatterns 属性用来指定过滤器的 URL 匹配模式，filterName 用来定义过滤器的名字。

MyFilter 过滤器的逻辑非常简单，重写了 Filter 的三个方法，在 doFilter 方法中加入了时间戳的记录。

然后我们在项目入口类上加上 @ServletComponentScan 注解，这样过滤器就会自动注册。

启动服务器，访问任意的 URL。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-c865b6d2-30d3-435b-a930-c732caed17ce.png)



### 拦截器

- 登录验证，判断用户是否登录
- 权限验证，判断用户是否有权限访问资源，如校验token
- 日志记录，记录请求操作日志（用户ip，访问时间等），以便统计请求访问量
- 处理cookie、本地化、国际化、主题等
- 性能监控，监控请求处理时长等


我们来写一个简单的拦截器 LoggerInterceptor：

```java
@Slf4j
public class LoggerInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("preHandle{}...",request.getRequestURI());
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
```

一个拦截器必须实现 HandlerInterceptor 接口，preHandle 方法是 Controller 方法调用前执行，postHandle  是 Controller 方法正常返回后执行，afterCompletion 方法无论 Controller 方法是否抛异常都会执行。

只有 preHandle 返回 true 的话，其他两个方法才会执行。

如果 preHandle 返回 false 的话，表示不需要调用Controller方法继续处理了，通常在认证或者安全检查失败时直接返回错误响应。

再来一个 InterceptorConfig 对拦截器进行配置：

```java
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoggerInterceptor()).addPathPatterns("/**");
    }
}
```

@Configuration 注解用于定义配置类，干掉了以往 Spring 繁琐的 xml 配置文件。

编写一个用于被拦截的控制器 MyInterceptorController：

```java
@RestController
@RequestMapping("/myinterceptor")
public class MyInterceptorController {
    @RequestMapping("/hello")
    public String hello() {
        return "沉默王二是傻X";
    }
}
```

@RestController 注解相当于 @Controller + @ResponseBody 注解，@ResponseBody 注解用于将 Controller 方法返回的对象，通过适当的 HttpMessageConverter 转换为指定格式后，写入到 Response 对象的 body 数据区，通常用来返回 JSON 或者 XML 数据，返回 JSON 数据的情况比较多。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-27c3f03f-8cca-4cbe-84cb-005075c0b8c9.png)


启动服务器，访问 `http://localhost:8080/myinterceptor/hello`。


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-dcd99eeb-c00e-4a7a-a1c2-f8c5ca952aed.png)

在控制台可以看到拦截器中的日志信息：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-20bb0987-77c8-4069-a59f-bbd2d5584d8c.png)

无论是过滤器还是拦截器，都属于AOP（面向切面编程）思想的具体实现。除了这两种实现之外，还有另一种更灵活的AOP实现技术，即 Aspect，在编程喵实战项目里，你可以看到 Aspect 具体实现。

比如说统一日志切面 WebLogAspect，就是用来记录请求信息的。

```java
@Aspect
@Component
@Order(1)
public class WebLogAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebLogAspect.class);

    @Pointcut("execution(public * com.codingmore.controller.*.*(..))")
    public void webLog() {
    }

    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
    }

    @AfterReturning(value = "webLog()", returning = "ret")
    public void doAfterReturning(Object ret) throws Throwable {
    }

    @Around("webLog()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        //获取当前请求对象
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        webLog.setStartTime(startTime);
        webLog.setUri(request.getRequestURI());
        logMap.put("parameter",webLog.getParameter());
        logMap.put("spendTime",webLog.getSpendTime());
        logMap.put("description",webLog.getDescription());
        LOGGER.info("{}", JSONUtil.parse(webLog));
        return result;
    }

    /**
     * 根据方法和传入的参数获取请求参数
     */
    private Object getParameter(Method method, Object[] args) {
    }
}
```

通过拦截后的请求信息大概是这样的：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-7a4b219d-bd3e-435e-a2dc-93f4fe4e8cc2.png)


### 监听器

根据监听对象可以把监听器分为 3 类：

- ServletContext：对应应用 application，整个 Web 服务器中只有一个，Web 服务器关闭时销毁。可用于数据缓存，例如结合redis，在Web服务创建时从数据库拉取数据到缓存服务器。
- HttpSession： 对应会话 session，在会话建立时创建，一端会话关闭时销毁。可用于获取在线用户数量。
- ServletRequest：对应 request，客户端发送请求时创建，一同创建的还有 response，用于封装请求数据，在一次请求处理完成时销毁。可用于封装用户信息。

新建一个 MyListener：

```java
@WebListener
public class MyListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("上下文创建");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("上下文销毁");
    }
}
```

@WebListener 注解用于将一个类声明为监听器，同样干掉了 web.xml 文件。

ServletContextListener 能够监听整个 Web 应用程序的生命周期。当 Web 应用启动时触发 contextInitialized 方法，关闭时触发 contextDestroyed 方法。

在 Intellij IDEA 中重启服务的时候，可以在控制台看到如下信息：


![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/Filter-Interceptor-Listener-6b1904a7-64dc-44fa-8dde-8e986325ec7e.png)

不过需要注意的是，在 Intellij IDEA 中直接关闭进程无法看到 contextDestroyed 被调用的消息。

### 源码路径：

> - 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - 过滤器，拦截器、监听器专用：[https://github.com/itwanger/coding-more](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-filter-interceptor-listener)

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)