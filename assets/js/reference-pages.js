/* Shared AMCO identity and chart colors applied to the supplied layouts. */
(() => {
 'use strict';
 const ar=()=>document.documentElement.lang==='ar';
 function identity(){
  const partners=window.ProjectBranding?.partners;
  if(!partners)return;
  document.querySelectorAll('[data-layout="reference"] .topbar-logo-block').forEach((block,index)=>{
   const partner=partners[index===0?1:0];if(!partner)return;
   const img=block.querySelector('img'),name=block.querySelector('.topbar-logo-name');
   if(img){img.src=partner.src;img.alt=partner.name;}
   if(name)name.textContent=partner.name+' · '+(ar()?partner.roleAr:partner.roleEn);
  });
  document.querySelectorAll('.chart-logo-slot img,.pf-cover-logos img,.cover-logos img').forEach(img=>{
   if(!img.dataset.partnerIndex)img.dataset.partnerIndex=/mdceo|mdeco/i.test(img.getAttribute('src')||'')?'1':'0';
   const p=partners[Number(img.dataset.partnerIndex)];if(p){img.src=p.src;img.alt=p.name;}
  });
  document.querySelectorAll('[data-reference-label="advanced"]').forEach(n=>n.textContent=ar()?'التحليلات المتقدمة':'Advanced analysis');
  window.ProjectBranding.render();
 }
 if(window.Chart){
  const blues=new Set(['#1e40af','#1d4ed8','#2563eb','#1a73e8']);
  Chart.register({id:'amcoReferenceTheme',beforeUpdate(chart){
   const style=getComputedStyle(document.documentElement),primary=style.getPropertyValue('--primary').trim();
   Chart.defaults.font.family=style.getPropertyValue('--font-ui').trim();
   chart.options.font={...chart.options.font,family:style.getPropertyValue('--font-ui').trim()};
   const map=color=>typeof color==='string'&&blues.has(color.toLowerCase())?primary:color;
   chart.data.datasets.forEach(set=>{for(const key of ['backgroundColor','borderColor']){if(Array.isArray(set[key]))set[key]=set[key].map(map);else set[key]=map(set[key]);}});
  }});
 }
 document.addEventListener('branding:ready',identity);document.addEventListener('portal:language-changed',identity);document.addEventListener('authguard:ready',identity);
 window.addEventListener('beforeprint',identity);identity();
})();
