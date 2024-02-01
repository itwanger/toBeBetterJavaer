---
title: 栈栈栈栈栈栈栈栈栈栈栈栈栈栈栈栈栈栈
shortTitle: 栈Stack详解（附源码）
category:
  - Java核心
tag:
  - 集合框架（容器）
---

# 6.4 栈Stack

讲真，Stack 这个类在 Java 应用中并不常用，但栈这个数据结构在整个计算机体系中却十分重要。所以我们还是放到[集合框架](https://javabetter.cn/collection/gailan.html)里来讲一讲。

栈（stack），有些地方喜欢称呼它为堆栈，我就很不喜欢，很容易和 heap（堆）搞混，尤其是对于新手来说，简直就是虐心。

### 栈数据结构

栈是一种非常有用的数据结构，它就像一摞盘子，第一个放在最下面，第二个放在第一个上面，第三个放在第二个上面，最后一个放在最上面。

![](https://cdn.tobebetterjavaer.com/stutymore/vm-stack-register-20231217165356.png)

对于这一摞盘子，我们可以做两件事情：

- 在最上面放一个新盘子
- 把顶部的盘子拿走

这两件事情做起来很容易，但如果从中间或者底部抽出来一个盘子，就很难办到。如果我们想要拿到最下面的盘子，就必须把它上面的所有盘子都拿走，像这样的一个操作，我们称之为后进先出，也就是“Last In First Out”（简称 LIFO）——最后的一个进的，最先出去。

对于栈这样一个数据结构来说，它有两个常见的动作：

- push，中文释义有很多种，我个人更喜欢叫它“压入”，非常形象。当我们要把一个元素放入栈的顶部，这个动作就叫做 push。
- pop，同样的，我个人更喜欢叫它“弹出”，带有很强烈的动画效果，有没有？当我们要从栈中移除一个元素时，这个动作就叫做 pop。

![](https://cdn.tobebetterjavaer.com/stutymore/vm-stack-register-20231217165521.png)

对于上面这幅图来说，3 这个元素最后放进去，却是最先被移除的——遵循 LIFO 的原则。

明白了栈的基本操作后，我们需要去深入地思考一下，栈是如何工作的。换句话说，为了使栈这个数据结构按照栈的方式去工作，它需要什么？

1）栈需要有一个指针，我们称之为 `TOP`，用它来指向栈中最顶部的那个元素。

2）当我们初始化一个栈的时候，我们把 `TOP` 的值设置为 `-1`，这样我们就可以通过 `TOP == -1` 来判断栈是否为空。

3）当我们要在栈中压入一个元素的时候，我们把 `TOP` 的值加 1，然后把新压入的元素指向 TOP。

4）当我们要从栈中弹出一个元素的时候，我们把 `TOP` 的值减 1，然后把保持在最顶部的那个元素指向 TOP。

5）当我们压入一个元素的时候，需要检查栈是否已经满了。也就是说，需要有一个 `isFull()` 的方法来判断。

6）当我们要弹出一个元素的时候，需要检查栈是否已经空了。也就是说，需要有一个 `isEmpty()` 的方法来判断。

![](https://cdn.tobebetterjavaer.com/stutymore/stack-20240201142407.png)

空栈的时候，TOP 等于 -1；把元素 1 压入栈中的时候，`stack[0]` 为 1，TOP 加 1 变为 0；把元素 2 压入栈中的时候，`stack[1]` 为 2，TOP 加 1 变为 1；把元素 3 压入栈中的时候，`stack[2]` 为 3，TOP 加 1 变为 2；把元素 3 从栈中弹出后，返回元素 `stack[2]`，TOP 减 1 变为 1。

### 自定义栈

假设栈中的元素是 int 类型，我们可以用 Java 语言来自定义一个最简单的栈。它需要 3 个字段：

*   `int arr[]`，一个 int 类型的数组，来存放数据
*   `int top`，一个 int 类型的标记
*   `int capacity`，一个 int 类型的容量

```java
class Stack { 
     private int arr[]; 
     private int top; 
     private int capacity; 
 }
```
 

初始化栈：

```java
Stack(int size) { 
     arr = new int[size]; 
     capacity = size; 
     top = -1; 
 }
```
 

往栈中压入元素：

```java
public void push(int x) { 
     if (isFull()) { 
         System.out.println("溢出\n程序终止\n"); 
         System.exit(1); 
     } 
  
     System.out.println("压入 " + x); 
     arr[++top] = x; 
 }
```
 

从栈中弹出元素：

```java
public int pop() { 
     if (isEmpty()) { 
         System.out.println("栈是空的"); 
         System.exit(1); 
     } 
     return arr[top--]; 
 }
```
 

返回栈的大小：

```java
public int size() { 
     return top + 1; 
 }
```
 

检查栈是否为空：

```java
public Boolean isEmpty() { 
     return top == -1; 
 }
```
 

检查栈是否已经满了：

```java
public Boolean isFull() { 
     return top == capacity - 1; 
 }
```
 

来个 `main()` 方法直接测试下：

```java
public void printStack() { 
     for (int i = 0; i <= top; i++) { 
         System.out.println(arr[i]); 
     } 
 } 
  
 public static void main(String[] args) { 
     Stack stack = new Stack(5); 
  
     stack.push(1); 
     stack.push(2); 
     stack.push(3); 
     stack.push(4); 
  
     stack.pop(); 
     System.out.println("\n弹出元素后"); 
  
     stack.printStack(); 
 }
```
 

打印结果如下所示：

```
压入 1 
压入 2 
压入 3 
压入 4 

弹出元素后 
1 
2 
3
```
 

由于我们是通过[数组](https://javabetter.cn/array/array.html)来实现的栈，所以 `push` 和 `pop` 的[时间复杂度](https://javabetter.cn/collection/time-complexity.html)就是 `O(1)`。

尽管栈是一种非常简单的数据结构，通过上面的代码大家应该也能感受得出来，轻而易举地就实现了，但是栈却是一种非常强有力的数据结构，可以在很多场景中使用，比如说：

1）**反转一串字符**：由于栈是 `LIFO` 的，所以反转一串字符很容易，按照正常的顺序把字符压入栈中，然后再弹出来就行了。

2）**用于计算器**：记得我实习的时候，公司就给我们新人安排了我们一个小项目——模仿一个 Win 7 的计算机，用来考察我们是不是真材实料，要想计算一个复杂的表达式，比如说 `2 + 5 / 3 * (6 - 2)`，就需要一个栈来容纳这些数字和运算符，然后按照优先级弹出后进行计算。

嗯，这个计算要比想象中复杂一些，新手同学可以私底下实现一下，不仅能够提高对栈这种数据结构的理解，还能对运算符的一个优先级进行思考。

很显然，栈，给我赢得了一次实习的机会，避免了被刷下去的危机。

3）**用于浏览器**：浏览器的后退按钮会把我们访问的 URL 压入一个栈中，每次我们访问一个新的页面，新的 URL 就压入了栈的顶部，当我们点了后退按钮，最新的那个 URL 就从栈中移除，之前的那个 URL 就被访问到了。

好了，下课，今天的栈就到此为止吧。

### Stack 类

其实 Java 已经帮我们实现了一个栈，就是 `java.util.Stack`，它继承自 `Vector`，是线程安全的，有点 [StringBuffer](https://javabetter.cn/string/builder-buffer.html) 的感觉，笨笨的。

先来个简单的例子：

```java
Stack<String> stack = new Stack<>();
stack.push("沉默王二");
stack.push("沉默王三");
stack.push("一个文章真特么有趣的程序员");

System.out.println(stack);
```

Stack 类并不复杂，仅有几个重要的方法，比如说 `push`、`pop`、`peek`、`empty`、`search` 等等。

![](https://cdn.tobebetterjavaer.com/stutymore/stack-20240201143317.png)

我们来看一下 `push` 方法的源码：

```java
public E push(E item) { 
     addElement(item); 
  
     return item; 
 }
```

`push` 方法虽然没有 [synchronized](https://javabetter.cn/thread/synchronized-1.html) 关键字，但调用了 `Vector` 类的 `addElement` 方法，该方法上添加了 `synchronized` 关键字。

```java
public synchronized void addElement(E obj) { 
     modCount++; 
     ensureCapacityHelper(elementCount + 1); 
     elementData[elementCount++] = obj; 
 }
```

再来看一下 `pop` 方法的源码：

```java
public synchronized E pop() { 
     E obj; 
     int len = size(); 
  
     obj = peek(); 
     removeElementAt(len - 1); 
  
     return obj; 
 }
```

该方法添加了 `synchronized` 关键字，并且先调用 `peek` 方法获取到栈顶元素：

```java
public synchronized E peek() {
    int     len = size();

    if (len == 0)
        throw new EmptyStackException();
    return elementAt(len - 1);
}
```

接着调用 Vector 类的 `removeElementAt` 方法移除栈顶元素。

![](https://cdn.tobebetterjavaer.com/stutymore/stack-20240201144113.png)

注意该方法如果移除的不是栈顶元素，还会调用 `System.arraycopy` 进行数组的拷贝，因为栈的底层是由数组实现的。

```java
public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    protected Object[] elementData;
    protected int elementCount;
    protected int capacityIncrement;
}
```

### 小结

栈是一种非常有用的数据结构，它的特点是后进先出，可以用来反转一串字符、实现计算器、浏览器的后退按钮等等。

虽然 Stack 类并不常用，但栈这个数据结构却很重要。在 Java 中，推荐使用 ArrayDeque 来代替 Stack，因为 [ArrayDeque](https://javabetter.cn/collection/arraydeque.html) 是非线程安全的，性能更好。

如果想通过 LeetCode 进行练习的话，可以尝试一下这道题：

[有效的括号](https://paicoding.com/column/7/20)，我把题解放到了技术派上，大家可以参考。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)