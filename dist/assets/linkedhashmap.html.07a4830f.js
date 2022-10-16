import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o as l,c as r,a as e,b as s,d as n,e as a}from"./app.22292d3d.js";const u={},o=e("p",null,"\u4FD7\u8BDD\u8BF4\u4E86\uFF0C\u201C\u91D1\u65E0\u8DB3\u8D64\u4EBA\u65E0\u5B8C\u4EBA\u201D\uFF0CHashMap \u4E5F\u4E0D\u4F8B\u5916\uFF0C\u6709\u4E00\u79CD\u9700\u6C42\u5B83\u5C31\u6EE1\u8DB3\u4E0D\u4E86\uFF0C\u5047\u5982\u6211\u4EEC\u9700\u8981\u4E00\u4E2A\u6309\u7167\u63D2\u5165\u987A\u5E8F\u6765\u6392\u5217\u7684\u952E\u503C\u5BF9\u96C6\u5408\uFF0C\u90A3 HashMap \u5C31\u65E0\u80FD\u4E3A\u529B\u4E86\u3002\u90A3\u8BE5\u600E\u4E48\u529E\u5462\uFF1F\u5FC5\u987B\u5F97\u4E0A\u4ECA\u5929\u8FD9\u7BC7\u6587\u7AE0\u7684\u4E3B\u89D2\uFF1ALinkedHashMap\u3002",-1),v=n("\u540C\u5B66\u4EEC\u597D\u554A\uFF0C\u8FD8\u8BB0\u5F97 "),c={href:"https://tobebetterjavaer.com/collection/hashmap.html",target:"_blank",rel:"noopener noreferrer"},p=n("HashMap"),m=n(" \u90A3\u7BC7\u5417\uFF1F\u6211\u81EA\u5DF1\u611F\u89C9\u5199\u5F97\u975E\u5E38\u68D2\u554A\uFF0C\u65E2\u901A\u4FD7\u6613\u61C2\uFF0C\u53C8\u6DF1\u5165\u6E90\u7801\uFF0C\u771F\u7684\u662F\u5206\u6790\u5F97\u900F\u900F\u5F7B\u5F7B\u3001\u6E05\u6E05\u695A\u695A\u3001\u660E\u660E\u767D\u767D\u7684\u3002\uFF08\u4E00\u4E0D\u5C0F\u5FC3\u53C8\u7529\u4E86\u4E09\u4E2A\u6210\u8BED\uFF0C\u6709\u6587\u5316\u5427\uFF1F\uFF09HashMap \u54EA\u54EA\u90FD\u597D\uFF0C\u771F\u7684\uFF0C\u53EA\u8981\u4F60\u60F3\u7528\u952E\u503C\u5BF9\uFF0C\u7B2C\u4E00\u65F6\u95F4\u5C31\u5E94\u8BE5\u60F3\u5230\u5B83\u3002"),b=e("p",null,"\u4E3A\u4E86\u63D0\u9AD8\u67E5\u627E\u6548\u7387\uFF0CHashMap \u5728\u63D2\u5165\u7684\u65F6\u5019\u5BF9\u952E\u505A\u4E86\u4E00\u6B21\u54C8\u5E0C\u7B97\u6CD5\uFF0C\u8FD9\u5C31\u5BFC\u81F4\u63D2\u5165\u7684\u5143\u7D20\u662F\u65E0\u5E8F\u7684\u3002",-1),h=n("\u5BF9\u8FD9\u4E00\u70B9\u8FD8\u4E0D\u592A\u660E\u767D\u7684\u540C\u5B66\uFF0C\u53EF\u4EE5\u518D\u56DE\u5230 "),g={href:"https://tobebetterjavaer.com/collection/hashmap.html",target:"_blank",rel:"noopener noreferrer"},q=n("HashMap"),M=n(" \u90A3\u4E00\u7BC7\uFF0C\u770B\u770B\u6211\u5BF9 "),_=e("code",null,"put()",-1),k=n(" \u65B9\u6CD5\u7684\u8BB2\u89E3\u3002"),x=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>final V putVal(int hash, K key, V value, boolean onlyIfAbsent,

               boolean evict) {
    HashMap.Node&lt;K,V&gt;[] tab; HashMap.Node&lt;K,V&gt; p; int n, i;
    // \u2460\u3001\u6570\u7EC4 table \u4E3A null \u65F6\uFF0C\u8C03\u7528 resize \u65B9\u6CD5\u521B\u5EFA\u9ED8\u8BA4\u5927\u5C0F\u7684\u6570\u7EC4
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // \u2461\u3001\u8BA1\u7B97\u4E0B\u6807\uFF0C\u5982\u679C\u8BE5\u4F4D\u7F6E\u4E0A\u6CA1\u6709\u503C\uFF0C\u5219\u586B\u5145
    if ((p = tab[i = (n - 1) &amp; hash]) == null)
        tab[i] = newNode(hash, key, value, null);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u516C\u5F0F <code>i = (n - 1) &amp; hash</code> \u8BA1\u7B97\u540E\u7684\u503C\u5E76\u4E0D\u662F\u6309\u7167 0\u30011\u30012\u30013\u30014\u30015 \u8FD9\u6837\u6709\u5E8F\u7684\u4E0B\u6807\u5C06\u952E\u503C\u5BF9\u63D2\u5165\u5230\u6570\u7EC4\u5F53\u4E2D\u7684\uFF0C\u800C\u662F\u6709\u4E00\u5B9A\u7684\u968F\u673A\u6027\u3002</p><p>\u90A3 LinkedHashMap \u5C31\u662F\u4E3A\u8FD9\u4E2A\u9700\u6C42\u5E94\u8FD0\u800C\u751F\u7684\u3002LinkedHashMap \u7EE7\u627F\u4E86 HashMap\uFF0C\u6240\u4EE5 HashMap \u6709\u7684\u5173\u4E8E\u952E\u503C\u5BF9\u7684\u529F\u80FD\uFF0C\u5B83\u4E5F\u6709\u4E86\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class LinkedHashMap&lt;K,V&gt;

    extends HashMap&lt;K,V&gt;

    implements Map&lt;K,V&gt;{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u5916\uFF0CLinkedHashMap \u5185\u90E8\u53C8\u8FFD\u52A0\u4E86\u53CC\u5411\u94FE\u8868\uFF0C\u6765\u7EF4\u62A4\u5143\u7D20\u7684\u63D2\u5165\u987A\u5E8F\u3002\u6CE8\u610F\u4E0B\u9762\u4EE3\u7801\u4E2D\u7684 before \u548C after\uFF0C\u5B83\u4FE9\u5C31\u662F\u7528\u6765\u7EF4\u62A4\u5F53\u524D\u5143\u7D20\u7684\u524D\u4E00\u4E2A\u5143\u7D20\u548C\u540E\u4E00\u4E2A\u5143\u7D20\u7684\u987A\u5E8F\u7684\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>static class Entry&lt;K,V&gt; extends HashMap.Node&lt;K,V&gt; {
    LinkedHashMap.Entry&lt;K,V&gt; before, after;
    Entry(int hash, K key, V value, HashMap.Node&lt;K,V&gt; next) {
        super(hash, key, value, next);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),H=n("\u5173\u4E8E\u53CC\u5411\u94FE\u8868\uFF0C\u540C\u5B66\u4EEC\u53EF\u4EE5\u56DE\u5934\u770B\u4E00\u904D\u6211\u5199\u7684 "),f={href:"https://tobebetterjavaer.com/collection/linkedlist.html",target:"_blank",rel:"noopener noreferrer"},y=n("LinkedList"),L=n(" \u90A3\u7BC7\u6587\u7AE0\uFF0C\u4F1A\u5BF9\u7406\u89E3\u672C\u7BC7\u7684 LinkedHashMap \u6709\u5F88\u5927\u7684\u5E2E\u52A9\u3002"),N=e("h2",{id:"_01\u3001\u63D2\u5165\u987A\u5E8F",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_01\u3001\u63D2\u5165\u987A\u5E8F","aria-hidden":"true"},"#"),n(" 01\u3001\u63D2\u5165\u987A\u5E8F")],-1),V=n("\u5728 "),S={href:"https://tobebetterjavaer.com/collection/hashmap.html",target:"_blank",rel:"noopener noreferrer"},E=n("HashMap"),K=n(" \u90A3\u7BC7\u6587\u7AE0\u91CC\uFF0C\u6211\u6709\u8BB2\u89E3\u5230\u4E00\u70B9\uFF0C\u4E0D\u77E5\u9053\u540C\u5B66\u4EEC\u8BB0\u4E0D\u8BB0\u5F97\uFF0C\u5C31\u662F null \u4F1A\u63D2\u5165\u5230 HashMap \u7684\u7B2C\u4E00\u4F4D\u3002"),w=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Map&lt;String, String&gt; hashMap = new HashMap&lt;&gt;();
hashMap.put(&quot;\u6C89&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
hashMap.put(&quot;\u9ED8&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
hashMap.put(&quot;\u738B&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
hashMap.put(&quot;\u4E8C&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
hashMap.put(null, null);

for (String key : hashMap.keySet()) {
    System.out.println(key + &quot; : &quot; + hashMap.get(key));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7684\u7ED3\u679C\u662F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>null : null
\u9ED8 : \u6C89\u9ED8\u738B\u4E8C
\u6C89 : \u6C89\u9ED8\u738B\u4E8C
\u738B : \u6C89\u9ED8\u738B\u4E8C
\u4E8C : \u6C89\u9ED8\u738B\u4E8C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u867D\u7136 null \u6700\u540E\u4E00\u4F4D put \u8FDB\u53BB\u7684\uFF0C\u4F46\u5728\u904D\u5386\u8F93\u51FA\u7684\u65F6\u5019\uFF0C\u8DD1\u5230\u4E86\u7B2C\u4E00\u4F4D\u3002</p><p>\u90A3\u518D\u6765\u5BF9\u6BD4\u770B\u4E00\u4E0B LinkedHashMap\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Map&lt;String, String&gt; linkedHashMap = new LinkedHashMap&lt;&gt;();
linkedHashMap.put(&quot;\u6C89&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(&quot;\u9ED8&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(&quot;\u738B&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(&quot;\u4E8C&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(null, null);

for (String key : linkedHashMap.keySet()) {
    System.out.println(key + &quot; : &quot; + linkedHashMap.get(key));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7ED3\u679C\u662F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u6C89 : \u6C89\u9ED8\u738B\u4E8C
\u9ED8 : \u6C89\u9ED8\u738B\u4E8C
\u738B : \u6C89\u9ED8\u738B\u4E8C
\u4E8C : \u6C89\u9ED8\u738B\u4E8C
null : null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>null \u5728\u6700\u540E\u4E00\u4F4D\u63D2\u5165\uFF0C\u5728\u6700\u540E\u4E00\u4F4D\u8F93\u51FA\u3002</p><p>\u8F93\u51FA\u7ED3\u679C\u53EF\u4EE5\u518D\u6B21\u8BC1\u660E\uFF0CHashMap \u662F\u65E0\u5E8F\u7684\uFF0CLinkedHashMap \u662F\u53EF\u4EE5\u7EF4\u6301\u63D2\u5165\u987A\u5E8F\u7684\u3002</p><p>\u90A3 LinkedHashMap \u662F\u5982\u4F55\u505A\u5230\u8FD9\u4E00\u70B9\u5462\uFF1F\u6211\u76F8\u4FE1\u540C\u5B66\u4EEC\u548C\u6211\u4E00\u6837\uFF0C\u975E\u5E38\u5E0C\u671B\u77E5\u9053\u539F\u56E0\u3002</p><p>\u8981\u60F3\u641E\u6E05\u695A\uFF0C\u5C31\u9700\u8981\u6DF1\u5165\u7814\u7A76\u4E00\u4E0B LinkedHashMap \u7684\u6E90\u7801\u3002LinkedHashMap \u5E76\u672A\u91CD\u5199 HashMap \u7684 <code>put()</code> \u65B9\u6CD5\uFF0C\u800C\u662F\u91CD\u5199\u4E86 <code>put()</code> \u65B9\u6CD5\u9700\u8981\u8C03\u7528\u7684\u5185\u90E8\u65B9\u6CD5 <code>newNode()</code>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>HashMap.Node&lt;K,V&gt; newNode(int hash, K key, V value, HashMap.Node&lt;K,V&gt; e) {
    LinkedHashMap.Entry&lt;K,V&gt; p =
            new LinkedHashMap.Entry&lt;&gt;(hash, key, value, e);
    linkNodeLast(p);
    return p;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u524D\u9762\u8BF4\u4E86\uFF0CLinkedHashMap.Entry \u7EE7\u627F\u4E86 HashMap.Node\uFF0C\u5E76\u4E14\u8FFD\u52A0\u4E86\u4E24\u4E2A\u5B57\u6BB5 before \u548C after\u3002</p><p>\u90A3\uFF0C\u7D27\u63A5\u7740\u6765\u770B\u770B <code>linkNodeLast()</code> \u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private void linkNodeLast(LinkedHashMap.Entry&lt;K,V&gt; p) {
    LinkedHashMap.Entry&lt;K,V&gt; last = tail;
    tail = p;
    if (last == null)
        head = p;
    else {
        p.before = last;
        last.after = p;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\u5230\u4E86\u5427\uFF0CLinkedHashMap \u5728\u6DFB\u52A0\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684\u65F6\u5019\uFF0C\u4F1A\u628A head \u8D4B\u503C\u4E3A\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF0C\u7B49\u5230\u7B2C\u4E8C\u4E2A\u5143\u7D20\u6DFB\u52A0\u8FDB\u6765\u7684\u65F6\u5019\uFF0C\u4F1A\u628A\u7B2C\u4E8C\u4E2A\u5143\u7D20\u7684 before \u8D4B\u503C\u4E3A\u7B2C\u4E00\u4E2A\u5143\u7D20\uFF0C\u7B2C\u4E00\u4E2A\u5143\u7D20\u7684 afer \u8D4B\u503C\u4E3A\u7B2C\u4E8C\u4E2A\u5143\u7D20\u3002</p><p>\u8FD9\u5C31\u4FDD\u8BC1\u4E86\u952E\u503C\u5BF9\u662F\u6309\u7167\u63D2\u5165\u987A\u5E8F\u6392\u5217\u7684\uFF0C\u660E\u767D\u4E86\u5427\uFF1F</p><p><em>\u6CE8\uFF1A\u8FD9\u7BC7\u6587\u7AE0\u5F53\u65F6\u7528\u5230\u7684 JDK \u7248\u672C\u4E3A 14\uFF08\u5F53\u65F6\u7684\u6700\u65B0\u7248\uFF0C\u5EFA\u8BAE\u4F7F\u7528 Java8 \u6216\u8005 Java 13\uFF09</em>\u3002</p><h2 id="_02\u3001\u8BBF\u95EE\u987A\u5E8F" tabindex="-1"><a class="header-anchor" href="#_02\u3001\u8BBF\u95EE\u987A\u5E8F" aria-hidden="true">#</a> 02\u3001\u8BBF\u95EE\u987A\u5E8F</h2><p>LinkedHashMap \u4E0D\u4EC5\u80FD\u591F\u7EF4\u6301\u63D2\u5165\u987A\u5E8F\uFF0C\u8FD8\u80FD\u591F\u7EF4\u6301\u8BBF\u95EE\u987A\u5E8F\u3002\u8BBF\u95EE\u5305\u62EC\u8C03\u7528 <code>get()</code> \u65B9\u6CD5\u3001<code>remove()</code> \u65B9\u6CD5\u548C <code>put()</code> \u65B9\u6CD5\u3002</p><p>\u8981\u7EF4\u62A4\u8BBF\u95EE\u987A\u5E8F\uFF0C\u9700\u8981\u6211\u4EEC\u5728\u58F0\u660E LinkedHashMap \u7684\u65F6\u5019\u6307\u5B9A\u4E09\u4E2A\u53C2\u6570\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>LinkedHashMap&lt;String, String&gt; map = new LinkedHashMap&lt;&gt;(16, .75f, true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,23),I=n("\u7B2C\u4E00\u4E2A\u53C2\u6570\u548C\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF0C\u770B\u8FC7 "),j={href:"https://tobebetterjavaer.com/collection/hashmap.html",target:"_blank",rel:"noopener noreferrer"},R=n("HashMap"),A=n(" \u7684\u540C\u5B66\u4EEC\u5E94\u8BE5\u5F88\u719F\u6089\u4E86\uFF0C\u6307\u7684\u662F\u521D\u59CB\u5BB9\u91CF\u548C\u8D1F\u8F7D\u56E0\u5B50\u3002"),J=a(`<p>\u7B2C\u4E09\u4E2A\u53C2\u6570\u5982\u679C\u4E3A true \u7684\u8BDD\uFF0C\u5C31\u8868\u793A LinkedHashMap \u8981\u7EF4\u62A4\u8BBF\u95EE\u987A\u5E8F\uFF1B\u5426\u5219\uFF0C\u7EF4\u62A4\u63D2\u5165\u987A\u5E8F\u3002\u9ED8\u8BA4\u662F false\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Map&lt;String, String&gt; linkedHashMap = new LinkedHashMap&lt;&gt;(16, .75f, true);
linkedHashMap.put(&quot;\u6C89&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(&quot;\u9ED8&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(&quot;\u738B&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
linkedHashMap.put(&quot;\u4E8C&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);

System.out.println(linkedHashMap);

linkedHashMap.get(&quot;\u9ED8&quot;);
System.out.println(linkedHashMap);

linkedHashMap.get(&quot;\u738B&quot;);
System.out.println(linkedHashMap);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7684\u7ED3\u679C\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\u6C89=\u6C89\u9ED8\u738B\u4E8C, \u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C}
{\u6C89=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u9ED8=\u6C89\u9ED8\u738B\u4E8C}
{\u6C89=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u6211\u4EEC\u4F7F\u7528 <code>get()</code> \u65B9\u6CD5\u8BBF\u95EE\u952E\u4F4D\u201C\u9ED8\u201D\u7684\u5143\u7D20\u540E\uFF0C\u8F93\u51FA\u7ED3\u679C\u4E2D\uFF0C<code>\u9ED8=\u6C89\u9ED8\u738B\u4E8C</code> \u5728\u6700\u540E\uFF1B\u5F53\u6211\u4EEC\u8BBF\u95EE\u952E\u4F4D\u201C\u738B\u201D\u7684\u5143\u7D20\u540E\uFF0C\u8F93\u51FA\u7ED3\u679C\u4E2D\uFF0C<code>\u738B=\u6C89\u9ED8\u738B\u4E8C</code> \u5728\u6700\u540E\uFF0C<code>\u9ED8=\u6C89\u9ED8\u738B\u4E8C</code> \u5728\u5012\u6570\u7B2C\u4E8C\u4F4D\u3002</p><p>\u4E5F\u5C31\u662F\u8BF4\uFF0C\u6700\u4E0D\u7ECF\u5E38\u8BBF\u95EE\u7684\u653E\u5728\u5934\u90E8\uFF0C\u8FD9\u5C31\u6709\u610F\u601D\u4E86\u3002\u6709\u610F\u601D\u5728\u54EA\u5462\uFF1F</p><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 LinkedHashMap \u6765\u5B9E\u73B0 LRU \u7F13\u5B58\uFF0CLRU \u662F Least Recently Used \u7684\u7F29\u5199\uFF0C\u5373\u6700\u8FD1\u6700\u5C11\u4F7F\u7528\uFF0C\u662F\u4E00\u79CD\u5E38\u7528\u7684\u9875\u9762\u7F6E\u6362\u7B97\u6CD5\uFF0C\u9009\u62E9\u6700\u8FD1\u6700\u4E45\u672A\u4F7F\u7528\u7684\u9875\u9762\u4E88\u4EE5\u6DD8\u6C70\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class MyLinkedHashMap&lt;K, V&gt; extends LinkedHashMap&lt;K, V&gt; {

    private static final int MAX_ENTRIES = 5;

    public MyLinkedHashMap(

            int initialCapacity, float loadFactor, boolean accessOrder) {
        super(initialCapacity, loadFactor, accessOrder);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry eldest) {
        return size() &gt; MAX_ENTRIES;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MyLinkedHashMap \u662F\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7C7B\uFF0C\u5B83\u7EE7\u627F\u4E86 LinkedHashMap\uFF0C\u5E76\u4E14\u91CD\u5199\u4E86 <code>removeEldestEntry()</code> \u65B9\u6CD5\u2014\u2014\u4F7F Map \u6700\u591A\u53EF\u5BB9\u7EB3 5 \u4E2A\u5143\u7D20\uFF0C\u8D85\u51FA\u540E\u5C31\u6DD8\u6C70\u3002</p><p>\u6211\u4EEC\u6765\u6D4B\u8BD5\u4E00\u4E0B\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>MyLinkedHashMap&lt;String,String&gt; map = new MyLinkedHashMap&lt;&gt;(16,0.75f,true);
map.put(&quot;\u6C89&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u9ED8&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u738B&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u4E8C&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458&quot;, &quot;\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458&quot;);

System.out.println(map);

map.put(&quot;\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458&quot;, &quot;\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458&quot;);
System.out.println(map);

map.put(&quot;\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458&quot;,&quot;\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458&quot;);
System.out.println(map);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\u7ED3\u679C\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\u6C89=\u6C89\u9ED8\u738B\u4E8C, \u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458}
{\u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458, \u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458}
{\u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458, \u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458, \u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>\u6C89=\u6C89\u9ED8\u738B\u4E8C</code> \u548C <code>\u9ED8=\u6C89\u9ED8\u738B\u4E8C</code> \u4F9D\u6B21\u88AB\u6DD8\u6C70\u51FA\u5C40\u3002</p><p>\u5047\u5982\u5728 put \u201C\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458\u201D\u4E4B\u524D get \u4E86\u952E\u4F4D\u4E3A\u201C\u9ED8\u201D\u7684\u5143\u7D20\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>MyLinkedHashMap&lt;String,String&gt; map = new MyLinkedHashMap&lt;&gt;(16,0.75f,true);
map.put(&quot;\u6C89&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u9ED8&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u738B&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u4E8C&quot;, &quot;\u6C89\u9ED8\u738B\u4E8C&quot;);
map.put(&quot;\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458&quot;, &quot;\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458&quot;);

System.out.println(map);

map.put(&quot;\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458&quot;, &quot;\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458&quot;);
System.out.println(map);

map.get(&quot;\u9ED8&quot;);
map.put(&quot;\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458&quot;,&quot;\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458&quot;);
System.out.println(map);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u90A3\u8F93\u51FA\u7ED3\u679C\u5C31\u53D8\u4E86\uFF0C\u5BF9\u5427\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\u6C89=\u6C89\u9ED8\u738B\u4E8C, \u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458}
{\u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u738B=\u6C89\u9ED8\u738B\u4E8C, \u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458, \u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458}
{\u4E8C=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u8DA3\u7684\u7A0B\u5E8F\u5458, \u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u989C\u503C\u7684\u7A0B\u5E8F\u5458, \u9ED8=\u6C89\u9ED8\u738B\u4E8C, \u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458=\u4E00\u679A\u6709\u624D\u534E\u7684\u7A0B\u5E8F\u5458}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>\u6C89=\u6C89\u9ED8\u738B\u4E8C</code> \u548C <code>\u738B=\u6C89\u9ED8\u738B\u4E8C</code> \u88AB\u6DD8\u6C70\u51FA\u5C40\u4E86\u3002</p><p>\u90A3 LinkedHashMap \u662F\u5982\u4F55\u6765\u7EF4\u6301\u8BBF\u95EE\u987A\u5E8F\u5462\uFF1F\u540C\u5B66\u4EEC\u611F\u5174\u8DA3\u7684\u8BDD\uFF0C\u53EF\u4EE5\u7814\u7A76\u4E00\u4E0B\u4E0B\u9762\u8FD9\u4E09\u4E2A\u65B9\u6CD5\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>void afterNodeAccess(Node&lt;K,V&gt; p) { }
void afterNodeInsertion(boolean evict) { }
void afterNodeRemoval(Node&lt;K,V&gt; p) { }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>afterNodeAccess()</code> \u4F1A\u5728\u8C03\u7528 <code>get()</code> \u65B9\u6CD5\u7684\u65F6\u5019\u88AB\u8C03\u7528\uFF0C<code>afterNodeInsertion()</code> \u4F1A\u5728\u8C03\u7528 <code>put()</code> \u65B9\u6CD5\u7684\u65F6\u5019\u88AB\u8C03\u7528\uFF0C<code>afterNodeRemoval()</code> \u4F1A\u5728\u8C03\u7528 <code>remove()</code> \u65B9\u6CD5\u7684\u65F6\u5019\u88AB\u8C03\u7528\u3002</p><p>\u6211\u6765\u4EE5 <code>afterNodeAccess()</code> \u4E3A\u4F8B\u6765\u8BB2\u89E3\u4E00\u4E0B\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>void afterNodeAccess(HashMap.Node&lt;K,V&gt; e) { // move node to last
    LinkedHashMap.Entry&lt;K,V&gt; last;
    if (accessOrder &amp;&amp; (last = tail) != e) {
        LinkedHashMap.Entry&lt;K,V&gt; p =
                (LinkedHashMap.Entry&lt;K,V&gt;)e, b = p.before, a = p.after;
        p.after = null;
        if (b == null)
            head = a;
        else
            b.after = a;
        if (a != null)
            a.before = b;
        else
            last = b;
        if (last == null)
            head = p;
        else {
            p.before = last;
            last.after = p;
        }
        tail = p;
        ++modCount;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u54EA\u4E2A\u5143\u7D20\u88AB get \u5C31\u628A\u54EA\u4E2A\u5143\u7D20\u653E\u5728\u6700\u540E\u3002\u4E86\u89E3\u4E86\u5427\uFF1F</p><p>\u90A3\u540C\u5B66\u4EEC\u53EF\u80FD\u8FD8\u60F3\u77E5\u9053\uFF0C\u4E3A\u4EC0\u4E48 LinkedHashMap \u80FD\u5B9E\u73B0 LRU \u7F13\u5B58\uFF0C\u628A\u6700\u4E0D\u7ECF\u5E38\u8BBF\u95EE\u7684\u90A3\u4E2A\u5143\u7D20\u6DD8\u6C70\uFF1F</p><p>\u5728\u63D2\u5165\u5143\u7D20\u7684\u65F6\u5019\uFF0C\u9700\u8981\u8C03\u7528 <code>put()</code> \u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u6700\u540E\u4F1A\u8C03\u7528 <code>afterNodeInsertion()</code> \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u65B9\u6CD5\u88AB LinkedHashMap \u91CD\u5199\u4E86\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>void afterNodeInsertion(boolean evict) { // possibly remove eldest
    LinkedHashMap.Entry&lt;K,V&gt; first;
    if (evict &amp;&amp; (first = head) != null &amp;&amp; removeEldestEntry(first)) {
        K key = first.key;
        removeNode(hash(key), key, null, false, true);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>removeEldestEntry()</code> \u65B9\u6CD5\u4F1A\u5224\u65AD\u7B2C\u4E00\u4E2A\u5143\u7D20\u662F\u5426\u8D85\u51FA\u4E86\u53EF\u5BB9\u7EB3\u7684\u6700\u5927\u8303\u56F4\uFF0C\u5982\u679C\u8D85\u51FA\uFF0C\u90A3\u5C31\u4F1A\u8C03\u7528 <code>removeNode()</code> \u65B9\u6CD5\u5BF9\u6700\u4E0D\u7ECF\u5E38\u8BBF\u95EE\u7684\u90A3\u4E2A\u5143\u7D20\u8FDB\u884C\u5220\u9664\u3002</p><h2 id="_03\u3001\u6700\u540E" tabindex="-1"><a class="header-anchor" href="#_03\u3001\u6700\u540E" aria-hidden="true">#</a> 03\u3001\u6700\u540E</h2><p>\u7531\u4E8E LinkedHashMap \u8981\u7EF4\u62A4\u53CC\u5411\u94FE\u8868\uFF0C\u6240\u4EE5 LinkedHashMap \u5728\u63D2\u5165\u3001\u5220\u9664\u64CD\u4F5C\u7684\u65F6\u5019\uFF0C\u82B1\u8D39\u7684\u65F6\u95F4\u8981\u6BD4 HashMap \u591A\u4E00\u4E9B\u3002</p><p>\u8FD9\u4E5F\u662F\u6CA1\u529E\u6CD5\u7684\u4E8B\uFF0C\u5BF9\u5427\uFF0C\u6B32\u6234\u7687\u51A0\u5FC5\u627F\u5176\u91CD\u561B\u3002\u65E2\u7136\u60F3\u8981\u7EF4\u62A4\u5143\u7D20\u7684\u987A\u5E8F\uFF0C\u603B\u8981\u4ED8\u51FA\u70B9\u4EE3\u4EF7\u624D\u884C\u3002</p><hr>`,33),z=n("\u6700\u8FD1\u6574\u7406\u4E86\u4E00\u4EFD\u725B\u903C\u7684\u5B66\u4E60\u8D44\u6599\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8EJava\u57FA\u7840\u90E8\u5206\uFF08JVM\u3001Java\u96C6\u5408\u6846\u67B6\u3001\u591A\u7EBF\u7A0B\uFF09\uFF0C\u8FD8\u56CA\u62EC\u4E86 "),C=e("strong",null,"\u6570\u636E\u5E93\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC\u3001\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784\u3001\u8BBE\u8BA1\u6A21\u5F0F\u3001\u6846\u67B6\u7C7BSpring\u3001Netty\u3001\u5FAE\u670D\u52A1\uFF08Dubbo\uFF0C\u6D88\u606F\u961F\u5217\uFF09 \u7F51\u5173",-1),O=n(" \u7B49\u7B49\u7B49\u7B49\u2026\u2026\u8BE6\u60C5\u6233\uFF1A"),U={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},B=n("\u53EF\u4EE5\u8BF4\u662F2022\u5E74\u5168\u7F51\u6700\u5168\u7684\u5B66\u4E60\u548C\u627E\u5DE5\u4F5C\u7684PDF\u8D44\u6E90\u4E86"),D=e("p",null,[n("\u5173\u6CE8\u4E8C\u54E5\u7684\u539F\u521B\u516C\u4F17\u53F7 "),e("strong",null,"\u6C89\u9ED8\u738B\u4E8C"),n("\uFF0C\u56DE\u590D"),e("strong",null,"111"),n(" \u5373\u53EF\u514D\u8D39\u9886\u53D6\u3002")],-1),F=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:""})],-1);function T(X,P){const i=t("ExternalLinkIcon");return l(),r("div",null,[o,e("p",null,[v,e("a",c,[p,s(i)]),m]),b,e("p",null,[h,e("a",g,[q,s(i)]),M,_,k]),x,e("p",null,[H,e("a",f,[y,s(i)]),L]),N,e("p",null,[V,e("a",S,[E,s(i)]),K]),w,e("p",null,[I,e("a",j,[R,s(i)]),A]),J,e("p",null,[z,C,O,e("a",U,[B,s(i)])]),D,F])}var W=d(u,[["render",T],["__file","linkedhashmap.html.vue"]]);export{W as default};
