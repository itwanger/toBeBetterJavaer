---
title: chiner：干掉 PowerDesigner，国人开源的数据库设计工具，界面漂亮，功能强大
shortTitle: chiner：国人开源的数据库设计工具
category:
  - Java企业级开发
tag:
  - 辅助工具
description: chiner：干掉 PowerDesigner，国人开源的数据库设计工具，界面漂亮，功能强大
head:
  - - meta
    - name: keywords
      content: 辅助工具,GitHub,pdman chiner,PDM 工具,数据库设计,PowerDesigner chiner,Java企业级开发
---

最近在造轮子，从 0 到 1 的那种，就差前台的界面了，大家可以耐心耐心耐心期待一下。其中需要设计一些数据库表，可以通过 Navicat 这种图形化管理工具直接开搞，也可以通过一些数据库设计工具来搞，比如说 PowerDesigner，更专业一点。

 今天我给大家推荐的这款国人开源的数据库设计工具 chiner，界面漂亮，功能强大，体验后给我的感觉是真香......

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-1.png)


## 一、关于 PowerDesigner

PowerDesigner 是一款功能非常强大的建模工具，可以和 Rational Rose 媲美。Rose 专攻 UML 对象模型的建模，之后才拓展到数据库这块。而 PowerDesigner 是一开始就为数据库建模服务的，后来才发展为一款综合战斗力都还不错的建模工具。

不过，说句实在话，PowerDesigner 的界面偏古典一些，下面是我用 PowerDesigner 设计 DB 的效果。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-2.png)

## 二、关于 chiner

chiner，发音：[kaɪˈnər]，使用React+Electron+Java技术体系构建的一款元数建模平台。

2018 年，作者和几个对开源有兴趣的社区好友开始打磨产品的原因，历经三代，直到 2021 年 7 月份，终于推出了船新的 3.0 版本。

2019 年底，团队差点解散，幸好有几位好友关照，给了团队两个项目做，这才算是熬了过去。

不得不说，做任何一件事情都不容易啊，光靠情怀也许可以撑过产品初期，但越往后去，遇到生存问题时，就会非常困难。

在此，我们必须得为每一位开源作者奉上最真诚的掌声，希望他们的产品都能有一番天地。也希望，未来我的产品出现在大家的面前时，能给它多一点点包容和支持。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-3.gif)

## 三、安装 chiner

chiner 支持 Windows、macOS 和 Linux，下载地址如下所示：

>[https://gitee.com/robergroup/chiner/releases](https://gitee.com/robergroup/chiner/releases)

码云做了外部链接的拦截，导致直接复制链接到地址栏才能完成下载。我这里以 macOS 为例。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-4.png)

安装完成后首次打开的样子是这样的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-5.png)

chiner 提供了非常贴心的操作手册和参考模板，如果时间比较充分的话，可以先把操作手册过一遍，写得非常详细。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-6.png)

## 四、上手 chiner

### **01、导入导出**

因为我之前有一份 PowerDesigner 文件，所以可以直接导入到 chiner。

第一步，新建一个项目 codingmore。

第二步，选择导入 PowerDesigner 文件。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-7.png)

第三步，选择要添加的数据表。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-8.png)

第四步，导入完成后，就可以点开单表进行查看了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-9.png)

第五步，当完成重新设计后，就可以选择导出 DDL 到数据库表了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-10.png)

当然了，也可以直接配置数据库 DB，这样就可以直接连接导入导出了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-11.png)

导出的 SQL 文件可以直接通过宝塔面板上传到服务器端，然后再直接导入到数据库。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-12.png)

如果需要用到数据库说明文档的话，也可以直接通过导出到 Word 文档来完成。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-13.png)

### **02、维护数据类型**

chiner 自带了几种常见的数据类型，比如字串、小数、日期等，我们也可以根据自己的需要添加新的数据类型。

比如说默认的字串类型关联到其他数据库的类型如下所示：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-14.png)

数据域是在数据类型的基础上，基于当前项目定义的有一定业务含义的数据类型，比如说我这里维护了一个长度为 90 的名称数据域。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-15.png)

当我需要把某个数据字段的数据域设置成「名称」的时候，长度就会自动填充为 90，不需要手动再去设置。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-16.png)

### **03、维护数据表**

第一步，选中数据表，右键选择「新增数据表」

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-17.png)

第二步，填写数据表名

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-18.png)

点击「确定」后，chiner 会帮我们自动生成一些常见常用的字段，比如说创建人、创建时间、更新人、更新时间等，非常的智能化。通常来说，这些字段都是必须的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-19.png)

如果这些默认字段不满足需求的时候，还可以点击「设置」新增默认字段，比如说删除标记，一般来说为了安全起见，数据库都会采用非物理删除。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-20.png)

一般来说，我们更习惯字段小写命名，因此可以直接选中一列，然后选择大小写转换。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-21.png)

就变成小写了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-22.png)

### **04、维护关系图**

第一步，选择「关系图」，右键选择「新增关系图」

第二步，把需要关联的表拖拽到右侧的面板当中，然后按照字段进行连线，非常的方便。比如说班级和学院表、班级和专业表的关系，就如下图所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-23.png)

来看一下整体给出来的关系图，还是非常清爽的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/chiner-24.png)

## 五、尾声

chiner 还有更多更强大的功能，大家觉得不错的话，可以去尝试一下。用的熟练的话，肯定能在很大程度上提高生产效率。

就我个人的使用体验来说，chiner 比 PowerDesigner 更轻量级，也更符合日常的操作习惯，为国产开源点赞！

项目地址：

>[https://gitee.com/robergroup/chiner](https://gitee.com/robergroup/chiner)

使用手册：

>[https://www.yuque.com/chiner/docs/manual](https://www.yuque.com/chiner/docs/manual)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)