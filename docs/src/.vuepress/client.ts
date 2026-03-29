import { defineClientConfig } from "vuepress/client";
import DesktopSidebarToggle from "./components/DesktopSidebarToggle.vue";
import MZNXQRcodeBanner from "./components/mznxqrcode.vue";

export default defineClientConfig({
  rootComponents: [DesktopSidebarToggle],
  enhance: ({ app, router, siteData }) => {
    app.component("MZNXQRcodeBanner", MZNXQRcodeBanner);
  },
});
