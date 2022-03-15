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
        href: "//at.alicdn.com/t/font_3180624_h5v71pdvgr9.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Java 程序员进阶之路",
      description: "一份通俗易懂、风趣幽默的Java学习指南",
    },
  },

  themeConfig,
});
