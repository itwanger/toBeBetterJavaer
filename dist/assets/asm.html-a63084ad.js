import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as d,a as n,d as s,b as e,e as i}from"./app-72970f25.js";const o={},p=i('<h1 id="史上最通俗易懂的asm教程" tabindex="-1"><a class="header-anchor" href="#史上最通俗易懂的asm教程" aria-hidden="true">#</a> 史上最通俗易懂的ASM教程</h1><h2 id="一勺思想" tabindex="-1"><a class="header-anchor" href="#一勺思想" aria-hidden="true">#</a> 一勺思想</h2><p>We are all in the gutter, but some of us are looking at the stars. （我们都生活在阴沟里，但仍有人仰望星空 ）- 王尔德 《温德米尔夫人的扇子》</p><p>举世混浊我独清，众人皆醉我独醒 - 屈原 《楚辞》</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>ASM是一种通用Java字节码操作和分析框架。它可以用于修改现有的class文件或动态生成class文件。</p>',6),r={href:"https://asm.ow2.io/performance.html",target:"_blank",rel:"noopener noreferrer"},u=i(`<p>本篇文章分享的是对ASM的理解和应用，之前需要我们掌握<strong>class字节码</strong>，<strong>JVM基于栈的设计模式,JVM指令</strong></p><h2 id="class字节码" tabindex="-1"><a class="header-anchor" href="#class字节码" aria-hidden="true">#</a> class字节码</h2><p>我们编写的java文件，会通过javac命令编译为class文件，JVM最终会执行该类型文件来运行程序。下图所示为class文件结构。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-43844b78-c01f-4990-b038-3c91ff2eeb34.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>下面我们通过一个简单的实例来进行说明。下面是我们编写的一个简单的java文件，只是简单的函数调用.</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> num1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token constant">NUM1</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token operator">+</span>num1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">-</span>b<span class="token operator">-</span><span class="token constant">NUM1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用javac -g Test.java编译为class文件，然后通过 <code>javap -verbose Test.class</code> 命令查看class文件格式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class com.wuba.asmdemo.Test
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #6.#26         // java/lang/Object.&quot;&lt;init&gt;&quot;:()V
   #2 = Fieldref           #5.#27         // com/wuba/asmdemo/Test.num1:I
   #3 = Methodref          #5.#28         // com/wuba/asmdemo/Test.add:(II)I
   #4 = Fieldref           #5.#29         // com/wuba/asmdemo/Test.NUM1:I
   #5 = Class              #30            // com/wuba/asmdemo/Test
   #6 = Class              #31            // java/lang/Object
   #7 = Utf8               num1
   #8 = Utf8               I
   #9 = Utf8               NUM1
  #10 = Utf8               &lt;init&gt;
  #11 = Utf8               ()V
  #12 = Utf8               Code
  #13 = Utf8               LineNumberTable
  #14 = Utf8               LocalVariableTable
  #15 = Utf8               this
  #16 = Utf8               Lcom/wuba/asmdemo/Test;
  #17 = Utf8               func
  #18 = Utf8               (II)I
  #19 = Utf8               a
  #20 = Utf8               b
  #21 = Utf8               add
  #22 = Utf8               sub
  #23 = Utf8               &lt;clinit&gt;
  #24 = Utf8               SourceFile
  #25 = Utf8               Test.java
  #26 = NameAndType        #10:#11        // &quot;&lt;init&gt;&quot;:()V
  #27 = NameAndType        #7:#8          // num1:I
  #28 = NameAndType        #21:#18        // add:(II)I
  #29 = NameAndType        #9:#8          // NUM1:I
  #30 = Utf8               com/wuba/asmdemo/Test
  #31 = Utf8               java/lang/Object
{
  public static int NUM1;
    descriptor: I
    flags: ACC_PUBLIC, ACC_STATIC

  public com.wuba.asmdemo.Test();     //构造函数
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V
         4: aload_0
         5: iconst_1
         6: putfield      #2                  // Field num1:I
         9: return
      LineNumberTable:
        line 3: 0
        line 5: 4
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      10     0  this   Lcom/wuba/asmdemo/Test;

  public int func(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=3, locals=3, args_size=3
         0: aload_0
         1: iload_1
         2: iload_2
         3: invokevirtual #3                  // Method add:(II)I
         6: ireturn
      LineNumberTable:
        line 10: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       7     0  this   Lcom/wuba/asmdemo/Test;
            0       7     1     a   I
            0       7     2     b   I

  public int add(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: iadd
         3: aload_0
         4: getfield      #2                  // Field num1:I
         7: iadd
         8: ireturn
      LineNumberTable:
        line 14: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   Lcom/wuba/asmdemo/Test;
            0       9     1     a   I
            0       9     2     b   I

  public int sub(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: isub
         3: getstatic     #4                  // Field NUM1:I
         6: isub
         7: ireturn
      LineNumberTable:
        line 18: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       8     0  this   Lcom/wuba/asmdemo/Test;
            0       8     1     a   I
            0       8     2     b   I

  static {};
    descriptor: ()V
    flags: ACC_STATIC
    Code:
      stack=1, locals=0, args_size=0
         0: bipush        100
         2: putstatic     #4                  // Field NUM1:I
         5: return
      LineNumberTable:
        line 7: 0
}
SourceFile: &quot;Test.java&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出在编译为class文件后，字段名称，方法名称，类型名称等均在常量池中存在的。从而做到减小文件的目的。同时方法定义也转变为了jvm指令。下面我们需要对jvm指令加深一下了解。在了解之前需要我们理解JVM基于栈的设计模式</p><h2 id="jvm基于栈的设计模式" tabindex="-1"><a class="header-anchor" href="#jvm基于栈的设计模式" aria-hidden="true">#</a> JVM基于栈的设计模式</h2><p>JVM的指令集是基于栈而不是寄存器，基于栈可以具备很好的跨平台性。在线程中执行一个方法时，我们会创建一个栈帧入栈并执行，如果该方法又调用另一个方法时会再次创建新的栈帧然后入栈，方法返回之际，原栈帧会返回方法的执行结果给之前的栈帧，随后虚拟机将会丢弃此栈帧。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-e31b7e50-1d48-4eef-9552-6fa7e6c68fed.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="局部变量表" tabindex="-1"><a class="header-anchor" href="#局部变量表" aria-hidden="true">#</a> 局部变量表</h3><p>**局部变量表(Local Variable Table)**是一组变量值存储空间，用于存放方法参数和方法内定义的局部变量。虚拟机通过索引定位的方法查找相应的局部变量。举个例子。以上述的代码为例</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">-</span>b<span class="token operator">-</span><span class="token constant">NUM1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法大家可以猜测一下局部变量有哪些? 答案是3个，不应该只有a,b吗？还有this,对应实例对象方法编译器都会追加一个this参数。如果该方法为静态方法则为2个了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int sub(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: isub
         3: getstatic     #4                  // Field NUM1:I
         6: isub
         7: ireturn
      LineNumberTable:
        line 18: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       8     0  this   Lcom/wuba/asmdemo/Test;
            0       8     1     a   I
            0       8     2     b   I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以局部变量表第0个元素为this, 第一个为a,第二个为b</p><h3 id="操作数栈" tabindex="-1"><a class="header-anchor" href="#操作数栈" aria-hidden="true">#</a> 操作数栈</h3><p>通过局部变量表我们有了要操作和待更新的数据，我们如果对局部变量这些数据进行操作呢？通过操作数栈。当一个方法刚刚开始执行时，其操作数栈是空的，随着方法执行和字节码指令的执行，会从局部变量表或对象实例的字段中复制常量或变量写入到操作数栈，再随着计算的进行将栈中元素出栈到局部变量表或者返回给方法调用者，也就是出栈/入栈操作。一个完整的方法执行期间往往包含多个这样出栈/入栈的过程。</p><h3 id="jvm指令" tabindex="-1"><a class="header-anchor" href="#jvm指令" aria-hidden="true">#</a> JVM指令</h3><ul><li>load 命令：用于将局部变量表的指定位置的相应类型变量加载到操作数栈顶；</li><li>store命令：用于将操作数栈顶的相应类型数据保入局部变量表的指定位置；</li><li>invokevirtual:调用实例方法</li><li>ireturn: 当前方法返回int</li></ul><p><strong>再举个例子</strong></p><p>a = b + c 的字节码执行过程中操作数栈以及局部变量表的变化如下图所示</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-4670450e-6199-4562-9cf4-354234c734c8.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-9808d639-327f-4796-80d4-1809be0b9106.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="asm操作" tabindex="-1"><a class="header-anchor" href="#asm操作" aria-hidden="true">#</a> ASM操作</h2><p>通过上面的介绍，我们对字节码和JVM指令有了进一步的了解，下面我们看一下ASM是如果编辑class字节码的。</p><h2 id="asm-api" tabindex="-1"><a class="header-anchor" href="#asm-api" aria-hidden="true">#</a> ASM API</h2><p>ASM API基于访问者模式，为我们提供了ClassVisitor，MethodVisitor，FieldVisitor API接口，每当ASM扫描到类字段是会回调visitField方法，扫描到类方法是会回调MethodVisitor，下面我们看一下API接口</p><p><strong>ClassVisitor方法解析</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ClassVisitor</span> <span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">int</span> version<span class="token punctuation">,</span> <span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">String</span> superName<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> interfaces<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//访问类字段时回调</span>
    <span class="token keyword">public</span> <span class="token class-name">FieldVisitor</span> <span class="token function">visitField</span><span class="token punctuation">(</span><span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//访问类方法是回调</span>
    <span class="token keyword">public</span> <span class="token class-name">MethodVisitor</span> <span class="token function">visitMethod</span><span class="token punctuation">(</span><span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> exceptions<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="methodvisitor方法解析" tabindex="-1"><a class="header-anchor" href="#methodvisitor方法解析" aria-hidden="true">#</a> MethodVisitor方法解析</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MethodVisitor</span> <span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitParameter</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> access<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//访问本地变量类型指令 操作码可以是LOAD,STORE，RET中一种；</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitIntInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token keyword">int</span> operand<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//域操作指令，用来加载或者存储对象的Field</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitFieldInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token class-name">String</span> owner<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//访问方法操作指令</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitMethodInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token class-name">String</span> owner<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="asm-使用demo" tabindex="-1"><a class="header-anchor" href="#asm-使用demo" aria-hidden="true">#</a> ASM 使用Demo</h3><p>java源码</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token operator">+</span>num1<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>class字节码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public int add(int, int);
    descriptor: (II)I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=3
         0: iload_1
         1: iload_2
         2: iadd
         3: aload_0
         4: getfield      #2                  // Field num1:I
         7: iadd
         8: ireturn
      LineNumberTable:
        line 14: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   Lcom/wuba/asmdemo/Test;
            0       9     1     a   I
            0       9     2     b   I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ASM对应的API</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mv = cw.visitMethod(ACC_PUBLIC, &quot;add&quot;, &quot;(II)I&quot;, null, null);
mv.visitCode();
mv.visitVarInsn(ILOAD, 1);
mv.visitVarInsn(ILOAD, 2);
mv.visitInsn(IADD);
mv.visitVarInsn(ALOAD, 0);
mv.visitFieldInsn(GETFIELD, &quot;com/wuba/asmdemo/Test&quot;, &quot;num1&quot;, &quot;I&quot;);
mv.visitInsn(IADD);
mv.visitInsn(IRETURN);
Label l1 = new Label();
mv.visitLabel(l1);
mv.visitLocalVariable(&quot;this&quot;, &quot;Lcom/wuba/asmdemo/Test;&quot;, null, l0, l1, 0);
mv.visitLocalVariable(&quot;a&quot;, &quot;I&quot;, null, l0, l1, 1);
mv.visitLocalVariable(&quot;b&quot;, &quot;I&quot;, null, l0, l1, 2);
mv.visitMaxs(2, 3);
mv.visitEnd();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出ASM是在指令层次上操作字节码的，和class字节码更加接近。如果我们有些字节码操作的需求，ASM一定可以实现的。只是使用起来比较麻烦一些。这里强烈推荐一款ASM插件</p>`,42),v={href:"https://plugins.jetbrains.com/plugin/5918-asm-bytecode-outline",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,"可以一键生成对应的ASM API代码",-1),b=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-3c8c8db4-5b6a-4576-b147-62965d0e0c1c.jpg",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),k=n("hr",null,null,-1),g={href:"https://zhuanlan.zhihu.com/p/94498015",target:"_blank",rel:"noopener noreferrer"},h=n("hr",null,null,-1),f={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},I={href:"https://javabetter.cn/overview/",target:"_blank",rel:"noopener noreferrer"},w=n("p",null,[s("微信搜 "),n("strong",null,"沉默王二"),s(" 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 "),n("strong",null,"222"),s(" 即可免费领取。")],-1),y=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1);function _(j,S){const a=t("ExternalLinkIcon");return c(),d("div",null,[p,n("blockquote",null,[n("p",null,[s("**ASM **is an all purpose Java bytecode manipulation and analysis framework. It can be used to modify existing classes or to dynamically generate classes, directly in binary form. ASM provides some common bytecode transformations and analysis algorithms from which custom complex transformations and code analysis tools can be built. ASM offers similar functionality as other Java bytecode frameworks, but is focused on"),n("a",r,[s("performance"),e(a)]),s(". Because it was designed and implemented to be as small and as fast as possible, it is well suited for use in dynamic systems (but can of course be used in a static way too, e.g. in compilers).")])]),u,n("blockquote",null,[n("p",null,[n("a",v,[s("https://plugins.jetbrains.com/plugin/5918-asm-bytecode-outline"),e(a)])])]),m,b,k,n("blockquote",null,[n("p",null,[s("参考链接："),n("a",g,[s("https://zhuanlan.zhihu.com/p/94498015"),e(a)])])]),h,n("p",null,[s("GitHub 上标星 10000+ 的开源知识库《"),n("a",f,[s("二哥的 Java 进阶之路"),e(a)]),s("》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),n("a",I,[s("太赞了，GitHub 上标星 10000+ 的 Java 教程"),e(a)])]),w,y])}const T=l(o,[["render",_],["__file","asm.html.vue"]]);export{T as default};
