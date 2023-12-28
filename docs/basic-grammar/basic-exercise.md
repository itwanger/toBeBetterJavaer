---
title: Java 语法基础练习题
shortTitle: Java语法基础练习题
category:
  - Java核心
tag:
  - Java语法基础
description: 学完本章的数据类型、运算符和流程控制语句，你已经掌握了 Java 语言的基础知识，现在就通过练习题来检验一下吧！
head:
  - - meta
    - name: keywords
      content: Java, Java语法基础, 练习题
---

# 3.8 Java语法基础练习题

### 翻转整数

给定一个 32 位有符号整数，将整数中的数字进行反转。

示例 1:

```
输入: 123
输出: 321
```

示例 2:

```
输入: -123
输出: -321
```

如果反转后整数溢出那么就返回 0。

```java
public class ReverseInteger {
    public static void main(String[] args) {
        int x = 123;
        int y = -123;
        System.out.println(reverse(x));
        System.out.println(reverse(y));
    }

    public static int reverse(int x) {
        int rev = 0; // 用于存储反转后的结果
		while (x != 0) {
			int pop = x % 10; // 获取 x 的最后一位数字
			x /= 10; // 移除 x 的最后一位数字

			// 检查溢出：如果 rev > Integer.MAX_VALUE/10 或 rev < Integer.MIN_VALUE/10，则会溢出
			if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && pop > Integer.MAX_VALUE % 10)) return 0;
			if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && pop < Integer.MIN_VALUE % 10)) return 0;

			rev = rev * 10 + pop; // 将 pop 添加到 rev 的最后
		}
		return rev; // 返回反转后的整数
    }
}
```

这道题其实是 LeetCode 的第 7 题，如果你想看看更多的解题思路，可以看看这篇文章：[LeetCode 7. 整数反转](https://paicoding.com/column/7/7)。

这道题其实很好的考察了 int 的基本数据类型、取余和除法运算符，以及 if 和 while 语句的使用。


### 总结

经过这些练习题的练习，我想你就能完全掌握 Java 的语法知识了。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)