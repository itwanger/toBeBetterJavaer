---
title: Java 中的二维数组和嵌套数组
shortTitle: Java 中的二维数组和嵌套数组
description: 多维数组只是数组的数组 [https://chinese.freecodecamp.org/news/java-array-how-to-declare-and-initialize-an-array-in-java-example/] 。你可以将其视为存储多个容器的单个容器。 在本文中，我们将讨论 Java 中的二维数组。你将看到创建一个数组的语法，以及如何在二维数组中添加和访问项目。 如何在 Java 中声明一个二维数组 要在 Java 中创建二维数组，你必须指定要存储在数组中的项目的数据类型，后跟两个方括号和数组的名称。 语法如下所示： data_type[][] array_name; 让我们看一个代码示例。 int[][] oddNumbers = { {1, 3, 5, 7}, {9, 11, 13, 15} }; 如果你还没有理解上面发生的事情，请不要担心。在下一节中，你将了解有关二维数组如何工作以及如何访问存储在其中的项目的更多信息。 如何在 Java 中访问二维数组中的项目 我们可以使用两个方括号来访问二维中的项目。 第一个表示我们要从中访问项目的数
category:
  - 其他网站
head:
---

**原文：** [2D Array in Java – Two-Dimensional and Nested Arrays](https://www.freecodecamp.org/news/2d-array-in-java-two-dimensional-and-nested-arrays/)，作者：[Ihechikara Vincent Abba](https://www.freecodecamp.org/news/author/ihechikara/)



**译者：** [Miya Liu](/chinese/news/author/miyaliu/)

多维数组只是数组的[数组](https://chinese.freecodecamp.org/news/java-array-how-to-declare-and-initialize-an-array-in-java-example/)。你可以将其视为存储多个容器的单个容器。

在本文中，我们将讨论 Java 中的二维数组。你将看到创建一个数组的语法，以及如何在二维数组中添加和访问项目。

## 如何在 Java 中声明一个二维数组

要在 Java 中创建二维数组，你必须指定要存储在数组中的项目的数据类型，后跟两个方括号和数组的名称。

语法如下所示：

```txt
data_type[][] array_name;
```

让我们看一个代码示例。

```java
int[][] oddNumbers = { {1, 3, 5, 7}, {9, 11, 13, 15} };
```

如果你还没有理解上面发生的事情，请不要担心。在下一节中，你将了解有关二维数组如何工作以及如何访问存储在其中的项目的更多信息。

## 如何在 Java 中访问二维数组中的项目

我们可以使用两个方括号来访问二维中的项目。

第一个表示我们要从中访问项目的数组，而第二个表示我们要访问的项目的索引。

让我们用一个例子来简化上面的解释：

```java
int[][] oddNumbers = { {1, 3, 5, 7}, {9, 11, 13, 15} };

System.out.println(oddNumbers[0][0]);
// 1
```

在上面的示例中，`oddNumbers` 数组中有两个数组——`{1, 3, 5, 7}` 和 `{9, 11, 13, 15}`。

第一个数组——`{1, 3, 5, 7}`——用 0 表示。

第二个数组——`{9, 11, 13, 15}`——用 1 表示。

第一个数组是 0，第二个是 1，第三个是 2，依此类推。

因此，要访问第一个数组中的项目，我们将 0 分配给第一个方括号。由于我们试图访问数组中的第一项，我们将使用它的索引，即 0：`oddNumbers[0][0]`。

让我们进一步分解它。

这是访问项目的代码：`oddNumbers[?][?]`。

我在两个方括号中都加上了问号——我们会随着我们的进展填写它们。

因此，假设我们要访问第二个数组中用 1 表示的项目，我们的代码将如下所示：`oddNumbers[1][?]`。

现在我们在第二个数组（`{9, 11, 13, 15}`）中，让我们尝试访问其中的一个项目。就像常规数组一样，每个项目都有一个从零开始的索引。

因此，要访问第三项 `13`，我们将其索引号传递给第二个方括号：`oddNumbers[1][2]`。

在下一节中，我们将从一个新示例开始。

## 如何在 Java 示例中访问二维数组中的项目

```java
int[][] oddNumbers = { {1, 3, 5, 7}, {9, 11, 13, 15}, {17, 19, 21, 23} };
```

这里的目标是访问第三个数组中的 21。我们的访问代码仍然有问号：`oddNumbers[?][?]`。

我们将首先给第一个问号一个指向要访问的特定数组的值。

数组 0 => `{1, 3, 5, 7}`

数组 1 => `{9, 11, 13, 15}`

数组 2 => `{17, 19, 21, 23}`

我们要查找的数字在第三个数组中，数组索引为 2。所以我们找到了第一个方括号的值：`oddNumbers[2][?]`。

第二个方括号的值将指向要访问的实际项目。为此，我们必须指定项目的索引号。以下是该数组中的索引：

17 => 索引 0

19 => 索引 1

21 => 索引 2

23 => 索引 3

21 的索引为 2，因此我们可以继续将其添加到第二个方括号：`oddNumbers[2][2]`。当你将其打印到控制台时，你将打印出 21。

代码如下所示：

```java
int[][] oddNumbers = { {1, 3, 5, 7}, {9, 11, 13, 15}, {17, 19, 21, 23} };

System.out.println(oddNumbers[2][2]);
// 21
```

你可以使用嵌套循环遍历二维数组中的所有项目。这是一个例子：

```java
int[][] oddNumbers = { {1, 3, 5, 7}, {9, 11, 13, 15}, {17, 19, 21, 23} };

for(int i = 0; i < oddNumbers.length; i++){
    for(int j = 0; j < oddNumbers[i].length; j++){
        System.out.println(oddNumbers[i][j]);
    }   
}

// 1
// 3
// 5
// 7
// 9
// 11
// 13
// 15
// 17
// 19
// 21
// 23
```

上面的代码打印出 `oddNumbers` 数组中的所有项目。

## **小结**

在本文中，我们讨论了 Java 中的二维数组。

我们看到了创建二维数组的语法，还看到了展示如何访问存储在其中的项目的示例。

最后，我们看到了如何循环并打印二维数组中的项目。

祝你编程愉快！

>参考链接：[https://www.freecodecamp.org/chinese/news/2d-array-in-java-two-dimensional-and-nested-arrays/](https://www.freecodecamp.org/chinese/news/2d-array-in-java-two-dimensional-and-nested-arrays/)，整理：沉默王二
