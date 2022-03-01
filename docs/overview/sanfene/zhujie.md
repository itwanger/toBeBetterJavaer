### 48.说一下你对注解的理解？

**Java 注解本质上是一个标记**，可以理解成生活中的一个人的一些小装扮，比如戴什么什么帽子，戴什么眼镜。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/zhujie-1.png)

注解可以标记在类上、方法上、属性上等，标记自身也可以设置一些值，比如帽子颜色是绿色。

有了标记之后，我们就可以在编译或者运行阶段去识别这些标记，然后搞一些事情，这就是注解的用处。

例如我们常见的 AOP，使用注解作为切点就是运行期注解的应用；比如 lombok，就是注解在编译期的运行。

注解生命周期有三大类，分别是：

- RetentionPolicy.SOURCE：给编译器用的，不会写入 class 文件
- RetentionPolicy.CLASS：会写入 class 文件，在类加载阶段丢弃，也就是运行的时候就没这个信息了
- RetentionPolicy.RUNTIME：会写入 class 文件，永久保存，可以通过反射获取注解信息

所以我上文写的是解析的时候，没写具体是解析啥，因为不同的生命周期的解析动作是不同的。

像常见的：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/zhujie-2.png)

就是给编译器用的，编译器编译的时候检查没问题就 over 了，class 文件里面不会有 Override 这个标记。

再比如 Spring 常见的 Autowired ，就是 RUNTIME 的，所以**在运行的时候可以通过反射得到注解的信息**，还能拿到标记的值 required 。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/zhujie-3.png)
