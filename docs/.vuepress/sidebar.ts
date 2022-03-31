import { defineSidebarConfig } from "vuepress-theme-hope";
export const sidebarConfig = defineSidebarConfig({
  "/zhishixingqiu/": ["java-mianshi-zhinan","readme.md"],
  "/download/": ["java","nicearticle", "history"],
  "/xuexiluxian/": [
    {
      text: "Java学习路线",
      icon: "java",
      prefix: "java/",
      collapsable: true,
      children: [
        {
          text: "一条龙版",
          icon: "java",
          link: "yitiaolong.md",
        },
        {
          text: "并发编程学习路线",
          icon: "duoxiancheng",
          link: "thread.md",
        },
        {
          text: "JVM学习路线",
          icon: "JVM",
          link: "jvm.md",
        },
      ],
    },
    {
      text: "C语言学习路线",
      link: "c.md",
      icon: "c",
    },
    {
      text: "C++学习路线",
      link: "ccc.md",
      icon: "cpp",
    },
    {
      text: "Python学习路线",
      link: "python.md",
      icon: "python",
    },
    {
      text: "Go语言学习路线",
      link: "go.md",
      icon: "gopher",
    },
    {
      text: "操作系统学习路线",
      link: "os.md",
      icon: "caozuoxitong",
    },
    {
      text: "前端学习路线",
      link: "qianduan.md",
      icon: "_qianduankaifa",
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
          text: "面渣逆袭",
          icon: "mianshitiku",
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
          text: "Java概述",
          icon: "gaishu",
          collapsable: true,
          children: [
          "what-is-java", 
          "hello-world"
          ],
        },
        {
          text: "Java基础语法",
          icon: "jichuyufa",
          collapsable: true,
          children: [
          "basic-grammar/basic-data-type", 
          "basic-grammar/flow-control", 
          "basic-grammar/operator", 
          "basic-grammar/javadoc",
          "basic-extra-meal/48-keywords",
          "basic-extra-meal/java-naming"
          ],
        },
        {
          text: "Java面向对象编程",
          icon: "duixiangmoxing",
          collapsable: true,
          children: [
          "oo/object-class", 
          "oo/var", 
          "oo/method", 
          "oo/construct",
          "oo/code-init", 
          "oo/abstract", 
          "oo/interface",
          "oo/static", 
          "oo/this-super", 
          "oo/final", 
          "oo/instanceof",
          "basic-extra-meal/immutable", 
          "basic-extra-meal/varables", 
          "basic-extra-meal/generic",
          "basic-extra-meal/annotation",
          "basic-extra-meal/enum",
          "basic-extra-meal/fanshe"
          ],
        },
        {
          text: "字符串&数组",
          icon: "Field-String",
          collapsable: true,
          children: [
          "string/immutable", 
          "string/constant-pool", 
          "string/intern", 
          "string/equals",
          "string/join", 
          "string/split", 
          "array/array",
          "array/print"
          ],
        },
        {
          text: "集合框架（容器）",
          icon: "rongqi",
          collapsable: true,
          children: [
          "collection/gailan", 
          "collection/arraylist", 
          "collection/linkedlist", 
          "collection/list-war-2",
          "collection/iterator-iterable", 
          "collection/fail-fast", 
          "collection/hashmap",
          ],
        },
        {
          text: "Java IO",
          icon: "shurushuchu",
          collapsable: true,
          children: [
          "io/shangtou", 
          "io/BIONIOAIO", 
          ],
        },
        {
          text: "异常处理",
          icon: "yichangchuli",
          collapsable: true,
          children: [
          "exception/gailan", 
          "exception/try-with-resouces", 
          "exception/shijian",
          "exception/npe"
          ],
        },
        {
          text: "常用工具类",
          icon: "gongju",
          collapsable: true,
          children: [
          "common-tool/arrays", 
          "common-tool/collections", 
          "common-tool/hutool",
          "common-tool/guava"
          ],
        },
        {
          text: "Java新特性",
          icon: "xintexing",
          collapsable: true,
          children: [
          "java8/stream", 
          "java8/optional", 
          "java8/Lambda",
          ],
        },
        {
          text: "Java重要知识点",
          icon: "zhongyaotishi",
          collapsable: true,
          children: [
          "basic-extra-meal/java-unicode", 
          "basic-extra-meal/int-cache", 
          "basic-extra-meal/box", 
          "basic-extra-meal/deep-copy",
          "basic-extra-meal/hashcode", 
          "basic-extra-meal/equals-hashcode", 
          "basic-extra-meal/override-overload", 
          "basic-extra-meal/Overriding", 
          "basic-extra-meal/pass-by-value",
          "basic-extra-meal/true-generic",
          "basic-extra-meal/comparable-omparator",
          ],
        },
        {
          text: "Java并发编程",
          icon: "duoxiancheng",
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
          "synchronized",
          "cas",
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
          "shengchanzhe-xiaofeizhe"
          ],
        },
        {
          text: "Java虚拟机",
          icon: "JVM",
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
          text: "开发工具",
          icon: "gongju",
          collapsable: true,
          children: [
          "maven/maven.md",
          "git/git-qiyuan.md",
          "nginx/nginx.md",
          ],
        },
        {
          text: "IDE/编辑器",
          icon: "icons-intellij_idea",
          collapsable: true,
          children: [
          "ide/4-debug-skill.md",
          ],
        },
        {
          text: "Spring",
          icon: "spring-3",
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
          text: "SpringBoot",
          icon: "springboot",
          collapsable: true,
          children: [
            "springboot/initializr",
            "springboot/tomcat",
          ],
        },
        {
          text: "辅助工具/轮子",
          icon: "maxus-tyre-tianchong",
          collapsable: true,
          children: [
            "gongju/tabby",
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
          text: "分布式",
          icon: "fenbushi",
          collapsable: true,
          children: [
            "elasticsearch/rumen",
            "zookeeper/jibenjieshao",
          ],
        },
        {
          text: "高性能",
          icon: "gaoxingneng",
          collapsable: true,
          children: [
            {
              text: "消息队列",
              icon: "mqxiaoxiduilieMQ",
              collapsable: true,
              children: [
                "mq/rabbitmq-rumen",
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
          icon: "redis",
          collapsable: true,
          children: [
            "redis/rumen",
          ],
        },
        {
          text: "MongoDB",
          icon: "MongoDB",
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
      children: [
        {
          text: "计算机操作系统",
          link: "https://mp.weixin.qq.com/s/G9ZqwEMxjrG5LbgYwM5ACQ",
        },
        {
          text: "计算机网络",
          link: "https://mp.weixin.qq.com/s/7EddtzpwIRvYfw34QE4zvw",
        },
      ],
    },
    {
      text: "六、求职面试",
      collapsable: true,
      children: [
        {
          text: "面试题集合",
          icon: "jingpinmianjingku",
          collapsable: true,
          children: [
            "baguwen/java-basic-34",
            "collection/hashmap-interview",
            "mianjing/redis12question",
            "mq/100-budiushi",
          ],
        },
        {
          text: "背诵版八股文",
          icon: "wenyanwenyuedu",
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
          icon: "chengshi",
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
          icon: "pdf",
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
      ],
    },
    {
      text: "八、联系作者",
      collapsable: true,
      children: [
        {
          text: "心路历程",
          icon: "xinlulicheng",
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



