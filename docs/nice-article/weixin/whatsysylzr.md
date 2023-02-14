---
title: What - 什么是依赖注入？
shortTitle: What - 什么是依赖注入？
author: dingtingli
category:
  - 微信公众号
---

当面对复杂问题时，我们常常无从下手，难以找到明确的方向。此时，我通常使用 WWH 方法：What——搞清问题所在；Why——分析问题根本原因、How——如何解决问题。

所以就**这个系列叫做 **WWH** ，我会把平时遇到的技术问题和思考整理到这里。**

今天，我们来看看系列的第二篇文章：**What - 什么是依赖注入💉？**

**关注我的公众号“dingtingli-pub”，并回复「依赖注入」，还会给大家提供一份简单的依赖注入框架源码**，供大家学习。

这个系列之前的文章：

1.  [Why - 为什么说 JavaScript 更像一门编译型语言](http://mp.weixin.qq.com/s?__biz=MzI5NjA1MDQ4NA==&mid=2454608234&idx=1&sn=5b2b7c62d18f01ce5dfa7607bc86a12b&chksm=fbf0b331cc873a275a5f3d42081549feb668e9d1beea7ce78125c0a547728a9cb262ff266194&scene=21#wechat_redirect)



* * *

当我们编写 Web 后端代码的时候，会用到这样的代码：

```
class A {    private IB _b;    public A(IB b){        _b = b;    }    public void MethodA(){        _b.MethodB();    }}
```

如果你跟我第一次的感觉相同，可能也会存在这样的困惑：

在 `Class A` 中没有任何地方 new `Class B` 的实例，但是运行的时候，`MethodA` 中的变量 `_b` 已经是 `Class B` 的一个实例了，为什么会这样？

今天我们就带着疑问，**了解一下依赖注入的来龙去脉**。

文章从依赖注入的历史出发，分为三个部分：

1.  **依赖倒置原则**
2.  **控制反转**
3.  **依赖注入**

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFRq9AZn4we7r4K5pYgEh3OTue7jH6oX8P9hmzF7k2FamNr4mibpWMz4g/640?wx_fmt=jpeg)

依赖注入发展历史

## 1.依赖倒置原则

依赖倒置原则（DIP Dependency Inversion Principle）

在没有依赖注入的情况下，如果 `Class A` 调用了 `Class B` 的方法，这就意味着 `Class A` 依赖于 `Class B`。换句话说，在编译时 `Class A` 将取决于 `Class B`。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFatncx75Tqrb3grIzOI32pqAS0DmBM39NGcACWEqQlcPe5PKb7Iprkg/640?wx_fmt=jpeg)

直接依赖的编译情况

代码可以这么编写：

```
class A {    private B b；    public A(){        b = new B();    }    public void MethodA(){        b.MethodB();    }}
```

在 90 年代的时候，代码差不多都是这么写的。这样的代码有什么问题吗？

为了准确地回答这个问题，让我们回到 1995 年。“Bob 大叔”（Robert C. Martin）当年提出了——**依赖倒置原则**。

这个原则有以下两个定义：

1.  **高层模块不应该依赖于低层模块，二者都应该依赖于抽象。**
2.  **抽象不应该依赖于细节，细节应该依赖于抽象。**

上面的代码很明显不符合这个原则。那么**怎样才算能符合这个原则？**

### 依赖倒置原则示例

我们来看看 “Bob 大叔” 在他的著作《敏捷软件开发，原则、模式与实践 C# 版》中的一个示例，来深入理解这个原则的具体含义。

假设有一个控制电水壶（Kettle）温度调节器的软件，该软件可以从一个 I/O 通道中读取当前的温度，并通过向另一个 I/O 通道发送指令来操作电水壶打开或者关闭。

调节器软件将电水壶的温度控制在一个范围（最低温度 和 最高温度之间）。当温度低于最低温度（minTemp）时，就发送指令打开（Turn On）电水壶。当温度高于最高温度（maxTemp）时，就发送指令关闭（Turn Off）电水壶。

根据上述需求，代码可以这样写：

```
//读取温度的 I/O 通道const byte TERMOMETER = 0x86; //操作电水壶开关的 I/O 通道const byte KETTLE = 0x87; // 开电水壶的指令const byte TURNON = 1; //关电水壶的指令const byte TURNOFF = 0; //温度调节器函数void Regulate(double minTemp, double maxTemp){    for(;;)    {        //当温度高于最低温度时，就等待 1 秒中，继续循环。        while(in(TERMOMETER) > minTemp)            wait(1);        //否则就发送指令打开电水壶。        out(KETTLE,TURNON);        //当温度低于最高温度时，就等待 1 秒中，继续循环。        while(in(TERMOMETER) < maxTemp)            wait(1);        //否则就发送指令关闭电水壶。        out(KETTLE,TURNOFF);    }}
```

整个函数的高层意图非常清晰，但是实现的代码中包括了许多底层的细节，`in` 和 `out` 函数都是系统底层函数。

如果其他类型的加热器（Heater）也有同样的调节温度需求，这段代码会因为包括了电水壶的**底层细节无法被重用**。

如何修改这段代码让它可以重用？这时候就可以使用依赖倒置原则。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFT3PicFGPqj65icdDjHt4xkobVPHoibY4fXI6m8ydStha1U6nVc19FD9KQ/640?wx_fmt=jpeg)

使用依赖倒置的调节器函数

在图中，可以看到 Regulate 调节器函数接受了两个接口参数：IThermometer 接口可以读取（Read）温度；IHeater 接口可以打开（TurnOn）或者关闭（TurnOff）加热器。

接口的定义和 Regulate 调节器函数都属于高层模块，函数只需要知道着这两个接口，跟具体加热器的实现细节无关。

所有的加热器只需实现这两个接口就可以，这些接口的实现属于底层模块。

这就是依赖关系倒置，高层的 Regulate 调节器函数，不再依赖任何加热器的底层细节，函数本身有了很好的可用性。

最终 Regulate 调节器函数可以写成下面这样：

```
void Regulate(IThermometer t, IHeater h,

        double minTemp, double maxTemp){    for(;;)    {        while(t.Read() > minTemp)            wait(1);        h.TurnOn();        while(t.Read() > maxTemp)            wait(1);        h.TurnOff();    }}
```

### 使用依赖倒置原则优化代码

依赖倒置原则，不仅解释了为什么之前代码的写法不好，而且提出了解决方案。

让我们再次回到之前的例子中：

代码 1 **直接依赖**：

```
class A {    private B b；    public A(){        b = new B();    }    public void MethodA(){        b.MethodB();    }}class B {    public void MethodB(){        //code of method.    }}
```

之前已经提到，在这段代码中 `Class A` 依赖于 `Class B`。如果 `Class A` 是高层模块，如何让 `Class A` 不依赖于 `Class B`？

根据依赖倒置原则，我们可以让 `Class A` 依赖于 `Class B` 的抽象 `IB`。

代码 2 **依赖倒置**：

```
class A {    public void MethodA(IB b){        b.MethodB();    }}interface IB {    void MethodB();}class B : IB {    public void MethodB(){        //code of method.    }}
```

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFWveAvkv5xc8ZACdw4bxjHicS4aZ0ouUicicIREcSugOOPAjKvvNu7Q4gA/640?wx_fmt=jpeg)

依赖倒置的编译情况

此时，`Class A` 和 `Class B` 的**依赖关系反转**了。

`Class A` 和接口 `IB` 属于高层模块，`Class B` 作为接口 `IB` 的实现属于底层模块。

但是想要调用 `Class A` 中的 `MethodA`，应用程序仍然需要先 new 一个 `Class B` 的实例。

```
class Test {    static void Main(){        A a = new A();        B b = new B();        a.MethodA(b);    }}
```

这样的调用关系，在编译时 `Class A` 依赖于抽象 `IB`；在运行时，实例 `a` 仍然直接调用了实例 `b`，所以应用程序需要事先准备好 `Class B` 的实例 `b`。

这跟我们说的依赖注入有什么关系？让我们带着这个疑问，先进入下一个概念——控制反转 (IoC Inversion of Control)。

## 2\. 控制反转

控制反转 (IoC Inversion of Control)

### 直接依赖和依赖倒置运行时的情况

我们回过头来，再看看之前的两段代码。

代码 1 **直接依赖**：

```
class A {    private B b；    public A(){        b = new B();    }    public void MethodA(){        b.MethodB();    }}class B {    public void MethodB(){        //code of method.    }}
```

第一段代码使用了直接依赖的方式，`Class A` 依赖于 `Class B`。**编译时依赖关系顺着运行时执行的方向流动，二者方向是一致的。**

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFvhERr63pNY5iaQR0PbbmicPZiceiaPIBMRQWmv0uEqGNRc6IvgTACicnXuA/640?wx_fmt=jpeg)

直接依赖编译和运行时的情况

代码 2 **依赖倒置**：

```
class A {    public void MethodA(IB b){        b.MethodB();    }}interface IB {    void MethodB();}class B : IB {    public void MethodB(){        //code of method.    }}
```

第二段代码使用了依赖倒置原则，使得**代码在编译阶段的依赖关系发生了反转**。`Class A` 在编译时可以调用 `Class B` 的抽象 `IB` 上的方法。而在运行时，`Class A` 的实例仍然直接调用 `Class B` 的实例。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFojQ0CU7fgItEWa68bfOq1ZAKAzmsuiau6eGGCnbcoUrBswqJwZhFVkA/640?wx_fmt=jpeg)

依赖倒置编译和运行时的情况

**在代码的运行阶段，这两段代码的执行流程是一致的。**

因为，**在传统的面向对象程序中，执行的代码（主函数）需要先实例化对象、再调用方法，这样代码才能继续执行。**

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFib0zZYicVddjIvxfxSUH6ESHI1LaSL17AUGlzTq0SaevFjKMwWUdT5icA/640?wx_fmt=jpeg)

直接依赖 VS 依赖倒置

### 控制反转介绍

我们回过头来，看看文章最开始使用的代码示例。

代码 3 **控制反转**：

```
class A {    private IB _b;    public A(IB b){        _b = b;    }    public void MethodA(){        _b.MethodB();    }}interface IB {    void MethodB();}class B : IB {    public void MethodB(){        //code of method.    }}
```

代码 3 控制反转和代码 2 依赖倒置的结构很类似，所以，很明显代码 3 **控制反转也是符合依赖倒置原则的**。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFKwC4rkmA1HvfGKbb0m39putAh7vrIVrpoc3GP8ricTmkOMMO2jiaOMhQ/640?wx_fmt=jpeg)

依赖倒置 VS 控制反转

但这两段代码的使用还是不一样，在使用代码 3 控制反转的项目中，开发人员不需要编写任何实例化 Class B 的代码。

为什么会这样？这时就必须引入控制反转 （IoC Inversion of Control）概念了。

### 控制反转的概念

**控制反转的主要思想是：有一个独立的框架，它可以获得接口 `IB` 合适的实现类 `Class B`，并主动创建这个类的实例，再赋值给 `Class A` 类的一个字段 `_b`。**

如下图所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFU4XCAicxiabMrgnOIjd7ApgibiblYtbIlUdu1kA22YSBdwiaS0otjFagMPQ/640?wx_fmt=jpeg)

控制反转的运行时的情况

此时，**程序执行的控制流程（先实例化对象、再调用方法），就从应用程序本身转移到了 IoC 框架中**。也就是说，程序的主要控制者发生了反转，从应用程序变成了 IoC 框架。

从上面的介绍可以看出，框架的一个重要特征是：**用户为框架定义的方法，经常会从框架本身，而不是从用户的应用程序代码中调用。**

**这种控制权的倒置有时被称为好莱坞原则："不要调用我们，我们会调用你（Don't call me; I'll call you.）"。**

在协调和安排应用活动的顺序方面，框架往往扮演着主程序的角色。这种控制的倒置使得框架有能力作为可扩展的骨架。

### 控制反转的示例

带着上面的理论，我们再来看看 代码 3 控制反转中的代码片段：

```
class A {    private IB _b;    public A(IB b){        _b = b;    }    public void MethodA(){        _b.MethodB();    }}
```

代码中，为框架定义的方法——构造函数 `public A(IB b)` ，会被框架调用而不是应用程序本身调用。

这就是为什么我们在项目中看不到任何调用这个构造函数的原因。

控制反转框架在运行时调用了 `Class A` 的构造函数，发现参数需要 `IB` 接口，就找到了接口 `IB` 合适的实现类 `Class B`，然后创建了`Class B` 的实例，最后赋值给构造函数的参数。在这里，**程序执行的控制流程完全发生了转变，从应用程序转移到了控制反转框架中。**

控制反转的发展也经历了很长时间的迭代：

从 1983 年，Richard E. Sweet 提出好莱坞原则开始；到 1998 年，随着 Java Apache 服务器框架的提出，Stefano Mazzocchi 将控制反转作为框架的主要驱动设计原则之一，普及了这个概念；最后，在 2003 年，Spring、PicoContainer 等框架纷纷实现了控制反转。最终才有了文章最开始展示的那种类型的代码。

## 3\. 依赖注入

依赖注入（DI Dependency Injection）

说了半天，我们还没有提及文章标题中的名词——依赖注入。

2004 年，Martin Fowler 在他的文章《控制反转容器&依赖注入模式》首次提出了依赖注入这个名词。

文章中指出，**控制反转这个词太宽泛，并不能很好地解释这个框架的具体实现。作者和 IoC 爱好者们商讨出了一个新的名称：依赖注入（DI Dependency Injection）。**

这个名词很形象地解释了控制反转在运行时发生了什么。比如我们之前的代码 3 中，在运行时，构造函数 `public A(IB b)` 需要接口 `IB` 的一个实例，此时框架就像是给函数打针一样，注入了 `Class B` 的实例。

下面这幅漫画生动地展现了用户的使用感受。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFLfGiaByw8GXDMpzacC1UsbqjrQzZb18tT4PjKhJU5uyiaM6Dpf1KO03Q/640?wx_fmt=jpeg)

依赖注入漫画

**打个比方，包饺子的时候我们不需要确定具体是什么馅，只管包就行了，在吃饺子的时候，我说想吃韭菜鸡蛋馅的饺子，这时候就有人用针管给我的饺子注入韭菜鸡蛋馅。**

## 4\. 历史演变过程

从上面的描述中我们可以看到，依赖倒置原则是一个软件设计原则，而使用了控制反转的代码都符合这一原则。

**控制反转框架，将程序执行的控制流程从应用程序转移到了框架中。最终使用的感觉就是，开发者在代码中所依赖的对象，会在运行的时候直接注入到相应的方法中去，所以就有了一个新名词——依赖注入。**

整个技术的演变历程如下：

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFRq9AZn4we7r4K5pYgEh3OTue7jH6oX8P9hmzF7k2FamNr4mibpWMz4g/640?wx_fmt=jpeg)

依赖注入发展历史

我们现在明白了依赖倒置设计原则和控制反转框架的功能，你不觉得控制反转框架很神奇，它到底是如何实现这些功能的呢？

**关注我的公众号“dingtingli-pub”，并回复「依赖注入」，提供一份源代码，大家可以详细地了解这些神奇的功能是如何实现的。**

**

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHKMviaiawjFUXE71lZkHR5xf1GdHb3cedw6O5onricJIMawslyoaJicOeMyyJlAjOyFiadXIzFyx0sQHlA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

**

* * *

所有笔记的初稿也已经发布在 github 上，大家可以直接访问：

https://github.com/dingtingli/

**喜欢本篇文章，记得动动小手点个****在看↓↓**

>参考链接：[https://mp.weixin.qq.com/s/9l-yTmin_nLffnMCvZwbmg](https://mp.weixin.qq.com/s/9l-yTmin_nLffnMCvZwbmg)，出处：dingtingli，整理：沉默王二
