---
category:
  - Java企业级开发
tag:
  - 辅助工具
  - 轮子
---


# knife4j：一款界面更炫酷的API文档生成神器

一般在使用 Spring Boot 开发前后端分离项目的时候，都会用到 Swagger。Swagger 是一个规范和完整的框架，用于生成、描述、调试和可视化 RESTful 风格的 Web  API 服务框架。

但随着系统功能的不断增加，接口数量的爆炸式增长，Swagger 的使用体验就会变得越来越差，比如请求参数为 JSON 的时候没办法格式化，返回结果没办法折叠，还有就是没有提供搜索功能。

刚好最近发现 Knife4j 弥补了这些不足，赋予了 Swagger 更强的生命力，于是就来给大家安利一波。

### 一、关于 Knife4j

Knife4j 的前身是 swagger-bootstrap-ui，是 springfox-swagger-ui 的增强 UI 实现。swagger-bootstrap-ui 采用的是前端 UI 混合后端 Java 代码的打包方式，在微服务的场景下显得非常臃肿，改良后的 Knife4j 更加小巧、轻量，并且功能更加强大。

springfox-swagger-ui 的界面长这个样子，说实话，确实略显丑陋。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-1.png)

swagger-bootstrap-ui 增强后的样子长下面这样。单纯从直观体验上来看，确实增强了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-2.png)

改良后的 Knife4j 不仅在界面上更加优雅、炫酷，功能上也更加强大：后端 Java 代码和前端 UI 模块分离了出来，在微服务场景下更加灵活；更提供了专注于 Swagger 的增强解决方案。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-3.png)

官方文档：

>[https://doc.xiaominfo.com/knife4j/documentation/](https://doc.xiaominfo.com/knife4j/documentation/)

码云地址：

>https://gitee.com/xiaoym/knife4j

示例地址：

>https://gitee.com/xiaoym/swagger-bootstrap-ui-demo

### 二、整合 Swagger

为了对比 Knife4j 和 Swagger，我们先来整合体验一把 Swagger。

第一步，在 pom.xml 中添加 springfox 的官方 Swagger 依赖：

```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

第二步，添加 Swagger 的 Java 配置，只需要配置基本的 API 信息和需要扫描的类路径即可。

```java
@Configuration
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        Docket docket = new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo()).enable(true)
                .select()
                //apis： 添加swagger接口提取范围
                .apis(RequestHandlerSelectors.basePackage("com.codingmore.controller"))
                .paths(PathSelectors.any())
                .build();

        return docket;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("编程猫学习网站的 admin 管理端 API")
                .description("codingmore")
                .contact(new Contact("沉默王二&石磊", "https://tobebetterjavaer.com", "983436076@qq.com"))
                .version("1.0")
                .build();
    }
}
```

第二步，访问 API 文档，访问地址如下所示：

>http://localhost:9002/swagger-ui/

在项目路径后面添加上 `swagger-ui` 就可以了。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-4.png)

在 Controller 类中，可以看到常见的 Swagger 注解 @Api 和 @ApiOperation：

```java
@Controller
@Api(tags = "文章 ")
@RequestMapping("/posts")
public class PostsController {
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    @ApiOperation("删除")
    public ResultObject<String> delete(long postsId) {
        return ResultObject.success(postsService.removePostsById(postsId) ? "删除成功" : "删除失败");
    }
}
```

- @Api 注解用在类上，该注解将一个 Controller 类标记位一个 Swagger 资源（API）。默认情况下，Swagger 只会扫描解析具有 @Api 注解的类。

- @ApiOperation 注解用在方法上，该注解在指定的方法上，对一个方法进行描述。

Swagger 还有很多其他的注解，比如说 @ApiParam、@ApiResponses 等等，这里就不再一一说明。

### 三、整合 Knife4j

Knife4j 完全遵循了 Swagger 的使用方式，所以可以无缝切换。

第一步，在 pom.xml 文件中添加 Knife4j 的依赖（**不需要再引入 springfox-boot-starter**）。

```
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <!--在引用时请在maven中央仓库搜索3.X最新版本号-->
    <version>3.0.2</version>
</dependency>
```

第二步，在 Java 配置类上添加 @EnableOpenApi 注解，开启 Knife4j 增强功能。

```java
@Configuration
@EnableOpenApi
public class SwaggerConfig {}
```

第三步，重新运行 Spring Boot 项目，访问 API 文档，查看效果。

>访问地址：http://localhost:9002/doc.html

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-5.png)

如果项目中加了权限认证的话，记得给 Knife4j 添加白名单。我的项目用的是 SpringSecurity，所以需要在 application.yml 文件中添加。

```
secure:
  ignored:
    urls: #安全路径白名单
      - /doc.html
      - /swagger-ui/**
      - /swagger/**
      - /swagger-resources/**
      - /**/v3/api-docs
```

### 四、Knife4j 的功能特点

**1）支持登录认证**

Knife4j 和 Swagger 一样，也是支持头部登录认证的，点击「authorize」菜单，添加登录后的信息即可保持登录认证的 token。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-6.png)

如果某个 API 需要登录认证的话，就会把之前填写的信息带过来。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-7.png)

**2）支持 JSON 折叠**

Swagger 是不支持 JSON 折叠的，当返回的信息非常多的时候，界面就会显得非常的臃肿。Knife4j 则不同，可以对返回的 JSON 节点进行折叠。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-8.png)

**3）离线文档**

Knife4j 支持把 API 文档导出为离线文档（支持 markdown 格式、HTML 格式、Word 格式），

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-9.png)

使用 Typora 打开后的样子如下，非常的大方美观。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-10.png)

**4）全局参数**

当某些请求需要全局参数时，这个功能就很实用了，Knife4j 支持 header 和 query 两种方式。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-11.png)

之后进行请求的时候，就会把这个全局参数带过去。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-12.png)

**5）搜索 API 接口**

Swagger 是没有搜索功能的，当要测试的接口有很多的时候，当需要去找某一个 API 的时候就傻眼了，只能一个个去拖动滚动条去找。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-13.png)

在文档的右上角，Knife4j 提供了文档搜索功能，输入要查询的关键字，就可以检索筛选了，是不是很方便？

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-14.png)

目前支持搜索接口的地址、名称和描述。

### 五、尾声

除了我上面提到的增强功能，Knife4j 还提供了很多实用的功能，大家可以通过官网的介绍一一尝试下，生产效率会提高不少。

>https://doc.xiaominfo.com/knife4j/documentation/enhance.html

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/gongju/knife4j-15.png)

如果项目中之前使用过 Swagger 生成接口文档，切换到 Knife4j 可以说是非常的丝滑，只需要两步：

- 在 pom.xml 文件中把 `springfox-boot-starter` 替换为 `knife4j-spring-boot-starter`；
- 访问地址由原来的 `http://${host}:${port}/swagger-ui.html` 切换到 `http://${host}:${port}/doc.html`，如果有权限限制的话，记得开白名单。



