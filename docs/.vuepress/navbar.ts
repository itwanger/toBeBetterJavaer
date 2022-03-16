import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  { 
    text: "Java进阶之路", 
    icon: "lujing", 
    link: "/home.md" 
  },
  { 
    text: "Java优质专栏", 
    icon: "youzhi", 
    link: "/zhuanlan/java-mianshi-zhinan.md" 
  },
  {
    text: "Java学习路线",
    icon: "luxian",
    link: "/xuexiluxian/"
  },
  {
    text: "Java常读书单下载",
    icon: "pdf",
    link: "/download/java.md",
  },
]);
