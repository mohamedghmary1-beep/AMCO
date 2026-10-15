(function () {
 'use strict';
 const base = new URL('../../images/',document.currentScript.src);
 const ar=()=>document.documentElement.lang==='ar';
 const defaults=[['logo-amco.jpeg','AMCO','المالك','Owner'],['logo-mdceo.jpeg','MDCEO','الاستشاري المشرف','Supervision Consultant'],['logo-green-point.jpeg','Green Point','المقاول','Contractor'],['logo-prudence.jpeg','Prudence Dimensions','شركة بالمشروع','Project partner']].map(([file,name,roleAr,roleEn])=>({src:new URL(file,base).href,name,roleAr,roleEn}));
 let partners=defaults.map(p=>({...p})),loaded=false;
 function validSrc(src) { return typeof src==='string' && (/^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(src)||defaults.some(p=>p.src===src)); }
 function validPartners(list) { return Array.isArray(list)&&list.length>=2&&list.length<=4&&list.every(p=>p&&validSrc(p.src)&&['name','roleAr','roleEn'].every(k=>typeof p[k]==='string'&&p[k].trim().length>0&&p[k].length<=120)); }
 function render(root=document) {
  partners.forEach(p=>{if(/^mdceo$/i.test(p.name.trim())){p.roleAr='الاستشاري المشرف';p.roleEn='Supervision Consultant';}});
  root.querySelectorAll('.project-brand-strip,.print-partner-header').forEach(strip=>{
   strip.style.setProperty('--partner-count',String(partners.length));strip.dataset.partnerCount=String(partners.length);
   strip.replaceChildren();partners.forEach(p=>{
    const figure=document.createElement('figure'),img=document.createElement('img'),caption=document.createElement('figcaption');
    const name=document.createElement('span'),role=document.createElement('span');
    name.className='partner-name';name.textContent=p.name;name.dir='auto';
    role.className='partner-role';role.textContent=ar()?p.roleAr:p.roleEn;
    img.src=p.src;img.alt=p.name;img.decoding='async';
    caption.append(name,role);figure.append(img,caption);strip.append(figure);
   });
  });
 }
 async function load() {
  try {
   const {data,error}=await window.__guardClient.from('portal_settings').select('settings').eq('id','project_branding').maybeSingle();
   if(error)throw error;
   if(data?.settings?.partners){if(!validPartners(data.settings.partners))throw new Error('Invalid branding');partners=data.settings.partners;}
   loaded=true;
  } catch(error) { loaded=false; }
  render();document.dispatchEvent(new CustomEvent('branding:ready'));editor();
 }
 function editor() {
  if(!document.getElementById('dashboardEditor')||!window.canEditDashboard||document.getElementById('brandingEditor'))return;
  const form=document.createElement('form');form.id='brandingEditor';form.className='editor-section';
  const title=document.createElement('h2');title.textContent=ar()?'شعارات الشركات وصفاتها في المشروع':'Company logos and project roles';form.append(title);
  const note=document.createElement('p');note.textContent=ar()?'لكل شركة: اختر صورة PNG أو JPEG أو WebP حتى 250 كيلوبايت، واكتب الصفة بالعربية والإنجليزية.':'For each company, select a PNG, JPEG or WebP image up to 250 KB and enter its role in both languages.';form.append(note);
  const drafts=partners.map(p=>({...p}));let dirty=false;
  form.addEventListener('input',()=>dirty=true);
  window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
  const rows=document.createElement('div');form.append(rows);
  const add=document.createElement('button');add.type='button';add.className='editor-add';add.textContent=ar()?'إضافة شركة':'Add company';
  add.addEventListener('click',()=>{if(drafts.length>=4)return;drafts.push({src:'',name:'',roleAr:'',roleEn:''});dirty=true;draw();});
  function draw(){rows.replaceChildren();add.disabled=drafts.length>=4;
  drafts.forEach((p,index)=>{
   const row=document.createElement('fieldset');row.className='branding-row';const legend=document.createElement('legend');legend.textContent=p.name;row.append(legend);
   const preview=document.createElement('img');if(p.src)preview.src=p.src;preview.alt=p.name;row.append(preview);
   [['name',ar()?'اسم الشركة':'Company name'],['roleAr','الصفة بالعربية'],['roleEn','Role in English']].forEach(([key,text])=>{const label=document.createElement('label');label.textContent=text;const input=document.createElement('input');input.value=p[key];input.required=true;input.maxLength=120;input.addEventListener('input',()=>p[key]=input.value.trim());label.append(input);row.append(label);});
   const label=document.createElement('label');label.textContent=ar()?'تغيير الشعار':'Change logo';const file=document.createElement('input');file.type='file';file.accept='image/png,image/jpeg,image/webp';
   file.addEventListener('change',async()=>{const image=file.files[0];if(!image)return;if(image.size>250*1024||!['image/png','image/jpeg','image/webp'].includes(image.type)){window.notify?.error(ar()?'اختر صورة صالحة بحجم لا يتجاوز 250 كيلوبايت.':'Choose a valid image no larger than 250 KB.');file.value='';return;}
    const reader=new FileReader();reader.onload=async()=>{try{const probe=new Image();probe.src=reader.result;await probe.decode();p.src=reader.result;preview.src=p.src;dirty=true;}catch(error){file.value='';window.notify?.error(ar()?'تعذر قراءة الصورة.':'Unable to read image.');}};reader.readAsDataURL(image);
   });label.append(file);row.append(label);
   const remove=document.createElement('button');remove.type='button';remove.className='branding-remove';remove.textContent=ar()?'حذف الشركة':'Remove company';remove.disabled=drafts.length<=2;
   remove.addEventListener('click',()=>{drafts.splice(index,1);dirty=true;draw();});row.append(remove);rows.append(row);
  });
  }draw();form.append(add);
  const button=document.createElement('button');button.type='submit';button.className='editor-add';button.textContent=ar()?'حفظ الشعارات والصفات':'Save logos and roles';form.append(button);
  const status=document.createElement('p');status.setAttribute('role','status');form.append(status);
  form.addEventListener('submit',async event=>{
   event.preventDefault();if(!window.canEditDashboard||!form.reportValidity())return;
   if(!validPartners(drafts)){status.textContent=ar()?'أدخل بيانات وصور شركتين إلى أربع شركات.':'Enter details and logos for two to four companies.';return;}
   if(!loaded){status.textContent=ar()?'يلزم تشغيل ملف sql/project_branding_settings.sql في Supabase أولًا، ثم إعادة تحميل الصفحة.':'Run sql/project_branding_settings.sql in Supabase first, then reload this page.';return;}
   button.disabled=true;form.inert=true;
   try{const saved=drafts.map(p=>({...p}));const {data,error}=await window.__guardClient.from('portal_settings').upsert({id:'project_branding',settings:{partners:saved},updated_at:new Date().toISOString()}).select('id').single();if(error||!data)throw error;partners=saved;dirty=false;render();document.dispatchEvent(new CustomEvent('branding:ready'));status.textContent=ar()?'تم حفظ الشعارات والصفات لكل صفحات المشروع والطباعة.':'Logos and roles saved for all project pages and printing.';window.notify?.success(status.textContent);}
   catch(error){status.textContent=ar()?'تعذر الحفظ. راجع صلاحيات قاعدة البيانات والاتصال.':'Could not save. Check database permissions and connection.';window.notify?.error(status.textContent);}
   finally{button.disabled=false;form.inert=false;}
  });
  document.querySelector('.editor-wrap').append(form);
 }
 window.ProjectBranding={get partners(){return partners;},render};
 document.addEventListener('authguard:ready',load);
 document.addEventListener('portal:language-changed',()=>render());
 window.addEventListener('beforeprint',()=>render());
 function init(){render();if(window.__currentProfile)load();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
