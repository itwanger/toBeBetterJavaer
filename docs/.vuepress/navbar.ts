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
    text: "珍藏资源",
    icon: "pdf",
    children: [
      {
        text: "PDF下载", 
        icon: "pdf", 
        link: "/download/java.md" 
      },
      { 
        text: "网络日志", 
        icon: "rizhi", 
        link: "/download/history.md" 
      },
      { 
        text: "优质文章", 
        icon: "youzhi", 
        link: "/download/nicearticle.md" 
      },
      {
        text: "回到过去",
        icon: "fanhuijiuban", 
        link: "https://docsify.tobebetterjavaer.com/"
      },
    ],
  },
  {
    text: "B站视频",
    link: "https://space.bilibili.com/513340480"
  },
]);
