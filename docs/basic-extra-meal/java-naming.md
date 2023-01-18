---
title: Java命名规范
shortTitle: Java命名规范
category:
  - Java核心
tag:
  - Java语法基础
description: Java程序员进阶之路，小白的零基础Java教程，Java命名规范，告别编码 5 分钟，命名 2 小时
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java命名规范,命名规范
---

## 3.2 Java命名规范

“二哥，Java 中的命名约定都有哪些呢？”三妹的脸上泛着甜甜的笑容，她开始对接下来要学习的内容充满期待了，这正是我感到欣慰的地方。

“对于我们中国人来说，名字也是有讲究的，比如说我叫沉默王二，你就叫沉默王三，哈哈。”我笑着对三妹说。

命名约定决定我们使用什么样的标识符来命名包、类、字段、方法等等，虽然这个规则不是强制的，可以遵守，也可以不遵守，但如果不遵守的话，就会带来很多不必要的麻烦。

起个好的名字，就好像穿一件得体的衣服，呈现给人的用户体验是完全不一样的。 

好的命名可以让你的代码更易读，包括你自己和你的小伙伴，看一眼，不用想太多，就能明白代码是干嘛的。

拿我这个笔名“沉默王二”来举例吧，读起来我就觉得朗朗上口，读者看到这个笔名就知道我是一个什么样的人——对不熟的人保持沉默，对熟的人妙语连珠，哈哈。

>当然了，如果你暂时记不住也没关系，后面再回头来记一下就好了。

### 01、包（package）

包的命名应该遵守以下规则：

- 应该全部是小写字母
- 点分隔符之间有且仅有一个自然语义的英语单词
- 包名统一使用单数形式，比如说 `com.itwanger.util` 不能是 `com.itwanger.utils`
- 在最新的 Java 编程规范中，要求开发人员在自己定义的包名前加上唯一的前缀。由于互联网上的域名是不会重复的，所以多数开发人员采用自己公司（或者个人博客）在互联网上的域名称作为包的唯一前缀。比如我文章中出现的代码示例的包名就是 `package com.itwanger`。


### 02、类（class）

类的命名应该遵守以下规则：

- 必须以大写字母开头
- 最好是一个名词，比如说 System
- 类名使用 UpperCamelCase（驼峰式命名）风格
- 尽量不要省略成单词的首字母，但以下情形例外：DO/BO/DTO/VO/AO/PO/UID 等

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/core-grammar/fifteen-01.png)

另外，如果是抽象类的话，使用 Abstract 或 Base 开头；如果是异常类的话，使用 Exception 结尾；如果是测试类的话，使用 Test 结尾。

### 03、接口（interface）

接口的命名应该遵守以下规则：

- 必须以大写字母开头
- 最好是一个形容词，比如说 Runnable
- 尽量不要省略成单词的首字母

来看个例子：

```java
interface Printable {}
```

接口和实现类之间也有一些规则：

- 实现类用 Impl 的后缀与接口区别，比如说 CacheServiceImpl 实现 CacheService 接口
- 或者，AbstractTranslator 实现 Translatable 接口

### 04、字段（field）和变量（variable）

字段和变量的命名应该遵守以下规则：

- 必须以小写字母开头
- 可以包含多个单词，第一个单词的首字母小写，其他的单词首字母大写，比如说 `firstName`
- 最好不要使用单个字符，比如说 `int a`，除非是局部变量
- 类型与中括号紧挨相连来表示数组，比如说 `int[] arrayDemo`，main 方法中字符串数组参数不应该写成 `String args[]`
- POJO 类中的任何布尔类型的变量，都不要加 is 前缀，否则部分框架解析会引起序列化错误，我自己知道的有 fastjson
- 避免在子类和父类的成员变量之间、或者不同代码块的局部变量之间采用完全相同的命名，使可理解性降低。子类、父类成员变量名相同，即使是 public 类型的变量也能够通过编译，另外，局部变量在同一方法内的不同代码块中同名也是合法的，这些情况都要避免。

反例：

```java
public class ConfusingName {
    public int stock;

    // 非 setter/getter 的参数名称，不允许与本类成员变量同名
    public void get(String alibaba) {
        if (condition) {
            final int money = 666;
// ...
        }
        for (int i = 0; i < 10; i++) {
// 在同一方法体中，不允许与其它代码块中的 money 命名相同 final int money = 15978;
// ...
        }
    }
}

class Son extends ConfusingName {
// 不允许与父类的成员变量名称相同 public int stock;
}
```

### 05、常量（constant）

常量的命名应该遵守以下规则：

- 应该全部是大写字母
- 可以包含多个单词，单词之间使用“_”连接，比如说 `MAX_PRIORITY`，力求语义表达完整清楚，不要嫌名字长
- 可以包含数字，但不能以数字开头

来看个例子：

```java
static final int MIN_AGE = 18;  
```


### 06、方法（method）

方法的命名应该遵守以下规则：

- 必须以小写字母开头
- 最好是一个动词，比如说 `print()`
- 可以包含多个单词，第一个单词的首字母小写，其他的单词首字母大写，比如说 `actionPerformed()`

来看个例子：

```java
void writeBook(){}
```

Service/DAO 层的方法命名规约：

- 获取单个对象的方法用 get 做前缀
- 获取多个对象的方法用 list 做前缀，复数结尾，如：listObjects
- 获取统计值的方法用 count 做前缀
- 插入的方法用 save/insert 做前缀
- 删除的方法用 remove/delete 做前缀
- 修改的方法用 update 做前缀


### 07、总结

除了以上这些规则以外，还有一些共同的规则需要遵守，比如说：

- 代码中的命名均不能以下划线或美元符号开始，也不能以下划线或美元符号结束。反例：`_name / __name / $name / name_ / name$ / name__`
- 所有编程相关的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。反例：`DaZhePromotion [打折] / getPingfenByName() [评分] / String fw[福娃] / int 某变量 = 3`
- 代码和注释中都要避免使用任何语言的种族歧视性词语。反例：`RIBENGUIZI / Asan / blackList / whiteList / slave`
- 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格。
- 杜绝完全不规范的缩写，避免望文不知义。反例：AbstractClass “缩写”成 AbsClass；condition “缩写”成 condi；Function 缩写”成 Fu，此类随意缩写严重降低了代码的可阅读性。
- 为了达到代码自解释的目标，任何自定义编程元素在命名时，使用尽量完整的单词组合来表达。
- 在常量与变量的命名时，表示类型的名词放在词尾，以提升辨识度。正例：`startTime / workQueue / nameList / TERMINATED_THREAD_COUNT`
- 如果模块、接口、类、方法使用了设计模式，在命名时需体现出具体模式。 将设计模式体现在名字中，有利于阅读者快速理解架构设计理念。比如说：`public class OrderFactory;public class LoginProxy;public class ResourceObserver;`
- 枚举类名带上 Enum 后缀，枚举成员名称需要全大写，单词间用下划线隔开。枚举其实就是特殊的常量类，且构造方法被默认强制是私有。比如说：`枚举名字为 ProcessStatusEnum 的成员名称：SUCCESS / UNKNOWN_REASON`。

-----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)