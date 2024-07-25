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

这道题其实是 LeetCode 的第 7 题，如果你想看看更多的解题思路，可以看看这篇文章：[LeetCode 7. 整数反转](https://paicoding.com/column/7/7)，我放在技术派的《二哥的 LeetCode 刷题笔记》专栏中。

这道题其实很好的考察了 int 的基本数据类型、取余和除法运算符，以及 if 和 while 语句的使用。

### 字符串转换整数

请你来实现一个 parseInt 方法，使其能将字符串转换成整数。

示例 1（正数）:

```
输入: "42"
输出: 42
```

示例 2（带空格的负数）:

```
输入: "   -42"
输出: -42
```

示例 3（带非数字的字符）:

```
输入: "4193 with words"
输出: 4193
```

示例 4（超出 int 范围）:

```
输入: "91283472332"
输出: 2147483647
```

```java
public class StringToInteger {
    public static void main(String[] args) {
        String str1 = "42";
        String str2 = "   -42";
        String str3 = "4193 with words";
        String str4 = "91283472332";
        System.out.println(parseInt(str1));
        System.out.println(parseInt(str2));
        System.out.println(parseInt(str3));
        System.out.println(parseInt(str4));
    }

    public static int parseInt(String str) {
        int index = 0; // 用于遍历字符串
        int sign = 1; // 用于标记正负号
        int total = 0; // 用于存储转换后的整数

        // 1. 跳过前面的空格
        while (index < str.length() && str.charAt(index) == ' ') index++;

        // 2. 检查正负号
        if (index < str.length() && (str.charAt(index) == '+' || str.charAt(index) == '-')) {
            sign = str.charAt(index) == '+' ? 1 : -1;
            index++;
        }

        // 3. 转换数字
        while (index < str.length()) {
            int digit = str.charAt(index) - '0'; // 获取当前字符对应的数字
            if (digit < 0 || digit > 9) break; // 如果不是数字则退出循环
            // 检查溢出：如果 total > Integer.MAX_VALUE/10 或 total == Integer.MAX_VALUE/10 且 digit > Integer.MAX_VALUE%10，则会溢出
            if (total > Integer.MAX_VALUE / 10 || (total == Integer.MAX_VALUE / 10 && digit > Integer.MAX_VALUE % 10)) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }
            total = total * 10 + digit; // 将 digit 添加到 total 的最后
            index++;
        }
        return total * sign; // 返回转换后的整数
    }
}
```

这道题其实是 LeetCode 的第 8 题，如果你想看看更多的解题思路，可以看看这篇文章：[LeetCode 8. 字符串转换整数 (atoi)](https://paicoding.com/column/7/8)，我放在技术派的《二哥的 LeetCode 刷题笔记》专栏中。

这道题其实很好的字符与整数之间的转换，以及 if 和 while 语句的使用。超纲的内容就是字符串的处理，比如说去空格（`trim()`），比如说取字符（`charAt()`），但这些我们在[后面的章节](https://javabetter.cn/string/string-source.html)中都会讲到。

### 总结

经过这些练习题的练习，我想你就能完全掌握 Java 的语法知识了。


----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)