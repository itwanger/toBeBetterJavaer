import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_3180624_bk5smenwss.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Java 程序员进阶之路",
      description: "一份通俗易懂、风趣幽默的Java学习指南，内容涵盖Java基础、Java并发编程、Java虚拟机、Java企业级开发、Java面试等核心知识点。学Java，就认准Java程序员进阶之路",
    },
  },

  themeConfig,
});
