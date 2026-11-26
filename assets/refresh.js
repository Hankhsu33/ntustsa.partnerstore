(()=>{
'use strict';
const q=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const type=s=>/折/.test(s.offer)?'discount':/送|贈|免費/.test(s.offer)?'gift':'other';
let candidates=[],spinning=false,angle=0;
function matches(s){const price=q('#price-filter').value,offer=q('#offer-filter').value,service=q('#service-filter').value;const known=Number.isFinite(s.pricePerPerson)&&s.pricePerPerson>0,services=Array.isArray(s.serviceModes)?s.serviceModes:[];return (!price||(price==='unknown'?!known:known&&(price==='150'?s.pricePerPerson<=150:price==='300'?s.pricePerPerson>150&&s.pricePerPerson<=300:s.pricePerPerson>300)))&&(!offer||type(s)===offer)&&(!service||(service==='unknown'?!services.length:services.includes(service)));}
function update(list){candidates=list;q('#roulette-count').textContent=`目前有 ${list.length} 間店符合條件`;q('#spin-store').disabled=spinning||!list.length;}
function reset(){for(const id of ['price-filter','offer-filter','service-filter'])q('#'+id).value='';}
window.PerksRefresh={matches,update,reset};
for(const id of ['price-filter','offer-filter','service-filter'])q('#'+id).addEventListener('change',()=>{q('#roulette-result').replaceChildren();render();});
q('#apply-filters').addEventListener('click',()=>{render();q('#result-count').scrollIntoView({behavior:'smooth',block:'center'});});
q('#spin-store').addEventListener('click',()=>{if(spinning||!candidates.length)return;const pool=[...candidates],random=new Uint32Array(1);crypto.getRandomValues(random);const selected=pool[Math.floor(random[0]/4294967296*pool.length)];spinning=true;update(candidates);q('#roulette-result').textContent='正在挑選今天的好去處…';angle+=1440+random[0]%360;q('#food-wheel').style.transform=`rotate(${angle}deg)`;setTimeout(()=>{spinning=false;update(candidates);const box=q('#roulette-result');box.innerHTML=`<p class="eyebrow">今天就選這一家</p><h3>${esc(selected.name)}</h3><p>${esc(selected.offer)}</p><button class="button" type="button">查看店家優惠與限制 ↗</button>`;box.querySelector('button').addEventListener('click',()=>openStore(stores.findIndex(s=>s.id===selected.id)));},matchMedia('(prefers-reduced-motion: reduce)').matches?0:1800);});
const list=window.PERKS_DATA||[];const picks=['sheet-oo-14','sheet-oo-65','jian-yi-mian-huaxin'].map(id=>list.find(s=>s.id===id)).filter(Boolean);const descriptions={'sheet-oo-14':'中和忠孝街上的義麵選擇，主餐搭配加贈小點或飲品。','sheet-oo-65':'公館生活圈的肉骨茶餐食，平日學生用餐另有加贈優惠。','jian-yi-mian-huaxin':'華新街上的麵食店，九折優惠讓日常用餐多一點選擇。'};
q('#weekly-cards').innerHTML=picks.map((s,i)=>`<article class="feature-card"><div class="feature-photo"><img src="${esc(s.image)}" alt="${esc(s.imageAlt)}" loading="lazy"><small>AI 示意圖・非店家實拍</small></div><div class="feature-copy"><p class="eyebrow">${esc(s.area)}</p><h3>${esc(s.name)}</h3><p>${esc(descriptions[s.id])}</p><p class="feature-offer">${esc(s.offer)}</p><button type="button" data-feature="${esc(s.id)}">查看優惠與限制 ↗</button></div></article>`).join('');
q('#weekly-cards').addEventListener('click',e=>{const b=e.target.closest('[data-feature]');if(b)openStore(stores.findIndex(s=>s.id===b.dataset.feature));});
for(const a of document.querySelectorAll('[data-guide]'))a.addEventListener('click',()=>{q('#reset-filters').click();const target=a.dataset.guide;category=stores.some(s=>s.category===target)?target:'全部';if(category==='全部'&&target==='甜點飲品')q('#search').value='甜';renderCategories();render();});
render();
})();
