---
category:
  - Java企业级开发
tag:
  - Spring Boot
---


# Spring Boot为什么不需要额外安装Tomcat？

首次接触 Spring Boot 的时候，绝大多数小伙伴应该和我一样好奇：

>为什么 Spring Boot 不需要额外安装 Tomcat 啊？

到底为什么呢？让我们带着好奇心开始今天的旅程吧。

打开[上一节](https://mp.weixin.qq.com/s/13La2GC5q4ZclEVqf6Mr9w)我们搭建好的 tobebetterjavaer 项目，找到 pom.xml 文件，可以在里面看到一个 parent 属性，代码如下：

```
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>2.6.1</version>
	<relativePath/> <!-- lookup parent from repository -->
</parent>
```

什么意思呢？

意思是我们当前的 Spring Boot 项目依赖于 spring-boot-starter-parent 这个父项目。有点 Java 中的继承（extends）的味道。

怎么查看 spring-boot-starter-parent.pom 文件的内容呢？

如果你不确定自己的 Maven 本地仓库在哪里，可以在终端执行 `mvn help:effective-settings` 命令。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-01.png)


顺藤摸瓜，根据 parent 的 groupId、artifactId、version 可以锁定 spring-boot-starter-parent.pom 文件的位置。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-02.png)

使用文本编辑器打开以后大致可以看到以下内容：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-03.png)

- 定义了 JDK 的版本为 1.8
- 项目默认的编码方式为 UTF-8
- Maven 的编译环境
- 以及父依赖 spring-boot-dependencies

照葫芦画瓢，我们按照同样的方法找到 spring-boot-dependencies.pom 文件。可以看到这里面定义了一系列的属性和依赖，差不多 2800 行。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-04.png)

有消息队列依赖、commons 工具包依赖、数据库链接依赖、HTTP 链接依赖、Spring 家族依赖、Web 服务器依赖等等。

可以说这里是 Spring Boot 项目依赖的版本管理中心。

版本管理中心默认配置了项目所需的所有基础环境的版本，这些版本会随着 Spring Boot 版本的升级而不断变化，也就是说，开发人员不需要再关心这些琐碎依赖的版本了，交给大管家 Spring Boot 就可以了。

Spring Boot 会帮我们选好最稳定的新版本，这体现出了 Spring Boot 项目的灵魂：“**约定优于配置**”，你想配置当然可以，但没必要，按照约定俗成的来就行。

理解了这一点，我们再来继续看 pom.xml 文件，里面有一个 `spring-boot-starter-web` 依赖。这一次，我们直接按住 Ctrl 键（macOS 是 Command 键），点击鼠标左键就可以跳转到 spring-boot-starter-web.pom 的源文件了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-05.png)

部分源码如下：

```
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter</artifactId>
      <version>2.6.1</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-json</artifactId>
      <version>2.6.1</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
      <version>2.6.1</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>5.3.13</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.3.13</version>
      <scope>compile</scope>
    </dependency>
```

spring-web 提供了核心 HTTP 集成，包括一些便捷的 servlet 过滤器， Spring HTTP 调用，用于集成其它 web 框架的基础结构以及技术（Hessian，Burlap）。

spring-webmvc 是 Spring MVC 的一个实现。spring-webmvc 依赖于 spring-web，这样包含它就会间接地添加 spring-web，不必显示添加 spring-web。

看一下 spring-boot-starter-tomcat 的 pom 文件：

```
<?xml version="1.0" encoding="UTF-8"?>
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-tomcat</artifactId>
  <version>2.6.1</version>
  <name>spring-boot-starter-tomcat</name>
  <dependencies>
    <dependency>
      <groupId>jakarta.annotation</groupId>
      <artifactId>jakarta.annotation-api</artifactId>
      <version>1.3.5</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.apache.tomcat.embed</groupId>
      <artifactId>tomcat-embed-core</artifactId>
      <version>9.0.55</version>
      <scope>compile</scope>
      <exclusions>
        <exclusion>
          <artifactId>tomcat-annotations-api</artifactId>
          <groupId>org.apache.tomcat</groupId>
        </exclusion>
      </exclusions>
    </dependency>
    <dependency>
      <groupId>org.apache.tomcat.embed</groupId>
      <artifactId>tomcat-embed-el</artifactId>
      <version>9.0.55</version>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>org.apache.tomcat.embed</groupId>
      <artifactId>tomcat-embed-websocket</artifactId>
      <version>9.0.55</version>
      <scope>compile</scope>
      <exclusions>
        <exclusion>
          <artifactId>tomcat-annotations-api</artifactId>
          <groupId>org.apache.tomcat</groupId>
        </exclusion>
      </exclusions>
    </dependency>
  </dependencies>
</project>
```

从这里可以看出来SpringBoot默认的启动容器是Tomcat，Tomcat 的组成核心 jakarta.annotation、tomcat-embed-core、tomcat-annotations-api、org.apache.tomcat.embed 全部都通过 Maven 引入过来了。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-06.png)

core 的版本是 9.0.55，Tomcat 官网上最新的 9.0.x 版本是 9.0.56，高了一个版本。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-07.png)

不过无所谓，直接下载 9.0.56 的 src，对比看一下，是否大致相同。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/tomcat-08.png)

对比之下可以看得出，Spring Boot 引入的 Tomcat 更精简一点，大体上都是相同的，这也就是**为什么Spring Boot 不需要额外安装 Tomcat 的根本原因了**。

Spring Boot 的 starter 已经帮我们搞定过了。这也是Spring Boot 大行其道的重要原因，省去了开发人员配置的时间，更专注于业务逻辑的实现、性能的优化，至于那些繁杂的配置嘛，交给 Spring Boot 这个大管家就可以了，他约定好的东西，只要没问题，不需要特殊化定制，用就对了。

