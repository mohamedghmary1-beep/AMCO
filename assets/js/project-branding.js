(function () {
 const base = new URL('../../images/', document.currentScript.src);
 function init() {
  const logos = [['logo-amco.jpeg','AMCO'],['logo-mdceo-new.jpeg','MDCEO'],['logo-green-point.jpeg','Green Point'],['logo-prudence.jpeg','Prudence Dimensions — أبعاد الحصافة']];
  const strip = document.createElement('section'); strip.className = 'project-brand-strip'; strip.setAttribute('aria-label','Project partners / شركاء المشروع');
  logos.forEach(([src,name]) => { const figure=document.createElement('figure'); const img=document.createElement('img'); img.src=new URL(src,base).href; img.alt=name; img.loading='lazy'; const caption=document.createElement('figcaption'); caption.textContent=name; figure.append(img,caption); strip.append(figure); });
  const target = document.querySelector('.form-panel-inner') || document.querySelector('.mdceo-topbar');
  if (target && target.classList.contains('mdceo-topbar')) target.after(strip);
  else if (target) target.prepend(strip);
  else (document.querySelector('main') || document.body).prepend(strip);
  window.ProjectBranding?.render();
  const art = document.querySelector('.perf-project-art');
  if (art) { const img=document.createElement('img'); img.src=new URL('logo-amco.jpeg',base).href; img.alt='AMCO'; art.removeAttribute('aria-hidden'); art.replaceChildren(img); }
  function editLink() {
   if (!window.canEditDashboard || document.getElementById('dashboardEditorLink') || /data_entry\.html$/.test(location.pathname) || document.querySelector('[data-route-key="editor"]')) return;
   const a=document.createElement('a'); a.id='dashboardEditorLink'; a.className='dashboard-editor-link'; a.href=new URL('../pages/data_entry.html',base).href;
   a.textContent=document.documentElement.lang==='ar'?'تعديل بيانات الداشبورد':'Edit dashboard data';
   (document.querySelector('.mdceo-primary-nav') || document.querySelector('main') || document.body).appendChild(a);
  }
  document.addEventListener('authguard:ready',editLink); editLink();
  new MutationObserver(() => {
   const link = document.getElementById('dashboardEditorLink');
   if (link) link.textContent = document.documentElement.lang === 'ar' ? 'تعديل بيانات الداشبورد' : 'Edit dashboard data';
  }).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
