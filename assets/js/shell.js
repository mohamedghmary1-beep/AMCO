/* Shared shell. Page-specific controls, IDs, auth and data handlers stay intact. */
(function () {
  'use strict';
  const labels = {
    en: { dashboard: 'Dashboard', performance: 'Project Performance', reports: 'Reports', documents: 'Documents', administration: 'Administration', navigation: 'Project navigation', menu: 'Toggle navigation', search: 'Search navigation', account: 'Account', more: 'Document tools', project: 'Project workspace' },
    ar: { dashboard: 'لوحة التحكم', performance: 'أداء المشروع', reports: 'التقارير', documents: 'المستندات', administration: 'الإدارة', navigation: 'تنقل المشروع', menu: 'إظهار أو إخفاء القائمة', search: 'البحث في القائمة', account: 'الحساب', more: 'أدوات المستندات', project: 'مساحة المشروع' }
  };
  function init() {
    if (/\b(engineer-review|final-approval)\.html$/.test(location.pathname)) return;
    if (location.pathname.endsWith('/performance.html') && new URLSearchParams(location.search).get('print') === '1') return;
    document.body.classList.add('mdceo-shell');
    const config = window.MDCEO_SHELL_CONFIG || {};
    if (config.labels) Object.keys(labels).forEach(lang => Object.assign(labels[lang], config.labels[lang] || {}));
    let nav = document.querySelector('.nav-container');
    if (!nav) { nav = document.createElement('nav'); document.body.prepend(nav); }
    nav.classList.add('nav-container', 'mdceo-sidebar');
    nav.setAttribute('role', 'navigation');
    nav.querySelectorAll('[data-functional-icon]').forEach(icon => icon.removeAttribute('data-functional-icon'));
    nav.id = 'mdceoNavigation';
    const legacy = document.createElement('div');
    legacy.className = 'mdceo-legacy-nav';
    while (nav.firstChild) legacy.appendChild(nav.firstChild);
    const knownPages = new Set(['index.html','performance_advanced.html',...(window.PortalSite?.routes||[]).map(route=>route.file)]);
    legacy.querySelectorAll('a[href]').forEach(a => {
      const file=new URL(a.href,location.href).pathname.split('/').pop();
      if(file.endsWith('.html')&&!knownPages.has(file))a.remove();
    });
    const brand = document.createElement('a');
    brand.href = 'performance.html'; brand.className = 'mdceo-sidebar-brand'; brand.textContent = 'MDCEO';
    nav.appendChild(brand);
    const primary = document.createElement('div'); primary.className = 'mdceo-primary-nav';
    const registered = window.PortalSite?.routes || [];
    registered.forEach(r => { labels.ar[r.key] = r.ar; labels.en[r.key] = r.en; });
    const routes = registered.length ? registered.map(r => [r.file,r.key]) : [['performance.html', 'performance'], ['weekly_report.html', 'reports']];
    // Detail anchors are real sections of Performance, reachable from every module.
    (config.routes || []).filter(([href]) => href.startsWith('#')).forEach(r => routes.splice(1,0,r));
    routes.forEach(([href, key]) => {
      const link = document.createElement('a'); link.href = href; link.className = 'nav-btn'; link.dataset.shellLabel = key;
      if (registered.find(r => r.key === key)?.admin || key === 'administration') { link.dataset.shellAdmin = ''; link.hidden = true; }
      link.dataset.routeKey = key;
      if (location.pathname.endsWith('/' + href)) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
      const iconName=config.icons?.[key]||registered.find(r=>r.key===key)?.icon;
      if (iconName) link.dataset.navIcon=iconName;
      primary.appendChild(link);
    });
    nav.appendChild(primary);
    const tools = document.createElement('details'); tools.className = 'mdceo-document-tools';
    const summary = document.createElement('summary'); summary.dataset.shellLabel = 'more'; tools.appendChild(summary);
    // Preserve original elements and handlers: badges and role guards still find their IDs.
    tools.appendChild(legacy); nav.appendChild(tools);
    const top = document.createElement('div'); top.className = 'mdceo-topbar'; top.setAttribute('role', 'banner');
    const search = document.createElement('input'); search.type = 'search'; search.className = 'mdceo-nav-search';
    if (config.searchRecords) top.appendChild(search);
    else top.classList.add('mdceo-topbar-compact');
    const lang = document.createElement('button'); lang.type = 'button'; lang.className = 'mdceo-language'; lang.addEventListener('click', () => { if (window.toggleLanguage) window.toggleLanguage(); translate(); }); top.appendChild(lang);
    const account = document.createElement('span'); account.dataset.shellLabel = 'account'; account.className = 'mdceo-account'; top.appendChild(account);
    document.body.prepend(top);
    const backdrop = document.createElement('button'); backdrop.type='button'; backdrop.className='sidebar-backdrop'; backdrop.tabIndex=-1;
    backdrop.addEventListener('click',()=>{document.body.classList.add('nav-collapsed');window.syncNavToggle?.();});document.body.append(backdrop);
    // Preserve elements and their handlers while giving existing content a main landmark.
    if (!document.querySelector('main, [role="main"]')) {
      const main = document.createElement('main'); main.className = 'mdceo-main';
      Array.from(document.body.children).forEach(node => {
        if (node !== top && node !== nav && node !== backdrop && node.id !== 'navToggleBtn' && !['SCRIPT', 'STYLE'].includes(node.tagName) && node.getAttribute('role') !== 'dialog') main.appendChild(node);
      });
      document.body.appendChild(main);
    }
    if (!document.querySelector('h1, [role="heading"][aria-level="1"]')) {
      const title = document.querySelector('[data-i18n="pageTitle"]');
      if (title) { title.setAttribute('role', 'heading'); title.setAttribute('aria-level', '1'); }
    }
    function translate() {
      const ar = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
      const dict = labels[ar ? 'ar' : 'en'];
      document.querySelectorAll('[data-shell-label]').forEach(el => {
        el.textContent = dict[el.dataset.shellLabel];
        if (el.dataset.navIcon) { const icon = document.createElement('i'); icon.className = 'fa-solid ' + el.dataset.navIcon; icon.setAttribute('aria-hidden','true'); el.prepend(icon); }
      });
      nav.setAttribute('aria-label', dict.navigation); search.placeholder = dict.search; search.setAttribute('aria-label', dict.search);
      lang.textContent = ar ? 'EN' : 'العربية'; lang.setAttribute('aria-label', ar ? 'Switch to English' : 'التبديل إلى العربية');
      const btn = document.getElementById('navToggleBtn'); if (btn) btn.setAttribute('aria-label', dict.menu);
    }
    function role() {
      const allowed = ['admin', 'super_admin', 'administrator'].includes(window.currentUserRole);
      brand.href=window.getFirstAccessiblePage?.(window.__currentProfile,window.currentUserRole)||'../index.html';
      primary.querySelectorAll('a').forEach(link => {
        const route=registered.find(r=>r.key===link.dataset.routeKey);
        const enabled=window.PortalSite?.settings.navigation[route?.key]?.enabled!==false;
        link.hidden=route ? (route.admin ? !allowed : !enabled || (window.currentUserRole!=='super_admin' && String(window.__currentProfile?.[route.permission]).toLowerCase()!=='yes')) : false;
      });
      const menu = document.getElementById('mdceoAccountMenu');
      if (menu) { account.hidden = true; (config.accountContainer && document.querySelector(config.accountContainer) || top).appendChild(menu); }
      // Keep the user block honest: never substitute a sample person or project.
    }
    if (!config.searchRecords) search.addEventListener('input', () => {
      role();
      const query = search.value.toLocaleLowerCase().trim();
      primary.querySelectorAll('a').forEach(a => { a.hidden = a.hidden || !a.textContent.toLocaleLowerCase().includes(query); });
      tools.open = !!query;
    });
    if (window.initNavToggle) window.initNavToggle();
    document.addEventListener('authguard:ready', role); role(); translate();
    function siteSettings() {
      const settings=window.PortalSite?.settings;
      if(!settings)return;
      const language=document.documentElement.lang==='en'?'en':'ar';
      registered.forEach(r=>{const custom=settings.navigation[r.key];const link=primary.querySelector('[data-route-key="'+r.key+'"]');if(!link)return;labels.ar[r.key]=custom?.ar||r.ar;labels.en[r.key]=custom?.en||r.en;link.style.order=String(custom?.order??registered.indexOf(r));});
      brand.textContent=settings.name;role();translate();
    }
    document.addEventListener('site:settings',siteSettings);document.addEventListener('portal:language-changed',siteSettings);siteSettings();
    new MutationObserver(siteSettings).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    nav.addEventListener('keydown',e=>{
      if(e.key!=='Tab'||!matchMedia('(max-width:820px)').matches||document.body.classList.contains('nav-collapsed'))return;
      const nodes=Array.from(nav.querySelectorAll('a[href],button,summary,input')).filter(n=>!n.hidden&&n.getClientRects().length&&!n.disabled);
      const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    });
    new MutationObserver(() => { const menu = document.getElementById('mdceoAccountMenu'); const target = config.accountContainer && document.querySelector(config.accountContainer) || top; if (menu && menu.parentElement !== target) role(); }).observe(document.body, {childList: true, subtree: true});
    new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && matchMedia('(max-width: 820px)').matches && !document.body.classList.contains('nav-collapsed')) { document.body.classList.add('nav-collapsed'); window.syncNavToggle?.(); document.getElementById('navToggleBtn')?.focus(); } });
    document.dispatchEvent(new CustomEvent('mdceo:shell-ready', { detail: { nav, top, primary, search, account, translate } }));
    window.mdceoShell = { nav, top, primary, search, account, translate };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
