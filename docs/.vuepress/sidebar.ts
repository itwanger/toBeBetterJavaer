import { sidebar } from "vuepress-theme-hope";
export const sidebarConfig = sidebar({
  "/zhishixingqiu/": ["readme.md","map","may","june","july"],
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
    "pycharmjhpxmazjcnyrgxxbxt",
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
    "android",
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
    "network.md",
    "rocketmq.md",
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
          text: "2.2 Java语法基础",
          collapsable: true,
          children: [
          "basic-extra-meal/48-keywords",
          "basic-extra-meal/java-naming",
          "basic-grammar/javadoc",
          "basic-grammar/basic-data-type",
          "basic-grammar/type-cast",
          "basic-grammar/operator",
          "basic-grammar/flow-control",
          ],
        },
        {
          text: "2.3 数组&字符串",
          collapsable: true,
          children: [
          "array/array",
          "array/print",
          "string/immutable",
          "string/constant-pool",
          "string/intern",
          "string/equals",
          "string/join",
          "string/split",
          ],
        },
        {
          text: "2.4 面向对象编程",
          collapsable: true,
          children: [
          "oo/object-class",
          "oo/package",
          "oo/var",
          "oo/method",
          "oo/construct",
          "oo/access-control",
          "oo/code-init",
          "oo/abstract",
          "oo/interface",
          "oo/abstract-vs-interface",
          "oo/inner-class",
          "oo/this-super",
          "basic-extra-meal/override-overload",
          "oo/static",
          "oo/final",
          "oo/encapsulation",
          "oo/extends-bigsai",
          "oo/polymorphism",
          
          ],
        },
        {
          text: "2.5 集合框架（容器）",
          collapsable: true,
          children: [
          
          "collection/gailan",
          "collection/arraylist",
          "collection/linkedlist",
          "collection/list-war-2",
          "collection/iterator-iterable",
          "collection/fail-fast",
          "collection/hashmap",
          "collection/linkedhashmap",
          "collection/treemap",
          "collection/arraydeque",
          "collection/PriorityQueue",
          "collection/WeakHashMap",
         
          ],
        },
        {
          text: "2.6 IO",
          collapsable: true,
          prefix:"io/",
          children: [
          "shangtou",
          "file-path",
          "stream",
          "reader-writer",
          "buffer",
          "char-byte",
          "serialize",
          "Serializbale",
          "transient",
          "print",
          ],
        },
        {
          text: "2.7 异常处理",
          collapsable: true,
          prefix:"exception/",
          children: [
          "gailan",
          "try-with-resouces",
          "shijian",
          "npe",
          ],
        },
        {
          text: "2.8 常用工具类",
          collapsable: true,
          prefix:"common-tool/",
          children: [
          "arrays",
          "collections",
          "hutool",
          "guava",
          "utils",
          ],
        },
        {
          text: "2.9 Java新特性",
          prefix: "java8/",
          collapsable: true,
          children: [
          "stream",
          "optional",
          "Lambda",
          ],
        },
        {
          text: "2.10 Java重要知识点",
          prefix:"basic-extra-meal/",
          collapsable: true,
          children: [
          "java-unicode",
          "int-cache",
          "box",
          "deep-copy",
          "hashcode",
          "equals-hashcode",
          "Overriding",
          "pass-by-value",
          "comparable-omparator",
          "jdk9-char-byte-string",
          "jdk-while-for-wuxian-xunhuan",
          "class-object",
          "instanceof",
          "instanceof-jvm",
          "immutable",
          "varables",
          "generic",
          "true-generic",
          "annotation",
          "enum",
          "fanshe",
          ],
        },
        {
          text: "2.11 网络编程",
          collapsable: true,
          prefix: "socket/",
          children: [
            "socket",
            "http",
          ],
        },
        {
          text: "2.12 NIO",
          collapsable: true,
          prefix: "nio/",
          children: [
            "why",
            "rumen",
            "moxing",
            "network-connect",
            "BIONIOAIO",
          ],
        },
        {
          text: "2.13 并发编程",
          collapsable: true,
          prefix: "thread/",
          children: [
          "wangzhe-thread",
          "thread-state-and-method",
          "thread-group-and-thread-priority",
          "why-need-thread",
          "thread-bring-some-problem",
          "jmm",
          "volatile",
          "synchronized-1",
          "synchronized",
          "cas",
          "aqs",
          "lock",
          "reentrantLock",
          "ReentrantReadWriteLock",
          "condition",
          "LockSupport",
          "map",
          "ConcurrentHashMap",
          "ConcurrentLinkedQueue",
          "CopyOnWriteArrayList",
          "ThreadLocal",
          "BlockingQueue",
          "pool",
          "ScheduledThreadPoolExecutor",
          "atomic",
          "CountDownLatch",
          "fork-join",
          "shengchanzhe-xiaofeizhe",

          ],
        },
        {
          text: "2.14 JVM",
          prefix: "jvm/",
          collapsable: true,
          children: [
          "what-is-jvm",
          "how-run-java-code",
          "class-load",
          "class-file-jiegou",
          "bytecode",
          "zijiema-zhiling",
          "how-jvm-run-zijiema-zhiling",
          "hsdb",
          "asm",
          "compile-jdk",
          "neicun-jiegou",
          "whereis-the-object",
          "gc",
          "tujie-gc",
          "meituan-9-gc",
          "problem-tools",
          "jit",
          "oom",
          "cpu-percent-100",
          "zongjie",
          
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
          "ide/xechat.md",
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
          text: "3.5 Netty",
          collapsable: true,
          children: [
            "netty/rumen",
          ],
        },
        {
          text: "3.6 辅助工具",
          collapsable: true,
          children: [
            "gongju/choco",
            "gongju/brew",
            "gongju/tabby",
            "gongju/warp",
            "gongju/windterm",
            "gongju/chiner",
            "gongju/DBeaver",
          ],
        },
        {
          text: "3.7 开源轮子",
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
          text: "3.8 分布式",
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
          text: "3.9 消息队列",
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
          text: "面试题&八股文",
          collapsable: true,
          prefix:"interview/",
          children: [
            "java-34",
            "java-hashmap-13",
            "redis-12",
            "mysql-60",
            "java-basic-baguwen",
            "java-thread-baguwen",
            "java-jvm-baguwen",
            "mianshiguan-bigfile-miaochuan",
            "mianshiguan-fenkufenbiao",
            "mianshiguan-youhuiquan",
          ],
        },
        {
          text: "优质面经",
          collapsable: true,
          prefix:"mianjing/",
          children: [
            "shanganaliyun",
            "shezynmjfxhelmtttjddd",
            "xuelybdzheloffer",
            "huanxgzl",
            "quzjlsspdx",
            "zheisnylzldhzd",
            "chengxyspnhxagzl",
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
            "nice-article/weixin/zheisnylzldhzd",
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
      prefix: "pdf/",
      children: [
        "programmer-111.md",
        "java-concurrent.md",
        "github-java-jiaocheng-115-star.md",
        "shejimoshi.md",
        "java-leetcode.md",
        "ali-java-shouce.md",
        "yuanyifeng-c-language.md",
        "bat-shuati.md",
        "os.md",
        "progit.md",
        "jianli.md",
      ],
    },
    {
      text: "八、学习建议",
      collapsable: true,
      prefix: "xuexijianyi/",
      children: [
          "LearnCS-ByYourself",
          "read-csapp",
          "electron-information-engineering",
          "gaokao-zhiyuan-cs",
          "test-programmer-read-books",
          "xiaozhao-java-should-master",
          "chengxuyuan-fuye",
          "ruhzfzdgzzcxcz",
          "gaobingfa-jingyan-hsmcomputer",
          "hr-xinzi",
          "35-weiji",
          "20ren-it-quma",
          "benkesheng-ali-tengxun",
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



