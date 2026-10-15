/* Login controls preserve native validation and Supabase authentication. */
(function () {
  function init() {
    const ar = () => document.documentElement.lang === 'ar';
    document.querySelectorAll('input[type="password"]').forEach(input => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'password-toggle';
      button.setAttribute('aria-controls', input.id);
      function label() {
        const visible = input.type === 'text';
        button.textContent = ar() ? (visible ? 'إخفاء' : 'إظهار') : (visible ? 'Hide' : 'Show');
        button.setAttribute('aria-label', ar() ? (visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور') : (visible ? 'Hide password' : 'Show password'));
        button.setAttribute('aria-pressed', String(visible));
      }
      button.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
        input.toggleAttribute('data-password-visible', input.type === 'text');
        label();
      });
      input.parentElement.appendChild(button); label();
      new MutationObserver(label).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
    });
    document.querySelector('.login-tabs').addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const current = document.getElementById('tab-btn-company').getAttribute('aria-selected') === 'true';
      const target = event.key === 'Home' ? 'employee' : event.key === 'End' ? 'company' : current ? 'employee' : 'company';
      window.switchLoginTab(target); document.getElementById('tab-btn-' + target).focus();
    });
    window.switchLoginTab('employee');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
