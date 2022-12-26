---
title: 终于实现了一门属于自己的编程语言
shortTitle: 终于实现了一门属于自己的编程语言
description: 前言都说程序员的三大浪漫是：操作系统、编译原理、图形学；最后的图形学确实是特定的专业领域，我们几乎接触不到，
author: crossoverJie
category:
  - 微信公众号
---

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-fbfe254a-2e14-4214-aad6-56a53b143cf7.jpg)

## 前言

都说程序员的三大浪漫是：操作系统、编译原理、图形学；最后的图形学确实是特定的专业领域，我们几乎接触不到，所以对我来说换成网络更合适一些，最后再加上一个数据库。

这四项技术如果都能掌握的话那岂不是在 IT 行业横着走了，加上这几年互联网行业越来越不景气，越底层的技术就越不可能被替代；所以为了给自己的 30+ 危机留点出路，从今年上半年开始我就逐渐开始从头学习编译原理。

功夫不负有心人，经过近一个月的挑灯夜战，每晚都在老婆的催促下才休息，克服了中途好几次想放弃的冲动，终于现在完成了 GScript 一个预览版。

> 预览版的意思是语法结构与整体设计基本完成，后续更新也不太会改动这部分内容、但还缺少一些易用功能。

## 特性

首先来看看保留环节， GScript 是如何编写 `hello world` 的。

hello\_world.gs:

```
println("hello world");
```

```
❯ gscript hello_world.gs
hello world
```

废话说完了接下来重点聊聊 `GScript` 所支持的特性了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-8a0c03dc-551e-4aad-92da-855f7d7246a9.jpg)

后文会重点说明每一个特性。

## 例子

除了刚才提到的 hello world，再来看一个也是示例代码经常演示的`打印斐波那契数列`。

```
void fib(){
    int a = 0;
    int b = 1;
    int fibonacci(){
        int c = a;
        a = b;
        b = a+c;
        return c;
    }
    return fibonacci;
}
func int() f = fib();
for (int i = 0; i < 5; i++){
    println(f());
}
```

输出结果如下：

```
0
1
1
2
3
```

整体写法与 Go 官方推荐的类似：https://go.dev/play/p/NeGuDahW2yP

```
// fib returns a function that returns
// successive Fibonacci numbers.
func fib() func() int {
 a, b := 0, 1
 return func() int {
  a, b = b, a+b
  return a
 }
}
func main() {
 f := fib()
 // Function calls are evaluated left-to-right.
 fmt.Println(f(), f(), f(), f(), f())
}
```

都是通过闭包变量实现的，同时也展示了 `GScript` 对闭包、函数的使用，后文详细介绍闭包的用法。

## 语法

`GScript` 的语法与常见的 `Java/Go` 类似，所以上手非常简单。

### 基本类型

先来看看基本类型，目前支持 `int/string/float/bool` 四种基本类型以及 `nil` 特殊类型。

变量声明语法和 `Java` 类似：

```
int a=10;
string b,c;
float e = 10.1;
bool f = false;
```

个人觉得将类型放在前面，代码阅读起来会更清晰一些，当然这也是个人喜好。

### 数组

```
// 声明并初始化
int[] a={1,2,3};
println(a);

// 声明一个空数组并指定大小
int[] table = [4]{};

println();
// 向数组 append 数据
a = append(a,4);
println(a);
for(int i=0;i<len(a);i++){
 println(a[i]);
}

// 通过下标获取数组数据
int b=a[2];
println(b);
```

其实严格来讲这并不算是数组，因为它的底层是用 `Go` 切片实现的，所以可以动态扩容。

以这段代码为例：

```
int[] a=[2]{};
println("数组大小:"+len(a));
a = append(a,1);
println("数组大小:"+len(a));
println(a);
a[0]=100;
println(a);
```

输出：

```
数组大小:2
数组大小:3
[<nil> <nil> 1]
[100 <nil> 1]
```

### Class

类的支持非常重要，是实现面向对象的基础，目前还未完全实现面向对象，只实现了数据与函数的封装。

```
class ListNode{
    int value;
    ListNode next;
    ListNode(int v, ListNode n){
        value =v;
        next = n;
    }
}

// 调用构造函数时不需要使用 new 关键字。
ListNode l1 = ListNode(1, nil);

// 使用 . 调用对象属性或函数。
println(l1.value);
```

缺省情况下 `class` 具有无参构造函数：

```
class Person{
 int age=10;
 string name="abc";
 int getAge(){
  return 100+age;
 }
}

// 无参构造函数
Person xx= Person();
println(xx.age);
assertEqual(xx.age, 10);
println(xx.getAge());
assertEqual(xx.getAge(), 110);
```

得益于 `class` 的实现，结合刚才的数组也可以定义出自定义类型的数组：

```
// 大小为 16 的 Person 数组
Person[] personList = [16]{};
```

### 函数

函数其实分为两类：

*   普通的全局函数。
*   类的函数。

本质上没有任何区别，只是所属范围不同而已。

```
// 判断链表是否有环
bool hasCycle(ListNode head){
    if (head == nil){
        return false;
    }
    if (head.next == nil){
        return false;
    }

    ListNode fast = head.next;
    ListNode slow = head;
    bool ret = false;
    for (fast.next != nil){
        if (fast.next == nil){
            return false;
        }
        if (fast.next.next == nil){
            return false;
        }
        if (slow.next == nil){
            return false;
        }
        if (fast == slow){
            ret = true;
            return true;
        }

        fast = fast.next.next;
        slow = slow.next;
    }
    return ret;
}

ListNode l1 = ListNode(1, nil);
bool b1 =hasCycle(l1);
println(b1);
assertEqual(b1, false);

ListNode l4 = ListNode(4, nil);
ListNode l3 = ListNode(3, l4);
ListNode l2 = ListNode(2, l3);
bool b2 = hasCycle(l2);
println(b2);
assertEqual(b2, false);

l4.next = l2;
bool b3 = hasCycle(l2);
println(b3);
assertEqual(b3, true);
```

这里演示了链表是否有环的一个函数，只要有其他语言的使用基础，相信阅读起来没有任何问题。

```
add(int a){}
```

> 当函数没有返回值时，可以声明为 void 或直接忽略返回类型。

### 闭包

闭包我认为是非常有意思的一个特性，可以实现很灵活的设计，也是函数式编程的基础。

所以在 `GScript` 中函数是作为一等公民存在；因此 `GScript` 也支持函数类型的变量。

函数变量声明语法如下：`func typeTypeOrVoid '(' typeList? ')'`

```
// 外部变量，全局共享。
int varExternal =10;
func int(int) f1(){
 // 闭包变量对每个闭包单独可见
 int varInner = 20;
 int innerFun(int a){
  println(a);
  int c=100;
  varExternal++;
  varInner++;
  return varInner;
 }
 // 返回函数
 return innerFun;
}

// f2 作为一个函数类型，接收的是一个返回值和参数都是 int 的函数。
func int(int) f2 = f1();
for(int i=0;i<2;i++){
 println("varInner=" + f2(i) + ", varExternal=" + varExternal);
}
println("=======");
func int(int) f3 = f1();
for(int i=0;i<2;i++){
 println("varInner=" + f3(i) + ", varExternal=" + varExternal);
}
```

最终输出如下：

```
0
varInner=21, varExternal=11
1
varInner=22, varExternal=12
=======
0
varInner=21, varExternal=13
1
varInner=22, varExternal=14
```

```
func int(int) f2 = f1();
```

以这段代码为例：f2 是一个返回值，入参都为 int 的函数类型；所以后续可以直接当做函数调用 `f2(i)`.

例子中将闭包分别赋值给 f2 和 f3 变量，这两个变量中的闭包数据也是互相隔离、互不影响的，所有基于这个特性甚至还是实现面向对象。

> 关于闭包的实现，后续会单独更新一篇。

更多样例请参考：https://github.com/crossoverJie/gscript/tree/main/example

## 标准库

标准库源码：https://github.com/crossoverJie/gscript/tree/main/internal

目前实现的标准库并不多，这完全是一个体力活；基于现有的语法和基础数据类型，几乎可以实现大部分的数据结构了，所以感兴趣的朋友也欢迎来贡献标准库代码；比如 `Stack`、`Set` 之类的数据结构。

### MapString

以这个 `MapString` 为例：键值对都为 `string` 的 `HashMap`。

```
int count =100;
MapString m1 = MapString();
for (int i=0;i<count;i++){
 string key = i+"";
 string value = key;
 m1.put(key,value);
}
println(m1.getSize());
assertEqual(m1.getSize(),count);

for (int i=0;i<count;i++){
 string key = i+"";
 string value = m1.get(key);
 println("key="+key+ ":"+ value);
 assertEqual(key,value);
}
```

使用起来和 `Java` 的 `HashMap` 类似，当然他的实现源码也是参考的 jdk1.7 的 `HashMap`。

> 由于目前并有一个类似于 Java 的 `object` 或者是 go 中的 `interface{}`, 所以如果需要存放 int，那还得实现一个 MapInt，不过这个通用类型很快会实现。

### 内置函数

```
int[] a={1,2,3};
// len 返回数组大小
println(len(a));

// 向数组追加数据
a = append(a,4);
println(a);
// output: [1,2,3,4]

// 断言函数，不相等时会抛出运行时异常，并中断程序。
assertEqual(len(a),4);

// 返回 hashcode
int hashcode = hash(key);
```

也内置了一些基本函数，当然也这不是由 `GScript` 源码实现的，而是编译器实现的，所以新增起来要稍微麻烦一些；后续会逐步完善，比如和 IO 相关的内置函数。

## 总结

现阶段的 `GScript` 还有许多功能没有完善，比如 JSON、网络库、更完善的语法检查、编译报错信息等；现在拿来刷刷 `LeetCode` 还是没有问题的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-47b5eaba-3fb8-41e7-96ff-e5ef97ffd988.jpg)

从这 65 个 todo 就能看出还有很长的路要走，我对它的终极目标就是可以编写一个网站那就算是一个成熟的语言了。

目前还有一个问题是没有集成开发环境，现在的开发体验和白板上写代码相差无异，所以后续有时间的话尝试写一个 VS Code 的插件，至少能有语法高亮与提示。

最后对 `GScript` 或者是编译原理感兴趣的小伙伴可以加我微信一起交流。

项目源码：https://github.com/crossoverJie/gscript

下载地址：https://github.com/crossoverJie/gscript/releases/tag/v0.0.6



[

一门语言的作用域和函数调用是如何实现的

2022-08-17

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-b1de8beb-c4f2-4f54-960d-41854bb44c6d.jpg)



](http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485729&idx=1&sn=1407afe2120670e906dfc5dd2c3cf678&chksm=e81907e1df6e8ef7c6e1898240955e1bcb80026241748ca93ae3fb1aafb47775b486c48cdd41&scene=21#wechat_redirect)

[

用 Antlr 重构脚本解释器

2022-08-08

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-36d526ef-c152-4a52-9407-b543fb39b722.jpg)



](http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485689&idx=1&sn=456adecd87d8fe7d904193ff50f893ae&chksm=e8190639df6e8f2f6dfb285cc96b2ac9cbca59d11b148145110981b7a95249f42f454fac5e32&scene=21#wechat_redirect)

[

用位运算为你的程序加速

2022-08-01

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-49021143-1edd-4f28-bfe1-53a8f75416cb.jpg)



](http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485661&idx=1&sn=70fbd621ae6165ad9049b8667c37bcac&chksm=e819061ddf6e8f0bfb2eb3ca40c404eea64870fd36d1d9814cec8000ba63b3f92332368894c5&scene=21#wechat_redirect)

[

几百行代码实现一个 JSON 解析器

2022-06-28

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-65f541be-ae36-44dc-8d1f-7b0c3c349049.jpg)



](http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485550&idx=1&sn=496e57f44f194f70d80e8617f0992809&chksm=e81906aedf6e8fb83dc71f66a736c491080b1ce2e0f30dbb699b21f872d684058427d6b02f7e&scene=21#wechat_redirect)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-4ca1dcd6-56b7-4b36-ac99-3568a9632671.jpg)

**点分享**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-6c493bc3-f0e7-431c-8d43-e1ef56d4bcc3.jpg)

**点收藏**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-b2a3d350-b516-4f76-bbfc-7edb369d29d1.jpg)

**点点赞**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-24674baf-8222-4fb7-9c43-c5d25daf9a39.jpg)

**点在看**

>参考链接：[https://mp.weixin.qq.com/s/ylMKn9dIVv5FMnpvVi1AnA](https://mp.weixin.qq.com/s/ylMKn9dIVv5FMnpvVi1AnA)，出处：crossoverJie，整理：沉默王二
