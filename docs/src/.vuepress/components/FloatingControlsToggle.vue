<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vuepress/client";

const STORAGE_KEY = "tobebetterjavaer-floating-controls-collapsed";
const COLLAPSED_CLASS = "floating-controls-collapsed";

const route = useRoute();
const isCollapsed = ref(false);
const isVisible = ref(false);

let observer: MutationObserver | null = null;

const buttonTitle = computed(() =>
  isCollapsed.value ? "展开右侧工具栏" : "贴边收起右侧工具栏",
);

const syncCollapsedClass = () => {
  document.body.classList.toggle(COLLAPSED_CLASS, isCollapsed.value);
};

const syncVisibility = () => {
  isVisible.value = Boolean(
    document.querySelector(".focus-reading-toggle") ||
      document.querySelector("#pwa-inline-update-control") ||
      document.querySelector(".vp-back-to-top-button"),
  );
};

const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem(STORAGE_KEY, String(isCollapsed.value));
  syncCollapsedClass();
};

onMounted(() => {
  isCollapsed.value = localStorage.getItem(STORAGE_KEY) === "true";
  syncCollapsedClass();
  syncVisibility();

  observer = new MutationObserver(() => {
    syncVisibility();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
  document.body.classList.remove(COLLAPSED_CLASS);
});

watch(
  () => route.path,
  () => {
    syncVisibility();
  },
);
</script>

<template>
  <button
    v-if="isVisible"
    :aria-label="buttonTitle"
    :aria-pressed="isCollapsed"
    :class="['floating-controls-toggle', { 'is-collapsed': isCollapsed }]"
    :title="buttonTitle"
    type="button"
    @click="toggleCollapsed"
  >
    <svg
      aria-hidden="true"
      class="floating-controls-toggle__icon"
      viewBox="0 0 24 24"
    >
      <path
        v-if="isCollapsed"
        d="M14.5 6.75 9.25 12l5.25 5.25"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <path
        v-else
        d="M9.5 6.75 14.75 12 9.5 17.25"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  </button>
</template>

<style scoped>
.floating-controls-toggle {
  position: fixed;
  right: var(--floating-controls-right, 1.5rem);
  bottom: var(--floating-controls-toggle-bottom, 15rem);
  z-index: 121;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--floating-controls-circle-size, 3.5rem);
  height: var(--floating-controls-circle-size, 3.5rem);
  padding: 0;
  border: 1px solid var(--floating-controls-border, rgb(226 232 240 / 92%));
  border-radius: 999px;
  background: var(--floating-controls-bg, rgb(255 255 255 / 92%));
  color: var(--floating-controls-text, rgb(71 85 105 / 92%));
  box-shadow: var(--floating-controls-shadow);
  backdrop-filter: blur(14px);
  cursor: pointer;
  transform: translate3d(
      var(--floating-controls-toggle-shift-x, 0),
      var(--floating-controls-toggle-shift-y, 0),
      0
    )
    scale(var(--floating-controls-toggle-scale, 1));
  transform-origin: center;
  transition:
    color var(--color-transition),
    background var(--color-transition),
    border-color var(--color-transition),
    box-shadow var(--color-transition),
    transform var(--transform-transition),
    opacity var(--color-transition);
}

.floating-controls-toggle:hover {
  border-color: rgb(148 163 184 / 84%);
  color: var(--theme-color);
  --floating-controls-toggle-shift-y: -1px;
}

.floating-controls-toggle.is-collapsed {
  justify-content: flex-start;
  padding-left: 0.6rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow:
    0 16px 32px rgb(15 23 42 / 12%),
    0 1px 0 rgb(255 255 255 / 88%) inset;
}

.floating-controls-toggle__icon {
  width: 1rem;
  height: 1rem;
}

.floating-controls-toggle.is-collapsed .floating-controls-toggle__icon {
  transform: translateX(-0.08rem);
}

@media (max-width: 959px) {
  .floating-controls-toggle {
    bottom: var(--floating-controls-toggle-bottom, 13rem);
  }
}
</style>
