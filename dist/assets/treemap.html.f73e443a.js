import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as l,a as e,d as n,b as t,e as s,r as d}from"./app.99eb8281.js";const o={},c=e("p",null,"TreeMap，虽然也是个 Map，但存在感太低了。我做程序员这十多年里，HashMap 用了超过十年，TreeMap 只用了多字里那么一小会儿一小会儿，真的是，太惨了。",-1),p=e("p",null,"虽然 TreeMap 用得少，但还是有用处的。",-1),u={href:"https://tobebetterjavaer.com/collection/linkedhashmap.html",target:"_blank",rel:"noopener noreferrer"},v=s(`<p>TreeMap 由红黑树实现，可以保持元素的自然顺序，或者实现了 Comparator 接口的自定义顺序。</p><p>可能有些同学不知道红黑树，理解起来 TreeMap 就有点难度，那我先来普及一下：</p><blockquote><p>红黑树（英语：Red–black tree）是一种自平衡的二叉查找树（Binary Search Tree），结构复杂，但却有着良好的性能，完成查找、插入和删除的时间复杂度均为 log(n)。</p></blockquote><p>二叉查找树又是什么呢？</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/treemap-c5f29a61-91e0-47e8-9e16-055e1bea5b33.jpg" alt="" loading="lazy"></p><p>上图中这棵树，就是一颗典型的二叉查找树：</p><p>1）左子树上所有节点的值均小于或等于它的根结点的值。</p><p>2）右子树上所有节点的值均大于或等于它的根结点的值。</p><p>3）左、右子树也分别为二叉排序树。</p><p>理解二叉查找树了吧？不过，二叉查找树有一个不足，就是容易变成瘸子，就是一侧多，一侧少，就像下图这样：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/treemap-6c3309a0-3737-4677-99c1-e8a156140d62.jpg" alt="" loading="lazy"></p><p>查找的效率就要从 log(n) 变成 o(n) 了，对吧？必须要平衡一下，对吧？于是就有了平衡二叉树，左右两个子树的高度差的绝对值不超过 1，就像下图这样：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/treemap-b8f74a3d-baf9-4192-a0e0-cdd07955d784.jpg" alt="" loading="lazy"></p><p>红黑树，顾名思义，就是节点是红色或者黑色的平衡二叉树，它通过颜色的约束来维持着二叉树的平衡：</p><p>1）每个节点都只能是红色或者黑色</p><p>2）根节点是黑色</p><p>3）每个叶节点（NIL 节点，空节点）是黑色的。</p><p>4）如果一个节点是红色的，则它两个子节点都是黑色的。也就是说在一条路径上不能出现相邻的两个红色节点。</p><p>5）从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/treemap-3373c98c-d82f-4a7f-949e-a7fe0d99314c.jpg" alt="" loading="lazy"></p><p>那，关于红黑树，同学们就先了解到这，脑子里有个大概的印象，知道 TreeMap 是个什么玩意。</p><h2 id="_01、自然顺序" tabindex="-1"><a class="header-anchor" href="#_01、自然顺序" aria-hidden="true">#</a> 01、自然顺序</h2><p>默认情况下，TreeMap 是根据 key 的自然顺序排列的。比如说整数，就是升序，1、2、3、4、5。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TreeMap&lt;Integer,String&gt; mapInt = new TreeMap&lt;&gt;();
mapInt.put(3, &quot;沉默王二&quot;);
mapInt.put(2, &quot;沉默王二&quot;);
mapInt.put(1, &quot;沉默王二&quot;);
mapInt.put(5, &quot;沉默王二&quot;);
mapInt.put(4, &quot;沉默王二&quot;);

System.out.println(mapInt);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{1=沉默王二, 2=沉默王二, 3=沉默王二, 4=沉默王二, 5=沉默王二}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>TreeMap 是怎么做到的呢？想一探究竟，就得上源码了，来看 TreeMap 的 <code>put()</code> 方法（省去了一部分，版本为 JDK 14）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public V put(K key, V value) {
    TreeMap.Entry&lt;K,V&gt; t = root;
    int cmp;
    TreeMap.Entry&lt;K,V&gt; parent;
    // split comparator and comparable paths
    Comparator&lt;? super K&gt; cpr = comparator;
    if (cpr != null) {
    }
    else {
        @SuppressWarnings(&quot;unchecked&quot;)
        Comparable&lt;? super K&gt; k = (Comparable&lt;? super K&gt;) key;
        do {
            parent = t;
            cmp = k.compareTo(t.key);
            if (cmp &lt; 0)
                t = t.left;
            else if (cmp &gt; 0)
                t = t.right;
            else
                return t.setValue(value);
        } while (t != null);
    }
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 <code>cmp = k.compareTo(t.key)</code> 这行代码，就是用来进行 key 的比较的，由于此时 key 是 int，所以就会调用 Integer 类的 <code>compareTo()</code> 方法进行比较。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int compareTo(Integer anotherInteger) {
    return compare(this.value, anotherInteger.value);
}

public static int compare(int x, int y) {
    return (x &lt; y) ? -1 : ((x == y) ? 0 : 1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那相应的，如果 key 是字符串的话，也就会调用 String 类的 <code>compareTo()</code> 方法进行比较。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int compareTo(String anotherString) {
    byte v1[] = value;
    byte v2[] = anotherString.value;
    byte coder = coder();
    if (coder == anotherString.coder()) {
        return coder == LATIN1 ? StringLatin1.compareTo(v1, v2)
                : StringUTF16.compareTo(v1, v2);
    }
    return coder == LATIN1 ? StringLatin1.compareToUTF16(v1, v2)
            : StringUTF16.compareToLatin1(v1, v2);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于内部是由字符串的字节数组的字符进行比较的，是不是听起来很绕？对，就是很绕，所以使用中文字符串作为 key 的话，看不出来效果。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TreeMap&lt;String,String&gt; mapString = new TreeMap&lt;&gt;();
mapString.put(&quot;c&quot;, &quot;沉默王二&quot;);
mapString.put(&quot;b&quot;, &quot;沉默王二&quot;);
mapString.put(&quot;a&quot;, &quot;沉默王二&quot;);
mapString.put(&quot;e&quot;, &quot;沉默王二&quot;);
mapString.put(&quot;d&quot;, &quot;沉默王二&quot;);

System.out.println(mapString);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{a=沉默王二, b=沉默王二, c=沉默王二, d=沉默王二, e=沉默王二}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字母的升序，对吧？</p><h2 id="_02、自定义排序" tabindex="-1"><a class="header-anchor" href="#_02、自定义排序" aria-hidden="true">#</a> 02、自定义排序</h2><p>如果自然顺序不满足，那就可以在声明 TreeMap 对象的时候指定排序规则。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TreeMap&lt;Integer,String&gt; mapIntReverse = new TreeMap&lt;&gt;(Comparator.reverseOrder());
mapIntReverse.put(3, &quot;沉默王二&quot;);
mapIntReverse.put(2, &quot;沉默王二&quot;);
mapIntReverse.put(1, &quot;沉默王二&quot;);
mapIntReverse.put(5, &quot;沉默王二&quot;);
mapIntReverse.put(4, &quot;沉默王二&quot;);

System.out.println(mapIntReverse);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TreeMap 提供了可以指定排序规则的构造方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public TreeMap(Comparator&lt;? super K&gt; comparator) {
    this.comparator = comparator;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Comparator.reverseOrder()</code> 返回的是 ReverseComparator 对象，就是用来反转顺序的，非常方便。</p><p>所以，输出结果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{5=沉默王二, 4=沉默王二, 3=沉默王二, 2=沉默王二, 1=沉默王二}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>HashMap 是无序的，插入的顺序随着元素的增加会不停地变动。但 TreeMap 能够至始至终按照指定的顺序排列，这对于需要自定义排序的场景，实在是太有用了！</p><h2 id="_03、排序的好处" tabindex="-1"><a class="header-anchor" href="#_03、排序的好处" aria-hidden="true">#</a> 03、排序的好处</h2><p>既然 TreeMap 的元素是经过排序的，那找出最大的那个，最小的那个，或者找出所有大于或者小于某个值的键来说，就方便多了。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Integer highestKey = mapInt.lastKey();
Integer lowestKey = mapInt.firstKey();
Set&lt;Integer&gt; keysLessThan3 = mapInt.headMap(3).keySet();
Set&lt;Integer&gt; keysGreaterThanEqTo3 = mapInt.tailMap(3).keySet();

System.out.println(highestKey);
System.out.println(lowestKey);

System.out.println(keysLessThan3);
System.out.println(keysGreaterThanEqTo3);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TreeMap 考虑得很周全，恰好就提供了 <code>lastKey()</code>、<code>firstKey()</code> 这样获取最后一个 key 和第一个 key 的方法。</p><p><code>headMap()</code> 获取的是到指定 key 之前的 key；<code>tailMap()</code> 获取的是指定 key 之后的 key（包括指定 key）。</p><p>来看一下输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>5
1
[1, 2]
[3, 4, 5]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_04、如何选择-map" tabindex="-1"><a class="header-anchor" href="#_04、如何选择-map" aria-hidden="true">#</a> 04、如何选择 Map</h2>`,54),m={href:"https://tobebetterjavaer.com/collection/hashmap.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://tobebetterjavaer.com/collection/linkedhashmap.html",target:"_blank",rel:"noopener noreferrer"},g=e("p",null,"HashMap、LinkedHashMap、TreeMap 都实现了 Map 接口，并提供了几乎相同的功能（增删改查）。它们之间最大的区别就在于元素的顺序：",-1),h=e("p",null,"HashMap 完全不保证元素的顺序，添加了新的元素，之前的顺序可能完全逆转。",-1),x=e("p",null,"LinkedHashMap 默认会保持元素的插入顺序。",-1),_=e("p",null,[n("TreeMap 默认会保持 key 的自然顺序（根据 "),e("code",null,"compareTo()"),n(" 方法）。")],-1),y=e("p",null,"来个表格吧，一目了然。",-1),T=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/treemap-f94219fb-b6ef-4192-8174-4759498f857f.jpg",alt:"",loading:"lazy"})],-1),q=e("hr",null,null,-1),M=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),k={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,[n("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),n("，回复"),e("strong",null,"111"),n(" 即可免费领取。")],-1),S=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function I(j,K){const a=d("ExternalLinkIcon");return r(),l("div",null,[c,p,e("p",null,[n("之前 "),e("a",u,[n("LinkedHashMap"),t(a)]),n(" 那篇文章里提到过了，HashMap 是无序的，所有有了 LinkedHashMap，加上了双向链表后，就可以保持元素的插入顺序和访问顺序，那 TreeMap 呢？")]),v,e("p",null,[n("在学习 TreeMap 之前，我们已经学习了 "),e("a",m,[n("HashMap"),t(a)]),n(" 和 "),e("a",b,[n("LinkedHashMap"),t(a)]),n(" ，那如何从它们三个中间选择呢？")]),g,h,x,_,y,T,q,e("p",null,[n("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),M,n(" 等等等等……详情戳："),e("a",k,[n("可以说是2022年全网最全的学习和找工作的PDF资源了"),t(a)])]),f,S])}const V=i(o,[["render",I],["__file","treemap.html.vue"]]);export{V as default};
