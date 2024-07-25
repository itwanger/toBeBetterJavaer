---
title: Forest：一款极简的声明式HTTP调用API框架
category:
  - Java企业级开发
tag:
  - 辅助工具/轮子
---



大家好，我是二哥呀！今天来给大家推荐一款直击痛点的 HTTP 客户端框架，可以超高效率地完成和第三方接口的对接。

在介绍本篇的主角之前，我们先来了解下 Java 生态中的 HTTP 组件库，大致可以分为三类：

- JDK 自带的 HttpURLConnection 标准库；
- Apache HttpComponents HttpClient；
- OkHttp。

使用 HttpURLConnection 发起 HTTP 请求最大的优点是不需要引入额外的依赖，但是使用起来非常繁琐，也缺乏连接池管理、域名机械控制等特性支持。

使用标准库的最大好处就是不需要引入额外的依赖，但使用起来比较繁琐，就像直接使用 JDBC 连接数据库那样，需要很多模板代码。来发起一个简单的 HTTP POST 请求吧。

```java
public class HttpUrlConnectionDemo {
    public static void main(String[] args) throws IOException {
        String urlString = "https://httpbin.org/post";
        String bodyString = "password=123";

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        OutputStream os = conn.getOutputStream();
        os.write(bodyString.getBytes("utf-8"));
        os.flush();
        os.close();

        if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
            InputStream is = conn.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            System.out.println("响应内容:" + sb.toString());
        } else {
            System.out.println("响应码:" + conn.getResponseCode());
        }
    }
}
```

HttpURLConnection 发起的 HTTP 请求比较原始，基本上算是对网络传输层的一次浅层次的封装；有了 HttpURLConnection 对象后，就可以获取到输出流，然后把要发送的内容发送出去；再通过输入流读取到服务器端响应的内容；最后打印。

不过 HttpURLConnection 不支持 HTTP/2.0，为了解决这个问题，Java 9 的时候官方的标准库增加了一个更高级别的 HttpClient，再发起 POST 请求就显得高大上多了，不仅支持异步，还支持顺滑的链式调用。

```java
public class HttpClientDemo {
    public static void main(String[] args) throws URISyntaxException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("https://postman-echo.com/post"))
                .headers("Content-Type", "text/plain;charset=UTF-8")
                .POST(HttpRequest.BodyPublishers.ofString("二哥牛逼"))
                .build();
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(System.out::println)
                .join();
    }
}
```

Apache HttpComponents HttpClient 支持的特性也非常丰富：

- 基于标准、纯净的Java语言，实现了HTTP1.0和HTTP1.1；
- 以可扩展的面向对象的结构实现了HTTP全部的方法；
- 支持加密的HTTPS协议（HTTP通过SSL协议）；
- Request的输出流可以避免流中内容体直接从socket缓冲到服务器；
- Response的输入流可以有效的从socket服务器直接读取相应内容。

```java
public class HttpComponentsDemo {
    public static void main(String[] args) throws IOException, IOException, ParseException {
        try (CloseableHttpClient httpclient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost("http://httpbin.org/post");
            List<NameValuePair> nvps = new ArrayList<>();
            nvps.add(new BasicNameValuePair("name", "二哥"));
            httpPost.setEntity(new UrlEncodedFormEntity(nvps, Charset.forName("UTF-8")));

            try (CloseableHttpResponse response2 = httpclient.execute(httpPost)) {
                System.out.println(response2.getCode() + " " + EntityUtils.toString(response2.getEntity()));
            }
        }
    }
}
```

OkHttp 是一个执行效率比较高的 HTTP 客户端：

- 支持 HTTP/2.0，当多个请求对应同一个 Host 地址时，可共用同一个 Socket；
- 连接池可减少请求延迟；
- 支持 GZIP 压缩，减少网络传输的数据大小；
- 支持 Response 数据缓存，避免重复网络请求；

```java
public class OkHttpPostDemo {
    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    OkHttpClient client = new OkHttpClient();

    String post(String url, String json) throws IOException {
        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        }
    }

    public static void main(String[] args) throws IOException {
        OkHttpPostDemo example = new OkHttpPostDemo();
        String json = "{'name':'二哥'}";
        String response = example.post("https://httpbin.org/post", json);
        System.out.println(response);
    }
}
```

那今天介绍的这款轻量级的 HTTP 客户端框架 Forest，正是基于 Httpclient和OkHttp 的，屏蔽了不同细节的 HTTP 组件库所带来的所有差异。

Forest 的字面意思是森林的意思，更内涵点的话，可以拆成For和Rest两个单词，也就是“为了Rest”（Rest为一种基于HTTP的架构风格）。 而合起来就是森林，森林由很多树木花草组成（可以理解为各种不同的服务），它们表面上看独立，实则在地下根茎交错纵横、相互连接依存，这样看就有点现代分布式服务化的味道了。 最后，这两个单词反过来读就像是Resultful。

项目地址：

>[https://gitee.com/dromara/forest](https://gitee.com/dromara/forest)

**虽然 star 数还不是很多，但 star 趋势图正在趋于爬坡阶段，大家可以拿来作为一个练手项目，我觉得还是不错的选择**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/forest-55b54f3f-88a7-458b-b8e0-b0d60e916d5e.png)

Forest 本身是处理前端过程的框架，是对后端 HTTP API 框架的进一步封装。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongju/forest-41345eec-fe16-4fcf-9448-0cb8c57d515f.png)

前端部分：

- 通过RPC方式去发送HTTP请求, 方便解耦
- 支持GET, HEAD, POST等所有请求方法
- 支持Spring和Springboot集成
- JSON字符串到Java对象的自动化解析
- XML文本到Java对象的自动化解析
- 支持灵活的模板表达式
- 支持拦截器处理请求的各个生命周期
- 支持自定义注解

后端部分：

- 支持OkHttp
- 支持Httpclient

Forest 容易上手，不需要调用HTTP底层接口，而是像 Dubbo 那样的 RPC 框架一样，只需要定义接口、调用接口即可。几分钟内就可完成请求的定义、发送、接收响应、数据解析、错误处理、日志打印等过程。

配置轻量，遵循约定优于配置的原则，只需在需要的时候进行配置，不配置也不会影响Forest请求的正常调用。

简单优雅，将 HTTP 请求细节封装成 Java 接口 + 注解的形式，不必再关心发送 HTTP 请求的具体过程。使得 HTTP 请求信息与业务代码解耦，方便管理大量 HTTP 的 URL、Header、Body 等信息。

扩展灵活，允许自定义拦截器、甚至是自定义注解，以此来扩展Forest的能力。

Forest 不需要我们编写具体的 HTTP 调用过程，只需要定义一个接口，然后通过 Forest 注解将 HTTP 请求的信息添加到接口的方法上即可。请求发送方通过调用定义的接口就能自动发送请求和接受请求的响应。

Forest 之所以能做到这样，是因为它将定义好的接口通过动态代理的方式生成了一个具体的实现类，然后组织、验证 HTTP 请求信息，绑定动态数据，转换数据形式，SSL 验证签名，调用后端 HTTP API执行实际请求，等待响应，失败重试，转换响应数据到 Java 类型等脏活累活都由这动态代理的实现类给包了。

废话就不再多说，直接开始实战。

第一步，添加  Maven 依赖。

```
<dependency>
    <groupId>com.dtflys.forest</groupId>
    <artifactId>forest-core</artifactId>
    <version>1.5.1</version>
</dependency>
```

第二步，构建 HTTP 请求。

在 Forest 中，所有的 HTTP 请求信息都要绑定到某一个接口的方法上，不需要编写具体的代码去发送请求。请求发送方通过调用事先定义好 HTTP 请求信息的接口方法。

```java
public interface ForRestClient {
    @Request(
            url = "http://httpbin.org/post",
            type = "POST"
    )
    String simplePost(@Body("name") String name);
}
```

通过 `@Post` 注解，将上面的ForRestClient接口中的 `simplePost()` 方法绑定了一个 HTTP 请求，使用 POST 方式，可以使用@Body注解修饰参数的方式，将传入参数的数据绑定到 HTTP 请求体中。然后将请求响应的数据以String的方式返回给调用者。

第三步，调用接口。

```java
public class ForRestDemo {
    public static void main(String[] args) {
        // 实例化Forest配置对象
        ForestConfiguration configuration = ForestConfiguration.configuration();
        configuration.setBackendName("httpclient");

        // 通过Forest配置对象实例化Forest请求接口
        ForRestClient myClient = configuration.createInstance(ForRestClient.class);

        // 调用Forest请求接口，并获取响应返回结果
        String result = myClient.simplePost("二哥");
        System.out.println(result);
    }
}
```

ForestConfiguration为 Forest 的全局配置对象类，所有的 Forest 的全局基本配置信息由此类进行管理。

可以来看一下运行后的日志信息：

```java
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "\u4e8c\u54e5"
  }, 
  "headers": {
    "Content-Length": "23", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "Apache-HttpClient/4.5.2 (Java/11.0.8)", 
    "X-Amzn-Trace-Id": "Root=1-60b533aa-58b41e4967803d99593c53a0"
  }, 
  "json": null, 
  "origin": "161.81.21.32", 
  "url": "http://httpbin.org/post"
}
```

此时，一个简单的 Forest 上手小栗子就跑通了。

如果是 Spring Boot 项目的话，就不需要 ForestConfiguration 了，只需要在启动类或者配置类上添加 `@ForestScan` 注解就可以了。

```java
@SpringBootApplication
@Configuration
@ForestScan(basePackages = "com.yoursite.client")
public class MyApp {
 ...
}
```

Forest 除了支持GET和POST，也支持其他几种 HTTP 请求方式，比如PUT、HEAD、 OPTIONS、DELETE。只需要在构建接口的时候使用对应的注解就可以了，比如说 PUT：

```java
// PUT请求
@Put("http://localhost:8080/hello")
String simplePut();
```

在POST和PUT请求方法中，通常使用 HTTP 请求体进行数据传输，在 Forest 中，可以使用 `@Body`、`@JSONBody`、`@XMLBody` 等多种方式设置请求体数据。

```java
/**
 * 直接修饰一个JSON字符串
 */
@Post("http://localhost:8080/hello/user")
String helloUser(@JSONBody String userJson);
```

Forest 请求会自动将响应的返回数据反序列化成对应的数据类型，分两步走。

第一步：定义dataType属性

dataType属性指定了该请求响应返回的数据类型，可选的数据类型有三种: text, json, xml，默认为 text。

```java
/**
 * dataType为json或xml时，Forest会进行相应的反序列化
 */
@Request(
    url = "http://localhost:8080/text/data",
    dataType = "json"
)
Map getData();
```

第二步：指定反序列化的目标类型

反序列化需要一个目标类型，而该类型其实就是方法的返回值类型，如返回值为String就会反序列成String字符串，返回值为Map就会反序列化成一个HashMap对象，也可以指定为自定义的Class类型。

如果有这样一个 User 类：

```java
public class User {
    private String username;
    private String score;
    
    // Setter和Getter ...
}
```

返回的数据为 JSON 字符串：

```
{"username":  "Foo", "score":  "82"}
```

那请求接口就应该定义成这样：

```java
/**
 * dataType属性指明了返回的数据类型为JSON
 */
@Get(
    url = "http://localhost:8080/user?id=${0}",
    dataType = "json"
)
User getUser(Integer id)
```

另外，大家需要了解一下 Gzip，它是现在一种流行的文件压缩算法，有相当广泛的应用范围。尤其是当Gzip用来压缩存文本文件的时候效果尤为明显，大概能减少70%以上的文件大小。很多 HTTP 服务器都支持 Gzip，比如 Tomcat，经过这些服务压缩过的数据可以降低网络传输的流量，提高客户端的响应速度。

Forest从1.5.2-BETA版本开始支持Gzip的解压，其解压的方式也很简单，在方法或接口类上加上 @DecompressGzip 注解即可。

```java
/**
 * 为请求方法添加Gzip解压能力
 */
@Get("/transaction")
@DecompressGzip
String transaction(String infno);
```

更重要的一点是，Forest 可以通过设置@Request注解的async属性为true来实现异步请求。

```java
@Request(
        url = "http://localhost:8080/hello/user?username=${0}",
        async = true,
        headers = {"Accept:text/plain"}
)
void asyncGet(String username， OnSuccess<String> onSuccess);
```

异步请求时，通过 `OnSuccess<T>` 回调函数来接受响应数据，而不是通过接口方法的返回值，所以这里的返回值类型一般会定义为void。

调用该接口方法时，可以通过下面的方式：

```java
myClient.send("foo", (String resText, ForestRequest request, ForestResponse response) -> {
        // 成功响应回调
        System.out.println(resText);    
    },
    (ForestRuntimeException ex, ForestRequest request, ForestResponse response) -> {
        // 异常回调
        System.out.println(ex.getMessage());
    });
```

除了上面提到的这些功能，Forset 还支持更高级的用法：

- HTTPS
- 文件上传下载
- 拦截器
- 使用代理
- 自定义注解

大家可以去看一下 Forset 的官方文档，然后在本地实践一下，还是能学到不少知识的，尤其是 HTTPS 和文件上传下载这块，只需要简单的配置就能完成，我个人感觉还是挺值得去学习和借鉴的。

开源精神难能可贵，好的开源需要大家的添砖加瓦和支持。希望这篇文章能给大家在选择 HTTP 客户端框架时带来一个新的选择，对，就是 Forest。

这篇文章不仅介绍了 Forest 这个轻量级的 HTTP 客户端框架，还回顾了它的底层实现：HttpClient 和 OkHttp，希望能对大家有所帮助。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
