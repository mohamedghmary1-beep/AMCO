/* Print-only partner header, reused in each generated report section. */
(function () {
 const imageBase = new URL('../../images/',document.currentScript.src);
 const partners=[['logo-amco.jpeg','AMCO'],['logo-mdceo.jpeg','MDCEO'],['logo-green-point.jpeg','Green Point'],['logo-prudence.jpeg','Prudence Dimensions']];
 function fitDashboards() {
  document.querySelectorAll('.perf-legacy-details').forEach(el => {
   if (!el.hasAttribute('data-print-was-open')) el.dataset.printWasOpen=String(el.open);
   el.open=true;
  });
 }
 function header() {
  const el=document.createElement('div');el.className='print-partner-header';
  partners.forEach(([file,name])=>{const image=document.createElement('img');image.src=new URL(file,imageBase).href;image.alt=name;el.append(image);});return el;
 }
 function prepare() {
  if (location.pathname.endsWith('weekly_report.html')) {
   const container = document.getElementById('externalPagesContainer');
   if (container && !container.children.length && typeof window.renderPrintView === 'function') {
    window.renderPrintView(); window.renderPrintCover();
    document.body.classList.add('printing-full-report');
    const sources = [document.querySelector('#printCover > *'), document.getElementById('perfEmbedSource'), document.getElementById('printView')];
    sources.filter(Boolean).forEach(source => {
     const page=document.createElement('section');page.className='report-page';
     const frame=document.createElement('div');frame.className='pf-page';
     const copy=source.cloneNode(true);copy.removeAttribute('id');copy.style.cssText='display:block;position:static;width:100%';
     if(source.id==='perfEmbedSource' && typeof window.bakeCanvasesIntoImages==='function')window.bakeCanvasesIntoImages(source,copy);
     if (copy.classList.contains('pf-page')) page.append(copy);
     else { frame.append(copy);page.append(frame); }
     container.append(page);
    });
    if(typeof window.buildPrintPhotoPages==='function')window.buildPrintPhotoPages().forEach(page=>container.append(page));
   }
  }
  document.querySelectorAll('.report-page .pf-page,.cover-card .cover-inner,.photo-print-page').forEach(frame=>{
   if (frame.parentElement.closest('.pf-page')) return;
   if(!frame.querySelector(':scope > .print-partner-header'))frame.prepend(header());
  });
  if (!document.querySelector('body > .print-partner-header')) document.body.prepend(header());
  document.body.classList.toggle('print-has-cover', Boolean(document.querySelector('.cover-card')));
  window.ProjectBranding?.render();
 }
 window.preparePortalPrint=async function () {
  prepare();
  if(document.fonts)await document.fonts.ready;
  await Promise.all(Array.from(document.querySelectorAll('.print-partner-header img')).map(img=>img.decode?img.decode().catch(()=>{}):Promise.resolve()));
 };
 window.addEventListener('beforeprint', () => { prepare(); fitDashboards(); });
 window.addEventListener('afterprint', () => {
  document.querySelectorAll('[data-print-was-open]').forEach(el=>{el.open=el.dataset.printWasOpen==='true';delete el.dataset.printWasOpen;});
 });
 function preload() { if(!document.querySelector('body > .print-partner-header'))document.body.prepend(header()); }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',preload);else preload();
})();
