import { defineClientConfig } from "vuepress/client";
import DesktopSidebarToggle from "./components/DesktopSidebarToggle.vue";
import FocusReadingToggle from "./components/FocusReadingToggle.vue";
import MZNXQRcodeBanner from "./components/mznxqrcode.vue";

export default defineClientConfig({
  rootComponents: [DesktopSidebarToggle, FocusReadingToggle],
  enhance: ({ app, router, siteData }) => {
    app.component("MZNXQRcodeBanner", MZNXQRcodeBanner);
  },
});
