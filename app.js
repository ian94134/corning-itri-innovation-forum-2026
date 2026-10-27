function renderSpeakers(filter='all'){document.getElementById('filter-status').textContent=(filter==='all'?'全部講者':filter)+' · '+speakers.filter(s=>filter==='all'||s[0]===filter).length+' 位';document.getElementById('speaker-grid').innerHTML=speakers.filter(s=>filter==='all'||s[0]===filter).map(s=>`<article class="speaker"><div class="portrait"><img loading="lazy" width="98" height="106" src="assets/${s[4]}" alt="${s[1]}"><span>${s[0]}</span></div><div class="speaker-body"><h3>${s[1]}</h3><p class="role">${s[2]}</p><div class="topic"><small>演講主題 / Topic</small><p>${s[3]}</p></div></div></article>`).join('')}
function renderAgenda(i) {
  const a=agendas[i];
  const panel=document.getElementById('agenda-panel');
  panel.setAttribute('aria-labelledby',`tab-${i}`);
  const range=a.rows[0][0].split('–')[0]+'–'+a.rows.at(-1)[0].split('–')[1];
  const title=a.title.split('：');
  const heading=i===0?'主論壇':title[0];
  const subtitle=i===0?'Plenary Session':title.slice(1).join('：');
  function person(id){
    const s=speakers[id];
    return `<div class="schedule-person"><img src="assets/${s[4]}" width="48" height="52" loading="lazy" alt=""><div><strong>${s[1]}</strong><p>${s[2]}</p>${id===1?'<p>ITRI｜Vice President and Senior Expert</p>':''}</div></div>`;
  }
  panel.innerHTML=`<div class="schedule-heading"><div><p class="schedule-kicker">${a.en||'CORNING × ITRI · PLENARY SESSION'}</p><h3>${heading}</h3><p class="schedule-subtitle">${subtitle}</p></div><div class="schedule-range"><span>SESSION TIME</span><strong>${range}</strong></div><p class="schedule-location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>${a.location}</p></div><ol class="schedule-list">`+a.rows.map((r,n)=>{
    const ids=r[2]==null?[]:Array.isArray(r[2])?r[2]:[r[2]];
    const times=r[0].split('–');
    const minutes=t=>Number(t.split(':')[0])*60+Number(t.split(':')[1]);
    const duration=minutes(times[1])-minutes(times[0]);
    const kind=ids.length?'lecture':r[1]==='中場休息'?'break':/Panel|座談/.test(r[1])?'discussion':'event';
    return `<li class="schedule-entry ${kind}"><div class="schedule-time"><time datetime="2026-11-19T${times[0]}:00+08:00">${r[0]}</time><span class="duration">${duration} 分鐘</span></div><div class="schedule-content"><h4 class="session-label">${r[1]}</h4>${ids.map(id=>`<div class="schedule-talk"><p class="schedule-topic">${speakers[id][3]}</p>${person(id)}</div>`).join('')}${r[3]?`<p class="schedule-note">${r[3]}</p>`:''}</div></li>`;
  }).join('')+'</ol>';
}

document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});renderSpeakers(b.dataset.filter)}));
const tabs=[...document.querySelectorAll('[data-tab]')];function selectTab(b){tabs.forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',x===b);x.tabIndex=x===b?0:-1});renderAgenda(+b.dataset.tab)}tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTab(b));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;selectTab(tabs[j]);tabs[j].focus()}})});renderSpeakers();selectTab(tabs[0]);

