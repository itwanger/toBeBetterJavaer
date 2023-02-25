---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: Spring Boot 整合 Thymeleaf 模板引擎
---

## 关于 Thymeleaf

Thymeleaf 是一个优秀的、面向 Java 的 HTML 页面模板，具有丰富的标签语言和函数。在 JSP 被淘汰之后，Thymeleaf 取而代之成为了 Spring Boot 推荐的模板引擎。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/thymeleaf-d373bf02-a577-4382-89b4-0b29a87ab922.png)


Thymeleaf 在有网和没网的环境下都可以正常工作，既能让美工在浏览器中查看页面的静态效果，也能让程序员在服务器查看带数据的动态页面效果。

这是因为 Thymeleaf 支持 HTML 原型，在 HTML 标签里增加额外的属性来达到模板+数据的展示方式。

浏览器在解释 HTML 的时候会忽略未定义的标签属性，所以 Thymeleaf 可以静态地运行；当有数据返回页面时，Thymeleaf 标签会动态地替换静态内容。

下面列举一些 Thymeleaf 常用的表达式、标签和函数。

1）常用表达式

- `${...}`变量表达式
- `*{...}`选择表达式
- `#{...}`文字表达式
- `@{...}`URL 表达式
- `#maps` 对象表达式

2）常用标签

- th:action 定义服务器端控制器路径。
- th:each 循环语句
- th:field 表单字段
- th:href URL 链接
- th:id div 标签中的 ID
- th:if 条件判断
- th:include 引入文件
- th:fragment 定义代码片段
- th:object 替换对象
- th:src 图片地址
- th:text 文本
- th:value 属性值

3）常用函数

- `#dates` 日期函数
- `#lists` 列表函数
- `#arrays` 数组函数
- `#strings` 字符串函数
- `#numbers` 数字函数
- `#calendars` 日历函数
- `#objects` 对象函数
- `#bools` 布尔函数

想要查看更多 Thymeleaf 表达式、标签、函数等内容，可以到 Thymeleaf 官网：

>[https://www.thymeleaf.org/](https://www.thymeleaf.org/)

## 整合 Thymeleaf

第一步，在 pom.xml 文件中添加 Thymeleaf 的 stater

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

第二步，在 application.yml 文件中添加 Thymeleaf 的配置

```
spring:
  thymeleaf:
    cache: false # 开发时关闭缓存，不然看不到实时页面
```

其他配置项采用默认就可以了，想要看有哪些默认项的话，可以全局打开 ThymeleafProperties.java 类。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/thymeleaf-2e0cba5c-89ae-4f1b-8cc8-0c8f86d5f520.png)

Thymeleaf 模板引擎默认会读取 resources 目录下的 templates 目录，这个目录是用来存放 HTML 页面的。

第三步，新建 UserController.java 控制器。

```java
@Controller
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping("/all")
    public String all(Model model) {
        model.addAttribute("users", userService.findAll());
        return "all";
    }
}
```

- @Controller 注解表示该类为一个控制器类。
- @RequestMapping 注解用来处理请求地址映射，可用于类或者方法。
- Model 接口可以承载数据库里查到的数据，前端可以从 model 中取出来。

第四步，在 resources/templates 目录下新建 all.html 文件（文件名对应控制器中 all 方法返回的字符串）.

```
<!DOCTYPE html>
<html lang="zh" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <title>Thymeleaf</title>
</head>
<body>
    <table>
        <tr>
            <td>用户名</td>
            <td>密码</td>
        </tr>
        <tr th:each="user:${users}">
            <td th:text="${user.name}"></td>
            <td th:text="${user.password}"></td>
        </tr>
    </table>
</body>
</html>
```

`<html lang="zh" xmlns:th="http://www.thymeleaf.org">` 为 Thymeleaf 的命名空间，通过引入命名空间就可以在 HTML 文件中使用 Thymeleaf 标签语言，用关键字 “th”来标注。

第五步，启动主类，如果看到以下信息表示启动成功。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/thymeleaf-3e636801-32df-4591-9159-fe83f771f68d.png)

第六步，在浏览器地址栏里输入 `http://localhost:8080/user/all` 访问接口。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/thymeleaf-e4b658fd-e30a-4b00-8818-ab00f8a28620.png)

## HTTP Client

----

更多内容，只针对《Java程序员进阶之路》星球用户开放，需要的小伙伴可以[戳链接🔗](https://tobebetterjavaer.com/zhishixingqiu/)加入我们的星球，一起学习，一起卷。。**编程喵**🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。

----

## 源码地址

> - 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
> - codingmore-thymeleaf: [https://github.com/itwanger/codingmore-learning](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-thymeleaf)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)