---
title: Android 安卓学习路线（建议收藏🔥）
shortTitle: Android 开发者学习路线
description: Android 安卓学习路线（建议收藏🔥）
category:
  - 学习路线
tag:
  - 学习路线
head:
  - - meta
    - name: keywords
      content: Android,Performance,AndroidPerformance,性能,优化,性能优化,Perf,Flutter,Linux,AndroidFramework,Framework,Android Performance,Flutter,Kotlin,Memory,内存,流畅性,卡顿,响应速度,Jank,Smooth,Android Framework,ANR,Crash,Dalvik,ART,Jetpack,Compose
---

有球友问二哥有没有安卓方面的学习路线，虽然二哥不是一名专业的安卓工程师，曾经也装模作样的学过一段时间的安卓，买过郭霖的《[第一行代码安卓](https://github.com/itwanger/JavaBooks#android)》，目前应该已经出到第三版了，在业界还是挺有名望的。

虽然不是专业的安卓工程师，但给球友提供一份靠谱的学习路线，二哥还是有这个实力的，知道哪里好哪里坏，如果你是新手，那么下面的内容可以帮助你找到学习的线路；如果你是老手，这篇文章列出的内容也可以帮助你查漏补缺。如果各位有什么其他的建议，欢迎留言交流。

# 推荐资料

- 1、[第一行代码 Android（书籍）](https://github.com/itwanger/JavaBooks#android)
- 2、[Android Tech And Perf（博客）](https://www.androidperformance.com/)
- 3、[2022 最新 Android 基础教程，从开发入门到项目实战（视频）](https://www.bilibili.com/video/BV19U4y1R7zV)
- 4、[关注 Android Jetpack开发：原理解析与应用实战（书籍，二哥写过推荐序）](https://e.jd.com/30816230.html)
- 5、[Flutter实战入门（书籍，二哥写过推荐序）](https://e.jd.com/30622790.html)

# [](#Programming "Programming")Programming

## [](#Java "Java")Java

Java 是 Android App 开发默认的语言, Android Framework 也是默认使用 Java 语言，熟练掌握 Java 语言是 Android 开发者的必备技能。

希望深入 Java 虚拟机的同学，也可以参考下面两本书：

1.  周志明的[《深入理解Java虚拟机（第3版）》](https://book.douban.com/subject/34907497/)
2.  邓老师的 [《深入理解Android Java 虚拟机 ART》](https://book.douban.com/subject/33390277/)

## [](#Kotlin "Kotlin")Kotlin

Google 几年前就开始走 “Kotlin First” 的路线，目前很多官方的文档和 Demo 都是使用 Kotlin 语言作为默认，Kotlin 的重要性不言而喻。

Google 官方也出了个[“Refactoring to Kotlin”](https://clmirror.storage.googleapis.com/codelabs/java-to-kotlin-zh/index.html#0)的教程,其介绍如下：

> 此 Codelab 的适用对象为任何使用 Java 并考虑将其项目迁移到 Kotlin 的开发者。我们将从数个 Java 类入手，引导您使用 IDE 将它们转换为 Kotlin。接着，我们会审视转换后的代码，研究如何加以改善，使其更符合使用习惯，同时避免常见错误

## [](#Flutter "Flutter")Flutter

[Flutter](https://github.com/flutter/flutter) 作为 Google 的亲儿子，其官方的扶持力度大家有目共睹。 

Flutter 的发展大家可以看一下 Gityuan 的这一篇[Flutter 跨平台演进及架构开篇](http://gityuan.com/flutter/),目前字节跳动的多个 App 已经接入 Flutter 进行混合开发。

# [](#Android-Studio "Android Studio")Android Studio

## [](#Android-Studio-IDE-Overview "Android Studio IDE Overview")Android Studio IDE Overview

Android Studio 作为 Android 默认的开发者工具，目前的版本更新已经解决了诸多之前的性能问题，虽然目前对硬件资源的要求仍然比较高，但是一旦你接受了这个设定，真香预警！

AS 主要需要熟悉下面几点

1.  AS 快捷键
2.  AS 插件
3.  AS Profile （内存、CPU、IO、NetWork）

## [](#Project-Structure-—-Java-Kotlin-Flutter-XML-gradle-files "Project Structure — Java/Kotlin/Flutter, XML, .gradle files")Project Structure — Java/Kotlin/Flutter, XML, .gradle files

熟悉各种项目的目录结构，资源文件、Gradle 文件

# [](#Android-基础知识 "Android 基础知识")Android 基础知识

## [](#四大组件 "四大组件")四大组件

这部分不必做过多的解释，下面列出的就是大家熟悉的 Android 四大组件，Android 开发的基础

1.  Activity — Activity Lifecycle, Tasks & Back Stack
2.  Service
3.  Broadcast Receiver
4.  Content Provider

## [](#Intents "Intents")Intents

1.  Types of Intent - Implicit, Explicit
2.  Intent Filter

## [](#Static-User-Interface "Static User Interface")Static User Interface

1.  View — Button, ImageView, TextView, EditText, and etc :这是开发中会遇到的常用的组件，许多复杂的布局都是用简单基础的 View 组合而成
2.  ViewGroup - LinearLayout, RelativeLayout, FrameLayout:三大传统布局，适用于不同的场合
3.  ConstraintLayout : Google 新推的布局，目前已经取代 RelativeLayout 成为默认的 App 布局，具体使用可以参考[官方文档](https://developer.android.google.cn/reference/android/support/constraint/ConstraintLayout?hl=zh-cn)

## [](#Dynamic-User-Interface "Dynamic User Interface")Dynamic User Interface

1.  RecyclerView - 列表类的布局首选控件，性能相对 ListView 要好一些，功能也比 ListView 要多一些
2.  ViewPager
3.  Spinner

## [](#CustomView "CustomView")CustomView

Android 默认的布局很多时候都没法满足设计的需求，这时候就需要自定义 View，你需要掌握下面几个知识点的使用

1.  Canvas
2.  Bitmap
3.  Paint

## [](#UI-Resources "UI Resources")UI Resources

相比 HardCode，使用资源文件会让代码的可修改性更高

1.  Drawables
2.  String
3.  Styles

## [](#Fragments "Fragments")Fragments

许多人提倡 App 使用 单 Activity + 多个 Fragment 的组合，可见 Fragment 在开发中的重要性，但是 Fragment 的管理又是一门技术，Fragment 的坑，只能在实际开发中慢慢填平了，不过下面的 Fragment 基础还是要牢固

1.  Fragment Lifecycle
2.  Fragment Manager

## [](#Support-User-Interface "Support User Interface")Support User Interface

这里列的同样是一些功能组件，需要知道这是什么东西，基本的用法

1.  ProgressBar - 进度条
2.  Dialogs - 弹框
3.  Toast & Snackbar - 提示

## [](#Storage "Storage")Storage

App 开发不免要和文件打交道，文件的读写、存储都是必不可少的，下面列出了几种 Android 中存储相关的知识点

1.  Shared Preferences - 适合存储字段
2.  File Systems - 文件存储
3.  Database — RoomDB - 数据库存储，RoomDB 是 Google 新推出的数据库解决方案(在 AndroidX 中)，具体使用可以参考[官方文档](https://developer.android.google.cn/reference/androidx/room/RoomDatabase.html)

## [](#Build "Build")Build

Android App 默认使用 Gradle 进行编译，关于 Gradle 的使用必须要熟悉，以及如何区分开发版本和 Release 版本，以及国内特有的多渠道打包技术、以及 ASM 等

1.  Gradle
2.  Debug / Release Configuration
3.  多渠道打包
4.  ASM

## [](#Threading "Threading")Threading

理解 Thread 非常重要，Android App 只有一个主线程，其余的我们称之为工作线程，我们的很多工作需要再工作线程和主线程直接切换，如何高效创建和释放线程、线程池、线程间通信、Message-Looper-Handler 模型这些知识点都要了熟于心，另外进阶的话 Binder 通信也是需要掌握的知识

1.  Threads
2.  Handler / Looper / Message / MessageQueue
3.  AIDL / Binder

# [](#Debugging "Debugging")Debugging

这里列举了一些 Debug 的基本手段，实际开发中遇到具体问题的时候一般都会用到，不过有的可能入手难度要高一些，需要花时间去掌握。Debug 工具除了下面这几个还有很多

1.  Memory profiling - MAT，AS Memory Profile
2.  Logging - Log 包含非常丰富的信息，可以帮助我们还原现场
3.  Systrace - Systrace 工具可以查看一段时间内手机系统各个进程的运行状态，具体使用可以参考我博客的 [Systrace 系列教程](https://www.androidperformance.com/2019/05/28/Android-Systrace-About/)
4.  Exceptions - 各种异常，保证程序的健壮性
5.  Error Handling - Error 是必须要解决的问题，一般会导致 App 直接闪退，需要非常重视

# [](#Memory-Leak "Memory Leak")Memory Leak

内存泄漏是一个很大的专题，包括 Java 内容泄漏和 Native 内存泄漏，涉及的知识点非常多，可以单独拿出来做一个大的知识栈。一般来说， Java 内存泄漏会比较好检测和修复，但是 Native 内存泄漏就会比较难。

1.  Detecting and Fixing Memory Leaks - 内存泄漏检测和修复，是一个比较大的工程，可以参考 LeakCanary、Matrix 等开源工具
2.  Context - 使用不当会造成该释放的对象没有释放造成内存泄漏
3.  Native Memory Leaks

# [](#3rd-Party-Library "3rd Party Library")3rd Party Library

经典的第三方类库，可以大幅节约我们的开发时间

1.  Image Loading - Glide, Picasso
2.  Dependency Injection - Dagger
3.  Networking - Fast Android Networking Library, Retrofit
4.  MultiThreading - RxJava, Coroutines

# [](#Data-Format "Data Format")Data Format

常见的一些数据保存流格式

1.  JSON — GSON
2.  Flat Buffer
3.  Protocol Buffer

# [](#Android-Jetpack "Android Jetpack")Android Jetpack

[Jetpack](https://developer.android.google.cn/jetpack?hl=zh-cn) 是 Google 推出的一套库、工具和指南，可帮助开发者更轻松地编写优质应用。这些组件可帮助您遵循最佳做法、让您摆脱编写样板代码的工作并简化复杂任务，以便您将精力集中放在所需的代码上。Jetpack 包含与平台 API 解除捆绑的 androidx.\* 软件包库。这意味着，它可以提供向后兼容性，且比 Android 平台的更新频率更高，以此确保您始终可以获取最新且最好的 Jetpack 组件版本。

这部分推荐一个读者的书《[关注 Android Jetpack开发：原理解析与应用实战](https://e.jd.com/30816230.html)》，二哥为此写过推荐语，封面可见。

1.  Foundation Components — AppCompat, Android KTX, Multidex
2.  Architecture Components — LiveData, ViewModel, DataBinding, Paging, Work Manager, Navigation
3.  Behaviour Components - Download Manager, Media Playback, Notification, Permissions, Preference, Sharing, Slice
4.  UI Component - Animation & Transition, Android Auto, Emoji, Palette, Android TV, Android Wear

# [](#Architecture "Architecture")Architecture

传统的开发架构，没有绝对的哪个好哪个不好，只有哪个适合哪个不适合，下面三种你都应该知道并有一定的了解

1.  MVVM - MVVM 是 Model-View-ViewModel的简写。它本质上就是 MVC 的改进版。MVVM 就是将其中的 View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开
2.  MVI ？
3.  MVP - MVP 从更早的 MVC 框架演变过来，与 MVC 有一定的相似性：Controller/Presenter 负责逻辑的处理，Model 提供数据，View 负责显示

# [](#Unit-Testing "Unit Testing")Unit Testing

1.  Local Unit Testing
2.  Instrumentation Testing

# [](#Firebase "Firebase")Firebase

Firebase 国内很多开发者用不到，这里简单看一下即可（说不定哪天国内就可以用了呢）

1.  FCM
2.  Crashlytics
3.  Analytics
4.  Remote Config
5.  App Indexing
6.  Dynamic Link

# [](#Security "Security")Security

安全方面接触毕竟多的应该是加密、解密、混淆等，毕竟用户数据安全大于一切，不重视这个欧盟会教你做人

1.  Encrypt / Decrypt
2.  Proguard
3.  R8

# [](#App-Release "App Release")App Release

应用发布相关的知识，国内还得加上多渠道打包、插件化

1.  .keystore file
2.  App Bundle
3.  Playstore
4.  多渠道打包
5.  插件化

# [](#Keep-Learning-and-Improving "Keep Learning and Improving")Keep Learning and Improving

作为一个有进取心的 Android 开发者，拥有自己的技术栈和规划非常重要，技术栈确保你有足够的市场竞争力，从而形成护城河；技术规划则可以给你一个明确的学习目标。卸载抖音、微博、斗鱼、游戏吧，做好一年的规划，**Keep Learning and Improving** ，共勉

如果你苦于没有好的时间管理方法，可以参考这个视频[我是怎么做周计划 | 生产力提升 | 我的方法](https://www.bilibili.com/video/av79348217),这个是我熟悉的一个大佬的工作学习方法实践，推荐给大家

> 凡是预则立，不预则废，年度计划太长，日计划又太短。实践下来发现以周为单位做时间管理（时间管理）最靠谱，既考虑了短期又考虑了长期，可以使自己长期坚持做某事，也有一定的时间长度用来甄有价值的事情。



---------

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
