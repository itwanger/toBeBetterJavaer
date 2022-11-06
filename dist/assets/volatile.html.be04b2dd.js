import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{r as d,o as t,c as v,a as e,b as l,e as a,d as i}from"./app.36bfa2ec.js";const r={},c=a(`<h1 id="java\u5E76\u53D1\u7F16\u7A0Bvolatile\u5173\u952E\u5B57\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#java\u5E76\u53D1\u7F16\u7A0Bvolatile\u5173\u952E\u5B57\u89E3\u6790" aria-hidden="true">#</a> Java\u5E76\u53D1\u7F16\u7A0Bvolatile\u5173\u952E\u5B57\u89E3\u6790</h1><p>\u201C\u4E09\u59B9\u554A\uFF0C\u8FD9\u8282\u6211\u4EEC\u6765\u5B66\u4E60 Java \u5E76\u53D1\u7F16\u7A0B\u4E2D\u7684 volatile \u5173\u952E\u5B57\uFF0C\u4EE5\u53CA\u5BB9\u6613\u9047\u5230\u7684\u5751\u3002\u201D\u770B\u7740\u4E09\u59B9\u597D\u5B66\u7684\u6837\u5B50\uFF0C\u6211\u500D\u611F\u6B23\u6170\u3002</p><p>\u201C\u597D\u5440\uFF0C\u54E5\u3002\u201D\u4E09\u59B9\u6109\u5FEB\u7684\u7B54\u5E94\u4E86\u3002</p><h2 id="volatile-\u53D8\u91CF\u7684\u7279\u6027" tabindex="-1"><a class="header-anchor" href="#volatile-\u53D8\u91CF\u7684\u7279\u6027" aria-hidden="true">#</a> volatile \u53D8\u91CF\u7684\u7279\u6027</h2><p>volatile \u53EF\u4EE5\u4FDD\u8BC1\u53EF\u89C1\u6027\uFF0C\u4F46\u4E0D\u4FDD\u8BC1\u539F\u5B50\u6027\uFF1A</p><ul><li>\u5F53\u5199\u4E00\u4E2A volatile \u53D8\u91CF\u65F6\uFF0CJMM \u4F1A\u628A\u8BE5\u7EBF\u7A0B\u672C\u5730\u5185\u5B58\u4E2D\u7684\u53D8\u91CF\u5F3A\u5236\u5237\u65B0\u5230\u4E3B\u5185\u5B58\u4E2D\u53BB\uFF1B</li><li>\u8FD9\u4E2A\u5199\u64CD\u4F5C\u4F1A\u5BFC\u81F4\u5176\u4ED6\u7EBF\u7A0B\u4E2D\u7684 volatile \u53D8\u91CF\u7F13\u5B58\u65E0\u6548\u3002</li></ul><h2 id="volatile-\u7981\u6B62\u6307\u4EE4\u91CD\u6392\u89C4\u5219" tabindex="-1"><a class="header-anchor" href="#volatile-\u7981\u6B62\u6307\u4EE4\u91CD\u6392\u89C4\u5219" aria-hidden="true">#</a> volatile \u7981\u6B62\u6307\u4EE4\u91CD\u6392\u89C4\u5219</h2><p>\u6211\u4EEC\u56DE\u987E\u4E00\u4E0B\uFF0C\u91CD\u6392\u5E8F\u9700\u8981\u9075\u5B88\u4E00\u5B9A\u89C4\u5219\uFF1A</p><ul><li>\u91CD\u6392\u5E8F\u64CD\u4F5C\u4E0D\u4F1A\u5BF9\u5B58\u5728\u6570\u636E\u4F9D\u8D56\u5173\u7CFB\u7684\u64CD\u4F5C\u8FDB\u884C\u91CD\u6392\u5E8F\u3002\u6BD4\u5982\uFF1Aa=1;b=a; \u8FD9\u4E2A\u6307\u4EE4\u5E8F\u5217\uFF0C\u7531\u4E8E\u7B2C\u4E8C\u4E2A\u64CD\u4F5C\u4F9D\u8D56\u4E8E\u7B2C\u4E00\u4E2A\u64CD\u4F5C\uFF0C\u6240\u4EE5\u5728\u7F16\u8BD1\u65F6\u548C\u5904\u7406\u5668\u8FD0\u884C\u65F6\u8FD9\u4E24\u4E2A\u64CD\u4F5C\u4E0D\u4F1A\u88AB\u91CD\u6392\u5E8F\u3002</li><li>\u91CD\u6392\u5E8F\u662F\u4E3A\u4E86\u4F18\u5316\u6027\u80FD\uFF0C\u4F46\u662F\u4E0D\u7BA1\u600E\u4E48\u91CD\u6392\u5E8F\uFF0C\u5355\u7EBF\u7A0B\u4E0B\u7A0B\u5E8F\u7684\u6267\u884C\u7ED3\u679C\u4E0D\u80FD\u88AB\u6539\u53D8\u3002\u6BD4\u5982\uFF1Aa=1;b=2;c=a+b \u8FD9\u4E09\u4E2A\u64CD\u4F5C\uFF0C\u7B2C\u4E00\u6B65\uFF08a=1)\u548C\u7B2C\u4E8C\u6B65(b=2)\u7531\u4E8E\u4E0D\u5B58\u5728\u6570\u636E\u4F9D\u8D56\u5173\u7CFB\uFF0C \u6240\u4EE5\u53EF\u80FD\u4F1A\u53D1\u751F\u91CD\u6392\u5E8F\uFF0C\u4F46\u662F c=a+b \u8FD9\u4E2A\u64CD\u4F5C\u662F\u4E0D\u4F1A\u88AB\u91CD\u6392\u5E8F\u7684\uFF0C\u56E0\u4E3A\u9700\u8981\u4FDD\u8BC1\u6700\u7EC8\u7684\u7ED3\u679C\u4E00\u5B9A\u662F c=a+b=3\u3002</li></ul><p>\u4F7F\u7528 volatile \u5173\u952E\u5B57\u4FEE\u9970\u5171\u4EAB\u53D8\u91CF\u53EF\u4EE5\u7981\u6B62\u8FD9\u79CD\u91CD\u6392\u5E8F\u3002\u82E5\u7528 volatile \u4FEE\u9970\u5171\u4EAB\u53D8\u91CF\uFF0C\u5728\u7F16\u8BD1\u65F6\uFF0C\u4F1A\u5728\u6307\u4EE4\u5E8F\u5217\u4E2D\u63D2\u5165\u5185\u5B58\u5C4F\u969C\u6765\u7981\u6B62\u7279\u5B9A\u7C7B\u578B\u7684\u5904\u7406\u5668\u91CD\u6392\u5E8F\uFF0Cvolatile \u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5E8F\u4E5F\u6709\u4E00\u4E9B\u89C4\u5219\uFF1A</p><ul><li>\u5F53\u7A0B\u5E8F\u6267\u884C\u5230 volatile \u53D8\u91CF\u7684\u8BFB\u64CD\u4F5C\u6216\u8005\u5199\u64CD\u4F5C\u65F6\uFF0C\u5728\u5176\u524D\u9762\u7684\u64CD\u4F5C\u7684\u66F4\u6539\u80AF\u5B9A\u5168\u90E8\u5DF2\u7ECF\u8FDB\u884C\uFF0C\u4E14\u7ED3\u679C\u5DF2\u7ECF\u5BF9\u540E\u9762\u7684\u64CD\u4F5C\u53EF\u89C1\uFF1B\u5728\u5176\u540E\u9762\u7684\u64CD\u4F5C\u80AF\u5B9A\u8FD8\u6CA1\u6709\u8FDB\u884C\uFF1B</li><li>\u5728\u8FDB\u884C\u6307\u4EE4\u4F18\u5316\u65F6\uFF0C\u4E0D\u80FD\u5C06\u5BF9 volatile \u53D8\u91CF\u8BBF\u95EE\u7684\u8BED\u53E5\u653E\u5728\u5176\u540E\u9762\u6267\u884C\uFF0C\u4E5F\u4E0D\u80FD\u628A volatile \u53D8\u91CF\u540E\u9762\u7684\u8BED\u53E5\u653E\u5230\u5176\u524D\u9762\u6267\u884C\u3002</li></ul><p>\u201C\u4E8C\u54E5\uFF0C\u80FD\u4E0D\u80FD\u901A\u4FD7\u5730\u8BB2\u8BB2\u554A\uFF1F\u201D</p><p>\u201C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u6267\u884C\u5230 volatile \u53D8\u91CF\u65F6\uFF0C\u5176\u524D\u9762\u7684\u6240\u6709\u8BED\u53E5\u90FD\u6267\u884C\u5B8C\uFF0C\u540E\u9762\u6240\u6709\u8BED\u53E5\u90FD\u672A\u6267\u884C\u3002\u4E14\u524D\u9762\u8BED\u53E5\u7684\u7ED3\u679C\u5BF9 volatile \u53D8\u91CF\u53CA\u5176\u540E\u9762\u8BED\u53E5\u53EF\u89C1\u3002\u201D\u6211\u7785\u4E86\u4E86\u4E09\u59B9\u4E00\u773C\u8BF4\u3002</p><h2 id="volatile-\u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#volatile-\u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5206\u6790" aria-hidden="true">#</a> volatile \u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5206\u6790</h2><p>\u5148\u770B\u4E0B\u9762\u672A\u4F7F\u7528 volatile \u7684\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class ReorderExample {
  int a = 0;
  boolean flag = false;
  public void writer() {
      a = 1;                   //1
      flag = true;             //2
  }
  Public void reader() {
      if (flag) {                //3
          int i =  a * a;        //4
          System.out.println(i);
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),u=i("\u56E0\u4E3A\u91CD\u6392\u5E8F\u5F71\u54CD\uFF0C\u6240\u4EE5\u6700\u7EC8\u7684\u8F93\u51FA\u53EF\u80FD\u662F 0\uFF0C\u5177\u4F53\u5206\u6790\u8BF7\u53C2\u8003"),o={href:"https://mp.weixin.qq.com/s/s983WflPH7jF0-_SpGRfBg",target:"_blank",rel:"noopener noreferrer"},b=i("\u4E0A\u4E00\u7BC7"),m=i("\uFF0C\u5982\u679C\u5F15\u5165 volatile\uFF0C\u6211\u4EEC\u518D\u770B\u4E00\u4E0B\u4EE3\u7801\uFF1A"),p=a(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class ReorderExample {
  int a = 0;
  boolean volatile flag = false;
  public void writer() {
      a = 1;                   //1
      flag = true;             //2
  }
  Public void reader() {
      if (flag) {                //3
          int i =  a * a;        //4
          System.out.println(i);
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u65F6\u5019\uFF0Cvolatile \u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5E8F\u4E5F\u6709\u4E00\u4E9B\u89C4\u5219\uFF0C\u8FD9\u4E2A\u8FC7\u7A0B\u5EFA\u7ACB\u7684 happens before \u5173\u7CFB\u53EF\u4EE5\u5206\u4E3A\u4E24\u7C7B\uFF1A</p><ol><li>\u6839\u636E\u7A0B\u5E8F\u6B21\u5E8F\u89C4\u5219\uFF0C1 happens before 2; 3 happens before 4\u3002</li><li>\u6839\u636E volatile \u89C4\u5219\uFF0C2 happens before 3\u3002</li><li>\u6839\u636E happens before \u7684\u4F20\u9012\u6027\u89C4\u5219\uFF0C1 happens before 4\u3002</li></ol><p>\u4E0A\u8FF0 happens before \u5173\u7CFB\u7684\u56FE\u5F62\u5316\u8868\u73B0\u5F62\u5F0F\u5982\u4E0B\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/volatile-f4de7989-672e-43d6-906b-feffe4fb0a9c.jpg" alt=""></p><p>\u5728\u4E0A\u56FE\u4E2D\uFF0C\u6BCF\u4E00\u4E2A\u7BAD\u5934\u94FE\u63A5\u7684\u4E24\u4E2A\u8282\u70B9\uFF0C\u4EE3\u8868\u4E86\u4E00\u4E2A happens before \u5173\u7CFB:</p><ul><li>\u9ED1\u8272\u7BAD\u5934\u8868\u793A\u7A0B\u5E8F\u987A\u5E8F\u89C4\u5219\uFF1B</li><li>\u6A59\u8272\u7BAD\u5934\u8868\u793A volatile \u89C4\u5219\uFF1B</li><li>\u84DD\u8272\u7BAD\u5934\u8868\u793A\u7EC4\u5408\u8FD9\u4E9B\u89C4\u5219\u540E\u63D0\u4F9B\u7684 happens before \u4FDD\u8BC1\u3002</li></ul><p>\u8FD9\u91CC A \u7EBF\u7A0B\u5199\u4E00\u4E2A volatile \u53D8\u91CF\u540E\uFF0CB \u7EBF\u7A0B\u8BFB\u540C\u4E00\u4E2A volatile \u53D8\u91CF\u3002A \u7EBF\u7A0B\u5728\u5199 volatile \u53D8\u91CF\u4E4B\u524D\u6240\u6709\u53EF\u89C1\u7684\u5171\u4EAB\u53D8\u91CF\uFF0C\u5728 B \u7EBF\u7A0B\u8BFB\u540C\u4E00\u4E2A volatile \u53D8\u91CF\u540E\uFF0C\u5C06\u7ACB\u5373\u53D8\u5F97\u5BF9 B \u7EBF\u7A0B\u53EF\u89C1\u3002</p><h2 id="volatile-\u4E0D\u9002\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#volatile-\u4E0D\u9002\u7528\u573A\u666F" aria-hidden="true">#</a> volatile \u4E0D\u9002\u7528\u573A\u666F</h2><h3 id="volatile-\u4E0D\u9002\u5408\u590D\u5408\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#volatile-\u4E0D\u9002\u5408\u590D\u5408\u64CD\u4F5C" aria-hidden="true">#</a> volatile \u4E0D\u9002\u5408\u590D\u5408\u64CD\u4F5C</h3><p>\u4E0B\u9762\u662F\u53D8\u91CF\u81EA\u52A0\u7684\u793A\u4F8B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class volatileTest {
    public volatile int inc = 0;
    public void increase() {
        inc++;
    }
    public static void main(String[] args) {
        final volatileTest test = new volatileTest();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //\u4FDD\u8BC1\u524D\u9762\u7684\u7EBF\u7A0B\u90FD\u6267\u884C\u5B8C
            Thread.yield();
        System.out.println(&quot;inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6D4B\u8BD5\u8F93\u51FA\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>inc output:8182
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u201C\u4E3A\u4EC0\u4E48\u5440\uFF1F\u4E8C\u54E5\uFF1F\u201D\u4E09\u59B9\u7591\u60D1\u5730\u95EE\u3002</p><p>\u201C\u56E0\u4E3A inc++\u4E0D\u662F\u4E00\u4E2A\u539F\u5B50\u6027\u64CD\u4F5C\uFF0C\u7531\u8BFB\u53D6\u3001\u52A0\u3001\u8D4B\u503C 3 \u6B65\u7EC4\u6210\uFF0C\u6240\u4EE5\u7ED3\u679C\u5E76\u4E0D\u80FD\u8FBE\u5230 10000\u3002\u201D\u6211\u8010\u5FC3\u5730\u56DE\u7B54\u3002</p><p>\u201C\u54E6\uFF0C\u4F60\u8FD9\u6837\u8BF4\u6211\u5C31\u7406\u89E3\u4E86\u3002\u201D\u4E09\u59B9\u70B9\u70B9\u5934\u3002</p><h3 id="\u89E3\u51B3\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6CD5" aria-hidden="true">#</a> \u89E3\u51B3\u65B9\u6CD5</h3><p>\u91C7\u7528 synchronized\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class volatileTest1 {
    public int inc = 0;
    public synchronized void increase() {
        inc++;
    }
    public static void main(String[] args) {
        final volatileTest1 test = new volatileTest1();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //\u4FDD\u8BC1\u524D\u9762\u7684\u7EBF\u7A0B\u90FD\u6267\u884C\u5B8C
            Thread.yield();
        System.out.println(&quot;add synchronized, inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u91C7\u7528 Lock\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class volatileTest2 {
    public int inc = 0;
    Lock lock = new ReentrantLock();
    public void increase() {
        lock.lock();
        inc++;
        lock.unlock();
    }
    public static void main(String[] args) {
        final volatileTest2 test = new volatileTest2();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //\u4FDD\u8BC1\u524D\u9762\u7684\u7EBF\u7A0B\u90FD\u6267\u884C\u5B8C
            Thread.yield();
        System.out.println(&quot;add lock, inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u91C7\u7528 AtomicInteger\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class volatileTest3 {
    public AtomicInteger inc = new AtomicInteger();
    public void increase() {
        inc.getAndIncrement();
    }
    public static void main(String[] args) {
        final volatileTest3 test = new volatileTest3();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;100;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //\u4FDD\u8BC1\u524D\u9762\u7684\u7EBF\u7A0B\u90FD\u6267\u884C\u5B8C
            Thread.yield();
        System.out.println(&quot;add AtomicInteger, inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E09\u8005\u8F93\u51FA\u90FD\u662F 1000\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>add synchronized, inc output:1000
add lock, inc output:1000
add AtomicInteger, inc output:1000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5355\u4F8B\u6A21\u5F0F\u7684\u53CC\u91CD\u9501\u8981\u52A0volatile" tabindex="-1"><a class="header-anchor" href="#\u5355\u4F8B\u6A21\u5F0F\u7684\u53CC\u91CD\u9501\u8981\u52A0volatile" aria-hidden="true">#</a> \u5355\u4F8B\u6A21\u5F0F\u7684\u53CC\u91CD\u9501\u8981\u52A0volatile</h2><p>\u5148\u770B\u4E00\u4E0B\u5355\u4F8B\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class penguin {
    private static volatile penguin m_penguin = null;
    // \u907F\u514D\u901A\u8FC7new\u521D\u59CB\u5316\u5BF9\u8C61
    private void penguin() {}
    public void beating() {
        System.out.println(&quot;\u6253\u8C46\u8C46&quot;);
    };
    public static penguin getInstance() {      //1
        if (null == m_penguin) {               //2
            synchronized(penguin.class) {      //3
                if (null == m_penguin) {       //4
                    m_penguin = new penguin(); //5
                }
            }
        }
        return m_penguin;                      //6
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u5E76\u53D1\u60C5\u51B5\u4E0B\uFF0C\u5982\u679C\u6CA1\u6709 volatile \u5173\u952E\u5B57\uFF0C\u5728\u7B2C 5 \u884C\u4F1A\u51FA\u73B0\u95EE\u9898\u3002instance = new TestInstance();\u53EF\u4EE5\u5206\u89E3\u4E3A 3 \u884C\u4F2A\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>a. memory = allocate() //\u5206\u914D\u5185\u5B58
b. ctorInstanc(memory) //\u521D\u59CB\u5316\u5BF9\u8C61
c. instance = memory   //\u8BBE\u7F6Einstance\u6307\u5411\u521A\u5206\u914D\u7684\u5730\u5740
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u4EE3\u7801\u5728\u7F16\u8BD1\u8FD0\u884C\u65F6\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u91CD\u6392\u5E8F\u4ECE a-b-c \u6392\u5E8F\u4E3A a-c-b\u3002\u5728\u591A\u7EBF\u7A0B\u7684\u60C5\u51B5\u4E0B\u4F1A\u51FA\u73B0\u4EE5\u4E0B\u95EE\u9898\u3002</p><p>\u5F53\u7EBF\u7A0B A \u5728\u6267\u884C\u7B2C 5 \u884C\u4EE3\u7801\u65F6\uFF0CB \u7EBF\u7A0B\u8FDB\u6765\u6267\u884C\u5230\u7B2C 2 \u884C\u4EE3\u7801\u3002\u5047\u8BBE\u6B64\u65F6 A \u6267\u884C\u7684\u8FC7\u7A0B\u4E2D\u53D1\u751F\u4E86\u6307\u4EE4\u91CD\u6392\u5E8F\uFF0C\u5373\u5148\u6267\u884C\u4E86 a \u548C c\uFF0C\u6CA1\u6709\u6267\u884C b\u3002\u90A3\u4E48\u7531\u4E8E A \u7EBF\u7A0B\u6267\u884C\u4E86 c \u5BFC\u81F4 instance \u6307\u5411\u4E86\u4E00\u6BB5\u5730\u5740\uFF0C\u6240\u4EE5 B \u7EBF\u7A0B\u5224\u65AD instance \u4E0D\u4E3A null\uFF0C\u4F1A\u76F4\u63A5\u8DF3\u5230\u7B2C 6 \u884C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u672A\u521D\u59CB\u5316\u7684\u5BF9\u8C61\u3002</p><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u201C\u597D\u4E86\uFF0C\u4E09\u59B9\uFF0C\u6211\u4EEC\u6765\u603B\u7ED3\u4E00\u4E0B\u3002\u201D\u6211\u8212\u4E86\u4E00\u53E3\u6C14\u8BF4\u3002</p><p>volatile \u53EF\u4EE5\u4FDD\u8BC1\u7EBF\u7A0B\u53EF\u89C1\u6027\u4E14\u63D0\u4F9B\u4E86\u4E00\u5B9A\u7684\u6709\u5E8F\u6027\uFF0C\u4F46\u662F\u65E0\u6CD5\u4FDD\u8BC1\u539F\u5B50\u6027\u3002\u5728 JVM \u5E95\u5C42 volatile \u662F\u91C7\u7528\u201C\u5185\u5B58\u5C4F\u969C\u201D\u6765\u5B9E\u73B0\u7684\u3002</p><p>\u89C2\u5BDF\u52A0\u5165 volatile \u5173\u952E\u5B57\u548C\u6CA1\u6709\u52A0\u5165 volatile \u5173\u952E\u5B57\u65F6\u6240\u751F\u6210\u7684\u6C47\u7F16\u4EE3\u7801\u53D1\u73B0\uFF0C\u52A0\u5165 volatile \u5173\u952E\u5B57\u65F6\uFF0C\u4F1A\u591A\u51FA\u4E00\u4E2A lock \u524D\u7F00\u6307\u4EE4\uFF0Clock \u524D\u7F00\u6307\u4EE4\u5B9E\u9645\u4E0A\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5185\u5B58\u5C4F\u969C\uFF08\u4E5F\u79F0\u5185\u5B58\u6805\u680F\uFF09\uFF0C\u5185\u5B58\u5C4F\u969C\u4F1A\u63D0\u4F9B 3 \u4E2A\u529F\u80FD\uFF1A</p><ul><li>\u5B83\u786E\u4FDD\u6307\u4EE4\u91CD\u6392\u5E8F\u65F6\u4E0D\u4F1A\u628A\u5176\u540E\u9762\u7684\u6307\u4EE4\u6392\u5230\u5185\u5B58\u5C4F\u969C\u4E4B\u524D\u7684\u4F4D\u7F6E\uFF0C\u4E5F\u4E0D\u4F1A\u628A\u524D\u9762\u7684\u6307\u4EE4\u6392\u5230\u5185\u5B58\u5C4F\u969C\u7684\u540E\u9762\uFF1B\u5373\u5728\u6267\u884C\u5230\u5185\u5B58\u5C4F\u969C\u8FD9\u53E5\u6307\u4EE4\u65F6\uFF0C\u5728\u5B83\u524D\u9762\u7684\u64CD\u4F5C\u5DF2\u7ECF\u5168\u90E8\u5B8C\u6210\uFF1B</li><li>\u5B83\u4F1A\u5F3A\u5236\u5C06\u5BF9\u7F13\u5B58\u7684\u4FEE\u6539\u64CD\u4F5C\u7ACB\u5373\u5199\u5165\u4E3B\u5B58\uFF1B</li><li>\u5982\u679C\u662F\u5199\u64CD\u4F5C\uFF0C\u5B83\u4F1A\u5BFC\u81F4\u5176\u4ED6 CPU \u4E2D\u5BF9\u5E94\u7684\u7F13\u5B58\u884C\u65E0\u6548\u3002</li></ul><p>\u6700\u540E\uFF0C\u6211\u4EEC\u5B66\u4E60\u4E86 volatile \u4E0D\u9002\u7528\u7684\u573A\u666F\uFF0C\u4EE5\u53CA\u89E3\u51B3\u7684\u65B9\u6CD5\uFF0C\u5E76\u89E3\u91CA\u4E86\u5355\u4F8B\u6A21\u5F0F\u4E3A\u4F55\u9700\u8981\u4F7F\u7528 volatile\u3002</p><hr>`,40),h=i("\u6700\u8FD1\u6574\u7406\u4E86\u4E00\u4EFD\u725B\u903C\u7684\u5B66\u4E60\u8D44\u6599\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8EJava\u57FA\u7840\u90E8\u5206\uFF08JVM\u3001Java\u96C6\u5408\u6846\u67B6\u3001\u591A\u7EBF\u7A0B\uFF09\uFF0C\u8FD8\u56CA\u62EC\u4E86 "),g=e("strong",null,"\u6570\u636E\u5E93\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC\u3001\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784\u3001\u8BBE\u8BA1\u6A21\u5F0F\u3001\u6846\u67B6\u7C7BSpring\u3001Netty\u3001\u5FAE\u670D\u52A1\uFF08Dubbo\uFF0C\u6D88\u606F\u961F\u5217\uFF09 \u7F51\u5173",-1),f=i(" \u7B49\u7B49\u7B49\u7B49\u2026\u2026\u8BE6\u60C5\u6233\uFF1A"),x={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},_=i("\u53EF\u4EE5\u8BF4\u662F2022\u5E74\u5168\u7F51\u6700\u5168\u7684\u5B66\u4E60\u548C\u627E\u5DE5\u4F5C\u7684PDF\u8D44\u6E90\u4E86"),T=e("p",null,[i("\u5173\u6CE8\u4E8C\u54E5\u7684\u539F\u521B\u516C\u4F17\u53F7 "),e("strong",null,"\u6C89\u9ED8\u738B\u4E8C"),i("\uFF0C\u56DE\u590D"),e("strong",null,"111"),i(" \u5373\u53EF\u514D\u8D39\u9886\u53D6\u3002")],-1),j=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:""})],-1);function w(y,k){const n=d("ExternalLinkIcon");return t(),v("div",null,[c,e("p",null,[u,e("a",o,[b,l(n)]),m]),p,e("p",null,[h,g,f,e("a",x,[_,l(n)])]),T,j])}var A=s(r,[["render",w],["__file","volatile.html.vue"]]);export{A as default};
