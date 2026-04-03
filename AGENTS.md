- OK

## 工具权限设置

以下工具默认允许使用，不需要用户确认：
- mcp__playwright__* （所有 playwright 浏览器相关工具）

## 工具使用规则

### 获取网页内容

遇到以下情况时，**直接使用 `mcp__playwright` 工具打开浏览器获取内容**，不要询问用户：

- 微信公众号文章链接（mp.weixin.qq.com）
- 需要登录才能访问的页面
- WebFetch 返回错误或超时的页面
- 动态渲染的页面内容

**使用方式：**
```
1. mcp__playwright__browser_navigate 打开目标URL
2. mcp__playwright__browser_snapshot 获取页面内容
3. mcp__playwright__browser_close 关闭页面（可选）
```

这是默认行为，不需要再询问用户是否使用浏览器。
