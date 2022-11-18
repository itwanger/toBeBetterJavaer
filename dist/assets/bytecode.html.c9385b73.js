import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as t,a as e,d as a,b as n,e as s,r as c}from"./app.99eb8281.js";const r={},v=s(`<h1 id="从javap的角度轻松看懂字节码" tabindex="-1"><a class="header-anchor" href="#从javap的角度轻松看懂字节码" aria-hidden="true">#</a> 从javap的角度轻松看懂字节码</h1><h3 id="_01、字节码" tabindex="-1"><a class="header-anchor" href="#_01、字节码" aria-hidden="true">#</a> 01、字节码</h3><p>计算机比较“傻”，只认 0 和 1，这意味着我们编写的代码最终都要编译成机器码才能被计算机执行。Java 在诞生之初就提出了一个非常著名的宣传口号: &quot;<strong>一次编写，处处运行</strong>&quot;。</p><blockquote><p><strong>Write Once, Run Anywhere.</strong></p></blockquote><p>为了这个口号，Java 的亲妈 Sun 公司以及其他虚拟机提供商发布了许多可以在不同平台上运行的 Java 虚拟机，而这些虚拟机都拥有一个共同的功能，那就是可以载入和执行同一种与平台无关的字节码（Byte Code）。</p><p>有了 Java 虚拟机的帮助，我们编写的 Java 源代码不必再根据不同平台编译成对应的机器码了，只需要生成一份字节码，然后再将字节码文件交由运行在不同平台上的 Java 虚拟机读取后执行就可以了。</p><p>如今的 Java 虚拟机非常强大，不仅支持 Java 语言，还支持很多其他的编程语言，比如说 Groovy、Scala、Koltin 等等。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-dd31bbd6-c75c-4426-9437-c0f57ea3b86f.png" alt="" loading="lazy"></p><p>来看一段代码吧。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译生成 Main.class 文件后，可以在命令行使用 <code>xxd Main.class</code> 打开 class 文件（我用的是 Intellij IDEA，在 macOS 环境下）。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-bd941085-ff0e-4abf-a5f9-afb0493bfed7.png" alt="" loading="lazy"></p><p>对于这些 16 进制内容，除了开头的 cafe babe，剩下的内容大致可以翻译成：啥玩意啊这......</p><p>同学们别慌，就从&quot;cafe babe&quot;说起吧，这 4 个字节称之为<strong>魔数</strong>，也就是说，只有以&quot;cafe babe&quot;开头的 class 文件才能被 Java 虚拟机接受，这 4 个字节就是字节码文件的身份标识。</p><p>目光右移，0000 是 Java 的次版本号，0037 转化为十进制是 55，是主版本号，Java 的版本号从 45 开始，每升一个大版本，版本号加 1，大家可以启动福尔摩斯模式，推理一下。</p>`,15),o={href:"https://mp.weixin.qq.com/s/uMEZ2Xwctx4n-_8zvtDp5A",target:"_blank",rel:"noopener noreferrer"},p=s(`<h3 id="_02、反编译字节码文件" tabindex="-1"><a class="header-anchor" href="#_02、反编译字节码文件" aria-hidden="true">#</a> <strong>02、反编译字节码文件</strong></h3><p>Java 内置了一个反编译命令 javap，可以通过 <code>javap -help</code> 了解 javap 的基本用法。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-84b7af5c-93b1-4f63-bb30-946ab3d7e98c.png" alt="" loading="lazy"></p><p>OK，我们输入命令 <code>javap -v -p Main.class</code> 来查看一下输出的内容。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Classfile /Users/maweiqing/Documents/GitHub/TechSisterLearnJava/codes/TechSister/target/classes/com/itwanger/jvm/Main.class
  Last modified 2021年4月15日; size 385 bytes
  SHA-256 checksum 6688843e4f70ae8d83040dc7c8e2dd3694bf10ba7c518a6ea9b88b318a8967c6
  Compiled from &quot;Main.java&quot;
public class com.itwanger.jvm.Main
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #3                          // com/itwanger/jvm/Main
  super_class: #4                         // java/lang/Object
  interfaces: 0, fields: 1, methods: 2, attributes: 1
Constant pool:
   #1 = Methodref          #4.#18         // java/lang/Object.&quot;&lt;init&gt;&quot;:()V
   #2 = Fieldref           #3.#19         // com/itwanger/jvm/Main.age:I
   #3 = Class              #20            // com/itwanger/jvm/Main
   #4 = Class              #21            // java/lang/Object
   #5 = Utf8               age
   #6 = Utf8               I
   #7 = Utf8               &lt;init&gt;
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/itwanger/jvm/Main;
  #14 = Utf8               getAge
  #15 = Utf8               ()I
  #16 = Utf8               SourceFile
  #17 = Utf8               Main.java
  #18 = NameAndType        #7:#8          // &quot;&lt;init&gt;&quot;:()V
  #19 = NameAndType        #5:#6          // age:I
  #20 = Utf8               com/itwanger/jvm/Main
  #21 = Utf8               java/lang/Object
{
  private int age;
    descriptor: I
    flags: (0x0002) ACC_PRIVATE

  public com.itwanger.jvm.Main();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
         4: aload_0
         5: bipush        18
         7: putfield      #2                  // Field age:I
        10: return
      LineNumberTable:
        line 6: 0
        line 7: 4
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      11     0  this   Lcom/itwanger/jvm/Main;

  public int getAge();
    descriptor: ()I
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: getfield      #2                  // Field age:I
         4: ireturn
      LineNumberTable:
        line 9: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/itwanger/jvm/Main;
}
SourceFile: &quot;Main.java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>睁大眼睛瞧过去，感觉内容挺多的。同学们不要着急，我们来一行一行分析。</p><p>第 1 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Classfile /Users/maweiqing/Documents/GitHub/TechSisterLearnJava/codes/TechSister/target/classes/com/itwanger/jvm/Main.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字节码文件的位置。</p><p>第 2 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Last modified 2021年4月15日; size 385 bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字节码文件的修改日期、文件大小。</p><p>第 3 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SHA-256 checksum 6688843e4f70ae8d83040dc7c8e2dd3694bf10ba7c518a6ea9b88b318a8967c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字节码文件的 SHA-256 值。</p><p>第 4 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Compiled from &quot;Main.java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>说明该字节码文件编译自 Main.java 源文件。</p><p>第 5 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class com.itwanger.jvm.Main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字节码文件的类全名。</p><p>第 6 行 <code>minor version: 0</code>，次版本号。</p><p>第 7 行 <code>major version: 55</code>，主版本号。</p><p>第 8 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>flags: (0x0021) ACC_PUBLIC, ACC_SUPER
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类访问标记，一共有 8 种。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-d12d6983-f427-40d2-bb4b-3a2c6c4c7806.png" alt="" loading="lazy"></p><p>表明当前类是 <code>ACC_PUBLIC | ACC_SUPER</code>。位运算符 <code>|</code> 的意思是如果相对应位是 0，则结果为 0，否则为 1，所以 <code>0x0001 | 0x0020</code> 的结果是 <code>0x0021</code>（需要转成二进制进行运算）。</p><p>第 9 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>this_class: #3                          // com/itwanger/jvm/Main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当前类的索引，指向常量池中下标为 3 的常量，可以看得出当前类是 Main 类。</p><p>第 10 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>super_class: #4                         // java/lang/Object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>父类的索引，指向常量池中下标为 6 的常量，可以看得出当前类的父类是 Object 类。</p><p>第 11 行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>interfaces: 0, fields: 1, methods: 2, attributes: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当前类有 0 个接口，1 个字段（age），2 个方法（<code>write()</code>方法和缺省的默认构造方法），1 个属性（该类仅有的一个属性是 SourceFIle，包含了源码文件的信息）。</p><h3 id="_03、常量池" tabindex="-1"><a class="header-anchor" href="#_03、常量池" aria-hidden="true">#</a> 03、常量池</h3><p>接下来是 Constant pool，也就是字节码文件最重要的常量池部分。可以把常量池理解为字节码文件中的资源仓库，主要存放两大类信息。</p><p>1）字面量（Literal），有点类似 Java 中的常量概念，比如文本字符串，final 常量等。</p><p>2）符号引用（Symbolic References），属于编译原理方面的概念，包括 3 种：</p><ul><li>类和接口的全限定名（Fully Qualified Name）</li><li>字段的名称和描述符（Descriptor）</li><li>方法的名称和描述符</li></ul><p>Java 虚拟机是在加载字节码文件的时候才进行的动态链接，也就是说，字段和方法的符号引用只有经过运行期转换后才能获得真正的内存地址。当 Java 虚拟机运行时，需要从常量池获取对应的符号引用，然后在类创建或者运行时解析并翻译到具体的内存地址上。</p><p>当前字节码文件中一共有 21 个常量，它们之间是有链接的，逐个分析会比较乱，我们采用顺藤摸瓜的方式，从上依次往下看，那些被链接的常量我们就点到为止。</p><p><em>注</em>：</p><ul><li><p><code>#</code> 号后面跟的是索引，索引没有从 0 开始而是从 1 开始，是因为设计者考虑到，“如果要表达不引用任何一个常量的含义时，可以将索引值设为 0 来表示”（《深入理解 Java 虚拟机》描述的）。</p></li><li><p><code>=</code> 号后面跟的是常量的类型，没有包含前缀 <code>CONSTANT_</code> 和后缀 <code>_info</code>。</p></li><li><p>全文中提到的索引等同于下标，为了灵活描述，没有做统一。</p></li></ul><hr><p>第 1 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#1 = Methodref          #4.#18         // java/lang/Object.&quot;&lt;init&gt;&quot;:()V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Methodref，表明是用来定义方法的，指向常量池中下标为 4 和 18 的常量。</p><p>第 4 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#4 = Class              #21            // java/lang/Object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Class，表明是用来定义类（或者接口）的，指向常量池中下标为 21 的常量。</p><p>第 21 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#21 = Utf8               java/lang/Object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Utf8，UTF-8 编码的字符串，值为 <code>java/lang/Object</code>。</p><p>第 18 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#18 = NameAndType        #7:#8          // &quot;&lt;init&gt;&quot;:()V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 NameAndType，表明是字段或者方法的部分符号引用，指向常量池中下标为 7 和 8 的常量。</p><p>第 7 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#7 = Utf8               &lt;init&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Utf8，UTF-8 编码的字符串，值为 <code>&lt;init&gt;</code>，表明为构造方法。</p><p>第 8 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#8 = Utf8               ()V
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Utf8，UTF-8 编码的字符串，值为 <code>()V</code>，表明方法的返回值为 void。</p><p>到此为止，第 1 个常量算是摸完了。组合起来的意思就是，Main 类使用的是默认的构造方法，来源于 Object 类。</p><hr><p>第 2 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#2 = Fieldref           #3.#19         // com/itwanger/jvm/Main.age:I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Fieldref，表明是用来定义字段的，指向常量池中下标为 3 和 19 的常量。</p><p>第 3 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#3 = Class              #20            // com/itwanger/jvm/Main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Class，表明是用来定义类（或者接口）的，指向常量池中下标为 20 的常量。</p><p>第 19 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#19 = NameAndType        #5:#6          // age:I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 NameAndType，表明是字段或者方法的部分符号引用，指向常量池中下标为 5 和 6 的常量。</p><p>第 5 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#5 = Utf8               age
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Utf8，UTF-8 编码的字符串，值为 <code>age</code>，表明字段名为 age。</p><p>第 6 个常量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#6 = Utf8               I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类型为 Utf8，UTF-8 编码的字符串，值为 <code>I</code>，表明字段的类型为 int。</p><p>关于字段类型的描述符映射表如下图所示。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-cbf16ce9-7853-4050-a1c0-8b874f3b0c1e.png" alt="" loading="lazy"></p><p>到此为止，第 2 个常量算是摸完了。组合起来的意思就是，声明了一个类型为 int 的字段 age。</p><hr><h3 id="_04、字段表集合" tabindex="-1"><a class="header-anchor" href="#_04、字段表集合" aria-hidden="true">#</a> 04、字段表集合</h3><p>字段表用来描述接口或者类中声明的变量，包括类变量和成员变量，但不包含声明在方法中局部变量。</p><p>字段的修饰符一般有：</p><ul><li>访问权限修饰符，比如 public private protected</li><li>静态变量修饰符，比如 static</li><li>final 修饰符</li><li>并发可见性修饰符，比如 volatile</li><li>序列化修饰符，比如 transient</li></ul><p>然后是字段的类型（可以是基本数据类型、数组和对象）和名称。</p><p>在 Main.class 字节码文件中，字段表的信息如下所示。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private int age;
    descriptor: I
    flags: (0x0002) ACC_PRIVATE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表明字段的访问权限修饰符为 private，类型为 int，名称为 age。</p><p>字段的访问标志和类的访问标志非常类似。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-5f328e11-3486-4eb4-8fa9-5c5febfab894.png" alt="" loading="lazy"></p><h3 id="_05、方法表集合" tabindex="-1"><a class="header-anchor" href="#_05、方法表集合" aria-hidden="true">#</a> <strong>05、方法表集合</strong></h3><p>方法表用来描述接口或者类中声明的方法，包括类方法和成员方法，以及构造方法。方法的修饰符和字段略有不同，比如说 volatile 和 transient 不能用来修饰方法，再比如说方法的修饰符多了 synchronized、native、strictfp 和 abstract。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/bytecode-fd434d5c-ffc6-4a24-9787-98e573035068.png" alt="" loading="lazy"></p><p>下面这部分为构造方法，返回类型为 void，访问标志为 public。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  public com.itwanger.jvm.Main();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来详细看一下其中 Code 属性。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
         4: aload_0
         5: bipush        18
         7: putfield      #2                  // Field age:I
        10: return
      LineNumberTable:
        line 6: 0
        line 7: 4
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      11     0  this   Lcom/itwanger/jvm/Main;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>stack 为最大操作数栈，Java 虚拟机在运行的时候会根据这个值来分配栈帧的操作数栈深度。</p></li><li><p>locals 为局部变量所需要的存储空间，单位为槽（slot），方法的参数变量和方法内的局部变量都会存储在局部变量表中。</p></li><li><p>args_size 为方法的参数个数。</p></li></ul><p>为什么 stack 的值为 2，locals 的值为 1，args_size 的值为 1 呢？ 默认的构造方法不是没有参数和局部变量吗？</p><p>这是因为有一个隐藏的 this 变量，只要不是静态方法，都会有一个当前类的对象 this 悄悄的存在着。这就解释了为什么 locals 和 args_size 的值为 1 的问题。那为什么 stack 的值为 2 呢？因为字节码指令 invokespecial（调用父类的构造方法进行初始化）会消耗掉一个当前类的引用，所以 aload_0 执行了 2 次，也就意味着操作数栈的大小为 2。</p><p>关于字节码指令，我们后面再详细介绍。</p><ul><li><p>LineNumberTable，该属性的作用是描述源码行号与字节码行号(字节码偏移量)之间的对应关系。</p></li><li><p>LocalVariableTable，该属性的作用是描述帧栈中的局部变量与源码中定义的变量之间的关系。大家仔细看一下，就能看到 this 的影子了。</p></li></ul><p>下面这部分为成员方法 <code>getAge()</code>，返回类型为 int，访问标志为 public。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  public int getAge();
    descriptor: ()I
    flags: (0x0001) ACC_PUBLIC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理解了构造方法的 Code 属性后，再看 <code>getAge()</code> 方法的 Code 属性时，就很容易理解了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: getfield      #2                  // Field age:I
         4: ireturn
      LineNumberTable:
        line 9: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/itwanger/jvm/Main;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最大操作数栈为 1，局部变量所需要的存储空间为 1，方法的参数个数为 1，是因为局部变量只有一个隐藏的 this，并且字节码指令中只执行了一次 aload_0。</p><hr><p>其实学习是这样的，可以横向扩展，也可以纵向扩展。当我们初学编程的时候，特别想多学一点，属于横向扩展，当有了一定的编程经验后，想更上一层楼，就需要纵向扩展，不断深入地学，连根拔起，从而形成自己的知识体系。</p><p>无论是从十六进制的字节码角度，还是 jclasslib 图形化查看反编译后的字节码的角度，也或者是今天这样从 javap 反编译后的角度，都能窥探出一些新的内容来！</p><p>初学者一开始接触字节码的时候会感觉比较头大，没关系，我当初也是这样，随着时间的推移，经验的积累，慢慢就好了，越往深处钻，就越能体会到那种“技术我有，雄霸天下”的感觉~</p><hr>`,118),u=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),b={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,[a("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),a("，回复"),e("strong",null,"111"),a(" 即可免费领取。")],-1),g=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function x(h,f){const i=c("ExternalLinkIcon");return d(),t("div",null,[v,e("p",null,[a("再往后面就是字符串常量池。《"),e("a",o,[a("class 文件"),n(i)]),a("》那一篇我是顺着十六进制内容往下分析的，可能初学者看起来比较头大，这次我们换一种更容易懂的方式。")]),p,e("p",null,[a("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),u,a(" 等等等等……详情戳："),e("a",b,[a("可以说是2022年全网最全的学习和找工作的PDF资源了"),n(i)])]),m,g])}const C=l(r,[["render",x],["__file","bytecode.html.vue"]]);export{C as default};
