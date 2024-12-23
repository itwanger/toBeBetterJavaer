import { defineClientConfig } from "vuepress/client";
import MZNXQRcodeBanner from "./components/mznxqrcode.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("MZNXQRcodeBanner", MZNXQRcodeBanner);
  },
});