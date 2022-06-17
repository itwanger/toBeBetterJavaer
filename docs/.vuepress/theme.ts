import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import { sidebarConfig } from "./sidebar";

export default hopeTheme({
  hostname: "https://tobebetterjavaer.com",

  encrypt: {
    config: {
      // 这只会加密 config/page.html
      "/nice-article/itmind/xshellazpjbjcxshellpxffxbxt.html": ["1110", "5210"],
    },
  },

  author: {
    name: "沉默王二",
    url: "https://tobebetterjavaer.com/about-the-author/",
  },

  encryptLocales: {
    /**
     * Encrypt title
     */
    title: "初次访问，人机识别活动下筋骨",
    placeholder: "微信搜「沉默王二」回复「密码」获取",

    /**
     * Passwrod error hint
     */
    errorHint: "哈哈，别调戏人家啦，按规则来嘛",
  },

  iconPrefix: "iconfont icon-",

  logo: "http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/logo-02.png",

  repo: "https://github.com/itwanger/toBeBetterJavaer",

  docsDir: "docs",

  // 以前的默认仓库分支
  docsBranch: "master",

  // 纯净模式
  // pure: true,

  darkmode: "switch",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebarConfig,

  footer: '<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021038026号-1</a>'
  +'<img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/beian.png" height="15px" width="15px" />'
  +'<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41030502000411">'
  +'<span>豫公网安备 41030502000411号</span>'
  +'</a>',

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    intro: "/about-the-author/",
    sidebarDisplay: "mobile",
    avatar: "/assets/icon/itwanger-282.png",
    description:"没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。",
    medias: {
      Zhihu: "https://www.zhihu.com/people/cmower",
      Github: "https://github.com/itwanger",
      Gitee: "https://gitee.com/itwanger",
    },
    
  },

  plugins: {
    blog: true,
    // 评论区
    comment: {
      type: "giscus",
      repo :"itwanger/tobebetterjavaer-giscus",
      repoId:"R_kgDOHBJssg",
      category:"Announcements",
      categoryId:"DIC_kwDOHBJsss4COJOx",
      mapping:"pathname",
    },

    activeHeaderLinks: true,

    mdEnhance: {
      // 仅将此选项用于体验或测试。
      align: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    // Progressive Web app，即渐进式网络应用程序，
    // 允许网站通过支持该特性的浏览器将网站作为 App 安装在对应平台上。
    pwa: {
      // favicon.ico一般用于作为缩略的网站标志,它显示位于浏览器的地址栏或者在标签上,用于显示网站的logo,
      favicon: "/favicon.ico",
      // 如果你的站点体积不大，且配图大多为关键性说明，希望可以在离线模式下显示，建议将此项设置为 true
      cachePic: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    },
  },
});
