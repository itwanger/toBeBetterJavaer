---
title: isEmpty 和 isBlank 的用法区别，至少一半的人答不上来...
shortTitle: isEmpty 和 isBlank 的用法区别，至少一半的人答不上来...
description: 如题
category:
  - 微信公众号
head:
  - - meta
    - name: description
      content: 如题
---

> [二哥编程知识星球](https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw) （戳链接加入）正式上线了，来和 **370 多名** 小伙伴一起打怪升级吧！这是一个 Java 学习指南 + 编程实战的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。<br><br>
> Java程序员进阶之路网址：[https://tobebetterjavaer.com](https://tobebetterjavaer.com)


>文章来源：https://sourl.cn/dRpJ6b

大家好，我是二哥，开发中经常有些小细节容易忽略，这些小细节往往容易导致代码缺陷，今天分享一波工具类的小细节

也许你两个都不知道,也许你除了`isEmpty`/`isNotEmpty`/`isNotBlank`/`isBlank`外,并不知道还有`isAnyEmpty`/`isNoneEmpty`/`isAnyBlank`/`isNoneBlank`的存在, come on ,让我们一起来探索`org.apache.commons.lang3.StringUtils;`这个工具类。

## isEmpty 系列

### StringUtils.isEmpty()

是否为空. 可以看到 " " 空格是会绕过这种空判断,因为是一个空格,并不是严格的空值,会导致 `isEmpty(" ")=false`

```
StringUtils.isEmpty(null) = true
StringUtils.isEmpty("") = true
StringUtils.isEmpty(" ") = false
StringUtils.isEmpty("bob") = false
StringUtils.isEmpty(" bob ") = false
/**
 *
 * <p>NOTE: This method changed in Lang version 2.0.
 * It no longer trims the CharSequence.
 * That functionality is available in isBlank().</p>
 *
 * @param cs  the CharSequence to check, may be null
 * @return {@code true} if the CharSequence is empty or null
 * @since 3.0 Changed signature from isEmpty(String) to isEmpty(CharSequence)
 */
public static boolean isEmpty(final CharSequence cs) {
    return cs == null || cs.length() == 0;
}
```

### StringUtils.isNotEmpty()

相当于不为空 , `= !isEmpty()`。

```
public static boolean isNotEmpty(final CharSequence cs) {
        return !isEmpty(cs);
    }
```

### StringUtils.isAnyEmpty()

是否有一个为空,只有一个为空,就为 true。

```
StringUtils.isAnyEmpty(null) = true
StringUtils.isAnyEmpty(null, "foo") = true
StringUtils.isAnyEmpty("", "bar") = true
StringUtils.isAnyEmpty("bob", "") = true
StringUtils.isAnyEmpty(" bob ", null) = true
StringUtils.isAnyEmpty(" ", "bar") = false
StringUtils.isAnyEmpty("foo", "bar") = false
/**
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if any of the CharSequences are empty or null
 * @since 3.2
 */
public static boolean isAnyEmpty(final CharSequence... css) {
  if (ArrayUtils.isEmpty(css)) {
    return true;
  }
  for (final CharSequence cs : css){
    if (isEmpty(cs)) {
      return true;
    }
  }
  return false;
}
```

### StringUtils.isNoneEmpty()

相当于`!isAnyEmpty(css)` , 必须所有的值都不为空才返回 true

```
/**
 * <p>Checks if none of the CharSequences are empty ("") or null.</p>
 *
 * <pre>
 * StringUtils.isNoneEmpty(null)             = false
 * StringUtils.isNoneEmpty(null, "foo")      = false
 * StringUtils.isNoneEmpty("", "bar")        = false
 * StringUtils.isNoneEmpty("bob", "")        = false
 * StringUtils.isNoneEmpty("  bob  ", null)  = false
 * StringUtils.isNoneEmpty(" ", "bar")       = true
 * StringUtils.isNoneEmpty("foo", "bar")     = true
 * </pre>
 *
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if none of the CharSequences are empty or null
 * @since 3.2
 */
public static boolean isNoneEmpty(final CharSequence... css) {
```

## isBank 系列

### StringUtils.isBlank()

是否为真空值(空格或者空值)

```
StringUtils.isBlank(null) = true
StringUtils.isBlank("") = true
StringUtils.isBlank(" ") = true
StringUtils.isBlank("bob") = false
StringUtils.isBlank(" bob ") = false
/**
 * <p>Checks if a CharSequence is whitespace, empty ("") or null.</p>
 * @param cs  the CharSequence to check, may be null
 * @return {@code true} if the CharSequence is null, empty or whitespace
 * @since 2.0
 * @since 3.0 Changed signature from isBlank(String) to isBlank(CharSequence)
 */
public static boolean isBlank(final CharSequence cs) {
    int strLen;
    if (cs == null || (strLen = cs.length()) == 0) {
        return true;
    }
    for (int i = 0; i < strLen; i++) {
        if (Character.isWhitespace(cs.charAt(i)) == false) {
            return false;
        }
    }
    return true;
}
```

### StringUtils.isNotBlank()

是否真的不为空,不是空格或者空值 ,相当于`!isBlank();`

```
public static boolean isNotBlank(final CharSequence cs) {
        return !isBlank(cs);
    }
```

### StringUtils.isAnyBlank()

是否包含任何真空值(包含空格或空值)

```
StringUtils.isAnyBlank(null) = true
StringUtils.isAnyBlank(null, "foo") = true
StringUtils.isAnyBlank(null, null) = true
StringUtils.isAnyBlank("", "bar") = true
StringUtils.isAnyBlank("bob", "") = true
StringUtils.isAnyBlank(" bob ", null) = true
StringUtils.isAnyBlank(" ", "bar") = true
StringUtils.isAnyBlank("foo", "bar") = false
 /**
 * <p>Checks if any one of the CharSequences are blank ("") or null and not whitespace only..</p>
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if any of the CharSequences are blank or null or whitespace only
 * @since 3.2
 */
public static boolean isAnyBlank(final CharSequence... css) {
  if (ArrayUtils.isEmpty(css)) {
    return true;
  }
  for (final CharSequence cs : css){
    if (isBlank(cs)) {
      return true;
    }
  }
  return false;
}
```

### StringUtils.isNoneBlank()

是否全部都不包含空值或空格

```
StringUtils.isNoneBlank(null) = false
StringUtils.isNoneBlank(null, "foo") = false
StringUtils.isNoneBlank(null, null) = false
StringUtils.isNoneBlank("", "bar") = false
StringUtils.isNoneBlank("bob", "") = false
StringUtils.isNoneBlank(" bob ", null) = false
StringUtils.isNoneBlank(" ", "bar") = false
StringUtils.isNoneBlank("foo", "bar") = true
/**
 * <p>Checks if none of the CharSequences are blank ("") or null and whitespace only..</p>
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if none of the CharSequences are blank or null or whitespace only
 * @since 3.2
 */
public static boolean isNoneBlank(final CharSequence... css) {
  return !isAnyBlank(css);
}
```

## StringUtils 的其他方法

可以参考官方的文档,里面有详细的描述,有些方法还是很好用的。

> https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html

| 方法名   | 英文解释   | 中文解释|
| --------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| IsEmpty/IsBlank| checks if a String contains text| 检查字符串是否包含文本                   |
| Trim/Strip     | removes leading and trailing whitespace      | 删除前导和尾随空格   |
| Equals/Compare | compares two strings null-safe  | 比较两个字符串是否为 null 安全的         |
| startsWith     | check if a String starts with a prefix null-safe       | 检查字符串是否以前缀 null 安全开头       |
| endsWith       | check if a String ends with a suffix null-safe         | 检查字符串是否以后缀 null 安全结尾       |
| IndexOf/LastIndexOf/Contains| null-safe index-of checks       | 包含空安全索引检查   |
| IndexOfAny/LastIndexOfAny/IndexOfAnyBut/LastIndexOfAnyBut | index-of any of a set of Strings| 任意一组字符串的索引 |
| ContainsOnly/ContainsNone/ContainsAny | does String contains only/none/any of these characters | 字符串是否仅包含/无/这些字符中的任何一个 |
| Substring/Left/Right/Mid    | null-safe substring extractions | 字符串安全提取       |
| SubstringBefore/SubstringAfter/SubstringBetween           | substring extraction relative to other strings -相对其他字符串的字符串提取 |
| Split/Join|splits a String into an array of substrings and vice versa|将字符串拆分为子字符串数组，反之亦然|
|Remove/Delete|removes part of a String -删除字符串的一部分|  
|Replace/Overlay|Searches a String and replaces one String with another|搜索字符串，然后用另一个字符串替换|
|Chomp/Chop|removes the last part of a String|删除字符串的最后一部分|
|AppendIfMissing|appends a suffix to the end of the String if not present|如果不存在后缀，则在字符串的末尾附加一个后缀|
|PrependIfMissing|prepends a prefix to the start of the String if not present|如果不存在前缀，则在字符串的开头添加前缀|
|LeftPad/RightPad/Center/Repeat|pads a String|填充字符串|
|UpperCase/LowerCase/SwapCase/Capitalize/Uncapitalize|changes the case of a String|更改字符串的大小写|
|CountMatches|counts the number of occurrences of one String in another|计算一个字符串在另一个字符串中出现的次数|
|IsAlpha/IsNumeric/IsWhitespace/IsAsciiPrintable|checks the characters in a String|检查字符串中的字符|
|DefaultString|protects against a null input String|防止输入字符串为空|
|Rotate|rotate (circular shift) a String|旋转（循环移位）字符串|
|Reverse/ReverseDelimited|reverses a String -反转字符串|  
|Abbreviate|abbreviates a string using ellipsis or another given String|使用省略号或另一个给定的 String 缩写一个字符串|
|Difference|compares Strings and reports on their differences|比较字符串并报告其差异|
|LevenshteinDistance|the number of changes needed to change one String into another|将一个 String 转换为另一个 String 所需的更改次数|

## 程序汪资料链接

> 转载链接：[https://mp.weixin.qq.com/s?\_\_biz=MzA4NzQ0Njc4Ng==&mid=2247504624&idx=1&sn=c47e5413aa4914c7301970e0d217bc88&chksm=903bd69da74c5f8b4d4dc6683b4e34b2750278df3dcb9d13b129e80bad9a435b3d98e4ad3fe6#rd](https://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247504624&idx=1&sn=c47e5413aa4914c7301970e0d217bc88&chksm=903bd69da74c5f8b4d4dc6683b4e34b2750278df3dcb9d13b129e80bad9a435b3d98e4ad3fe6#rd)，出处：我是程序汪，整理：沉默王二
