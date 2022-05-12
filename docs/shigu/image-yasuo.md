坦白从宽吧，我就是那个花了两天两夜把 1M 图片优化到 100kb 的家伙——王小二！

自从因为一篇报道登上热搜后，我差点抑郁，每天要靠 50 片安眠药才能入睡。

网络上曝光的那些关于一码通的消息，有真有假，我这里就不再澄清了。就说说我是怎么把图片从  1M 优化到 100kb 的故事吧。

是的，由于系统群体规模和访问规模的特殊性，每一行代码、每一张图片、每一个技术文档都反复核准，优化再优化，精益求精。为确保系统运行得更高效，我们将一张图片从1MB压缩到500KB，再从500KB优化到100KB。

这样的工作在外人看起来，简单到就好像悄悄给学妹塞一张情书就能让她做我女朋友一样简单。

但殊不知，这其中蕴含着极高的技术含量！

不信，我给你们普及下。

### 一、图像压缩

图像压缩是数据压缩技术在数字图像上的应用，目的是减少图像数据中的冗余信息，从而用更加高效的格式存储和传输数据。

图像压缩可以是有损数据压缩，也可以是无损数据压缩。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-1.png)

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-2.png)

怎么样？

是不是感觉图像压缩技术没有想象中那么简单了？

更多关于图像压缩的资料可参考以下链接。

>机器之心：https://www.jiqizhixin.com/graph/technologies/08b2b25e-21a0-48e1-9de8-f91d424adfe1 



### 二、Java数字图像处理

作为这次“20 多万外包项目”的“主力开发人员”，我这里就给大家介绍下 Java 数字图像处理技术吧，一开始我就是用它来处理图片的。

数字图像处理（Digital Image Processing）是通过计算机对图像进行去除噪声、增强、复原、分割、提取特征等处理的方法和技术。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-3.png)

输入的是图像信号，然后经过 DIP 进行有效的算法处理后，输出为数字信号。

为了压缩图像，我们需要读取图像并将其转换成 BufferedImage 对象，BufferedImage 是 Image 类的一个子类，描述了一个具有可访问的图像数据缓冲区，由 ColorModel 和 Raster 的图像数据组成。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-4.png)

废话我就不多说了，直接进入实战吧！

### 三、图像压缩实战

刚好我本地有一张之前用过的封面图，离 1M 只差 236 KB，可以拿来作为测试用。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-5.png)



这其中要用到 ImageIO 类，这是一个静态类，提供了一系列方法用来读和写图像，同时还可以对图像进行简单的编码和解码。

比如说通过 `ImageIO.read()` 可以将图像读取到 BufferedImage 对象：

```java
File input = new File("ceshi.jpg");
BufferedImage image = ImageIO.read(input);
```

比如说通过 `ImageIO.getImageWritersByFormatName()` 可以返回一个Iterator，其中包含了通过命名格式对图像进行编码的 ImageWriter。

```java
Iterator<ImageWriter> writers =  ImageIO.getImageWritersByFormatName("jpg");
ImageWriter writer = (ImageWriter) writers.next();
```

比如说通过 `ImageIO.createImageOutputStream()` 可以创建一个图像的输出流对象，有了该对象后就可以通过 `ImageWriter.setOutput()` 将其设置为输出流。

```java
File compressedImageFile = new File("bbcompress.jpg");
OutputStream os =new FileOutputStream(compressedImageFile);
ImageOutputStream ios = ImageIO.createImageOutputStream(os);
writer.setOutput(ios);
```

紧接着，可以对 ImageWriter 进行一些参数配置，比如说压缩模式，压缩质量等等。

```java
ImageWriteParam param = writer.getDefaultWriteParam();

param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
param.setCompressionQuality(0.01f);
```

压缩模式一共有四种，MODE_EXPLICIT 是其中一种，表示 ImageWriter 可以根据后续的 set 的附加信息进行平铺和压缩，比如说接下来的 `setCompressionQuality()` 方法。

`setCompressionQuality()` 方法的参数是一个 0-1 之间的数，0.0 表示尽最大程度压缩，1.0 表示保证图像质量很重要。对于有损压缩方案，压缩质量应该控制文件大小和图像质量之间的权衡（例如，通过在写入 JPEG 图像时选择量化表）。 对于无损方案，压缩质量可用于控制文件大小和执行压缩所需的时间之间的权衡（例如，通过优化行过滤器并在写入 PNG 图像时设置 ZLIB 压缩级别）。

整体代码如下所示：

```java
public class Demo {
    public static void main(String[] args) {

        try {
            File input = new File("ceshi.jpg");
            BufferedImage image = ImageIO.read(input);


            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpg");
            ImageWriter writer = (ImageWriter) writers.next();

            File compressedImageFile = new File("bbcompress.jpg");
            OutputStream os = new FileOutputStream(compressedImageFile);
            ImageOutputStream ios = ImageIO.createImageOutputStream(os);
            writer.setOutput(ios);


            ImageWriteParam param = writer.getDefaultWriteParam();

            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(0.01f);

            writer.write(null, new IIOImage(image, null, null), param);

            os.close();
            ios.close();
            writer.dispose();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

执行压缩后，可以看到图片的大小压缩到了 19 KB：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-6.png)


可以看得出，质量因子为 0.01f 的时候图片已经有些失真了，可以适当提高质量因子比如说 0.5f，再来看一下。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-7.png)

图片质量明显提高了，但大小依然只有 64 KB，压缩效果还是值得信赖的。

### 四、其他开源库

接下来，推荐一些可以轻松集成到项目中的图像处理库吧，它们全都是免费的。

1）ImageJ，用 Java 编写的，可以编辑、分析、处理、保存和打印图像。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-8.png)

2）Apache Commons Imaging，一个读取和写入各种图像格式的库，包括快速解析图像信息（如大小，颜色，空间，ICC配置文件等）和元数据。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-9.png)

3）ImageMagick，可以读取和写入超过100种格式的图像，包括DPX、EXR、GIF、JPEG、JPEG-2000、PDF、PNG、Postscript、SVG和TIFF。还可以调整大小、翻转、镜像、旋转、扭曲、剪切和变换图像，调整图像颜色，应用各种特殊效果，包括绘制文本、线条、多边形、椭圆和贝塞尔曲线。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-10.png)

4）OpenCV，由BSD许可证发布，可以免费学习和商业使用，提供了包括 C/C++、Python 和 Java 等主流编程语言在内的接口。OpenCV 专为计算效率而设计，强调实时应用，可以充分发挥多核处理器的优势。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-11.png)

这里就以 OpenCV 为例，来演示一下图像压缩。当然了，OpenCV 用来压缩图像属于典型的大材小用。

第一步，添加 OpenCV 依赖到我们的项目当中，以 Maven 为例。

```
<dependency>
	<groupId>org.openpnp</groupId>
	<artifactId>opencv</artifactId>
	<version>4.5.1-2</version>
</dependency>
```

第二步，要想使用 OpenCV，需要先初始化。

```java
OpenCV.loadShared();
```

第三步，使用 OpenCV 读取图片。

```java
Mat src = Imgcodecs.imread(imagePath);
```

第四步，使用 OpenCV 压缩图片。

```java
MatOfInt dstImage = new MatOfInt(Imgcodecs.IMWRITE_JPEG_QUALITY, 1);
Imgcodecs.imwrite("resized_image.jpg", sourceImage, dstImage);
```

MatOfInt 的构造参数是一个可变参数，第一个参数 IMWRITE_JPEG_QUALITY 表示对图片的质量进行改变，第二个是质量因子，1-100，值越大表示质量越高。

执行代码后得到的图片如下所示：

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-12.png)

借这个机会，来对比下 OpenCV 和 JDK 原生 API 在压缩图像时所使用的时间。

这是我本机的配置情况，早年买的顶配 iMac，也是我的主力机。一开始只有 16 G 内存，后来加了一个 16 G 内存条，不过最近半年电脑突然死机重启的频率明显提高了，不知道是不是 Big Sur 这个操作系统的问题还是电脑硬件老了。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-13.png)

结果如下所示：

```
opencvCompress压缩完成，所花时间：1070
jdkCompress压缩完成，所花时间：322
```

压缩后的图片大小差不多，都是 19 KB，并且质量因子都是最低值。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-14.png)

### 四、一点点心声

经过上面的技术分析后，相信你们都明白了，把1M图片优化到100kb实在是一件“不太容易”的事情。。。。

100KB 很小了吧？只有原来的 1/10。

要知道，我可是连续加班了两天两夜，不眠不休。

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/shigu/image-yasuo-15.png)

累到最后，我趴在电脑上都睡着了。

没想到哈喇子直接给电脑整短路了，我这才算是从梦里面吓醒来了！

😔，生活不易，且行且珍惜吧~

----

**本篇已收录至 GitHub 上星标 1.6k+ star 的开源专栏《Java 程序员进阶之路》，据说每一个优秀的 Java 程序员都喜欢她，风趣幽默、通俗易懂。内容包括 Java 基础、Java 并发编程、Java 虚拟机、Java 企业级开发、Java 面试等核心知识点。学 Java，就认准 Java 程序员进阶之路**😄。

[https://github.com/itwanger/toBeBetterJavaer](https://github.com/itwanger/toBeBetterJavaer)

star 了这个仓库就等于你拥有了成为了一名优秀 Java 工程师的潜力。也可以戳下面的链接跳转到《Java 程序员进阶之路》的官网网址，开始愉快的学习之旅吧。

[https://tobebetterjavaer.com/](https://tobebetterjavaer.com/)

![image](https://img-blog.csdnimg.cn/img_convert/79995d0b7cca47da7c124bf1995a0d3b.png)


*没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟*。
