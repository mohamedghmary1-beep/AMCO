(function () {
 const entries=[];let unread=0;
 const ar=()=>document.documentElement.lang==='ar';
 function init(){
  const bar=document.querySelector('.mdceo-topbar');if(!bar||document.getElementById('notificationCenter'))return;
  const wrap=document.createElement('div');wrap.id='notificationCenter';
  const button=document.createElement('button');button.type='button';button.className='portal-nav-button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','notificationPanel');
  const panel=document.createElement('section');panel.id='notificationPanel';panel.hidden=true;
  const title=document.createElement('h2'),list=document.createElement('div'),clear=document.createElement('button');clear.type='button';clear.className='portal-nav-button';panel.append(title,list,clear);wrap.append(button,panel);bar.append(wrap);
  function render(){button.textContent=(ar()?'الإشعارات':'Notifications')+(unread?' ('+unread+')':'');title.textContent=ar()?'إشعارات الجلسة':'Session notifications';clear.textContent=ar()?'مسح الإشعارات':'Clear notifications';list.replaceChildren();if(!entries.length){const p=document.createElement('p');p.textContent=ar()?'لا توجد إشعارات جديدة.':'No new notifications.';list.append(p);}entries.forEach(entry=>{const item=document.createElement('p');item.className='notification-entry notification-'+entry.type;const text=document.createElement('span');text.textContent=entry.message;const time=document.createElement('time');time.dateTime=new Date(entry.time).toISOString();time.textContent=new Date(entry.time).toLocaleTimeString(ar()?'ar-SA':'en-GB',{hour:'2-digit',minute:'2-digit'});item.append(text,time);list.append(item);});}
  function close(){panel.hidden=true;button.setAttribute('aria-expanded','false');}
  button.addEventListener('click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden){unread=0;render();}});
  clear.addEventListener('click',()=>{entries.length=0;unread=0;render();});
  document.addEventListener('click',event=>{if(!wrap.contains(event.target))close();});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){close();button.focus();}});
  document.addEventListener('portal:notification',event=>{entries.unshift(event.detail);if(entries.length>30)entries.pop();if(panel.hidden)unread++;render();});
  document.addEventListener('portal:language-changed',render);render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
