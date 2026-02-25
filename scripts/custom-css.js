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