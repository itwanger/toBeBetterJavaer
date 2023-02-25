---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: 搭建第一个Spring Boot项目
---


## 关于 Spring Initializr

Spring 官方提供了 Spring Initializr 的方式来创建 Spring Boot 项目。网址如下：

>[https://start.spring.io/](https://start.spring.io/)

打开后的界面如下：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-01.png)


可以将 Spring Initializr 看作是 Spring Boot 项目的初始化向导，它可以帮助开发人员在一分钟之内创建一个 Spring Boot 骨架，非常的傻瓜式。

来解释一下 Spring Initializr 初始化界面中的关键选项。

1）Project：项目的构建方式，可以选择 [Maven](https://tobebetterjavaer.com/maven/maven.html)（安装方式可以戳链接） 和 Gradle（构建脚本基于 Groovy 或者 Kotlin 等语言来编写，而不是传统的 XML）。编程喵默认采用的 Maven。

2）Language：项目的开发语言，可以选择 Java、Kotlin（JetBrains开发的可以在 JVM 上运行的编程语言）、Groovy（可以作为 Java 平台的脚本语言来使用）。默认 Java 即可。

3）Spring Boot：项目使用的 Spring Boot 版本。默认版本即可，比较稳定。

4）Project Metada：项目的基础设置，包括包名、打包方式、JDK 版本等。

- Group：项目所属组织的标识符，比如说 top.codingmore；
- Artifact：项目的标识符，比如说 coding-more；
- Name：默认保持和 Artifact 一致即可；
- Description： 项目的描述信息，比如说《编程喵实战项目（Spring Boot+Vue 前后端分离项目）》；
- Package name：项目包名，根据Group和Artifact自动生成即可。
- Packaging： 项目打包方式，可以选择 Jar 和 War（SSM 时代，JavaWeb 项目通常会打成 War 包，放在 Tomcat 下），Spring Boot 时代默认 Jar 包即可，因为 Spring Boot 可以内置 Tomcat、Jetty、Undertow 等服务容器了。
- Java：项目选用的 JDK 版本，选择 11 或者 8 就行（编程喵采用的是最最最最稳定的 Java8）。

5）Dependencies：项目所需要的依赖和 starter。如果不选择的话，默认只有核心模块 spring-boot-starter 和测试模块 spring-boot-starter-test。

好，接下来我们使用 Spring Initializr 初始化一个 Web 项目，Project 选择 Maven，Spring Boot 选择 2.6.1，Java 选择 JDK 8，Dependencies 选择「Build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container.」

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-02.png)


这预示着我们会采用 SpringMVC 并且使用 Tomcat 作为默认服务器来开发一个 Web 项目。

然后点击底部的「generate」按钮，就会生成一个 Spring Boot 初始化项目的压缩包。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-03.png)

如果使用的是 Intellij IDEA 旗舰版，可以直接通过 Intellij IDEA 新建 Spring Boot 项目。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-2d03d0a4-0e87-4cd3-974d-f35bc440bdf0.png)



## Spring Boot 项目结构分析

解开压缩包，并导入到 Intellij IDEA 中，可以看到 Spring Boot 项目的目录结构。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-04.png)


可以使用 `tree  -CfL 3` 命令以树状图列出目录的内容：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-05.png)


- src/main/java 为项目的开发目录，业务代码在这里写。
- src/main/resources 为配置文件目录，静态文件、模板文件和配置文件都放在这里。
  - 子目录 static 用于存放静态资源文件，比如说 JS、CSS 图片等。
  - 子目录 templates 用于存放模板文件，比如说 thymeleaf 和 freemarker 文件。
- src/test/java 为测试类文件目录。
- pom.xml 用来管理项目的依赖和构建。

## 如何启动/部署 Spring Boot 项目

第一次启动，我个人习惯在 main 类中右键，在弹出的右键菜单这种选择「run ... main()」启动。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-06.png)


经过 2.5s 左右的 build 后，项目启动成功了，可以在日志中看到 Web 项目是以 Tomcat 为容器的，默认端口号为 8080，根路径为空。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-07.png)


这要比传统的 Web 项目省事省心省力，不需要打成 war 包，不需要把 war 包放到 Tomcat 的 webapp 目录下再启动。

那如果想把项目打成 jar 包放到服务器上，以 `java -jar xxx.jar` 形式运行的话，该怎么做呢？

打开 Terminal 终端， 执行命令 `mvn clean package`，等待打包结果。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-08.png)


我们的项目在初始化的时候选择的是 Maven 构建方式，所以 pom.xml 文件中会引入 spring-boot-maven-plugin 插件。

```
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

因此我们就可以利用 Maven 命令来完成项目打包，打包完成后，进入 target 目录下，就可以看到打包好的 jar 包了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-09.png)


利用终端工具 [Tabby](https://mp.weixin.qq.com/s/HeUAPe4LqqjfzIeWDe8KIg)，将 jar 包上传到服务器。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-10.png)


执行 `java -jar tobebetterjavaer-0.0.1-SNAPSHOT.jar` 命令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-11.png)


what？？？？？？竟然没有安装 JDK。好吧，为了带白票阿里云服务器的小伙伴一起学习 Linux，我下了血本自己买了一台零添加的服务器。

PS：需要在 centos 环境下安装 JDK 的小伙伴可以看这篇。

>[https://segmentfault.com/a/1190000015389941](https://segmentfault.com/a/1190000015389941)

安装好 JDK 后，再次执行命令就可以看到 Spring Boot 项目可以正常在服务器上跑起来了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-12.png)


## 第一个Web项目

项目既然启动成功了，我们在浏览器里访问 8080 端口测试下吧。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-13.png)


咦，竟然 Whitelabel 了，这个 404 页面是 Spring Boot 默认的错误页面，表示我们的请求在 Web 服务中不存在。

那该怎么办呢？

我们来增加一个 Controller 文件，用来处理 Web 请求，内容如下。

```
@Controller
public class HelloController {
    
    @GetMapping("/hello")
    @ResponseBody
    public String hello() {
        return "hello, springboot";
    }
}
```

这段代码的业务逻辑非常简单，用户发送 hello 请求，服务器端响应一个“hello, springboot”回去。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/initializr-14.png)


OK，现在可以访问到了。也就表明我们的第一个 Spring Boot 项目开发完成了。

## 热部署

作为开发者，我们希望每次修改代码后，代码能够自动编译，服务能够自动重新加载，这样就省去了重新运行代码的烦恼。

那 spring-boot-devtools 就是这样的一个神器，当我们把它添加到项目当中后，无论是代码修改，还是配置文件修改，服务都能够秒级重载（俗称热部署），这在我们开发的时候，非常有用。

怎么才能开启热部署呢？

第一步，在 pom.xml 文件中添加依赖。

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

第二步，没有第二步了，哈哈。

直接修改代码来体验一下吧。我们修改 HelloController 内容为：

----

更多内容，只针对《Java程序员进阶之路》星球用户开放，需要的小伙伴可以[戳链接🔗](https://tobebetterjavaer.com/zhishixingqiu/)加入我们的星球，一起学习，一起卷。。**编程喵**🐱是一个 Spring Boot+Vue 的前后端分离项目，融合了市面上绝大多数流行的技术要点。通过学习实战项目，你可以将所学的知识通过实践进行检验、你可以拓宽自己的技术边界，你可以掌握一个真正的实战项目是如何从 0 到 1 的。

----

### 源码路径

>- 编程喵：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
>- helloworld：[https://github.com/itwanger/codingmore-learning](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-helloword)


---

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)