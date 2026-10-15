/* Safe DOM primitives; data services and page layouts arrive in phase 2. */
(function () {
  'use strict';
  function element(tag, className, text) {
    const node = document.createElement(tag); node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  window.MDCEOComponents = Object.freeze({
    kpi(label, value, detail) {
      const card = element('section', 'mdceo-kpi');
      card.append(element('span', 'mdceo-kpi-label', label), element('strong', 'mdceo-kpi-value', value));
      if (detail) card.append(element('small', 'mdceo-kpi-detail', detail));
      return card;
    },
    badge(label, severity = 'neutral') { return element('span', 'mdceo-badge mdceo-badge-' + (['critical', 'high', 'medium', 'low'].includes(severity) ? severity : 'neutral'), label); },
    empty(title, message) {
      const state = element('section', 'mdceo-empty'); state.setAttribute('role', 'status');
      state.append(element('strong', '', title), element('p', '', message)); return state;
    },
    skeleton(label) { const node = element('div', 'mdceo-skeleton'); node.setAttribute('role', 'status'); node.setAttribute('aria-label', label); return node; },
    table(headers) {
      const wrapper = element('div', 'mdceo-table-wrap'); wrapper.tabIndex = 0;
      const table = element('table', 'mdceo-table'), head = document.createElement('thead'), row = document.createElement('tr');
      headers.forEach(label => { const th = element('th', '', label); th.scope = 'col'; row.append(th); });
      head.append(row); table.append(head, document.createElement('tbody')); wrapper.append(table); return wrapper;
    },
    tabs(items, onSelect) {
      const bar = element('div', 'mdceo-tabs'); bar.setAttribute('role', 'tablist');
      items.forEach((item, index) => {
        const button = element('button', 'mdceo-tab', item.label); button.type = 'button'; button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', String(index === 0)); button.tabIndex = index === 0 ? 0 : -1;
        if (item.panelId) button.setAttribute('aria-controls', item.panelId);
        button.addEventListener('click', () => { Array.from(bar.children).forEach(b => { b.setAttribute('aria-selected', String(b === button)); b.tabIndex = b === button ? 0 : -1; }); onSelect(item); });
        button.addEventListener('keydown', e => { const buttons = Array.from(bar.children), i = buttons.indexOf(button); let target;
          if (e.key === 'ArrowRight') target = (i + 1) % buttons.length;
          if (e.key === 'ArrowLeft') target = (i + buttons.length - 1) % buttons.length;
          if (e.key === 'Home') target = 0; if (e.key === 'End') target = buttons.length - 1;
          if (target !== undefined) { e.preventDefault(); buttons[target].focus(); buttons[target].click(); }
        }); bar.append(button);
      }); return bar;
    },
    filterBar(controls) { const bar = element('div', 'mdceo-filter-bar'); controls.forEach(control => bar.append(control)); return bar; },
    pager(page, totalPages, labels, onChange) {
      const bar = element('nav', 'mdceo-pager'); bar.setAttribute('aria-label', labels.navigation);
      [[labels.previous, page - 1], [labels.next, page + 1]].forEach(([label, target]) => {
        const button = element('button', 'mdceo-page-button', label); button.type = 'button'; button.disabled = target < 1 || target > totalPages;
        button.addEventListener('click', () => onChange(target)); bar.append(button);
      }); return bar;
    },
    themeCharts() {
      if (!window.Chart) return;
      const css = getComputedStyle(document.documentElement);
      Chart.defaults.color = css.getPropertyValue('--text-muted').trim();
      Chart.defaults.font.family = getComputedStyle(document.documentElement).getPropertyValue('--font-ui').trim();
      Chart.defaults.borderColor = css.getPropertyValue('--border').trim();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) Chart.defaults.animation = false;
    }
  });
})();
