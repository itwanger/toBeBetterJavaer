---
title: Junit：一个开源的Java单元测试框架
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---



### 01、前世今生

你好呀，我是 JUnit，一个开源的 Java 单元测试框架。在了解我之前，先来了解一下什么是单元测试。单元测试，就是针对最小的功能单元编写测试代码。在 Java 中，最小的功能单元就是方法，因此，对 Java 程序员进行单元测试实际上就是对 Java 方法的测试。

为什么要进行单元测试呢？因为单元测试可以确保你编写的代码是符合软件需求和遵循开发规范的。单元测试是所有测试中最底层的一类测试，是第一个环节，也是最重要的一个环节，是唯一一次能够达到代码覆盖率 100% 的测试，是整个软件测试过程的基础和前提。可以这么说，单元测试的性价比是最好的。

微软公司之前有这样一个统计：bug 在单元测试阶段被发现的平均耗时是 3.25 小时，如果遗漏到系统测试则需要 11.5 个小时。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-5b0afb32-c60e-4218-98b1-44288705e472.png)

经我这么一说，你应该已经很清楚单元测试的重要性了。那在你最初编写测试代码的时候，是不是经常这么做？就像下面这样。

```java
public class Factorial {
    public static long fact(long n) {
        long r = 1;
        for (long i = 1; i <= n; i++) {
            r = r * i;
        }
        return r;
    }

    public static void main(String[] args) {
        if (fact(3) == 6) {
            System.out.println("通过");
        } else {
            System.out.println("失败");
        }
    }
}
```

要测试 `fact()` 方法正确性，你在 `main()` 方法中编写了一段测试代码。如果你这么做过的话，我只能说你也曾经青涩天真过啊！使用 `main()` 方法来测试有很多坏处，比如说：

1）测试代码没有和源代码分开。

2）不够灵活，很难编写一组通用的测试代码。

3）无法自动打印出预期和实际的结果，没办法比对。

但如果学会使用我——JUnit 的话，就不会再有这种困扰了。我可以非常简单地组织测试代码，并随时运行它们，还能给出准确的测试报告，让你在最短的时间内发现自己编写的代码到底哪里出了问题。

### 02、上手指南

好了，既然知道了我这么优秀，那还等什么，直接上手吧！我最新的版本是 JUnit 5，Intellij IDEA 中已经集成了，所以你可以直接在 IDEA 中编写并运行我的测试用例。

第一步，直接在当前的代码编辑器窗口中按下 `Command+N` 键（Mac 版），在弹出的菜单中选择「Test...」。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-fe29e8b8-9264-4aa3-9139-6ebb39af88a1.png)

勾选上要编写测试用例的方法 `fact()`，然后点击「OK」。

此时，IDEA 会自动在当前类所在的包下生成一个类名带 Test（惯例）的测试类。如下图所示。 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-756305d6-7166-4737-8665-89d24a1eefae.png)

如果你是第一次使用我的话，IDEA 会提示你导入我的依赖包。建议你选择最新的 JUnit 5.4。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-91bf986d-3586-4175-9ca2-959e5eb62e9c.png)

导入完毕后，你可以打开 pom.xml 文件确认一下，里面多了对我的依赖。

```
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>RELEASE</version>
    <scope>compile</scope>
</dependency>
```

第二步，在测试方法中添加一组断言，如下所示。

```java
@Test
void fact() {
    assertEquals(1, Factorial.fact(1));
    assertEquals(2, Factorial.fact(2));
    assertEquals(6, Factorial.fact(3));
    assertEquals(100, Factorial.fact(5));
}
```

`@Test` 注解是我要求的，我会把带有 `@Test` 的方法识别为测试方法。在测试方法内部，你可以使用 `assertEquals()` 对期望的值和实际的值进行比对。

第三步，你可以在邮件菜单中选择「Run FactorialTest」来运行测试用例，结果如下所示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-7daf1a3d-a321-4d42-9d16-134043161a29.png)

测试失败了，因为第 20 行的预期结果和实际不符，预期是 100，实际是 120。此时，你要么修正实现代码，要么修正测试代码，直到测试通过为止。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-5b71c36f-684d-4d30-b1a1-faef453603ae.png)

不难吧？单元测试可以确保单个方法按照正确的预期运行，如果你修改了某个方法的代码，只需确保其对应的单元测试通过，即可认为改动是没有问题的。

### 03、瞻前顾后

在一个测试用例中，可能要对多个方法进行测试。在测试之前呢，需要准备一些条件，比如说创建对象；在测试完成后呢，需要把这些对象销毁掉以释放资源。如果在多个测试方法中重复这些样板代码又会显得非常啰嗦。

这时候，该怎么办呢？

我为你提供了 `setUp()` 和 `tearDown()`，作为一个文化人，我称之为“瞻前顾后”。来看要测试的代码。

```java
public class Calculator {
    public int sub(int a, int b) {
        return a - b;
    }
    public int add(int a, int b) {
        return a + b;
    }
}
```

新建测试用例的时候记得勾选`setUp` 和 `tearDown`。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/junit-afa3c969-a2d2-439c-b440-5b7480592d52.png)

生成后的代码如下所示。

```java
class CalculatorTest {
    Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }


    @Test
    void sub() {
        assertEquals(0,calculator.sub(1,1));
    }

    @Test
    void add() {
        assertEquals(2,calculator.add(1,1));
    }
}
```

`@BeforeEach` 的 `setUp()` 方法会在运行每个 `@Test` 方法之前运行；`@AfterEach` 的 `tearDown()` 方法会在运行每个 `@Test` 方法之后运行。

与之对应的还有 `@BeforeAll` 和 `@AfterAll`，与 `@BeforeEach` 和 `@AfterEach` 不同的是，All 通常用来初始化和销毁静态变量。

```java
public class DatabaseTest {
    static Database db;

    @BeforeAll
    public static void init() {
        db = createDb(...);
    }
    
    @AfterAll
    public static void drop() {
        ...
    }
}
```

### 03、异常测试

对于 Java 程序来说，异常处理也非常的重要。对于可能抛出的异常进行测试，本身也是测试的一个重要环节。

还拿之前的 Factorial 类来进行说明。在 `fact()` 方法的一开始，对参数 n 进行了校验，如果小于 0，则抛出 IllegalArgumentException 异常。

```java
public class Factorial {
    public static long fact(long n) {
        if (n < 0) {
            throw new IllegalArgumentException("参数不能小于 0");
        }
        long r = 1;
        for (long i = 1; i <= n; i++) {
            r = r * i;
        }
        return r;
    }
}
```

在 FactorialTest 中追加一个测试方法 `factIllegalArgument()`。

```java
@Test
void factIllegalArgument() {
    assertThrows(IllegalArgumentException.class, new Executable() {
        @Override
        public void execute() throws Throwable {
            Factorial.fact(-2);
        }
    });
}
```

我为你提供了一个 `assertThrows()` 的方法，第一个参数是异常的类型，第二个参数 Executable，可以封装产生异常的代码。如果觉得匿名内部类写起来比较复杂的话，可以使用 Lambda 表达式。

```java
@Test
void factIllegalArgumentLambda() {
    assertThrows(IllegalArgumentException.class, () -> {
        Factorial.fact(-2);
    });
}
```

### 04、忽略测试

有时候，由于某些原因，某些方法产生了 bug，需要一段时间去修复，在修复之前，该方法对应的测试用例一直是以失败告终的，为了避免这种情况，我为你提供了 `@Disabled` 注解。

```java
class DisabledTestsDemo {

    @Disabled("该测试用例不再执行，直到编号为 43 的 bug 修复掉")
    @Test
    void testWillBeSkipped() {
    }

    @Test
    void testWillBeExecuted() {
    }

}
```

`@Disabled` 注解也可以不需要说明，但我建议你还是提供一下，简单地说明一下为什么这个测试方法要忽略。在上例中，如果团队的其他成员看到说明就会明白，当编号 43 的 bug 修复后，该测试方法会重新启用的。即便是为了提醒自己，也很有必要，因为时间长了你可能自己就忘了，当初是为什么要忽略这个测试方法的。

### 05、条件测试

有时候，你可能需要在某些条件下运行测试方法，有些条件下不运行测试方法。针对这场使用场景，我为你提供了条件测试。

1）不同的操作系统，可能需要不同的测试用例，比如说 Linux 和 Windows 的路径名是不一样的，通过 `@EnabledOnOs` 注解就可以针对不同的操作系统启用不同的测试用例。

```java
@Test
@EnabledOnOs(MAC)
void onlyOnMacOs() {
    // ...
}

@TestOnMac
void testOnMac() {
    // ...
}

@Test
@EnabledOnOs({ LINUX, MAC })
void onLinuxOrMac() {
    // ...
}

@Test
@DisabledOnOs(WINDOWS)
void notOnWindows() {
    // ...
}
```

2）不同的 Java 运行环境，可能也需要不同的测试用例。`@EnabledOnJre` 和 `@EnabledForJreRange` 注解就可以满足这个需求。

```java
@Test
@EnabledOnJre(JAVA_8)
void onlyOnJava8() {
    // ...
}

@Test
@EnabledOnJre({ JAVA_9, JAVA_10 })
void onJava9Or10() {
    // ...
}

@Test
@EnabledForJreRange(min = JAVA_9, max = JAVA_11)
void fromJava9to11() {
    // ...
}
```

### 06、尾声

最后，给你说三句心里话吧。在编写单元测试的时候，你最好这样做：

1）单元测试的代码本身必须非常名单明了，能一下看明白，决不能再为测试代码编写测试代码。

2）每个单元测试应该互相独立，不依赖运行时的顺序。

3）测试时要特别注意边界条件，比如说 0，`null`，空字符串"" 等情况。

希望我能尽早的替你发现代码中的 bug，毕竟越早的发现，造成的损失就会越小。see you！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
