## try-catch-finally

回首页
新建文集
 新建文章
 在下方新建文章
已保存
教妹学 Java 第 42 讲：try-catch-finally
 发布文章
“二哥，[上一节](https://mp.weixin.qq.com/s/fXRJ1xdz_jNSSVTv7ZrYGQ)你讲了异常处理机制，这一节讲什么呢？”三妹问。

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

![](https://upload-images.jianshu.io/upload_images/1179389-97bdf20028db49f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

至于参数 status 的值也很好理解，如果是异常退出，设置为非 0 即可，通常用 1 来表示；如果是想正常退出程序，用 0 表示即可。

“好了，三妹，关于 try-catch-finally 我们就讲到这吧！”我说。

“好的，二哥，已经很清楚了，我很期待下一节能讲 try-with-resources。”哈哈哈哈，三妹已经学会提新要求了，这令我感到非常的开心。

“没问题，下期见~”
