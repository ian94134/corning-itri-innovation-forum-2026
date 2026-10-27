const ICON_PIN = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>';
const AGENDA_META = [
  {kicker: 'CORNING × ITRI · PLENARY SESSION', heading: '主論壇', subtitle: 'Plenary Session'},
  {heading: '專題論壇 I'},
  {heading: '專題論壇 II'}
];

function splitRole(role) {
  const [org, ...rest] = role.split('｜');
  return {isCorning: org === 'Corning', title: rest.join('｜')};
}

function renderSpeakers(filter = 'all') {
  const list = speakers.filter(s => filter === 'all' || s[0] === filter);
  document.getElementById('filter-status').textContent = (filter === 'all' ? '全部講者' : filter) + ' · ' + list.length + ' 位';
  document.getElementById('speaker-grid').innerHTML = list.map(s => {
    const r = splitRole(s[2]);
    return `<article class="speaker-card">
      <div class="speaker-photo"><img loading="lazy" width="400" height="400" src="assets/${s[4]}" alt="${s[1]}"><span class="forum-tag">${s[0]}</span></div>
      <div class="speaker-body">
        <p class="speaker-org ${r.isCorning ? 'corning' : 'itri'}">${r.isCorning ? 'CORNING' : 'ITRI 工研院'}</p>
        <h3>${s[1]}</h3>
        <p class="speaker-title">${r.title}</p>
        <div class="speaker-topic"><p class="topic-label">演講主題 / Topic</p><p class="topic-text">${s[3]}</p></div>
      </div>
    </article>`;
  }).join('');
}

function renderAgenda(i) {
  const a = agendas[i];
  const meta = AGENDA_META[i];
  const panel = document.getElementById('agenda-panel');
  panel.setAttribute('aria-labelledby', `tab-${i}`);
  const range = a.rows[0][0].split('–')[0] + '–' + a.rows.at(-1)[0].split('–')[1];
  const subtitle = meta.subtitle || a.title.split('：').slice(1).join('：');
  const minutes = t => Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]);

  function person(id) {
    const s = speakers[id];
    return `<div class="talk-person"><img src="assets/${s[4]}" width="44" height="44" loading="lazy" alt=""><div><strong>${s[1]}</strong><span>${s[2]}</span>${id === 1 ? '<span>ITRI｜Vice President and Senior Expert</span>' : ''}</div></div>`;
  }

  const rows = a.rows.map(r => {
    const ids = r[2] == null ? [] : Array.isArray(r[2]) ? r[2] : [r[2]];
    const times = r[0].split('–');
    const duration = minutes(times[1]) - minutes(times[0]);
    const kind = ids.length ? 'talk' : r[1] === '中場休息' ? 'break' : 'event';
    const org = /Corning|康寧/.test(r[1]) ? 'corning' : 'itri';
    const body = kind === 'talk'
      ? `<p class="session-tag ${org}">${r[1]}</p>` + ids.map(id => `<div class="talk"><h4>${speakers[id][3]}</h4>${person(id)}</div>`).join('')
      : `<h4 class="session-label">${r[1]}</h4>`;
    return `<li class="slot ${kind}">
      <div class="slot-time"><time datetime="2026-11-19T${times[0]}:00+08:00">${r[0]}</time><span>${duration} 分鐘</span></div>
      <div class="slot-body">${body}${r[3] ? `<p class="slot-note">${r[3]}</p>` : ''}</div>
    </li>`;
  }).join('');

  panel.innerHTML = `<div class="panel-head">
      <div class="panel-title"><p class="panel-kicker">${meta.kicker || a.en}</p><h3>${meta.heading}</h3><p class="panel-sub">${subtitle}</p></div>
      <div class="panel-range"><span>SESSION TIME</span><strong>${range}</strong></div>
      <p class="panel-location">${ICON_PIN}<span>${a.location}</span></p>
    </div>
    <ol class="slots">${rows}</ol>`;
}

document.querySelectorAll('[data-filter]').forEach(b => {
  const f = b.dataset.filter;
  b.querySelector('.count').textContent = f === 'all' ? speakers.length : speakers.filter(s => s[0] === f).length;
  b.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(x => {
      x.classList.toggle('active', x === b);
      x.setAttribute('aria-pressed', x === b);
    });
    renderSpeakers(f);
  });
});

const tabs = [...document.querySelectorAll('[data-tab]')];
function selectTab(b) {
  tabs.forEach(x => {
    x.classList.toggle('active', x === b);
    x.setAttribute('aria-selected', x === b);
    x.tabIndex = x === b ? 0 : -1;
  });
  renderAgenda(+b.dataset.tab);
}
tabs.forEach((b, i) => {
  b.addEventListener('click', () => selectTab(b));
  b.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const j = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    selectTab(tabs[j]);
    tabs[j].focus();
  });
});

const toTop = document.querySelector('.to-top');
const syncToTop = () => toTop.classList.toggle('show', scrollY > 900);
addEventListener('scroll', syncToTop, {passive: true});
syncToTop();

renderSpeakers();
selectTab(tabs[0]);
