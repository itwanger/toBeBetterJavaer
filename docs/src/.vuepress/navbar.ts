import { navbar } from "vuepress-theme-hope";

export default navbar([
  { 
    text: "博客",
    icon: "gaishu",
    link: "/blog.md" 
  },
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
    text: "面渣逆袭", 
    icon: "zhunbei", 
    link: "/sidebar/sanfene/nixi.md"
  },
  {
    text: "珍藏资源",
    icon: "youzhi",
    children: [
      {
        text: "PDF下载", 
        icon: "java", 
        link: "/pdf/readme.md" 
      },
      { 
        text: "破解合集",
        icon: "zhongyaotishi",
        link: "/nice-article/itmind/" 
      },
      { 
        text: "上交大生存手册",
        link: "/sidebar/sjtu/" 
      },
    ],
  }
]);
