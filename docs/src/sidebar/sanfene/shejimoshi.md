---
title: 设计模式面试题，5道设计模式八股文（3000字10张手绘图），面渣逆袭必看👍
shortTitle: 面渣逆袭-设计模式
description: 下载次数超 1 万次，3000 字 10 张手绘图，详解 5 道 设计模式 面试高频题（让天下没有难背的八股），面渣背会这些 设计模式 八股文，这次吊打面试官，我觉得稳了（手动 dog）。
date: 2025-09-20
author: 沉默王二
category:
  - 面渣逆袭
tag:
  - 面渣逆袭
head:
  - - meta
    - name: keywords
      content: 设计模式面试题,设计模式,八股文,面试题
---

设计模式是软件工程中常用的解决特定问题的模版或者蓝图，可以帮助我们开发者以一种更加清晰、高效和可重用的方式来编写代码。通常分为三类：

1. **创建型模式**：涉及对象实例化，用于创建对象的模式，可以增加程序的灵活性和可重用性。常见的创建型模式有工厂方法、抽象工厂、单例、建造者、原型等。
2. **结构型模式**：涉及类和对象的组合，用于设计类和对象的结构，以便更好地实现程序的功能。常见的结构型模式有适配器、桥接、组合、装饰、外观、享元、代理等。
3. **行为型模式**：关注对象之间的通信，包括责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者等。

## 01、什么是责任链模式？

>推荐阅读：[refactoringguru.cn：责任链模式](https://refactoringguru.cn/design-patterns/chain-of-responsibility)

责任链模式（Chain of Responsibility Pattern）是一种行为设计模式，它使多个对象都有机会处理请求，从而避免了请求的发送者和接收者之间的耦合关系。

请求会沿着一条链传递，直到有一个对象处理它为止。这种模式常用于处理不同类型的请求以及在不确定具体接收者的情况下将请求传递给多个对象中的一个。

![天未：图解 23 种设计模式](https://cdn.paicoding.com/stutymore/shejimoshi-20240309104732.png)

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

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 原题：请说说责任链模式。

## 02、什么是工厂模式？

>推荐阅读：[refactoringguru.cn：工厂模式](https://refactoringguru.cn/design-patterns/factory-method)

工厂模式（Factory Pattern）属于创建型设计模式，主要用于创建对象，而不暴露创建对象的逻辑给客户端。

其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

举例来说，卡车 Truck 和轮船 Ship 都必须实现运输工具 Transport 接口，该接口声明了一个名为 deliver 的方法。

卡车都实现了 deliver 方法，但是卡车的 deliver 是在陆地上运输，而轮船的 deliver 是在海上运输。

![refactoringguru.cn：工厂模式](https://cdn.paicoding.com/stutymore/shejimoshi-20240314083451.png)

调用工厂方法的代码（客户端代码）无需了解不同子类之间的差别，只管调用接口的 deliver 方法即可。

### 工厂模式的主要类型

①、**简单工厂模式**（Simple Factory）：它引入了创建者的概念，将实例化的代码从应用程序的业务逻辑中分离出来。简单工厂模式包括一个工厂类，它提供一个方法用于创建对象。

```java
class SimpleFactory {
    public static Transport createTransport(String type) {
        if ("truck".equalsIgnoreCase(type)) {
            return new Truck();
        } else if ("ship".equalsIgnoreCase(type)) {
            return new Ship();
        }
        return null;
    }

    public static void main(String[] args) {
        Transport truck = SimpleFactory.createTransport("truck");
        truck.deliver();

        Transport ship = SimpleFactory.createTransport("ship");
        ship.deliver();
    }
}
```

②、**工厂方法模式**（Factory Method）：定义一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类的实例化推迟到子类进行。

```java
interface Transport {
    void deliver();
}

class Truck implements Transport {
    @Override
    public void deliver() {
        System.out.println("在陆地上运输");
    }
}

class Ship implements Transport {
    @Override
    public void deliver() {
        System.out.println("在海上运输");
    }
}

interface TransportFactory {
    Transport createTransport();
}

class TruckFactory implements TransportFactory {
    @Override
    public Transport createTransport() {
        return new Truck();
    }
}

class ShipFactory implements TransportFactory {
    @Override
    public Transport createTransport() {
        return new Ship();
    }
}

public class FactoryMethodPatternDemo {
    public static void main(String[] args) {
        TransportFactory truckFactory = new TruckFactory();
        Transport truck = truckFactory.createTransport();
        truck.deliver();

        TransportFactory shipFactory = new ShipFactory();
        Transport ship = shipFactory.createTransport();
        ship.deliver();
    }
}
```

### 应用场景

1. **数据库访问层（DAL）组件**：工厂方法模式适用于数据库访问层，其中需要根据不同的数据库（如MySQL、PostgreSQL、Oracle）创建不同的数据库连接。工厂方法可以隐藏这些实例化逻辑，只提供一个统一的接口来获取数据库连接。
2. **日志记录**：当应用程序需要实现多种日志记录方式（如向文件记录、数据库记录或远程服务记录）时，可以使用工厂模式来设计一个灵活的日志系统，根据配置或环境动态决定具体使用哪种日志记录方式。

### 线程不是有线程名吗，怎么做到让线程的前缀名统一，通过factory来实现？

可以通过工厂模式创建线程，并在工厂方法中设置线程的前缀名。这样可以确保所有通过工厂创建的线程都具有统一的命名规范。

```java
class NamedThreadFactory implements ThreadFactory {
    private final String prefix;
    private int count = 0;

    public NamedThreadFactory(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(r);
        thread.setName(prefix + "-" + count++);
        return thread;
    }
}

public class ThreadFactoryDemo {
    public static void main(String[] args) {
        ThreadFactory factory = new NamedThreadFactory("MyThread");

        Runnable task = () -> {
            System.out.println("线程名称: " + Thread.currentThread().getName());
        };

        for (int i = 0; i < 5; i++) {
            Thread thread = factory.newThread(task);
            thread.start();
        }
    }
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为一面原题：说下工厂模式，场景
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 34 Java 后端技术一面面试原题：工厂模式了解吗？

memo：2025 年 9 月 20 日修改至此，今天球友在面快手的时候，被问了很多[派聪明 RAG 项目](https://javabetter.cn/zhishixingqiu/paismart.html)的题目，说面试官对这个项目非常感兴趣。再次感谢球友的口碑。

![](https://cdn.paicoding.com/stutymore/shejimoshi-差不多都命中预測的了啊.png)

## 03、什么是单例模式？

>推荐阅读：[refactoringguru.cn：单例模式](https://refactoringguru.cn/design-patterns/singleton)

单例模式（Singleton Pattern）是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点来获取该实例。单例模式主要用于控制对某些共享资源的访问，例如配置管理器、连接池、线程池、日志对象等。

![refactoringguru.cn：单例模式](https://cdn.paicoding.com/stutymore/shejimoshi-20240314085956.png)

### 实现单例模式的关键点？

1. **私有构造方法**：确保外部代码不能通过构造器创建类的实例。
2. **私有静态实例变量**：持有类的唯一实例。
3. **公有静态方法**：提供全局访问点以获取实例，如果实例不存在，则在内部创建。

### 常见的单例模式实现？

#### ①、饿汉式如何实现单例？

饿汉式单例（Eager Initialization）在类加载时就急切地创建实例，不管你后续用不用得到，这也是饿汉式的来源，简单但不支持延迟加载实例。

```java
public class Singleton {
    private static final Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

#### ②、懒汉式如何实现单例？

懒汉式单例（Lazy Initialization）在实际使用时才创建实例，“确实懒”（😂）。这种实现方式需要考虑线程安全问题，因此一般会带上 [synchronized 关键字](https://javabetter.cn/thread/synchronized-1.html)。

```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

在[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我就使用了懒汉式单例模式，实现了一个基于微信 native 支付的 Service。

![技术派：基于双重判空的懒汉式单例](https://cdn.paicoding.com/stutymore/shejimoshi-20241211110812.png)

#### ③、双重检查锁如何实现单例？

双重检查锁用 synchronized 同步代码块替代了 synchronized 同步方法。并且在 instance 前加上 [volatile 关键字](https://javabetter.cn/thread/volatile.html)，防止指令重排，因为 `instance = new Singleton()` 并不是一个原子操作，可能会被重排序，导致其他线程获取到未初始化完成的实例。

```java
class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

当 instance 创建后，再次调用 getInstance 方法时，不会进入同步代码块，从而提高了性能。

#### ④、静态内部类如何实现单例？

利用 Java 的[静态内部类](https://javabetter.cn/oo/static.html)（Static Nested Class）和[类加载机制](https://javabetter.cn/jvm/class-load.html)来实现线程安全的延迟初始化。

```java
public class Singleton {
    private Singleton() {}

    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

当第一次加载 Singleton 类时并不会初始化 SingletonHolder，只有在第一次调用 getInstance 方法时才会导致 SingletonHolder 被加载，从而实例化 instance。

#### ⑤、枚举如何实现单例？

使用[枚举（Enum）](https://javabetter.cn/basic-extra-meal/enum.html)实现单例是最简单的方式，不仅不需要考虑线程同步问题，还能防止反射攻击和序列化问题。

```java
public enum Singleton {
    INSTANCE;
    // 可以添加实例方法
}
```

### 单例模式的好处有哪些？

单例模式能确保一个类仅有一个实例，并提供一个全局访问点来访问这个实例。

这对于需要控制资源使用或需要共享资源的情况非常有用，比如数据库连接池，通过单例模式，可以避免对资源的重复创建和销毁，从而提高资源利用率和系统性能。

### 单例模式有几种实现方式？

单例模式有 5 种实现方式，常见的有饿汉式、懒汉式、双重检查锁定、静态内部类和枚举。

### synchronized加到代码块上和方法上有什么区别？

将 synchronized 加到方法上时，锁定的是整个方法，任何线程在调用该方法时都会获得该对象的锁，直到方法执行完毕才释放锁。

将 synchronized 加到代码块上 `synchronized (Singleton.class)`时，锁定的是类的 Class 对象，所有对这个类的 synchronized 代码块都会串行执行。

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为一面原题：说下单例模式，有几种
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯面经同学 22 暑期实习一面面试原题：单例模式的好处
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 16 暑期实习一面面试原题：讲讲设计模式，讲讲单例模式有哪些情况（饿汉和懒汉），具体该如何使用
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：单例模式有几种实现方式？单例模式最常用的实现方式是哪种？为什么？
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的腾讯云智面经同学 16 一面面试原题：手写单例模式，各种情况，怎么保证线程安全？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的携程面经同学 10 Java 暑期实习一面面试原题：单例模式，如何线程安全
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的同学 D 小米一面原题：单例模式有几种

memo：2025 年 8 月 12 日修改至此，今天有球友在VIP 群里讲，他师兄的简历一眼[技术派](https://javabetter.cn/zhishixingqiu/paicoding.html)，🤣，看来这个项目的口碑是真不错。

![顺丰 offer 的师兄用的技术派项目](https://cdn.paicoding.com/stutymore/shejimoshi-20250925184038.png)

## 04、了解哪些设计模式？

单例模式、策略模式。

在需要控制资源访问，如配置管理、连接池管理时经常使用单例模式。它确保了全局只有一个实例，并提供了一个全局访问点。

在有多种算法或策略可以切换使用的情况下，我会使用策略模式。像[技术派实战项目](https://javabetter.cn/zhishixingqiu/paicoding.html)中，我就使用策略模式对接了讯飞星火、OpenAI、智谱 AI 等多家大模型，实现了一个可以自由切换大模型基座的智能助手服务。

![技术派派聪明 AI 助手](https://cdn.paicoding.com/stutymore/shejimoshi-20240412223832.png)

策略模式的好处是，不用在代码中写 if/else 判断，而是将不同的 AI 服务封装成不同的策略类，通过工厂模式创建不同的 AI 服务实例，从而实现 AI 服务的动态切换。

后面想添加新的 AI 服务，只需要增加一个新的策略类，不需要修改原有代码，这样就提高了代码的可扩展性。

### 你想做一个导出的数据导出的功能，然后他可能导出的格式有Excel、有JSON，可能有XML，然后如果你用面向对象这些方法去做，会怎么去设计这个实现？

我会使用策略模式+工厂模式来实现。

首先，我会定义一个导出接口 `DataExporter`，该接口包含一个导出方法 `export(data)`，用于导出数据。

```java
public interface DataExporter {
    void export(List<Object> data, OutputStream outputStream) throws Exception;
    String getContentType();
    String getFileExtension();
}
```

然后，我会为每种导出格式（Excel、JSON、XML）创建具体的策略类，这些类实现了 `ExportStrategy` 接口，并提供各自的导出逻辑。

```java
public class ExcelExporter implements DataExporter {
    @Override
    public void export(List<Object> data, OutputStream outputStream) throws Exception {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data");
        
        // 写入表头
        if (!data.isEmpty()) {
            Object firstRow = data.get(0);
            Row headerRow = sheet.createRow(0);
            Field[] fields = firstRow.getClass().getDeclaredFields();
            for (int i = 0; i < fields.length; i++) {
                headerRow.createCell(i).setCellValue(fields[i].getName());
            }
            
            // 写入数据
            for (int i = 0; i < data.size(); i++) {
                Row dataRow = sheet.createRow(i + 1);
                Object obj = data.get(i);
                for (int j = 0; j < fields.length; j++) {
                    fields[j].setAccessible(true);
                    Object value = fields[j].get(obj);
                    dataRow.createCell(j).setCellValue(value != null ? value.toString() : "");
                }
            }
        }
        
        workbook.write(outputStream);
        workbook.close();
    }
    
    @Override
    public String getContentType() {
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    
    @Override
    public String getFileExtension() {
        return "xlsx";
    }
}

public class JsonExporter implements DataExporter {
    private ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public void export(List<Object> data, OutputStream outputStream) throws Exception {
        objectMapper.writeValue(outputStream, data);
    }
    
    @Override
    public String getContentType() {
        return "application/json";
    }
    
    @Override
    public String getFileExtension() {
        return "json";
    }
}

public class XmlExporter implements DataExporter {
    @Override
    public void export(List<Object> data, OutputStream outputStream) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.newDocument();
        
        Element root = document.createElement("data");
        document.appendChild(root);
        
        for (Object obj : data) {
            Element item = document.createElement("item");
            Field[] fields = obj.getClass().getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                Element element = document.createElement(field.getName());
                Object value = field.get(obj);
                element.setTextContent(value != null ? value.toString() : "");
                item.appendChild(element);
            }
            root.appendChild(item);
        }
        
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        DOMSource source = new DOMSource(document);
        StreamResult result = new StreamResult(outputStream);
        transformer.transform(source, result);
    }
    
    @Override
    public String getContentType() {
        return "application/xml";
    }
    
    @Override
    public String getFileExtension() {
        return "xml";
    }
}
```

接下来，我会创建一个工厂类 `DataExporterFactory`，用于根据导出格式创建相应的导出策略实例。

```java
public class DataExporterFactory {
    private static final Map<String, DataExporter> exporters = new HashMap<>();
    
    static {
        exporters.put("excel", new ExcelExporter());
        exporters.put("json", new JsonExporter());
        exporters.put("xml", new XmlExporter());
    }
    
    public static DataExporter getExporter(String format) {
        DataExporter exporter = exporters.get(format.toLowerCase());
        if (exporter == null) {
            throw new IllegalArgumentException("不支持的导出格式: " + format);
        }
        return exporter;
    }
    
    public static Set<String> getSupportedFormats() {
        return exporters.keySet();
    }
}
```

最后，我会定义导出服务的上下文类，我根据请求参数选择合适的导出策略，并调用其导出方法。

```java
@Service
public class DataExportService {
    
    public void exportData(List<Object> data, String format, OutputStream outputStream) 
            throws Exception {
        DataExporter exporter = DataExporterFactory.getExporter(format);
        exporter.export(data, outputStream);
    }
    
    public ResponseEntity<byte[]> exportDataAsResponse(List<Object> data, String format) 
            throws Exception {
        DataExporter exporter = DataExporterFactory.getExporter(format);
        
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        exporter.export(data, baos);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(exporter.getContentType()));
        headers.setContentDispositionFormData("attachment", 
            "export_" + System.currentTimeMillis() + "." + exporter.getFileExtension());
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(baos.toByteArray());
    }
}
```


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动面经同学 1 Java 后端技术一面面试原题：了解哪些设计模式？
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的奇安信面经同学 1 Java 技术一面面试原题：你真正使用过哪些设计模式？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的农业银行面经同学 7 Java 后端面试原题：介绍你熟悉的设计模式
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的华为 OD 面经同学 1 一面面试原题：你了解的设计模式
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的百度面经同学 1 文心一言 25 实习 Java 后端面试原题：你有哪些熟悉的设计模式？
> 6. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的招银网络科技面经同学 9 Java 后端技术一面面试原题：说一说常用的设计模式
> 7. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的vivo 面经同学 10 技术一面面试原题：了解哪些设计模式，开闭原则
> 8. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 5 Java 后端技术一面面试原题：设计模式

memo：2025 年 9 月 20 日修改至此，今天在帮球友修改简历的时候，收到这样一个反馈：在合肥马上要转正了，薪资给的还可以，已经给周围很多人[安利二哥的项目](https://javabetter.cn/zhishixingqiu/)了，反向很不错。

![球友对星球的口碑](https://cdn.paicoding.com/stutymore/shejimoshi-20250925180409.png)

## 05、什么是策略模式？

策略模式是一种行为型设计模式，它定义了一系列的算法，将每个算法封装起来，使得它们可以相互替换。这种模式通常用于实现不同的业务规则，其中每种策略封装了特定的行为或算法。

![图片来源于天未（闵大为）](https://cdn.paicoding.com/stutymore/shejimoshi-20241111180535.png)

特别适合优化程序中的复杂条件分支语句（if-else）。

在策略模式中，有三个角色：上下文、策略接口和具体策略。

- **策略接口**：定义所有支持算法的公共接口。
- **具体策略**：实现策略接口的类，提供具体的算法实现。
- **上下文**：使用策略的类。通常包含一个引用指向策略接口，可以在运行时改变其具体策略。

![技术派教程](https://cdn.paicoding.com/stutymore/shejimoshi-20240411104918.png)

比如说在技术派中，用户可以自由切换 AI 服务，服务端可以通过 if/esle 进行判断，但如果后续需要增加新的 AI 服务，就需要修改代码，这样不够灵活。

因此，我们使用了策略模式，将不同的 AI 服务封装成不同的策略类，通过工厂模式创建不同的 AI 服务实例，从而实现 AI 服务的动态切换。

```java
@Service
public class PaiAiDemoServiceImpl extends AbsChatService {

    @Override
    public AISourceEnum source() {
        return AISourceEnum.PAI_AI;
    }
}

@Slf4j
@Service
public class ChatGptAiServiceImpl extends AbsChatService {
    @Override
    public AISourceEnum source() {
        return AISourceEnum.CHAT_GPT_3_5;
    }
}

@Slf4j
@Service
public class XunFeiAiServiceImpl extends AbsChatService {
    @Override
    public AISourceEnum source() {
        return AISourceEnum.XUN_FEI_AI;
    }
}
```

> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东面经同学 1 Java 技术一面面试原题：谈谈对gpt的了解，大语言模型的原理，基于大模型如何去和一些业务做结合，有什么场景可以做，项目中用了哪些设计模式 
> 2. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的微众银行同学 1 Java 后端一面的原题：if else过多怎么解决？
> 3. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团同学 2 优选物流调度技术 2 面面试原题：设计模式，策略模式
> 4. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的美团面经同学 4 一面面试原题：策略模式，自己的代码用过什么设计模式
> 5. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的字节跳动同学 17 后端技术面试原题：用过哪些策略模式

## 06、什么是模板模式？

模板模式（Template Method Pattern）是一种行为型设计模式，它定义了一个操作中的算法骨架，而将一些步骤延迟到子类中实现。模板方法使得子类可以在不改变算法结构的情况下重新定义算法的某些特定步骤。

![refactoringguru.cn：模板模式](https://cdn.paicoding.com/stutymore/shejimoshi-20250925181116.png)

在 Spring 框架中，有很多模板方法的应用。比如 JdbcTemplate、RestTemplate 这些，它们定义了数据访问的通用流程，我们只需要提供具体的 SQL 或者回调方法。

![JdbcTemplate](https://cdn.paicoding.com/stutymore/shejimoshi-20250925181306.png)

#### 模版模式在java中具体怎么实现的？

模板方法通常通过抽象类和继承来实现。抽象类定义了一个模板方法，该方法包含了一系列步骤的调用顺序，而具体的步骤则由子类实现。

```java
abstract class AbstractClass {
    // 模板方法，定义算法的骨架
    public final void templateMethod() {
        stepOne();
        stepTwo();
    }
    protected abstract void stepOne();
    protected abstract void stepTwo();
}
class ConcreteClassA extends AbstractClass {
    @Override
    protected void stepOne() {
        System.out.println("ConcreteClassA: Step One");
    }
    @Override
    protected void stepTwo() {
        System.out.println("ConcreteClassA: Step Two");
    }
}
class ConcreteClassB extends AbstractClass {
    @Override
    protected void stepOne() {
        System.out.println("ConcreteClassB: Step One");
    }
    @Override
    protected void stepTwo() {
        System.out.println("ConcreteClassB: Step Two");
    }
}
public class TemplateMethodPatternDemo {
    public static void main(String[] args) {
        AbstractClass classA = new ConcreteClassA();
        classA.templateMethod();

        AbstractClass classB = new ConcreteClassB();
        classB.templateMethod();
    }
}
```


> 1. [Java 面试指南（付费）](https://javabetter.cn/zhishixingqiu/mianshi.html)收录的京东同学 19 JDS 面试原题：模版模式在java中具体怎么实现的？

memo：2025 年 8 月 12 日修改至此，今天在[帮球友修改简历的时候](https://javabetter.cn/zhishixingqiu/jianli.html)收到这样一个反馈：谢谢暑期实习时对他的简历修改，没有二哥绝对进不了字节。

![字节球友对简历修改的口碑](https://cdn.paicoding.com/stutymore/shejimoshi-二哥晚上好，谢谢您春招时对我简历的修改，没有二哥我绝对进不了字节。.png)

---

*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。

**系列内容**：

- [面渣逆袭 Java SE 篇👍](https://javabetter.cn/sidebar/sanfene/javase.html)
- [面渣逆袭 Java 集合框架篇👍](https://javabetter.cn/sidebar/sanfene/javathread.html)
- [面渣逆袭 Java 并发编程篇👍](https://javabetter.cn/sidebar/sanfene/collection.html)
- [面渣逆袭 JVM 篇👍](https://javabetter.cn/sidebar/sanfene/jvm.html)
- [面渣逆袭 Spring 篇👍](https://javabetter.cn/sidebar/sanfene/spring.html)
- [面渣逆袭 Redis 篇👍](https://javabetter.cn/sidebar/sanfene/redis.html)
- [面渣逆袭 MyBatis 篇👍](https://javabetter.cn/sidebar/sanfene/mybatis.html)
- [面渣逆袭 MySQL 篇👍](https://javabetter.cn/sidebar/sanfene/mysql.html)
- [面渣逆袭操作系统篇👍](https://javabetter.cn/sidebar/sanfene/os.html)
- [面渣逆袭计算机网络篇👍](https://javabetter.cn/sidebar/sanfene/network.html)
- [面渣逆袭RocketMQ篇👍](https://javabetter.cn/sidebar/sanfene/rocketmq.html)
- [面渣逆袭分布式篇👍](https://javabetter.cn/sidebar/sanfene/fenbushi.html)
- [面渣逆袭微服务篇👍](https://javabetter.cn/sidebar/sanfene/weifuwu.html)
- [面渣逆袭设计模式篇 👍](https://javabetter.cn/sidebar/sanfene/shejimoshi.html)
- [面渣逆袭Linux篇 👍](https://javabetter.cn/sidebar/sanfene/linux.html)

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png)

> 图文详解 5 道设计模式面试高频题，这次吊打面试官，我觉得稳了（手动 dog）。