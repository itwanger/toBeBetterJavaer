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

const STORAGE_KEY = "tobebetterjavaer-focus-reading-mode";
const FOCUS_CLASS = "focus-reading-mode";

const route = useRoute();

const canUseFocusMode = ref(false);
const isFocused = ref(false);

let observer: MutationObserver | null = null;
let removeKeydownListener: (() => void) | null = null;

const buttonTitle = computed(() =>
  isFocused.value
    ? "退出专注模式（Esc）"
    : "进入专注模式（Alt + R）",
);

const setFocusState = () => {
  const container = document.querySelector<HTMLElement>(".theme-container");
  const shouldFocus = canUseFocusMode.value && isFocused.value;

  document.body.classList.toggle(FOCUS_CLASS, shouldFocus);
  container?.classList.toggle(FOCUS_CLASS, shouldFocus);
};

const syncAvailability = async () => {
  await nextTick();

  const container = document.querySelector<HTMLElement>(".theme-container");
  const page = document.querySelector<HTMLElement>(".vp-page");
  const content = document.querySelector<HTMLElement>(".theme-hope-content");

  canUseFocusMode.value = Boolean(
    container &&
      page &&
      content &&
      !container.classList.contains("home") &&
      !container.classList.contains("no-sidebar"),
  );

  if (!canUseFocusMode.value && isFocused.value) {
    isFocused.value = false;
  }

  setFocusState();

  observer?.disconnect();
  if (container) {
    observer?.observe(container, {
      attributeFilter: ["class"],
      attributes: true,
    });
  }
};

const toggleFocusMode = () => {
  if (!canUseFocusMode.value) return;

  isFocused.value = !isFocused.value;
  localStorage.setItem(STORAGE_KEY, String(isFocused.value));
  setFocusState();
};

onMounted(() => {
  isFocused.value = localStorage.getItem(STORAGE_KEY) === "true";

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isFocused.value) {
      event.preventDefault();
      isFocused.value = false;
      localStorage.setItem(STORAGE_KEY, "false");
      setFocusState();
      return;
    }

    if (event.altKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      toggleFocusMode();
    }
  };

  window.addEventListener("keydown", handleKeydown);
  removeKeydownListener = () => {
    window.removeEventListener("keydown", handleKeydown);
  };

  observer = new MutationObserver(() => {
    void syncAvailability();
  });

  void syncAvailability();
});

onBeforeUnmount(() => {
  observer?.disconnect();
  removeKeydownListener?.();
  document.body.classList.remove(FOCUS_CLASS);
});

watch(
  () => route.path,
  () => {
    void syncAvailability();
  },
);
</script>

<template>
  <button
    v-if="canUseFocusMode"
    :aria-label="buttonTitle"
    :aria-pressed="isFocused"
    :class="['focus-reading-toggle', { active: isFocused }]"
    :title="buttonTitle"
    type="button"
    @click="toggleFocusMode"
  >
    <svg
      aria-hidden="true"
      class="focus-reading-toggle__icon"
      viewBox="0 0 24 24"
    >
      <path
        d="M6.75 5.75A2.75 2.75 0 0 1 9.5 3h7.75v15.25H9.5a2.75 2.75 0 0 0-2.75 2.75z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.6"
      />
      <path
        d="M6.75 5.75v15.25M10.5 7.5h4.25M10.5 10.5h4.25"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.6"
      />
    </svg>
    <span class="focus-reading-toggle__label">
      {{ isFocused ? "退出专注" : "专注阅读" }}
    </span>
  </button>
</template>

<style scoped>
.focus-reading-toggle {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 120;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0.95rem;
  border: 1px solid rgb(226 232 240 / 92%);
  border-radius: 999px;
  background: rgb(255 255 255 / 92%);
  color: rgb(71 85 105 / 92%);
  box-shadow:
    0 14px 30px rgb(15 23 42 / 10%),
    0 1px 0 rgb(255 255 255 / 88%) inset;
  backdrop-filter: blur(14px);
  cursor: pointer;
  transition:
    color var(--color-transition),
    background var(--color-transition),
    border-color var(--color-transition),
    box-shadow var(--color-transition),
    transform var(--transform-transition),
    opacity var(--color-transition);
}

.focus-reading-toggle:hover {
  border-color: rgb(148 163 184 / 84%);
  color: var(--theme-color);
  transform: translateY(-1px);
}

.focus-reading-toggle.active {
  border-color: rgb(191 219 254 / 92%);
  background: rgb(239 246 255 / 92%);
  color: rgb(29 78 216 / 92%);
}

.focus-reading-toggle__icon {
  width: 1rem;
  height: 1rem;
  flex: none;
}

.focus-reading-toggle__label {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

@media (max-width: 959px) {
  .focus-reading-toggle {
    right: 1rem;
    bottom: 1rem;
    padding: 0.68rem 0.85rem;
  }

  .focus-reading-toggle__label {
    font-size: 0.86rem;
  }
}
</style>
