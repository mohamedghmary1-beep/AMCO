/* Shared translation of remaining controls; user-entered records are untouched. */
(function () {
 const pairs = [["تعديل بيانات الداشبورد","Edit dashboard data"],["تحديث بيانات المشروع والعقد والجداول الأسبوعية. تظهر التغييرات في لوحة الأداء بعد الحفظ.","Update project, contract and weekly records. Changes appear on the dashboard after saving."],["جارٍ تحميل البيانات…","Loading data…"],["حفظ التغييرات","Save changes"],["العودة إلى الداشبورد","Back to dashboard"],["بيانات المشروع والعقد","Project and contract"],["اسم المشروع","Project name"],["المالك","Owner"],["المقاول","Contractor"],["قيمة العقد بدون الضريبة","Contract value excluding VAT"],["قيمة العقد مع الضريبة","Contract value including VAT"],["أوامر التغيير المعتمدة","Approved change orders"],["مواعيد المشروع","Project dates"],["تاريخ البداية","Start date"],["مدة المشروع بالأيام","Project duration (days)"],["نهاية العقد","Contract finish date"],["النهاية بعد التمديد","Finish date after extension"],["النهاية المتوقعة","Expected finish date"],["العمالة والأداء المالي","Manpower and financial performance"],["العمالة المخططة","Planned manpower"],["العمالة الفعلية","Actual manpower"],["مؤشر أداء الجدول SPI","Schedule performance index (SPI)"],["القيمة المكتسبة EV","Earned value (EV)"],["التكلفة الفعلية AI","Actual cost (AI)"],["القيمة المخططة PV","Planned value (PV)"],["نسب الإنجاز الأسبوعية","Weekly progress"],["الأسبوع","Week"],["الفعلي","Actual"],["المخطط","Planned"],["التكاليف الأسبوعية S-Curve","Weekly costs — S-Curve"],["التكلفة المخططة","Planned cost"],["العمالة الأسبوعية","Weekly manpower"],["حذف","Delete"],["إجراءات","Actions"],["إضافة أسبوع","Add week"],["ليس لديك صلاحية تعديل البيانات.","You do not have permission to edit these records."],["البيانات جاهزة للتعديل.","Data is ready to edit."],["تعذر تحميل بيانات المشروع. أعد تحميل الصفحة للمحاولة.","Could not load project data. Reload the page to try again."],["أدخل اسم الأسبوع لكل صف أو احذف الصف الفارغ.","Enter a week for each row or delete the empty row."],["جارٍ الحفظ…","Saving…"],["تم حفظ البيانات بنجاح. افتح الداشبورد لعرض التغييرات.","Saved successfully. Open the dashboard to view the changes."],["تعذر الحفظ. تحقق من الاتصال وصلاحيات تعديل بيانات المشروع.","Could not save. Check your connection and project editing permissions."],["تغيير كلمة المرور","Change password"],["تسجيل الخروج","Logout"],["🔓 تعديل","🔓 Edit"],["كلمة مرور التعديل","Confirm password"],["من فضلك أدخل كلمة مرور حسابك للتعديل أو الحذف","Enter your account password to edit or delete"],["تأكيد","Confirm"],["إلغاء","Cancel"]];
 const translated = new Map();
 pairs.forEach(pair => pair.forEach(value => translated.set(value, pair)));
 function update(root=document.body) {
  if (!root) return;
  const en = document.documentElement.lang === 'en';
  if (document.body.dataset.page === 'dashboard-editor') document.title = en ? 'Data entry | AMCO' : 'إدخال البيانات | AMCO';
  const scope = '[data-page="dashboard-editor"] main, #mdceoAccountMenu, #unlockEditBtn, [role="dialog"]';
  document.querySelectorAll(scope).forEach(container => {
   const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);
   let text;
   while ((text=walker.nextNode())) {
    if (text.parentElement.closest('input,textarea,script,style,.mdceo-account-name,figcaption')) continue;
    const pair=translated.get(text.textContent.trim());
    if (pair) { const value=pair[en?1:0]; if(text.textContent!==value)text.textContent=value; }
   }
   container.querySelectorAll('[aria-label]').forEach(el => { const pair=translated.get(el.getAttribute('aria-label'));if(pair)el.setAttribute('aria-label',pair[en?1:0]); });
  });
  const legacy=document.querySelector('.mdceo-legacy-nav .translate-btn');if(legacy)legacy.hidden=true;
  const strip=document.querySelector('.project-brand-strip');if(strip)strip.setAttribute('aria-label',en?'Project partners':'شركاء المشروع');
 }
 function init() {
  update();
  let queued=false;
  new MutationObserver(() => {if(queued)return;queued=true;queueMicrotask(()=>{queued=false;update();});}).observe(document.body,{childList:true,characterData:true,subtree:true});
  document.addEventListener('portal:language-changed',()=>update());
  new MutationObserver(()=>update()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
