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
    url: "/about-the-author/",
  },

  encryptLocales: {
    /**
     * Encrypt title
     */
    title: "初次访问，人机识别活动下筋骨",
    placeholder: "微信搜‘沉默王二’回复‘密码’获取口令",

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

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  blog: {
    intro: "/about-the-author/",
    sidebarDisplay: "mobile",
    // 博主头像
    avatar: "/assets/icon/itwanger-282.png",
    // 圆角
    roundAvatar: true,
    // 座右铭
    description:"没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。",
    medias: {
      Zhihu: "https://www.zhihu.com/people/cmower",
      Github: "https://github.com/itwanger",
      Gitee: "https://gitee.com/itwanger",
    },
    
  },

  plugins: {
    // 启用博客功能
    blog: true,
    // 启用博客自动摘要
    blog: {
      autoExcerpt: true,
    },

    activeHeaderLinks: true,

    mdEnhance: {
      // 仅将此选项用于体验或测试。
      align: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
