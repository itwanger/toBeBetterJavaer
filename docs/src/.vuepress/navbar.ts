import { navbar } from "vuepress-theme-hope";

export default navbar([
  { 
    text: "进阶之路", 
    icon: "lujing", 
    link: "/home.md" 
  },
  {
    text: "面渣逆袭", 
    icon: "zhunbei", 
    link: "/sidebar/sanfene/nixi.md"
  },
  {
    text: "Agent八股",
    icon: "gongju",
    link: "/ai/video/"
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
    text: "珍藏资源",
    icon: "youzhi",
    children: [
      {
        text: "AI进阶",
        icon: "ai",
        link: "https://ai.javabetter.cn"
      },
      {
        text: "AI Agent",
        icon: "gongju",
        link: "/sidebar/itwanger/ai/"
      },
      {
        text: "PDF下载", 
        icon: "java", 
        link: "/pdf/readme.md" 
      },
      { 
        text: "求职",
        icon: "zhongyaotishi",
        link: "/sidebar/itwanger/qiuzhi/" 
      },
      { 
        text: "上交大生存手册",
        link: "/sidebar/sjtu/" 
      },
    ],
  }
]);
