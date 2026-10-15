/* Shared, validated site configuration; Supabase remains the source of truth. */
(() => {
 'use strict';
 const defaults={name:'AMCO FACTORY',primary:'#163b66',secondary:'#3274b8',language:'ar',pageSize:25,dateFormat:'medium',printMargin:14,fontPair:'corporate',favicon:0,navigation:{}};
 let settings=structuredClone(defaults),ready=false,loaded=false;
 const routes=[
  {file:'performance.html',key:'dashboard',ar:'أداء المشروع',en:'Project performance',icon:'fa-chart-line',permission:'page_performance'},
  {file:'weekly_report.html',key:'reports',ar:'التقارير الأسبوعية',en:'Weekly reports',icon:'fa-file-lines',permission:'page_weekly_report'},
  {file:'weekly_report_view.html',key:'reportView',ar:'عرض التقارير',en:'Report viewer',icon:'fa-folder-open',permission:'page_weekly_report'},
  {file:'data_entry.html',key:'editor',ar:'إدخال البيانات',en:'Data entry',icon:'fa-pen-to-square',admin:true},
  {file:'administration.html',key:'administration',ar:'إدارة الموقع',en:'Site administration',icon:'fa-sliders',admin:true}
 ];
 window.reportPhotoTitle=(index,total)=>{
  const title=document.documentElement.lang==='ar'?'صور تقدم الأعمال خلال الأسبوع':'Site Progress Photos for the Week';
  return total>1?`${title} (${index+1}/${total})`:title;
 };
 function validate(raw={}) {
  const s={...defaults};
  if(typeof raw.name==='string'&&raw.name.trim().length<=80&&raw.name.trim())s.name=raw.name.trim();
  for(const k of ['primary','secondary'])if(/^#[0-9a-f]{6}$/i.test(raw[k]||''))s[k]=raw[k];
  if(['ar','en'].includes(raw.language))s.language=raw.language;
  if([10,25,50,100].includes(Number(raw.pageSize)))s.pageSize=Number(raw.pageSize);
  if(['short','medium','long'].includes(raw.dateFormat))s.dateFormat=raw.dateFormat;
  if([12,14,15].includes(Number(raw.printMargin)))s.printMargin=Number(raw.printMargin);
  if(['corporate','system'].includes(raw.fontPair))s.fontPair=raw.fontPair;
  if([0,1,2,3].includes(Number(raw.favicon)))s.favicon=Number(raw.favicon);
  for(const r of routes){const n=raw.navigation?.[r.key];if(!n||r.admin)continue;s.navigation[r.key]={enabled:n.enabled!==false,ar:String(n.ar||r.ar).slice(0,60),en:String(n.en||r.en).slice(0,60),order:Math.min(99,Math.max(0,Number(n.order)||0))};}
  return s;
 }
 function apply(){
  const root=document.documentElement;root.style.setProperty('--primary',settings.primary);root.style.setProperty('--site-primary',settings.primary);root.style.setProperty('--secondary',settings.secondary);
  document.querySelectorAll('.mdceo-sidebar-brand').forEach(n=>n.textContent=settings.name);
  root.style.setProperty('--font-ar',settings.fontPair==='system'?'Segoe UI, Tahoma, sans-serif':"'IBM Plex Sans Arabic','Segoe UI',Tahoma,sans-serif");
  root.style.setProperty('--font-en',settings.fontPair==='system'?'Segoe UI, sans-serif':"'Inter','Segoe UI',sans-serif");
  favicon();
  let print=document.getElementById('sitePrintRules');if(!print){print=document.createElement('style');print.id='sitePrintRules';document.head.append(print);}
  print.textContent=`@page {size:A4 portrait;margin:${settings.printMargin}mm} @page dashboard {size:A4 landscape;margin:${settings.printMargin}mm}`;
  document.dispatchEvent(new CustomEvent('site:settings',{detail:settings}));
 }
 function favicon(){const partners=window.ProjectBranding?.partners;const partner=partners?.[settings.favicon]||partners?.[0];if(!partner)return;let icon=document.querySelector('link[rel="icon"]');if(!icon){icon=document.createElement('link');icon.rel='icon';document.head.append(icon);}icon.href=partner.src;}
 async function load(){if(ready)return;ready=true;try{const {data,error}=await window.__guardClient.from('site_configuration').select('settings').eq('id','global').maybeSingle();if(error)throw error;settings=validate(data?.settings);loaded=true;if(!localStorage.getItem('portalLang'))window.setLanguage?.(settings.language);apply();}catch(e){document.dispatchEvent(new CustomEvent('site:configuration-unavailable'));}}
 window.PortalSite={routes,defaults,validate,get settings(){return settings;},get loaded(){return loaded;},async save(raw){if(!loaded)throw new Error('Configuration has not loaded. Reload after checking the connection and migration.');const next=validate(raw);const {data,error}=await window.__guardClient.from('site_configuration').upsert({id:'global',settings:next}).select('id').single();if(error||!data)throw error||new Error('Save failed');settings=next;apply();return next;}};
 document.addEventListener('authguard:ready',load);
 document.addEventListener('branding:ready',favicon);
 if(window.__currentProfile)load();
})();
