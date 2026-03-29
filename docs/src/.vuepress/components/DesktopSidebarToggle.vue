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

const STORAGE_KEY = "tobebetterjavaer-desktop-sidebar-collapsed";
const COLLAPSED_CLASS = "sidebar-collapsed-desktop";
const DESKTOP_BREAKPOINT = 960;
const COLLAPSED_HANDLE_OFFSET = 20;
const FALLBACK_TRANSITION_DURATION = 300;

const route = useRoute();

const hasSidebar = ref(false);
const isCollapsed = ref(false);
const isDesktop = ref(false);
const buttonStyle = ref<Record<string, string>>({});
const lastExpandedLeft = ref<number | null>(null);

let observer: MutationObserver | null = null;
let mediaQuery: MediaQueryList | null = null;
let removeDesktopListener: (() => void) | null = null;
let removeResizeListener: (() => void) | null = null;
let positionTimer: number | null = null;

const buttonTitle = computed(() =>
  isCollapsed.value ? "展开侧边栏" : "收起侧边栏",
);

const getButtonTop = () => (window.innerWidth >= 1440 ? 220 : 196);

const parseCssTime = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) return 0;
  if (trimmedValue.endsWith("ms")) {
    return Number.parseFloat(trimmedValue);
  }
  if (trimmedValue.endsWith("s")) {
    return Number.parseFloat(trimmedValue) * 1000;
  }

  return 0;
};

const getSidebarTransitionDuration = () => {
  const sidebar = document.querySelector<HTMLElement>(".vp-sidebar");

  if (!sidebar) return FALLBACK_TRANSITION_DURATION;

  const style = getComputedStyle(sidebar);
  const durations = style.transitionDuration.split(",");
  const delays = style.transitionDelay.split(",");
  const transitionCount = Math.max(durations.length, delays.length);
  let longestTransition = 0;

  for (let index = 0; index < transitionCount; index += 1) {
    const duration = parseCssTime(
      durations[index] ?? durations[durations.length - 1] ?? "0s",
    );
    const delay = parseCssTime(
      delays[index] ?? delays[delays.length - 1] ?? "0s",
    );

    longestTransition = Math.max(longestTransition, duration + delay);
  }

  return longestTransition || FALLBACK_TRANSITION_DURATION;
};

const setCollapsedState = () => {
  const container = document.querySelector<HTMLElement>(".theme-container");

  if (!container) return;

  const shouldCollapse =
    isDesktop.value && hasSidebar.value && isCollapsed.value;
  container.classList.toggle(COLLAPSED_CLASS, shouldCollapse);
};

const setButtonPosition = (left: number) => {
  buttonStyle.value = {
    left: `${left}px`,
    top: `${getButtonTop()}px`,
  };
};

const getCollapsedLeft = () => {
  return COLLAPSED_HANDLE_OFFSET;
};

const getExpandedLeft = () => {
  const sidebar = document.querySelector<HTMLElement>(".vp-sidebar");

  if (sidebar) {
    const expandedLeft = sidebar.getBoundingClientRect().right;

    if (expandedLeft > 0) {
      lastExpandedLeft.value = expandedLeft;

      return expandedLeft;
    }
  }

  return lastExpandedLeft.value;
};

const updateButtonPosition = () => {
  const targetLeft = isCollapsed.value ? getCollapsedLeft() : getExpandedLeft();

  if (targetLeft === null) return;

  setButtonPosition(targetLeft);
};

const schedulePositionSync = () => {
  if (positionTimer) {
    window.clearTimeout(positionTimer);
  }

  const transitionDuration = getSidebarTransitionDuration();

  positionTimer = window.setTimeout(() => {
    updateButtonPosition();
    positionTimer = null;
  }, transitionDuration + 16);
};

const syncContainerState = async () => {
  await nextTick();

  const container = document.querySelector<HTMLElement>(".theme-container");

  if (!container) return;

  hasSidebar.value = !container.classList.contains("no-sidebar");
  getExpandedLeft();
  setCollapsedState();
  schedulePositionSync();

  observer?.disconnect();
  observer?.observe(container, {
    attributeFilter: ["class"],
    attributes: true,
  });
};

const toggleSidebar = () => {
  const expandedLeft = getExpandedLeft();

  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem(STORAGE_KEY, String(isCollapsed.value));
  setCollapsedState();

  const targetLeft = isCollapsed.value ? getCollapsedLeft() : expandedLeft;

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
    schedulePositionSync();
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
  if (positionTimer) {
    window.clearTimeout(positionTimer);
  }
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
    v-if="isDesktop && hasSidebar"
    :aria-label="buttonTitle"
    :aria-pressed="isCollapsed"
    :class="['desktop-sidebar-toggle', { collapsed: isCollapsed }]"
    :style="buttonStyle"
    :title="buttonTitle"
    type="button"
    @click="toggleSidebar"
  >
    <svg
      aria-hidden="true"
      class="desktop-sidebar-toggle__icon"
      viewBox="0 0 24 24"
    >
      <path
        d="M14.5 6.5 9 12l5.5 5.5"
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
.desktop-sidebar-toggle {
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

.desktop-sidebar-toggle:hover {
  border-color: rgb(148 163 184 / 72%);
  color: var(--theme-color);
  background: rgb(255 255 255 / 92%);
  box-shadow:
    0 12px 28px rgb(15 23 42 / 10%),
    0 1px 0 rgb(255 255 255 / 82%) inset;
}

.desktop-sidebar-toggle:active {
  border-color: rgb(148 163 184 / 82%);
  background: rgb(248 250 252 / 96%);
  box-shadow:
    0 6px 16px rgb(15 23 42 / 8%),
    0 1px 0 rgb(255 255 255 / 72%) inset;
}

.desktop-sidebar-toggle__icon {
  width: 0.82rem;
  height: 0.82rem;
  transition: transform var(--transform-transition);
}

.desktop-sidebar-toggle.collapsed .desktop-sidebar-toggle__icon {
  transform: rotate(180deg);
}

@media (max-width: 959px) {
  .desktop-sidebar-toggle {
    display: none;
  }
}
</style>
