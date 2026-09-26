/* Furina 的博客 — 交互脚本：移动端菜单 / 栏目筛选 / 相册灯箱 */

/* —— 移动端菜单 —— */
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (toggle && navigation) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开导航');
    navigation.classList.remove('open');
  };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? '关闭导航' : '打开导航');
    navigation.classList.toggle('open', expanded);
  });
  navigation.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}

/* —— 产品下拉菜单：触屏设备点按展开，点击外部关闭 —— */
document.querySelectorAll('.nav-dropdown').forEach((dd) => {
  const btn = dd.querySelector('.nav-drop-toggle');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = dd.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    document.querySelectorAll('.nav-dropdown.open').forEach((other) => {
      if (other !== dd) {
        other.classList.remove('open');
        other.querySelector('.nav-drop-toggle')?.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
document.addEventListener('click', (e) => {
  document.querySelectorAll('.nav-dropdown.open').forEach((dd) => {
    if (!dd.contains(e.target)) {
      dd.classList.remove('open');
      dd.querySelector('.nav-drop-toggle')?.setAttribute('aria-expanded', 'false');
    }
  });
});

/* —— 文章页：按栏目筛选（支持 /blog/#栏目名 直达） —— */
const filterBar = document.querySelector('[data-filter-bar]');
if (filterBar) {
  const items = Array.from(document.querySelectorAll('[data-categories]'));
  const groups = Array.from(document.querySelectorAll('[data-year-group]'));
  const chips = Array.from(filterBar.querySelectorAll('[data-filter]'));
  const applyFilter = (cat) => {
    chips.forEach((c) => c.classList.toggle('active', c.dataset.filter === cat));
    items.forEach((it) => {
      const cats = it.dataset.categories.split('|');
      it.hidden = cat !== 'all' && !cats.includes(cat);
    });
    groups.forEach((g) => { g.hidden = !g.querySelector('[data-categories]:not([hidden])'); });
    history.replaceState(null, '', cat === 'all' ? location.pathname : '#' + encodeURIComponent(cat));
  };
  chips.forEach((c) => c.addEventListener('click', () => applyFilter(c.dataset.filter)));
  const hash = decodeURIComponent(location.hash.slice(1));
  if (hash && chips.some((c) => c.dataset.filter === hash)) applyFilter(hash);
}

/* —— 相册：点击查看大图，点击任意处或按 Esc 关闭 —— */
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-grid img').forEach((img) => {
    img.addEventListener('click', () => {
      lbImg.src = img.currentSrc || img.src;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
}
