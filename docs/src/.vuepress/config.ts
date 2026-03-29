import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  // HTML 目录
  dest: "./dist",

  lang: "zh-CN",
  // 标题
  title: "二哥的Java进阶之路",
  // 描述
  description: "一份通俗易懂、风趣幽默的Java学习指南，内容涵盖Java基础、Java并发编程、Java虚拟机、AI应用开发、大模型应用开发、求职面试等核心知识点。学Java/AI，就认准二哥的Java进阶之路",

  theme,

  // pwa 建议设置为 false
  shouldPrefetch: false,

  head: [
    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "沉默王二" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "script",{},
      `
        (function () {
          if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

          var BUTTON_ID = 'pwa-inline-update-control';
          var STYLE_ID = 'pwa-inline-update-style';
          var resetTimer = null;
          var pollingTimer = null;
          var refreshing = false;
          var updateButton = null;
          var checkInFlight = false;
          var installingFallbackTimer = null;
          var latestStateTimer = null;
          var REGISTRATION_RETRY_DELAY = 1200;
          var AUTO_REGISTRATION_RETRIES = 6;
          var MANUAL_REGISTRATION_RETRIES = 2;

          function ensureStyle() {
            if (document.getElementById(STYLE_ID)) return;

            var style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent =
              '.pwa-inline-update-control{' +
              'position:fixed;right:var(--floating-controls-right,1.5rem);bottom:var(--floating-controls-update-bottom,10.5rem);z-index:120;display:inline-flex;align-items:center;justify-content:center;width:var(--floating-controls-circle-size,3.5rem);height:var(--floating-controls-circle-size,3.5rem);min-width:var(--floating-controls-circle-size,3.5rem);min-height:var(--floating-controls-circle-size,3.5rem);padding:0;border:1px solid var(--floating-controls-border,rgb(226 232 240 / 92%));border-radius:999px;background:var(--floating-controls-bg,rgb(255 255 255 / 92%));color:var(--floating-controls-text,rgb(71 85 105 / 92%));box-shadow:var(--floating-controls-shadow,0 14px 30px rgb(15 23 42 / 10%),0 1px 0 rgb(255 255 255 / 88%) inset);backdrop-filter:blur(14px);cursor:pointer;transition:color .2s ease,background .2s ease,border-color .2s ease,box-shadow .2s ease,transform .2s ease,opacity .2s ease;font-size:0;line-height:1;}' +
              '.pwa-inline-update-control::before{content:"↻";font-size:1.15rem;line-height:1;}' +
              '.pwa-inline-update-control:hover:not(:disabled){border-color:rgb(148 163 184 / 92%);color:var(--theme-color);transform:translateY(-1px);}' +
              '.pwa-inline-update-control:disabled{cursor:wait;opacity:.88;}' +
              '.pwa-inline-update-control.is-checking::before,.pwa-inline-update-control.is-updating::before{animation:floating-controls-spin .9s linear infinite;}' +
              '.pwa-inline-update-control.is-ready{border-color:rgb(191 219 254 / 96%);background:rgb(239 246 255 / 96%);color:rgb(29 78 216 / 96%);}' +
              '.pwa-inline-update-control.is-ready::before{content:"⟳";}' +
              '.pwa-inline-update-control.is-latest::before{content:"✓";font-size:1rem;}' +
              '.pwa-inline-update-control.is-error{border-color:rgb(254 205 211 / 96%);background:rgb(255 241 242 / 96%);color:rgb(190 24 93 / 92%);}' +
              '.pwa-inline-update-control.is-error::before{content:"!";font-size:1rem;font-weight:700;}' +
              '@keyframes floating-controls-spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}' +
              '@media (max-width: 959px){.pwa-inline-update-control{width:var(--floating-controls-circle-size,3.25rem);height:var(--floating-controls-circle-size,3.25rem);min-width:var(--floating-controls-circle-size,3.25rem);min-height:var(--floating-controls-circle-size,3.25rem);}}';
            document.head.appendChild(style);
          }

          function ensureButton() {
            var button = document.getElementById(BUTTON_ID) || updateButton;
            if (button) return button;

            ensureStyle();

            button = document.createElement('button');
            button.id = BUTTON_ID;
            button.type = 'button';
            button.className = 'pwa-inline-update-control';
            button.textContent = '检查更新';
            button.title = '手动检查网站是否有新版本';
            button.addEventListener('click', function () {
              checkForUpdates(true, false);
            });

            function appendButton() {
              if (!document.body) return;
              if (button.isConnected) return;
              document.body.appendChild(button);
            }

            if (document.body) appendButton();
            else window.addEventListener('DOMContentLoaded', appendButton, { once: true });

            updateButton = button;
            return button;
          }

          function clearResetTimer() {
            if (resetTimer !== null) {
              window.clearTimeout(resetTimer);
              resetTimer = null;
            }
          }

          function clearInstallingFallbackTimer() {
            if (installingFallbackTimer !== null) {
              window.clearTimeout(installingFallbackTimer);
              installingFallbackTimer = null;
            }
          }

          function clearLatestStateTimer() {
            if (latestStateTimer !== null) {
              window.clearTimeout(latestStateTimer);
              latestStateTimer = null;
            }
          }

          function wait(ms) {
            return new Promise(function (resolve) {
              window.setTimeout(resolve, ms);
            });
          }

          function getRegistrationWithRetry(retriesLeft) {
            return navigator.serviceWorker.getRegistration().then(function (registration) {
              if (registration || retriesLeft <= 0) return registration;

              return wait(REGISTRATION_RETRY_DELAY).then(function () {
                return getRegistrationWithRetry(retriesLeft - 1);
              });
            });
          }

          function setState(state) {
            var button = ensureButton();
            var text = '检查更新';
            var title = '手动检查网站是否有新版本';

            button.classList.remove('is-checking', 'is-latest', 'is-ready', 'is-updating', 'is-error');

            if (state === 'checking') text = '检查中...';
            if (state === 'latest') {
              text = '已是最新';
              title = '当前已经是最新内容';
            }
            if (state === 'ready') {
              text = '刷新到新版本';
              title = '发现新版本，点击刷新当前页面';
            }
            if (state === 'updating') {
              text = '刷新中...';
              title = '正在切换到新版本';
            }
            if (state === 'error') text = '检查失败';

            button.textContent = text;
            button.title = title;
            button.setAttribute('aria-label', title);
            button.disabled = state === 'checking' || state === 'updating';
            button.classList.add('is-' + state);
          }

          function setTemporaryState(state) {
            setState(state);
            clearResetTimer();
            clearLatestStateTimer();
            resetTimer = window.setTimeout(function () {
              setState('idle');
              resetTimer = null;
            }, 2200);
          }

          function showLatestThenIdle() {
            setState('latest');
            clearLatestStateTimer();
            latestStateTimer = window.setTimeout(function () {
              setState('idle');
              latestStateTimer = null;
            }, 2200);
          }

          function activateWaitingWorker(registration) {
            if (!registration.waiting) return false;
            setState('updating');
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            return true;
          }

          function watchInstallingWorker(registration, worker, activateWhenReady) {
            var handleStateChange = function () {
              if (worker.state === 'installed') {
                clearInstallingFallbackTimer();
                checkInFlight = false;

                if (!navigator.serviceWorker.controller) {
                  setTemporaryState('latest');
                  return;
                }

                if (activateWhenReady) {
                  if (!activateWaitingWorker(registration)) setState('ready');
                } else {
                  setState('ready');
                }
              }

              if (worker.state === 'redundant') {
                clearInstallingFallbackTimer();
                checkInFlight = false;
                setTemporaryState('error');
              }
            };

            worker.addEventListener('statechange', handleStateChange);
            handleStateChange();
          }

          function checkForUpdates(activateWhenReady, silently) {
            if (checkInFlight) return;

            checkInFlight = true;
            clearResetTimer();
            clearLatestStateTimer();
            clearInstallingFallbackTimer();
            if (!silently) setState('checking');

            getRegistrationWithRetry(
              activateWhenReady ? MANUAL_REGISTRATION_RETRIES : AUTO_REGISTRATION_RETRIES
            ).then(function (registration) {
              if (!registration) {
                checkInFlight = false;
                if (silently) setState('idle');
                else setTemporaryState('error');
                return;
              }

              registration.update().then(function () {
                if (registration.waiting) {
                  checkInFlight = false;
                  if (activateWhenReady) activateWaitingWorker(registration);
                  else setState('ready');
                  return;
                }

                if (registration.installing) {
                  installingFallbackTimer = window.setTimeout(function () {
                    checkInFlight = false;
                    installingFallbackTimer = null;

                    if (registration.waiting) {
                      if (activateWhenReady) activateWaitingWorker(registration);
                      else setState('ready');
                      return;
                    }

                    showLatestThenIdle();
                  }, 8000);

                  watchInstallingWorker(registration, registration.installing, activateWhenReady);
                  return;
                }

                checkInFlight = false;
                showLatestThenIdle();
              }).catch(function () {
                checkInFlight = false;
                setTemporaryState('error');
              });
            }).catch(function () {
              checkInFlight = false;
              setTemporaryState('error');
            });
          }

          navigator.serviceWorker.addEventListener('controllerchange', function () {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
          });

          window.addEventListener('focus', function () {
            if (document.visibilityState === 'visible') checkForUpdates(false, true);
          });

          document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') checkForUpdates(false, true);
          });

          pollingTimer = window.setInterval(function () {
            checkForUpdates(false, true);
          }, 5 * 60 * 1000);

          navigator.serviceWorker.ready.then(function () {
            checkForUpdates(false, true);
          }).catch(function () {});

          ensureButton();
          setState('idle');
          checkForUpdates(false, true);
        })();
      `
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Java, Java基础, 并发编程, JVM, 虚拟机, 数据库, MySQL, Spring, Redis, MyBatis, SpringBoot, IDEA, 求职面试, 面渣逆袭, 学习路线, AI应用开发, 大模型应用开发, Agent开发",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "script",{},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5230ac143650bf5eb3c14f3fb9b1d3ec";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ],
    [
      "script",{},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?59aa453e7e706422c636c079fc1cb031";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_3180624_7cy10l7jqqh.css",
      },
    ],
  ],
});
