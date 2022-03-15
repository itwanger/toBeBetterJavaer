import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig([
  "",
  {
    text: "Java核心",
    icon: "java",
    prefix: "overview/",
    children: [
      {
        text: "Java概述",
        icon: "note",
        collapsable: true,
        children: ["what-is-java", "java-history", "java-advantage", "jdk-jre"],
      },
      {
        text: "Java基础语法",
        icon: "note",
        children: ["what-is-java", "java-history", "java-advantage", "jdk-jre"],
      },
    ],
  },
]);
