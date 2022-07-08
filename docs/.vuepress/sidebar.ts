import { sidebar } from "vuepress-theme-hope";
export const sidebarConfig = sidebar({
  "/zhishixingqiu/": ["readme.md","first","java-mianshi-zhinan","may","june"],
  "/download/": ["java","nicearticle", "history"],
  "/nice-article/itmind/": [
    "readme.md",
    "ideapxideajhideayjjhmideazxjhzcmpjjcyjjhqcyx",
    "yigkymxczideatsyqdffblwxjcywdxbxt",
    "ideapjazjczxjhmzcmyjjhcxgxz",
    "ideajhmideajhmideapxideajhmideazcmideayjjhm",
    "navicatmacyjpx",
    "navicatzxbwindowspjbjc",
    "typorayjpx",
    "typoramaczwpjbhyjjdkptmarkdownbjqmksimacsocom",
    "xshellazpjbjcxshellpxffxbxt",
  ],
  "/xuexiluxian/": [
    {
      text: "Java学习路线",
      prefix: "java/",
      collapsable: true,
      children: [
        "yitiaolong",
        "thread",
        "jvm",
      ],
    },
    "c.md",
    "ccc.md",
    "python",
    "go",
    "os",
    "qianduan",
    "algorithm",
    "lanqiaobei",
    "bigdata",
  ],
  "/sidebar/sanfene/": [
    "javase.md",
    "collection.md",
    "javathread.md",
    "jvm.md",
    "spring.md",
    "redis.md",
    "mybatis.md",
    "mysql.md",
    "os.md",
    
  ],
  // 必须放在最后面
  "/": [
    {
      text: "一、前言",
      link: "home.md",
    },
    {
      text: "二、Java核心",
      collapsable: true,
      children: [
        {
          prefix: "overview/",
          text: "2.1 Java概述",
          collapsable: true,
          children: [
          "what-is-java",
          "java-history",
          "java-can-do-what",
          "jdk-install-config",
          "IDEA-install-config",
          "hello-world",
          ],
        },
        {
          text: "2.2 Java基础语法",
          collapsable: true,
          children: [
          {
            text: "基本数据类型",
            link: "basic-grammar/basic-data-type",
          },
          {
            text: "流程控制语句",
            link: "basic-grammar/flow-control",
          },
          {
            text: "运算符",
            link: "basic-grammar/operator",
          },
          {
            text: "注释",
            link: "basic-grammar/javadoc",
          },
          {
            text: "关键字",
            link: "basic-extra-meal/48-keywords",
          },
          {
            text: "命名规范",
            link: "basic-extra-meal/java-naming",
          },
          ],
        },
        {
          text: "2.3 面向对象编程",
          collapsable: true,
          children: [
          {
            text: "对象和类",
            link: "oo/object-class",
          },
          {
            text: "变量",
            link: "oo/var",
          },
          {
            text: "方法",
            link: "oo/method",
          },
          {
            text: "构造方法",
            link: "oo/construct",
          },
          "nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi",
          {
            text: "代码初始化块",
            link: "oo/code-init",
          },
          {
            text: "抽象类",
            link: "oo/abstract",
          },
          {
            text: "接口",
            link: "oo/interface",
          },
          {
            text: "内部类",
            link: "oo/inner-class",
          },
          {
            text: "static",
            link: "oo/static",
          },
          {
            text: "this 和 super",
            link: "oo/this-super",
          },
          {
            text: "final",
            link: "oo/final",
          },
          {
            text: "instanceof",
            link: "oo/instanceof",
          },
          {
            text: "不可变对象",
            link: "basic-extra-meal/immutable",
          },
          {
            text: "可变参数",
            link: "basic-extra-meal/varables",
          },
          {
            text: "泛型",
            link: "basic-extra-meal/generic",
          },
          {
            text: "注解",
            link: "basic-extra-meal/annotation",
          },
          {
            text: "枚举",
            link: "basic-extra-meal/enum",
          },
          {
            text: "反射",
            link: "basic-extra-meal/fanshe",
          },
          
          ],
        },
        {
          text: "2.4 字符串&数组",
          collapsable: true,
          children: [
        
          {
            text: "字符串为什么是不可变的",
            link: "string/immutable",
          },
          {
            text: "字符串常量池",
            link: "string/constant-pool",
          },
          {
            text: " String#intern",
            link: "string/intern",
          },
          {
            text: "字符串比较",
            link: "string/equals",
          },
          {
            text: "字符串拼接",
            link: "string/join",
          },
          {
            text: "字符串分割",
            link: "string/split",
          },
          {
            text: "数组",
            link: "array/array",
          },
          {
            text: "打印数组",
            link: "array/print",
          },
          
          ],
        },
        {
          text: "2.5 集合框架（容器）",
          collapsable: true,
          children: [
          
          {
            text: "概述",
            link: "collection/gailan",
          },
          {
            text: "ArrayList",
            link: "collection/arraylist",
          },
          {
            text: "LinkedList",
            link: "collection/linkedlist",
          },
          {
            text: "ArrayList和LinkedList的区别",
            link: "collection/list-war-2",
          },
          {
            text: "Iterator和Iterable",
            link: "collection/iterator-iterable",
          },
          {
            text: "fail-fast",
            link: "collection/fail-fast",
          },
          {
            text: "HashMap",
            link: "collection/hashmap",
          },
         
          ],
        },
        {
          text: "2.6 IO",
          collapsable: true,
          prefix:"io/",
          children: [
          {
            text: "概览",
            link: "shangtou",
          },
          {
            text: "BIO、NIO和AIO",
            link: "BIONIOAIO",
          },
          ],
        },
        {
          text: "2.7 异常处理",
          collapsable: true,
          prefix:"exception/",
          children: [
          {
            text: "概览",
            link: "gailan",
          },
          {
            text: "try-with-resouces",
            link: "try-with-resouces",
          },
          {
            text: "最佳实践",
            link: "shijian",
          },
          {
            text: "NullPointerException",
            link: "npe",
          },
          ],
        },
        {
          text: "2.8 常用工具类",
          collapsable: true,
          prefix:"common-tool/",
          children: [
          {
            text: "Arrays",
            link: "arrays",
          },
          {
            text: "Collections",
            link: "collections",
          },
          {
            text: "Hutool",
            link: "hutool",
          },
          {
            text: "Guava",
            link: "guava",
          },
          ],
        },
        {
          text: "2.9 Java新特性",
          prefix: "java8/",
          collapsable: true,
          children: [
          {
            text: "Stream",
            link: "stream",
          },
          {
            text: "Optional",
            link: "optional",
          },
          {
            text: "Lambda",
            link: "Lambda",
          },
          ],
        },
        {
          text: "2.10 Java重要知识点",
          prefix:"basic-extra-meal/",
          collapsable: true,
          children: [
          {
            text: "Unicode和UTF-8编码",
            link: "java-unicode",
          },
          {
            text: "new Integer和Integer.valueOf区别",
            link: "int-cache",
          },
          {
            text: "拆箱和装箱",
            link: "box",
          },
          {
            text: "浅拷贝与深拷贝",
            link: "deep-copy",
          },
          {
            text: "深入理解Java中的hashCode方法",
            link: "hashcode",
          },
          {
            text: "重写equals时为什么要重写hashCode",
            link: "equals-hashcode",
          },
          {
            text: "重写和重载的区别",
            link: "override-overload",
          },
          {
            text: "重写时应当遵守的11条规则",
            link: "Overriding",
          },
          {
            text: "Java到底是值传递还是引用传递",
            link: "pass-by-value",
          },
          {
            text: "Java为什么不能实现真正的泛型",
            link: "true-generic",
          },
          {
            text: "Comparable和Comparator的区别",
            link: "comparable-omparator",
          },
          {
            text: "JDK9中String为什么由char[]改成byte[]",
            link: "jdk9-char-byte-string",
          },
          {
            text: "JDK源码无限循环用for(;;)还是while(true)",
            link: "jdk-while-for-wuxian-xunhuan",
          },
          {
            text: "先有Class还是先有Object",
            link: "class-object",
          },
          {
            text: "instanceof关键字是如何实现的",
            link: "instanceof-jvm",
          },
          ],
        },
        {
          text: "2.11 并发编程",
          collapsable: true,
          prefix: "thread/",
          children: [
          "wangzhe-thread",
          {
            text: "线程的6种状态及切换",
            link: "thread-state-and-method",
          },
          {
            text: "线程组和线程优先级",
            link: "thread-group-and-thread-priority",
          },
          {
            text: "进程与线程的区别",
            link: "why-need-thread",
          },
          {
            text: "并发编程带来了哪些问题",
            link: "thread-bring-some-problem",
          },
          {
            text: "Java内存模型",
            link: "jmm",
          },
          {
            text: "volatile",
            link: "volatile",
          },
          {
            text: "synchronized",
            link: "synchronized",
          },
          {
            text: "CAS的原理",
            link: "cas",
          },
          {
            text: "AQS详解",
            link: "aqs",
          },
          {
            text: "锁",
            link: "lock",
          },
          {
            text: "重入锁ReentrantLock",
            link: "reentrantLock",
          },
          {
            text: "读写锁ReentrantReadWriteLock",
            link: "ReentrantReadWriteLock",
          },
          {
            text: "线程协作类Condition",
            link: "condition",
          },
          {
            text: "线程阻塞唤醒类LockSupport",
            link: "LockSupport",
          },
          {
            text: "并发集合容器",
            link: "map",
          },
          {
            text: "ConcurrentHashMap",
            link: "ConcurrentHashMap",
          },
          {
            text: "ConcurrentLinkedQueue",
            link: "ConcurrentLinkedQueue",
          },
          {
            text: "CopyOnWriteArrayList",
            link: "CopyOnWriteArrayList",
          },
          {
            text: "ThreadLocal",
            link: "ThreadLocal",
          },
          {
            text: "BlockingQueue",
            link: "BlockingQueue",
          },
          {
            text: "线程池",
            link: "pool",
          },
          {
            text: "计划任务",
            link: "ScheduledThreadPoolExecutor",
          },
          {
            text: "原子操作类",
            link: "atomic",
          },
          {
            text: "通信工具类CountDownLatch",
            link: "CountDownLatch",
          },
          {
            text: "Fork/Join框架",
            link: "fork-join",
          },
          {
            text: "生产者-消费者模式",
            link: "shengchanzhe-xiaofeizhe",
          },

          ],
        },
        {
          text: "2.12 JVM",
          prefix: "jvm/",
          collapsable: true,
          children: [
          {
            text: "JVM到底是什么？",
            link: "what-is-jvm",
          },
          {
            text: "JVM到底是如何运行Java代码的",
            link: "how-run-java-code",
          },
          {
            text: "类加载机制",
            link: "class-load",
          },
          {
            text: "详解Java的类文件结构",
            link: "class-file-jiegou",
          },
          {
            text: "从javap的角度轻松看懂字节码",
            link: "bytecode",
          },
          {
            text: "字节码指令详解",
            link: "zijiema-zhiling",
          },
          {
            text: "虚拟机是如何执行字节码指令的",
            link: "how-jvm-run-zijiema-zhiling",
          },
          {
            text: "HSDB（Hotspot Debugger）",
            link: "hsdb",
          },
          {
            text: "史上最通俗易懂的ASM教程",
            link: "asm",
          },
          {
            text: "自己编译JDK",
            link: "compile-jdk",
          },
          {
            text: "深入理解JVM的内存结构",
            link: "neicun-jiegou",
          },
          {
            text: "Java 创建的对象到底放在哪",
            link: "whereis-the-object",
          },
          {
            text: "从头到尾说一次Java垃圾回收",
            link: "gc",
          },
          {
            text: "图解Java的垃圾回收机制",
            link: "tujie-gc",
          },
          {
            text: "Java问题诊断和排查工具",
            link: "problem-tools",
          },
          {
            text: "JIT原理解析及实践",
            link: "jit",
          },
          {
            text: "内存溢出排查优化实战",
            link: "oom",
          },
          {
            text: "CPU 100% 排查优化实践",
            link: "cpu-percent-100",
          },
          {
            text: "JVM 核心知识点总结",
            link: "zongjie",
          },
          
          ],
        },
      ],
    },
    {
      text: "三、Java企业级开发",
      collapsable: true,
      children: [
        {
          text: "3.1 开发工具",
          collapsable: true,
          children: [
          "maven/maven.md",
          "git/git-qiyuan.md",
          "nginx/nginx.md",
          ],
        },
        {
          text: "3.2 IDE/编辑器",
          collapsable: true,
          children: [
          "ide/4-debug-skill.md",
          ],
        },
        {
          text: "3.3 Spring",
          collapsable: true,
          children: [
            {
              text: "Spring AOP扫盲",
              link: "springboot/aop-log",
            },
            {
              text: "Spring IoC扫盲",
              link: "springboot/ioc",
            },
          ],
        },
        {
          text: "3.4 SpringBoot",
          collapsable: true,
          children: [
            {
              text: "搭建第一个Spring Boot项目",
              link: "springboot/initializr",
            },
            {
              text: "整合MySQL和Druid",
              link: "springboot/mysql-druid",
            },
            {
              text: "整合JPA",
              link: "springboot/jpa",
            },
            {
              text: "整合Thymeleaf",
              link: "springboot/thymeleaf",
            },
            {
              text: "开启事务支持",
              link: "springboot/transaction",
            },
            {
              text: "过滤器、拦截器、监听器",
              link: "springboot/Filter-Interceptor-Listener",
            },
            {
              text: "整合Redis实现缓存",
              link: "redis/redis-springboot",
            },
            {
              text: "整合Logback",
              link: "springboot/logback"
            },
            {
              text: "整合Swagger-UI",
              link: "springboot/swagger"
            },
            {
              text: "整合Knife4j",
              link: "gongju/knife4j"
            },
            {
              text: "整合SpringTask",
              link: "springboot/springtask"
            },
            {
              text: "整合MyBatis-Plus AutoGenerator",
              link: "kaiyuan/auto-generator",
            },
            "springboot/quartz",
            "springboot/mybatis",
            "springboot/docker",
            "springboot/macos-codingmore-run",
            "springboot/windows-codingmore-run",
            "springboot/linux-codingmore-run",
            "springboot/validator",
          ],
        },
        {
          text: "3.5 辅助工具",
          collapsable: true,
          children: [
            {
              text: "高逼格终端工具Tabby",
              link: "gongju/tabby",
            },
            {
              text: "21世纪人用的终端工具Warp",
              link: "gongju/warp",
            },
            "gongju/choco",
            "gongju/brew",
            {
              text: "数据库设计神器chiner",
              link: "gongju/chiner",
            },
            {
              text: "数据库操作工具DBeaver",
              link: "gongju/DBeaver",
            },
          ],
        },
        {
          text: "3.6 开源轮子",
          collapsable: true,
          children: [
            {
              text: "HTTP调用框架Forest",
              link: "gongju/forest",
            },
            {
              text: "单元测试Junit",
              link: "gongju/junit",
            },
            {
              text: "阿里开源的fastjson",
              link: "gongju/fastjson",
            },
            {
              text: "谷歌开源的Gson",
              link: "gongju/gson",
            },
            {
              text: "SpringBoot内置的Jackson",
              link: "gongju/jackson",
            },
            {
              text: "日志框架的鼻祖Log4j",
              link: "gongju/log4j",
            },
            {
              text: "高性能日志框架Log4j2",
              link: "gongju/log4j2",
            },
            {
              text: "Spring Boot内置的Logback",
              link: "gongju/logback",
            },
            {
              text: "日志门面SLF4J",
              link: "gongju/slf4j",
            },
            
          ],
        },
        {
          text: "3.7 分布式",
          collapsable: true,
          children: [
            {
              text: "Elasticsearch入门",
              link: "elasticsearch/rumen"
            },
            {
              text: "聊聊ZooKeeper",
              link: "zookeeper/jibenjieshao"
            },
            {
              text: "聊聊微服务网关",
              link: "microservice/api-wangguan"
            },
          ],
        },
        {
          text: "3.8 消息队列",
          collapsable: true,
          children: [
            {
              text: "RabbitMQ入门",
              link: "mq/rabbitmq-rumen"
            },
            {
              text: "如何保障消息不丢失",
              link: "mq/100-budiushi"
            },
          ],
        },
      ],
    },
    {
      text: "四、数据库",
      collapsable: true,
      children: [
        {
          text: "MySQL",
          collapsable: true,
          children: [
            {
              text: "MySQL和Redis数据一致性",
              link: "mysql/redis-shuju-yizhixing"
            },
          ],
        },
        {
          text: "Redis",
          collapsable: true,
          children: [
            {
              text: "Redis入门",
              link: "redis/rumen"
            },
            {
              text: "缓存雪崩、穿透、击穿",
              link: "redis/xuebeng-chuantou-jichuan"
            },
          ],
        },
        {
          text: "MongoDB",
          collapsable: true,
          children: [
            "mongodb/rumen",
          ],
        },
      ],
    },
    {
      text: "五、计算机基础",
      collapsable: true,
      prefix: "cs/",
      children: [
        {
          text: "计算机操作系统",
          link: "os",
        },
        {
          text: "计算机网络",
          link: "wangluo",
        },
      ],
    },
    {
      text: "六、求职面试",
      collapsable: true,
      children: [
        {
          text: "面试题集合",
          collapsable: true,
          children: [
            "baguwen/java-basic-34",
            "collection/hashmap-interview",
            "mianjing/redis12question",
            "nginx/40-interview"
          ],
        },
        
        {
          text: "背诵版八股文",
          collapsable: true,
          children: [
            "baguwen/java-basic",
            "baguwen/java-thread",
            "baguwen/jvm",
            "sidebar/herongwei/mysql",
          ],
        },
        {
          text: "优质面经",
          collapsable: true,
          children: [
            "mianjing/shanganaliyun",
            "nice-article/weixin/shezynmjfxhelmtttjddd",
            "nice-article/weixin/xuelybdzheloffer",
            "nice-article/weixin/huanxgzl",
            
          ],
        },
        {
          text: "面试准备",
          collapsable: true,
          children: [
            "nice-article/weixin/zijxjjdyfqzgl",
            "nice-article/weixin/miansmtgl",
            "nice-article/weixin/luoczbmsddyb",
            "nice-article/weixin/youdxzhhmjzlycfx",
          ],
        },
        {
          text: "城市选择",
          prefix: "cityselect/",
          collapsable: true,
          children: [
            "beijing",
            "chengdu",
            "guangzhou",
            "hangzhou",
            "nanjing",
            "qingdao",
            "shenzhen",
            "suzhou",
            "xian",
            "zhengzhou",
            "jinan",
          ],
        },
      ],
    },
    {
      text: "七、学习资源",
      collapsable: true,
      children: [
        "download/java.md",
        "nice-article/weixin-bagwpdf.md",
        "nice-article/weixin-shenrjcjavabfbchwjdhl.md",
        "nice-article/weixin-githubxbkdjavajccjyh.md",
        "nice-article/weixin-shejmsnb.md",
        "nice-article/weixin-mozdsdzfjavableetcodetxxk.md",
        "nice-article/yuanyifeng-c-language.md",
        "nice-article/bat-shuati.md",
        "nice-article/weixin-piaolwzjztqdtskwlzfpdf.md",
        "nice-article/progit.md",
        "nice-article/jianli.md",
      ],
    },
    {
      text: "八、学习建议",
      collapsable: true,
      children: [
          "xuexijianyi/read-csapp",
          "xuexijianyi/electron-information-engineering",
          "nice-article/zhihu/gaoktzyjsjjkrgznrgdsjwlwwlgcgzyx",
          "nice-article/weixin/ceskfgcsbdjdhsqdcjzssfl",
        ],
    },
    {
      text: "九、知识库搭建",
      collapsable: true,
      prefix: "szjy/",
      children: [
          "buy-cloud-server",
          "install-baota-mianban",
          "buy-domain",
          "record-domain",
          "https-domain",
        ],
    },
    {
      text: "十、联系作者",
      collapsable: true,
      prefix: "about-the-author/",
      children: [
        "bzhan-10wan",
        "zhihu-1000wan",
        "csdn-1000wan",
        "readme.md",
        
      ],
    },
  ],
});



