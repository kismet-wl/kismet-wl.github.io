// 夜间模式样式 - 只在 html.dark 时生效
hexo.extend.injector.register('head_end', `
<style>
/* 暗色模式配色覆盖 (One Dark Pro) */
html.dark body {
  background-color: #282c34;
  color: #abb2bf;
}

html.dark .card {
  background-color: #21252b;
}

html.dark .navbar-main {
  background-color: #21252b;
}

html.dark .navbar-item {
  color: #abb2bf;
}

html.dark .navbar-item:hover {
  color: #61afef;
  background-color: #2c313a;
}

html.dark .title,
html.dark .subtitle {
  color: #e5c07b;
}

html.dark .content {
  color: #abb2bf;
}

html.dark .content h1,
html.dark .content h2,
html.dark .content h3,
html.dark .content h4,
html.dark .content h5,
html.dark .content h6 {
  color: #e5c07b;
}

html.dark a {
  color: #61afef;
}

html.dark a:hover {
  color: #98c379;
}

html.dark .footer {
  background-color: #282c34;
  color: #5c6370;
}

html.dark .menu-list a {
  color: #abb2bf;
}

html.dark .menu-list a:hover {
  background-color: #2c313a;
  color: #61afef;
}

html.dark .menu-list a.is-active {
  background-color: #61afef;
  color: #282c34;
}

html.dark input,
html.dark textarea {
  background-color: #21252b;
  border-color: #181a1f;
  color: #abb2bf;
}

html.dark input::placeholder,
html.dark textarea::placeholder {
  color: #5c6370;
}

html.dark blockquote {
  background-color: #21252b;
  border-left-color: #61afef;
  color: #5c6370;
}

html.dark code {
  background-color: #21252b;
  color: #abb2bf;
}

html.dark pre {
  background-color: #282c34;
}

html.dark figure.highlight {
  background-color: #282c34;
}

html.dark .highlight {
  background-color: #282c34;
  color: #abb2bf;
}

/* 代码块行号区域 */
html.dark .gutter {
  background-color: #21252b;
}

html.dark .gutter pre {
  background-color: #21252b;
}

html.dark .highlight .code,
html.dark .highlight pre {
  color: #abb2bf;
}

html.dark .highlight .line {
  color: #abb2bf;
}

html.dark .tag:not(body) {
  background-color: #2c313a;
  color: #abb2bf;
}

html.dark .button {
  background-color: #2c313a;
  border-color: #181a1f;
  color: #abb2bf;
}

html.dark .button:hover {
  border-color: #61afef;
  color: #61afef;
}

html.dark .button.is-light {
  background-color: #2c313a;
  border-color: transparent;
  color: #abb2bf;
}

html.dark .button.is-light:hover {
  background-color: #3e4451;
  color: #61afef;
}

html.dark .button.is-transparent {
  background-color: transparent;
  border-color: transparent;
  color: #abb2bf;
}

html.dark .button.is-transparent:hover {
  color: #61afef;
}

html.dark .pagination-link,
html.dark .pagination-previous,
html.dark .pagination-next {
  background-color: #21252b;
  border-color: #181a1f;
  color: #abb2bf;
}

html.dark .pagination-link:hover,
html.dark .pagination-previous:hover,
html.dark .pagination-next:hover {
  background-color: #2c313a;
  border-color: #61afef;
  color: #61afef;
}

html.dark .pagination-link.is-current {
  background-color: #61afef;
  border-color: #61afef;
  color: #282c34;
}

/* 搜索框完整样式 */
html.dark .searchbox {
  background-color: rgba(40, 44, 52, 0.95);
}

html.dark .searchbox-container {
  background-color: #21252b;
  border-color: #3e4451;
}

html.dark .searchbox-input {
  background-color: #282c34;
  color: #abb2bf;
  border-color: #3e4451;
}

html.dark .searchbox-input::placeholder {
  color: #5c6370;
}

html.dark .searchbox-result-section header {
  color: #5c6370;
  border-color: #3e4451;
}

html.dark .searchbox-result-item {
  color: #abb2bf;
}

html.dark .searchbox-result-item:hover {
  background-color: #2c313a;
}

html.dark .searchbox-pagination-link {
  background-color: #21252b;
  border-color: #3e4451;
  color: #abb2bf;
}

html.dark .searchbox-pagination-link:hover {
  background-color: #2c313a;
  border-color: #61afef;
  color: #61afef;
}

html.dark .searchbox-close {
  color: #abb2bf;
}

html.dark .searchbox-close:hover {
  color: #e06c75;
}

html.dark .toc {
  background-color: #21252b;
}

html.dark #back-to-top {
  background-color: #61afef;
  color: #282c34;
}

html.dark ol.footnotes-list > li:hover {
  background-color: #2c313a;
}

/* 水平分隔线 */
html.dark hr {
  background-color: #3e4451;
}

/* 脚注区域 */
html.dark section.footnotes {
  border-top-color: #3e4451;
}

/* Box 组件（被文章许可卡片使用） */
html.dark .box {
  background-color: #21252b;
  color: #abb2bf;
}

/* 文章许可卡片 */
html.dark .article-licensing {
  background-color: #21252b;
}

html.dark .article-licensing .licensing-title {
  color: #abb2bf;
}

html.dark .article-licensing .licensing-title a {
  color: #61afef;
}

html.dark .article-licensing .licensing-title a:hover {
  color: #98c379;
}

html.dark .article-licensing h6 {
  color: #5c6370;
}

html.dark .article-licensing p {
  color: #abb2bf;
}

/* 文章导航（上下篇） - 正确的类名 */
html.dark .post-navigation {
  background-color: #21252b;
}

html.dark .post-navigation .link-muted {
  color: #abb2bf;
}

html.dark .post-navigation .link-muted:hover {
  color: #61afef !important;
}

html.dark .post-navigation .level-item {
  color: #abb2bf;
}

/* 评论区域 */
html.dark #comments .title {
  color: #e5c07b;
}

/* giscus 评论容器 */
html.dark .giscus {
  background-color: transparent;
}

/* 归档时间线 */
html.dark .timeline {
  border-left-color: #3e4451;
}

html.dark .timeline .media:before {
  background-color: #61afef;
}

html.dark .timeline .media:last-child:after {
  background-color: #282c34;
}

/* 归档页文章摘要 */
html.dark .media {
  color: #abb2bf;
}

html.dark .media .media-content .title {
  color: #e5c07b;
}

html.dark .media .media-content .subtitle {
  color: #5c6370;
}

html.dark .media .media-content a:hover .title {
  color: #61afef;
}

/* 代码块标题栏 */
html.dark figure.highlight figcaption,
html.dark .highlight figcaption {
  background-color: #21252b;
  color: #5c6370;
}

html.dark figure.highlight figcaption a,
html.dark .highlight figcaption a {
  color: #61afef;
}

/* 导航下拉菜单 */
html.dark .navbar-dropdown {
  background-color: #21252b;
  border-color: #3e4451;
}

html.dark .navbar-dropdown .navbar-item {
  color: #abb2bf;
}

html.dark .navbar-dropdown .navbar-item:hover {
  background-color: #2c313a;
  color: #61afef;
}

html.dark .navbar-divider {
  background-color: #3e4451;
}

/* 下拉选择框 */
html.dark select {
  background-color: #21252b;
  border-color: #181a1f;
  color: #abb2bf;
}

html.dark .select:not(.is-multiple):not(.is-loading)::after {
  border-color: #abb2bf;
}

/* Cookie 同意弹窗 */
html.dark .cc-window {
  background-color: #21252b;
  color: #abb2bf;
}

html.dark .cc-btn {
  background-color: #61afef;
  color: #282c34;
}

html.dark .cc-link {
  color: #61afef;
}

/* 页面加载进度条 */
html.dark .pace .pace-progress {
  background-color: #61afef;
}

html.dark .pace .pace-activity {
  border-color: #61afef transparent transparent transparent;
}

/* 菜单标签 */
html.dark .menu-label {
  color: #5c6370;
}

/* 表格 */
html.dark .table {
  background-color: #21252b;
  color: #abb2bf;
}

html.dark .table th {
  color: #e5c07b;
  border-color: #3e4451;
}

html.dark .table td {
  border-color: #3e4451;
}

html.dark .table tr:hover {
  background-color: #2c313a;
}

/* 消息/通知框 */
html.dark .message {
  background-color: #21252b;
}

html.dark .message-header {
  background-color: #61afef;
  color: #282c34;
}

html.dark .message-body {
  color: #abb2bf;
  border-color: #3e4451;
}

/* 删除按钮 */
html.dark .delete {
  background-color: #3e4451;
}

html.dark .delete:hover {
  background-color: #e06c75;
}

/* 面包屑导航 */
html.dark .breadcrumb a {
  color: #61afef;
}

html.dark .breadcrumb a:hover {
  color: #98c379;
}

html.dark .breadcrumb li.is-active a {
  color: #abb2bf;
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

  // 切换 giscus 评论主题
  function updateGiscusTheme(isDark) {
    const theme = isDark ? 'dark' : 'light';

    function sendMessage() {
      // 尝试多种选择器
      const iframe = document.querySelector('iframe.giscus-frame')
                  || document.querySelector('iframe[src*="giscus.app"]')
                  || document.querySelector('#comments iframe');

      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: theme } } },
            'https://giscus.app'
          );
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    }

    // 立即尝试
    if (!sendMessage()) {
      // 延迟重试
      setTimeout(sendMessage, 500);
      setTimeout(sendMessage, 1000);
      setTimeout(sendMessage, 2000);
    }
  }

  // 监听 giscus iframe 加载
  function watchGiscusIframe() {
    // 初始延迟检查
    setTimeout(function() {
      const preference = getStoredTheme();
      updateGiscusTheme(isDarkMode(preference));
    }, 1500);

    // 监听 giscus 消息确认
    window.addEventListener('message', function(event) {
      if (event.origin === 'https://giscus.app' && event.data && event.data.giscus) {
        // giscus 已响应
      }
    });

    // 监听 DOM 变化
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            const iframe = node.tagName === 'IFRAME' ? node
                        : node.querySelector && (node.querySelector('iframe.giscus-frame') || node.querySelector('iframe[src*="giscus"]'));
            if (iframe) {
              iframe.addEventListener('load', function() {
                setTimeout(function() {
                  const preference = getStoredTheme();
                  updateGiscusTheme(isDarkMode(preference));
                }, 100);
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
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
  }

  // 创建切换按钮
  function createToggleButton() {
    const navbarEnd = document.querySelector('.navbar-end');
    if (!navbarEnd) return;

    const button = document.createElement('a');
    button.className = 'navbar-item';
    button.id = 'theme-toggle';
    button.title = '切换主题 (系统/暗色/亮色)';
    button.innerHTML = '<i id="theme-toggle-icon" class="fas fa-desktop"></i>';
    button.addEventListener('click', function(e) {
      e.preventDefault();
      cycleTheme();
    });

    navbarEnd.appendChild(button);
  }

  // 监听系统主题变化
  function watchSystemTheme() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      if (getStoredTheme() === THEME_SYSTEM) {
        // 系统主题变化时，更新 dark 类
        applyTheme(THEME_SYSTEM);
      }
    });
  }

  // 初始化
  function init() {
    const preference = getStoredTheme();
    applyTheme(preference);
    createToggleButton();
    updateIcon(preference);
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