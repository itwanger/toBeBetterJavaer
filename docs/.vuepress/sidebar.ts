import { sidebar } from "vuepress-theme-hope";
export const sidebarConfig = sidebar({
  "/zhishixingqiu/": [
    "readme.md",
    "map",
    "may",
    "june",
    "july",
    "august"
  ],
  // 你可以省略 .md 扩展名，以 / 结尾的路径会被推断为 /README.md(区分大小写)
  "/nice-article/itmind/": [
    "readme.md",
    "shangwang.md",
    "ideapxideajhideayjjhmideazxjhzcmpjjcyjjhqcyx",
    "yigkymxczideatsyqdffblwxjcywdxbxt",
    "ideapjazjczxjhmzcmyjjhcxgxz",
    "ideajhmideajhmideapxideajhmideazcmideayjjhm",
    "intellijidearhgbgxdsxbxt",
    "navicatmacyjpx",
    "navicatzxbwindowspjbjc",
    "typorayjpx",
    "typoramaczwpjbhyjjdkptmarkdownbjqmksimacsocom",
    "xshellazpjbjcxshellpxffxbxt",
    "pycharmjhpxmazjcnyrgxxbxt",
    "webstormjhmwebstormwdzsjhmxbxt",
    "visualstudiopxbazjcnfvisualstudiojhmmyxbxt",
    "sublimetextzcmpjazjcqckyxbxt",
    "termius-macos",
  ],
  "/pdf/": [
    "java",
    "programmer-111",
    "java-concurrent",
    "github-java-jiaocheng-115-star",
    "shejimoshi",
    "java-leetcode",
    "ali-java-shouce",
    "yuanyifeng-c-language",
    "bat-shuati",
    "os",
    "progit",
    "jianli",
  ],
  "/xuexiluxian/": [
    {
      text: "Java学习路线",
      prefix: "java/",
      collapsible: true,
      children: [
        "yitiaolong",
        "thread",
        "jvm",
      ],
    },
    "mysql",
    "redis",
    "c",
    "ccc",
    "python",
    "go",
    "os",
    "qianduan",
    "algorithm",
    "lanqiaobei",
    "bigdata",
    "android",
    "donet",
  ],
  "/sidebar/sanfene/": [
    "nixi",
    "javase",
    "collection",
    "javathread",
    "jvm",
    "spring",
    "redis",
    "mybatis",
    "mysql",
    "os",
    "network",
    "rocketmq",
    "fenbushi",
  ],
  // 必须放在最后面
  "/": [
    {
      text: "一、前言",
      link: "home",
    },
    {
      text: "二、Java基础",
      collapsible: true,
      children: [
        // readme小写一定要带上.md，否则找不到
        // Java核心开始
        {
          prefix: "overview/",
          text: "2.1 Java概述及环境配置",
          collapsible: true,
          children: [
          "readme.md",
          "what-is-java",
          "jdk-install-config",
          "IDEA-install-config",
          "hello-world",
          ],
        },
        {
          text: "2.2 Java语法基础",
          collapsible: true,
          children: [
          "basic-extra-meal/48-keywords",
          "basic-grammar/javadoc",
          "basic-grammar/basic-data-type",
          "basic-grammar/type-cast",
          "basic-extra-meal/int-cache",
          "basic-grammar/operator",
          "basic-grammar/flow-control",
          ],
        },
        {
          text: "2.3 数组&字符串",
          collapsible: true,
          children: [
          "array/array",
          "array/double-array",
          "array/print",
          "string/string-source",
          "string/immutable",
          "string/constant-pool",
          "string/intern",
          "string/builder-buffer",
          "string/equals",
          "string/join",
          "string/split",
          ],
        },
        {
          text: "2.4 面向对象编程",
          collapsible: true,
          children: [
          "oo/object-class",
          "oo/package",
          "oo/var",
          "oo/method",
          "basic-extra-meal/varables",
          "oo/native-method",
          "oo/construct",
          "oo/access-control",
          "oo/code-init",
          "oo/abstract",
          "oo/interface",
          "oo/inner-class",
          "oo/encapsulation-inheritance-polymorphism",
          "oo/this-super",
          "oo/static",
          "oo/final",
          "basic-extra-meal/instanceof",
          "basic-extra-meal/immutable",
          "basic-extra-meal/override-overload",
          "basic-extra-meal/annotation",
          "basic-extra-meal/enum",
          ],
        },
        {
          text: "2.5 集合框架（容器）",
          collapsible: true,
          children: [
          "collection/gailan",
          "collection/time-complexity",
          "collection/arraylist",
          "collection/linkedlist",
          "collection/list-war-2",
          "basic-extra-meal/generic",
          "collection/iterator-iterable",
          "collection/fail-fast",
          "collection/hashmap",
          "collection/linkedhashmap",
          "collection/treemap",
          "collection/arraydeque",
          "collection/PriorityQueue",
          "basic-extra-meal/comparable-omparator",
          ],
        },
        {
          text: "2.6 Java IO",
          collapsible: true,
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
          collapsible: true,
          prefix:"exception/",
          children: [
          "gailan",
          "try-with-resources",
          "shijian",
          "npe",
          "try-catch-xingneng",
          ],
        },
        {
          text: "2.8 常用工具类",
          collapsible: true,
          prefix:"common-tool/",
          children: [
            "scanner",
            "arrays",
            "StringUtils",
            "Objects",
            "collections",
            "hutool",
            "guava",
            "utils",
          ],
        },
        {
          text: "2.9 Java新特性",
          prefix: "java8/",
          collapsible: true,
          children: [
          "stream",
          "optional",
          "Lambda",
          "java14",
          ],
        },
        {
          text: "2.10 网络编程",
          collapsible: true,
          prefix: "socket/",
          children: [
            "network-base",
            "socket",
            "http",
          ],
        },
        {
          text: "2.11 NIO",
          collapsible: true,
          prefix: "nio/",
          children: [
            "nio-better-io",
            "BIONIOAIO",
            "buffer-channel",
            "paths-files",
            "network-connect",
            "moxing",
          ],
        },
        {
          text: "2.12 Java重要知识点",
          prefix:"basic-extra-meal/",
          collapsible: true,
          children: [
          "java-naming",
          "java-unicode",
          "box",
          "deep-copy",
          "hashcode",
          "pass-by-value",
          "true-generic",
          "fanshe",
          ],
        },
        {
          text: "2.13 并发编程",
          collapsible: true,
          prefix: "thread/",
          children: [
          "wangzhe-thread",
          "callable-future-futuretask",
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
          "suo",
          "pianxiangsuo",
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
          collapsible: true,
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
        //Java核心结束
      ],
    },
    {
      text: "三、Java进阶",
      collapsible: true,
      children: [
        {
          text: "3.1 开发/构建工具",
          collapsible: true,
          children: [
            {
              text: "3.1.1 Nginx",
              children: [
                "nginx/nginx",
              ],
            },
            {
              text: "3.1.2 IDE",
              collapsible: true,
              children: [
              "ide/4-debug-skill",
              "ide/xechat",
              "ide/shenji-chajian-10",
              ],
            },
            {
              text: "3.1.3 Maven",
              collapsible: true,
              children: [
              "maven/maven",
              ],
            },
            {
              text: "3.1.4 Git",
              collapsible: true,
              children: [
              "git/git-qiyuan",
              ],
            },
          ],
        },
        {
          text: "3.3 Spring",
          collapsible: true,
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
          collapsible: true,
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
          collapsible: true,
          children: [
            "netty/rumen",
          ],
        },
        {
          text: "3.6 辅助工具",
          collapsible: true,
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
          collapsible: true,
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
          collapsible: true,
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
          collapsible: true,
          children: [
            {
              text: "RabbitMQ入门",
              link: "mq/rabbitmq-rumen"
            },
            {
              text: "如何保障消息不丢失",
              link: "mq/100-budiushi"
            },
            "mq/kafka",
          ],
        },
      ],
    },
    {
      text: "四、数据库",
      collapsible: true,
      children: [
        {
          text: "MySQL",
          collapsible: true,
          prefix: "mysql/",
          children: [
            "redis-shuju-yizhixing",
            "lijie-shiwu",
            "shiwu-shixian",
          ],
        },
        {
          text: "Redis",
          collapsible: true,
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
          collapsible: true,
          children: [
            "mongodb/rumen",
          ],
        },
      ],
    },
    {
      text: "五、计算机基础",
      collapsible: true,
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
      collapsible: true,
      children: [
        {
          text: "面试题&八股文",
          collapsible: true,
          prefix:"interview/",
          children: [
            "java-34",
            "java-hashmap-13",
            "mysql-60",
            "mysql-suoyin-15",
            "redis-12",
            "nginx-40",
            "dubbo-17",
            "kafka-40",
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
          collapsible: true,
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
          collapsible: true,
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
          collapsible: true,
          children: [
            "wuhan",
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
      text: "七、学习建议",
      collapsible: true,
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
          "408",
        ],
    },
    {
      text: "八、知识库搭建",
      collapsible: true,
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
      text: "九、联系作者",
      collapsible: true,
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



