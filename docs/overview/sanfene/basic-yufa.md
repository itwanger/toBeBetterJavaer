### 7.Java 有哪些数据类型？

<b>定义：</b>Java 语言是强类型语言，对于每一种数据都定义了明确的具体的数据类型，在内存中分配了不同大小的内存空间。

Java 语言数据类型分为两种：**基本数据类型**和**引用数据类型**。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/basic-yufa-1.png)

<b>基本数据类型：</b>

- 数值型
  - 整数类型（byte、short、long）
  - 浮点类型（float、long）
- 字符型（char）
- 布尔型（boolean）

Java 基本数据类型范围和默认值：

| 基本类型  | 位数 | 字节 | 默认值  |
| --------- | ---- | ---- | ------- |
| `int`     | 32   | 4    | 0       |
| `short`   | 16   | 2    | 0       |
| `long`    | 64   | 8    | 0L      |
| `byte`    | 8    | 1    | 0       |
| `char`    | 16   | 2    | 'u0000' |
| `float`   | 32   | 4    | 0f      |
| `double`  | 64   | 8    | 0d      |
| `boolean` | 1    |      | false   |

**引用数据类型：**

- 类（class）
- 接口（interface）
- 数组([])

### 8.自动类型转换、强制类型转换？看看这几行代码？

Java 所有的数值型变量可以相互转换，当把一个表数范围小的数值或变量直接赋给另一个表数范围大的变量时，可以进行自动类型转换；反之，需要强制转换。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/basic-yufa-2.png)

这就好像，小杯里的水倒进大杯没问题，但大杯的水倒进小杯就不行了，可能会溢出。

> `float f=3.4`，对吗？

不正确。3.4 是单精度数，将双精度型（double）赋值给浮点型（float）属于下转型（down-casting，也称为窄化）会造成精度损失，因此需要强制类型转换`float f =(float)3.4;`或者写成`float f =3.4F`

> `short s1 = 1; s1 = s1 + 1；`对吗？`short s1 = 1; s1 += 1;`对吗？

对于 short s1 = 1; s1 = s1 + 1;编译出错，由于 1 是 int 类型，因此 s1+1 运算结果也是 int 型，需要强制转换类型才能赋值给 short 型。

而 short s1 = 1; s1 += 1;可以正确编译，因为 s1+= 1;相当于 s1 = (short(s1 + 1);其中有隐含的强制类型转换。

### 9.什么是自动拆箱/封箱？

- **装箱**：将基本类型用它们对应的引用类型包装起来；
- **拆箱**：将包装类型转换为基本数据类型；

Java 可以自动对基本数据类型和它们的包装类进行装箱和拆箱。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/basic-yufa-3.png)

举例：

```java
Integer i = 10;  //装箱
int n = i;   //拆箱
```

### 10.&和&&有什么区别？

&运算符有两种用法：`短路与`、`逻辑与`。

&&运算符是短路与运算。逻辑与跟短路与的差别是非常巨大的，虽然二者都要求运算符左右两端的布尔值都是 true 整个表达式的值才是 true。

&&之所以称为短路运算是因为，如果&&左边的表达式的值是 false，右边的表达式会被直接短路掉，不会进行运算。很多时候我们可能都需要用&&而不是&。

例如在验证用户登录时判定用户名不是 null 而且不是空字符串，应当写为`username != null &&!username.equals("")`，二者的顺序不能交换，更不能用&运算符，因为第一个条件如果不成立，根本不能进行字符串的 equals 比较，否则会产生 NullPointerException 异常。

**注意**：逻辑或运算符（|）和短路或运算符（||）的差别也是如此。

### 11.switch 是否能作用在 byte/long/String 上？

Java5 以前 switch(expr)中，expr 只能是 byte、short、char、int。

从 Java 5 开始，Java 中引入了枚举类型， expr 也可以是 enum 类型。

从 Java 7 开始，expr 还可以是字符串(String)，但是长整型(long)在目前所有的版本中都是不可以的。

### 12.break ,continue ,return 的区别及作用？

- break 跳出整个循环，不再执行循环(**结束当前的循环体**)
- continue 跳出本次循环，继续执行下次循环(**结束正在执行的循环 进入下一个循环条件**)
- return 程序返回，不再执行下面的代码(**结束当前的方法 直接返回**)

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/basic-yufa-4.png)

### 13.用最有效率的方法计算 2 乘以 8？

2 << 3。**位运算**，数字的二进制位左移三位相当于乘以 2 的三次方。

### 14.说说自增自减运算？看下这几个代码运行结果？

在写代码的过程中，常见的一种情况是需要某个整数类型变量增加 1 或减少 1，Java 提供了一种特殊的运算符，用于这种表达式，叫做自增运算符（++)和自减运算符（--）。

++和--运算符可以放在变量之前，也可以放在变量之后。

当运算符放在变量之前时(前缀)，先自增/减，再赋值；当运算符放在变量之后时(后缀)，先赋值，再自增/减。

例如，当 `b = ++a` 时，先自增（自己增加 1），再赋值（赋值给 b）；当 `b = a++` 时，先赋值(赋值给 b)，再自增（自己增加 1）。也就是，++a 输出的是 a+1 的值，a++输出的是 a 值。

用一句口诀就是：“符号在前就先加/减，符号在后就后加/减”。

> 看一下这段代码运行结果？

```java
int i  = 1;
i = i++;
System.out.println(i);
```

答案是 1。有点离谱对不对。

对于 JVM 而言，它对自增运算的处理，是会先定义一个临时变量来接收 i 的值，然后进行自增运算，最后又将临时变量赋给了值为 2 的 i，所以最后的结果为 1。

相当于这样的代码：

```java
int i = 1；
int temp = i;
i++；
i = temp;
System.out.println(i);
```

> 这段代码会输出什么？

```java
int count = 0;
for(int i = 0;i < 100;i++)
{
    count = count++;
}
System.out.println("count = "+count);
```

答案是 0。

和上面的题目一样的道理，同样是用了临时变量，count 实际是等于临时变量的值。

```java
int autoAdd(int count)
{
    int temp = count;
    count = coutn + 1;
    return temp;
}
```

PS：笔试面试可能会碰到的奇葩题，开发这么写，见一次吊一次。
