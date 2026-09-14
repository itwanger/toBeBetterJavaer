<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vuepress/client";

const STORAGE_KEY = "tobebetterjavaer-desktop-toc-collapsed";
const COLLAPSED_CLASS = "toc-collapsed-desktop";
const PANEL_CLASS = "toc-panel-desktop";
const DESKTOP_BREAKPOINT = 960;
const COLLAPSED_HANDLE_OFFSET = 20;

const route = useRoute();

const hasToc = ref(false);
const isCollapsed = ref(false);
const isDesktop = ref(false);
const buttonStyle = ref<Record<string, string>>({});
const lastExpandedLeft = ref<number | null>(null);

let observer: MutationObserver | null = null;
let mediaQuery: MediaQueryList | null = null;
let removeDesktopListener: (() => void) | null = null;
let removeResizeListener: (() => void) | null = null;

const buttonTitle = computed(() =>
  isCollapsed.value ? "展开此页内容" : "收起此页内容",
);

const getButtonTop = () => (window.innerWidth >= 1440 ? 220 : 196);

const shouldShowPanel = () => isDesktop.value && hasToc.value;

const shouldCollapsePanel = () => shouldShowPanel() && isCollapsed.value;

const setPanelState = () => {
  const container = document.querySelector<HTMLElement>(".theme-container");

  if (!container) return;

  const collapse = shouldCollapsePanel();

  container.classList.toggle(COLLAPSED_CLASS, collapse);
  // toc-panel-desktop 表示目录正占着右侧槽位，样式据此给正文预留空间
  container.classList.toggle(PANEL_CLASS, shouldShowPanel() && !collapse);
};

const setButtonPosition = (left: number) => {
  buttonStyle.value = {
    left: `${left}px`,
    top: `${getButtonTop()}px`,
  };
};

const getCollapsedLeft = () => window.innerWidth - COLLAPSED_HANDLE_OFFSET;

const getExpandedLeft = () => {
  const toc = document.querySelector<HTMLElement>("#toc");

  if (toc) {
    const tocLeft = toc.getBoundingClientRect().left;

    if (tocLeft > 0) {
      lastExpandedLeft.value = tocLeft;

      return tocLeft;
    }
  }

  return lastExpandedLeft.value;
};

const updateButtonPosition = () => {
  const targetLeft = shouldCollapsePanel()
    ? getCollapsedLeft()
    : getExpandedLeft();

  if (targetLeft === null) return;

  setButtonPosition(targetLeft);
};

const syncContainerState = async () => {
  await nextTick();

  const container = document.querySelector<HTMLElement>(".theme-container");

  if (!container) return;

  // 主题的 has-toc 在没有小标题的页面也会打上，这里以 #toc 是否真的渲染出来为准
  hasToc.value =
    Boolean(document.querySelector("#toc")) &&
    !container.classList.contains("focus-reading-mode");

  getExpandedLeft();
  setPanelState();
  updateButtonPosition();

  observer?.disconnect();
  observer?.observe(container, {
    attributeFilter: ["class"],
    attributes: true,
  });
};

const toggleToc = () => {
  const expandedLeft = getExpandedLeft();

  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem(STORAGE_KEY, String(isCollapsed.value));
  setPanelState();

  // 展开后 #toc 才重新参与布局，这里重新量一次；量不到就退回收起前的缓存值
  const targetLeft = isCollapsed.value
    ? getCollapsedLeft()
    : (getExpandedLeft() ?? expandedLeft);

  if (targetLeft !== null) {
    setButtonPosition(targetLeft);
  }
};

onMounted(() => {
  isCollapsed.value = localStorage.getItem(STORAGE_KEY) === "true";
  mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  isDesktop.value = mediaQuery.matches;

  const updateDesktopState = (event: MediaQueryListEvent) => {
    isDesktop.value = event.matches;
  };

  mediaQuery.addEventListener("change", updateDesktopState);
  removeDesktopListener = () => {
    mediaQuery?.removeEventListener("change", updateDesktopState);
  };

  const handleResize = () => {
    setPanelState();
    updateButtonPosition();
  };

  window.addEventListener("resize", handleResize);
  removeResizeListener = () => {
    window.removeEventListener("resize", handleResize);
  };

  observer = new MutationObserver(() => {
    void syncContainerState();
  });

  void syncContainerState();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  removeDesktopListener?.();
  removeResizeListener?.();
});

watch(
  () => route.path,
  () => {
    void syncContainerState();
  },
);

watch(isDesktop, () => {
  void syncContainerState();
});
</script>

<template>
  <button
    v-if="isDesktop && hasToc"
    :aria-label="buttonTitle"
    :aria-pressed="isCollapsed"
    :class="['desktop-toc-toggle', { collapsed: isCollapsed }]"
    :style="buttonStyle"
    :title="buttonTitle"
    type="button"
    @click="toggleToc"
  >
    <svg
      aria-hidden="true"
      class="desktop-toc-toggle__icon"
      viewBox="0 0 24 24"
    >
      <path
        d="M9.5 6.5 15 12l-5.5 5.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.8"
      />
    </svg>
  </button>
</template>

<style scoped>
.desktop-toc-toggle {
  position: fixed;
  z-index: 110;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 4rem;
  padding: 0;
  border: 1px solid rgb(203 213 225 / 42%);
  border-radius: 999px;
  background: rgb(255 255 255 / 76%);
  color: rgb(100 116 139 / 78%);
  box-shadow:
    0 8px 20px rgb(15 23 42 / 7%),
    0 1px 0 rgb(255 255 255 / 70%) inset;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition:
    color var(--color-transition),
    background var(--color-transition),
    border-color var(--color-transition),
    box-shadow var(--color-transition),
    left var(--transform-transition);
  transform: translateX(-50%);
}

.desktop-toc-toggle:hover {
  border-color: rgb(148 163 184 / 72%);
  color: var(--theme-color);
  background: rgb(255 255 255 / 92%);
  box-shadow:
    0 12px 28px rgb(15 23 42 / 10%),
    0 1px 0 rgb(255 255 255 / 82%) inset;
}

.desktop-toc-toggle:active {
  border-color: rgb(148 163 184 / 82%);
  background: rgb(248 250 252 / 96%);
  box-shadow:
    0 6px 16px rgb(15 23 42 / 8%),
    0 1px 0 rgb(255 255 255 / 72%) inset;
}

.desktop-toc-toggle__icon {
  width: 0.82rem;
  height: 0.82rem;
  transition: transform var(--transform-transition);
}

.desktop-toc-toggle.collapsed .desktop-toc-toggle__icon {
  transform: rotate(180deg);
}

@media (max-width: 959px) {
  .desktop-toc-toggle {
    display: none;
  }
}
</style>
