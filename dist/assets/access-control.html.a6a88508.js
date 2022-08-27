import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";import{r as s,o as t,c as d,a as e,b as l,e as v,d as n}from"./app.fa8624aa.js";const r={},c=v(`<p>\u6211\u4EEC\u5148\u6765\u8BA8\u8BBA\u4E00\u4E0B\u4E3A\u4EC0\u4E48\u9700\u8981\u8BBF\u95EE\u6743\u9650\u63A7\u5236\u3002\u8003\u8651\u4E24\u4E2A\u573A\u666F\uFF1A</p><p>\u573A\u666F 1\uFF1A\u5DE5\u7A0B\u5E08 A \u7F16\u5199\u4E86\u4E00\u4E2A\u7C7B ClassA\uFF0C\u4F46\u662F\u5DE5\u7A0B\u5E08 A \u5E76\u4E0D\u5E0C\u671B ClassA \u88AB\u5176\u4ED6\u7C7B\u90FD\u8BBF\u95EE\u5230\uFF0C\u8BE5\u5982\u4F55\u5904\u7406\u5462\uFF1F</p><p>\u573A\u666F 2\uFF1A\u5DE5\u7A0B\u5E08 A \u7F16\u5199\u4E86\u4E00\u4E2A\u7C7B ClassA\uFF0C\u5176\u4E2D\u6709\u4E24\u4E2A\u65B9\u6CD5 fun1\u3001fun2\uFF0C\u5DE5\u7A0B\u5E08\u53EA\u60F3\u8BA9 fun1 \u5BF9\u5916\u53EF\u89C1\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5982\u679C\u522B\u7684\u5DE5\u7A0B\u5E08\u6765\u8C03\u7528 ClassA\uFF0C\u53EA\u53EF\u4EE5\u8C03\u7528\u65B9\u6CD5 fun1\uFF0C\u8BE5\u600E\u4E48\u5904\u7406\u5462\uFF1F</p><p>\u6B64\u65F6\uFF0C\u8BBF\u95EE\u6743\u9650\u63A7\u5236\u4FBF\u53EF\u4EE5\u8D77\u5230\u4F5C\u7528\u4E86\u3002</p><p>\u5728 Java \u4E2D\uFF0C\u63D0\u4F9B\u4E86\u56DB\u79CD\u8BBF\u95EE\u6743\u9650\u63A7\u5236\uFF1A</p><ul><li>\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09</li><li>public</li><li>private</li><li>protected</li></ul><p>\u7C7B\u53EA\u53EF\u4EE5\u7528\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\u548C public \u4FEE\u9970\u3002\u6BD4\u5982\u8BF4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Wanger{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6216\u8005</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>class Wanger{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F46\u53D8\u91CF\u548C\u65B9\u6CD5\u5219\u90FD\u53EF\u4EE5\u4FEE\u9970\u3002</p><h2 id="_1-\u4FEE\u9970\u7C7B" tabindex="-1"><a class="header-anchor" href="#_1-\u4FEE\u9970\u7C7B" aria-hidden="true">#</a> 1. \u4FEE\u9970\u7C7B</h2><ul><li>\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09\uFF1A\u7528\u6765\u4FEE\u9970\u7C7B\u7684\u8BDD\uFF0C\u8868\u793A\u8BE5\u7C7B\u53EA\u5BF9\u540C\u4E00\u4E2A\u5305\u4E2D\u7684\u5176\u4ED6\u7C7B\u53EF\u89C1\u3002</li><li>public\uFF1A\u7528\u6765\u4FEE\u9970\u7C7B\u7684\u8BDD\uFF0C\u8868\u793A\u8BE5\u7C7B\u5BF9\u5176\u4ED6\u6240\u6709\u7684\u7C7B\u90FD\u53EF\u89C1\u3002</li></ul><p>\u4F8B 1\uFF1A</p><p>Main.java:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobetterjavaer.test1;

public class Main {
	public static void main(String\\[\\] args) {

		People people = new People(&quot;Tom&quot;);
		System.out.println(people.getName());
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>People.java</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobetterjavaer.test1;

class People {//\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u4EE3\u7801\u53EF\u4EE5\u770B\u51FA\uFF0C\u4FEE\u9970 People \u7C7B\u91C7\u7528\u7684\u662F\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF0C\u800C\u7531\u4E8E People \u7C7B\u548C Main \u7C7B\u5728\u540C\u4E00\u4E2A\u5305\u4E2D\uFF0C\u56E0\u6B64 People \u7C7B\u5BF9\u4E8E Main \u7C7B\u662F\u53EF\u89C1\u7684\u3002</p><p>\u4F8B\u5B50 2\uFF1A</p><p>People.java</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobetterjavaer.test2;

class People {//\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6 People \u7C7B\u548C Main \u7C7B\u4E0D\u5728\u540C\u4E00\u4E2A\u5305\u4E2D\uFF0C\u4F1A\u53D1\u751F\u4EC0\u4E48\u60C5\u51B5\u5462\uFF1F</p><p>\u4E0B\u9762\u662F Main \u7C7B\u4E2D\u7684\u63D0\u793A\u7684\u9519\u8BEF\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-154ae82f-72a5-45fc-ad3c-e1eb575d8572.png" alt=""></p><p>\u63D0\u793A Peolple \u7C7B\u5728 Main \u7C7B\u4E2D\u4E0D\u53EF\u89C1\u3002\u4ECE\u8FD9\u91CC\u5C31\u53EF\u4EE5\u770B\u51FA\uFF0C\u5982\u679C\u7528\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\u53BB\u4FEE\u9970\u4E00\u4E2A\u7C7B\uFF0C\u8BE5\u7C7B\u53EA\u5BF9\u540C\u4E00\u4E2A\u5305\u4E2D\u7684\u5176\u4ED6\u7C7B\u53EF\u89C1\uFF0C\u5BF9\u4E8E\u4E0D\u540C\u5305\u4E2D\u7684\u7C7B\u662F\u4E0D\u53EF\u89C1\u7684\u3002</p><p>\u6B63\u5982\u4E0A\u56FE\u7684\u5FEB\u901F\u4FEE\u6B63\u63D0\u793A\u6240\u793A\uFF0C\u5C06 People \u7C7B\u7684\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\u66F4\u6539\u4E3A public \u7684\u8BDD\uFF0CPeople \u7C7B\u5BF9\u4E8E Main \u7C7B\u4FBF\u53EF\u89C1\u4E86\u3002</p><h2 id="_2-\u4FEE\u9970\u7C7B\u7684\u65B9\u6CD5\u548C\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#_2-\u4FEE\u9970\u7C7B\u7684\u65B9\u6CD5\u548C\u53D8\u91CF" aria-hidden="true">#</a> 2. \u4FEE\u9970\u7C7B\u7684\u65B9\u6CD5\u548C\u53D8\u91CF</h2><ul><li>\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09\uFF1A\u5982\u679C\u4E00\u4E2A\u7C7B\u7684\u65B9\u6CD5\u6216\u53D8\u91CF\u88AB\u5305\u8BBF\u95EE\u6743\u9650\u4FEE\u9970\uFF0C\u4E5F\u5C31\u610F\u5473\u7740\u53EA\u80FD\u5728\u540C\u4E00\u4E2A\u5305\u4E2D\u7684\u5176\u4ED6\u7C7B\u4E2D\u663E\u793A\u5730\u8C03\u7528\u8BE5\u7C7B\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\uFF0C\u5728\u4E0D\u540C\u5305\u4E2D\u7684\u7C7B\u4E2D\u4E0D\u80FD\u663E\u5F0F\u5730\u8C03\u7528\u8BE5\u7C7B\u7684\u65B9\u6CD5\u6216\u53D8\u91CF\u3002</li><li>private\uFF1A\u5982\u679C\u4E00\u4E2A\u7C7B\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\u88AB private \u4FEE\u9970\uFF0C\u90A3\u4E48\u8FD9\u4E2A\u7C7B\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\u53EA\u80FD\u5728\u8BE5\u7C7B\u672C\u8EAB\u4E2D\u88AB\u8BBF\u95EE\uFF0C\u5728\u7C7B\u5916\u4EE5\u53CA\u5176\u4ED6\u7C7B\u4E2D\u90FD\u4E0D\u80FD\u663E\u5F0F\u7684\u8FDB\u884C\u8BBF\u95EE\u3002</li><li>protected\uFF1A\u5982\u679C\u4E00\u4E2A\u7C7B\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\u88AB protected \u4FEE\u9970\uFF0C\u5BF9\u4E8E\u540C\u4E00\u4E2A\u5305\u7684\u7C7B\uFF0C\u8FD9\u4E2A\u7C7B\u7684\u65B9\u6CD5\u6216\u53D8\u91CF\u662F\u53EF\u4EE5\u88AB\u8BBF\u95EE\u7684\u3002\u5BF9\u4E8E\u4E0D\u540C\u5305\u7684\u7C7B\uFF0C\u53EA\u6709\u7EE7\u627F\u4E8E\u8BE5\u7C7B\u7684\u7C7B\u624D\u53EF\u4EE5\u8BBF\u95EE\u5230\u8BE5\u7C7B\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\u3002</li><li>public\uFF1A\u88AB public \u4FEE\u9970\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\uFF0C\u5728\u4EFB\u4F55\u5730\u65B9\u90FD\u662F\u53EF\u89C1\u7684\u3002</li></ul><p>\u4F8B 3\uFF1A</p><p>Main.java \u6CA1\u6709\u53D8\u5316</p><p>People.java</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobebetterjavaer.test1;

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	String getName() {    //\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09
		return name;
	}

	void setName(String name) {   //\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u5728 Main \u7C7B\u662F\u53EF\u4EE5\u663E\u793A\u8C03\u7528\u65B9\u6CD5 getName \u548C setName \u7684\u3002</p><p>\u4F46\u662F\u5982\u679C People \u7C7B\u548C Main \u7C7B\u4E0D\u5728\u540C\u4E00\u4E2A\u5305\u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobebetterjavaer.test2;    //\u4E0EMain\u7C7B\u5904\u4E8E\u4E0D\u540C\u5305\u4E2D

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	String getName() {    //\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09
		return name;
	}

	void setName(String name) {   //\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\uFF08\u5305\u8BBF\u95EE\u6743\u9650\uFF09
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u5728 Main \u7C7B\u4E2D\u4F1A\u63D0\u793A\u9519\u8BEF\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-b3e9dc56-53e8-42f1-b8ee-35115edfe7e7.png" alt=""></p><p>\u7531\u6B64\u53EF\u4EE5\u770B\u51FA\uFF0C\u5982\u679C\u7528\u9ED8\u8BA4\u8BBF\u95EE\u6743\u9650\u6765\u4FEE\u9970\u7C7B\u7684\u65B9\u6CD5\u6216\u8005\u53D8\u91CF\uFF0C\u5219\u53EA\u80FD\u5728\u540C\u4E00\u4E2A\u5305\u7684\u5176\u4ED6\u7C7B\u4E2D\u8FDB\u884C\u8BBF\u95EE\u3002</p><p>\u4F8B 4:</p><p>People.java</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobebetterjavaer.test1;

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	protected String getName() {
		return name;
	}

	protected void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u662F\u53EF\u4EE5\u5728 Main \u4E2D\u663E\u793A\u8C03\u7528\u65B9\u6CD5 getName \u548C setName \u7684\u3002</p><p>\u5982\u679C People \u7C7B\u548C Main \u7C7B\u5904\u4E8E\u4E0D\u540C\u5305\u4E2D\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobebetterjavaer.test2;

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	protected String getName() {
		return name;
	}

	protected void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5219\u4F1A\u5728 Main \u4E2D\u62A5\u9519\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-b1d4b7ed-fc87-47d4-bdd9-3f6a8ea96100.png" alt=""></p><p>\u5982\u679C\u5728 com.cxh.test1 \u4E2D\u5B9A\u4E00\u4E2A\u7C7B Man \u7EE7\u627F People\uFF0C\u5219\u53EF\u4EE5\u5728\u7C7B Man \u4E2D\u663E\u793A\u8C03\u7528\u65B9\u6CD5 getName \u548C setName\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>package com.tobebetterjavaer.test1;

import com.tobebetterjavaer.test2.People;

public class Man extends People {

    public Man(String name){
        super(name);
    }

    public String toString() {
        return getName();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8865\u5145\u4E00\u4E9B\u5173\u4E8E Java \u5305\u548C\u7C7B\u6587\u4EF6\u7684\u77E5\u8BC6\uFF1A</p><p>1\uFF09Java \u4E2D\u7684\u5305\u4E3B\u8981\u662F\u4E3A\u4E86\u9632\u6B62\u7C7B\u6587\u4EF6\u547D\u540D\u51B2\u7A81\u4EE5\u53CA\u65B9\u4FBF\u8FDB\u884C\u4EE3\u7801\u7EC4\u7EC7\u548C\u7BA1\u7406\uFF1B</p><p>2\uFF09\u5BF9\u4E8E\u4E00\u4E2A Java \u6E90\u4EE3\u7801\u6587\u4EF6\uFF0C\u5982\u679C\u5B58\u5728 public \u7C7B\u7684\u8BDD\uFF0C\u53EA\u80FD\u6709\u4E00\u4E2A public \u7C7B\uFF0C\u4E14\u6B64\u65F6\u6E90\u4EE3\u7801\u6587\u4EF6\u7684\u540D\u79F0\u5FC5\u987B\u548C public \u7C7B\u7684\u540D\u79F0\u5B8C\u5168\u76F8\u540C\u3002</p><p>\u53E6\u5916\uFF0C\u5982\u679C\u8FD8\u5B58\u5728\u5176\u4ED6\u7C7B\uFF0C\u8FD9\u4E9B\u7C7B\u5728\u5305\u5916\u662F\u4E0D\u53EF\u89C1\u7684\u3002\u5982\u679C\u6E90\u4EE3\u7801\u6587\u4EF6\u6CA1\u6709 public \u7C7B\uFF0C\u5219\u6E90\u4EE3\u7801\u6587\u4EF6\u7684\u540D\u79F0\u53EF\u4EE5\u968F\u610F\u547D\u540D\u3002</p>`,53),m=n("\u539F\u6587\u94FE\u63A5\uFF1A"),u={href:"https://www.cnblogs.com/dolphin0520/p/3734915.html",target:"_blank",rel:"noopener noreferrer"},b=n("https://www.cnblogs.com/dolphin0520/p/3734915.html"),p=n(" \u4F5C\u8005: Matrix\u6D77\u5B50\uFF0C\u7F16\u8F91\uFF1A\u6C89\u9ED8\u738B\u4E8C"),o=e("hr",null,null,-1),g=n("\u6700\u8FD1\u6574\u7406\u4E86\u4E00\u4EFD\u725B\u903C\u7684\u5B66\u4E60\u8D44\u6599\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8EJava\u57FA\u7840\u90E8\u5206\uFF08JVM\u3001Java\u96C6\u5408\u6846\u67B6\u3001\u591A\u7EBF\u7A0B\uFF09\uFF0C\u8FD8\u56CA\u62EC\u4E86 "),h=e("strong",null,"\u6570\u636E\u5E93\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC\u3001\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784\u3001\u8BBE\u8BA1\u6A21\u5F0F\u3001\u6846\u67B6\u7C7BSpring\u3001Netty\u3001\u5FAE\u670D\u52A1\uFF08Dubbo\uFF0C\u6D88\u606F\u961F\u5217\uFF09 \u7F51\u5173",-1),x=n(" \u7B49\u7B49\u7B49\u7B49\u2026\u2026\u8BE6\u60C5\u6233\uFF1A"),_={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},P=n("\u53EF\u4EE5\u8BF4\u662F2022\u5E74\u5168\u7F51\u6700\u5168\u7684\u5B66\u4E60\u548C\u627E\u5DE5\u4F5C\u7684PDF\u8D44\u6E90\u4E86"),S=e("p",null,[n("\u5173\u6CE8\u4E8C\u54E5\u7684\u539F\u521B\u516C\u4F17\u53F7 "),e("strong",null,"\u6C89\u9ED8\u738B\u4E8C"),n("\uFF0C\u56DE\u590D"),e("strong",null,"111"),n(" \u5373\u53EF\u514D\u8D39\u9886\u53D6\u3002")],-1),j=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:""})],-1);function f(N,M){const i=s("ExternalLinkIcon");return t(),d("div",null,[c,e("blockquote",null,[e("p",null,[m,e("a",u,[b,l(i)]),p])]),o,e("p",null,[g,h,x,e("a",_,[P,l(i)])]),S,j])}var z=a(r,[["render",f],["__file","access-control.html.vue"]]);export{z as default};
