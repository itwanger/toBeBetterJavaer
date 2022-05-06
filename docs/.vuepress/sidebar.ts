import { defineSidebarConfig } from "vuepress-theme-hope";
export const sidebarConfig = defineSidebarConfig({
  "/zhishixingqiu/": ["java-mianshi-zhinan","readme.md"],
  "/download/": ["java","pdf","learn-jianyi","nicearticle", "history"],
  "/xuexiluxian/": [
    {
      text: "Java",
      icon: "java",
      prefix: "java/",
      collapsable: true,
      children: [
        {
          text: "一条龙版",
          link: "yitiaolong.md",
        },
        {
          text: "并发编程",
          link: "thread.md",
        },
        {
          text: "JVM",
          link: "jvm.md",
        },
      ],
    },
    {
      text: "C语言",
      link: "c.md",
    },
    {
      text: "C++",
      link: "ccc.md",
    },
    {
      text: "Python",
      link: "python.md",
    },
    {
      text: "Go语言",
      link: "go.md",
    },
    {
      text: "操作系统",
      link: "os.md",
    },
    {
      text: "前端",
      link: "qianduan.md",
    },
    {
      text: "蓝桥杯",
      link: "lanqiaobei.md",
    },
    {
      text: "算法和数据结构",
      link: "algorithm.md",
    },
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
          prefix: "sidebar/sanfene/",
          text: "2.1 面渣逆袭",
          collapsable: true,
          children: [
            {
              text: "Java基础篇",
              link: "javase.md",
            },
            {
              text: "Java集合框架篇",
              link: "collection.md",
            },
            {
              text: "Java并发编程篇",
              link: "javathread.md",
            },
            {
              text: "Java虚拟机篇",
              link: "jvm.md",
            },
          ],
        },
        {
          prefix: "overview/",
          text: "2.2 Java概述",
          collapsable: true,
          children: [
          "what-is-java",
          {
            text: "编写第一个 Java 程序",
            link: "hello-world",
          },
          ],
        },
        {
          text: "2.3 Java基础语法",
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
          text: "2.4 面向对象编程",
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
          text: "2.5 字符串&数组",
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
          text: "2.6 集合框架（容器）",
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
          text: "2.7 IO",
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
          text: "2.8 异常处理",
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
          text: "2.9 常用工具类",
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
          text: "2.10 Java新特性",
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
          text: "2.11 Java重要知识点",
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
          text: "2.12 并发编程",
          collapsable: true,
          prefix: "thread/",
          children: [
          {
            text: "创建Java线程的3种方式",
            link: "wangzhe-thread",
          },
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
          text: "2.13 JVM",
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
              text: "第一个Spring Boot项目",
              link: "springboot/initializr",
            },
            {
              text: "整合 MySQL和Druid",
              link: "springboot/mysql-druid",
            },
            "springboot/tomcat",
            "redis/redis-springboot",
          ],
        },
        {
          text: "3.5 辅助工具/轮子",
          collapsable: true,
          children: [
            "gongju/tabby",
            "gongju/warp",
            "gongju/chiner",
            "gongju/DBeaver",
            "gongju/knife4j",
            "kaiyuan/auto-generator",
            "gongju/junit",
            "gongju/gson",
            "gongju/fastjson",
            "gongju/jackson",
            "gongju/forest",
            "gongju/log4j",
            "gongju/log4j2",
            "gongju/logback",
            "gongju/slf4j",
            "gongju/others",
          ],
        },
        {
          text: "3.6 分布式",
          collapsable: true,
          children: [
            "elasticsearch/rumen",
            "zookeeper/jibenjieshao",
          ],
        },
        {
          text: "3.7 高性能",
          collapsable: true,
          children: [
            {
              text: "消息队列",
              collapsable: true,
              children: [
                "mq/rabbitmq-rumen",
                "mq/100-budiushi",
              ],
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
          text: "Redis",
          collapsable: true,
          children: [
            "redis/rumen",
            "redis/xuebeng-chuantou-jichuan",
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
            "sidebar/sanfene/spring",
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
          ],
        },
      ],
    },
    {
      text: "七、学习资源",
      collapsable: true,
      children: [
        {
          text: "PDF下载",
          collapsable: true,
          children: [
            {
              text: "Java程序员常读书单",
              icon: "xiazai",
              link: "download/java.md",
            },
            {
              text: "最全最硬核的Java面试 “备战” 资料",
              icon: "xiazai",
              link: "https://mp.weixin.qq.com/s/US5nTxbC2nYc1hWpn5Bozw",
            },
            {
              text: "深入浅出Java多线程",
              icon: "xiazai",
              link: "https://mp.weixin.qq.com/s/pxKrjw_5NTdZfHOKCkwn8w",
            },
            {
              text: "GitHub星标115k+的Java教程",
              icon: "xiazai",
              link: "https://mp.weixin.qq.com/s/d7Z0QoChNuP9bTwAGh2QCw",
            },
            {
              text: "重学Java设计模式",
              icon: "xiazai",
              link: "https://mp.weixin.qq.com/s/PH5AizUAnTz0CuvJclpAKw",
            },
            {
              text: "Java版LeetCode刷题笔记",
              icon: "xiazai",
              link: "https://mp.weixin.qq.com/s/FyoOPIMGcaeH0z5RMhxtaQ",
            },
            {
              text: "阮一峰C语言入门教程",
              icon: "xiazai",
              link: "download/yuanyifeng-c-language.md",
            },
            {
              text: "BAT大佬的刷题笔记",
              icon: "xiazai",
              link: "download/bat-shuati.md",
            },
            {
              text: "给操作系统捋条线",
              icon: "xiazai",
              link: "https://mp.weixin.qq.com/s/puTGbgU7xQnRcvz5hxGBHA",
            },
            {
              text: "豆瓣9.1分，Pro Git中文版",
              icon: "xiazai",
              link: "download/progit.md",
            },
            {
              text: "简历模板",
              icon: "xiazai",
              link: "download/jianli.md",
            },
          ],
        },
        {
          text: "学习建议",
          collapsable: true,
          prefix: "xuexijianyi/",
          children: [
              "read-csapp",
              "electron-information-engineering",
          ],
        },
      ],
    },
    {
      text: "八、联系作者",
      collapsable: true,
      children: [
        {
          text: "心路历程",
          prefix: "about-the-author/",
          collapsable: true,
          children: [
            "bzhan-10wan",
            "zhihu-1000wan",
            "csdn-1000wan",
            "readme.md",
          ],
        },
      ],
    },
  ],
});



