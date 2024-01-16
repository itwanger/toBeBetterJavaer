import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import { sidebarConfig } from "./sidebar";

export default hopeTheme({
  hostname: "https://javabetter.cn",
  // 网站图标
  logo: "https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/logo-02.png",
  // Git 仓库和编辑链接
  repo: "https://github.com/itwanger/toBeBetterJavaer",
  repoLabel: "GitHub",
  docsDir: "docs",
  // 以前的默认仓库分支名，方便提交 pr 和 issue
  docsBranch: "master",
  breadcrumb: false,

  // 全屏按钮
  fullscreen: true,
  // 在深色模式，浅色模式和自动之间切换 (默认)
  darkmode: "switch",
  // 纯净模式，会禁用一些花哨的动画以及一些色彩
  // pure: true,

  // 阿里妈妈图标的前缀
  iconPrefix: "iconfont icon-",
  // Iconfont 精选图标 和 阿里妈妈的互斥
  // iconAssets: "iconfont",

  // 全局默认作者
  author: {
    name: "沉默王二",
    url: "/about-the-author/",
  },

  // 加密
  encrypt: {
    config: {
      // 这只会加密 config/page.html
      "/nice-article/itmind/ideapjazjczxjhmzcmyjjhcxgxz.html": ["1110", "5210"],
      "/nice-article/itmind/webstormjhmwebstormwdzsjhmxbxt.html": ["1110", "5210"],
      "/nice-article/itmind/sublimetextzcmpjazjcqckyxbxt.html": ["1110", "5210"],
    },
  },
  // 提示文字
  encryptLocales: {
    placeholder: "微信搜‘沉默王二’回复‘密码’获取口令",

    /**
     * Passwrod error hint
     */
    errorHint: "哈哈，别调戏人家啦，按规则来嘛",
  },

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebarConfig,

  // 页脚支持
  footer: '<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021038026号-4</a>'
  +'<img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/beian.png" height="15px" width="15px" />'
  +'<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41030502000411">'
  +'<span>豫公网安备 41030502000411号</span>'
  +'</a>',
  displayFooter: true,

  // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word","ReadingTime"],

  blog: {
    // 个人介绍页地址
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
      CSDN: "https://blog.csdn.net/qing_gee",
      Github: "https://github.com/itwanger",
      Gitee: "https://gitee.com/itwanger",
    },
  },

  plugins: {
    // 该插件会监听页面滚动事件。
    // 当页面滚动至某个 标题锚点 后，如果存在对应的 标题链接 ，那么该插件会将路由 Hash 更改为该 标题锚点 。
    activeHeaderLinks: true,
    // 启用博客
    blog: true,
    // pwa
    pwa: true,
    mdEnhance: {
      // 添加选项卡支持
      tabs: true,
      // 流程图
      mermaid: true,
      // 支持任务列表
      tasklist: true,

      // 启用图片懒加载
      imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
      // 启用图片标题
      figure: true,

      // 自定义对齐
      align: true,

      // 支持幻灯片
      presentation: true,

      // 你的 Markdown 行为与 GitHub 保持一致
      gfm: true,
    },
  },
});
