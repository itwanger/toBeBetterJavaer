import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o as c,c as d,a as n,b as e,e as i,d as s}from"./app.36bfa2ec.js";const o={},p=i('<h1 id="\u53F2\u4E0A\u6700\u901A\u4FD7\u6613\u61C2\u7684asm\u6559\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u53F2\u4E0A\u6700\u901A\u4FD7\u6613\u61C2\u7684asm\u6559\u7A0B" aria-hidden="true">#</a> \u53F2\u4E0A\u6700\u901A\u4FD7\u6613\u61C2\u7684ASM\u6559\u7A0B</h1><h2 id="\u4E00\u52FA\u601D\u60F3" tabindex="-1"><a class="header-anchor" href="#\u4E00\u52FA\u601D\u60F3" aria-hidden="true">#</a> \u4E00\u52FA\u601D\u60F3</h2><p>We are all in the gutter, but some of us are looking at the stars. \uFF08\u6211\u4EEC\u90FD\u751F\u6D3B\u5728\u9634\u6C9F\u91CC\uFF0C\u4F46\u4ECD\u6709\u4EBA\u4EF0\u671B\u661F\u7A7A \uFF09- \u738B\u5C14\u5FB7 \u300A\u6E29\u5FB7\u7C73\u5C14\u592B\u4EBA\u7684\u6247\u5B50\u300B</p><p>\u4E3E\u4E16\u6DF7\u6D4A\u6211\u72EC\u6E05\uFF0C\u4F17\u4EBA\u7686\u9189\u6211\u72EC\u9192 - \u5C48\u539F \u300A\u695A\u8F9E\u300B</p><h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>ASM\u662F\u4E00\u79CD\u901A\u7528Java\u5B57\u8282\u7801\u64CD\u4F5C\u548C\u5206\u6790\u6846\u67B6\u3002\u5B83\u53EF\u4EE5\u7528\u4E8E\u4FEE\u6539\u73B0\u6709\u7684class\u6587\u4EF6\u6216\u52A8\u6001\u751F\u6210class\u6587\u4EF6\u3002</p>',6),u=s("**ASM\xA0**is an all purpose Java bytecode manipulation and analysis framework. It can be used to modify existing classes or to dynamically generate classes, directly in binary form. ASM provides some common bytecode transformations and analysis algorithms from which custom complex transformations and code analysis tools can be built. ASM offers similar functionality as other Java bytecode frameworks, but is focused on"),r={href:"https://asm.ow2.io/performance.html",target:"_blank",rel:"noopener noreferrer"},v=s("performance"),m=s(". Because it was designed and implemented to be as small and as fast as possible, it is well suited for use in dynamic systems (but can of course be used in a static way too, e.g. in compilers)."),b=i(`<p>\u672C\u7BC7\u6587\u7AE0\u5206\u4EAB\u7684\u662F\u5BF9ASM\u7684\u7406\u89E3\u548C\u5E94\u7528\uFF0C\u4E4B\u524D\u9700\u8981\u6211\u4EEC\u638C\u63E1<strong>class\u5B57\u8282\u7801</strong>\uFF0C<strong>JVM\u57FA\u4E8E\u6808\u7684\u8BBE\u8BA1\u6A21\u5F0F,JVM\u6307\u4EE4</strong></p><h2 id="class\u5B57\u8282\u7801" tabindex="-1"><a class="header-anchor" href="#class\u5B57\u8282\u7801" aria-hidden="true">#</a> class\u5B57\u8282\u7801</h2><p>\u6211\u4EEC\u7F16\u5199\u7684java\u6587\u4EF6\uFF0C\u4F1A\u901A\u8FC7javac\u547D\u4EE4\u7F16\u8BD1\u4E3Aclass\u6587\u4EF6\uFF0CJVM\u6700\u7EC8\u4F1A\u6267\u884C\u8BE5\u7C7B\u578B\u6587\u4EF6\u6765\u8FD0\u884C\u7A0B\u5E8F\u3002\u4E0B\u56FE\u6240\u793A\u4E3Aclass\u6587\u4EF6\u7ED3\u6784\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-43844b78-c01f-4990-b038-3c91ff2eeb34.jpg" alt=""></p><p>\u4E0B\u9762\u6211\u4EEC\u901A\u8FC7\u4E00\u4E2A\u7B80\u5355\u7684\u5B9E\u4F8B\u6765\u8FDB\u884C\u8BF4\u660E\u3002\u4E0B\u9762\u662F\u6211\u4EEC\u7F16\u5199\u7684\u4E00\u4E2A\u7B80\u5355\u7684java\u6587\u4EF6\uFF0C\u53EA\u662F\u7B80\u5355\u7684\u51FD\u6570\u8C03\u7528.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> num1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> NUM1 <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token operator">+</span>num1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">-</span>b<span class="token operator">-</span>NUM1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528javac -g Test.java\u7F16\u8BD1\u4E3Aclass\u6587\u4EF6\uFF0C\u7136\u540E\u901A\u8FC7 <code>javap -verbose Test.class</code> \u547D\u4EE4\u67E5\u770Bclass\u6587\u4EF6\u683C\u5F0F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class com.wuba.asmdemo.Test
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

  public com.wuba.asmdemo.Test();     //\u6784\u9020\u51FD\u6570
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u51FA\u5728\u7F16\u8BD1\u4E3Aclass\u6587\u4EF6\u540E\uFF0C\u5B57\u6BB5\u540D\u79F0\uFF0C\u65B9\u6CD5\u540D\u79F0\uFF0C\u7C7B\u578B\u540D\u79F0\u7B49\u5747\u5728\u5E38\u91CF\u6C60\u4E2D\u5B58\u5728\u7684\u3002\u4ECE\u800C\u505A\u5230\u51CF\u5C0F\u6587\u4EF6\u7684\u76EE\u7684\u3002\u540C\u65F6\u65B9\u6CD5\u5B9A\u4E49\u4E5F\u8F6C\u53D8\u4E3A\u4E86jvm\u6307\u4EE4\u3002\u4E0B\u9762\u6211\u4EEC\u9700\u8981\u5BF9jvm\u6307\u4EE4\u52A0\u6DF1\u4E00\u4E0B\u4E86\u89E3\u3002\u5728\u4E86\u89E3\u4E4B\u524D\u9700\u8981\u6211\u4EEC\u7406\u89E3JVM\u57FA\u4E8E\u6808\u7684\u8BBE\u8BA1\u6A21\u5F0F</p><h2 id="jvm\u57FA\u4E8E\u6808\u7684\u8BBE\u8BA1\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#jvm\u57FA\u4E8E\u6808\u7684\u8BBE\u8BA1\u6A21\u5F0F" aria-hidden="true">#</a> JVM\u57FA\u4E8E\u6808\u7684\u8BBE\u8BA1\u6A21\u5F0F</h2><p>JVM\u7684\u6307\u4EE4\u96C6\u662F\u57FA\u4E8E\u6808\u800C\u4E0D\u662F\u5BC4\u5B58\u5668\uFF0C\u57FA\u4E8E\u6808\u53EF\u4EE5\u5177\u5907\u5F88\u597D\u7684\u8DE8\u5E73\u53F0\u6027\u3002\u5728\u7EBF\u7A0B\u4E2D\u6267\u884C\u4E00\u4E2A\u65B9\u6CD5\u65F6\uFF0C\u6211\u4EEC\u4F1A\u521B\u5EFA\u4E00\u4E2A\u6808\u5E27\u5165\u6808\u5E76\u6267\u884C\uFF0C\u5982\u679C\u8BE5\u65B9\u6CD5\u53C8\u8C03\u7528\u53E6\u4E00\u4E2A\u65B9\u6CD5\u65F6\u4F1A\u518D\u6B21\u521B\u5EFA\u65B0\u7684\u6808\u5E27\u7136\u540E\u5165\u6808\uFF0C\u65B9\u6CD5\u8FD4\u56DE\u4E4B\u9645\uFF0C\u539F\u6808\u5E27\u4F1A\u8FD4\u56DE\u65B9\u6CD5\u7684\u6267\u884C\u7ED3\u679C\u7ED9\u4E4B\u524D\u7684\u6808\u5E27\uFF0C\u968F\u540E\u865A\u62DF\u673A\u5C06\u4F1A\u4E22\u5F03\u6B64\u6808\u5E27\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-e31b7e50-1d48-4eef-9552-6fa7e6c68fed.jpg" alt=""></p><h3 id="\u5C40\u90E8\u53D8\u91CF\u8868" tabindex="-1"><a class="header-anchor" href="#\u5C40\u90E8\u53D8\u91CF\u8868" aria-hidden="true">#</a> \u5C40\u90E8\u53D8\u91CF\u8868</h3><p>**\u5C40\u90E8\u53D8\u91CF\u8868(Local Variable Table)**\u662F\u4E00\u7EC4\u53D8\u91CF\u503C\u5B58\u50A8\u7A7A\u95F4\uFF0C\u7528\u4E8E\u5B58\u653E\u65B9\u6CD5\u53C2\u6570\u548C\u65B9\u6CD5\u5185\u5B9A\u4E49\u7684\u5C40\u90E8\u53D8\u91CF\u3002\u865A\u62DF\u673A\u901A\u8FC7\u7D22\u5F15\u5B9A\u4F4D\u7684\u65B9\u6CD5\u67E5\u627E\u76F8\u5E94\u7684\u5C40\u90E8\u53D8\u91CF\u3002\u4E3E\u4E2A\u4F8B\u5B50\u3002\u4EE5\u4E0A\u8FF0\u7684\u4EE3\u7801\u4E3A\u4F8B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">-</span>b<span class="token operator">-</span>NUM1<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u65B9\u6CD5\u5927\u5BB6\u53EF\u4EE5\u731C\u6D4B\u4E00\u4E0B\u5C40\u90E8\u53D8\u91CF\u6709\u54EA\u4E9B? \u7B54\u6848\u662F3\u4E2A\uFF0C\u4E0D\u5E94\u8BE5\u53EA\u6709a,b\u5417\uFF1F\u8FD8\u6709this,\u5BF9\u5E94\u5B9E\u4F8B\u5BF9\u8C61\u65B9\u6CD5\u7F16\u8BD1\u5668\u90FD\u4F1A\u8FFD\u52A0\u4E00\u4E2Athis\u53C2\u6570\u3002\u5982\u679C\u8BE5\u65B9\u6CD5\u4E3A\u9759\u6001\u65B9\u6CD5\u5219\u4E3A2\u4E2A\u4E86\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public int sub(int, int);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\u5C40\u90E8\u53D8\u91CF\u8868\u7B2C0\u4E2A\u5143\u7D20\u4E3Athis, \u7B2C\u4E00\u4E2A\u4E3Aa,\u7B2C\u4E8C\u4E2A\u4E3Ab</p><h3 id="\u64CD\u4F5C\u6570\u6808" tabindex="-1"><a class="header-anchor" href="#\u64CD\u4F5C\u6570\u6808" aria-hidden="true">#</a> \u64CD\u4F5C\u6570\u6808</h3><p>\u901A\u8FC7\u5C40\u90E8\u53D8\u91CF\u8868\u6211\u4EEC\u6709\u4E86\u8981\u64CD\u4F5C\u548C\u5F85\u66F4\u65B0\u7684\u6570\u636E\uFF0C\u6211\u4EEC\u5982\u679C\u5BF9\u5C40\u90E8\u53D8\u91CF\u8FD9\u4E9B\u6570\u636E\u8FDB\u884C\u64CD\u4F5C\u5462\uFF1F\u901A\u8FC7\u64CD\u4F5C\u6570\u6808\u3002\u5F53\u4E00\u4E2A\u65B9\u6CD5\u521A\u521A\u5F00\u59CB\u6267\u884C\u65F6\uFF0C\u5176\u64CD\u4F5C\u6570\u6808\u662F\u7A7A\u7684\uFF0C\u968F\u7740\u65B9\u6CD5\u6267\u884C\u548C\u5B57\u8282\u7801\u6307\u4EE4\u7684\u6267\u884C\uFF0C\u4F1A\u4ECE\u5C40\u90E8\u53D8\u91CF\u8868\u6216\u5BF9\u8C61\u5B9E\u4F8B\u7684\u5B57\u6BB5\u4E2D\u590D\u5236\u5E38\u91CF\u6216\u53D8\u91CF\u5199\u5165\u5230\u64CD\u4F5C\u6570\u6808\uFF0C\u518D\u968F\u7740\u8BA1\u7B97\u7684\u8FDB\u884C\u5C06\u6808\u4E2D\u5143\u7D20\u51FA\u6808\u5230\u5C40\u90E8\u53D8\u91CF\u8868\u6216\u8005\u8FD4\u56DE\u7ED9\u65B9\u6CD5\u8C03\u7528\u8005\uFF0C\u4E5F\u5C31\u662F\u51FA\u6808/\u5165\u6808\u64CD\u4F5C\u3002\u4E00\u4E2A\u5B8C\u6574\u7684\u65B9\u6CD5\u6267\u884C\u671F\u95F4\u5F80\u5F80\u5305\u542B\u591A\u4E2A\u8FD9\u6837\u51FA\u6808/\u5165\u6808\u7684\u8FC7\u7A0B\u3002</p><h3 id="jvm\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#jvm\u6307\u4EE4" aria-hidden="true">#</a> JVM\u6307\u4EE4</h3><ul><li>load \u547D\u4EE4\uFF1A\u7528\u4E8E\u5C06\u5C40\u90E8\u53D8\u91CF\u8868\u7684\u6307\u5B9A\u4F4D\u7F6E\u7684\u76F8\u5E94\u7C7B\u578B\u53D8\u91CF\u52A0\u8F7D\u5230\u64CD\u4F5C\u6570\u6808\u9876\uFF1B</li><li>store\u547D\u4EE4\uFF1A\u7528\u4E8E\u5C06\u64CD\u4F5C\u6570\u6808\u9876\u7684\u76F8\u5E94\u7C7B\u578B\u6570\u636E\u4FDD\u5165\u5C40\u90E8\u53D8\u91CF\u8868\u7684\u6307\u5B9A\u4F4D\u7F6E\uFF1B</li><li>invokevirtual:\u8C03\u7528\u5B9E\u4F8B\u65B9\u6CD5</li><li>ireturn: \u5F53\u524D\u65B9\u6CD5\u8FD4\u56DEint</li></ul><p><strong>\u518D\u4E3E\u4E2A\u4F8B\u5B50</strong></p><p>a = b + c \u7684\u5B57\u8282\u7801\u6267\u884C\u8FC7\u7A0B\u4E2D\u64CD\u4F5C\u6570\u6808\u4EE5\u53CA\u5C40\u90E8\u53D8\u91CF\u8868\u7684\u53D8\u5316\u5982\u4E0B\u56FE\u6240\u793A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-4670450e-6199-4562-9cf4-354234c734c8.jpg" alt=""></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-9808d639-327f-4796-80d4-1809be0b9106.jpg" alt=""></p><h2 id="asm\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#asm\u64CD\u4F5C" aria-hidden="true">#</a> ASM\u64CD\u4F5C</h2><p>\u901A\u8FC7\u4E0A\u9762\u7684\u4ECB\u7ECD\uFF0C\u6211\u4EEC\u5BF9\u5B57\u8282\u7801\u548CJVM\u6307\u4EE4\u6709\u4E86\u8FDB\u4E00\u6B65\u7684\u4E86\u89E3\uFF0C\u4E0B\u9762\u6211\u4EEC\u770B\u4E00\u4E0BASM\u662F\u5982\u679C\u7F16\u8F91class\u5B57\u8282\u7801\u7684\u3002</p><h2 id="asm-api" tabindex="-1"><a class="header-anchor" href="#asm-api" aria-hidden="true">#</a> ASM API</h2><p>ASM API\u57FA\u4E8E\u8BBF\u95EE\u8005\u6A21\u5F0F\uFF0C\u4E3A\u6211\u4EEC\u63D0\u4F9B\u4E86ClassVisitor\uFF0CMethodVisitor\uFF0CFieldVisitor API\u63A5\u53E3\uFF0C\u6BCF\u5F53ASM\u626B\u63CF\u5230\u7C7B\u5B57\u6BB5\u662F\u4F1A\u56DE\u8C03visitField\u65B9\u6CD5\uFF0C\u626B\u63CF\u5230\u7C7B\u65B9\u6CD5\u662F\u4F1A\u56DE\u8C03MethodVisitor\uFF0C\u4E0B\u9762\u6211\u4EEC\u770B\u4E00\u4E0BAPI\u63A5\u53E3</p><p><strong>ClassVisitor\u65B9\u6CD5\u89E3\u6790</strong></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ClassVisitor</span> <span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">int</span> version<span class="token punctuation">,</span> <span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">String</span> superName<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> interfaces<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u8BBF\u95EE\u7C7B\u5B57\u6BB5\u65F6\u56DE\u8C03</span>
    <span class="token keyword">public</span> <span class="token class-name">FieldVisitor</span> <span class="token function">visitField</span><span class="token punctuation">(</span><span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u8BBF\u95EE\u7C7B\u65B9\u6CD5\u662F\u56DE\u8C03</span>
    <span class="token keyword">public</span> <span class="token class-name">MethodVisitor</span> <span class="token function">visitMethod</span><span class="token punctuation">(</span><span class="token keyword">int</span> access<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">,</span> <span class="token class-name">String</span> signature<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> exceptions<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="methodvisitor\u65B9\u6CD5\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#methodvisitor\u65B9\u6CD5\u89E3\u6790" aria-hidden="true">#</a> MethodVisitor\u65B9\u6CD5\u89E3\u6790</h2><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MethodVisitor</span> <span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitParameter</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> access<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u8BBF\u95EE\u672C\u5730\u53D8\u91CF\u7C7B\u578B\u6307\u4EE4 \u64CD\u4F5C\u7801\u53EF\u4EE5\u662FLOAD,STORE\uFF0CRET\u4E2D\u4E00\u79CD\uFF1B</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitIntInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token keyword">int</span> operand<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u57DF\u64CD\u4F5C\u6307\u4EE4\uFF0C\u7528\u6765\u52A0\u8F7D\u6216\u8005\u5B58\u50A8\u5BF9\u8C61\u7684Field</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitFieldInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token class-name">String</span> owner<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//\u8BBF\u95EE\u65B9\u6CD5\u64CD\u4F5C\u6307\u4EE4</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitMethodInsn</span><span class="token punctuation">(</span><span class="token keyword">int</span> opcode<span class="token punctuation">,</span> <span class="token class-name">String</span> owner<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visitEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="asm-\u4F7F\u7528demo" tabindex="-1"><a class="header-anchor" href="#asm-\u4F7F\u7528demo" aria-hidden="true">#</a> ASM \u4F7F\u7528Demo</h3><p>java\u6E90\u7801</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a<span class="token operator">+</span>b<span class="token operator">+</span>num1<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>class\u5B57\u8282\u7801</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> public int add(int, int);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ASM\u5BF9\u5E94\u7684API</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>mv = cw.visitMethod(ACC_PUBLIC, &quot;add&quot;, &quot;(II)I&quot;, null, null);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u51FAASM\u662F\u5728\u6307\u4EE4\u5C42\u6B21\u4E0A\u64CD\u4F5C\u5B57\u8282\u7801\u7684\uFF0C\u548Cclass\u5B57\u8282\u7801\u66F4\u52A0\u63A5\u8FD1\u3002\u5982\u679C\u6211\u4EEC\u6709\u4E9B\u5B57\u8282\u7801\u64CD\u4F5C\u7684\u9700\u6C42\uFF0CASM\u4E00\u5B9A\u53EF\u4EE5\u5B9E\u73B0\u7684\u3002\u53EA\u662F\u4F7F\u7528\u8D77\u6765\u6BD4\u8F83\u9EBB\u70E6\u4E00\u4E9B\u3002\u8FD9\u91CC\u5F3A\u70C8\u63A8\u8350\u4E00\u6B3EASM\u63D2\u4EF6</p><blockquote><p>https://plugins.jetbrains.com/plugin/5918-asm-bytecode-outline</p></blockquote><p>\u53EF\u4EE5\u4E00\u952E\u751F\u6210\u5BF9\u5E94\u7684ASM API\u4EE3\u7801</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/jvm/asm-3c8c8db4-5b6a-4576-b147-62965d0e0c1c.jpg" alt=""></p><hr><blockquote><p>\u53C2\u8003\u94FE\u63A5\uFF1Ahttps://zhuanlan.zhihu.com/p/94498015</p></blockquote><hr>`,48),k=s("\u6700\u8FD1\u6574\u7406\u4E86\u4E00\u4EFD\u725B\u903C\u7684\u5B66\u4E60\u8D44\u6599\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8EJava\u57FA\u7840\u90E8\u5206\uFF08JVM\u3001Java\u96C6\u5408\u6846\u67B6\u3001\u591A\u7EBF\u7A0B\uFF09\uFF0C\u8FD8\u56CA\u62EC\u4E86 "),h=n("strong",null,"\u6570\u636E\u5E93\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC\u3001\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784\u3001\u8BBE\u8BA1\u6A21\u5F0F\u3001\u6846\u67B6\u7C7BSpring\u3001Netty\u3001\u5FAE\u670D\u52A1\uFF08Dubbo\uFF0C\u6D88\u606F\u961F\u5217\uFF09 \u7F51\u5173",-1),g=s(" \u7B49\u7B49\u7B49\u7B49\u2026\u2026\u8BE6\u60C5\u6233\uFF1A"),f={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},I=s("\u53EF\u4EE5\u8BF4\u662F2022\u5E74\u5168\u7F51\u6700\u5168\u7684\u5B66\u4E60\u548C\u627E\u5DE5\u4F5C\u7684PDF\u8D44\u6E90\u4E86"),w=n("p",null,[s("\u5173\u6CE8\u4E8C\u54E5\u7684\u539F\u521B\u516C\u4F17\u53F7 "),n("strong",null,"\u6C89\u9ED8\u738B\u4E8C"),s("\uFF0C\u56DE\u590D"),n("strong",null,"111"),s(" \u5373\u53EF\u514D\u8D39\u9886\u53D6\u3002")],-1),y=n("p",null,[n("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:""})],-1);function _(j,S){const a=t("ExternalLinkIcon");return c(),d("div",null,[p,n("blockquote",null,[n("p",null,[u,n("a",r,[v,e(a)]),m])]),b,n("p",null,[k,h,g,n("a",f,[I,e(a)])]),w,y])}var T=l(o,[["render",_],["__file","asm.html.vue"]]);export{T as default};
