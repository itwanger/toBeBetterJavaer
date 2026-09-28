import { defineClientConfig } from "vuepress/client";
import DesktopSidebarToggle from "./components/DesktopSidebarToggle.vue";
import FloatingControlsToggle from "./components/FloatingControlsToggle.vue";
import FocusReadingToggle from "./components/FocusReadingToggle.vue";
import ArticleHumanVerify from "./components/ArticleHumanVerify.vue";
import MZNXQRcodeBanner from "./components/mznxqrcode.vue";
import DouyinPlayer from "./components/DouyinPlayer.vue";
import { useActiveSidebarScroll } from "./composables/useActiveSidebarScroll.js";

export default defineClientConfig({
  setup() {
    useActiveSidebarScroll();
  },
  rootComponents: [
    DesktopSidebarToggle,
    FocusReadingToggle,
    FloatingControlsToggle,
    ArticleHumanVerify,
  ],
  enhance: ({ app, router, siteData }) => {
    app.component("MZNXQRcodeBanner", MZNXQRcodeBanner);
    app.component("DouyinPlayer", DouyinPlayer);
  },
});
