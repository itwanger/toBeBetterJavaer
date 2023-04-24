---
title: 为什么Java字符串String是不可变的？
shortTitle: String为什么不可变
category:
  - Java核心
tag:
  - 数组&字符串
description: 本文深入探讨了Java String 类的不可变性及其背后的设计原则。我们将了解不可变字符串如何提高代码的安全性、性能和可维护性，以及为什么Java选择了这种设计。探索String类的内部实现，理解为何Java字符串是不可变的。
head:
  - - meta
    - name: keywords
      content: Java, String, 不可变, 字符串
---

# 4.5 String为什么不可变

String 可能是 Java 中使用频率最高的引用类型了，因此 String 类的设计者可以说是用心良苦。

比如说 String 的不可变性。

- String 类被 [final 关键字](https://tobebetterjavaer.com/oo/final.html)修饰，所以它不会有子类，这就意味着没有子类可以[重写](https://tobebetterjavaer.com/basic-extra-meal/override-overload.html)它的方法，改变它的行为。
- String 类的数据存储在 `char[]` 数组中，而这个数组也被 final 关键字修饰了，这就表示 String 对象是没法被修改的，只要初始化一次，值就确定了。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
}
```

“哥，为什么要这样设计呢？”三妹有些不解。

“我先简单来说下，三妹，能懂最好，不能懂后面再细说。”

第一，可以保证 String 对象的安全性，避免被篡改，毕竟像密码这种隐私信息一般就是用字符串存储的。

以下是一个简单的 Java 示例，演示了字符串的不可变性如何有助于保证 String 对象的安全性。在本例中，我们创建了一个简单的 User 类，该类使用 String 类型的字段存储用户名和密码。同时，我们使用一个静态方法 getUserCredentials 从外部获取用户凭据。

```java
class User {
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}

public class StringSecurityExample {
    public static void main(String[] args) {
        String username = "沉默王二";
        String password = "123456";
        User user = new User(username, password);

        // 获取用户凭据
        String[] credentials = getUserCredentials(user);

        // 尝试修改从 getUserCredentials 返回的用户名和密码字符串
        credentials[0] = "陈清扬";
        credentials[1] = "612311";

        // 输出原始 User 对象中的用户名和密码
        System.out.println("原始用户名: " + user.getUsername());
        System.out.println("原始密码: " + user.getPassword());
    }

    public static String[] getUserCredentials(User user) {
        String[] credentials = new String[2];
        credentials[0] = user.getUsername();
        credentials[1] = user.getPassword();
        return credentials;
    }
}
```

在这个示例中，尽管我们尝试修改 getUserCredentials 返回的字符串数组（即用户名和密码），但原始 User 对象中的用户名和密码保持不变。这证明了字符串的不可变性有助于保护 String 对象的安全性。

第二，保证哈希值不会频繁变更。毕竟要经常作为[哈希表](https://tobebetterjavaer.com/collection/hashmap.html)的键值，经常变更的话，哈希表的性能就会很差劲。

在 String 类中，哈希值是在第一次计算时缓存的，后续对该哈希值的请求将直接使用缓存值。这有助于提高哈希表等数据结构的性能。以下是一个简单的示例，演示了字符串的哈希值缓存机制：

```java
String text1 = "沉默王二";
String text2 = "沉默王二";

// 计算字符串 text1 的哈希值，此时会进行计算并缓存哈希值
int hashCode1 = text1.hashCode();
System.out.println("第一次计算 text1 的哈希值: " + hashCode1);

// 再次计算字符串 text1 的哈希值，此时直接返回缓存的哈希值
int hashCode1Cached = text1.hashCode();
System.out.println("第二次计算: " + hashCode1Cached);

// 计算字符串 text2 的哈希值，由于字符串常量池的存在，实际上 text1 和 text2 指向同一个字符串对象
// 所以这里直接返回缓存的哈希值
int hashCode2 = text2.hashCode();
System.out.println("text2 直接使用缓存: " + hashCode2);
```

在这个示例中，我们创建了两个具有相同内容的字符串 text1 和 text2。首次计算 text1 的哈希值时，会进行实际计算并缓存该值。当我们再次计算 text1 的哈希值或计算具有相同内容的 text2 的哈希值时，将直接返回缓存的哈希值，而不进行重新计算。

由于 String 对象是不可变的，其哈希值在创建后不会发生变化。这使得 String 类可以缓存哈希值，提高哈希表等数据结构的性能。如果 String 是可变的，那么在每次修改时都需要重新计算哈希值，这会降低性能。

第三，可以实现[字符串常量池](https://tobebetterjavaer.com/string/constant-pool.html)，Java 会将相同内容的字符串存储在字符串常量池中。这样，具有相同内容的字符串变量可以指向同一个 String 对象，节省内存空间。

“由于字符串的不可变性，String 类的一些方法实现最终都返回了新的字符串对象。”等三妹稍微缓了一会后，我继续说到。

“就拿 `substring()` 方法来说。”

```java
public String substring(int beginIndex) {
    if (beginIndex < 0) {
        throw new StringIndexOutOfBoundsException(beginIndex);
    }
    int subLen = value.length - beginIndex;
    if (subLen < 0) {
        throw new StringIndexOutOfBoundsException(subLen);
    }
    return (beginIndex == 0) ? this : new String(value, beginIndex, subLen);
}
```

`substring()` 方法用于截取字符串，最终返回的都是 new 出来的新字符串对象。

“还有 `concat()` 方法。”

```java
public String concat(String str) {
    int olen = str.length();
    if (olen == 0) {
        return this;
    }
    if (coder() == str.coder()) {
        byte[] val = this.value;
        byte[] oval = str.value;
        int len = val.length + oval.length;
        byte[] buf = Arrays.copyOf(val, len);
        System.arraycopy(oval, 0, buf, val.length, oval.length);
        return new String(buf, coder);
    }
    int len = length();
    byte[] buf = StringUTF16.newBytesFor(len + olen);
    getBytes(buf, 0, UTF16);
    str.getBytes(buf, len, UTF16);
    return new String(buf, UTF16);
}
```

`concat()` 方法用于拼接字符串，不管编码是否一致，最终也返回的是新的字符串对象。

“`replace()` 替换方法其实也一样，三妹，你可以自己一会看一下源码，也是返回新的字符串对象。”

“这就意味着，不管是截取、拼接，还是替换，都不是在原有的字符串上进行的，而是重新生成了新的字符串对象。也就是说，这些操作执行过后，**原来的字符串对象并没有发生改变**。”

“三妹，你记住，String 对象一旦被创建后就固定不变了，对 String 对象的任何修改都不会影响到原来的字符串对象，都会生成新的字符串对象。”

“嗯嗯，记住了，哥。”三妹很乖。

“那今天就先讲到这吧，后面我们再对每一个细分领域深入地展开一下。你可以找一些资料先预习下，我出去散会心。。。。。”

---

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)