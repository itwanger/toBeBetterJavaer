---
title: 详解 File、Path、Paths、Files 四个类，Java操作文件不再难
shortTitle: 详解File、Path、Paths、Files
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，详解 File、Path、Paths、Files，操作文件不再难
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java IO,file,paths,files,path
---

## File 类

至于IO流，也就是输入输出流，从文件出发到文件结束，至始至终都离不开文件，所以IO流还得从文件File类讲起。

### File概述

`java.io.File` 类是专门对文件进行操作的类，只能对文件本身进行操作，不能对文件内容进行操作。

`java.io.File` 类是文件和目录路径名的抽象表示，主要用于文件和目录的创建、查找和删除等操作。

怎么理解上面两句话？其实很简单！

第一句就是说File跟流无关，File类不能对文件进行读和写也就是输入和输出！

第二句就是说File主要表示`D:\\文件目录1`与`D:\\文件目录1\\文件.txt`,前者是文件夹（Directory）后者则是文件(file)，而File类就是操作这两者的类。

## 构造方法

在java中，一切皆是对象，File类也不例外，不论是哪个对象都应该从该对象的构造说起，所以我们来分析分析`File`类的构造方法。首先从API开始着手：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/file-path-37de6cfc-f82f-4459-bc7e-9b4bd7466d70.png)


比较常用的构造方法有三个：

1、 `public File(String pathname)` ：通过给定的**路径**来创建新的 File实例。

2、 `public File(String parent, String child)` ：从**父路径（字符串）和子路径**创建新的 File实例。

3、 `public File(File parent, String child)` ：从**父路径（File）和子路径名字符串**创建新的 File实例。

看文字描述不够生动、不够形象、不得劲？没事，通过举例马上就生动形象了，代码如下：

```java
1. 一个File对象代表硬盘中实际存在的一个文件或者目录。
2.  File类构造方法不会给你检验这个文件或文件夹是否真实存在，因此无论该路径下是否存在文件或者目录，都不影响File对象的创建。

// 文件路径名 
String path = "D:\\123.txt";
File file1 = new File(path); 

// 文件路径名
String path2 = "D:\\1\\2.txt";
File file2 = new File(path2);     -------------相当于D:\\1\\2.txt

// 通过父路径和子路径字符串
 String parent = "F:\\aaa";
 String child = "bbb.txt";
 File file3 = new File(parent, child);  --------相当于F:\\aaa\\bbb.txt

// 通过父级File对象和子路径字符串
File parentDir = new File("F:\\aaa");
String child = "bbb.txt";
File file4 = new File(parentDir, child); --------相当于F:\\aaa\\bbb.txt
```
 

> File类的注意点：
> 
> 1.  一个File对象代表硬盘中实际存在的一个文件或者目录。
> 2.  File类构造方法不会给你检验这个文件或文件夹是否真实存在，因此无论该路径下是否存在文件或者目录，都不影响File对象的创建。

### 常用方法

File的常用方法主要分为获取功能、获取绝对路径和相对路径、判断功能、创建删除功能的方法

#### 获取功能的方法

1、`public String getAbsolutePath()` ：返回此File的绝对路径。

2、`public String getPath()` ：结果和getAbsolutePath一致。

3、`public String getName()` ：返回文件名或目录名。

4、`public long length()` ：返回文件长度，以字节为单位。

测试代码如下【注意测试以自己的电脑文件夹为准】：

```java
public class FileGet {
    public static void main(String[] args) {
        File f = new File("d:/aaa/bbb.java");     
        System.out.println("文件绝对路径:"+f.getAbsolutePath());
        System.out.println("文件构造路径:"+f.getPath());
        System.out.println("文件名称:"+f.getName());
        System.out.println("文件长度:"+f.length()+"字节");

        File f2 = new File("d:/aaa");     
        System.out.println("目录绝对路径:"+f2.getAbsolutePath());
        System.out.println("目录构造路径:"+f2.getPath());
        System.out.println("目录名称:"+f2.getName());
        System.out.println("目录长度:"+f2.length());
    }
}
输出结果：
文件绝对路径:d:\aaa\bbb.java
文件构造路径:d:\aaa\bbb.java
文件名称:bbb.java
文件长度:2116字节

目录绝对路径:d:\aaa
目录构造路径:d:\aaa
目录名称:aaa
目录长度:3236
```
 

> 注意：`length()` 表示文件的长度，`File`对象表示目录的时候，则返回值无意义。

#### 绝对路径和相对路径

**绝对路径**：一个完整的路径，以盘符开头，例如`F://aaa.txt`。

**相对路径**：一个简化的路径，不以盘符开头,例如`//aaa.txt//b.txt`。

> 1、**路径是不区分大小写的**
> 
> 2、路径中的文件分隔符，windows使用反斜杠，反斜杠是转义字符，两个反斜杠代表一个普通的反斜杠；macOS 和Linux 使用的是 `/`。

```java
//绝对路径
public class FilePath {
    public static void main(String[] args) {
        // D盘下的bbb.java文件
        File f = new File("D:\\bbb.java");
        System.out.println(f.getAbsolutePath());
        
    // 项目下的bbb.java文件
        File f2 = new File("bbb.java");
        System.out.println(f2.getAbsolutePath());
    }
}
输出结果：
D:\bbb.java
D:\java\bbb.java
```
 

#### 判断功能的方法

1、 `public boolean exists()` ：判断文件或目录是否存在。

2、 `public boolean isDirectory()` ：判断是否为目录。

3、`public boolean isFile()` ：判断是否为文件。

方法演示，代码如下：

```java
public class FileIs {
    public static void main(String[] args) {
        File f = new File("d:\\aaa\\bbb.java");
        File f2 = new File("d:\\aaa");
        // 判断是否存在
        System.out.println("d:\\aaa\\bbb.java 是否存在:"+f.exists());
        System.out.println("d:\\aaa 是否存在:"+f2.exists());
        // 判断是文件还是目录
        System.out.println("d:\\aaa 文件?:"+f2.isFile());
        System.out.println("d:\\aaa 目录?:"+f2.isDirectory());
    }
}
输出结果：
d:\aaa\bbb.java 是否存在:true
d:\aaa 是否存在:true
d:\aaa 文件?:false
d:\aaa 目录?:true
```
 

#### 创建、删除功能的方法

*   `public boolean createNewFile()` ：文件不存在，创建一个新的空文件并返回`true`，文件存在，不创建文件并返回`false`。
*   `public boolean delete()` ：删除文件或目录。
*   `public boolean mkdir()` ：创建目录。
*   `public boolean mkdirs()` ：创建目录，包括任何必需但不存在的父目录。

其中，`mkdirs()`和`mkdir()`方法类似，但`mkdir()`，只能创建一级目录，`mkdirs()`可以创建多级目录比如`//a//b//c`，所以**开发中一般用**`mkdirs()`;

> 这些方法中值得注意的是**createNewFile**方法以及**mkdir**与**mkdirs**的区别

方法测试，代码如下：

```java
public class FileCreateDelete {
    public static void main(String[] args) throws IOException {
        // 文件的创建
        File f = new File("aaa.txt");
        System.out.println("是否存在:"+f.exists()); // false
        System.out.println("是否创建:"+f.createNewFile()); // true
        System.out.println("是否创建:"+f.createNewFile()); // 以及创建过了所以再使用createNewFile返回false
        System.out.println("是否存在:"+f.exists()); // true
    
      // 目录的创建
        File f2= new File("newDir");  
        System.out.println("是否存在:"+f2.exists());// false
        System.out.println("是否创建:"+f2.mkdir()); // true
        System.out.println("是否存在:"+f2.exists());// true

    // 创建多级目录
        File f3= new File("newDira\\newDirb");
        System.out.println(f3.mkdir());// false
        File f4= new File("newDira\\newDirb");
        System.out.println(f4.mkdirs());// true
      
        // 文件的删除
        System.out.println(f.delete());// true
      
        // 目录的删除
        System.out.println(f2.delete());// true
        System.out.println(f4.delete());// false
    }
}
```
 

> 注意：`delete`方法，如果此`File`表示目录，则目录必须为空才能删除。

### 目录的遍历

*   `public String[] list()` ：返回一个String数组，表示该File目录中的所有子文件或目录。
*   `public File[] listFiles()` ：返回一个File数组，表示该File目录中的所有的子文件或目录。

```java
public class FileFor {
    public static void main(String[] args) {
        File dir = new File("G:\光标");
      
        //获取当前目录下的文件以及文件夹的名称。
        String[] names = dir.list();
        for(String name : names){
          System.out.println(name);
        }
        //获取当前目录下的文件以及文件夹对象，只要拿到了文件对象，那么就可以获取更多信息
        File[] files = dir.listFiles();
        for (File file : files) {
            System.out.println(file);
        }
    }
}
```
 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/file-path-0f1675a7-ee3b-4f28-9cca-00c4ba5a5759.png)



**listFiles**在获取指定目录下的文件或者文件夹时必须满足下面两个条件：

1，**指定的目录必须存在**

2，**指定的必须是目录。否则容易引发NullPointerException异常**

### 递归遍历文件夹下所有文件以及子文件

不说啥了，直接上代码：

```javascript
package File;

import java.io.File;

//递归遍历文件夹下所有的文件
public class RecursionDirectory {
    public static void main(String[] args) {
      File file=new File("D:\\java专属IO测试");
        Recursion(file);
    }
    public static void Recursion(File file){
        //1、判断传入的是否是目录
        if(!file.isDirectory()){
            //不是目录直接退出
            return;
        }
        //已经确保了传入的file是目录
        File[] files = file.listFiles();
        //遍历files
        for (File f: files) {
            //如果该目录下文件还是个文件夹就再进行递归遍历其子目录
            if(f.isDirectory()){
                //递归
                Recursion(f);
            }else {
                //如果该目录下文件是个文件，则打印对应的名字
                System.out.println(f.getName());
            }

        }
    }
}
```

## Path 接口和 Paths 类

Path 接口是 NIO2（AIO） 的一部分，是对 NIO 的更新，Path 接口已添加到 Java 7 中，完全限定类名是 java.nio.file.Path 。

Path 实例表示文件系统中的路径。 路径可以指向文件或目录，也可以是绝对的或相对的。在某些操作系统中，不要将文件系统路径与环境变量中的 path 路径混淆。 java.nio.file.Path 接口与环境变量path无关。

在许多方面，java.nio.file.Path 接口类似于 java.io.File 类，但存在一些细微差别。 不过，在许多情况下，可以使用 Path 接口替换 File 类的使用。

### 创建 Path 对象

可以使用名为 Paths.get() 创建 Path 实例，get()方法是 Path 实例的工厂方法，一个示例如下：

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

