import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as a,a as e,d as i,b as s,e as v,r}from"./app.99eb8281.js";const u={},t=v(`<h2 id="关于封装" tabindex="-1"><a class="header-anchor" href="#关于封装" aria-hidden="true">#</a> 关于封装</h2><p>封装从字面上来理解就是包装的意思，专业点就是信息隐藏，<strong>是指利用抽象将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体</strong>。</p><p>数据被保护在类的内部，尽可能地隐藏内部的实现细节，只保留一些对外接口使之与外部发生联系。</p><p>其他对象只能通过已经授权的操作来与这个封装的对象进行交互。也就是说用户是无需知道对象内部的细节（当然也无从知道），但可以通过该对象对外的提供的接口来访问该对象。</p><p>使用封装有 4 大好处：</p><ul><li>1、良好的封装能够减少耦合。</li><li>2、类内部的结构可以自由修改。</li><li>3、可以对成员进行更精确的控制。</li><li>4、隐藏信息，实现细节。</li></ul><p>首先我们先来看两个类：Husband.java、Wife.java</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Husband {
    
    /*
     * 对属性的封装
     * 一个人的姓名、性别、年龄、妻子都是这个人的私有属性
     */
    private String name ;
    private String sex ;
    private int age ;
    private Wife wife;
    
    /*
     * setter()、getter()是该对象对外开发的接口
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setWife(Wife wife) {
        this.wife = wife;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Wife {
    private String name;
    private int age;
    private String sex;
    private Husband husband;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setHusband(Husband husband) {
        this.husband = husband;
    }

    public Husband getHusband() {
        return husband;
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看得出， Husband 类里面的 wife 属性是没有 getter()的，同时 Wife 类的 age 属性也是没有 getter()方法的。至于理由我想各位都懂的，男人嘛深屋藏娇妻嘛，还有就是没有哪个女人愿意别人知道她的年龄的。</p><p>所以封装把一个对象的属性私有化，同时提供一些可以被外界访问的属性的方法，如果不想被外界方法，我们大可不必提供方法给外界访问。</p><p>但是如果一个类没有提供给外界任何可以访问的方法，那么这个类也没有什么意义了。</p><p>比如我们将一个房子看做是一个对象，里面有漂亮的装饰，如沙发、电视剧、空调、茶桌等等都是该房子的私有属性，但是如果我们没有那些墙遮挡，是不是别人就会一览无余呢？没有一点儿隐私！</p><p>因为存在那个遮挡的墙，我们既能够有自己的隐私而且我们可以随意的更改里面的摆设而不会影响到外面的人。</p><p>但是如果没有门窗，一个包裹的严严实实的黑盒子，又有什么存在的意义呢？所以通过门窗别人也能够看到里面的风景。所以说门窗就是房子对象留给外界访问的接口。</p><p>通过这个我们还不能真正体会封装的好处。现在我们从程序的角度来分析封装带来的好处。如果我们不使用封装，那么该对象就没有 setter()和 getter()，那么 Husband 类应该这样写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Husband {
    public String name ;
    public String sex ;
    public int age ;
    public Wife wife;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该这样来使用它：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Husband husband = new Husband();
husband.age \\= 30;
husband.name \\= &quot;张三&quot;;
husband.sex \\= &quot;男&quot;;    //貌似有点儿多余
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是那哪天如果我们需要修改 Husband，例如将 age 修改为 String 类型的呢？你只有一处使用了这个类还好，如果你有几十个甚至上百个这样地方，你是不是要改到崩溃。如果使用了封装，我们完全可以不需要做任何修改，只需要稍微改变下 Husband 类的 setAge()方法即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Husband {
    
    /*
     * 对属性的封装
     * 一个人的姓名、性别、年龄、妻子都是这个人的私有属性
     */
    private String name ;
    private String sex ;
    private String age ;    /* 改成 String类型的*/
    private Wife wife;
    
    public String getAge() {
        return age;
    }
    
    public void setAge(int age) {
        //转换即可
        this.age = String.valueOf(age);
    }
    
    /** 省略其他属性的setter、getter **/
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他的地方依然这样引用( husband.setAge(22) )保持不变。</p><p>到了这里我们确实可以看出，<strong>封装确实可以使我们更容易地修改类的内部实现，而无需修改使用了该类的代码</strong>。</p><p>我们再看这个好处：<strong>封装可以对成员变量进行更精确的控制</strong>。</p><p>还是那个 Husband，一般来说我们在引用这个对象的时候是不容易出错的，但是有时你迷糊了，写成了这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Husband husband = new Husband();
husband.age = 300;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也许你是因为粗心写成了这样，你发现了还好，如果没有发现那就麻烦大了，谁见过 300 岁的老妖怪啊！</p><p>但是使用封装我们就可以避免这个问题，我们对 age 的访问入口做一些控制(setter)如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Husband {
    
    /*
     * 对属性的封装
     * 一个人的姓名、性别、年龄、妻子都是这个人的私有属性
     */
    private String name ;
    private String sex ;
    private int age ;    /* 改成 String类型的*/
    private Wife wife;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if(age &gt; 120){
            System.out.println(&quot;ERROR：error age input....&quot;);    //提示錯誤信息
        }else{
            this.age = age;
        }
        
    }
    
    /** 省略其他属性的setter、getter **/
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面都是对 setter 方法的控制，其实通过封装我们也能够对对象的出口做出很好的控制。例如性别在数据库中一般都是以 1、0 的方式来存储的，但是在前台我们又不能展示 1、0，这里我们只需要在 getter()方法里面做一些转换即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public String getSexName() {
    if(&quot;0&quot;.equals(sex)){
        sexName = &quot;女&quot;;
    }
    else if(&quot;1&quot;.equals(sex)){
        sexName = &quot;男&quot;;
    }
    else{
        sexName = &quot;人妖???&quot;;
    }
    return sexName;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用的时候我们只需要使用 sexName 即可实现正确的性别显示。同理也可以用于针对不同的状态做出不同的操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public String getCzHTML(){
    if(&quot;1&quot;.equals(zt)){
        czHTML = &quot;&lt;a href=&#39;javascript:void(0)&#39; onclick=&#39;qy(&quot;+id+&quot;)&#39;&gt;启用&lt;/a&gt;&quot;;
    }
    else{
        czHTML = &quot;&lt;a href=&#39;javascript:void(0)&#39; onclick=&#39;jy(&quot;+id+&quot;)&#39;&gt;禁用&lt;/a&gt;&quot;;
    }
    return czHTML;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，关于封装我们就暂时聊这么多。</p>`,34),c={href:"https://www.cnblogs.com/chenssy/p/3351835.html",target:"_blank",rel:"noopener noreferrer"},b=e("hr",null,null,-1),m=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),o={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,[i("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),i("，回复"),e("strong",null,"111"),i(" 即可免费领取。")],-1),p=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function x(h,f){const n=r("ExternalLinkIcon");return d(),a("div",null,[t,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",c,[i("https://www.cnblogs.com/chenssy/p/3351835.html"),s(n)]),i("，整理：沉默王二")])]),b,e("p",null,[i("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),m,i(" 等等等等……详情戳："),e("a",o,[i("可以说是2022年全网最全的学习和找工作的PDF资源了"),s(n)])]),g,p])}const _=l(u,[["render",x],["__file","encapsulation.html.vue"]]);export{_ as default};
