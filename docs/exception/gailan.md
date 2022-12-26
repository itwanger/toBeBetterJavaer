---
title: 一文彻底搞懂Java异常处理，YYDS
shortTitle: 一文彻底搞懂Java异常处理
category:
  - Java核心
tag:
  - 异常处理
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，一文彻底搞懂Java异常处理，YYDS
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,异常处理
---

## 一、什么是异常

“二哥，今天就要学习异常了吗？”三妹问。

“是的。只有正确地处理好异常，才能保证程序的可靠性，所以异常的学习还是很有必要的。”我说。

“那到底什么是异常呢？”三妹问。

“异常是指中断程序正常执行的一个不确定的事件。当异常发生时，程序的正常执行流程就会被打断。一般情况下，程序都会有很多条语句，如果没有异常处理机制，前面的语句一旦出现了异常，后面的语句就没办法继续执行了。”

“有了异常处理机制后，程序在发生异常的时候就不会中断，我们可以对异常进行捕获，然后改变程序执行的流程。”

“除此之外，异常处理机制可以保证我们向用户提供友好的提示信息，而不是程序原生的异常信息——用户根本理解不了。”

“不过，站在开发者的角度，我们更希望看到原生的异常信息，因为这有助于我们更快地找到 bug 的根源，反而被过度包装的异常信息会干扰我们的视线。”

“Java 语言在一开始就提供了相对完善的异常处理机制，这种机制大大降低了编写可靠程序的门槛，这也是 Java 之所以能够流行的原因之一。”

“那导致程序抛出异常的原因有哪些呢？”三妹问。

比如说：

- 程序在试图打开一个不存在的文件；
- 程序遇到了网络连接问题；
- 用户输入了糟糕的数据；
- 程序在处理算术问题时没有考虑除数为 0 的情况；

等等等等。

挑个最简单的原因来说吧。

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(10/0);
    }
}
```

这段代码在运行的时候抛出的异常信息如下所示：

```
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at com.itwanger.s41.Demo.main(Demo.java:8)
```

“你看，三妹，这个原生的异常信息对用户来说，显然是不太容易理解的，但对于我们开发者来说，简直不要太直白了——很容易就能定位到异常发生的根源。”

## 二、Exception和Error的区别

“哦，我知道了。下一个问题，我经常看到一些文章里提到 Exception 和 Error，二哥你能帮我解释一下它们之间的区别吗？”三妹问。

“这是一个好问题呀，三妹！”

从单词的释义上来看，error 为错误，exception 为异常，错误的等级明显比异常要高一些。

从程序的角度来看，也的确如此。

Error 的出现，意味着程序出现了严重的问题，而这些问题不应该再交给 Java 的异常处理机制来处理，程序应该直接崩溃掉，比如说 OutOfMemoryError，内存溢出了，这就意味着程序在运行时申请的内存大于系统能够提供的内存，导致出现的错误，这种错误的出现，对于程序来说是致命的。

Exception 的出现，意味着程序出现了一些在可控范围内的问题，我们应当采取措施进行挽救。

比如说之前提到的 ArithmeticException，很明显是因为除数出现了 0 的情况，我们可以选择捕获异常，然后提示用户不应该进行除 0 操作，当然了，更好的做法是直接对除数进行判断，如果是 0 就不进行除法运算，而是告诉用户换一个非 0 的数进行运算。

## 三、checked和unchecked异常

“三妹，还能想到其他的问题吗？”

“嗯，不用想，二哥，我已经提前做好预习工作了。”三妹自信地说，“异常又可以分为 checked 和 unchecked，它们之间又有什么区别呢？”

“哇，三妹，果然又是一个好问题呢。”

checked 异常（检查型异常）在源代码里必须显式地捕获或者抛出，否则编译器会提示你进行相应的操作；而 unchecked 异常（非检查型异常）就是所谓的运行时异常，通常是可以通过编码进行规避的，并不需要显式地捕获或者抛出。

“我先画一幅思维导图给你感受一下。”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/exception/gailan-01.png)

首先，Exception 和 Error 都继承了 Throwable 类。换句话说，只有 Throwable 类（或者子类）的对象才能使用 throw 关键字抛出，或者作为 catch 的参数类型。

面试中经常问到的一个问题是，NoClassDefFoundError 和 ClassNotFoundException 有什么区别？

“三妹你知道吗？”

“不知道，二哥，你解释下呗。”

它们都是由于系统运行时找不到要加载的类导致的，但是触发的原因不一样。

- NoClassDefFoundError：程序在编译时可以找到所依赖的类，但是在运行时找不到指定的类文件，导致抛出该错误；原因可能是 jar 包缺失或者调用了初始化失败的类。
- ClassNotFoundException：当动态加载 Class 对象的时候找不到对应的类时抛出该异常；原因可能是要加载的类不存在或者类名写错了。


其次，像 IOException、ClassNotFoundException、SQLException 都属于 checked 异常；像 RuntimeException 以及子类 ArithmeticException、ClassCastException、ArrayIndexOutOfBoundsException、NullPointerException，都属于 unchecked 异常。

unchecked 异常可以不在程序中显示处理，就像之前提到的 ArithmeticException 就是的；但 checked 异常必须显式处理。

比如说下面这行代码：

```java
Class clz = Class.forName("com.itwanger.s41.Demo1");
```

如果没做处理，比如说在 Intellij IDEA 环境下，就会提示你这行代码可能会抛出 `java.lang.ClassNotFoundException`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/exception/gailan-02.png)

建议你要么使用 try-catch 进行捕获：

```java
try {
    Class clz = Class.forName("com.itwanger.s41.Demo1");
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}
```

注意打印异常堆栈信息的 `printStackTrace()` 方法，该方法会将异常的堆栈信息打印到标准的控制台下，如果是测试环境，这样的写法还 OK，如果是生产环境，这样的写法是不可取的，必须使用日志框架把异常的堆栈信息输出到日志系统中，否则可能没办法跟踪。

要么在方法签名上使用 throws 关键字抛出：

```java
public class Demo1 {
    public static void main(String[] args) throws ClassNotFoundException {
        Class clz = Class.forName("com.itwanger.s41.Demo1");
    }
}
```

这样做的好处是不需要对异常进行捕获处理，只需要交给 Java 虚拟机来处理即可；坏处就是没法针对这种情况做相应的处理。

“二哥，针对 checked 异常，我在知乎上看到一个帖子，说 Java 中的 checked 很没有必要，这种异常在编译期要么 try-catch，要么 throws，但又不一定会出现异常，你觉得这样的设计有意义吗？”三妹提出了一个很尖锐的问题。

“哇，这种问题问的好。”我不由得对三妹心生敬佩。

“的确，checked 异常在业界是有争论的，它假设我们捕获了异常，并且针对这种情况作了相应的处理，但有些时候，根本就没法处理。”我说，“就拿上面提到的 ClassNotFoundException 异常来说，我们假设对其进行了 try-catch，可真的出现了 ClassNotFoundException 异常后，我们也没多少的可操作性，再 `Class.forName()` 一次？”

另外，checked 异常也不兼容函数式编程，后面如果你写 Lambda/Stream 代码的时候，就会体验到这种苦涩。

当然了，checked 异常并不是一无是处，尤其是在遇到 IO 或者网络异常的时候，比如说进行 Socket 链接，我大致写了一段：

```java
public class Demo2 {
    private String mHost;
    private int mPort;
    private Socket mSocket;
    private final Object mLock = new Object();

    public void run() {
    }

    private void initSocket() {
        while (true) {
            try {
                Socket socket = new Socket(mHost, mPort);
                synchronized (mLock) {
                    mSocket = socket;
                }
                break;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

当发生 IOException 的时候，socket 就重新尝试连接，否则就 break 跳出循环。意味着如果 IOException 不是 checked 异常，这种写法就略显突兀，因为 IOException 没办法像 ArithmeticException 那样用一个 if 语句判断除数是否为 0 去规避。

或者说，强制性的 checked 异常可以让我们在编程的时候去思考，遇到这种异常的时候该怎么更优雅的去处理。显然，Socket 编程中，肯定是会遇到 IOException 的，假如 IOException 是非检查型异常，就意味着开发者也可以不考虑，直接跳过，交给 Java 虚拟机来处理，但我觉得这样做肯定更不合适。

## 四、关于 throw 和 throws

“二哥，你能告诉我 throw 和 throws 两个关键字的区别吗？”三妹问。

“throw 关键字，用于主动地抛出异常；正常情况下，当除数为 0 的时候，程序会主动抛出 ArithmeticException；但如果我们想要除数为 1 的时候也抛出 ArithmeticException，就可以使用 throw 关键字主动地抛出异常。”我说。

```java
throw new exception_class("error message");
```

语法也非常简单，throw 关键字后跟上 new 关键字，以及异常的类型还有参数即可。

举个例子。

```java
public class ThrowDemo {
    static void checkEligibilty(int stuage){
        if(stuage<18) {
            throw new ArithmeticException("年纪未满 18 岁，禁止观影");
        } else {
            System.out.println("请认真观影!!");
        }
    }

    public static void main(String args[]){
        checkEligibilty(10);
        System.out.println("愉快地周末..");
    }
}
```

这段代码在运行的时候就会抛出以下错误：

```
Exception in thread "main" java.lang.ArithmeticException: 年纪未满 18 岁，禁止观影
    at com.itwanger.s43.ThrowDemo.checkEligibilty(ThrowDemo.java:9)
    at com.itwanger.s43.ThrowDemo.main(ThrowDemo.java:16)
```

“throws 关键字的作用就和 throw 完全不同。”我说，“前面的小节里已经讲了 checked exception 和 unchecked exception，也就是检查型异常和非检查型异常；对于检查型异常来说，如果你没有做处理，编译器就会提示你。”

`Class.forName()` 方法在执行的时候可能会遇到 `java.lang.ClassNotFoundException` 异常，一个检查型异常，如果没有做处理，IDEA 就会提示你，要么在方法签名上声明，要么放在 try-catch 中。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/exception/throw-throws-01.png)

“那什么情况下使用 throws 而不是 try-catch 呢？”三妹问。

“假设现在有这么一个方法 `myMethod()`，可能会出现 ArithmeticException 异常，也可能会出现 NullPointerException。这种情况下，可以使用 try-catch 来处理。”我回答。

```java
public void myMethod() {
    try {
        // 可能抛出异常 
    } catch (ArithmeticException e) {
        // 算术异常
    } catch (NullPointerException e) {
        // 空指针异常
    }
}
```

“但假设有好几个类似 `myMethod()` 的方法，如果为每个方法都加上 try-catch，就会显得非常繁琐。代码就会变得又臭又长，可读性就差了。”我继续说。

“一个解决办法就是，使用 throws 关键字，在方法签名上声明可能会抛出的异常，然后在调用该方法的地方使用 try-catch 进行处理。”

```java
public static void main(String args[]){
    try {
        myMethod1();
    } catch (ArithmeticException e) {
        // 算术异常
    } catch (NullPointerException e) {
        // 空指针异常
    }
}
public static void myMethod1() throws ArithmeticException, NullPointerException{
    // 方法签名上声明异常
}
```

“好了，我来总结下 throw 和 throws 的区别，三妹，你记一下。”

 1）throws 关键字用于声明异常，它的作用和 try-catch 相似；而 throw 关键字用于显式的抛出异常。

2）throws 关键字后面跟的是异常的名字；而 throw 关键字后面跟的是异常的对象。

示例。

```
throws ArithmeticException;
```

```
throw new ArithmeticException("算术异常");
```

 3）throws 关键字出现在方法签名上，而 throw 关键字出现在方法体里。

4）throws 关键字在声明异常的时候可以跟多个，用逗号隔开；而 throw 关键字每次只能抛出一个异常。

## 五、关于 try-catch-finally

“二哥，之前你讲了异常处理机制，这一节讲什么呢？”三妹问。

“该讲 try-catch-finally 了。”我说，“try 关键字后面会跟一个大括号 `{}`，我们把一些可能发生异常的代码放到大括号里；`try` 块后面一般会跟 `catch` 块，用来处理发生异常的情况；当然了，异常不一定会发生，为了保证发不发生异常都能执行一些代码，就会跟一个 `finally` 块。”

“具体该怎么用呀，二哥？”三妹问。

“别担心，三妹，我一一来说明下。”我说。

`try` 块的语法很简单：

```java
try{
// 可能发生异常的代码
}
```

“注意啊，三妹，如果一些代码确定不会抛出异常，就尽量不要把它包裹在 `try` 块里，因为加了异常处理的代码执行起来要比没有加的花费更多的时间。”

`catch` 块的语法也很简单：

```java
try{
// 可能发生异常的代码
}catch (exception(type) e(object)){
// 异常处理代码
}
```

一个 `try` 块后面可以跟多个 `catch` 块，用来捕获不同类型的异常并做相应的处理，当 try 块中的某一行代码发生异常时，之后的代码就不再执行，而是会跳转到异常对应的 catch 块中执行。

如果一个 try 块后面跟了多个与之关联的 catch 块，那么应该把特定的异常放在前面，通用型的异常放在后面，不然编译器会提示错误。举例来说。

```java
static void test() {
    int num1, num2;
    try {
        num1 = 0;
        num2 = 62 / num1;
        System.out.println(num2);
        System.out.println("try 块的最后一句");
    } catch (ArithmeticException e) {
        // 算术运算发生时跳转到这里
        System.out.println("除数不能为零");
    } catch (Exception e) {
        // 通用型的异常意味着可以捕获所有的异常，它应该放在最后面，
        System.out.println("异常发生了");
    }
    System.out.println("try-catch 之外的代码.");
}
```

“为什么 Exception 不能放到 ArithmeticException 前面呢？”三妹问。

“因为 ArithmeticException 是 Exception 的子类，它更具体，我们看到就这个异常就知道是发生了算术错误，而 Exception 比较泛，它隐藏了具体的异常信息，我们看到后并不确定到底是发生了哪一种类型的异常，对错误的排查很不利。”我说，“再者，如果把通用型的异常放在前面，就意味着其他的 catch 块永远也不会执行，所以编译器就直接提示错误了。”

“再给你举个例子，注意看，三妹。”

```java
static void test1 () {
    try{
        int arr[]=new int[7];
        arr[4]=30/0;
        System.out.println("try 块的最后");
    } catch(ArithmeticException e){
        System.out.println("除数必须是 0");
    } catch(ArrayIndexOutOfBoundsException e){
        System.out.println("数组越界了");
    } catch(Exception e){
        System.out.println("一些其他的异常");
    }
    System.out.println("try-catch 之外");
}
```

这段代码在执行的时候，第一个 catch 块会执行，因为除数为零；我再来稍微改动下代码。

```java
static void test1 () {
    try{
        int arr[]=new int[7];
        arr[9]=30/1;
        System.out.println("try 块的最后");
    } catch(ArithmeticException e){
        System.out.println("除数必须是 0");
    } catch(ArrayIndexOutOfBoundsException e){
        System.out.println("数组越界了");
    } catch(Exception e){
        System.out.println("一些其他的异常");
    }
    System.out.println("try-catch 之外");
}
```

“我知道，二哥，第二个 catch 块会执行，因为没有发生算术异常，但数组越界了。”三妹没等我把代码运行起来就说出了答案。

“三妹，你说得很对，我再来改一下代码。”

```java
static void test1 () {
    try{
        int arr[]=new int[7];
        arr[9]=30/1;
        System.out.println("try 块的最后");
    } catch(ArithmeticException | ArrayIndexOutOfBoundsException e){
        System.out.println("除数必须是 0");
    }
    System.out.println("try-catch 之外");
}
```

“当有多个 catch 的时候，也可以放在一起，用竖划线 `|` 隔开，就像上面这样。”我说。

“这样不错呀，看起来更简洁了。”三妹说。

`finally` 块的语法也不复杂。

```java
try {
    // 可能发生异常的代码
}catch {
   // 异常处理
}finally {
   // 必须执行的代码
}
```

在没有 `try-with-resources` 之前，finally 块常用来关闭一些连接资源，比如说 socket、数据库链接、IO 输入输出流等。

```java
OutputStream osf = new FileOutputStream( "filename" );
OutputStream osb = new BufferedOutputStream(opf);
ObjectOutput op = new ObjectOutputStream(osb);
try{
    output.writeObject(writableObject);
} finally{
    op.close();
}
```

“三妹，注意，使用 finally 块的时候需要遵守这些规则。”

- finally 块前面必须有 try 块，不要把 finally 块单独拉出来使用。编译器也不允许这样做。
- finally 块不是必选项，有 try 块的时候不一定要有 finally 块。
- 如果 finally 块中的代码可能会发生异常，也应该使用 try-catch 进行包裹。
- 即便是 try 块中执行了 return、break、continue 这些跳转语句，finally 块也会被执行。

“真的吗，二哥？”三妹对最后一个规则充满了疑惑。

“来试一下就知道了。”我说。

```java
static int test2 () {
    try {
        return 112;
    }
    finally {
        System.out.println("即使 try 块有 return，finally 块也会执行");
    }
}
```

来看一下输出结果：

```
即使 try 块有 return，finally 块也会执行
```

“那，会不会有不执行 finally 的情况呀？”三妹很好奇。

“有的。”我斩钉截铁地回答。

- 遇到了死循环。
- 执行了 `System. exit()` 这行代码。

`System.exit()` 和 `return` 语句不同，前者是用来退出程序的，后者只是回到了上一级方法调用。

“三妹，来看一下源码的文档注释就全明白了！”

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/exception/try-catch-finally-01.png)

至于参数 status 的值也很好理解，如果是异常退出，设置为非 0 即可，通常用 1 来表示；如果是想正常退出程序，用 0 表示即可。

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
