// 滚动条样式
// 早期主题初始化 - 在 head_begin 执行，确保在 giscus 加载前设置正确的主题
hexo.extend.injector.register('head_begin', `
<script>
(function() {
  var STORAGE_KEY = 'theme-preference';
  var COLOR_SCHEME_KEY = 'color-scheme-preference';
  var THEME_DARK = 'dark';

  function isSystemDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'system';
    } catch (e) {
      return 'system';
    }
  }

  function getStoredColorScheme() {
    try {
      return localStorage.getItem(COLOR_SCHEME_KEY) || 'one-dark';
    } catch (e) {
      return 'one-dark';
    }
  }

  function isDarkMode(preference) {
    if (preference === 'system') {
      return isSystemDark();
    }
    return preference === THEME_DARK;
  }

  // 立即应用主题 class
  var preference = getStoredTheme();
  var isDark = isDarkMode(preference);
  if (isDark) {
    document.documentElement.classList.add(THEME_DARK);
    
    // 应用配色方案
    var colorScheme = getStoredColorScheme();
    if (colorScheme !== 'one-dark') {
      document.documentElement.setAttribute('data-color-scheme', colorScheme);
    }
  }

  // 监听 giscus script 标签的创建并修改 data-theme
  var giscusTheme = isDark ? 'dark' : 'light';
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1) {
          // 检查是否是 giscus script
          if (node.tagName === 'SCRIPT' && node.src && node.src.indexOf('giscus.app') > -1) {
            node.setAttribute('data-theme', giscusTheme);
          }
          // 检查子元素
          if (node.querySelectorAll) {
            var scripts = node.querySelectorAll('script[src*="giscus.app"]');
            scripts.forEach(function(s) {
              s.setAttribute('data-theme', giscusTheme);
            });
          }
        }
      });
    });
  });

  // 开始监听
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // 也检查现有的 script（虽然不太可能在这么早的阶段存在）
  document.querySelectorAll('script[src*="giscus.app"]').forEach(function(s) {
    s.setAttribute('data-theme', giscusTheme);
  });
})();
</script>
`, 'default');

hexo.extend.injector.register('head_end', `
<style>
/* Bash/shell 命令提示符，不参与选中 */
.shell-prompt {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 代码块滚动条：视觉变粗但不影响布局 */
.highlight-body::-webkit-scrollbar,
figure.highlight::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* 滚动条轨道透明 */
.highlight-body::-webkit-scrollbar-track,
figure.highlight::-webkit-scrollbar-track {
  background: transparent;
}

/* 平时：thumb 显示 2px，两侧透明边框填充 */
.highlight-body::-webkit-scrollbar-thumb,
figure.highlight::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border: 3px solid transparent;
  border-radius: 4px;
}

/* 悬浮时：thumb 扩展到完整 8px (通过 JS 控制) */
.highlight-body.is-scrollbar-hover::-webkit-scrollbar-thumb,
figure.highlight.is-scrollbar-hover::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
  border: 0;
  border-radius: 4px;
}

/* 代码块按钮统一样式 */
figure.highlight figcaption {
  padding-right: 0.25em;
}

figure.highlight figcaption .level-right {
  align-items: center;
}

figure.highlight figcaption .level-right a {
  margin-left: 0;
  padding: 0 0.5em;
}

.highlight .copy,
.highlight .wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.highlight .copy:hover,
.highlight .wrap:hover {
  opacity: 1;
}

.highlight .wrap {
  width: 1.2rem;
  margin-left: 0.75em;
}

/* 行内代码块圆角背景 - 日间模式 */
.content code,
p code,
li code,
td code,
dd code {
  background-color: rgba(0, 0, 0, 0.08) !important;
  border-radius: 3px !important;
  padding: 0.15em 0.35em !important;
}

/* 代码块换行模式 */
.highlight.is-wrapped .highlight-body pre,
.highlight.is-wrapped .highlight-body code {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
`, 'default');

// 夜间模式样式 - 只在 html.dark 时生效
// 配色方案使用 CSS 变量实现
hexo.extend.injector.register('head_end', `
<style>
/* 配色方案 CSS 变量定义 */
html.dark {
  /* One Dark Pro (默认) */
  --dm-bg: #282c34;
  --dm-bg-alt: #21252b;
  --dm-bg-hover: #2c313a;
  --dm-bg-highlight: #3e4451;
  --dm-fg: #abb2bf;
  --dm-fg-muted: #8b949e;
  --dm-primary: #61afef;
  --dm-accent: #98c379;
  --dm-warning: #e5c07b;
  --dm-error: #e06c75;
  --dm-border: #181a1f;
  --dm-border-light: #3e4451;
}

/* Dracula 配色 */
html.dark[data-color-scheme="dracula"] {
  --dm-bg: #282a36;
  --dm-bg-alt: #21222c;
  --dm-bg-hover: #44475a;
  --dm-bg-highlight: #44475a;
  --dm-fg: #f8f8f2;
  --dm-fg-muted: #b4b7c4;
  --dm-primary: #bd93f9;
  --dm-accent: #50fa7b;
  --dm-warning: #f1fa8c;
  --dm-error: #ff79c6;
  --dm-border: #191a21;
  --dm-border-light: #44475a;
}

/* Nord 配色 */
html.dark[data-color-scheme="nord"] {
  --dm-bg: #2e3440;
  --dm-bg-alt: #3b4252;
  --dm-bg-hover: #434c5e;
  --dm-bg-highlight: #4c566a;
  --dm-fg: #eceff4;
  --dm-fg-muted: #c9d1d9;
  --dm-primary: #88c0d0;
  --dm-accent: #a3be8c;
  --dm-warning: #ebcb8b;
  --dm-error: #bf616a;
  --dm-border: #2e3440;
  --dm-border-light: #4c566a;
}

/* GitHub Dark 配色 */
html.dark[data-color-scheme="github-dark"] {
  --dm-bg: #0d1117;
  --dm-bg-alt: #161b22;
  --dm-bg-hover: #21262d;
  --dm-bg-highlight: #30363d;
  --dm-fg: #c9d1d9;
  --dm-fg-muted: #8b949e;
  --dm-primary: #58a6ff;
  --dm-accent: #3fb950;
  --dm-warning: #d29922;
  --dm-error: #f85149;
  --dm-border: #21262d;
  --dm-border-light: #30363d;
}

/* 暗色模式配色覆盖 - 使用 CSS 变量 */
/* 配色切换平滑过渡 */
html.dark body,
html.dark .card,
html.dark .navbar-main,
html.dark .navbar-item,
html.dark .title,
html.dark .subtitle,
html.dark .content,
html.dark .menu-label,
html.dark .menu-list a,
html.dark .table {
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

html.dark body {
  background-color: var(--dm-bg);
  color: var(--dm-fg);
}

html.dark .card {
  background-color: var(--dm-bg-alt);
}

html.dark .navbar-main {
  background-color: var(--dm-bg-alt);
}

html.dark .navbar-item {
  color: var(--dm-fg);
}

html.dark .navbar-item:hover {
  color: var(--dm-primary);
  background-color: var(--dm-bg-hover);
}

html.dark .title,
html.dark .subtitle {
  color: var(--dm-warning);
}

html.dark .content {
  color: var(--dm-fg);
}

html.dark .content h1,
html.dark .content h2,
html.dark .content h3,
html.dark .content h4,
html.dark .content h5,
html.dark .content h6 {
  color: var(--dm-warning);
}

html.dark a {
  color: var(--dm-primary);
}

html.dark a:hover {
  color: var(--dm-accent);
}

html.dark .footer {
  background-color: var(--dm-bg);
  color: var(--dm-fg-muted);
}

html.dark .menu-list a {
  color: var(--dm-fg);
}

html.dark .menu-list a:hover {
  background-color: var(--dm-bg-hover);
  color: var(--dm-primary);
}

html.dark .menu-list a.is-active {
  background-color: var(--dm-primary);
  color: var(--dm-bg);
}

html.dark input,
html.dark textarea {
  background-color: var(--dm-bg-alt);
  border-color: var(--dm-border);
  color: var(--dm-fg);
}

html.dark input::placeholder,
html.dark textarea::placeholder {
  color: var(--dm-fg-muted);
}

html.dark blockquote {
  background-color: var(--dm-bg-alt);
  border-left-color: var(--dm-primary);
  color: var(--dm-fg);
}

html.dark blockquote strong,
html.dark blockquote b {
  color: var(--dm-warning);
}

html.dark code {
  background-color: rgba(97, 175, 239, 0.1);
  color: var(--dm-primary);
  border-radius: 3px;
  padding: 0.1em 0.3em;
}

/* 代码块内的 code 不应用行内样式 */
html.dark pre code,
html.dark .highlight code {
  background-color: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
}

html.dark pre {
  background-color: var(--dm-bg);
}

html.dark figure.highlight {
  background-color: var(--dm-bg);
}

html.dark .highlight {
  background-color: var(--dm-bg);
  color: var(--dm-fg);
}

/* 代码块行号区域 */
html.dark .gutter {
  background-color: var(--dm-bg-alt);
}

html.dark .gutter pre {
  background-color: var(--dm-bg-alt);
}

html.dark .highlight .code,
html.dark .highlight pre {
  color: var(--dm-fg);
}

html.dark .highlight .line {
  color: var(--dm-fg);
}

html.dark .tag:not(body) {
  background-color: var(--dm-bg-hover);
  color: var(--dm-fg);
}

html.dark .button {
  background-color: var(--dm-bg-hover);
  border-color: var(--dm-border);
  color: var(--dm-fg);
}

html.dark .button:hover {
  border-color: var(--dm-primary);
  color: var(--dm-primary);
}

html.dark .button.is-light {
  background-color: var(--dm-bg-hover);
  border-color: transparent;
  color: var(--dm-fg);
}

html.dark .button.is-light:hover {
  background-color: var(--dm-bg-highlight);
  color: var(--dm-primary);
}

html.dark .button.is-transparent {
  background-color: transparent;
  border-color: transparent;
  color: var(--dm-fg);
}

html.dark .button.is-transparent:hover {
  color: var(--dm-primary);
}

html.dark .pagination-link,
html.dark .pagination-previous,
html.dark .pagination-next {
  background-color: var(--dm-bg-alt);
  border-color: var(--dm-border);
  color: var(--dm-fg);
}

html.dark .pagination-link:hover,
html.dark .pagination-previous:hover,
html.dark .pagination-next:hover {
  background-color: var(--dm-bg-hover);
  border-color: var(--dm-primary);
  color: var(--dm-primary);
}

html.dark .pagination-link.is-current {
  background-color: var(--dm-primary);
  border-color: var(--dm-primary);
  color: var(--dm-bg);
}

/* 搜索框完整样式 */
html.dark .searchbox {
  background-color: rgba(40, 44, 52, 0.95);
}

html.dark .searchbox-container {
  background-color: var(--dm-bg-alt);
  border-color: var(--dm-border-light);
}

html.dark .searchbox-header {
  background-color: var(--dm-bg);
}

html.dark .searchbox-input {
  background-color: var(--dm-bg);
  color: var(--dm-fg);
}

html.dark .searchbox-input::placeholder {
  color: var(--dm-fg-muted);
}

html.dark .searchbox-body {
  border-top-color: var(--dm-border-light);
}

html.dark .searchbox-result-section {
  border-bottom-color: var(--dm-border-light);
}

html.dark .searchbox-result-section header {
  color: var(--dm-fg-muted);
}

html.dark .searchbox-result-item {
  color: var(--dm-fg);
}

html.dark .searchbox-result-item:not(.disabled):not(.active):not(:active):hover {
  background-color: rgba(255, 255, 255, 0.08);
}

html.dark .searchbox-result-item:active,
html.dark .searchbox-result-item.active {
  background-color: var(--dm-primary);
  color: var(--dm-bg);
}

/* 搜索关键词高亮 - 柔和的暗色高亮 */
html.dark .searchbox-result-item em {
  background-color: rgba(97, 175, 239, 0.2);
  color: var(--dm-primary);
  font-style: normal;
  border-radius: 2px;
  padding: 0 2px;
}

html.dark .searchbox-result-item:hover em {
  background-color: rgba(97, 175, 239, 0.3);
}

html.dark .searchbox-result-item:active em,
html.dark .searchbox-result-item.active em {
  background-color: rgba(40, 44, 52, 0.5);
  color: var(--dm-bg);
}

html.dark .searchbox-result-preview {
  color: var(--dm-fg-muted);
}

html.dark .searchbox-footer {
  background-color: var(--dm-bg-alt);
}

html.dark .searchbox-pagination-link {
  background-color: var(--dm-bg);
  color: var(--dm-fg);
}

html.dark .searchbox-pagination-link:hover {
  background-color: var(--dm-bg-hover);
  color: var(--dm-primary);
}

html.dark .searchbox-pagination-item.active .searchbox-pagination-link {
  background-color: var(--dm-primary);
  color: var(--dm-bg);
}

html.dark .searchbox-pagination-item.disabled .searchbox-pagination-link {
  background-color: var(--dm-bg-alt);
  color: var(--dm-fg-muted);
}

html.dark .searchbox-close {
  color: var(--dm-fg);
}

html.dark .searchbox-close:hover {
  background-color: var(--dm-bg-hover);
  color: var(--dm-error);
}

html.dark .toc {
  background-color: var(--dm-bg-alt);
}

html.dark #back-to-top {
  background-color: var(--dm-primary);
  color: var(--dm-bg);
}

html.dark ol.footnotes-list > li:hover {
  background-color: var(--dm-bg-hover);
}

/* 水平分隔线 */
html.dark hr {
  background-color: var(--dm-border-light);
}

/* 滚动条暗色 */
html.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

html.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 代码块滚动条暗色模式 */
html.dark .highlight-body::-webkit-scrollbar-track,
html.dark figure.highlight::-webkit-scrollbar-track {
  background: transparent;
}

/* 平时：透明边框隐藏 */
html.dark .highlight-body::-webkit-scrollbar-thumb,
html.dark figure.highlight::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  background-clip: padding-box;
  border: 3px solid transparent;
}

/* 悬浮时：完整显示 (通过 JS 控制) */
html.dark .highlight-body.is-scrollbar-hover::-webkit-scrollbar-thumb,
html.dark figure.highlight.is-scrollbar-hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border: 0;
}

/* 脚注区域 */
html.dark section.footnotes {
  border-top-color: var(--dm-border-light);
}

/* Box 组件（被文章许可卡片使用） */
html.dark .box {
  background-color: var(--dm-bg-alt);
  color: var(--dm-fg);
}

/* 文章许可卡片 */
html.dark .article-licensing {
  background-color: var(--dm-bg-alt);
}

html.dark .article-licensing .licensing-title {
  color: var(--dm-fg);
}

html.dark .article-licensing .licensing-title a {
  color: var(--dm-primary);
}

html.dark .article-licensing .licensing-title a:hover {
  color: var(--dm-accent);
}

html.dark .article-licensing h6 {
  color: var(--dm-fg-muted);
}

html.dark .article-licensing p {
  color: var(--dm-fg);
}

/* 文章导航（上下篇） - 正确的类名 */
html.dark .post-navigation {
  background-color: transparent;
}

html.dark .post-navigation .link-muted {
  color: var(--dm-fg);
}

html.dark .post-navigation .link-muted:hover {
  color: var(--dm-primary) !important;
}

html.dark .post-navigation .level-item {
  color: var(--dm-fg);
}

/* 评论区域 */
html.dark #comments .title {
  color: var(--dm-warning);
}

/* giscus 评论容器 */
html.dark .giscus {
  background-color: transparent;
}

/* 归档时间线 */
html.dark .timeline {
  border-left-color: var(--dm-border-light);
}

html.dark .timeline .media:before {
  background-color: var(--dm-primary);
}

html.dark .timeline .media:last-child:after {
  background-color: var(--dm-bg);
}

/* 归档页文章摘要 */
html.dark .media {
  color: var(--dm-fg);
}

html.dark .media .media-content .title {
  color: var(--dm-warning);
}

html.dark .media .media-content .subtitle {
  color: var(--dm-fg-muted);
}

html.dark .media .media-content a:hover .title {
  color: var(--dm-primary);
}

/* 代码块标题栏 */
html.dark figure.highlight figcaption,
html.dark .highlight figcaption {
  background-color: var(--dm-bg-alt);
  color: var(--dm-fg-muted);
}

html.dark figure.highlight figcaption a,
html.dark .highlight figcaption a {
  color: var(--dm-primary);
}

/* 导航下拉菜单 */
html.dark .navbar-dropdown {
  background-color: var(--dm-bg-alt);
  border-color: var(--dm-border-light);
}

html.dark .navbar-dropdown .navbar-item {
  color: var(--dm-fg);
}

html.dark .navbar-dropdown .navbar-item:hover {
  background-color: var(--dm-bg-hover);
  color: var(--dm-primary);
}

html.dark .navbar-divider {
  background-color: var(--dm-border-light);
}

/* 下拉选择框 */
html.dark select {
  background-color: var(--dm-bg-alt);
  border-color: var(--dm-border);
  color: var(--dm-fg);
}

html.dark .select:not(.is-multiple):not(.is-loading)::after {
  border-color: var(--dm-fg);
}

/* Cookie 同意弹窗 */
html.dark .cc-window {
  background-color: var(--dm-bg-alt);
  color: var(--dm-fg);
}

html.dark .cc-btn {
  background-color: var(--dm-primary);
  color: var(--dm-bg);
}

html.dark .cc-link {
  color: var(--dm-primary);
}

/* 页面加载进度条 */
html.dark .pace .pace-progress {
  background-color: var(--dm-primary);
}

html.dark .pace .pace-activity {
  border-color: var(--dm-primary) transparent transparent transparent;
}

/* 菜单标签 */
html.dark .menu-label {
  color: #dcdcdc;
}

/* 表格 */
html.dark .table {
  background-color: var(--dm-bg-alt);
  color: var(--dm-fg);
}

html.dark .table th {
  color: var(--dm-warning);
  border-color: var(--dm-border-light);
}

html.dark .table td {
  border-color: var(--dm-border-light);
}

html.dark .table tr:hover {
  background-color: var(--dm-bg-hover);
}

/* 消息/通知框 */
html.dark .message {
  background-color: var(--dm-bg-alt);
}

html.dark .message-header {
  background-color: var(--dm-primary);
  color: var(--dm-bg);
}

html.dark .message-body {
  color: var(--dm-fg);
  border-color: var(--dm-border-light);
}

/* 删除按钮 */
html.dark .delete {
  background-color: var(--dm-bg-highlight);
}

html.dark .delete:hover {
  background-color: var(--dm-error);
}

/* 面包屑导航 */
html.dark .breadcrumb a {
  color: var(--dm-primary);
}

html.dark .breadcrumb a:hover {
  color: var(--dm-accent);
}

html.dark .breadcrumb li.is-active a {
  color: var(--dm-fg);
}

/* Profile widget (头像卡片) */
html.dark .widget[data-type="profile"] .heading {
  color: #dcdcdc !important;
}

html.dark .widget .card-content .has-text-grey {
  color: var(--dm-fg-muted) !important;
}

html.dark .widget .card-content .is-size-7 {
  color: var(--dm-fg-muted) !important;
}

html.dark .widget .card-content .level a {
  color: var(--dm-fg);
}

html.dark .widget .card-content .level a:hover {
  color: var(--dm-primary);
}

/* 图片悬停效果保持 */
html.dark .card .card-image img {
  /* 仅覆盖颜色，不改变其他样式 */
}

/* 切换按钮固定宽度 */
#theme-toggle {
  width: 2.5rem;
  text-align: center;
}

</style>
`, 'default');

// 自定义 CSS 注入
hexo.extend.injector.register('head_end', `
<style>
/* 脚注引用样式 - 正文中的上标链接 */
.footnote-ref > a {
  text-decoration: none;
}
.footnote-ref > a:hover {
  text-decoration: underline;
}

/* 脚注列表样式 - 底部列表 */
section.footnotes {
  margin-top: 2em;
}
ol.footnotes-list {
  list-style: none !important;
  counter-reset: fn-counter;
  padding-left: 0 !important;
  margin-left: 0 !important;
}
ol.footnotes-list > li {
  list-style: none !important;
  counter-increment: fn-counter;
  margin-bottom: 0.4em;
  padding-left: 0;
  cursor: pointer;
}
ol.footnotes-list > li:hover {
  background-color: #f5f5f5;
}
ol.footnotes-list > li > p {
  display: inline;
  margin: 0;
}
ol.footnotes-list > li::before {
  content: '[' counter(fn-counter) '] ';
  margin-right: 0.5em;
}

/* 返回链接样式 */
.footnote-backref {
  text-decoration: none;
  margin-left: 0.5em;
}
</style>
`, 'default');

// 脚注悬浮提示脚本
hexo.extend.injector.register('body_end', `
<script>
document.addEventListener('DOMContentLoaded', () => {
  // 为所有脚注引用添加 title 属性
  const footnotes = document.querySelectorAll('.footnote-ref a');
  footnotes.forEach((ref) => {
    const href = ref.getAttribute('href');
    if (href?.startsWith('#fn')) {
      const footnoteEl = document.querySelector(href);
      if (footnoteEl) {
        // 获取脚注内容（排除返回链接）
        const content = footnoteEl.textContent.replace(/↩$/, '').trim();
        ref.setAttribute('title', content);
      }
    }
  });

  // 为脚注列表项添加点击跳转功能
  const footnoteItems = document.querySelectorAll('.footnotes-list > li');
  footnoteItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // 如果点击的是返回链接本身，让它自然跳转
      if (e.target.classList.contains('footnote-backref')) return;

      // 直接触发返回链接的点击
      item.querySelector('.footnote-backref')?.click();
    });
  });
});
</script>
`, 'default');

// 移除所有 javascript:; 链接的 href 属性，避免状态栏显示
hexo.extend.injector.register('body_end', `
<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href="javascript:;"]').forEach(link => {
    link.removeAttribute('href');
  });
});
</script>
`, 'default');

// 夜间模式切换功能
hexo.extend.injector.register('body_end', `
<script>
(function() {
  const STORAGE_KEY = 'theme-preference';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_SYSTEM = 'system';

  // 获取系统是否为暗色
  function isSystemDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // 获取存储的偏好
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY) || THEME_SYSTEM;
  }

  // 判断当前是否为暗色模式
  function isDarkMode(preference) {
    if (preference === THEME_SYSTEM) {
      return isSystemDark();
    }
    return preference === THEME_DARK;
  }

  // giscus 主题管理 - 全面重写
  var giscusThemeManager = {
    currentTheme: null,
    observer: null,
    iframeObserver: null,

    // 获取当前应该使用的主题
    getTheme: function() {
      var preference = getStoredTheme();
      return isDarkMode(preference) ? 'dark' : 'light';
    },

    // 发送主题切换消息到 iframe
    sendMessage: function(iframe, theme) {
      if (!iframe || !iframe.contentWindow) return false;
      try {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: theme } } },
          'https://giscus.app'
        );
        return true;
      } catch (e) {
        return false;
      }
    },

    // 查找 giscus iframe
    findIframe: function() {
      return document.querySelector('iframe.giscus-frame')
          || document.querySelector('iframe[src*="giscus.app"]')
          || document.querySelector('#comments iframe')
          || document.querySelector('.giscus iframe');
    },

    // 切换主题（带重试）
    updateTheme: function(theme, retryCount) {
      if (!theme) theme = this.getTheme();
      if (retryCount === undefined) retryCount = 0;
      this.currentTheme = theme;

      var iframe = this.findIframe();
      if (iframe) {
        if (this.sendMessage(iframe, theme)) {
          return;
        }
      }

      // 重试
      if (retryCount < 15) {
        var delay = Math.min(50 + retryCount * 100, 1500);
        var self = this;
        setTimeout(function() {
          self.updateTheme(theme, retryCount + 1);
        }, delay);
      }
    },

    // 修改 giscus script 标签的 data-theme
    patchScriptTheme: function(theme) {
      var scripts = document.querySelectorAll('script[src*="giscus.app"]');
      scripts.forEach(function(script) {
        if (script.getAttribute('data-theme') !== theme) {
          script.setAttribute('data-theme', theme);
        }
      });
    },

    // 监听 iframe 的 load 事件
    setupIframeListener: function(iframe) {
      var self = this;
      var onLoad = function() {
        setTimeout(function() {
          if (self.currentTheme) {
            self.sendMessage(iframe, self.currentTheme);
          } else {
            self.updateTheme();
          }
        }, 100);
      };
      iframe.addEventListener('load', onLoad);
    },

    // 初始化监听
    init: function() {
      var self = this;
      var theme = this.getTheme();
      this.currentTheme = theme;

      // 1. 修改已有的 script 标签
      this.patchScriptTheme(theme);

      // 2. 监听 script 标签插入（在 giscus 加载前修改 data-theme）
      this.observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
              // 检查是否是 giscus script
              if (node.tagName === 'SCRIPT' && node.src && node.src.indexOf('giscus.app') > -1) {
                node.setAttribute('data-theme', self.currentTheme || theme);
              }
              // 检查子元素中的 script
              var scripts = node.querySelectorAll && node.querySelectorAll('script[src*="giscus.app"]');
              if (scripts) {
                scripts.forEach(function(s) {
                  s.setAttribute('data-theme', self.currentTheme || theme);
                });
              }
              // 检查是否是 iframe
              if (node.tagName === 'IFRAME' && (
                node.classList.contains('giscus-frame') ||
                (node.src && node.src.indexOf('giscus.app') > -1)
              )) {
                self.setupIframeListener(node);
                // 立即尝试切换
                setTimeout(function() {
                  self.updateTheme();
                }, 200);
              }
              // 检查子元素中的 iframe
              var iframes = node.querySelectorAll && (
                node.querySelectorAll('iframe.giscus-frame') ||
                node.querySelectorAll('iframe[src*="giscus"]')
              );
              if (iframes && iframes.length) {
                iframes.forEach(function(iframe) {
                  self.setupIframeListener(iframe);
                });
                setTimeout(function() {
                  self.updateTheme();
                }, 200);
              }
            }
          });
        });
      });

      this.observer.observe(document.body, { childList: true, subtree: true });

      // 3. 监听已有的 iframe
      var existingIframe = this.findIframe();
      if (existingIframe) {
        this.setupIframeListener(existingIframe);
        this.updateTheme();
      }

      // 4. PJAX 事件监听
      document.addEventListener('pjax:complete', function() {
        setTimeout(function() {
          self.patchScriptTheme(self.currentTheme || theme);
          self.updateTheme();
        }, 300);
      });

      document.addEventListener('pjax:success', function() {
        setTimeout(function() {
          self.updateTheme();
        }, 800);
      });

      // 5. 初始延迟更新
      setTimeout(function() {
        self.updateTheme();
      }, 1000);
    },

    // 更新主题（外部调用）
    setTheme: function(isDark) {
      var theme = isDark ? 'dark' : 'light';
      this.currentTheme = theme;
      this.patchScriptTheme(theme);
      this.updateTheme(theme);
    }
  };

  // 切换 giscus 评论主题
  function updateGiscusTheme(isDark) {
    giscusThemeManager.setTheme(isDark);
  }

  // 监听 giscus iframe 加载
  function watchGiscusIframe() {
    giscusThemeManager.init();
  }

  // 应用主题
  function applyTheme(preference) {
    const html = document.documentElement;
    html.classList.remove(THEME_LIGHT);

    const dark = isDarkMode(preference);

    if (dark) {
      html.classList.add(THEME_DARK);
    } else {
      html.classList.remove(THEME_DARK);
    }

    // 更新 giscus 评论主题
    updateGiscusTheme(dark);
  }

  // 更新按钮图标
  function updateIcon(preference) {
    const icon = document.getElementById('theme-toggle-icon');
    if (!icon) return;

    if (preference === THEME_SYSTEM) {
      icon.className = 'fas fa-desktop';
    } else if (preference === THEME_DARK) {
      icon.className = 'fas fa-moon';
    } else {
      icon.className = 'fas fa-sun';
    }
  }

  // 切换主题
  function cycleTheme() {
    const current = getStoredTheme();
    const next = current === THEME_SYSTEM ? THEME_DARK
               : current === THEME_DARK ? THEME_LIGHT
               : THEME_SYSTEM;

    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    updateIcon(next);
    updateColorSchemeVisibility();
  }

  // 创建切换按钮
  function createToggleButton() {
    const navbarEnd = document.querySelector('.navbar-end');
    if (!navbarEnd) return;

    // 主题切换按钮 - 独立的 navbar-item
    const button = document.createElement('a');
    button.className = 'navbar-item';
    button.id = 'theme-toggle';
    button.title = '切换主题 (系统/暗色/亮色)';
    button.innerHTML = '<i id="theme-toggle-icon" class="fas fa-desktop"></i>';
    button.addEventListener('click', function(e) {
      e.preventDefault();
      cycleTheme();
    });

    // 配色方案选择器 - 独立的 navbar-item，使用 visibility 保持空间
    const selector = document.createElement('a');
    selector.className = 'navbar-item';
    selector.id = 'color-scheme-toggle';
    selector.title = '配色: One Dark';
    selector.style.cssText = 'visibility: hidden; user-select: none; -webkit-user-select: none;';
    selector.innerHTML = '🎨';
    selector.addEventListener('click', function(e) {
      e.preventDefault();
      cycleColorScheme();
    });

    navbarEnd.appendChild(button);
    navbarEnd.appendChild(selector);
  }

  // 配色方案数据
  var COLOR_SCHEMES = {
    'one-dark': { name: 'One Dark', icon: '🎨' },
    'dracula': { name: 'Dracula', icon: '🧛' },
    'nord': { name: 'Nord', icon: '❄️' },
    'github-dark': { name: 'GitHub', icon: '🐙' }
  };
  var COLOR_SCHEME_KEY = 'color-scheme-preference';

  function getStoredColorScheme() {
    try {
      return localStorage.getItem(COLOR_SCHEME_KEY) || 'one-dark';
    } catch (e) {
      return 'one-dark';
    }
  }

  function applyColorScheme(scheme) {
    const html = document.documentElement;
    // 移除所有配色方案属性
    html.removeAttribute('data-color-scheme');
    if (scheme !== 'one-dark') {
      html.setAttribute('data-color-scheme', scheme);
    }
  }

  function cycleColorScheme() {
    const schemes = Object.keys(COLOR_SCHEMES);
    const current = getStoredColorScheme();
    const currentIndex = schemes.indexOf(current);
    const nextIndex = (currentIndex + 1) % schemes.length;
    const next = schemes[nextIndex];

    localStorage.setItem(COLOR_SCHEME_KEY, next);
    applyColorScheme(next);
    updateColorSchemeIcon();
  }

  function updateColorSchemeIcon() {
    const scheme = getStoredColorScheme();
    const info = COLOR_SCHEMES[scheme];

    const button = document.getElementById('color-scheme-toggle');
    if (button) {
      button.title = '配色: ' + info.name;
      button.innerHTML = info.icon;
    }
  }

  function updateColorSchemeVisibility() {
    const selector = document.getElementById('color-scheme-toggle');
    if (!selector) return;

    const preference = getStoredTheme();
    const isDark = isDarkMode(preference);

    selector.style.visibility = isDark ? 'visible' : 'hidden';
  }

  // 监听系统主题变化
  function watchSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      if (getStoredTheme() === THEME_SYSTEM) {
        // 系统主题变化时，更新 dark 类
        applyTheme(THEME_SYSTEM);
        updateColorSchemeVisibility();
      }
    });
  }

  // 初始化
  function init() {
    // 移除已弃用的 apple-mobile-web-app-capable meta 标签
    document.querySelectorAll('meta[name="apple-mobile-web-app-capable"]').forEach(function(el) {
      el.remove();
    });

    const preference = getStoredTheme();
    applyTheme(preference);
    createToggleButton();
    updateIcon(preference);

    // 初始化配色方案
    const colorScheme = getStoredColorScheme();
    applyColorScheme(colorScheme);
    updateColorSchemeIcon();
    updateColorSchemeVisibility();

    watchSystemTheme();
    watchGiscusIframe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
`, 'default');

// Bash 代码块复制时忽略 $ 前缀
hexo.extend.injector.register('body_end', `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 处理 bash 代码块的 $ 前缀，将其包裹在不可选中的 span 中
  function processShellPrompts() {
    document.querySelectorAll('figure.highlight.bash, figure.highlight.shell, figure.highlight.sh').forEach(function(figure) {
      // 获取所有代码行
      var lines = figure.querySelectorAll('.line');
      
      lines.forEach(function(line) {
        var text = line.textContent;
        // 检测是否以 $ 或 # 开头
        var match = text.match(/^[#\$] /);
        if (match) {
          // 创建提示符 span
          var prompt = document.createElement('span');
          prompt.className = 'shell-prompt';
          prompt.textContent = match[0];
          
          // 移除原有文本开头的提示符
          // 由于可能有多个子节点，需要找到第一个文本节点
          var firstNode = line.firstChild;
          if (firstNode && firstNode.nodeType === 3) {
            // 文本节点，替换开头
            firstNode.textContent = firstNode.textContent.substring(2);
            line.insertBefore(prompt, firstNode);
          } else if (firstNode) {
            // 元素节点，在其前面插入
            line.insertBefore(prompt, firstNode);
          }
        }
      });
    });
  }

  // 执行处理
  processShellPrompts();

  // 监听 copy 事件，在复制后处理 bash 代码块的 $ 前缀（备用方案）
  document.addEventListener('copy', function(e) {
    var selection = window.getSelection();
    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);
    var container = range.commonAncestorContainer;

    // 找到最近的代码块
    var figure = container.nodeType === 1 ? container.closest('figure.highlight') : container.parentElement.closest('figure.highlight');
    if (!figure) return;

    // 检测是否为 bash/shell 语言
    var isBash = figure.classList.contains('bash') ||
                 figure.classList.contains('shell') ||
                 figure.classList.contains('sh');

    if (!isBash) return;

    // 获取选中的文本
    var text = selection.toString();

    // 移除每行开头的 $ 或 # 前缀
    text = text.split('\\n').map(function(line) {
      return line.replace(/^[#\$] /, '');
    }).join('\\n');

    // 覆盖剪贴板内容
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
  });
});
</script>
`, 'default');

// 代码块换行按钮
hexo.extend.injector.register('body_end', `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 清除选中状态的函数
  function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }

  // 监听 ClipboardJS 成功事件
  if (typeof ClipboardJS !== 'undefined') {
    document.addEventListener('copy-success', clearSelection);
  }

  // 为每个代码块添加换行按钮
  document.querySelectorAll('figure.highlight').forEach(function(figure) {
    var levelRight = figure.querySelector('figcaption .level-right');
    if (!levelRight) {
      // 如果没有 figcaption，创建一个
      var figcaption = document.createElement('figcaption');
      figcaption.className = 'level is-mobile';
      figcaption.innerHTML = '<div class="level-left"></div><div class="level-right"></div>';
      figure.insertBefore(figcaption, figure.firstChild);
      levelRight = figcaption.querySelector('.level-right');
    }

    // 创建换行按钮
    var wrapBtn = document.createElement('a');
    wrapBtn.className = 'wrap';
    wrapBtn.title = '切换换行';
    wrapBtn.innerHTML = '<i class="fas fa-text-width"></i>';
    wrapBtn.addEventListener('click', function(e) {
      e.preventDefault();
      clearSelection();
      figure.classList.toggle('is-wrapped');
      // 切换图标
      var icon = wrapBtn.querySelector('i');
      if (figure.classList.contains('is-wrapped')) {
        icon.className = 'fas fa-text-height';
      } else {
        icon.className = 'fas fa-text-width';
      }
    });

    levelRight.appendChild(wrapBtn);

    // 滚动条悬浮控制
    var highlightBody = figure.querySelector('.highlight-body');
    if (highlightBody) {
      var isDragging = false;

      highlightBody.addEventListener('mouseenter', function() {
        highlightBody.classList.add('is-scrollbar-hover');
      });

      highlightBody.addEventListener('mouseleave', function() {
        if (!isDragging) {
          highlightBody.classList.remove('is-scrollbar-hover');
        }
      });

      // 检测是否点击在滚动条区域
      highlightBody.addEventListener('mousedown', function(e) {
        var rect = highlightBody.getBoundingClientRect();
        // 右侧 8px 是滚动条区域
        if (e.clientX > rect.right - 8) {
          isDragging = true;
        }
      });

      // 鼠标松开时清除拖动状态
      document.addEventListener('mouseup', function mouseupHandler() {
        if (isDragging) {
          isDragging = false;
          // 检查鼠标是否还在元素内，不在则移除悬浮类
          var rect = highlightBody.getBoundingClientRect();
          // 简单延迟检查，让 mouseleave 有机会触发
          setTimeout(function() {
            // 如果没有重新进入，确保移除悬浮类
          }, 10);
        }
      });
    }
  });
});
</script>
`, 'default');