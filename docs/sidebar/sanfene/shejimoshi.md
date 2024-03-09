## 01、什么是责任链模式？

>推荐阅读：[责任链模式](https://refactoringguru.cn/design-patterns/chain-of-responsibility)

责任链模式（Chain of Responsibility Pattern）是一种行为设计模式，它使多个对象都有机会处理请求，从而避免了请求的发送者和接收者之间的耦合关系。

请求会沿着一条链传递，直到有一个对象处理它为止。这种模式常用于处理不同类型的请求以及在不确定具体接收者的情况下将请求传递给多个对象中的一个。

![图片来源于天未](https://cdn.tobebetterjavaer.com/stutymore/shejimoshi-20240309104732.png)

### 基本概念

责任链模式主要包括以下几个角色：

- **Handler（抽象处理者）**：定义了一个处理请求的接口或抽象类，其中通常会包含一个指向链中下一个处理者的引用。
- **ConcreteHandler（具体处理者）**：实现抽象处理者的处理方法，如果它能处理请求，则处理；否则将请求转发给链中的下一个处理者。
- **Client（客户端）**：创建处理链，并向链的第一个处理者对象提交请求。

### 工作流程

1. 客户端将请求发送给链上的第一个处理者对象。
2. 处理者接收到请求后，决定自己是否有能力进行处理。
   - 如果可以处理，就处理请求。
   - 如果不能处理，就将请求转发给链上的下一个处理者。
3. 过程重复，直到链上的某个处理者能处理该请求或者链上没有更多的处理者。

### 应用场景

责任链模式适用于以下场景：

- 有多个对象可以处理同一请求，但具体由哪个对象处理则在运行时动态决定。
- 在不明确指定接收者的情况下，向多个对象中的一个提交请求。
- 需要动态组织和管理处理者时。

### 优缺点

**优点**：

- 降低耦合度：它将请求的发送者和接收者解耦。
- 增加了给对象指派职责的灵活性：可以在运行时动态改变链中的成员或调整它们的次序。
- 可以方便地增加新的处理类，在不影响现有代码的情况下扩展功能。

**缺点**：

- 请求可能不会被处理：如果没有任何处理者处理请求，它可能会达到链的末端并被丢弃。
- 性能问题：一个请求可能会在链上进行较长的遍历，影响性能。
- 调试困难：特别是在链较长时，调试可能会比较麻烦。

### 实现示例

假设有一个日志系统，根据日志的严重性级别（错误、警告、信息）将日志消息发送给不同的处理器处理。

```java
abstract class Logger {
    public static int INFO = 1;
    public static int DEBUG = 2;
    public static int ERROR = 3;

    protected int level;

    // 责任链中的下一个元素
    protected Logger nextLogger;

    public void setNextLogger(Logger nextLogger) {
        this.nextLogger = nextLogger;
    }

    public void logMessage(int level, String message) {
        if (this.level <= level) {
            write(message);
        }
        if (nextLogger != null) {
            nextLogger.logMessage(level, message);
        }
    }

    abstract protected void write(String message);
}

class ConsoleLogger extends Logger {
    public ConsoleLogger(int level) {
        this.level = level;
    }

    @Override
    protected void write(String message) {
        System.out.println("Standard Console::Logger: " + message);
    }
}

class ErrorLogger extends Logger {
    public ErrorLogger(int level) {
        this.level = level;
    }

    @Override
    protected void write(String message) {
        System.out.println("Error Console::Logger: " + message);
    }
}

class FileLogger extends Logger {
    public FileLogger(int level) {
        this.level = level;
    }

    @Override
    protected void write(String message) {
        System.out.println("File::Logger: " + message);
    }
}

public class ChainPatternDemo {
    private static Logger getChainOfLoggers() {
        Logger errorLogger = new ErrorLogger(Logger.ERROR);
        Logger fileLogger = new FileLogger(Logger.DEBUG);
        Logger consoleLogger = new ConsoleLogger(Logger.INFO);

        errorLogger.setNextLogger(fileLogger);
        fileLogger.setNextLogger(consoleLogger);

        return errorLogger;
    }

    public static void main(String[] args) {
        Logger loggerChain = getChainOfLoggers();

        loggerChain.logMessage(Logger.INFO, "INFO 级别");
        loggerChain.logMessage(Logger.DEBUG, " Debug 级别");
        loggerChain.logMessage(Logger.ERROR, "Error 级别");
    }
}
```

在这个示例中，创建了一个日志处理链。不同级别的日志将被相应级别的处理器处理。责任链模式让日志系统的扩展和维护变得更加灵活。

输出结果：

```
Standard Console::Logger: INFO 级别
File::Logger:  Debug 级别
Standard Console::Logger:  Debug 级别
Error Console::Logger: Error 级别
File::Logger: Error 级别
Standard Console::Logger: Error 级别
```

> 1. 华为 OD 原题：请说说责任链模式。