---
title: 新来个技术总监：谁在用 isXxx 形式定义布尔类型年后不用来了！
shortTitle: 新来个技术总监：谁在用 isXx
author: Hollis
category:
  - 微信公众号
---

在日常开发中，我们会经常要在类中定义布尔类型的变量，比如在给外部系统提供一个RPC接口的时候，我们一般会定义一个字段表示本次请求是否成功的。

关于这个”本次请求是否成功”的字段的定义，我见过很多不同的开发者，定义的方式都不同，尤其是在属性的命名上，有人用 success，有人用 isSuccess 表示。

从语义上面来讲，两种命名方式都可以讲的通，并且也都没有歧义。那么还有什么原则可以参考来让我们做选择呢。

根据JavaBeans Specification规定，如果是普通的参数propertyName，要以以下方式定义其setter/getter：

```
public <PropertyType> get<PropertyName>();
public void set<PropertyName>(<PropertyType> a);
```

但是，布尔类型的变量propertyName则是单独定义的：

```
public boolean is<PropertyName>();
public void set<PropertyName>(boolean m);
```

success方法的 getter 应该是isSuccess/getSuccess，而isSuccess的getter 应该是isIsSuccess/getIsSuccess。

但是很多人，在使用isSuccess作为属性名的时候，还是会采用isSuccess/getSuccess作为 getter 方法名，**尤其是现在的很多 IDE 在默认生成 getter 的时候也是会生成isSuccess。**

在一般情况下，其实是没有影响的。但是有一种特殊情况就会有问题，那就是发生序列化的时候可能会导致参数转换异常。

我们先来定义一个 JavaBean：

```
class Model implements Serializable {
   private static final long serialVersionUID = 1836697963736227954L;
   private boolean isSuccess;
   public boolean isSuccess() {
       return isSuccess;
   }
   public void setSuccess(boolean success) {
       isSuccess = success;
   }
   public String getHollis(){
       return "hollischuang";
   }
}
```

在这个 JavaBean 中，有一个成员变量isSuccess，三个方法，分别是IDE帮我们自动生成的isSuccess和setSuccess，另外一个是作者自己增加的一个符合getter命名规范的方法。

我们分别使用不同的 JSON 序列化工具来对这个类的对象进行序列化和反序列化：

```
public class BooleanMainTest {
     public static void main(String[] args) throws IOException {
         //定一个Model类型
         Model model = new Model();
         model.setSuccess(true);
         //使用fastjson(1.2.16)序列化model成字符串并输出
         System.out.println("Serializable Result With fastjson :" + JSON.toJSONString(model));
         //使用Gson(2.8.5)序列化model成字符串并输出
         Gson gson =new Gson();
         System.out.println("Serializable Result With Gson :" +gson.toJson(model));
         //使用jackson(2.9.7)序列化model成字符串并输出
         ObjectMapper om = new ObjectMapper();
         System.out.println("Serializable Result With jackson :" +om.writeValueAsString(model));
     }
}
```

以上代码输出结果：

```
Serializable Result With fastjson :{"hollis":"hollischuang","success":true}
Serializable Result With Gson :{"isSuccess":true}
Serializable Result With jackson :{"success":true,"hollis":"hollischuang"}
```

在fastjson和jackson的结果中，原来类中的isSuccess字段被序列化成success，并且其中还包含hollis值。而Gson中只有isSuccess字段。

我们可以得出结论：fastjson和jackson在把对象序列化成json字符串的时候，是通过反射遍历出该类中的所有getter方法，得到getHollis和isSuccess，然后根据JavaBeans规则，他会认为这是两个属性hollis和success的值。直接序列化成json:

```
{“hollis”:”hollischuang”,”success”:true}
```

但是Gson并不是这么做的，他是通过反射遍历该类中的所有属性，并把其值序列化成json:

```
{“isSuccess”:true}
```

可以看到，**由于不同的序列化工具，在进行序列化的时候使用到的策略是不一样的**，所以，对于同一个类的同一个对象的序列化结果可能是不同的。那么，如果我们把一个对象使用fastjson进行序列化，再使用Gson反序列化会发生什么呢？

```
 public class BooleanMainTest {
     public static void main(String[] args) throws IOException {
         Model model = new Model();
         model.setSuccess(true);
         Gson gson =new Gson();
         System.out.println(gson.fromJson(JSON.toJSONString(model),Model.class));
     }
 }
```

以上代码，输出结果：

```
Model[isSuccess=false]
```

这和我们预期的结果完全相反，原因是因为JSON框架通过扫描所有的getter后发现有一个isSuccess方法，然后根据JavaBeans的规范，解析出变量名为success，把model对象序列化城字符串后内容为{"success":true}。

根据{"success":true}这个json串，Gson框架在通过解析后，通过反射寻找Model类中的success属性，但是Model类中只有isSuccess属性，所以，最终反序列化后的Model类的对象中，isSuccess则会使用默认值false。

但是，一旦以上代码发生在生产环境，这绝对是一个致命的问题。

所以，作为开发者，我们应该想办法尽量避免这种问题的发生。

所以，**建议大家使用success而不是 isSuccess 这种形式。** 这样，该类里面的成员变量时success，getter方法是isSuccess，这是完全符合JavaBeans规范的。无论哪种序列化框架，执行结果都一样。就从源头避免了这个问题。

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2022，抱团取暖，一起牛逼。`**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjszjszyisxxxxsdybelxnhfyll-26b896af-468d-471e-a742-5233d276b555.jpg)

推荐阅读
----

*   [Spring Boot 3.0 M1 发布，正式弃用 Java 8，最低要求 Java 17。。。](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247497256&idx=1&sn=39ae99dc47facc4132c79fe6f7271a53&scene=21#wechat_redirect)
*   [还在用HttpUtil？试试这款优雅的HTTP客户端工具吧，跟SpringBoot绝配！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247497242&idx=1&sn=f433ff14184980096fbb8cc8ff41fe68&scene=21#wechat_redirect)
*   [MySQL模糊查询再也用不着 like+% 了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247497214&idx=1&sn=1c49bbd259abb57ba9639f6f24bb5c63&scene=21#wechat_redirect)
*   [再见 Typora ！这款开源的 Markdown 神器界面更炫酷，逼格更高！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247497088&idx=1&sn=27a964ad3ec145693d661b697830aee0&scene=21#wechat_redirect)
*   [5分钟搞定！这款颜值爆表的数据可视化工具，你值得拥有！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247496969&idx=1&sn=f1f4e9d3cbc6f98ee445545c255b77f7&scene=21#wechat_redirect)
*   [SpringBoot 实现 Excel 导入导出，性能爆表，用起来够优雅！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247496869&idx=1&sn=fb4ecfd5bf48fddc143edd6858b0d532&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)
*   [mall-swarm 微服务电商项目发布重大更新，打造Spring Cloud最佳实践！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486362&idx=1&sn=fb6d71d328e8eee34976a86135dc6a7d&scene=21#wechat_redirect)

[](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486362&idx=1&sn=fb6d71d328e8eee34976a86135dc6a7d&scene=21#wechat_redirect)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-xinlgjszjszyisxxxxsdybelxnhfyll-888ea0e6-4ace-468b-892d-a0ddd65130dd.jpg)