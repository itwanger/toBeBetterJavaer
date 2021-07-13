## throw 和 throws

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

“throws 关键字的作用就和 throw 完全不同。”我说，“[异常处理机制](https://mp.weixin.qq.com/s/fXRJ1xdz_jNSSVTv7ZrYGQ)这小节中讲了 checked exception 和 unchecked exception，也就是检查型异常和非检查型异常；对于检查型异常来说，如果你没有做处理，编译器就会提示你。”

`Class.forName()` 方法在执行的时候可能会遇到 `java.lang.ClassNotFoundException` 异常，一个检查型异常，如果没有做处理，IDEA 就会提示你，要么在方法签名上声明，要么放在 try-catch 中。

![](https://cdn.jsdelivr.net/gh/itwanger/Tech-Sister-Learn-Java/images/exception/throw-throws-01.png)

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

“三妹，这下子清楚了吧？”我抬抬头，看了看三妹说。

“好的，二哥，这下彻底记住了，你真棒！”