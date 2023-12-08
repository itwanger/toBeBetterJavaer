---
title: Java异常处理的20个最佳实践：提高编程效率与代码质量
shortTitle: 异常处理的20个最佳实践
category:
  - Java核心
tag:
  - 异常处理
description: 本文详细列举了 Java 异常处理中的 20 个最佳实践，包括异常种类的选择、异常捕获与处理的原则，以及编程过程中常见的错误和避免方法。这些实践能够帮助您在编写 Java 程序时提高编程效率，同时提升代码的质量和可维护性。阅读本文，让您在 Java 异常处理中避免常见陷阱，更加游刃有余。
head:
  - - meta
    - name: keywords
      content: Java,异常处理,最佳实践
---

# 8.3 异常处理的20个最佳实践

“三妹啊，今天我来给你传授 20 个异常处理的最佳实践经验，以免你以后在开发中采坑。”我面带着微笑对三妹说。

“好啊，二哥，我洗耳恭听。”三妹也微微一笑，欣然接受。

“好，那哥就不废话了。开整。”

### 01、尽量不要捕获 RuntimeException

[阿里出品的 Java 开发手册](https://javabetter.cn/pdf/ali-java-shouce.html)上这样规定：

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

### 02、尽量使用 try-with-resource 来关闭资源

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

“原因也很简单，因为一旦 `close()` 之前发生了异常，那么资源就无法关闭。直接使用 [try-with-resource](https://javabetter.cn/exception/try-with-resources.html) 来处理是最佳方式。”我说。

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

### 03、不要捕获 Throwable

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

### 04、不要省略异常信息的记录

很多时候，由于疏忽大意，我们很容易捕获了异常却没有记录异常信息，导致程序上线后真的出现了问题却没有记录可查。

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

### 05、不要记录了异常又抛出了异常

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

### 06、不要在 finally 块中使用 return

[阿里出品的 Java 开发手册](https://javabetter.cn/pdf/ali-java-shouce.html)上这样规定：

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

### 07、抛出具体定义的检查性异常而不是 Exception

```java
public void foo() throws Exception { //错误方式
}
```

一定要避免出现上面的代码，它破坏了检查性（checked）异常的目的。声明的方法应该尽可能抛出具体的检查性异常。

例如，如果一个方法可能会抛出 SQLException 异常，应该显式地声明抛出 SQLException 而不是 Exception 类型的异常。这样可以让其他开发者更好地理解代码的意图和异常处理的方式，并且可以根据 SQLException 的定义和文档来确定异常的处理方式和策略。

### 08、捕获具体的子类而不是捕获 Exception 类

```java
try {
   someMethod();
} catch (Exception e) { //错误方式
   LOGGER.error("method has failed", e);
}
```

如果在 catch 块中捕获 Exception 类型的异常，会将所有异常都捕获，从而可能会给程序带来不必要的麻烦。具体来说，如果捕获 Exception 类型的异常，可能会导致以下问题：

- 难以识别和定位异常：如果捕获 Exception 类型的异常，可能会捕获到一些不应该被处理的异常，从而导致程序难以识别和定位异常。
- 难以调试和排错：如果捕获 Exception 类型的异常，可能会使得调试和排错变得更加困难，因为无法确定具体的异常类型和异常发生的原因。

下面举一个例子来说明为什么应该尽可能地捕获具体的子类而不是 Exception 类型的异常。

假设我们有一个方法 `readFromFile(String filePath)`，用于从指定文件中读取数据。在方法实现过程中，可能会出现两种异常：FileNotFoundException 和 IOException。

如果在方法中使用以下 catch 块来捕获异常：

```java
try {
    // 读取数据的代码
} catch (Exception e) {
    // 异常处理的代码
}
```

这样做会捕获所有类型的异常，包括 Checked Exception 和 Unchecked Exception。这可能会导致以下问题：

- 发生 RuntimeException 类型的异常时，也会被捕获，从而可能会掩盖实际的异常信息。
- 在调试和排错时，无法确定异常的具体类型和发生原因，从而增加了调试和排错的难度。
- 在程序运行时，可能会捕获一些不需要处理的异常（如 NullPointerException、IllegalArgumentException 等），从而降低程序的性能和稳定性。

因此，为了更好地定位和处理异常，应该尽可能地捕获具体的子类，例如：

```java
try {
    // 读取数据的代码
} catch (FileNotFoundException e) {
    // 处理文件未找到异常的代码
} catch (IOException e) {
    // 处理输入输出异常的代码
}
```
这样做可以更准确地捕获异常，从而提高程序的健壮性和稳定性。

### 09、自定义异常时不要丢失堆栈跟踪

```java
catch (NoSuchMethodException e) {
   throw new MyServiceException("Some information: " + e.getMessage());  //错误方式
}
```

这破坏了原始异常的堆栈跟踪，正确的做法是：

```java
catch (NoSuchMethodException e) {
   throw new MyServiceException("Some information: " , e);  //正确方式
}
```

例如，下面是一个自定义异常类，它重写了 printStackTrace() 方法来打印堆栈跟踪信息：

```java
public class MyException extends Exception {
    public MyException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public void printStackTrace() {
        System.err.println("MyException:");
        super.printStackTrace();
    }
}
```

这样做可以保留堆栈跟踪信息，同时也可以提供自定义的异常信息。在抛出 MyException 异常时，可以得到完整的堆栈跟踪信息，从而更好地定位和解决异常。

### 10、finally 块中不要抛出任何异常

```java
try {
  someMethod();  //Throws exceptionOne
} finally {
  cleanUp();    //如果finally还抛出异常，那么exceptionOne将永远丢失
}
```

finally 块用于定义一段代码，无论 try 块中是否出现异常，都会被执行。finally 块通常用于释放资源、关闭文件等必须执行的操作。

如果在 finally 块中抛出异常，可能会导致原始异常被掩盖。比如说上例中，一旦 cleanup 抛出异常，someMethod 中的异常将会被覆盖。

### 11、不要在生产环境中使用 `printStackTrace()`

在 Java 中，`printStackTrace()` 方法用于将异常的堆栈跟踪信息输出到标准错误流中。这个方法对于调试和排错非常有用。但在生产环境中，不应该使用 `printStackTrace()` 方法，因为它可能会导致以下问题：

- `printStackTrace()` 方法将异常的堆栈跟踪信息输出到标准错误流中，这可能会暴露敏感信息，如文件路径、用户名、密码等。
- `printStackTrace()` 方法会将堆栈跟踪信息输出到标准错误流中，这可能会影响程序的性能和稳定性。在高并发的生产环境中，大量的异常堆栈跟踪信息可能会导致系统崩溃或出现意外的行为。
- 由于生产环境中往往是多线程、分布式的复杂系统，`printStackTrace()` 方法输出的堆栈跟踪信息可能并不完整或准确。

在生产环境中，应该使用日志系统来记录异常信息，例如 [log4j](https://javabetter.cn/gongju/log4j.html)、[slf4j](https://javabetter.cn/gongju/slf4j.html)、[logback](https://javabetter.cn/gongju/logback.html) 等。日志系统可以将异常信息记录到文件或数据库中，而不会暴露敏感信息，也不会影响程序的性能和稳定性。同时，日志系统也提供了更多的功能，如级别控制、滚动日志、邮件通知等。

```java
例如，可以使用 logback 记录异常信息，如下所示：
try {
    // some code
} catch (Exception e) {
    logger.error("An error occurred: ", e);
}
```

### 12、对于不打算处理的异常，直接使用 try-finally，不用 catch

```java
try {
  method1();  // 会调用 Method 2
} finally {
  cleanUp();    //do cleanup here
}
```

如果 method1 正在访问 Method 2，而 Method 2 抛出一些你不想在 Method 1 中处理的异常，但是仍然希望在发生异常时进行一些清理，可以直接在 finally 块中进行清理，不要使用 catch 块。

### 13、记住早 throw 晚 catch 原则

“早 throw, 晚 catch” 是 Java 中的一种异常处理原则。这个原则指的是在代码中尽可能早地抛出异常，以便在异常发生时能够及时地处理异常。同时，在 catch 块中尽可能晚地捕获异常，以便在捕获异常时能够获得更多的上下文信息，从而更好地处理异常。

来举个 “早 throw” 例子，如果一个方法需要传递参数，并且该参数必须满足一定的条件，如果参数不符合条件，则应该立即抛出异常，而不是在方法中进行其他操作。这可以确保异常在发生时能够及时被处理，避免更严重的问题。

再来举个“晚 catch”的例子，如果一个方法调用了其他方法，可能会抛出异常，如果在方法内部立即捕获异常，则可能会导致对异常的处理不充分。

来看这段代码：

```java
public class ExceptionDemo1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        try {
            int num = parseInt(str);
            System.out.println("转换结果：" + num);
        } catch (NumberFormatException e) {
            System.out.println("转换失败：" + e.getMessage());
        }
    }

    public static int parseInt(String str) {
        if (str == null || "".equals(str)) {
            throw new NullPointerException("字符串为空");
        }
        if (!str.matches("\\d+")) {
            throw new NumberFormatException("字符串不是数字");
        }
        return Integer.parseInt(str);
    }
}
```

这个示例中，定义了一个 `parseInt()` 方法，用于将字符串转换为整数。在该方法中，首先检测字符串是否为空，如果为空，则立即抛出 NullPointerException 异常。然后，检测字符串是否为数字，如果不是数字，则抛出 NumberFormatException 异常。最后，使用 `Integer.parseInt()` 方法将字符串转换为整数，并返回。

在示例的 `main()` 方法中，调用 `parseInt()` 方法，并使用 try-catch 块捕获可能抛出的 NumberFormatException 异常。如果转换成功，则输出转换结果，否则输出转换失败信息。

这个示例使用了 “早 throw, 晚 catch” 的原则，在 `parseInt()` 方法中尽可能早地抛出异常，在 `main()` 方法中尽可能晚地捕获异常，以便在捕获异常时能够获得更多的上下文信息，从而更好地处理异常。

运行该示例，输入一个数字字符串，可以看到输出转换结果。如果输入一个非数字字符串，则输出转换失败信息。

### 14、只抛出和方法相关的异常

相关性对于保持代码的整洁非常重要。一种尝试读取文件的方法，如果抛出 NullPointerException，那么它不会给用户提供有价值的信息。相反，如果这种异常被包裹在自定义异常中，则会更好。NoSuchFileFoundException 则对该方法的用户更有用。

```java
public class Demo {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("The result is: " + result);
        } catch (ArithmeticException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public static int divide(int a, int b) throws ArithmeticException {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}
```

在该示例中，只抛出了和方法相关的异常 ArithmeticException，这可以使代码更加清晰和易于维护。

### 15、切勿在代码中使用异常来进行流程控制

在代码中使用异常来进行流程控制会导致代码的可读性、可维护性和性能出现问题。

```java
public class Demo {
    public static void main(String[] args) {
        String input = "1,2,3,a,5";
        String[] values = input.split(",");
        for (String value : values) {
            try {
                int num = Integer.parseInt(value);
                System.out.println(num);
            } catch (NumberFormatException e) {
                System.err.println(value + " is not a valid number");
            }
        }
    }
}
```

虽然这个示例可以正确地处理输入字符串中的非数字字符，但是它使用异常进行流程控制，这就导致代码变得混乱、难以理解。应该使用其他合适的[控制结构](https://javabetter.cn/basic-grammar/flow-control.html)（如 if、switch、循环等）来管理程序的流程。

### 16、尽早验证用户输入以在请求处理的早期捕获异常

例如：在用户注册的业务中，如果按照这样来做：

1.  验证用户
2.  插入用户
3.  验证地址
4.  插入地址
5.  如果出问题回滚一切

这是不正确的做法，它会使数据库在各种情况下处于不一致的状态，应该首先验证所有内容，然后再进行数据库更新。正确的做法是：

1.  验证用户
2.  验证地址
3.  插入用户
4.  插入地址
5.  如果问题回滚一切

举个例子，我们用 JDBC 的方式往数据库插入数据，那么最好是先 validate 再 insert，而不是 validateUserInput、insertUserData、validateAddressInput、insertAddressData。

```java
Connection conn = null;
try {
    // Connect to the database
    conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydatabase", "username", "password");

    // Start a transaction
    conn.setAutoCommit(false);

    // Validate user input
    validateUserInput();

    // Insert user data
    insertUserData(conn);

    // Validate address input
    validateAddressInput();

    // Insert address data
    insertAddressData(conn);

    // Commit the transaction if everything is successful
    conn.commit();

} catch (SQLException e) {
    // Rollback the transaction if there is an error
    if (conn != null) {
        try {
            conn.rollback();
        } catch (SQLException ex) {
            System.err.println("Error: " + ex.getMessage());
        }
    }
    System.err.println("Error: " + e.getMessage());
} finally {
    // Close the database connection
    if (conn != null) {
        try {
            conn.close();
        } catch (SQLException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
```

### 17、一个异常只能包含在一个日志中

不要这样做：

```java
log.debug("Using cache sector A");
log.debug("Using retry sector B");
```

在单线程环境中，这样看起来没什么问题，但如果在多线程环境中，这两行紧挨着的代码中间可能会输出很多其他的内容，导致问题查起来会很难受。应该这样做：

```java
LOGGER.debug("Using cache sector A, using retry sector B");
```

### 18、将所有相关信息尽可能地传递给异常

有用的异常消息和堆栈跟踪非常重要，如果你的日志不能定位异常位置，那要日志有什么用呢？

```java
// Log exception message and stack trace
LOGGER.debug("Error reading file", e);
```

应该尽量把 `String message, Throwable cause` 异常信息和堆栈都输出。

### 19、终止掉被中断线程

```java
while (true) {
  try {
    Thread.sleep(100000);
  } catch (InterruptedException e) {} //别这样做
  doSomethingCool();
}
```

InterruptedException 提示应该停止程序正在做的事情，比如事务超时或线程池被关闭等。

应该尽最大努力完成正在做的事情，并完成当前执行的线程，而不是忽略 InterruptedException。修改后的程序如下：

```java
while (true) {
  try {
    Thread.sleep(100000);
  } catch (InterruptedException e) {
    break;
  }
}
doSomethingCool();
```

### 20、对于重复的 try-catch，使用模板方法

类似的 catch 块是无用的，只会增加代码的重复性，针对这样的问题可以使用模板方法。

例如，在尝试关闭数据库连接时的异常处理。

```java
class DBUtil{
    public static void closeConnection(Connection conn){
        try{
            conn.close();
        } catch(Exception ex){
            //Log Exception - Cannot close connection
        }
    }
}
```

这类的方法将在应用程序很多地方使用。不要把这块代码放的到处都是，而是定义上面的方法，然后像下面这样使用它：

```java
public void dataAccessCode() {
    Connection conn = null;
    try{
        conn = getConnection();
        ....
    } finally{
        DBUtil.closeConnection(conn);
    }
}
```

“好了，三妹，关于异常处理实践就先讲这 20 条吧，实际开发中你还会碰到其他的一些坑，自己踩一踩可能印象更深刻一些。”我说。

“那万一到时候我工作后被领导骂了怎么办？”三妹委屈地说。

“新人嘛，总要写几个 bug 才能对得起新人这个称号嘛。”我轻描淡写地说。

“好吧。”三妹无奈地叹了口气。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)





