---
category:
  - Java企业级开发
tag:
  - Spring Boot
  - Vue
title: 如何在本地（Windows环境）跑起来编程喵（Spring Boot+Vue）项目源码？
shortTitle: Windows下如何运行编程喵源码
---

## 前置环境的准备

- 一台可以开机的电脑
- JDK 8
- Maven
- Intellij IDEA
- Visual Studio Code
- MySQL
- Redis
- OSS

对，编程喵 🐱（Spring Boot+Vue 的前后端分离项目）要想在本地跑起来，需要这 8 个前置环境。

第一个条件，一台可以开机的电脑，显然我相信大家都是有的。不然怎么学编程是吧？瞧我这废话真多。

这篇先以 Windows 为例，[macOS系统](https://tobebetterjavaer.com/springboot/macos-codingmore-run.html)戳这个链接。下图是我的备用机小米笔记本的配置。

![](https://upload-images.jianshu.io/upload_images/1179389-dd6753e1694a9e0e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


第二个条件，JDK 8，可以通过 [Chocolatey](https://tobebetterjavaer.com/gongju/choco.html)（Windows 软件包管理器）安装，非常方便（前提条件是你得科学上网，否则速度会非常慢，如果不能科学上网我也会提供另外一种常规的方式）。

![](https://upload-images.jianshu.io/upload_images/1179389-8457c803c368a300.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


执行 `choco -v` 可以查看 Chocolatey 版本。记得一定要以**管理员身份运行**，否则可以拿不到安装权限。

![](https://upload-images.jianshu.io/upload_images/1179389-06c7a5d2d1aaf906.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



执行 `choco install jdk8` 可以安装 JDK 8 了。

![](https://upload-images.jianshu.io/upload_images/1179389-de8a1ab58496f749.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

执行 `java -version` 可以查看当前 JDK 版本

![](https://upload-images.jianshu.io/upload_images/1179389-973b66b66b5828a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用 Chocolatey 安装 JDK 的好处就是不需要再配置环境变量。

如果没有安装 chocolatey 的话（或者没有外网权限的话），可以戳 [Downloads - Java SE 8 (oracle.com)](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html) 下载 JDK 8。

![](https://upload-images.jianshu.io/upload_images/1179389-41be31660d49a6e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之后一步步安装完成后，再配置一下环境变量就OK了。

![](https://upload-images.jianshu.io/upload_images/1179389-6e1d756fcea24cde.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



第三个条件，Maven，可以直接通过 `choco install maven` 来完成安装。

![](https://upload-images.jianshu.io/upload_images/1179389-df448c7dc3b4b80b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也可以戳 [Maven – Download Apache Maven](https://maven.apache.org/download.cgi) 下载免安装版。

![](https://upload-images.jianshu.io/upload_images/1179389-eb52c7c433ce2399.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之后配置到环境变量中。

![](https://upload-images.jianshu.io/upload_images/1179389-5578ebe44bd2a0da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


通过 `mvn -v` 来查看版本。


![](https://upload-images.jianshu.io/upload_images/1179389-0b087ccd1736d737.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

为了加快项目依赖包的下载速度，我们需要配置 Maven 的国内镜像源。

找到 Maven Home（`D:\download\apache-maven-3.8.5-bin\apache-maven-3.8.5`），复制一份 settings.xml。


![](https://upload-images.jianshu.io/upload_images/1179389-46b5b54455aeae96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


到 `C:\Users\yours\.m2` 路径下。


![](https://upload-images.jianshu.io/upload_images/1179389-2b1cdfc9bc87e2b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


打开 settings.xml 文件在 mirrors 节点下添加阿里云镜像地址，并保存。

```
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

第四个条件，Intellij IDEA，Java 后端开发必备神器，可以安装社区版，也可以安装旗舰版。

>[https://www.jetbrains.com/zh-cn/idea/download/#section=mac](https://www.jetbrains.com/zh-cn/idea/download/#section=mac)

![](https://upload-images.jianshu.io/upload_images/1179389-c3cf2013e647ef83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


第五个条件，Visual Studio Code，在编写前端代码（vue、JavaScript、css 等）时，比 Intellij IDEA 更值得信赖。

>[https://code.visualstudio.com/](https://code.visualstudio.com/)


![](https://upload-images.jianshu.io/upload_images/1179389-cc26413c1a06d2ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




第六个条件，MySQL，可以通过执行 `choco install mysql.installer` 在本机上安装 MySql 的工具箱。

![](https://upload-images.jianshu.io/upload_images/1179389-43a802e12d276500.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也可以戳 [MySQL :: Download MySQL Installer](https://dev.mysql.com/downloads/installer/) 直接下载 MySql的工具箱。


![](https://upload-images.jianshu.io/upload_images/1179389-ab53306e5d791c78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之后通过 MySql工具箱来安装 MySQL。

![](https://upload-images.jianshu.io/upload_images/1179389-7f4174aa0b55ff99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果觉得这个过程比较麻烦的话，也可以直接执行 `choco install mysql` 来安装MySQL。

也可以戳 [MySQL :: Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/) 下载MySQL安装包。

![](https://upload-images.jianshu.io/upload_images/1179389-2d889919254b7555.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




安装（记住MySQL的用户名和密码）完成后，可以在计算机管理面板里找到 MySQL 服务。

![](https://upload-images.jianshu.io/upload_images/1179389-6315b64515cec09c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


第七个条件，Redis，可以直接通过 `choco install redis` 来完成安装。

![](https://upload-images.jianshu.io/upload_images/1179389-db2ab4a9f5f77143.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也可以戳 [Releases · microsoftarchive/redis · GitHub](https://github.com/microsoftarchive/redis/releases) 下载 Redis。

![](https://upload-images.jianshu.io/upload_images/1179389-955d7ad532810577.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下载完直接安装。

![](https://upload-images.jianshu.io/upload_images/1179389-d308b6cc7a55afd5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

安装完成后，可以在计算机管理面板里找到Redis服务。

![](https://upload-images.jianshu.io/upload_images/1179389-fdd6ed8d961f84ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果下载的是绿色版免安装版，只需要把 zip 包解压就可以了。

![](https://upload-images.jianshu.io/upload_images/1179389-4a871e1b076e20db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


在解压目录下，你会发现一份叫 Windows Service Documentation.docx 的文件，里面详细地说明了 Redis 服务的注册/卸载方式，以及启动/停止方式。

![](https://upload-images.jianshu.io/upload_images/1179389-6230585aa70eb657.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

复制对应命令在 CMD 命令行下执行就OK了。

![](https://upload-images.jianshu.io/upload_images/1179389-16748b991dbda3c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



第八个条件，OSS，主要用来保存图片，可以通过阿里云官方去购买服务，并且创建 Bucket。

![](https://files.mdnice.com/user/3903/57ed3485-d125-480a-92d0-45282c5acaab.png)

然后配置 AccessKey。

![](https://files.mdnice.com/user/3903/2d9dff4d-34b7-4f75-890f-1306b07313a7.png)

针对[星球用户](https://tobebetterjavaer.com/zhishixingqiu/)，我会开放自己的 accessKeyId 和 accessKeySecret，请勿外泄，免得被恶意攻击。

## 下载编程喵（codingmore）源码

编程喵一共有三个仓库，分别是：

> - coding-more：编程喵 admin 后端 + Web 前后端，GitHub 地址：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more) 
> - codingmore-admin-web：编程喵 admin 前端，地址：[https://github.com/itwanger/codingmore-admin-web](https://github.com/itwanger/codingmore-admin-web)
> - codingmore-learning：编程喵学习教程（手把手），地址：[https://github.com/itwanger/codingmore-learning](https://github.com/itwanger/codingmore-learning)

![](https://files.mdnice.com/user/3903/1ec6efc4-760c-4df7-96af-281d020ec7e3.png)

编程喵 🐱 是一个非常纯粹的前后端分离项目，后端用到的技术包括：

- Spring Boot 容器+MVC 框架
- SpringSecurity 认证和授权框架
- MyBatis ORM 框架
- MyBatis-Plus MyBatis 增强工具
- Nginx 静态资源服务器
- Druid 数据库连接池
- OSS 对象存储
- Redis 缓存中间件
- MySQL 关系型数据库
- Swagger-UI 文档生成工具
- Knife4j Swagger 美化增强工具
- Hibernator-Validator 验证框架
- Logback 日志框架
- Lombok 简化对象封装工具
- Hutool Java 工具类库

前端用到的技术包括：

- Vue 前端框架
- Vue-router 路由框架
- Vuex 全局状态管理框架
- Element 前端 UI 框架
- Axios 前端 HTTP 框架
- Js-cookie cookie 管理工具
- nprogress 进度条控件

**第一步，下载 coding-more 源码**，戳[链接 🔗](https://github.com/itwanger/coding-more)进入到该页面。

![](https://upload-images.jianshu.io/upload_images/1179389-f8e206aebb1c2887.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


第二步，如果安装有 GitHub 桌面版的话，可以点击「open with GitHub desktop」，也可以在这一步下载安装GitHub 桌面版。

![](https://upload-images.jianshu.io/upload_images/1179389-658094448696d74d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

也可以点击「download zip」。

第三步，通过 Intellij IDEA 导入新项目就可以了，第一次导入的话，需要等待Maven下载依赖包。

![](https://upload-images.jianshu.io/upload_images/1179389-a63d299559d646b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


第四步，下载 codingmore-admin-web 源码，戳[链接 🔗](https://github.com/itwanger/codingmore-admin-web)进入到该页面。

![](https://upload-images.jianshu.io/upload_images/1179389-a237ff9aeefa82d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


源码下载完毕后，建议通过 VS Code 导入项目，VS Code 对前端项目比 Intellij IDEA 更加友好。

![](https://upload-images.jianshu.io/upload_images/1179389-e8e0e0768d87257e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 部署编程喵（codingmore）源码



### 01、MySQL

第一步，安装 Navicat，这是一个图形化界面的数据库管理工具。

![](https://upload-images.jianshu.io/upload_images/1179389-3692346a14798f8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


安装完毕后，输入 MySQL 数据库的用户名和密码，建立本地连接。

![](https://upload-images.jianshu.io/upload_images/1179389-66ae196af76bf002.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


第二步，打开链接，新建数据库 codingmore，导入编程喵的 DB 文件。DB 文件放在 coding-more/doc 目录下。

![](https://upload-images.jianshu.io/upload_images/1179389-e01d463b77835a48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

导入成功后，可以看到目前 codingmore 所用到的 27 个数据库文件，其中 qrtz 开头的是定时任务的持久化表，剩余是编程喵的数据库表文件。


![](https://upload-images.jianshu.io/upload_images/1179389-0a06994138de8f44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


然后，修改 `codingmore-admin/src/main/resources/application-dev.yml` 文件中的 spring.datasource.username、password、url 等，该为你本地的用户名、密码和数据库链接地址（Web 管理端）。


![](https://upload-images.jianshu.io/upload_images/1179389-2d9b1c4f48928db3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


修改 `codingmore-web/src/main/resources/application-dev.yml` 文件中的 spring.datasource.username、password、url 等，该为你本地的用户名、密码和数据库链接地址（Web 前端）。


![](https://upload-images.jianshu.io/upload_images/1179389-d835c3b9566fb923.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 02、Redis

在计算机管理面板里启动Redis服务。

![](https://upload-images.jianshu.io/upload_images/1179389-0d153d527097a91b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后，修改 `codingmore-admin/src/main/resources/application-dev.yml` 文件中的 spring.redis.host、database、port、password、timeout 等，该为你本地的 Redis 链接信息，一般默认就好（Web 管理端）。

![](https://upload-images.jianshu.io/upload_images/1179389-22a09a1ebcfffefd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


修改 `codingmore-web/src/main/resources/application-dev.yml` 文件中的 spring.redis.host、database、port、password、timeout 等，该为你本地的 Redis 链接信息，一般默认就好（Web 前端）。


![](https://upload-images.jianshu.io/upload_images/1179389-644c89431128fc72.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 04、OSS

非[星球用户](https://tobebetterjavaer.com/zhishixingqiu/)需要自己购买阿里云的 OSS 服务和 CDN 服务。[星球用户](https://tobebetterjavaer.com/zhishixingqiu/)可以直接私信我获取 accessKeyId 和 accessKeySecret。

然后修改 `codingmore-admin/src/main/resources/application-dev.yml` 文件中的 aliyun.cdn、oss 等。


![](https://upload-images.jianshu.io/upload_images/1179389-14260396ec8dd866.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 05、codingmore-admin

在 Intellij IDEA 中运行 CodingmoreAdminBootstrap 主类，启动管理端后台服务。

![](https://upload-images.jianshu.io/upload_images/1179389-ad78fcfdd8d75571.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如果编译失败，注意调整 JDK 版本为 Java 8。

![](https://upload-images.jianshu.io/upload_images/1179389-66035a213913c001.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 06、codingmore-web

在 Intellij IDEA 中运行 CodingmoreAdminBootstrap 主类，启动管理端后台服务。

![](https://upload-images.jianshu.io/upload_images/1179389-6d0e1b7bac062066.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


启动后，可以直接在浏览器地址栏输入 `http://localhost:8081` 访问 Web 前端。


![](https://upload-images.jianshu.io/upload_images/1179389-5a79b629a1271612.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 07、codingmore-admin-web


在 vscode 中打开终端，执行 `yarn install` 添加项目依赖（yarn 是 Facebook 为 node.js 运行时环境开发软件打包工具，是 npm 软件包管理器的替代品）。

如果没有安装 yarn 的话，会出现以下错误。

![](https://upload-images.jianshu.io/upload_images/1179389-f4aee52c1e0e36ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以直接以管理员模式执行 `choco install yarn` 来安装 yarn 包。

![](https://upload-images.jianshu.io/upload_images/1179389-7b284384225ceed3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果没有安装 chocolatey 的话，需要戳 [Download | Node.js (nodejs.org)](https://nodejs.org/en/download/) 先安装node.js：

![](https://upload-images.jianshu.io/upload_images/1179389-2a12d5b2d70bba34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

强烈推荐大家安装 chocolatey，安装 node.js 的时候也会出现 chocolatey的影子。

![](https://upload-images.jianshu.io/upload_images/1179389-aeb86e24f846f3bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再执行 `npm install -g yarn` 来安装 yarn。安装成功后，重新打开 vscode，执行 `yarn -v` 就可以查看 yarn 的版本了。

![](https://upload-images.jianshu.io/upload_images/1179389-a109ff61e2e89308.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再次执行 `yarn install` 安装前端环境。之后执行 `yarn run dev` 编译 admin 前端。


![](https://upload-images.jianshu.io/upload_images/1179389-bcc2e460ef388743.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


在浏览器地址栏输入 `http://localhost:8080` 就可以访问到了。

![](https://upload-images.jianshu.io/upload_images/1179389-6b1a1453a7006044.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


可以点击「获取体验账号」的方式获取登录用户名和密码。当然了，你也可以直接在 users 表上暴力破解密码。

![](https://upload-images.jianshu.io/upload_images/1179389-5176d666f06d73f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


[星球用户](https://tobebetterjavaer.com/zhishixingqiu/)可以直接私信我获取超级管理员的密码。登录后就可以看到文章列表啦。


![](https://upload-images.jianshu.io/upload_images/1179389-ea675a8c580ebf07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是文章编辑页，是不是非常清爽？

![](https://upload-images.jianshu.io/upload_images/1179389-990baeca8e49829e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


好了，[MacOS 版](https://tobebetterjavaer.com/springboot/macos-codingmore-run.html)和Windows版如何下载编程喵源码，如何在本地跑起来的整个演示过程就告一段落辣，我们回头见！
