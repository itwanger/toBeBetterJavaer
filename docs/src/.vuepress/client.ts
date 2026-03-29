import { defineClientConfig } from "vuepress/client";
import DesktopSidebarToggle from "./components/DesktopSidebarToggle.vue";
import FloatingControlsToggle from "./components/FloatingControlsToggle.vue";
import FocusReadingToggle from "./components/FocusReadingToggle.vue";
import MZNXQRcodeBanner from "./components/mznxqrcode.vue";

export default defineClientConfig({
  rootComponents: [
    DesktopSidebarToggle,
    FocusReadingToggle,
    FloatingControlsToggle,
  ],
  enhance: ({ app, router, siteData }) => {
    app.component("MZNXQRcodeBanner", MZNXQRcodeBanner);
  },
});
