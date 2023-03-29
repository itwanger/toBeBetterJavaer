---
title: 详解 Java 中的File、Paths、Files三个类
shortTitle: File、Paths、Files
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，详解 File、Path、Paths、Files，操作文件不再难
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java进阶之路,Java入门,教程,Java IO,file,paths,files,path,java文件,java目录,java文件增删改查,java file,java paths,java files
---

### Path 接口与Paths 类

Path 是 Java NIO.2 中的一个类，用于表示文件系统中的路径。它提供了一种平台无关的方式来操作文件系统中的路径，包括创建、修改、查询和删除文件或目录等操作。

#### 创建 Path 对象

可以使用名为 Paths.get() 创建 Path 实例，get()方法是 Path 实例的工厂方法，一个示例如下：

```java
// 使用绝对路径创建
Path absolutePath = Paths.get("/Users/username/test/1.txt");
// 使用相对路径创建
Path relativePath = Paths.get("test", "1.txt");
System.out.println(absolutePath.equals(relativePath)); // true
```
 

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
Path toAbsolutePath()|返回绝对路径。|
File toFile()|转换为 File 对象。|
String toString()|返回的路径字符串。|

>注意，假如路径为 `D:\\..\\..\\.\\p2\\core\\cache\\binary`，normalize 返回 `D:\\p2\\core\\cache\\binary`
 

## Files 类

NIO 文件类(java.nio.file.Files)为操作文件系统中的文件提供了几种方法，File 类与 java.nio.file.Path 类一起工作，需要了解 Path 类，然后才能使用 Files 类。

### 判断文件是否存在

```java
static boolean exists(Path path, LinkOption... options)
```
 

options 参数用于指示，在文件是符号链接的情况下，如何处理该符号链接，默认是处理符号链接的。其中 LinkOption 对象是一个枚举类，定义如何处理符号链接的选项。整个类只有一个 `NOFOLLOW_LINKS;` 常量，代表不跟随符号链接。

>符号链接（软链接、Symbolic link）是一类特殊的文件， 其包含有一条以绝对路径或者相对路径的形式指向其它文件或者目录的引用。一个符号链接文件仅包含有一个文本字符串，其被操作系统解释为一条指向另一个文件或者目录的路径。它是一个独立文件，其存在并不依赖于目标文件。如果删除一个符号链接，它指向的目标文件不受影响。如果目标文件被移动、重命名或者删除，任何指向它的符号链接仍然存在，但是它们将会指向一个不复存在的文件。这种情况被有时被称为被遗弃。

### createDirectory(Path path) 创建目录

```java
Path output = Paths.get("D:\\test\\output");
Path newDir = Files.createDirectory(output);
// Files.createDirectories(output); 
// 这个方法可以一并创建不存在的父目录
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


### 移动文件/文件夹

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

---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)