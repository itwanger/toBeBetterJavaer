import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  { 
    text: "进阶之路", 
    icon: "lujing", 
    link: "/home.md" 
  },
  { 
    text: "优质专栏", 
    icon: "youzhi", 
    link: "/zhuanlan/java-mianshi-zhinan.md" 
  },
  {
    text: "学习路线",
    icon: "luxian",
    link: "/xuexiluxian/"
  },
  {
    text: "计算机经典书单下载",
    icon: "pdf",
    link: "/download/java.md",
  },
]);
