import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r,o as c,c as a,a as n,b as s,d as i,e as d}from"./app.c8e9fe1d.js";const t={},v=n("p",null,"\u4E8C\u54E5\uFF1A\u201C\u4E09\u59B9\uFF0C\u4ECA\u5929\u6211\u4EEC\u6765\u5B66\u4E60 synchronized \u5173\u952E\u5B57\u7684\u5E94\u7528\u65B9\u5F0F\u548C\u5185\u5B58\u8BED\u4E49\u5427\u3002\u201D",-1),o=n("p",null,"\u4E09\u59B9\uFF08\u989C\u503C\u5728\u7EBF\uFF0C\u6C14\u8D28\u4E5F\u5728\u7EBF\uFF09\uFF1A\u201C\u597D\u7684\u3002\u201D",-1),u=n("h2",{id:"\u524D\u8A00",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u524D\u8A00","aria-hidden":"true"},"#"),i(" \u524D\u8A00")],-1),b=i("\u5EFA\u8BAE\u5927\u5BB6\u5148\u770B\u524D\u9762\u7684\u6587\u7AE0\u300A"),m={href:"https://mp.weixin.qq.com/s/s983WflPH7jF0-_SpGRfBg",target:"_blank",rel:"noopener noreferrer"},h=i("Java \u5E76\u53D1\u7F16\u7A0B\u7CFB\u5217 1-\u57FA\u7840\u77E5\u8BC6"),p=i("\u300B\uFF0C\u7279\u522B\u662F\u5E76\u53D1\u7F16\u7A0B\u76F8\u5173\u7684\u53EF\u89C1\u6027\u3001\u6709\u5E8F\u6027\uFF0C\u4EE5\u53CA\u5185\u5B58\u6A21\u578B JMM \u7B49\u3002"),y=d(`<p>\u5728 Java \u4E2D\uFF0C\u5173\u952E\u5B57 synchronized \u53EF\u4EE5\u4FDD\u8BC1\u5728\u540C\u4E00\u4E2A\u65F6\u523B\uFF0C\u53EA\u6709\u4E00\u4E2A\u7EBF\u7A0B\u53EF\u4EE5\u6267\u884C\u67D0\u4E2A\u65B9\u6CD5\u6216\u8005\u67D0\u4E2A\u4EE3\u7801\u5757(\u4E3B\u8981\u662F\u5BF9\u65B9\u6CD5\u6216\u8005\u4EE3\u7801\u5757\u4E2D\u5B58\u5728\u5171\u4EAB\u6570\u636E\u7684\u64CD\u4F5C)\uFF0C\u540C\u65F6\u6211\u4EEC\u8FD8\u5E94\u8BE5\u6CE8\u610F\u5230 synchronized \u53E6\u5916\u4E00\u4E2A\u91CD\u8981\u7684\u4F5C\u7528\uFF0Csynchronized \u53EF\u4FDD\u8BC1\u4E00\u4E2A\u7EBF\u7A0B\u7684\u53D8\u5316(\u4E3B\u8981\u662F\u5171\u4EAB\u6570\u636E\u7684\u53D8\u5316)\u88AB\u5176\u4ED6\u7EBF\u7A0B\u6240\u770B\u5230\uFF08\u4FDD\u8BC1\u53EF\u89C1\u6027\uFF0C\u5B8C\u5168\u53EF\u4EE5\u66FF\u4EE3 Volatile \u529F\u80FD\uFF09\u3002</p><h2 id="synchronized-\u7684\u4E09\u79CD\u5E94\u7528\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#synchronized-\u7684\u4E09\u79CD\u5E94\u7528\u65B9\u5F0F" aria-hidden="true">#</a> synchronized \u7684\u4E09\u79CD\u5E94\u7528\u65B9\u5F0F</h2><p>synchronized \u5173\u952E\u5B57\u6700\u4E3B\u8981\u6709\u4EE5\u4E0B 3 \u79CD\u5E94\u7528\u65B9\u5F0F\uFF0C\u4E0B\u9762\u5206\u522B\u4ECB\u7ECD\uFF1A</p><ul><li>\u4FEE\u9970\u5B9E\u4F8B\u65B9\u6CD5\uFF0C\u4F5C\u7528\u4E8E\u5F53\u524D\u5B9E\u4F8B\u52A0\u9501\uFF0C\u8FDB\u5165\u540C\u6B65\u4EE3\u7801\u524D\u8981\u83B7\u5F97\u5F53\u524D\u5B9E\u4F8B\u7684\u9501\uFF1B</li><li>\u4FEE\u9970\u9759\u6001\u65B9\u6CD5\uFF0C\u4F5C\u7528\u4E8E\u5F53\u524D\u7C7B\u5BF9\u8C61\u52A0\u9501\uFF0C\u8FDB\u5165\u540C\u6B65\u4EE3\u7801\u524D\u8981\u83B7\u5F97\u5F53\u524D\u7C7B\u5BF9\u8C61\u7684\u9501\uFF1B</li><li>\u4FEE\u9970\u4EE3\u7801\u5757\uFF0C\u6307\u5B9A\u52A0\u9501\u5BF9\u8C61\uFF0C\u5BF9\u7ED9\u5B9A\u5BF9\u8C61\u52A0\u9501\uFF0C\u8FDB\u5165\u540C\u6B65\u4EE3\u7801\u5E93\u524D\u8981\u83B7\u5F97\u7ED9\u5B9A\u5BF9\u8C61\u7684\u9501\u3002</li></ul><h3 id="synchronized-\u4F5C\u7528\u4E8E\u5B9E\u4F8B\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#synchronized-\u4F5C\u7528\u4E8E\u5B9E\u4F8B\u65B9\u6CD5" aria-hidden="true">#</a> synchronized \u4F5C\u7528\u4E8E\u5B9E\u4F8B\u65B9\u6CD5</h3><p>\u6240\u8C13\u7684\u5B9E\u4F8B\u5BF9\u8C61\u9501\u5C31\u662F\u7528 synchronized \u4FEE\u9970\u5B9E\u4F8B\u5BF9\u8C61\u4E2D\u7684\u5B9E\u4F8B\u65B9\u6CD5\uFF0C\u6CE8\u610F\u662F\u5B9E\u4F8B\u65B9\u6CD5\u4E0D\u5305\u62EC\u9759\u6001\u65B9\u6CD5\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class AccountingSync implements Runnable {
    //\u5171\u4EAB\u8D44\u6E90(\u4E34\u754C\u8D44\u6E90)
    static int i = 0;
    // synchronized \u4FEE\u9970\u5B9E\u4F8B\u65B9\u6CD5
    public synchronized void increase() {
        i ++;
    }
    @Override
    public void run() {
        for(int j=0;j&lt;1000000;j++){
            increase();
        }
    }
    public static void main(String args[]) throws InterruptedException {
        AccountingSync instance = new AccountingSync();
        Thread t1 = new Thread(instance);
        Thread t2 = new Thread(instance);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(&quot;static, i output:&quot; + i);
    }
}
/**
 * \u8F93\u51FA\u7ED3\u679C:
 * static, i output:2000000
 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),g=i("\u5982\u679C\u5728\u51FD\u6570 increase()\u524D\u4E0D\u52A0 synchronized\uFF0C\u56E0\u4E3A i++\u4E0D\u5177\u5907\u539F\u5B50\u6027\uFF0C\u6240\u4EE5\u6700\u7EC8\u7ED3\u679C\u4F1A\u5C0F\u4E8E 2000000\uFF0C\u5177\u4F53\u5206\u6790\u53EF\u4EE5\u53C2\u8003\u6587\u7AE0\u300A"),_={href:"https://mp.weixin.qq.com/s/xVtPNc6y3_cfKlNUtVQDKA",target:"_blank",rel:"noopener noreferrer"},z=i("Java \u5E76\u53D1\u7F16\u7A0B\u7CFB\u5217 2-volatile"),f=i("\u300B\u3002\u4E0B\u9762\u8FD9\u70B9\u975E\u5E38\u91CD\u8981\uFF1A"),x=d(`<blockquote><p>\u4E00\u4E2A\u5BF9\u8C61\u53EA\u6709\u4E00\u628A\u9501\uFF0C\u5F53\u4E00\u4E2A\u7EBF\u7A0B\u83B7\u53D6\u4E86\u8BE5\u5BF9\u8C61\u7684\u9501\u4E4B\u540E\uFF0C\u5176\u4ED6\u7EBF\u7A0B\u65E0\u6CD5\u83B7\u53D6\u8BE5\u5BF9\u8C61\u7684\u9501\uFF0C\u6240\u4EE5\u65E0\u6CD5\u8BBF\u95EE\u8BE5\u5BF9\u8C61\u7684\u5176\u4ED6 synchronized \u5B9E\u4F8B\u65B9\u6CD5\uFF0C\u4F46\u662F\u5176\u4ED6\u7EBF\u7A0B\u8FD8\u662F\u53EF\u4EE5\u8BBF\u95EE\u8BE5\u5B9E\u4F8B\u5BF9\u8C61\u7684\u5176\u4ED6\u975E synchronized \u65B9\u6CD5\u3002</p></blockquote><p>\u4F46\u662F\u4E00\u4E2A\u7EBF\u7A0B A \u9700\u8981\u8BBF\u95EE\u5B9E\u4F8B\u5BF9\u8C61 obj1 \u7684 synchronized \u65B9\u6CD5 f1(\u5F53\u524D\u5BF9\u8C61\u9501\u662F obj1)\uFF0C\u53E6\u4E00\u4E2A\u7EBF\u7A0B B \u9700\u8981\u8BBF\u95EE\u5B9E\u4F8B\u5BF9\u8C61 obj2 \u7684 synchronized \u65B9\u6CD5 f2(\u5F53\u524D\u5BF9\u8C61\u9501\u662F obj2)\uFF0C\u8FD9\u6837\u662F\u5141\u8BB8\u7684\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class AccountingSyncBad implements Runnable {
    //\u5171\u4EAB\u8D44\u6E90(\u4E34\u754C\u8D44\u6E90)
    static int i = 0;
    // synchronized \u4FEE\u9970\u5B9E\u4F8B\u65B9\u6CD5
    public synchronized void increase() {
        i ++;
    }
    @Override
    public void run() {
        for(int j=0;j&lt;1000000;j++){
            increase();
        }
    }
    public static void main(String args[]) throws InterruptedException {
        // new \u4E24\u4E2AAccountingSync\u65B0\u5B9E\u4F8B
        Thread t1 = new Thread(new AccountingSyncBad());
        Thread t2 = new Thread(new AccountingSyncBad());
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(&quot;static, i output:&quot; + i);
    }
}
/**
 * \u8F93\u51FA\u7ED3\u679C:
 * static, i output:1224617
 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u8FF0\u4EE3\u7801\u4E0E\u524D\u9762\u4E0D\u540C\u7684\u662F\u6211\u4EEC\u540C\u65F6\u521B\u5EFA\u4E86\u4E24\u4E2A\u65B0\u5B9E\u4F8B AccountingSyncBad\uFF0C\u7136\u540E\u542F\u52A8\u4E24\u4E2A\u4E0D\u540C\u7684\u7EBF\u7A0B\u5BF9\u5171\u4EAB\u53D8\u91CF i \u8FDB\u884C\u64CD\u4F5C\uFF0C\u4F46\u5F88\u9057\u61BE\u64CD\u4F5C\u7ED3\u679C\u662F 1224617 \u800C\u4E0D\u662F\u671F\u671B\u7ED3\u679C 2000000\uFF0C\u56E0\u4E3A\u4E0A\u8FF0\u4EE3\u7801\u72AF\u4E86\u4E25\u91CD\u7684\u9519\u8BEF\uFF0C\u867D\u7136\u6211\u4EEC\u4F7F\u7528 synchronized \u4FEE\u9970\u4E86 increase \u65B9\u6CD5\uFF0C\u4F46\u5374 new \u4E86\u4E24\u4E2A\u4E0D\u540C\u7684\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u8FD9\u4E5F\u5C31\u610F\u5473\u7740\u5B58\u5728\u7740\u4E24\u4E2A\u4E0D\u540C\u7684\u5B9E\u4F8B\u5BF9\u8C61\u9501\uFF0C\u56E0\u6B64 t1 \u548C t2 \u90FD\u4F1A\u8FDB\u5165\u5404\u81EA\u7684\u5BF9\u8C61\u9501\uFF0C\u4E5F\u5C31\u662F\u8BF4 t1 \u548C t2 \u7EBF\u7A0B\u4F7F\u7528\u7684\u662F\u4E0D\u540C\u7684\u9501\uFF0C\u56E0\u6B64\u7EBF\u7A0B\u5B89\u5168\u662F\u65E0\u6CD5\u4FDD\u8BC1\u7684\u3002</p><blockquote><p>\u6BCF\u4E2A\u5BF9\u8C61\u90FD\u6709\u4E00\u4E2A\u5BF9\u8C61\u9501\uFF0C\u4E0D\u540C\u7684\u5BF9\u8C61\uFF0C\u4ED6\u4EEC\u7684\u9501\u4E0D\u4F1A\u4E92\u76F8\u5F71\u54CD\u3002</p></blockquote><p>\u89E3\u51B3\u8FD9\u79CD\u56F0\u5883\u7684\u7684\u65B9\u5F0F\u662F\u5C06 synchronized \u4F5C\u7528\u4E8E\u9759\u6001\u7684 increase \u65B9\u6CD5\uFF0C\u8FD9\u6837\u7684\u8BDD\uFF0C\u5BF9\u8C61\u9501\u5C31\u5F53\u524D\u7C7B\u5BF9\u8C61\uFF0C\u7531\u4E8E\u65E0\u8BBA\u521B\u5EFA\u591A\u5C11\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u4F46\u5BF9\u4E8E\u7684\u7C7B\u5BF9\u8C61\u62E5\u6709\u53EA\u6709\u4E00\u4E2A\uFF0C\u6240\u6709\u5728\u8FD9\u6837\u7684\u60C5\u51B5\u4E0B\u5BF9\u8C61\u9501\u5C31\u662F\u552F\u4E00\u7684\u3002\u4E0B\u9762\u6211\u4EEC\u770B\u770B\u5982\u4F55\u4F7F\u7528\u5C06 synchronized \u4F5C\u7528\u4E8E\u9759\u6001\u7684 increase \u65B9\u6CD5\u3002</p><h3 id="synchronized-\u4F5C\u7528\u4E8E\u9759\u6001\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#synchronized-\u4F5C\u7528\u4E8E\u9759\u6001\u65B9\u6CD5" aria-hidden="true">#</a> synchronized \u4F5C\u7528\u4E8E\u9759\u6001\u65B9\u6CD5</h3><blockquote><p>\u5F53 synchronized \u4F5C\u7528\u4E8E\u9759\u6001\u65B9\u6CD5\u65F6\uFF0C\u5176\u9501\u5C31\u662F\u5F53\u524D\u7C7B\u7684 class \u9501\uFF0C\u4E0D\u5C5E\u4E8E\u67D0\u4E2A\u5BF9\u8C61\u3002</p><p>\u5F53\u524D\u7C7B class \u9501\u88AB\u83B7\u53D6\uFF0C\u4E0D\u5F71\u54CD\u5BF9\u8C61\u9501\u7684\u83B7\u53D6\uFF0C\u4E24\u8005\u4E92\u4E0D\u5F71\u54CD\u3002</p></blockquote><p>\u7531\u4E8E\u9759\u6001\u6210\u5458\u4E0D\u4E13\u5C5E\u4E8E\u4EFB\u4F55\u4E00\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u662F\u7C7B\u6210\u5458\uFF0C\u56E0\u6B64\u901A\u8FC7 class \u5BF9\u8C61\u9501\u53EF\u4EE5\u63A7\u5236\u9759\u6001\u6210\u5458\u7684\u5E76\u53D1\u64CD\u4F5C\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\u5982\u679C\u4E00\u4E2A\u7EBF\u7A0B A \u8C03\u7528\u4E00\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\u7684\u975E static synchronized \u65B9\u6CD5\uFF0C\u800C\u7EBF\u7A0B B \u9700\u8981\u8C03\u7528\u8FD9\u4E2A\u5B9E\u4F8B\u5BF9\u8C61\u6240\u5C5E\u7C7B\u7684\u9759\u6001 synchronized \u65B9\u6CD5\uFF0C\u4E0D\u4F1A\u53D1\u751F\u4E92\u65A5\u73B0\u8C61\uFF0C\u56E0\u4E3A\u8BBF\u95EE\u9759\u6001 synchronized \u65B9\u6CD5\u5360\u7528\u7684\u9501\u662F\u5F53\u524D\u7C7B\u7684 class \u5BF9\u8C61\uFF0C\u800C\u8BBF\u95EE\u975E\u9759\u6001 synchronized \u65B9\u6CD5\u5360\u7528\u7684\u9501\u662F\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\u9501\uFF0C\u770B\u5982\u4E0B\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class AccountingSyncClass implements Runnable {
    static int i = 0;
    /**
     * \u4F5C\u7528\u4E8E\u9759\u6001\u65B9\u6CD5,\u9501\u662F\u5F53\u524Dclass\u5BF9\u8C61,\u4E5F\u5C31\u662F
     * AccountingSyncClass\u7C7B\u5BF9\u5E94\u7684class\u5BF9\u8C61
     */
    public static synchronized void increase() {
        i++;
    }
    // \u975E\u9759\u6001,\u8BBF\u95EE\u65F6\u9501\u4E0D\u4E00\u6837\u4E0D\u4F1A\u53D1\u751F\u4E92\u65A5
    public synchronized void increase4Obj() {
        i++;
    }
    @Override
    public void run() {
        for(int j=0;j&lt;1000000;j++){
            increase();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        //new\u65B0\u5B9E\u4F8B
        Thread t1=new Thread(new AccountingSyncClass());
        //new\u65B0\u5B9E\u4F8B
        Thread t2=new Thread(new AccountingSyncClass());
        //\u542F\u52A8\u7EBF\u7A0B
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
/**
 * \u8F93\u51FA\u7ED3\u679C:
 * 2000000
 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7531\u4E8E synchronized \u5173\u952E\u5B57\u4FEE\u9970\u7684\u662F\u9759\u6001 increase \u65B9\u6CD5\uFF0C\u4E0E\u4FEE\u9970\u5B9E\u4F8B\u65B9\u6CD5\u4E0D\u540C\u7684\u662F\uFF0C\u5176\u9501\u5BF9\u8C61\u662F\u5F53\u524D\u7C7B\u7684 class \u5BF9\u8C61\u3002\u6CE8\u610F\u4EE3\u7801\u4E2D\u7684 increase4Obj \u65B9\u6CD5\u662F\u5B9E\u4F8B\u65B9\u6CD5\uFF0C\u5176\u5BF9\u8C61\u9501\u662F\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\uFF0C\u5982\u679C\u522B\u7684\u7EBF\u7A0B\u8C03\u7528\u8BE5\u65B9\u6CD5\uFF0C\u5C06\u4E0D\u4F1A\u4EA7\u751F\u4E92\u65A5\u73B0\u8C61\uFF0C\u6BD5\u7ADF\u9501\u5BF9\u8C61\u4E0D\u540C\uFF0C\u4F46\u6211\u4EEC\u5E94\u8BE5\u610F\u8BC6\u5230\u8FD9\u79CD\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u53D1\u73B0\u7EBF\u7A0B\u5B89\u5168\u95EE\u9898(\u64CD\u4F5C\u4E86\u5171\u4EAB\u9759\u6001\u53D8\u91CF i)\u3002</p><h3 id="synchronized-\u540C\u6B65\u4EE3\u7801\u5757" tabindex="-1"><a class="header-anchor" href="#synchronized-\u540C\u6B65\u4EE3\u7801\u5757" aria-hidden="true">#</a> synchronized \u540C\u6B65\u4EE3\u7801\u5757</h3><p>\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u7F16\u5199\u7684\u65B9\u6CD5\u4F53\u53EF\u80FD\u6BD4\u8F83\u5927\uFF0C\u540C\u65F6\u5B58\u5728\u4E00\u4E9B\u6BD4\u8F83\u8017\u65F6\u7684\u64CD\u4F5C\uFF0C\u800C\u9700\u8981\u540C\u6B65\u7684\u4EE3\u7801\u53C8\u53EA\u6709\u4E00\u5C0F\u90E8\u5206\uFF0C\u5982\u679C\u76F4\u63A5\u5BF9\u6574\u4E2A\u65B9\u6CD5\u8FDB\u884C\u540C\u6B65\u64CD\u4F5C\uFF0C\u53EF\u80FD\u4F1A\u5F97\u4E0D\u507F\u5931\uFF0C\u6B64\u65F6\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u540C\u6B65\u4EE3\u7801\u5757\u7684\u65B9\u5F0F\u5BF9\u9700\u8981\u540C\u6B65\u7684\u4EE3\u7801\u8FDB\u884C\u5305\u88F9\uFF0C\u8FD9\u6837\u5C31\u65E0\u9700\u5BF9\u6574\u4E2A\u65B9\u6CD5\u8FDB\u884C\u540C\u6B65\u64CD\u4F5C\u4E86\uFF0C\u540C\u6B65\u4EE3\u7801\u5757\u7684\u4F7F\u7528\u793A\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class AccountingSync2 implements Runnable {
    static AccountingSync2 instance = new AccountingSync2(); // \u997F\u6C49\u5355\u4F8B\u6A21\u5F0F
    static int i=0;
    @Override
    public void run() {
        //\u7701\u7565\u5176\u4ED6\u8017\u65F6\u64CD\u4F5C....
        //\u4F7F\u7528\u540C\u6B65\u4EE3\u7801\u5757\u5BF9\u53D8\u91CFi\u8FDB\u884C\u540C\u6B65\u64CD\u4F5C,\u9501\u5BF9\u8C61\u4E3Ainstance
        synchronized(instance){
            for(int j=0;j&lt;1000000;j++){
                i++;
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(instance);
        Thread t2=new Thread(instance);
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
/**
 * \u8F93\u51FA\u7ED3\u679C:
 * 2000000
 */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u4EE3\u7801\u770B\u51FA\uFF0C\u5C06 synchronized \u4F5C\u7528\u4E8E\u4E00\u4E2A\u7ED9\u5B9A\u7684\u5B9E\u4F8B\u5BF9\u8C61 instance\uFF0C\u5373\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\u5C31\u662F\u9501\u5BF9\u8C61\uFF0C\u6BCF\u6B21\u5F53\u7EBF\u7A0B\u8FDB\u5165 synchronized \u5305\u88F9\u7684\u4EE3\u7801\u5757\u65F6\u5C31\u4F1A\u8981\u6C42\u5F53\u524D\u7EBF\u7A0B\u6301\u6709 instance \u5B9E\u4F8B\u5BF9\u8C61\u9501\uFF0C\u5982\u679C\u5F53\u524D\u6709\u5176\u4ED6\u7EBF\u7A0B\u6B63\u6301\u6709\u8BE5\u5BF9\u8C61\u9501\uFF0C\u90A3\u4E48\u65B0\u5230\u7684\u7EBF\u7A0B\u5C31\u5FC5\u987B\u7B49\u5F85\uFF0C\u8FD9\u6837\u4E5F\u5C31\u4FDD\u8BC1\u4E86\u6BCF\u6B21\u53EA\u6709\u4E00\u4E2A\u7EBF\u7A0B\u6267\u884C i++;\u64CD\u4F5C\u3002\u5F53\u7136\u9664\u4E86 instance \u4F5C\u4E3A\u5BF9\u8C61\u5916\uFF0C\u6211\u4EEC\u8FD8\u53EF\u4EE5\u4F7F\u7528 this \u5BF9\u8C61(\u4EE3\u8868\u5F53\u524D\u5B9E\u4F8B)\u6216\u8005\u5F53\u524D\u7C7B\u7684 class \u5BF9\u8C61\u4F5C\u4E3A\u9501\uFF0C\u5982\u4E0B\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//this,\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\u9501
synchronized(this){
    for(int j=0;j&lt;1000000;j++){
        i++;
    }
}
//class\u5BF9\u8C61\u9501
synchronized(AccountingSync.class){
    for(int j=0;j&lt;1000000;j++){
        i++;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="synchronized-\u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#synchronized-\u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5206\u6790" aria-hidden="true">#</a> synchronized \u7981\u6B62\u6307\u4EE4\u91CD\u6392\u5206\u6790</h2>`,17),j=i("\u6307\u4EE4\u91CD\u6392\u7684\u60C5\u51B5\uFF0C\u53EF\u4EE5\u53C2\u8003\u6587\u7AE0\u300A"),w={href:"https://mp.weixin.qq.com/s/s983WflPH7jF0-_SpGRfBg",target:"_blank",rel:"noopener noreferrer"},q=i("Java \u5E76\u53D1\u7F16\u7A0B\u7CFB\u5217 1-\u57FA\u7840\u77E5\u8BC6"),S=i("\u300B"),A=d(`<p>\u6211\u4EEC\u5148\u770B\u5982\u4E0B\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class MonitorExample {
    int a = 0;
    public synchronized void writer() {  //1
        a++;                             //2
    }                                    //3
    public synchronized void reader() {  //4
        int i = a;                       //5
        //\u2026\u2026
    }                                    //6
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5047\u8BBE\u7EBF\u7A0B A \u6267\u884C writer()\u65B9\u6CD5\uFF0C\u968F\u540E\u7EBF\u7A0B B \u6267\u884C reader()\u65B9\u6CD5\u3002\u6839\u636E happens before \u89C4\u5219\uFF0C\u8FD9\u4E2A\u8FC7\u7A0B\u5305\u542B\u7684 happens before \u5173\u7CFB\u53EF\u4EE5\u5206\u4E3A\u4E24\u7C7B\uFF1A</p><ul><li>\u6839\u636E\u7A0B\u5E8F\u6B21\u5E8F\u89C4\u5219\uFF0C1 happens before 2, 2 happens before 3; 4 happens before 5, 5 happens before 6\u3002</li><li>\u6839\u636E\u76D1\u89C6\u5668\u9501\u89C4\u5219\uFF0C3 happens before 4\u3002</li><li>\u6839\u636E happens before \u7684\u4F20\u9012\u6027\uFF0C2 happens before 5\u3002</li></ul><p>\u4E0A\u8FF0 happens before \u5173\u7CFB\u7684\u56FE\u5F62\u5316\u8868\u73B0\u5F62\u5F0F\u5982\u4E0B\uFF1A</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8NYbseqZbzicTBl0DW1eYOYtCAKibhFxRsTLJibFulcHBrjCaQFSjibzwxtg/640?wx_fmt=png" alt=""></p><blockquote><p>\u5728\u4E0A\u56FE\u4E2D\uFF0C\u6BCF\u4E00\u4E2A\u7BAD\u5934\u94FE\u63A5\u7684\u4E24\u4E2A\u8282\u70B9\uFF0C\u4EE3\u8868\u4E86\u4E00\u4E2A happens before \u5173\u7CFB\u3002\u9ED1\u8272\u7BAD\u5934\u8868\u793A\u7A0B\u5E8F\u987A\u5E8F\u89C4\u5219\uFF1B\u6A59\u8272\u7BAD\u5934\u8868\u793A\u76D1\u89C6\u5668\u9501\u89C4\u5219\uFF1B\u84DD\u8272\u7BAD\u5934\u8868\u793A\u7EC4\u5408\u8FD9\u4E9B\u89C4\u5219\u540E\u63D0\u4F9B\u7684 happens before \u4FDD\u8BC1\u3002</p></blockquote><p>\u4E0A\u56FE\u8868\u793A\u5728\u7EBF\u7A0B A \u91CA\u653E\u4E86\u9501\u4E4B\u540E\uFF0C\u968F\u540E\u7EBF\u7A0B B \u83B7\u53D6\u540C\u4E00\u4E2A\u9501\u3002\u5728\u4E0A\u56FE\u4E2D\uFF0C2 happens before 5\u3002\u56E0\u6B64\uFF0C\u7EBF\u7A0B A \u5728\u91CA\u653E\u9501\u4E4B\u524D\u6240\u6709\u53EF\u89C1\u7684\u5171\u4EAB\u53D8\u91CF\uFF0C\u5728\u7EBF\u7A0B B \u83B7\u53D6\u540C\u4E00\u4E2A\u9501\u4E4B\u540E\uFF0C\u5C06\u7ACB\u523B\u53D8\u5F97\u5BF9 B \u7EBF\u7A0B\u53EF\u89C1\u3002</p><h2 id="synchronized-\u7684\u53EF\u91CD\u5165\u6027" tabindex="-1"><a class="header-anchor" href="#synchronized-\u7684\u53EF\u91CD\u5165\u6027" aria-hidden="true">#</a> synchronized \u7684\u53EF\u91CD\u5165\u6027</h2><p>\u4ECE\u4E92\u65A5\u9501\u7684\u8BBE\u8BA1\u4E0A\u6765\u8BF4\uFF0C\u5F53\u4E00\u4E2A\u7EBF\u7A0B\u8BD5\u56FE\u64CD\u4F5C\u4E00\u4E2A\u7531\u5176\u4ED6\u7EBF\u7A0B\u6301\u6709\u7684\u5BF9\u8C61\u9501\u7684\u4E34\u754C\u8D44\u6E90\u65F6\uFF0C\u5C06\u4F1A\u5904\u4E8E\u963B\u585E\u72B6\u6001\uFF0C\u4F46\u5F53\u4E00\u4E2A\u7EBF\u7A0B\u518D\u6B21\u8BF7\u6C42\u81EA\u5DF1\u6301\u6709\u5BF9\u8C61\u9501\u7684\u4E34\u754C\u8D44\u6E90\u65F6\uFF0C\u8FD9\u79CD\u60C5\u51B5\u5C5E\u4E8E\u91CD\u5165\u9501\uFF0C\u8BF7\u6C42\u5C06\u4F1A\u6210\u529F\u3002</p><p>synchronized \u5C31\u662F\u53EF\u91CD\u5165\u9501\uFF0C\u56E0\u6B64\u4E00\u4E2A\u7EBF\u7A0B\u8C03\u7528 synchronized \u65B9\u6CD5\u7684\u540C\u65F6\uFF0C\u5728\u5176\u65B9\u6CD5\u4F53\u5185\u90E8\u8C03\u7528\u8BE5\u5BF9\u8C61\u53E6\u4E00\u4E2A synchronized \u65B9\u6CD5\u662F\u5141\u8BB8\u7684\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class AccountingSync implements Runnable{
    static AccountingSync instance=new AccountingSync();
    static int i=0;
    static int j=0;
    @Override
    public void run() {
        for(int j=0;j&lt;1000000;j++){
            //this,\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\u9501
            synchronized(this){
                i++;
                increase();//synchronized\u7684\u53EF\u91CD\u5165\u6027
            }
        }
    }
    public synchronized void increase(){
        j++;
    }
    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(instance);
        Thread t2=new Thread(instance);
        t1.start();t2.start();
        t1.join();t2.join();
        System.out.println(i);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\u9501\u540E\u8FDB\u5165 synchronized \u4EE3\u7801\u5757\u6267\u884C\u540C\u6B65\u4EE3\u7801\uFF0C\u5E76\u5728\u4EE3\u7801\u5757\u4E2D\u8C03\u7528\u4E86\u5F53\u524D\u5B9E\u4F8B\u5BF9\u8C61\u7684\u53E6\u5916\u4E00\u4E2A synchronized \u65B9\u6CD5\uFF0C\u518D\u6B21\u8BF7\u6C42\u5F53\u524D\u5B9E\u4F8B\u9501\u65F6\uFF0C\u5C06\u88AB\u5141\u8BB8\u3002\u9700\u8981\u7279\u522B\u6CE8\u610F\u53E6\u5916\u4E00\u79CD\u60C5\u51B5\uFF0C\u5F53\u5B50\u7C7B\u7EE7\u627F\u7236\u7C7B\u65F6\uFF0C\u5B50\u7C7B\u4E5F\u662F\u53EF\u4EE5\u901A\u8FC7\u53EF\u91CD\u5165\u9501\u8C03\u7528\u7236\u7C7B\u7684\u540C\u6B65\u65B9\u6CD5\u3002\u6CE8\u610F\u7531\u4E8E synchronized \u662F\u57FA\u4E8E monitor \u5B9E\u73B0\u7684\uFF0C\u56E0\u6B64\u6BCF\u6B21\u91CD\u5165\uFF0Cmonitor \u4E2D\u7684\u8BA1\u6570\u5668\u4ECD\u4F1A\u52A0 1\u3002</p><h2 id="ending" tabindex="-1"><a class="header-anchor" href="#ending" aria-hidden="true">#</a> ending</h2><p>\u201C\u4E09\u59B9\uFF0C\u4ECA\u5929\u5C31\u5B66\u5230\u8FD9\u5427\u3002\u201D\u6211\u6276\u4E86\u6276\u773C\u955C\u5BF9\u4E09\u59B9\u8BF4\u3002</p><p>\u8BB0\u4F4F synchronized \u7684\u4E09\u79CD\u5E94\u7528\u65B9\u5F0F\uFF0C\u6307\u4EE4\u91CD\u6392\u60C5\u51B5\u5206\u6790\uFF0C\u4EE5\u53CA synchronized \u7684\u53EF\u91CD\u5165\u6027\uFF0C\u901A\u8FC7\u4ECA\u5929\u7684\u5B66\u4E60\uFF0C\u4F60\u57FA\u672C\u53EF\u4EE5\u638C\u63E1 synchronized \u7684\u4F7F\u7528\u59FF\u52BF\uFF0C\u4EE5\u53CA\u53EF\u80FD\u4F1A\u9047\u5230\u7684\u5751\u3002</p><hr><p>\u6CA1\u6709\u4EC0\u4E48\u4F7F\u6211\u505C\u7559\u2014\u2014\u9664\u4E86\u76EE\u7684\uFF0C\u7EB5\u7136\u5CB8\u65C1\u6709\u73AB\u7470\u3001\u6709\u7EFF\u836B\u3001\u6709\u5B81\u9759\u7684\u6E2F\u6E7E\uFF0C\u6211\u662F\u4E0D\u7CFB\u4E4B\u821F\u3002</p><p><strong>\u63A8\u8350\u9605\u8BFB</strong>\uFF1A</p>`,19),B={href:"https://mp.weixin.qq.com/s/XWwqzrHAJ0vtY3lNilqVkg",target:"_blank",rel:"noopener noreferrer"},T=i("\u6211\u6254\u8FDB\u5783\u573E\u6876\u7684\u7B2C\u4E00\u672C Java \u4E66..."),k={href:"https://mp.weixin.qq.com/s/gb48ZAqDCwXInUWM7q0EaQ",target:"_blank",rel:"noopener noreferrer"},E=i("\u4E00\u952E\u90E8\u7F72 Spring Boot \u9879\u76EE"),M={href:"https://mp.weixin.qq.com/s/-LNhq_OBHDBZzAEMurqBJw",target:"_blank",rel:"noopener noreferrer"},N=i("\u79BB\u5F00\u5317\u4EAC\uFF1F"),C={href:"https://mp.weixin.qq.com/s/PZcWj0NbWRGdS0I9ACMqbg",target:"_blank",rel:"noopener noreferrer"},I=i("\u7F16\u7A0B\u55B5\u5B9E\u6218\u9879\u76EE\u53EF\u4EE5\u5728\u672C\u5730\u8DD1\u8D77\u6765\u8FA3\uFF01"),J=n("p",null,[n("img",{src:"https://img-blog.csdnimg.cn/img_convert/29e81f023caee3bdfdb6698a3ad2178f.png",alt:""})],-1);function O(R,V){const e=r("ExternalLinkIcon");return c(),a("div",null,[v,o,u,n("p",null,[b,n("a",m,[h,s(e)]),p]),y,n("p",null,[g,n("a",_,[z,s(e)]),f]),x,n("blockquote",null,[n("p",null,[j,n("a",w,[q,s(e)]),S])]),A,n("ul",null,[n("li",null,[n("a",B,[T,s(e)])]),n("li",null,[n("a",k,[E,s(e)])]),n("li",null,[n("a",M,[N,s(e)])]),n("li",null,[n("a",C,[I,s(e)])])]),J])}var F=l(t,[["render",O],["__file","javabfbcxlsynchronized.html.vue"]]);export{F as default};
