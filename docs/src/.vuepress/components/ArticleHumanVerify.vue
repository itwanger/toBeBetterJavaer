<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePageFrontmatter, useRoute } from "vuepress/client";

type VerifyFrontmatter = {
  humanVerify?: boolean;
  humanVerifyCode?: string | number;
  humanVerifyPercent?: number;
  humanVerifyKeyword?: string;
  humanVerifyQrcode?: string;
};

const DEFAULT_PERCENT = 5;
const DEFAULT_CODE = "888";
const DEFAULT_KEYWORD = "222";
const DEFAULT_QRCODE =
  "https://cdn.paicoding.com/tobebetterjavaer/images/gongzhonghao.png";
const STORAGE_KEY = "article-human-verify:site";

const route = useRoute();
const frontmatter = usePageFrontmatter<VerifyFrontmatter>();

const codeInput = ref("");
const errorMessage = ref("");
const isVerified = ref(false);
const teleportTarget = ref<HTMLElement | null>(null);
let hashRouteScrollTimer: number | null = null;
let syncTimers: number[] = [];

const isEnabled = computed(() => frontmatter.value.humanVerify === true);
const unlockCode = computed(() =>
  String(frontmatter.value.humanVerifyCode ?? DEFAULT_CODE),
);
const unlockPercent = computed(() => {
  const percent = Number(frontmatter.value.humanVerifyPercent ?? DEFAULT_PERCENT);
  if (!Number.isFinite(percent)) return DEFAULT_PERCENT;
  return Math.min(90, Math.max(5, percent));
});
const keyword = computed(
  () => frontmatter.value.humanVerifyKeyword || DEFAULT_KEYWORD,
);
const qrcode = computed(() => frontmatter.value.humanVerifyQrcode || DEFAULT_QRCODE);
const shouldGate = computed(
  () => isEnabled.value && !isVerified.value && unlockCode.value.length > 0,
);
const getContentElement = () =>
  document.querySelector<HTMLElement>(".theme-hope-content");

const ensureTeleportTarget = (content: HTMLElement) => {
  if (
    teleportTarget.value?.isConnected &&
    teleportTarget.value.previousElementSibling === content
  ) {
    return teleportTarget.value;
  }

  removeTeleportTarget();

  const target = document.createElement("div");
  target.className = "article-human-verify-anchor";
  content.insertAdjacentElement("afterend", target);
  teleportTarget.value = target;
  return target;
};

const removeTeleportTarget = () => {
  teleportTarget.value?.remove();
  teleportTarget.value = null;
};

const stopHashRouteScrollTimer = () => {
  if (hashRouteScrollTimer === null) return;

  window.clearInterval(hashRouteScrollTimer);
  hashRouteScrollTimer = null;
};

const clearSyncTimers = () => {
  syncTimers.forEach((timer) => window.clearTimeout(timer));
  syncTimers = [];
};

const keepGateVisibleForHashRoute = (target: HTMLElement) => {
  if (!window.location.hash) return;

  stopHashRouteScrollTimer();

  let attempts = 0;
  const scrollToGate = () => {
    if (!target.isConnected || isVerified.value) {
      stopHashRouteScrollTimer();
      return;
    }

    const rect = target.getBoundingClientRect();
    const headerOffset = 96;
    const isOutsideViewport =
      rect.top < headerOffset || rect.bottom > window.innerHeight;

    if (isOutsideViewport) {
      window.scrollTo({
        top: Math.max(0, window.scrollY + rect.top - headerOffset),
      });
    }

    attempts += 1;
    if (attempts >= 14) stopHashRouteScrollTimer();
  };

  scrollToGate();
  hashRouteScrollTimer = window.setInterval(scrollToGate, 160);
};

const readStoredState = () => {
  if (!isEnabled.value) {
    isVerified.value = false;
    return;
  }

  isVerified.value = localStorage.getItem(STORAGE_KEY) === "true";
};

const syncContentState = async () => {
  await nextTick();

  const content = getContentElement();
  if (!content) return;

  if (!isEnabled.value || isVerified.value) {
    content.classList.remove("article-human-verify-preview");
    content.style.removeProperty("--article-human-verify-max-height");
    removeTeleportTarget();
    stopHashRouteScrollTimer();
    return;
  }

  const updateHeight = () => {
    content.style.setProperty(
      "--article-human-verify-max-height",
      `${Math.round(content.scrollHeight * (unlockPercent.value / 100))}px`,
    );
  };

  updateHeight();
  content.classList.add("article-human-verify-preview");
  keepGateVisibleForHashRoute(ensureTeleportTarget(content));
};

const scheduleContentSync = () => {
  clearSyncTimers();
  void syncContentState();

  [80, 240, 520, 1200, 2200].forEach((delay) => {
    syncTimers.push(window.setTimeout(() => void syncContentState(), delay));
  });
};

const unlockArticle = () => {
  if (codeInput.value.trim() !== unlockCode.value) {
    errorMessage.value = "验证码不对，再看一眼公众号回复。";
    return;
  }

  localStorage.setItem(STORAGE_KEY, "true");
  errorMessage.value = "";
  isVerified.value = true;
  void syncContentState();
};

watch(
  () => route.path,
  () => {
    codeInput.value = "";
    errorMessage.value = "";
    readStoredState();
    scheduleContentSync();
  },
);

watch(
  () => frontmatter.value,
  () => {
    readStoredState();
    scheduleContentSync();
  },
);

onMounted(() => {
  readStoredState();
  scheduleContentSync();
});

onBeforeUnmount(() => {
  clearSyncTimers();
  removeTeleportTarget();
  stopHashRouteScrollTimer();
});
</script>

<template>
  <Teleport v-if="shouldGate && teleportTarget" :to="teleportTarget">
    <div class="article-human-verify-card">
      <div class="article-human-verify-content">
        <div class="article-human-verify-copy">
          <p class="article-human-verify-eyebrow">
            人机验证前，只开放前 {{ unlockPercent }}% 内容
          </p>
          <h2>近期发现不少Agent批量抓取内容，为保障正常阅读体验，本站部分内容已开启一次性验证</h2>
          <p>
            扫码关注「沉默王二」公众号，发送关键字
            <strong>{{ keyword }}</strong>
            获取口令。把公众号返回的口令填到下面，验证通过后即可解锁全文。
          </p>
          <p>
            验证成功后会自动记住本站内容，下次打开不用重复输入。
          </p>
        </div>
        <div class="article-human-verify-action">
          <img
            :src="qrcode"
            alt="微信扫码或者长按识别，或者微信搜索沉默王二"
            class="article-human-verify-qrcode"
          />
          <form class="article-human-verify-form" @submit.prevent="unlockArticle">
            <input
              v-model="codeInput"
              aria-label="输入公众号验证码"
              autocomplete="off"
              inputmode="text"
              placeholder="输入公众号验证码"
              type="text"
            />
            <button type="submit">解锁全文</button>
          </form>
          <p v-if="errorMessage" class="article-human-verify-error">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
