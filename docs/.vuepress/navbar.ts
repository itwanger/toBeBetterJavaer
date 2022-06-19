import { navbar } from "vuepress-theme-hope";

export default navbar([

  { 
    text: "进阶之路", 
    icon: "lujing", 
    link: "/home.md" 
  },
  { 
    text: "知识星球", 
    icon: "Artboard", 
    link: "/zhishixingqiu/" 
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
        text: "破解合集",
        icon: "zhongyaotishi",
        link: "/nice-article/itmind/" 
      },
    ],
  },
  
]);
