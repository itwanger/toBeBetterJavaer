import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([

  { 
    text: "进阶之路", 
    icon: "lujing", 
    link: "/home.md" 
  },
  { 
    text: "星球专栏", 
    icon: "Artboard", 
    link: "/zhishixingqiu/java-mianshi-zhinan.md" 
  },
  {
    text: "学习路线",
    icon: "luxian",
    link: "/xuexiluxian/"
  },
  { 
    text: "优质文章", 
    icon: "youzhi", 
    link: "/nicearticle/" 
  },
  
  {
    text: "经典书单",
    icon: "pdf",
    link: "/download/java.md",
  },
  {
    text: "B站视频",
    icon: "bzhan",
    link: "https://space.bilibili.com/513340480"
  },
]);
