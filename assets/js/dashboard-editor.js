(function () {
 'use strict';
 window.registerDictionary?.({ar:{dataEntryTitle:'إدخال البيانات',projectData:'بيانات المشروع',weeklyData:'الجداول الأسبوعية',companyLogos:'الشعارات',reportData:'إدخال تقرير وصور',viewPerformance:'عرض الأداء'},en:{dataEntryTitle:'Data entry',projectData:'Project data',weeklyData:'Weekly tables',companyLogos:'Logos',reportData:'Enter report & photos',viewPerformance:'View performance'}});
 let record, dirty=false, saving=false;
 const groups = [
 ['بيانات المشروع والعقد', [['project_name','اسم المشروع','text'],['owner','المالك','text'],['contractor','المقاول','text'],['contract_value_no_vat','قيمة العقد بدون الضريبة','number'],['contract_value_vat','قيمة العقد مع الضريبة','number'],['approved_change_order','أوامر التغيير المعتمدة','text']]],
 ['مواعيد المشروع', [['project_start_date','تاريخ البداية','date'],['project_duration_days','مدة المشروع بالأيام','number'],['contract_finish_phase1','نهاية العقد','date'],['finish_date_after_eot','النهاية بعد التمديد','date'],['expected_finish_date','النهاية المتوقعة','date']]],
 ['العمالة والأداء المالي', [['manpower_planned','العمالة المخططة','number'],['manpower_actual','العمالة الفعلية','number'],['spi','مؤشر أداء الجدول SPI','number'],['cash_flow_ev','القيمة المكتسبة EV','number'],['cash_flow_ai','التكلفة الفعلية AI','number'],['cash_flow_pv','القيمة المخططة PV','number']]]
 ];
 const tables=[['weekly_table','نسب الإنجاز الأسبوعية',[['week','الأسبوع'],['actual','الفعلي'],['plan','المخطط']]],['scurve_data','التكاليف الأسبوعية S-Curve',[['week','الأسبوع'],['planned_cost','التكلفة المخططة'],['actual_cost','التكلفة الفعلية']]],['manpower_data','العمالة الأسبوعية',[['week','الأسبوع'],['planned','المخطط'],['actual','الفعلي']]]];
 const $=id=>document.getElementById(id);
 function node(tag,text) { const el=document.createElement(tag); if(text)el.textContent=text; return el; }
 function status(text) { $('editorStatus').textContent=text; }
 function addRow(body,fields,source={}) {
  const row=node('tr'); row.source={...source};
  fields.forEach(([key,label])=> { const cell=node('td'),input=node('input'); input.type=key==='week'?'text':'number'; input.step='any'; if(key!=='week')input.min='0';if(body.dataset.table==='weekly_table'&&['actual','plan'].includes(key))input.max='100';input.required=true; input.value=source[key]??''; input.dataset.key=key; input.setAttribute('aria-label',label); cell.append(input); row.append(cell); });
  const cell=node('td'),remove=node('button','حذف');remove.type='button';remove.addEventListener('click',()=>{row.remove();dirty=true;});cell.append(remove);row.append(cell);body.append(row);
 }
 async function load() {
  if(!window.canEditDashboard) {status('ليس لديك صلاحية تعديل البيانات.');return;}
  try {
   const {data,error}=await window.__guardClient.from('project_performance').select('*').eq('id',1).single();
   if(error||!data)throw error||new Error('Missing record'); record=data;
   groups.forEach(([title,fields])=> {
    const section=node('section');section.className='editor-section';section.append(node('h2',title));const grid=node('div');grid.className='editor-grid';
    fields.filter(([key])=>Object.hasOwn(record,key)).forEach(([key,label,type])=>{const wrap=node('div');wrap.className='editor-field';const caption=node('label',label);caption.htmlFor='edit_'+key;const input=node('input');input.id='edit_'+key;input.name=key;input.type=type;input.step=['manpower_planned','manpower_actual','project_duration_days'].includes(key)?'1':'any';if(type==='number')input.min='0';if(key==='project_name'){input.required=true;input.maxLength=160;}input.value=record[key]??'';wrap.append(caption,input);grid.append(wrap);}); section.append(grid);$('editorFields').append(section);
   });
   tables.filter(([key])=>Object.hasOwn(record,key)).forEach(([key,title,fields])=>{
    const section=node('section');section.className='editor-section';section.append(node('h2',title));const wrap=node('div');wrap.className='editor-table';const table=node('table'),head=node('thead'),header=node('tr'),body=node('tbody');body.dataset.table=key;
    fields.forEach(([,label])=>header.append(node('th',label)));header.append(node('th','إجراءات'));head.append(header);table.append(head,body);wrap.append(table);section.append(wrap);
    const entries=record[key]??[];if(!Array.isArray(entries))throw new Error('Invalid table data');entries.forEach(row=>addRow(body,fields,row));const add=node('button','إضافة أسبوع');add.type='button';add.className='editor-add';add.addEventListener('click',()=>{addRow(body,fields);dirty=true;});section.append(add);$('editorTables').append(section);
   });
   $('dashboardEditor').hidden=false; status('');
  }catch(error){status('تعذر تحميل بيانات المشروع. أعد تحميل الصفحة للمحاولة.');console.error('Dashboard editor load failed',error);}
 }
 async function save(event) {
  event.preventDefault();if(saving||!record||!window.canEditDashboard)return;
  if(!$('dashboardEditor').reportValidity())return;
  const payload={};
  $('editorFields').querySelectorAll('input').forEach(input=>payload[input.name]=input.value===''?null:input.type==='number'?Number(input.value):input.value);
  for(const body of $('editorTables').querySelectorAll('tbody')) {
   payload[body.dataset.table]=Array.from(body.rows).map(row=>{const data={...row.source};row.querySelectorAll('input').forEach(input=>data[input.dataset.key]=input.dataset.key==='week'?input.value.trim():input.value===''?null:Number(input.value));return data;});
   if(payload[body.dataset.table].some(row=>!row.week)){status('أدخل اسم الأسبوع لكل صف أو احذف الصف الفارغ.');return;}
   const weeks=payload[body.dataset.table].map(row=>row.week.toLocaleLowerCase());
   if(new Set(weeks).size!==weeks.length){status(document.documentElement.lang==='ar'?'الأسبوع مكرر في الجدول.':'Duplicate week in table.');return;}
  }
  if(Object.hasOwn(record,'updated_at'))payload.updated_at=new Date().toISOString();
  saving=true;$('editorSave').disabled=true;status('جارٍ الحفظ…');
  try {
   const {data,error}=await window.__guardClient.from('project_performance').update(payload).eq('id',record.id).select('id').single();
   if(error||!data)throw error||new Error('No record updated');record={...record,...payload};dirty=false;status(document.documentElement.lang==='ar'?'تم الحفظ.':'Saved.');
  }catch(error){status('تعذر الحفظ. تحقق من الاتصال وصلاحيات تعديل بيانات المشروع.');window.notify?.error(document.documentElement.lang==='ar'?'تعذر حفظ البيانات.':'Could not save data.');console.error('Dashboard editor save failed',error);}
  finally {saving=false;$('editorSave').disabled=false;}
 }
 function init() { $('dashboardEditor').addEventListener('submit',save);$('dashboardEditor').addEventListener('input',()=>dirty=true);window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});if(window.__currentProfile)load();else document.addEventListener('authguard:ready',load,{once:true}); }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
