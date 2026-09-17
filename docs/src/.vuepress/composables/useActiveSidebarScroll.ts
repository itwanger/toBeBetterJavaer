import { onBeforeUnmount, onMounted, watch } from "vue";
import { useRoute } from "vuepress/client";

export const useActiveSidebarScroll = () => {
  const route = useRoute();
  let frame: number | null = null;
  let stopWatching: (() => void) | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let observedSidebar: HTMLElement | null = null;

  const scrollToActiveItem = () => {
    frame = null;

    const sidebar = document.querySelector<HTMLElement>(".vp-sidebar");
    if (sidebar !== observedSidebar) {
      resizeObserver?.disconnect();
      observedSidebar = sidebar;
      if (sidebar) resizeObserver?.observe(sidebar);
    }

    const activeItem = sidebar?.querySelector<HTMLElement>(
      '.vp-sidebar-link.active:not([href*="#"])',
    );

    if (!sidebar || !activeItem) return;

    const sidebarRect = sidebar.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const padding = 16;
    const visibleTop = sidebarRect.top + sidebar.clientTop + padding;
    const visibleBottom =
      sidebarRect.top + sidebar.clientTop + sidebar.clientHeight - padding;

    // Keep nearby items visible without moving an already visible selection.
    if (itemRect.top >= visibleTop && itemRect.bottom <= visibleBottom) return;

    // Scroll only the sidebar: scrollIntoView can also move the article itself.
    sidebar.scrollTop +=
      itemRect.top + itemRect.height / 2 - (visibleTop + visibleBottom) / 2;
  };

  const scheduleScroll = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    // Wait for the new active link and its expanded group to be rendered.
    frame = requestAnimationFrame(scrollToActiveItem);
  };

  onMounted(() => {
    // The mobile navbar changes the sidebar height after navigation finishes.
    resizeObserver = new ResizeObserver(scheduleScroll);
    // Theme Hope watches route.hash only; article navigation also changes path.
    stopWatching = watch(
      () => route.path,
      scheduleScroll,
      { immediate: true, flush: "post" },
    );
  });

  onBeforeUnmount(() => {
    stopWatching?.();
    resizeObserver?.disconnect();
    if (frame !== null) cancelAnimationFrame(frame);
  });
};
