---
title: 为什么String是不可变的？
shortTitle: 为什么String是不可变的？
category:
  - Java核心
tag:
  - 数组&字符串
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，为什么String是不可变的？
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java字符串,String,不可变
---

我正坐在沙发上津津有味地读刘欣大佬的《码农翻身》——Java 帝国这一章，门铃响了。起身打开门一看，是三妹，她从学校回来了。

“三妹，你回来的真及时，今天我们打算讲 Java 中的字符串呢。”等三妹换鞋的时候我说。

“哦，可以呀，哥。听说字符串的细节特别多，什么字符串常量池了、字符串不可变性了、字符串拼接了、字符串长度限制了等等，你最好慢慢讲，否则我可能一时半会消化不了。”三妹的态度显得很诚恳。

“嗯，我已经想好了，今天就只带你大概认识一下字符串，再说说为什么 String 是不可变的，其他的细节咱们后面再慢慢讲，保证你能及时消化。”

“好，那就开始吧。”三妹已经准备好坐在了电脑桌的边上。

我应了一声后走到电脑桌前坐下来，顺手打开 Intellij IDEA，并找到了 String 的源码。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    @Stable
    private final byte[] value;
    private final byte coder;
    private int hash;
}
```

“第一，String 类是 final 的，意味着它不能被子类继承。”

“第二，String 类实现了 Serializable 接口，意味着它可以序列化。”

“第三，String 类实现了 Comparable 接口，意味着最好不要用‘==’来比较两个字符串是否相等，而应该用 `compareTo()` 方法去比较。”

“第四，StringBuffer、StringBuilder 和 String 一样，都实现了 CharSequence 接口，所以它们仨属于近亲。由于 String 是不可变的，所以遇到字符串拼接的时候就可以考虑一下 String 的另外两个好兄弟，StringBuffer 和 StringBuilder，它俩是可变的。”

“第五，Java 9 以前，[String 是用 char 型数组实现的，之后改成了 byte 型数组实现，并增加了 coder 来表示编码](https://tobebetterjavaer.com/basic-extra-meal/jdk9-char-byte-string.html)。在 Latin1 字符为主的程序里，可以把 String 占用的内存减少一半。当然，天下没有免费的午餐，这个改进在节省内存的同时引入了编码检测的开销。”

“第六，每一个字符串都会有一个 hash 值，这个哈希值在很大概率是不会重复的，因此 String 很适合来作为 HashMap 的键值。”

“String 可能是 Java 中使用频率最高的引用类型了，因此 String 类的设计者可以说是用心良苦。”

比如说 String 的不可变性。

- String 类被 final 关键字修饰，所以它不会有子类，这就意味着没有子类可以重写它的方法，改变它的行为。
- String 类的数据存储在 `byte[]` 数组中，而这个数组也被 final 关键字修饰了，这就表示 String 对象是没法被修改的，只要初始化一次，值就确定了。

“哥，为什么要这样设计呢？”三妹有些不解。

“我先简单来说下，三妹，能懂最好，不能懂后面再细说。”

第一，可以保证 String 对象的安全性，避免被篡改，毕竟像密码这种隐私信息一般就是用字符串存储的。

第二，保证哈希值不会频繁变更。毕竟要经常作为哈希表的键值，经常变更的话，哈希表的性能就会很差劲。

第三，可以实现字符串常量池。

“由于字符串的不可变性，String 类的一些方法实现最终都返回了新的字符串对象。”等三妹稍微缓了一会后，我继续说到。

“就拿 `substring()` 方法来说。”

```java
public String substring(int beginIndex) {
    if (beginIndex < 0) {
        throw new StringIndexOutOfBoundsException(beginIndex);
    }
    int subLen = length() - beginIndex;
    if (subLen < 0) {
        throw new StringIndexOutOfBoundsException(subLen);
    }
    if (beginIndex == 0) {
        return this;
    }
    return isLatin1() ? StringLatin1.newString(value, beginIndex, subLen)
            : StringUTF16.newString(value, beginIndex, subLen);
}

// StringLatin1.newString 
public static String newString(byte[] val, int index, int len) {
    return new String(Arrays.copyOfRange(val, index, index + len),
            LATIN1);
}

// UTF16.newString
public static String newString(byte[] val, int index, int len) {
    if (String.COMPACT_STRINGS) {
        byte[] buf = compress(val, index, len);
        if (buf != null) {
            return new String(buf, LATIN1);
        }
    }
    int last = index + len;
    return new String(Arrays.copyOfRange(val, index << 1, last << 1), UTF16);
}
```

`substring()` 方法用于截取字符串，不管是 Latin1 字符还是 UTF16 字符，最终返回的都是 new 出来的新字符串对象。

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

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)