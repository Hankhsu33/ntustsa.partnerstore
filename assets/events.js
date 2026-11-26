(function(root){
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
function validate(events,storeIds){
 if(!Array.isArray(events))throw Error('Events must be an array');const ids=new Set();
 for(const e of events){if(!e||typeof e.published!=='boolean')throw Error('Event needs published boolean');if(!/^[a-z0-9-]+$/.test(e.id||'')||ids.has(e.id))throw Error('Invalid or duplicate event ID');ids.add(e.id);if(!e.published)continue;
 if(typeof e.title!=='string'||!e.title.trim()||typeof e.offer!=='string'||!e.offer.trim())throw Error('Published event needs title and offer');
 if(!validDate(e.startDate)||!validDate(e.endDate)||e.startDate>e.endDate)throw Error('Invalid event dates');
 if(!Array.isArray(e.storeIds)||!e.storeIds.length||e.storeIds.some(id=>!storeIds.has(id)))throw Error('Unknown event store');
 if(e.rules!==undefined&&typeof e.rules!=='string')throw Error('Event rules must be text');
 }return true;
}
function status(e,today){return today<e.startDate?'upcoming':today>e.endDate?'ended':'active';}
function render(events,stores,filter,today){
 validate(events,new Set(stores.map(s=>s.id)));const published=events.filter(e=>e.published);
 const shown=published.filter(e=>filter==='available'?status(e,today)!=='ended':status(e,today)===filter).sort((a,b)=>filter==='ended'?b.endDate.localeCompare(a.endDate):a.startDate.localeCompare(b.startDate));
 if(!shown.length){const first=!published.length;return `<div class="events-empty"><span aria-hidden="true">✦</span><h3>${first?'下一場特約活動，敬請期待！':'目前沒有符合的活動'}</h3><p>${first?'目前沒有進行中的活動，記得關注學生會 IG，掌握最新消息。':'請切換活動狀態，查看其他活動。'}</p><a href="https://www.instagram.com/ntustsa.partnerstore/" target="_blank" rel="noopener noreferrer">追蹤特約商店 Instagram ↗</a></div>`;}
 return '<div class="event-grid">'+shown.map(e=>{const state=status(e,today);return `<article class="event-card ${state}"><span class="event-badge">${{active:'進行中',upcoming:'即將開始',ended:'已結束'}[state]}</span><h3>${esc(e.title)}</h3><p class="event-dates"><time datetime="${e.startDate}">${e.startDate}</time> — <time datetime="${e.endDate}">${e.endDate}</time>（臺灣時間）</p><p class="event-offer">${esc(e.offer)}</p>${e.rules?`<details><summary>活動使用規則</summary><p class="event-rules">${esc(e.rules)}</p></details>`:''}<p>合作店家</p><div class="event-stores">${e.storeIds.map(id=>`<button type="button" data-event-store="${esc(id)}">${esc(stores.find(s=>s.id===id).name)} ↗</button>`).join('')}</div></article>`;}).join('')+'</div>';
}
const api={validate,status,render};if(typeof module!=='undefined'&&module.exports){module.exports=api;return;}root.PerksEvents=api;
document.addEventListener('DOMContentLoaded',async()=>{
 const container=document.querySelector('#events-content'),filter=document.querySelector('#event-filter');if(!container)return;
 try{const response=await fetch('data/events.json',{cache:'no-cache'});if(!response.ok)throw Error('Events unavailable');const events=await response.json();const stores=root.PERKS_DATA||await fetch('data/stores.json').then(r=>{if(!r.ok)throw Error('Stores unavailable');return r.json();});
 const refresh=()=>{try{container.innerHTML=render(events,stores,filter.value,new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()));}catch{container.innerHTML='<p class="event-error" role="alert">活動資料暫時無法顯示，請稍後重新整理。</p>';}};refresh();filter.addEventListener('change',refresh);setInterval(refresh,60000);
 }catch{container.innerHTML='<p class="event-error" role="alert">活動載入失敗，請稍後重新整理。</p>';}
});
})(typeof window!=='undefined'?window:globalThis);
