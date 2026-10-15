/* =====================================================================
   MDCEO — Sidebar collapse/expand toggle (shared across all pages)
   Adds one floating icon button. Clicking it hides the sidebar nav;
   clicking it again (same icon, now sitting near the edge) brings it
   back. State is remembered per-browser via localStorage.
   ===================================================================== */
(function () {
    function init() {
        var nav = document.querySelector('.nav-container');
        if (!nav) return; // no nav on this page — nothing to toggle

        var btn = document.getElementById('navToggleBtn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'navToggleBtn';
            btn.type = 'button';
            btn.setAttribute('aria-label', document.documentElement.lang === 'ar' ? 'إظهار أو إخفاء القائمة' : 'Toggle navigation');
            btn.setAttribute('aria-controls', 'mdceoNavigation');
            btn.innerHTML = '<i class="fa-solid fa-bars" data-functional-icon="sidebar-collapse" aria-hidden="true"></i>';
            document.body.appendChild(btn);

            btn.addEventListener('click', function () {
                document.body.classList.toggle('nav-collapsed');
                window.syncNavToggle();
                if (!document.body.classList.contains('nav-collapsed') && matchMedia('(max-width:820px)').matches) nav.querySelector('a[href],button')?.focus();
                try {
                    localStorage.setItem(
                        'mdceoNavCollapsed',
                        document.body.classList.contains('nav-collapsed') ? '1' : '0'
                    );
                } catch (e) {}
            });
        }

        try {
            if (localStorage.getItem('mdceoNavCollapsed') === '1') {
                document.body.classList.add('nav-collapsed');
            }
        } catch (e) {}
        if (matchMedia('(max-width: 820px)').matches) document.body.classList.add('nav-collapsed');
        window.syncNavToggle = function () {
            btn.setAttribute('aria-expanded', String(!document.body.classList.contains('nav-collapsed')));
            nav.inert = document.body.classList.contains('nav-collapsed');
        };
        window.syncNavToggle();
    }

    window.initNavToggle = init;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
