import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as l,a as e,d as i,b as d,e as s,r as o}from"./app.99eb8281.js";const c={},t=e("p",null,"Java 中的 PriorityQueue 事通过二叉小顶堆实现的，可以用一棵完全二叉树表示。本文从 Queue 接口出发，结合生动的图解，深入浅出地分析 PriorityQueue 每个操作的具体过程和时间复杂度，让读者对 PriorityQueue 建立清晰而深入的认识。",-1),u=e("h2",{id:"总体介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总体介绍","aria-hidden":"true"},"#"),i(" 总体介绍")],-1),v={href:"https://tobebetterjavaer.com/collection/arraydeque.html",target:"_blank",rel:"noopener noreferrer"},m=e("em",null,"Stack",-1),b=e("em",null,"Queue",-1),p=e("em",null,"PriorityQueue",-1),g=s(`<p><strong>优先队列的作用是能保证每次取出的元素都是队列中权值最小的</strong>（Java 的优先队列每次取最小元素，C++的优先队列每次取最大元素）。</p><p>这里牵涉到了大小关系，<strong>元素大小的评判可以通过元素本身的自然顺序（<em>natural ordering</em>），也可以通过构造时传入的比较器</strong>（<em>Comparator</em>，类似于 C++的仿函数）。</p><p>Java 中<em>PriorityQueue</em>实现了<em>Queue</em>接口，不允许放入<code>null</code>元素；其通过堆实现，具体说是通过完全二叉树（<em>complete binary tree</em>）实现的<strong>小顶堆</strong>（任意一个非叶子节点的权值，都不大于其左右子节点的权值），也就意味着可以通过数组来作为<em>PriorityQueue</em>的底层实现。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/PriorityQueue-8dca2f55-a7c7-49e1-95a5-df1a34f2aef5.png" alt="PriorityQueue_base.png" loading="lazy"></p><p>上图中我们给每个元素按照层序遍历的方式进行了编号，如果你足够细心，会发现父节点和子节点的编号是有联系的，更确切的说父子节点的编号之间有如下关系：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>leftNo = parentNo\\*2+1

rightNo = parentNo\\*2+2

parentNo = (nodeNo-1)/2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上述三个公式，可以轻易计算出某个节点的父节点以及子节点的下标。这也就是为什么可以直接用数组来存储堆的原因。</p><p><em>PriorityQueue</em>的<code>peek()</code>和<code>element</code>操作是常数时间，<code>add()</code>, <code>offer()</code>, 无参数的<code>remove()</code>以及<code>poll()</code>方法的时间复杂度都是<em>log(N)</em>。</p><h2 id="方法剖析" tabindex="-1"><a class="header-anchor" href="#方法剖析" aria-hidden="true">#</a> 方法剖析</h2><h3 id="add-和-offer" tabindex="-1"><a class="header-anchor" href="#add-和-offer" aria-hidden="true">#</a> add()和 offer()</h3><p><code>add(E e)</code>和<code>offer(E e)</code>的语义相同，都是向优先队列中插入元素，只是<code>Queue</code>接口规定二者对插入失败时的处理不同，前者在插入失败时抛出异常，后则则会返回<code>false</code>。对于<em>PriorityQueue</em>这两个方法其实没什么差别。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/PriorityQueue-0fb89aa7-c8fa-4fad-adbb-40c61c3bb0e9.png" alt="PriorityQueue_offer.png" loading="lazy"></p><p>新加入的元素可能会破坏小顶堆的性质，因此需要进行必要的调整。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//offer(E e)
public boolean offer(E e) {
    if (e == null)//不允许放入null元素
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i &gt;= queue.length)
        grow(i + 1);//自动扩容
    size = i + 1;
    if (i == 0)//队列原来为空，这是插入的第一个元素
        queue[0] = e;
    else
        siftUp(i, e);//调整
    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，扩容函数<code>grow()</code>类似于<code>ArrayList</code>里的<code>grow()</code>函数，就是再申请一个更大的数组，并将原数组的元素复制过去，这里不再赘述。需要注意的是<code>siftUp(int k, E x)</code>方法，该方法用于插入元素<code>x</code>并维持堆的特性。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//siftUp()
private void siftUp(int k, E x) {
    while (k &gt; 0) {
        int parent = (k - 1) &gt;&gt;&gt; 1;//parentNo = (nodeNo-1)/2
        Object e = queue[parent];
        if (comparator.compare(x, (E) e) &gt;= 0)//调用比较器的比较方法
            break;
        queue[k] = e;
        k = parent;
    }
    queue[k] = x;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新加入的元素<code>x</code>可能会破坏小顶堆的性质，因此需要进行调整。调整的过程为：<strong>从<code>k</code>指定的位置开始，将<code>x</code>逐层与当前点的<code>parent</code>进行比较并交换，直到满足<code>x &gt;= queue[parent]</code>为止</strong>。注意这里的比较可以是元素的自然顺序，也可以是依靠比较器的顺序。</p><h3 id="element-和-peek" tabindex="-1"><a class="header-anchor" href="#element-和-peek" aria-hidden="true">#</a> element()和 peek()</h3><p><code>element()</code>和<code>peek()</code>的语义完全相同，都是获取但不删除队首元素，也就是队列中权值最小的那个元素，二者唯一的区别是当方法失败时前者抛出异常，后者返回<code>null</code>。根据小顶堆的性质，堆顶那个元素就是全局最小的那个；由于堆用数组表示，根据下标关系，<code>0</code>下标处的那个元素既是堆顶元素。所以<strong>直接返回数组<code>0</code>下标处的那个元素即可</strong>。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/PriorityQueue-5059f157-845e-4d1c-b993-5cfe539d5607.png" alt="PriorityQueue_peek.png" loading="lazy"></p><p>代码也就非常简洁：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//peek()
public E peek() {
    if (size == 0)
        return null;
    return (E) queue[0];//0下标处的那个元素就是最小的那个
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="remove-和-poll" tabindex="-1"><a class="header-anchor" href="#remove-和-poll" aria-hidden="true">#</a> remove()和 poll()</h3><p><code>remove()</code>和<code>poll()</code>方法的语义也完全相同，都是获取并删除队首元素，区别是当方法失败时前者抛出异常，后者返回<code>null</code>。由于删除操作会改变队列的结构，为维护小顶堆的性质，需要进行必要的调整。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/PriorityQueue-e25ba931-2e6f-4c17-84b8-9b959733d541.png" alt="PriorityQueue_poll.png" loading="lazy"></p><p>代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public E poll() {
    if (size == 0)
        return null;
    int s = --size;
    modCount++;
    E result = (E) queue[0];//0下标处的那个元素就是最小的那个
    E x = (E) queue[s];
    queue[s] = null;
    if (s != 0)
        siftDown(0, x);//调整
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码首先记录<code>0</code>下标处的元素，并用最后一个元素替换<code>0</code>下标位置的元素，之后调用<code>siftDown()</code>方法对堆进行调整，最后返回原来<code>0</code>下标处的那个元素（也就是最小的那个元素）。重点是<code>siftDown(int k, E x)</code>方法，该方法的作用是<strong>从<code>k</code>指定的位置开始，将<code>x</code>逐层向下与当前点的左右孩子中较小的那个交换，直到<code>x</code>小于或等于左右孩子中的任何一个为止</strong>。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//siftDown()
private void siftDown(int k, E x) {
    int half = size &gt;&gt;&gt; 1;
    while (k &lt; half) {
      //首先找到左右孩子中较小的那个，记录到c里，并用child记录其下标
        int child = (k &lt;&lt; 1) + 1;//leftNo = parentNo*2+1
        Object c = queue[child];
        int right = child + 1;
        if (right &lt; size &amp;&amp;
            comparator.compare((E) c, (E) queue[right]) &gt; 0)
            c = queue[child = right];
        if (comparator.compare(x, (E) c) &lt;= 0)
            break;
        queue[k] = c;//然后用c取代原来的值
        k = child;
    }
    queue[k] = x;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="remove-object-o" tabindex="-1"><a class="header-anchor" href="#remove-object-o" aria-hidden="true">#</a> remove(Object o)</h3><p><code>remove(Object o)</code>方法用于删除队列中跟<code>o</code>相等的某一个元素（如果有多个相等，只删除一个），该方法不是<em>Queue</em>接口内的方法，而是<em>Collection</em>接口的方法。由于删除操作会改变队列结构，所以要进行调整；又由于删除元素的位置可能是任意的，所以调整过程比其它函数稍加繁琐。具体来说，<code>remove(Object o)</code>可以分为 2 种情况：1. 删除的是最后一个元素。直接删除即可，不需要调整。2. 删除的不是最后一个元素，从删除点开始以最后一个元素为参照调用一次<code>siftDown()</code>即可。此处不再赘述。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/collection/PriorityQueue-ed0d08d3-b38e-44a1-a710-ee7a01afda62.png" alt="PriorityQueue_remove2.png" loading="lazy"></p><p>具体代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>//remove(Object o)
public boolean remove(Object o) {
  //通过遍历数组的方式找到第一个满足o.equals(queue[i])元素的下标
    int i = indexOf(o);
    if (i == -1)
        return false;
    int s = --size;
    if (s == i) //情况1
        queue[i] = null;
    else {
        E moved = (E) queue[s];
        queue[s] = null;
        siftDown(i, moved);//情况2
        ......
    }
    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),h={href:"https://github.com/CarpenterLee/JCFInternals",target:"_blank",rel:"noopener noreferrer"},f=e("hr",null,null,-1),_=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),x={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,[i("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),i("，回复"),e("strong",null,"111"),i(" 即可免费领取。")],-1),y=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function J(E,Q){const n=o("ExternalLinkIcon");return r(),l("div",null,[t,u,e("p",null,[i("前面以 Java "),e("a",v,[i("ArrayDeque"),d(n)]),i("为例讲解了"),m,i("和"),b,i("，其实还有一种特殊的队列叫做"),p,i("，即优先队列。")]),g,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",h,[i("https://github.com/CarpenterLee/JCFInternals"),d(n)]),i("，作者：李豪，整理：沉默王二")])]),f,e("p",null,[i("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),_,i(" 等等等等……详情戳："),e("a",x,[i("可以说是2022年全网最全的学习和找工作的PDF资源了"),d(n)])]),k,y])}const P=a(c,[["render",J],["__file","PriorityQueue.html.vue"]]);export{P as default};
