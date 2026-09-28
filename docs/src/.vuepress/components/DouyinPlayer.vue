<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps<{ videoId: string; title: string }>();

// The embedded player caches its initial layout. Keep its viewport stable and
// scale the whole frame, including controls, without reloading a playing video.
const player = ref<HTMLElement | null>(null);
const scale = ref(1);
const attempt = ref(0);
const status = ref<"loading" | "loaded" | "unavailable">("loading");
let observer: ResizeObserver | undefined;
let loadTimer: ReturnType<typeof setTimeout> | undefined;

function startLoading() {
  clearTimeout(loadTimer);
  status.value = "loading";
  loadTimer = setTimeout(() => { status.value = "unavailable"; }, 12000);
}

function onLoad(event: Event) {
  // A blocked navigation can leave the initial empty document behind. A load
  // event only confirms navigation, never that the cross-origin video can play.
  const frame = event.target as HTMLIFrameElement;
  try {
    const doc = frame.contentDocument;
    if (doc && (!doc.URL || doc.URL === "about:blank")) return;
  } catch {
    // A normally loaded third-party document is not readable from this origin.
  }
  clearTimeout(loadTimer);
  status.value = "loaded";
}

function onError() {
  clearTimeout(loadTimer);
  status.value = "unavailable";
}

function retry() {
  startLoading();
  attempt.value += 1;
}

watch(() => props.videoId, startLoading);

onMounted(() => {
  startLoading();
  if (!player.value) return;
  scale.value = player.value.clientWidth / 720;
  observer = new ResizeObserver(([entry]) => {
    scale.value = entry.contentRect.width / 720;
  });
  observer.observe(player.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(loadTimer);
});
</script>

<template>
  <div ref="player" class="agent-video-card__player" :data-load-state="status">
    <iframe
      :key="`${videoId}-${attempt}`"
      :src="`https://open.douyin.com/player/video?vid=${videoId}&mode=pc&autoplay=0`"
      :title="title"
      :style="{ transform: `scale(${scale})` }"
      width="720"
      height="440"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      @load="onLoad"
      @error="onError"
    ></iframe>
    <div v-if="status !== 'loaded'" class="agent-video-card__status" role="status">
      <template v-if="status === 'loading'">正在加载抖音视频…</template>
      <template v-else>
        <strong>视频暂未加载</strong>
        <span>当前浏览器或网络可能限制了嵌入播放，正文可继续阅读。</span>
        <div class="agent-video-card__actions">
          <button type="button" @click="retry">重新加载</button>
          <a :href="`https://www.douyin.com/video/${videoId}`" target="_blank" rel="noopener noreferrer">在抖音观看</a>
        </div>
      </template>
    </div>
  </div>
  <div v-if="status === 'loaded'" class="agent-video-card__help">
    <span>画面未显示？</span>
    <button type="button" @click="retry">重新加载</button>
    <span>或用上方「在抖音打开」观看。</span>
  </div>
</template>
