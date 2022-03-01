### 39.Java 中异常处理体系?

Java 的异常体系是分为多层的。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/exception-1.png)

`Throwable`是 Java 语言中所有错误或异常的基类。 Throwable 又分为`Error`和`Exception`，其中 Error 是系统内部错误，比如虚拟机异常，是程序无法处理的。`Exception`是程序问题导致的异常，又分为两种：

- CheckedException 受检异常：编译器会强制检查并要求处理的异常。
- RuntimeException 运行时异常：程序运行中出现异常，比如我们熟悉的空指针、数组下标越界等等

### 40.异常的处理方式？

针对异常的处理主要有两种方式：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/exception-2.png)

- **遇到异常不进行具体处理，而是继续抛给调用者 （throw，throws）**

抛出异常有三种形式，一是 throw,一个 throws，还有一种系统自动抛异常。

throws 用在方法上，后面跟的是异常类，可以跟多个；而 throw 用在方法内，后面跟的是异常对象。

- **try catch 捕获异常**

在 catch 语句块中补货发生的异常，并进行处理。

```java
       try {
            //包含可能会出现异常的代码以及声明异常的方法
        }catch(Exception e) {
            //捕获异常并进行处理
        }finally {                                                       }
            //可选，必执行的代码
        }
```

try-catch 捕获异常的时候还可以选择加上 finally 语句块，finally 语句块不管程序是否正常执行，最终它都会必然执行。

### 41.三道经典异常处理代码题

> 题目 1

```java
public class TryDemo {
    public static void main(String[] args) {
        System.out.println(test());
    }
    public static int test() {
        try {
            return 1;
        } catch (Exception e) {
            return 2;
        } finally {
            System.out.print("3");
        }
    }
}
```

执行结果：31。

try、catch。finally 的基础用法，在 return 前会先执行 finally 语句块，所以是先输出 finally 里的 3，再输出 return 的 1。

> 题目 2

```java
public class TryDemo {
    public static void main(String[] args) {
        System.out.println(test1());
    }
    public static int test1() {
        try {
            return 2;
        } finally {
            return 3;
        }
    }
}
```

执行结果：3。

try 返回前先执行 finally，结果 finally 里不按套路出牌，直接 return 了，自然也就走不到 try 里面的 return 了。

finally 里面使用 return 仅存在于面试题中，实际开发这么写要挨吊的。

> 题目 3

```java
public class TryDemo {
    public static void main(String[] args) {
        System.out.println(test1());
    }
    public static int test1() {
        int i = 0;
        try {
            i = 2;
            return i;
        } finally {
            i = 3;
        }
    }
}
```

执行结果：2。

大家可能会以为结果应该是 3，因为在 return 前会执行 finally，而 i 在 finally 中被修改为 3 了，那最终返回 i 不是应该为 3 吗？

但其实，在执行 finally 之前，JVM 会先将 i 的结果暂存起来，然后 finally 执行完毕后，会返回之前暂存的结果，而不是返回 i，所以即使 i 已经被修改为 3，最终返回的还是之前暂存起来的结果 2。
