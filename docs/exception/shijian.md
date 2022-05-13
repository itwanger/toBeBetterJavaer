---
category:
  - Java核心
tag:
  - Java
---

# Java异常处理的20个最佳实践

“三妹啊，今天我来给你传授几个异常处理的最佳实践经验，以免你以后在开发中采坑。”我面带着微笑对三妹说。

“好啊，二哥，我洗耳恭听。”三妹也微微一笑，欣然接受。

“好，那哥就不废话了。开整。”

--------

**1）尽量不要捕获 RuntimeException**

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

**2）尽量使用 try-with-resource 来关闭资源**

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

**3）不要捕获 Throwable**

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

**4）不要省略异常信息的记录**

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

**5）不要记录了异常又抛出了异常**

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

**6）不要在 finally 块中使用 return**

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

----------

“好了，三妹，关于异常处理实践就先讲这 6 条吧，实际开发中你还会碰到其他的一些坑，自己踩一踩可能印象更深刻一些。”我说。

“那万一到时候我工作后被领导骂了怎么办？”三妹委屈地说。

“新人嘛，总要写几个 bug 才能对得起新人这个称号嘛。”我轻描淡写地说。

“好吧。”三妹无奈地叹了口气。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png)





