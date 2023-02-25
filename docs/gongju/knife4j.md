---
title: Spring Boot整合Knife4j，美化强化丑陋的Swagger
category:
  - Java企业级开发
tag:
  - Spring Boot
---


一般在使用 Spring Boot 开发前后端分离项目的时候，都会用到 [Swagger](https://tobebetterjavaer.com/springboot/swagger.html)（戳链接详细了解）。

但随着系统功能的不断增加，接口数量的爆炸式增长，Swagger 的使用体验就会变得越来越差，比如请求参数为 JSON 的时候没办法格式化，返回结果没办法折叠，还有就是没有提供搜索功能。

今天我们介绍的主角 Knife4j 弥补了这些不足，赋予了 Swagger 更强的生命力和表现力。

## 关于 Knife4j

Knife4j 的前身是 swagger-bootstrap-ui，是 springfox-swagger-ui 的增强 UI 实现。swagger-bootstrap-ui 采用的是前端 UI 混合后端 Java 代码的打包方式，在微服务的场景下显得非常臃肿，改良后的 Knife4j 更加小巧、轻量，并且功能更加强大。

springfox-swagger-ui 的界面长这个样子，说实话，确实略显丑陋。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-1.png)

swagger-bootstrap-ui 增强后的样子长下面这样。单纯从直观体验上来看，确实增强了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-2.png)

那改良后的 Knife4j 不仅在界面上更加优雅、炫酷，功能上也更加强大：后端 Java 代码和前端 UI 模块分离了出来，在微服务场景下更加灵活；还提供了专注于 Swagger 的增强解决方案。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-3.png)

官方文档：

>[https://doc.xiaominfo.com/knife4j/documentation/](https://doc.xiaominfo.com/knife4j/documentation/)

码云地址：

>[https://gitee.com/xiaoym/knife4j](https://gitee.com/xiaoym/knife4j)

示例地址：

>[https://gitee.com/xiaoym/swagger-bootstrap-ui-demo](https://gitee.com/xiaoym/swagger-bootstrap-ui-demo)

## 整合 Knife4j

Knife4j 完全遵循了 Swagger 的使用方式，所以可以无缝切换。

第一步，在 pom.xml 文件中添加 Knife4j 的依赖（**不需要再引入 springfox-boot-starter**了，因为 Knife4j 的 starter 里面已经加入过了）。

```
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <!--在引用时请在maven中央仓库搜索3.X最新版本号-->
    <version>3.0.2</version>
</dependency>
```

第二步，配置类 SwaggerConfig 还是 Swagger 时期原来的配方。

```java
@Configuration
@EnableOpenApi
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        Docket docket = new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo()).enable(true)
                .select()
                //apis： 添加swagger接口提取范围
                .apis(RequestHandlerSelectors.basePackage("top.codingmore.controller"))
                .paths(PathSelectors.any())
                .build();

        return docket;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("编程猫实战项目笔记")
                .description("编程喵是一个 Spring Boot+Vue 的前后端分离项目")
                .contact(new Contact("沉默王二", "https://codingmore.top","www.qing_gee@163.com"))
                .version("v1.0")
                .build();
    }
}
```

第三步，新建测试控制器类 Knife4jController.java：

```java
@Api(tags = "测试 Knife4j")
@RestController
@RequestMapping("/knife4j")
public class Knife4jController {

    @ApiOperation("测试")
    @RequestMapping(value ="/test", method = RequestMethod.POST)
    public String test() {
        return "沉默王二又帅又丑";
    }
}
```

第四步，由于 springfox 3.0.x 版本 和 Spring Boot 2.6.x 版本有冲突，所以还需要先解决这个 bug，一共分两步（在[Swagger](https://tobebetterjavaer.com/springboot/swagger.html) 那篇已经解释过了，这里不再赘述，但防止有小伙伴在学习的时候再次跳坑，这里就重复一下步骤）。

先在 application.yml 文件中加入：

```
spring:
  mvc:
    path match:
      matching-strategy: ANT_PATH_MATCHER
```

再在 SwaggerConfig.java 中添加：

```java
@Bean
public static BeanPostProcessor springfoxHandlerProviderBeanPostProcessor() {
    return new BeanPostProcessor() {

        @Override
        public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
            if (bean instanceof WebMvcRequestHandlerProvider || bean instanceof WebFluxRequestHandlerProvider) {
                customizeSpringfoxHandlerMappings(getHandlerMappings(bean));
            }
            return bean;
        }

        private <T extends RequestMappingInfoHandlerMapping> void customizeSpringfoxHandlerMappings(List<T> mappings) {
            List<T> copy = mappings.stream()
                    .filter(mapping -> mapping.getPatternParser() == null)
                    .collect(Collectors.toList());
            mappings.clear();
            mappings.addAll(copy);
        }

        @SuppressWarnings("unchecked")
        private List<RequestMappingInfoHandlerMapping> getHandlerMappings(Object bean) {
            try {
                Field field = ReflectionUtils.findField(bean.getClass(), "handlerMappings");
                field.setAccessible(true);
                return (List<RequestMappingInfoHandlerMapping>) field.get(bean);
            } catch (IllegalArgumentException | IllegalAccessException e) {
                throw new IllegalStateException(e);
            }
        }
    };
}
```

以上步骤均完成后，开始下一步，否则要么项目启动的时候报错，要么在文档中看不到测试的文档接口。

第五步，运行 Spring Boot 项目，浏览器地址栏输入以下地址访问 API 文档，查看效果。

>访问地址（和 Swagger 不同）：[http://localhost:8080/doc.html](http://localhost:8080/doc.html)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-0a9eb2b1-bace-4f47-ace9-8a5f9f280279.png)

是不是比 Swagger 简洁大方多了？如果想测试接口的话，可以直接点击接口，然后点击「测试」，点击发送就可以看到返回结果了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-16b1b553-1667-4222-9f29-2e5dfc8917a0.png)

## Knife4j 的功能特点

编程喵🐱实战项目中已经整合好了 Knife4j，在本地跑起来后，就可以查看所有 API 接口了。编程喵中的管理端（codingmore-admin）端口为 9002，启动服务后，在浏览器中输入 [http://localhost:9002/doc.html](http://localhost:9002/doc.html) 就可以访问到了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-3cfbf598-b94a-4081-aab3-06af1eef612c.png)

简单来介绍下 Knife4j 的 功能特点：


**1）支持登录认证**

Knife4j 和 Swagger 一样，也是支持头部登录认证的，点击「authorize」菜单，添加登录后的信息即可保持登录认证的 token。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-6.png)

如果某个 API 需要登录认证的话，就会把之前填写的信息带过来。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-7.png)

**2）支持 JSON 折叠**

Swagger 是不支持 JSON 折叠的，当返回的信息非常多的时候，界面就会显得非常的臃肿。Knife4j 则不同，可以对返回的 JSON 节点进行折叠。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-8.png)

**3）离线文档**

Knife4j 支持把 API 文档导出为离线文档（支持 markdown 格式、HTML 格式、Word 格式），

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-9.png)

使用 Typora 打开后的样子如下，非常的大方美观。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-10.png)

**4）全局参数**

当某些请求需要全局参数时，这个功能就很实用了，Knife4j 支持 header 和 query 两种方式。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-11.png)

之后进行请求的时候，就会把这个全局参数带过去。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-12.png)

**5）搜索 API 接口**

Swagger 是没有搜索功能的，当要测试的接口有很多的时候，当需要去找某一个 API 的时候就傻眼了，只能一个个去拖动滚动条去找。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-13.png)

在文档的右上角，Knife4j 提供了文档搜索功能，输入要查询的关键字，就可以检索筛选了，是不是很方便？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-14.png)

目前支持搜索接口的地址、名称和描述。

## 尾声

除了我上面提到的增强功能，Knife4j 还提供了很多实用的功能，大家可以通过官网的介绍一一尝试下，生产效率会提高不少。

>[https://doc.xiaominfo.com/knife4j/documentation/enhance.html](https://doc.xiaominfo.com/knife4j/documentation/enhance.html)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/knife4j-15.png)

----

更多内容，只针对《Java程序员进阶之路》星球用户开放，需要的小伙伴可以[戳链接🔗](https://tobebetterjavaer.com/zhishixingqiu/)加入我们的星球，一起学习，一起卷。。**编程喵**🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。

----

## 源码路径

> - 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - codingmore-knife4j：[https://github.com/itwanger/codingmore-learning](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-knife4j)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
