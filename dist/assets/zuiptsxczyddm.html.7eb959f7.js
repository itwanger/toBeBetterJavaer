import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as l,a as e,d as i,b as n,e as c,r as t}from"./app.99eb8281.js";const r={},o=e("p",null,[e("img",{src:"https://mmbiz.qpic.cn/mmbiz_png/J0g14CUwaZclQSAM41A1ZnFukibKNKGiapfQQZJOKziaehj1pZzNHTicFkDKBMhTBzjZjys2GHM2nWd3LWt5SA7y0A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1",alt:"",loading:"lazy"})],-1),u={href:"http://xiaolincoding.com",target:"_blank",rel:"noopener noreferrer"},v=c(`<p>大家好，我是小林。</p><p>前几天，正巧赶上组里代码 review，一下午下来，五花八门的代码让我整个人都血压拉满了。</p><p>今天就来总结一波 Java 中代码的作死小技巧，熟练掌握这些小技巧后，保证能让你写出同事看不懂的代码~</p><p>至于为啥要写出同事看不懂的代码，通过这次教训，我发现好处还是挺多的，简单举几个例子：</p><ul><li>同事无法轻易修改你的代码，避免团队协作不当引入bug</li><li>塑造个人能力的不可替代性，规避被辞退的风险</li><li>代码 review 时，帮助同事治疗好多年的低血压</li></ul><p>好了，一本正经的胡说八道环节就此打住……</p><p>废话不多说了，下面正式开始。</p><p>没用的知识又要增加了…</p><p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGWUfL1YLpd2wjiaZc31YwzaG1WYJvYEfmZBjPuQvZAXrCMYIfqoKYOfQ/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" loading="lazy"></p><p>图片</p><h2 id="壹、瞒天过海" tabindex="-1"><a class="header-anchor" href="#壹、瞒天过海" aria-hidden="true">#</a> 壹、瞒天过海</h2><p>我打赌你肯定想不到，有人居然会在注释里下了毒。看看下面的代码，简单到<code>main</code>方法中只有一行注释。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void main(String[] args) {
    // \\u000d System.out.println(&quot;coder Hydra&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>猜猜看，这段程序运行结果如何？执行后它居然会在控制台打印：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>coder Hydra
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看到这你是不是一脸懵逼，为什么注释中的代码会被执行？</p><p>其实原理就在于大家熟悉的<code>unicode</code>编码，上面的<code>\\u000d</code>就是一个<code>unicode</code>转义字符，它所表示的是一个换行符。而java中的编译器，不仅会编译代码，还会解析<code>unicode</code>编码将它替换成对应的字符。所以说，上面的代码解析完后实际是这样的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void main(String[] args) {
    //
    System.out.println(&quot;coder Hydra&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，就能解释为什么能够执行注释中的语句了。当然，如果你觉得上面的代码不够绝，想要再绝一点，那么就可以把代码写成下面这个样子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void main(String[] args) {
    int a=1;
    // \\u000d \\u0061\\u002b\\u002b\\u003b
    System.out.println(a);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果会打印<code>2</code>，同理，因为后面的<code>unicode</code>编码的转义后表示的是<code>a++;</code>。</p><p>至于这么写有什么好处，当然是用在某些不想让别人看懂的地方，用来掩人耳目了，估计大家都看过下面这个笑话。</p><p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVG6EFCukAeWgiapu6yRMQAiaazbfmeXTtse8esSIXGQv5iaS2SBk6BHiaCqA/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" loading="lazy"></p><p>图片</p><p>你这么写的话客户如果懂点代码，看一下就穿帮了啊，但是你如果写成下面这样，大部分估计都以为这是一段乱码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//\\u000d\\u0054\\u0068\\u0072\\u0065\\u0061\\u0064\\u002e\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0032\\u0030\\u0030\\u0030\\u0029\\u003b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>恕我直言，没个几十年的功力真看不出来这里执行的是<code>sleep</code>，简直完美。</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGREh6m3ibMpmKmSxhJHRYabhjD8BwnNDcic0ZCA2OFxAHHb1yQvq6nk8Q/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" loading="lazy"></p><p>图片</p><h2 id="贰、舍近求远" tabindex="-1"><a class="header-anchor" href="#贰、舍近求远" aria-hidden="true">#</a> 贰、舍近求远</h2><p>要想写出别人看不懂的代码，很重要的一个小技巧就是<strong>把简单的东西复杂化</strong>。例如，判断一个<code>int</code>型数字的正负时明明可以写成这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void judge(int x){
    if (x&gt;0){
        //...
    }else if (x&lt;0){
        //...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是我偏不，放着简单的代码不用，我就是玩，非要写成下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void judge2(int x){
    if (x&gt;&gt;&gt;31==0){
        //...
    }else if (x&gt;&gt;&gt;31==1){
        //...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>怎么样，这么写的话是不是逼格一下子就支棱起来了！别人看到这多少得琢磨一会这块到底写了个啥玩意。</p><p>其实原理也很简单，这里用到的<code>&gt;&gt;&gt;</code>是无符号右移操作。举个简单的例子，以<code>-3</code>为例，移位前先转化为它的补码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>11111111111111111111111111111101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>无符号右移一位后变成下面的形式，这个数转化为十进制后是<code>2147483646</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>01111111111111111111111111111110
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以，当一个<code>int</code>类型的数字在无符号右移31位后，其实在前面的31位高位全部是0，剩下的最低位是原来的符号位，因此可以用来判断数字的正负。</p><p>基于这个小知识，我们还能整出不少活来。例如，放着好好的0不用，我们可以通过下面的方式定义一个0：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int ZERO=Integer.MAX_VALUE&gt;&gt;31&gt;&gt;1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过上面的知识，相信大家可以轻易理解，因为在将一个数字无符号右移32位后，二进制的所有位上全部是0，所以最终会得到0。那么问题来了，我为什么不直接用<code>Integer.MAX_VALUE&gt;&gt;32</code>，一次性右移32位呢？</p><p>这是因为在对<code>int</code>型的数字进行移位操作时，会对操作符右边的参数进行模32的取余运算，因此如果直接写32的话，那么相当于什么都不做，得到的还是原数值。</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGPyvQgxpQuU6dic2F5I4FztKo5lAtAyYu3UCPoPLibQ7KTYjMdvpPdBiaw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" loading="lazy"></p><p>图片</p><h2 id="叁、颠倒黑白" tabindex="-1"><a class="header-anchor" href="#叁、颠倒黑白" aria-hidden="true">#</a> 叁、颠倒黑白</h2><p>古有赵高指鹿为马，今有码农颠倒真假。阻碍同事阅读你代码的有力武器之一，就是让他在遇到条件判断时失去基本判断能力，陷入云里雾里，不知道接下来要走的是哪一个分支。</p><p>下面的代码，我说会打印<code>fasle</code>，是不是没有人会信？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class TrueTest {
    public static void main(String[] args) {
        Boolean reality = true;
        if(reality) {
            System.out.println(&quot;true&quot;);
        } else {
            System.out.println(&quot;false&quot;);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没错，只要大家了解布尔类型就知道这不符合逻辑，但是，经过下面的改造就可以让它变为现实。</p><p>首先，在类中找个<strong>隐蔽的位置</strong>插入下面这段代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static {
    try {
        Field trueField = Boolean.class.getDeclaredField(&quot;TRUE&quot;);
        trueField.setAccessible(true);

        Field modifiersField = Field.class.getDeclaredField(&quot;modifiers&quot;);
        modifiersField.setAccessible(true);
        modifiersField.setInt(trueField, trueField.getModifiers() &amp; ~Modifier.FINAL);

        trueField.set(null, false);
    } catch(IllegalAccessException | NoSuchFieldException e) {
        e.printStackTrace();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再运行上面的程序，你就会发现神奇地打印了<code>false</code>。</p><p>其实原理也很简单，首先通过反射拿到<code>Boolean</code>类中定义的<code>TRUE</code>这个变量：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static final Boolean TRUE = new Boolean(true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着使用反射，去掉它的<code>final</code>修饰符，最后再将它的值设为<code>false</code>。而在之后再使用<code>true</code>进行定义<code>Boolean</code>类型的变量过程中，会进行<strong>自动装箱</strong>，调用下面的方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static Boolean valueOf(boolean b) {
    return (b ? TRUE : FALSE);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时的<code>b</code>为<code>true</code>，而<code>TRUE</code>实际上是<code>false</code>，因此不满足第一个表达式，最终会返回<code>false</code>。</p><p>这样一来就能解释上面的打印结果了，不过切记，这么写的时候一定要找一个代码中隐蔽的角落，不要被人发现，否则容易被打的很惨…</p><p><img src="https://mmbiz.qpic.cn/mmbiz_gif/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGqELyoP0icIEzHuDSs2dOtJU3TOzLmr58Fp0DBwV2WnrPjlIs7Y1mHMg/640?wx_fmt=gif&amp;wxfrom=5&amp;wx_lazy=1" alt="" loading="lazy"></p><p>图片</p><h2 id="肆、化整为零" tabindex="-1"><a class="header-anchor" href="#肆、化整为零" aria-hidden="true">#</a> 肆、化整为零</h2><p>接下来要介绍的这个技巧就有点厉害了，可以将原有的一段串行逻辑改写成判断逻辑中的不同分支，并且保证最后能够正常执行。</p><p>在开始前先提一个问题，有没有一种方法，可以让<code>if</code>和<code>else</code>中的语句都能执行，就像下面的这个例子中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void judge(String param){
    if (/*判断条件*/){
        System.out.println(&quot;step one&quot;);
    }else {
        System.out.println(&quot;step two&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我说只调用一次这个方法，就能同时输出<code>if</code>和<code>else</code>中的打印语句，你肯定会说不可能，因为这违背了java中判断逻辑的基本常识。</p><p>没错，在限定了上面的修饰语<strong>只调用『一次』方法</strong>的条件下，谁都无法做到。但是如果在判断条件中动一点点手脚，就能够实现上面提到的功能。看一下改造后的代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class IfTest {
    public static void main(String[] args) {
        judge(&quot;Hydra&quot;);
    }

    public static void judge(String param){
        if (param==null ||
                new IfTest(){{ IfTest.check(null); }}.equals(&quot;Hydra&quot;)){
            System.out.println(&quot;step one&quot;);
        }else {
            System.out.println(&quot;step two&quot;);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行后控制台打印了：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>step one
step two
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>惊不惊喜、意不意外？其实它能够执行的秘密就在<code>if</code>的判断条件中。</p><p>当第一次调用<code>judge()</code>方法时，不满足或运算中的第一个条件，因此执行第二个条件，会执行匿名内部类内的实例化初始块代码，再次执行<code>judge()</code>方法，此时满足<code>if</code>条件，因此执行第一句打印语句。</p><p>而实例化的新对象不满足后面的<code>equals()</code>方法中的条件，所以不满足<code>if</code>中的任意一个条件，因此会执行<code>else</code>中的语句，执行第二句打印语句。</p><p>这样就实现了<strong>表面上</strong>调用一次方法，同时执行<code>if</code>和<code>else</code>中的语句块的功能。怎么样，用这种方式把一段整体的逻辑拆成两块，让你的同事迷惑去吧。</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGD6oJIEzsvbE2u8sqiaqa5sicW0P61CIa94xSuMmFI3gqqacHiaHibuI4jA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" loading="lazy"></p><p>图片</p><h2 id="伍、釜底抽薪" tabindex="-1"><a class="header-anchor" href="#伍、釜底抽薪" aria-hidden="true">#</a> 伍、釜底抽薪</h2><p>在程序员的世界里，不同语言之间一直存在鄙视链，例如写c的就看不起写java的，因为直接操作内存啥的看上去就很高大上不是么？那么我们今天就假装自己是一个c语言程序员，来在java中操作一把内存。</p><p>具体要怎么做呢，还是要使用java中的魔法类<code>Unsafe</code>。看这个名字也可以明白，这玩意如果使用不当的话不是非常安全，所以获取<code>Unsafe</code>实例也比较麻烦，需要通过反射获取：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Field unsafeField = Unsafe.class.getDeclaredField(&quot;theUnsafe&quot;);
unsafeField.setAccessible(true);
Unsafe unsafe =(Unsafe) unsafeField.get(null);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在拿到这个对象后，我们就可以对内存为所欲为了。例如，我们在实现<code>int a=1;</code>这样的简单赋值时，就可以搞复杂点，像下面这样绕一个弯子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void test(){
    long addr = unsafe.allocateMemory(4);
    unsafe.putInt(addr,1);
    int a=unsafe.getInt(addr);
    System.out.println(a);
    unsafe.freeMemory(addr);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先通过<code>allocateMemory</code>方法申请4字节的内存空间后，然后通过<code>putInt</code>方法写入一个1，再从这个地址读取一个<code>int</code>类型长度的变量，最终实现了把1赋值给<code>a</code>的操作。</p><p>当然了，还有很多高级一点的用法，这里简单举两个例子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void test(){
    long addr = unsafe.allocateMemory(4);
    unsafe.setMemory(addr,4, (byte) 1);
    System.out.println(unsafe.getInt(addr));
    unsafe.freeMemory(addr);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，通过<code>setMemory</code>方法向每个字节写入<code>byte</code>类型的1，最后调用<code>getInt</code>方法一次性读取4个字节作为一个<code>int</code>型变量的值。这段代码最终打印结果为<code>16843009</code>，对应的二进制如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>00000001 00000001 00000001 00000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>至于c语言中的内存复制，用<code>Unsafe</code>搞起来也是信手拈来：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void test2(){
    long addr = unsafe.allocateMemory(4);
    long addr2 = unsafe.reallocateMemory(addr, 4 * 2);

    unsafe.putInt(addr, 1);
    for (int i = 0; i &lt; 2; i++) {
        unsafe.copyMemory(addr,addr2+4*i,4);
    }

    System.out.println(unsafe.getInt(addr));
    System.out.println(unsafe.getLong(addr2));
    unsafe.freeMemory(addr);
    unsafe.freeMemory(addr2);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码中，通过<code>reallocateMemory</code>方法重新分配了一块8字节长度的内存空间，并把<code>addr</code>开头的4字节内存空间分两次进复制到<code>addr2</code>的内存空间中，上面的代码会打印：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
4294967297
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是因为新的8字节内存空间<code>addr2</code>中存储的二进制数字是下面这样，转化为十进制的<code>long</code>类型后正好对应<code>4294967297</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>100000000000000000000000000000001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Unsafe除了能直接操作内存空间外，还有线程调度、对象操作、CAS操作等实用的功能。</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/zpom4BeZSicZeTVUxgBubfoibv2iaNJ9WVGdBtLS3ibJlx7CtQTroM5Jjf90cvEmdVRnjfY6gEA5OWptrpGEwIFUBw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" loading="lazy"></p><p>图片</p><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2><p>好了，没用的知识介绍环节就此结束，相信大家在掌握了这些技巧后，都能自带代码混淆光环，写出不一样的拉轰代码。</p><p>最后建议大家，在项目中这样写代码的时候，搭配红花油、跌打损伤酒一起使用，可能效果更佳。</p><p><strong>推荐阅读：</strong></p>`,101),m={href:"http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247507000&idx=1&sn=c045101b45dd70ec37f9b81361b09f14&chksm=f98d9892cefa1184ac8e278e468a8a225cd5a6f4c3dfba83ed223c5da69421041961bfb945cc&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},p={href:"http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247493177&idx=1&sn=77e32cec53e8a1aee9fa9fd3b31b19c2&chksm=f98da293cefa2b8596b6f2ddfd6f3624eb82d820af94e061fed24c9f6074fae9030576f1218a&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},b={href:"http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247520003&idx=1&sn=3e70c6b54007ffa3130c5956df232bdb&chksm=f98dcba9cefa42bfbf35fd5f867314d8c96c54f5b285db542be42fc0594706d1429eaa069165&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},g={href:"http://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247520657&idx=2&sn=53805d2f47b87a96db21ae13a08dac18&chksm=f98dd53bcefa5c2dfab473ba0087f470da66b19c32aae853390e876850c108a7dcbf78971d44&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247520833&idx=1&sn=113ce13e9045de1102994e51096d4c56&chksm=f98dd6ebcefa5ffde750bd75561be7faef9d0288ce98ef0f8e4e1f373bab4100ac824321ab39#rd",target:"_blank",rel:"noopener noreferrer"};function f(h,_){const d=t("ExternalLinkIcon");return s(),l("div",null,[o,e("p",null,[i("八股文网站："),e("a",u,[i("xiaolincoding.com"),n(d)])]),v,e("p",null,[e("a",m,[i("小林的网站上线啦！"),n(d)])]),e("p",null,[e("a",p,[i("看书的一点小建议！"),n(d)])]),e("p",null,[e("a",b,[i("字节一面：服务端挂了，客户端的 TCP 连接还在吗？"),n(d)])]),e("p",null,[e("a",g,[i("美团二面：TCP 四次挥手，可以变成三次吗？"),n(d)])]),e("blockquote",null,[e("p",null,[i("参考链接："),e("a",x,[i("https://mp.weixin.qq.com/s?__biz=MzUxODAzNDg4NQ==&mid=2247520833&idx=1&sn=113ce13e9045de1102994e51096d4c56&chksm=f98dd6ebcefa5ffde750bd75561be7faef9d0288ce98ef0f8e4e1f373bab4100ac824321ab39#rd"),n(d)]),i("，出处：小林coding，整理：沉默王二")])])])}const q=a(r,[["render",f],["__file","zuiptsxczyddm.html.vue"]]);export{q as default};
