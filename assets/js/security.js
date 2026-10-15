/* Validate untrusted image URLs before assigning them to DOM or HTML attributes. */
(() => {
 'use strict';
 function imageSource(value){
  if(typeof value!=='string'||!value||value.length>8*1024*1024)return '';
  if(/^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(value))return value;
  try{
   const url=new URL(value,location.href);
   if(url.username||url.password)return '';
   if(url.origin===location.origin&&['http:','https:'].includes(url.protocol))return url.href;
   if(url.origin==='https://xtculvlloefodmjavugv.supabase.co'&&url.pathname.startsWith('/storage/v1/object/sign/report-photos/'))return url.href;
  }catch{}
  return '';
 }
 async function validatePhoto(file){
  if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024||file.size===0)throw new Error('PNG, JPEG or WebP only; maximum 5 MB.');
  const bytes=new Uint8Array(await file.slice(0,12).arrayBuffer());
  const jpeg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
  const png=[137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v);
  const webp=String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP';
  if(!(file.type==='image/jpeg'&&jpeg||file.type==='image/png'&&png||file.type==='image/webp'&&webp))throw new Error('Invalid image content.');
 }
 window.PortalSecurity=Object.freeze({imageSource,validatePhoto});
})();
