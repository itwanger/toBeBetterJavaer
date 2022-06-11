import { navbar } from "vuepress-theme-hope";

export default navbar([

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
    text: "B站视频",
    icon: "bzhan", 
    link: "https://space.bilibili.com/513340480"
  },
  {
    text: "珍藏资源",
    icon: "youzhi",
    children: [
      {
        text: "Java电子书下载", 
        icon: "java", 
        link: "/download/java.md" 
      },
      {
        text: "学习建议", 
        icon: "xuexijianyi", 
        link: "/download/learn-jianyi.md" 
      },
      { 
        text: "面渣逆袭", 
        icon: "zhunbei", 
        link: "/sidebar/sanfene/nixi.md" 
      },
      { 
        text: "优质文章", 
        icon: "youzhi", 
        link: "/download/nicearticle.md" 
      },
      { 
        text: "网络日志", 
        icon: "rizhi", 
        link: "/download/history.md" 
      },
      {
        text: "回到过去",
        icon: "fanhuijiuban", 
        link: "https://docsify.tobebetterjavaer.com/"
      },
    ],
  },
  
]);
