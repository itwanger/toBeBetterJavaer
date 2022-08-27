---
title: Java NIO 学习笔记（五）
shortTitle: Java NIO 学习笔记（五）
author: 路径、文件和管道 Path/Files/Pipe
category:
  - 博客园
---

**目录：**

[Java NIO 学习笔记（一）----概述，Channel/Buffer](https://www.cnblogs.com/czwbig/p/10035631.html)

[Java NIO 学习笔记（二）----聚集和分散，通道到通道](https://www.cnblogs.com/czwbig/p/10040349.html)

[Java NIO 学习笔记（三）----Selector](https://www.cnblogs.com/czwbig/p/10043421.html)

[Java NIO 学习笔记（四）----文件通道和网络通道](https://www.cnblogs.com/czwbig/p/10046987.html)

[Java NIO 学习笔记（五）----路径、文件和管道 Path/Files/Pipe](https://www.cnblogs.com/czwbig/p/10056126.html)

[Java NIO 学习笔记（六）----异步文件通道 AsynchronousFileChannel](https://www.cnblogs.com/czwbig/p/10056131.html)

[Java NIO 学习笔记（七）----NIO/IO 的对比和总结](https://www.cnblogs.com/czwbig/p/10056804.html)

# Path 接口和 Paths 类

Path 接口是 NIO2（AIO） 的一部分，是对 NIO 的更新，Path 接口已添加到 Java 7 中，完全限定类名是 java.nio.file.Path 。

Path 实例表示文件系统中的路径。 路径可以指向文件或目录，也可以是绝对的或相对的。在某些操作系统中，不要将文件系统路径与环境变量中的 path 路径相混淆。 java.nio.file.Path 接口与路径环境 path 变量无关。

在许多方面，java.nio.file.Path 接口类似于 java.io.File 类，但存在一些细微差别。 但在许多情况下，可以使用 Path 接口替换 File 类的使用。

### 创建 Path 对象

可以使用名为 Paths.get() 的 Paths 类（java.nio.file.Paths）中的静态方法创建 Path 实例，get()方法是 Path 实例的工厂方法，一个示例如下：

```java
public class PathExample {
    public static void main(String[] args) {
        // 使用绝对路径创建
        Path absolutePath = Paths.get("D:\\test\\1.txt");
        // 使用相对路径创建
        Path relativePath = Paths.get("D:\\test", "1.txt");
        System.out.println(absolutePath.equals(relativePath)); // ture
    }
}
```
 

注意路径分隔符在 Windows 上是“\\”，在 Linux 上是 “/”。

Paths 类只有2个方法：

方法|描述|
---|---|
static Path get(String first, String... more)|将路径字符串或在连接时形成路径字符串的字符串序列转换为路径。|
static Path (URI uri)|将给定URI转换为路径对象。|

Path 接口部分方法：

方法|描述|
---|---|
boolean endsWith(Path other)|测试此路径是否以给定路径结束。|
boolean equals(Object other)|取决于文件系统的实现。一般不区分大小写，有时区分。 不访问文件系统。|
Path normalize()|返回一个路径，该路径消除了冗余的名称元素，比如'.'， '..'|
Path toAbsolutePath()|返回表示该路径的绝对路径的路径对象。|
File toFile()|返回表示此路径的 File 对象。|
String toString()|返回的路径字符串使用默认名称分隔符分隔路径中的名称。|

# Files

NIO 文件类(java.nio.file.Files)为操作文件系统中的文件提供了几种方法，File 类与 java.nio.file.Path 类一起工作，需要了解 Path 类，然后才能使用 Files 类。

### 判断文件是否存在

```java
static boolean exists(Path path, LinkOption... options)
```
 

options 参数用于指示，在文件是符号链接的情况下，如何处理该符号链接，默认是处理符号链接的。其中 LinkOption 对象是一个枚举类，定义如何处理符号链接的选项。整个类只有一个 `NOFOLLOW_LINKS;` 常亮，代表不跟随符号链接。

### createDirectory(Path path) 创建目录

```java
Path output = Paths.get("D:\\test\\output");
Path newDir = Files.createDirectory(output);
// Files.createDirectories(output); // 这个方法可以一并创建不存在的父目录
System.out.println(output == newDir); // true
System.out.println(Files.exists(output)); // true
```
 

如果创建目录成功，则返回指向新创建的路径的 Path 实例，此实例和参数是同一个实例。

如果该目录已存在，则抛出 FileAlreadyExistsException 。 如果出现其他问题，可能会抛出IOException ，例如，如果所需的新目录的父目录不存在。

### 复制文件

一共有 3 个复制方法：

```java
static long copy(Path source, OutputStream out)；
static Path copy(Path source, Path target, CopyOption... options)；
static long copy(InputStream in, Path target, CopyOption... options)
```
 

其中 CopyOption 选项可以选择指定复制模式，一般是其子枚举类 StandardCopyOption 提供选项，有 3 种模式，第二个参数是可变形参，可以多个组合一起使用：

1.  `ATOMIC_MOVE` :原子复制，不会被线程调度机制打断的操作；一旦开始，就一直运行到结束;
2.  `COPY_ATTRIBUTES` ：同时复制属性，默认是不复制属性的;
3.  `REPLACE_EXISTING` ：重写模式，会覆盖已存在的目的文件;

一个例子如下：

```java
Path sourcePath = Paths.get("D:\\test\\source.txt"); // 源文件必须先存在
Path desPath = Paths.get("D:\\test\\des.txt"); // 目的文件可以不存在
Files.copy(sourcePath, desPath); // 默认情况，如果目的文件已存在则抛出异常
Files.copy(sourcePath, desPath, StandardCopyOption.REPLACE_EXISTING); // 覆盖模式
```
 

注意：复制文件夹的时候，只能复制空文件夹，如果文件夹非空，需要递归复制，否则只能得到一个空文件夹，而文件夹里面的文件不会被复制。

# 移动文件/文件夹

只有 1 个移动文件或文件夹的方法：

```java
static Path move(Path source, Path target, CopyOption... options);
```
 

如果文件是符号链接，则移动符号链接本身，而不是符号链接指向的实际文件。

和移动文件一样，也存在第三个可选参数 CopyOption ，参考上述。如果移动文件失败，可能会抛出 IOException，例如，如果文件已存在于目标路径中，并且遗漏了覆盖选项，或者要移动的源文件不存在等。

和复制文件夹不一样，如果文件夹里面有内容，复制只会复制空文件夹，而移动会把文件夹里面的所有东西一起移动过去，以下是一个移动文件夹的示例:

```java
// 移动 s 目录到一个不存在的新目录
Path s = Paths.get("D:\\s");
Path d = Paths.get("D:\\test\\test");
Files.createDirectories(d.getParent());
Files.move(s, d);
```
 

和 Linux mv 命令一样，重命名文件与移动文件方式相同，移动文件还可以将文件移动到不同的目录并可以同时更改其名称。 另外 java.io.File 类也可以使用它的 renameTo() 方法来实现移动文件，但现在 java.nio.file.Files 类中也有文件移动功能。

### 删除文件/文件夹

```java
static void delete(Path path);
static boolean deleteIfExists(Path path); // 如果文件被此方法删除则返回 true
```
 

如果文件是目录，则该目录必须为空才能删除。

### Files.walkFileTree() 静态方法

删除和复制文件夹的时候，如果文件夹为空，那么会删除失败或者只能复制空文件夹，此时可以使用 walkFileTree() 方法进行遍历文件树，然后在 FileVisitor 对象的 visitFile() 方法中执行删除或复制文件操作。

Files 类有 2 个重载的 walkFileTree() 方法，如下：

```java
static Path walkFileTree(Path start,
                                FileVisitor<? super Path> visitor)；

static Path walkFileTree(Path start,
                                Set<FileVisitOption> options,
                                int maxDepth,
                                FileVisitor<? super Path> visitor)；
```
 

将 Path 实例和 FileVisitor 作为参数，walkfiletree() 方法可以递归遍历目录树。Path 实例指向要遍历的目录。在遍历期间调用 FileVisitor ，首先介绍 FileVisitor 接口：

```java
public interface FileVisitor<T> {
    
    FileVisitResult preVisitDirectory(T dir, BasicFileAttributes attrs) throws IOException;

    FileVisitResult visitFile(T file, BasicFileAttributes attrs) throws IOException;
    
    FileVisitResult visitFileFailed(T file, IOException exc) throws IOException;
    
    FileVisitResult postVisitDirectory(T dir, IOException exc) throws IOException;
}
```
 

必须自己实现 FileVisitor 接口，并将其实现的实例传递给 walkFileTree() 方法。在目录遍历期间，将在不同的时间调用 FileVisitor 实现的 4 个方法，代表对遍历到的文件或目录进行什么操作。如果不需要使用到所有方法，可以扩展 SimpleFileVisitor 类，该类包含 FileVisitor 接口中所有方法的默认实现。

```java
Files.walkFileTree(inputPath, new FileVisitor<Path>() {
    // 访问文件夹之前调用此方法
    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
        System.out.println("pre visit dir:" + dir);
        return FileVisitResult.CONTINUE;
    }

    // 访问的每个文件都会调用此方法，只针对文件，不会对目录执行
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        return FileVisitResult.CONTINUE;
    }

    // 访问文件失败会调用此方法，只针对文件，不会对目录执行
    @Override
    public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
        return FileVisitResult.CONTINUE;
    }

    // 访问文件夹之后会调用此方法
    @Override
    public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
        return FileVisitResult.CONTINUE;
    }
});
```
 

这四个方法都返回一个 FileVisitResult 枚举实例。FileVisitResult 枚举包含以下四个选项：

*   CONTINUE ： 继续
*   TERMINATE ： 终止
*   SKIP\_SIBLINGS ： 跳过兄弟节点，然后继续
*   SKIP\_SUBTREE ： 跳过子树（不访问此目录的条目），然后继续，仅在 preVisitDirectory 方法返回时才有意义，除此以外和 CONTINUE 相同。

通过返回其中一个值，被调用的方法可以决定文件遍历时接下来应该做什么。

### 搜索文件

walkFileTree() 方法还可以用于搜索文件，下面这个例子扩展了 SimpleFileVisitor 来查找一个名为 input.txt 的文件：

```java
Path rootPath = Paths.get("D:\\test");
String fileToFind = File.separator + "input.txt";

Files.walkFileTree(rootPath, new SimpleFileVisitor<Path>() {
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
        String fileString = file.toAbsolutePath().toString();
        System.out.println("pathString: " + fileString);

        if (fileString.endsWith(fileToFind)) {
            System.out.println("file found at path: " + fileString);
            return FileVisitResult.TERMINATE;
        }
        return FileVisitResult.CONTINUE;
    }
});
```
 

同理，删除有内容的目录时，可以重写 visitFile() 方法，并在里面执行删除文件操作，重写 postVisitDirectory() 方法，并在里面执行删除目录操作即可。

### Files 类中的其他方法

Files 类包含许多其他有用的函数，例如用于创建符号链接，确定文件大小，设置文件权限等的函数。有关java.nio.file.Files 类的详细信息，请查看 [JavaDoc](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html)

# 管道 Pipe

Pipe 是两个线程之间的单向数据连接。管道有 source 通道和一个 sink 通道，将数据写入 sink 通道，就可以从 source 通道读取该数据。

以下是管道原理的说明：

![image](//upload-images.jianshu.io/upload_images/14923529-de26928e835ab0aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 使用管道进行读取数据

先看一个完整的例子：

```java
public class PipeExample {
    public static void main(String[] args) throws IOException {
        Pipe pipe = Pipe.open();
        Pipe.SinkChannel sinkChannel = pipe.sink(); // sink 通道写入数据
        String data = "some string";

        ByteBuffer buffer = ByteBuffer.allocate(32);
        buffer.clear();
        buffer.put(data.getBytes());

        buffer.flip(); // 反转缓冲区，准备被读取
        while (buffer.hasRemaining()) {
            sinkChannel.write(buffer); // 将 Buffer 的数据写入 sink 通道
        }

        Pipe.SourceChannel sourceChannel = pipe.source(); // 源通道读取数据
        ByteBuffer readBuffer = ByteBuffer.allocate(32);
        int bytesRead = sourceChannel.read(readBuffer); // 返回值代表读取了多少数据
        System.out.println("Read: " + bytesRead); // Read: 11

        System.out.println(new String(readBuffer.array())); // some string
    }
}
```
 

如上代码，首先要创建管道，打开管道之后是使用同一个管道对象获取对应的 sink 通道和 source 通道的，这会自动地将两个通道连接起来，作为对比，在标准 IO 管道中是分别创建读管道和写管道，然后在构造器中或者使用`pipe1.connect(pipe2)` 方法来连接起来，如下：

```java
PipedOutputStream output = new PipedOutputStream();

PipedInputStream input = new PipedInputStream();
input.connect(output);
// 或者使用如下1行代码，可以代替上面2行代码来连接2个管道
//PipedInputStream input = new PipedInputStream(output);
```

>参考链接：[https://www.cnblogs.com/czwbig/p/10056126.html](https://www.cnblogs.com/czwbig/p/10056126.html)，整理：沉默王二
