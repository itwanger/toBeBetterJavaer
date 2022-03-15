import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  { text: "进阶之路", icon: "lujing", link: "/home.md" },
  {
    text: "学习路线",
    icon: "luxian",
    prefix: "/xuexiluxian/",
    children: [
      {
        text: "Java学习路线",
        prefix: "java/",
        children: [
          { text: "并发编程", icon: "java",link: "thread" },
        ],
      },
      {
        text: "C语言学习路线",
        icon: "c",
        link: "c",
      },
      {
        text: "C++学习路线",
        icon: "cpp",
        link: "ccc",
      },
      {
        text: "Python学习路线",
        icon: "python",
        link: "python",
      },
      {
        text: "Go语言学习路线",
        icon: "gopher",
        link: "go",
      },
      {
        text: "操作系统学习路线",
        icon: "caozuoxitong",
        link: "os",
      },
    ],
  },
  {
    text: "计算机经典书单下载",
    icon: "pdf",
    link: "https://mp.weixin.qq.com/s/ExjM-xdqMFFY1NIZffz-Ng",
  },
]);
