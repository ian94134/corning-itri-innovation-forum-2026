const ICON_PIN = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>';

function roleHtml(role) {
  const [org, ...rest] = role.split('｜');
  return `<span class="role-org ${org === 'Corning' ? 'corning' : 'itri'}">${org}</span>${ui.roleSep}${rest.join('｜')}`;
}

function renderSpeakers(filter = 'all') {
  const list = speakers.filter(s => filter === 'all' || s[0] === filter);
  document.getElementById('filter-status').textContent = (filter === 'all' ? ui.allSpeakers : filter) + ' · ' + ui.speakerCount(list.length);
  document.getElementById('speaker-grid').innerHTML = list.map(s => {
    return `<article class="speaker-card">
      <div class="speaker-photo"><img loading="lazy" width="400" height="400" src="${ui.assetBase}${s[4]}" alt="${s[1]}"><span class="forum-tag">${s[0]}</span></div>
      <div class="speaker-body">
        <h3>${s[1]}</h3>
        <p class="speaker-title">${roleHtml(s[2])}</p>
        <div class="speaker-topic"><p class="topic-label">${ui.topicLabel}</p><p class="topic-text">${s[3]}</p></div>
      </div>
    </article>`;
  }).join('');
}

function renderAgenda(i) {
  const a = agendas[i];
  const panel = document.getElementById('agenda-panel');
  panel.setAttribute('aria-labelledby', `tab-${i}`);
  const range = a.rows[0][0].split('–')[0] + '–' + a.rows.at(-1)[0].split('–')[1];
  const minutes = t => Number(t.split(':')[0]) * 60 + Number(t.split(':')[1]);

  function person(id) {
    const s = speakers[id];
    return `<div class="talk-person"><img src="${ui.assetBase}${s[4]}" width="44" height="44" loading="lazy" alt=""><div><strong>${s[1]}</strong><span>${roleHtml(s[2])}</span>${s[5] ? `<span>${s[5]}</span>` : ''}</div></div>`;
  }

  const rows = a.rows.map(r => {
    const ids = r[2] == null ? [] : Array.isArray(r[2]) ? r[2] : [r[2]];
    const times = r[0].split('–');
    const duration = minutes(times[1]) - minutes(times[0]);
    const kind = ids.length ? 'talk' : r[1] === ui.breakLabel ? 'break' : 'event';
    const org = /Corning|康寧/.test(r[1]) ? 'corning' : 'itri';
    const body = kind === 'talk'
      ? `<p class="session-tag ${org}">${r[1]}</p>` + ids.map(id => `<div class="talk"><h4>${speakers[id][3]}</h4>${person(id)}</div>`).join('')
      : `<h4 class="session-label">${r[1]}</h4>`;
    return `<li class="slot ${kind}">
      <div class="slot-time"><time datetime="2026-11-19T${times[0]}:00+08:00">${r[0]}</time><span>${duration} ${ui.minutes}</span></div>
      <div class="slot-body">${body}${r[3] ? `<p class="slot-note">${r[3]}</p>` : ''}</div>
    </li>`;
  }).join('');

  panel.innerHTML = `<div class="panel-head">
      <div class="panel-title"><p class="panel-kicker">${a.kicker}</p><h3>${a.heading}</h3>${a.subtitle ? `<p class="panel-sub">${a.subtitle}</p>` : ''}</div>
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
