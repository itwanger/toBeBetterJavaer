import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://javabetter.cn",
  // 网站图标

  author: {
    name: "沉默王二",
    url: "/about-the-author/",
  },

  // 阿里妈妈图标的前缀
  iconPrefix: "iconfont icon-",

  logo: "https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/logo-02.png",

  // Git 仓库和编辑链接
  repo: "https://github.com/itwanger/toBeBetterJavaer",
  repoLabel: "GitHub",
  docsDir: "docs/src/",
  // 以前的默认仓库分支名，方便提交 pr 和 issue
  docsBranch: "master",
  breadcrumb: false,

  // 全屏按钮
  fullscreen: true,
  // 在深色模式，浅色模式和自动之间切换 (默认)
  darkmode: "switch",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚支持
  footer: `\
<a href="https://beian.miit.gov.cn/" target="_blank">
  豫ICP备2021038026号-4
</a>
<img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/beian.png" height="15px" width="15px" />
<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41030502000411" target="_blank">
  豫公网安备 41030502000411号
</a>
`,
  displayFooter: true,

  // 加密
  encrypt: {
    config: {
      // 这只会加密 config/page.html
      "/nice-article/itmind/ideapjazjczxjhmzcmyjjhcxgxz.html": ["1110", "5210"],
      "/nice-article/itmind/webstormjhmwebstormwdzsjhmxbxt.html": [
        "1110",
        "5210",
      ],
      "/nice-article/itmind/sublimetextzcmpjazjcqckyxbxt.html": [
        "1110",
        "5210",
      ],
    },
  },

  // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
  pageInfo: [
    "Author",
    "Original",
    "Date",
    "Category",
    "Tag",
    "Word",
    "ReadingTime",
  ],

  blog: {
    // 个人介绍页地址
    intro: "/about-the-author/",
    sidebarDisplay: "mobile",
    // 博主头像
    avatar: "/assets/icon/itwanger-282.png",
    // 座右铭
    description:
      "没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。",
    medias: {
      Zhihu: "https://www.zhihu.com/people/cmower",
      CSDN: "https://blog.csdn.net/qing_gee",
      Github: "https://github.com/itwanger",
      Gitee: "https://gitee.com/itwanger",
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  encryptLocales: {
    placeholder: "微信搜‘沉默王二’回复‘密码’获取口令",
    errorHint: "哈哈，别调戏人家啦，按规则来嘛",
  },

  markdown: {
    // 启用 figure，为图像添加描述
    figure: true,
    // 启用图片懒加载
    imgLazyload: true,
    // 其用数学公式
    math: true,
  },

  plugins: {
    blog: true,

    comment: {
      provider: "Giscus",
      repo: "itwanger/tobebetterjavaer-giscus",
      repoId: "R_kgDOHBJssg",
      category: "Announcements",
      categoryId: "DIC_kwDOHBJsss4COJOx",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    docsearch: {
      appId: "O566AMFNJH",
      apiKey: "d9aebea8bd1a4f1e01201464bbab255f",
      indexName: "tobebetterjavaer",
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    pwa: {
      favicon:
        "https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/favicon.ico",
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
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
