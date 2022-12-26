---
category:
  - Java企业级开发
tag:
  - Spring Boot
---


# 崩溃！我带的实习生竟然把图片直接存到了服务器上！

小二是新来的实习生，作为技术 leader，我给他安排了一个非常简单的练手任务，把前端 markdown 编辑器里上传的图片保存到服务器端，结果他真的就把图片直接保存到了服务器上，这下可把我气坏了，就不能搞个对象存储服务，比如说 OSS、MinIO？

他理直气壮地反驳道：“谁让你不讲清楚，我去找老板把你开掉！”我瞬间就怂了，说，“来来来，我手把手教你怎么把图片保存到 OSS 上，好不好？”

“不用了，还是我来教你吧。”小二非常自信，下面是他在 Spring Boot 应用中整合 OSS 做的记录。

特此声明：阿里云 OSS 的产品负责人看到后请自觉过来结算下推广费用（狗头）。真心讲：Spring Boot+OSS 在实际开发中挺常见的。


### 一、开通 OSS



OSS 也就是 Object Storage Service，是阿里云提供的一套对象存储服务，国内的竞品还有七牛云的 Kodo和腾讯云的COS。

第一步，登录阿里云官网，搜索“OSS”关键字，进入 OSS 产品页。

第二步，如果是 OSS 新用户的话，可以享受 6 个月的新人专享优惠价，不过续费的时候还是会肉疼。

第三步，进入 OSS 管理控制台，点击「Bucket 列表」，点击「创建 Bucket」。

![](https://img-blog.csdnimg.cn/img_convert/90545c542bb7576f37d3e7d214d65ea2.png)

Bucket 的词面意思是桶，这里指存储空间，就是用于存储对象的容器。注意读写权限为“公共读”，也就是允许互联网用户访问云空间上的图片。

第四步，点击「确定」就算是开通成功了。

### 二、整合 OSS

第一步，在 pom.xml 文件中添加 OSS 的依赖。

```
<!-- 阿里云 OSS -->
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.10.2</version>
</dependency>
```

第二步，在 application.yml 文件中添加 OSS 配置项。

```
aliyun:
  oss:
      # oss对外服务的访问域名
    endpoint: oss-cn-beijing.aliyuncs.com
      # 访问身份验证中用到用户标识
    accessKeyId: LTAI5
      # 用户用于加密签名字符串和oss用来验证签名字符串的密钥
    accessKeySecret: RYN
      # oss的存储空间
    bucketName: itwanger-oss1
      # 上传文件大小(M)
    maxSize: 3
      # 上传文件夹路径前缀
    dir:
      prefix: codingmore/images/
```

第三步，新增 OssClientConfig.java 配置类，主要就是通过  @Value 注解从配置文件中获取配置项，然后创建 OSSClient。

```java
@Configuration
public class OssClientConfig {
    @Value("${aliyun.oss.endpoint}")
    String endpoint ;
    @Value("${aliyun.oss.accessKeyId}")
    String accessKeyId ;
    @Value("${aliyun.oss.accessKeySecret}")
    String accessKeySecret;

    @Bean
    public OSSClient createOssClient() {
        return (OSSClient)new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
    }
}
```

第四步，新增文件上传接口 OssController.java，参数为 MultipartFile。

```java
@Controller
@Api(tags = "上传")
@RequestMapping("/ossController")
public class OssController {
    @Autowired
    private IOssService ossService;

    @RequestMapping(value = "/upload",method=RequestMethod.POST)
    @ResponseBody
    @ApiOperation("上传")
    public ResultObject<String> upload(@RequestParam("file") MultipartFile file, HttpServletRequest req)  {
        return ResultObject.success(ossService.upload(file));
    }
}
```

第五步，新增 Service，将文件上传到 OSS，并返回文件保存路径。

```java
@Service
public class OssServiceImpl implements IOssService{

    @Value("${aliyun.oss.maxSize}")
    private int maxSize;
   
    @Value("${aliyun.oss.bucketName}")
    private String bucketName;
  
    @Value("${aliyun.oss.dir.prefix}")
    private String dirPrefix;
    
    @Autowired
    private OSSClient ossClient;   
    @Override
    public String upload(MultipartFile file) {
        try {
            return upload(file.getInputStream(), file.getOriginalFilename());
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
        return null;
    }

    @Override
    public String upload(InputStream inputStream,String name) {
        String objectName = getBucketName(name);
        // 创建PutObject请求。
        ossClient.putObject(bucketName, objectName, inputStream);
        return formatPath(objectName);
    }
    private String getBucketName(String url){
        String ext = "";
        for(String extItem:imageExtension){
            if(url.indexOf(extItem) != -1){
                ext = extItem;
                break;
            }
        }
        return dirPrefix+ DateUtil.today()+"/"+ IdUtil.randomUUID()+ext;
    }

    private String formatPath(String objectName){
        return "https://"  +bucketName+"."+ ossClient.getEndpoint().getHost() + "/" + objectName;
    }
}  
```

第六步，打开 Apipost，测试 OSS 上传接口，注意参数选择文件，点击发送后可以看到服务器端返回的图片链接。

![](https://img-blog.csdnimg.cn/img_convert/d8c828ba200687eb61e86a7c474bcaaa.png)

第七步，进入阿里云 OSS 后台管理，可以确认图片确实已经上传成功。

![](https://img-blog.csdnimg.cn/img_convert/3b861901786b72335c400da1cd587007.png)

### 三、拉取前端代码来测试 OSS 上传接口

codingmore-admin-web 是编程喵（Codingmore）的前端管理项目，可以通过下面的地址拉取到本地。

>https://github.com/itwanger/codingmore-admin-web

执行 `yarn run dev` 命令后就可以启动 Web 管理端了，进入到文章编辑页面，选择一张图片进行上传，可以确认图片是可以正常从前端上传到服务器端，服务器端再上传到 OSS，之后再返回前端图片访问链接的。

![](https://img-blog.csdnimg.cn/img_convert/51dbf95c222354de4d9653a0ef270944.png)

### 四、利用 OSS 进行自动转链

第一步，在 PostsServiceImpl.java 中添加图片转链的方法，主要利用正则表达式找出文章内容中的外链，然后将外链的图片上传到 OSS，然后再替换掉原来的外链图片。

```java
// 匹配图片的 markdown 语法
// ![](hhhx.png)
// ![xx](hhhx.png?ax)
public static final String IMG_PATTERN = "\\!\\[.*\\]\\((.*)\\)";

private void handleContentImg(Posts posts) {
    String content = posts.getPostContent();

    Pattern p = Pattern.compile(IMG_PATTERN, Pattern.CASE_INSENSITIVE);
    Matcher m = p.matcher(content);

    Map<String, Future<String>> map = new HashMap<>();

    while (m.find()) {
        String imageTag = m.group();
        LOGGER.info("使用分组进行替换{}", imageTag);

        String imageUrl = imageTag.substring(imageTag.indexOf("(") + 1, imageTag.indexOf(")"));

        // 确认是本站链接，不处理
        if (imageUrl.indexOf(iOssService.getEndPoint()) != -1) {
            continue;
        }

        // 通过线程池将图片上传到 OSS
        Future<String> future = ossUploadImageExecutor.submit(() -> {
            return iOssService.upload(imageUrl);
        });
        map.put(imageUrl, future);
    }

    for (String oldUrl : map.keySet()) {
        Future<String> future = map.get(oldUrl);

        try {
           String imageUrl = future.get();
           content = content.replace(oldUrl, imageUrl);
        } catch (InterruptedException | ExecutionException e) {
            LOGGER.error("获取图片链接出错{}", e.getMessage());
        }
        
    }
    posts.setPostContent(content);
} 
```

第二步，在 OssServiceImpl.java 中添加根据外链地址上传图片到 OSS 的方法。

```java
public String upload(String url) {
    String objectName = getFileName(url);
    try (InputStream inputStream = new URL(url).openStream()) {
        ossClient.putObject(bucketName, objectName, inputStream);
    } catch (IOException e) {
        LOGGER.error(e.getMessage());
    }
    return formatOSSPath(objectName);
}
```

第三步，通过 Web 管理端来测试外链是否转链成功。先找两张外链的图片，可以看到 markdown 在预览的时候就不显示。

![](https://img-blog.csdnimg.cn/img_convert/5d7f479d69f7139d1ceb26ac27e2b19f.png)

然后我们点击发布，可以看到两张图片都正常显示了，因为转成了 OSS 的图片访问地址。

![](https://img-blog.csdnimg.cn/img_convert/5acb7ffa8c9856b6c5471632ae2e9ecf.png)

### 五、小结

综上来看，实习生小二在 Spring Boot 中整合 OSS 的代码还是挺靠谱的。也许 OSS+CDN 才是图床的最好解决方案，不过[阿里云的 HTTPS CDN 在 GitHub 上无法回源](https://mp.weixin.qq.com/s/VRmXn2_71yy3w-SvKTs1Fg)导致图片不显示的问题仍然没有得到有效的解决。

需要源码的小伙伴可以直接到编程喵🐱源码路径拉取：

>[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)

-------

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)


