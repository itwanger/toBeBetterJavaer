// 在已登录抖音的 Chrome 里（Claude in Chrome 的 javascript_tool）执行。
// 先滚动到作品列表底部出现「暂时没有更多了」，再运行本段，输出：视频ID|标题前 N 字。
// 工具输出有长度上限，51 条以上请用 rows.slice(a, b) 分段取。
const seen = new Set(); const rows = [];
document.querySelectorAll('li a[href*="/video/"]').forEach(a => {
  const m = a.getAttribute('href').match(/\/video\/(\d+)/);
  if (!m || seen.has(m[1])) return;
  seen.add(m[1]);
  const t = a.closest('li').innerText.replace(/\s+/g, ' ').replace(/^\d+\s*/, '').split('#')[0].trim();
  rows.push(m[1] + '|' + t.slice(0, 22));
});
rows.length + '\n' + rows.slice(0, 18).join('\n');
