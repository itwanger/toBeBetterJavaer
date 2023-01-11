---
title: Java异常处理的20个最佳实践
shortTitle: Java异常处理的20个最佳实践
category:
  - Java核心
tag:
  - 异常处理
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，Java异常处理的20个最佳实践
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,异常处理
---


“三妹啊，今天我来给你传授几个异常处理的最佳实践经验，以免你以后在开发中采坑。”我面带着微笑对三妹说。

“好啊，二哥，我洗耳恭听。”三妹也微微一笑，欣然接受。

“好，那哥就不废话了。开整。”

--------

## 尽量不要捕获 RuntimeException

阿里出品的嵩山版 Java 开发手册上这样规定：

>尽量不要 catch RuntimeException，比如 NullPointerException、IndexOutOfBoundsException 等等，应该用预检查的方式来规避。

正例：

```java
if (obj != null) {
  //...
}
```

反例：

```java
try { 
  obj.method(); 
} catch (NullPointerException e) {
  //...
}
```

“哦，那如果有些异常预检查不出来呢？”三妹问。

“的确会存在这样的情况，比如说 NumberFormatException，虽然也属于 RuntimeException，但没办法预检查，所以还是应该用 catch 捕获处理。”我说。

## 尽量使用 try-with-resource 来关闭资源

当需要关闭资源时，尽量不要使用 try-catch-finally，禁止在 try 块中直接关闭资源。

反例：

```java
public void doNotCloseResourceInTry() {
    FileInputStream inputStream = null;
    try {
        File file = new File("./tmp.txt");
        inputStream = new FileInputStream(file);
        inputStream.close();
    } catch (FileNotFoundException e) {
        log.error(e);
    } catch (IOException e) {
        log.error(e);
    }
}
```

“为什么呢？”三妹问。

“原因也很简单，因为一旦 `close()` 之前发生了异常，那么资源就无法关闭。直接使用 [try-with-resource](https://mp.weixin.qq.com/s/7yhHOG0SVCfoHdhtZHfeVg) 来处理是最佳方式。”我说。

```java
public void automaticallyCloseResource() {
    File file = new File("./tmp.txt");
    try (FileInputStream inputStream = new FileInputStream(file);) {
    } catch (FileNotFoundException e) {
        log.error(e);
    } catch (IOException e) {
        log.error(e);
    }
}
```

“除非资源没有实现 AutoCloseable 接口。”我补充道。

“那这种情况下怎么办呢？”三妹问。

“就在 finally 块关闭流。”我说。

```java
public void closeResourceInFinally() {
    FileInputStream inputStream = null;
    try {
        File file = new File("./tmp.txt");
        inputStream = new FileInputStream(file);
    } catch (FileNotFoundException e) {
        log.error(e);
    } finally {
        if (inputStream != null) {
            try {
                inputStream.close();
            } catch (IOException e) {
                log.error(e);
            }
        }
    }
}
```

## 不要捕获 Throwable

Throwable 是 exception 和 error 的父类，如果在 catch 子句中捕获了 Throwable，很可能把超出程序处理能力之外的错误也捕获了。

```java
public void doNotCatchThrowable() {
    try {
    } catch (Throwable t) {
        // 不要这样做
    }
}
```

“到底为什么啊？”三妹问。

“因为有些 error 是不需要程序来处理，程序可能也处理不了，比如说 OutOfMemoryError 或者 StackOverflowError，前者是因为 Java 虚拟机无法申请到足够的内存空间时出现的非正常的错误，后者是因为线程申请的栈深度超过了允许的最大深度出现的非正常错误，如果捕获了，就掩盖了程序应该被发现的严重错误。”我说。

“打个比方，一匹马只能拉一车厢的货物，拉两车厢可能就挂了，但一 catch，就发现不了问题了。”我补充道。

## 不要省略异常信息的记录

很多时候，由于疏忽大意，开发者很容易捕获了异常却没有记录异常信息，导致程序上线后真的出现了问题却没有记录可查。

```java
public void doNotIgnoreExceptions() {
    try {
    } catch (NumberFormatException e) {
        // 没有记录异常
    }
}
```

应该把错误信息记录下来。

```java
public void logAnException() {
    try {
    } catch (NumberFormatException e) {
        log.error("哦，错误竟然发生了: " + e);
    }
}
```

## 不要记录了异常又抛出了异常

这纯属画蛇添足，并且容易造成错误信息的混乱。

反例：

```java
try {
} catch (NumberFormatException e) {
    log.error(e);
    throw e;
}
```

要抛出就抛出，不要记录，记录了又抛出，等于多此一举。

反例：

```java
public void wrapException(String input) throws MyBusinessException {
    try {
    } catch (NumberFormatException e) {
        throw new MyBusinessException("错误信息描述：", e);
    }
}
```

这种也是一样的道理，既然已经捕获了，就不要在方法签名上抛出了。

## 不要在 finally 块中使用 return

阿里出品的嵩山版 Java 开发手册上这样规定：

>try 块中的 return 语句执行成功后，并不会马上返回，而是继续执行 finally 块中的语句，如果 finally 块中也存在 return 语句，那么 try 块中的 return 就将被覆盖。

反例：

```java
private int x = 0;
public int checkReturn() {
    try {
        return ++x;
    } finally {
        return ++x;
    }
}
```

“哦，确实啊，try 块中 x 返回的值为 1，到了 finally 块中就返回 2 了。”三妹说。

“是这样的。”我点点头。

## 在你的方法里抛出定义具体的检查性异常

```
public void foo() throws Exception { //错误方式
}
```

一定要避免出现上面的代码示例，它破坏了检查性异常的目的。 声明你的方法可能抛出的具体检查性异常，如果只有太多这样的检查性异常，你应该把它们包装在你自己的异常中，并在异常消息中添加信息。 如果可能的话，你也可以考虑代码重构。

```
public void foo() throws SpecificException1, SpecificException2 { //正确方式
}
```

## 捕获具体的子类而不是捕获 Exception 类

```
try {
   someMethod();
} catch (Exception e) { //错误方式
   LOGGER.error("method has failed", e);
}
```

捕获异常的问题是，如果稍后调用的方法为其方法声明添加了新的检查性异常，则开发人员的意图是应该处理具体的新异常。如果你的代码只是捕获异常（或 Throwable），永远不会知道这个变化，以及你的代码现在是错误的，并且可能会在运行时的任何时候中断。


## 始终正确包装自定义异常中的异常，以便堆栈跟踪不会丢失

```
catch (NoSuchMethodException e) {
   throw new MyServiceException("Some information: " + e.getMessage());  //错误方式
}
```

这破坏了原始异常的堆栈跟踪，并且始终是错误的，正确的做法是：

```
catch (NoSuchMethodException e) {
   throw new MyServiceException("Some information: " , e);  //正确方式
}
```


## finally 块中永远不要抛出任何异常

```
try {
  someMethod();  //Throws exceptionOne
} finally {
  cleanUp();    //如果finally还抛出异常，那么exceptionOne将永远丢失
}
```

只要 cleanUp() 永远不会抛出任何异常，上面的代码没有问题，但是如果 someMethod() 抛出一个异常，并且在 finally 块中，cleanUp() 也抛出另一个异常，那么程序只会把第二个异常抛出来，原来的第一个异常（正确的原因）将永远丢失。如果在 finally 块中调用的代码可能会引发异常，请确保要么处理它，要么将其记录下来。永远不要让它从 finally 块中抛出来。



## 不要使用 printStackTrace() 语句或类似的方法

完成代码后，切勿忽略 printStackTrace()，最终别人可能会得到这些堆栈，并且对于如何处理它完全没有任何方法，因为它不会附加任何上下文信息。

## 对于不打算处理的异常，直接使用 finally

```
try {
  someMethod();  //Method 2
} finally {
  cleanUp();    //do cleanup here
}
```

这是一个很好的做法，如果在你的方法中你正在访问 Method 2，而 Method 2 抛出一些你不想在 Method 1 中处理的异常，但是仍然希望在发生异常时进行一些清理，然后在 finally 块中进行清理，不要使用 catch 块。

## 记住早 throw 晚 catch 原则

这可能是关于异常处理最著名的原则，简单说，应该尽快抛出(throw)异常，并尽可能晚地捕获(catch)它。应该等到有足够的信息来妥善处理它。

这个原则隐含地说，你将更有可能把它放在低级方法中，在那里你将检查单个值是否为空或不适合。而且你会让异常堆栈跟踪上升好几个级别，直到达到足够的抽象级别才能处理问题。


## 只抛出和方法相关的异常

相关性对于保持应用程序清洁非常重要。一种尝试读取文件的方法，如果抛出 NullPointerException，那么它不会给用户任何相关的信息。相反，如果这种异常被包裹在自定义异常中，则会更好。NoSuchFileFoundException 则对该方法的用户更有用。

## 切勿在程序中使用异常来进行流程控制

不要在项目中出现使用异常来处理应用程序逻辑。永远不要这样做，它会使代码很难阅读和理解。

## 尽早验证用户输入以在请求处理的早期捕获异常

始终要在非常早的阶段验证用户输入，甚至在达到 controller 之前，它将帮助你把核心应用程序逻辑中的异常处理代码量降到最低。如果用户输入出现错误，还可以保证与应用程序一致。

例如：如果在用户注册应用程序中，遵循以下逻辑：

1.  验证用户
2.  插入用户
3.  验证地址
4.  插入地址
5.  如果出问题回滚一切

这是不正确的做法，它会使数据库在各种情况下处于不一致的状态，应该首先验证所有内容，然后将用户数据置于 dao 层并进行数据库更新。正确的做法是：

1.  验证用户
2.  验证地址
3.  插入用户
4.  插入地址
5.  如果问题回滚一切

## 一个异常只能包含在一个日志中

```
LOGGER.debug("Using cache sector A");
LOGGER.debug("Using retry sector B");
```

不要像上面这样做，对多个 LOGGER.debug() 调用使用多行日志消息可能在你的测试用例中看起来不错，但是当它在具有 100 个并行运行的线程的应用程序服务器的日志文件中显示时，所有信息都输出到相同的日志文件，即使它们在实际代码中为前后行，但是在日志文件中这两个日志消息可能会间隔 100 多行。应该这样做：

```
LOGGER.debug("Using cache sector A, using retry sector B");
```

## 将所有相关信息尽可能地传递给异常

有用的异常消息和堆栈跟踪非常重要，如果你的日志不能定位异常位置，那要日志有什么用呢？

## 终止掉被中断线程

```
while (true) {
  try {
    Thread.sleep(100000);
  } catch (InterruptedException e) {} //别这样做
  doSomethingCool();
}
```

InterruptedException 异常提示应该停止程序正在做的事情，比如事务超时或线程池被关闭等。

应该尽最大努力完成正在做的事情，并完成当前执行的线程，而不是忽略 InterruptedException。修改后的程序如下：

```
while (true) {
  try {
    Thread.sleep(100000);
  } catch (InterruptedException e) {
    break;
  }
}
doSomethingCool();
```

## 对于重复的 try-catch，使用模板方法

在代码中有许多类似的 catch 块是无用的，只会增加代码的重复性，针对这样的问题可以使用模板方法。

例如，在尝试关闭数据库连接时的异常处理。

```
class DBUtil{
    public static void closeConnection(Connection conn){
        try{
            conn.close();
        } catch(Exception ex){
            //Log Exception - Cannot close connection
        }
    }
}
```

这类的方法将在应用程序很多地方使用。不要把这块代码放的到处都是，而是定义上面的方法，然后像下面这样使用它：

```
public void dataAccessCode() {
    Connection conn = null;
    try{
        conn = getConnection();
        ....
    } finally{
        DBUtil.closeConnection(conn);
    }
}
```

## 使用 JavaDoc 中记录应用程序中的所有异常

把用 JavaDoc 记录运行时可能抛出的所有异常作为一种习惯，其中也尽量包括用户应该遵循的操作，以防这些异常发生。

---

“好了，三妹，关于异常处理实践就先讲这 20 条吧，实际开发中你还会碰到其他的一些坑，自己踩一踩可能印象更深刻一些。”我说。

“那万一到时候我工作后被领导骂了怎么办？”三妹委屈地说。

“新人嘛，总要写几个 bug 才能对得起新人这个称号嘛。”我轻描淡写地说。

“好吧。”三妹无奈地叹了口气。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)





