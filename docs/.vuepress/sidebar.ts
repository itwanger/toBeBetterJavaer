import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig([
    {
      text: "学习路线",
      icon: "luxian",
      prefix: "xuexiluxian/",
      collapsable: true,
      children: [
        {
          text: "Java",
          icon: "java",
          prefix: "java/",
          collapsable: true,
          children: [
            {
              text: "并发编程",
              icon: "duoxiancheng",
              link: "thread.md",
            },
          ],
        },
        {
          text: "C语言",
          link: "c.md",
          icon: "c",
        },
        {
          text: "C++",
          link: "ccc.md",
          icon: "cpp",
        },
        {
          text: "Python",
          link: "python.md",
          icon: "python",
        },
        {
          text: "Go语言",
          link: "go.md",
          icon: "gopher",
        },
        {
          text: "操作系统",
          link: "os.md",
          icon: "caozuoxitong",
        },
        {
          text: "前端",
          link: "qianduan.md",
          icon: "_qianduankaifa",
        },
      ],
    },
    {
      text: "Java核心",
      icon: "java",
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
          children: ["what-is-java", "hello-world"],
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
          children: [
          "thread/wangzhe-thread",
          "thread/ali-executors",
          ],
        },
        {
          text: "Java虚拟机",
          icon: "JVM",
          collapsable: true,
          children: [
          "jvm/what-is-jvm",
          ],
        },
      ],
    },
    {
      text: "Java企业级开发",
      icon: "luxian",
      collapsable: true,
      children: [
        {
          text: "基建篇",
          icon: "duoxiancheng",
          collapsable: true,
          children: [
          "maven/maven.md",
          "git/git-qiyuan.md",
          ],
        },
      ],
    }
  ],
);
