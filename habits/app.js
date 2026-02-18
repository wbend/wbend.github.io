/* ─────────────────────────────────────────────────────────────────
   Habit Tracker — app.js
   All logic, no frameworks, no build tools.
   Data lives in localStorage under key 'habitTracker'.
───────────────────────────────────────────────────────────────── */

'use strict';

// ─── Storage helpers ────────────────────────────────────────────────
const STORAGE_KEY = 'habitTracker';
const DRAFT_KEY   = 'habitTrackerDraft';

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveDataLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveData(data) {
  saveDataLocal(data);
  gistPush(data); // fire-and-forget
}

function loadDraft() {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY)) || null;
  } catch { return null; }
}

function saveDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

// ─── Crypto helpers ─────────────────────────────────────────────────
async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Date helpers ───────────────────────────────────────────────────
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatDate(iso) {
  const [y,m,d] = iso.split('-').map(Number);
  return new Date(y, m-1, d).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}

function formatDay(iso) {
  const [y,m,d] = iso.split('-').map(Number);
  return new Date(y, m-1, d).toLocaleDateString('en-US', { weekday:'long' });
}

function formatShortDay(iso) {
  const [y,m,d] = iso.split('-').map(Number);
  return new Date(y, m-1, d).toLocaleDateString('en-US', { weekday:'short' });
}

// ─── Scoring ────────────────────────────────────────────────────────
const SCORED_HABITS = [
  'noAlcohol','calorieLimitMet','exercises','writingCoding',
  'jobApplication','russianPractice','drumPractice'
];

function calcScore(entry) {
  let done = 0;
  if (entry.noAlcohol)        done++;
  if (entry.calorieLimitMet)  done++;
  if (Array.isArray(entry.exercises) && entry.exercises.length > 0) done++;
  if (entry.writingCoding)    done++;
  if (entry.jobApplication)   done++;
  if (entry.russianPractice)  done++;
  if (entry.drumPractice)     done++;
  return Math.round((done / 7) * 100);
}

function calcStreak(entries) {
  const today = todayISO();
  const sortedDates = Object.keys(entries).sort().reverse();
  let streak = 0;

  // Streak counts today if it has score > 0, otherwise start from yesterday
  let cursor = new Date(today);

  for (let i = 0; i < 365; i++) {
    const iso = cursor.toISOString().split('T')[0];
    const entry = entries[iso];
    if (entry && entry.score > 0) {
      streak++;
    } else if (i === 0) {
      // Today not logged yet — check from yesterday
    } else {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function calcLongestStreak(entries) {
  const dates = Object.keys(entries).filter(d => entries[d].score > 0).sort();
  if (!dates.length) return 0;
  let longest = 1, current = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i-1]);
    const curr = new Date(dates[i]);
    const diff = (curr - prev) / 86400000;
    if (diff === 1) { current++; if (current > longest) longest = current; }
    else current = 1;
  }
  return longest;
}

// ─── Motivational lines ─────────────────────────────────────────────
function motivation(score) {
  if (score === 100) return "Perfect day. Absolute legend.";
  if (score >= 86)  return "Outstanding — almost flawless.";
  if (score >= 71)  return "Solid day. Keep the momentum.";
  if (score >= 57)  return "Good progress. Push a little harder tomorrow.";
  if (score >= 43)  return "Something is always better than nothing.";
  if (score >= 29)  return "Tough day. Tomorrow's a fresh start.";
  if (score >= 14)  return "At least you showed up.";
  return "Every streak starts with one day.";
}

// ─── Default exercises ──────────────────────────────────────────────
const DEFAULT_EXERCISES = [
  'Gym / Strength Training','Run','Walk','Bike','Swim'
];

// Default gym exercises/stretches (from historical notes)
const DEFAULT_GYM_EXERCISES = [
  { name: 'Bench press' },
  { name: 'Leg extension' },
  { name: 'RDL' },
  { name: 'Lat pulldown' },
  { name: 'Overhead press' },
  { name: 'Curls' },
  { name: 'Yes machine' },
  { name: 'No machine' },
  { name: 'Goblet squat' },
  { name: 'Plank' },
  { name: 'Ab wheel' },
  { name: 'Cable row' },
  { name: 'Couch stretch',      isStretch: true },
  { name: '90/90 hip stretch',  isStretch: true },
  { name: 'Deep squat hold',    isStretch: true },
];

// ─── App state ──────────────────────────────────────────────────────
let currentView = 'today';
let historyPage = 0;
const HISTORY_PER_PAGE = 15;
let statsRange = '7';
let expandedHistoryDate = null;

// ─── Boot ────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initPinGate();
});

// ─── PIN Gate ────────────────────────────────────────────────────────
function initPinGate() {
  const data = loadData();
  const gate = document.getElementById('pin-gate');
  const app  = document.getElementById('app');

  // Already unlocked this session?
  if (sessionStorage.getItem('htUnlocked') === '1') {
    gate.classList.add('hidden');
    app.classList.remove('hidden');
    initApp();
    return;
  }

  gate.classList.remove('hidden');

  if (!data.pin) {
    // First-time: show set-PIN form
    document.getElementById('gate-set').classList.remove('hidden');
    setupSetPin();
  } else {
    // Returning: show enter-PIN form
    document.getElementById('gate-enter').classList.remove('hidden');
    setupEnterPin(data.pin);
  }
}

function setupSetPin() {
  const btn = document.getElementById('pin-set-btn');
  const err = document.getElementById('gate-set-error');

  const submit = async () => {
    const a = document.getElementById('pin-set-input').value;
    const b = document.getElementById('pin-confirm-input').value;
    err.classList.add('hidden');
    if (a.length < 4) {
      err.textContent = 'PIN must be at least 4 digits.';
      err.classList.remove('hidden'); return;
    }
    if (a !== b) {
      err.textContent = 'PINs do not match.';
      err.classList.remove('hidden'); return;
    }
    const hash = await sha256(a);
    const data = loadData();
    data.pin = hash;
    if (!data.exercises) data.exercises = DEFAULT_EXERCISES.slice();
    if (!data.entries) data.entries = {};
    saveData(data);
    unlockApp();
  };

  btn.addEventListener('click', submit);
  ['pin-set-input','pin-confirm-input'].forEach(id =>
    document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') submit(); })
  );
  setupGateSync();
}

function setupEnterPin(storedHash) {
  const btn = document.getElementById('pin-enter-btn');
  const err = document.getElementById('gate-enter-error');
  const inp = document.getElementById('pin-enter-input');

  const submit = async () => {
    const val = inp.value;
    err.classList.add('hidden');
    const hash = await sha256(val);
    if (hash === storedHash) {
      unlockApp();
    } else {
      err.classList.remove('hidden');
      inp.value = '';
      inp.focus();
    }
  };

  btn.addEventListener('click', submit);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
  inp.focus();
}

function unlockApp() {
  sessionStorage.setItem('htUnlocked', '1');
  document.getElementById('pin-gate').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  initApp();
  syncFromGist(); // pull latest data in background
}

// ─── App init ────────────────────────────────────────────────────────
function initApp() {
  setupNav();
  routeToHash();
  window.addEventListener('hashchange', routeToHash);
}

function setupNav() {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });
}

function routeToHash() {
  const hash = window.location.hash.replace('#','') || 'today';
  showView(hash);
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.view === hash);
  });
}

function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById(`view-${name}`);
  if (el) {
    el.classList.remove('hidden');
    if (name === 'today')   renderToday();
    if (name === 'history') renderHistory();
    if (name === 'stats')   renderStats();
  }
}

// ─── TODAY VIEW ──────────────────────────────────────────────────────
function renderToday() {
  const today = todayISO();
  const data  = loadData();
  const entry = data.entries && data.entries[today];

  if (entry && entry.completedAt) {
    showLoggedCard(today, entry, data);
  } else {
    showTodayForm(today, data, entry);
  }
}

function showLoggedCard(dateISO, entry, data) {
  document.getElementById('today-logged').classList.remove('hidden');
  document.getElementById('today-form').classList.add('hidden');

  document.getElementById('tl-date').textContent = formatDate(dateISO) + ' · ' + formatDay(dateISO);
  document.getElementById('tl-score').textContent = entry.score;

  const streak = calcStreak(data.entries || {});
  document.getElementById('tl-streak').textContent = streak === 1
    ? '🔥 1 day streak' : streak > 1 ? `🔥 ${streak} day streak` : '';
  document.getElementById('tl-motivation').textContent = motivation(entry.score);

  document.getElementById('edit-today-btn').onclick = () => {
    openEditPanel(dateISO, entry);
  };
}

function showTodayForm(dateISO, data, draftFromEntry) {
  document.getElementById('today-logged').classList.add('hidden');
  document.getElementById('today-form').classList.remove('hidden');

  // Date header
  const dateEl = document.getElementById('form-date');
  dateEl.textContent = formatDate(dateISO) + ' · ' + formatDay(dateISO);

  // Evening reminder
  const hour = new Date().getHours();
  const reminderEl = document.getElementById('evening-reminder');
  if (hour >= 20) reminderEl.classList.remove('hidden');
  else reminderEl.classList.add('hidden');

  // Restore draft or start fresh
  const draft = loadDraft() || {};

  // Exercises
  if (!data.exercises) {
    data.exercises = DEFAULT_EXERCISES.slice();
    saveData(data);
  }
  renderExerciseList(data.exercises, draft.exercises || [], draft.gymLog || []);

  // Habit toggles
  const habits = ['noAlcohol','calorieLimitMet','writingCoding','jobApplication','russianPractice','drumPractice'];
  habits.forEach(h => {
    const row = document.querySelector(`.habit-row[data-habit="${h}"]`);
    if (!row) return;
    if (draft[h]) row.classList.add('checked');
    else row.classList.remove('checked');

    row.onclick = () => {
      row.classList.toggle('checked');
      autosaveDraft();
    };
  });

  // Calories
  const calInput = document.getElementById('calories-input');
  calInput.value = draft.calories && draft.calories !== 'n/a' ? draft.calories : '';
  calInput.oninput = autosaveDraft;

  // Notes
  document.getElementById('exercise-notes').value = draft.exerciseNotes || '';
  document.getElementById('food-notes').value      = draft.foodNotes || '';
  document.getElementById('exercise-notes').oninput = autosaveDraft;
  document.getElementById('food-notes').oninput     = autosaveDraft;

  // Notes toggle
  const notesToggle = document.getElementById('notes-toggle');
  const notesCard   = document.querySelector('.notes-card');
  const notesBody   = document.getElementById('notes-body');
  notesToggle.onclick = () => {
    const open = notesBody.classList.toggle('hidden') === false;
    notesCard.classList.toggle('notes-open', open);
  };
  // Re-add exercise listener
  document.getElementById('add-exercise-btn').onclick = addExerciseType;
  document.getElementById('add-exercise-input').onkeydown = e => {
    if (e.key === 'Enter') addExerciseType();
  };

  // Cleanup buttons
  wireCleanupButtons(document.getElementById('today-form'));

  // Save button
  document.getElementById('save-today-btn').onclick = saveToday;
}

function renderExerciseList(allTypes, checkedTypes, gymLog) {
  const list = document.getElementById('exercise-list');
  list.innerHTML = '';

  // Find the one checked type (exercises are mutually exclusive)
  const activeType = checkedTypes.find(t => allTypes.includes(t)) || null;

  allTypes.forEach(type => {
    const isGym = type === 'Gym / Strength Training';
    const isChecked = type === activeType;

    const item = document.createElement('div');
    item.className = 'exercise-item' + (isChecked ? ' checked' : '');
    item.dataset.type = type;
    item.innerHTML = `<div class="exercise-checkbox"></div><div class="exercise-name">${escHtml(type)}</div>`;
    list.appendChild(item);

    if (isGym) {
      const panel = document.createElement('div');
      panel.className = 'gym-detail-panel' + (isChecked ? '' : ' hidden');
      list.appendChild(panel);
      renderGymDetailPanel(panel, gymLog || []);

      item.onclick = () => {
        const wasChecked = item.classList.contains('checked');
        // Deselect all
        list.querySelectorAll('.exercise-item').forEach(el => el.classList.remove('checked'));
        list.querySelectorAll('.gym-detail-panel').forEach(el => el.classList.add('hidden'));
        if (!wasChecked) {
          item.classList.add('checked');
          panel.classList.remove('hidden');
        }
        autosaveDraft();
      };
    } else {
      item.onclick = () => {
        const wasChecked = item.classList.contains('checked');
        list.querySelectorAll('.exercise-item').forEach(el => el.classList.remove('checked'));
        list.querySelectorAll('.gym-detail-panel').forEach(el => el.classList.add('hidden'));
        if (!wasChecked) item.classList.add('checked');
        autosaveDraft();
      };
    }
  });
}

function addExerciseType() {
  const inp = document.getElementById('add-exercise-input');
  const name = inp.value.trim();
  if (!name) return;
  const data = loadData();
  if (!data.exercises) data.exercises = DEFAULT_EXERCISES.slice();
  if (!data.exercises.includes(name)) {
    data.exercises.push(name);
    saveData(data);
  }
  // Preserve current checked state and gym log
  const checkedExercises = getCheckedExercises();
  if (!checkedExercises.includes(name)) checkedExercises.push(name);
  const gymPanel = document.getElementById('exercise-list')?.querySelector('.gym-detail-panel');
  const gymLog = gymPanel ? collectGymLog(gymPanel) : [];
  renderExerciseList(data.exercises, checkedExercises, gymLog);
  inp.value = '';
  autosaveDraft();
  document.getElementById('add-exercise-btn').onclick = addExerciseType;
  document.getElementById('add-exercise-input').onkeydown = e => {
    if (e.key === 'Enter') addExerciseType();
  };
}

// ─── Gym detail panel ────────────────────────────────────────────────
function getLastGymLog(excludeDate) {
  const data = loadData();
  const entries = data.entries || {};
  const dates = Object.keys(entries).sort().reverse();
  for (const d of dates) {
    if (d === excludeDate) continue;
    const entry = entries[d];
    if (entry.gymLog && entry.gymLog.length > 0) return entry.gymLog;
  }
  return [];
}

function renderGymDetailPanel(container, gymLog) {
  const data = loadData();
  if (!data.gymExercises) {
    data.gymExercises = DEFAULT_GYM_EXERCISES.map(e => ({ ...e }));
    saveData(data);
  }

  const logMap = {};
  (gymLog || []).forEach(e => { logMap[e.name] = e; });

  // Pre-fill weight/sets from last logged gym session if not in current log
  const lastLog = getLastGymLog();
  const lastLogMap = {};
  lastLog.forEach(e => { lastLogMap[e.name] = e; });

  const lifts    = data.gymExercises.filter(e => !e.isStretch);
  const stretches = data.gymExercises.filter(e => e.isStretch);

  container.innerHTML = `
    <div class="gym-section">
      ${lifts.length ? `
        <div class="gym-section-label">Exercises</div>
        <div class="gym-lifts">
          ${lifts.map(ex => gymExRowHTML(ex, logMap[ex.name], lastLogMap[ex.name])).join('')}
        </div>` : ''}
      ${stretches.length ? `
        <div class="gym-section-label gym-section-label--stretch">Stretches</div>
        <div class="gym-stretches">
          ${stretches.map(ex => gymExRowHTML(ex, logMap[ex.name], lastLogMap[ex.name])).join('')}
        </div>` : ''}
      <div class="gym-add-row">
        <input type="text" class="gym-add-input" placeholder="Add exercise or stretch…">
        <label class="gym-stretch-toggle">
          <input type="checkbox" class="gym-add-is-stretch"> Stretch
        </label>
        <button class="btn btn-secondary gym-add-btn">Add</button>
      </div>
    </div>
  `;

  // Determine if we should autosave (only in today form, not edit panel)
  const inTodayForm = !!container.closest('#today-form');

  container.querySelectorAll('.gym-ex-row').forEach(row => {
    row.onclick = () => {
      row.classList.toggle('checked');
      if (inTodayForm) autosaveDraft();
    };
    row.querySelectorAll('input[type="text"]').forEach(inp => {
      inp.onclick = e => e.stopPropagation();
      inp.oninput = () => { if (inTodayForm) autosaveDraft(); };
    });
  });

  const addBtn       = container.querySelector('.gym-add-btn');
  const addInp       = container.querySelector('.gym-add-input');
  const addIsStretch = container.querySelector('.gym-add-is-stretch');

  const doAdd = () => {
    const name = addInp.value.trim();
    if (!name) return;
    const isStretch = addIsStretch.checked;
    const d = loadData();
    if (!d.gymExercises) d.gymExercises = DEFAULT_GYM_EXERCISES.map(e => ({ ...e }));
    if (!d.gymExercises.find(e => e.name.toLowerCase() === name.toLowerCase())) {
      d.gymExercises.push({ name, ...(isStretch ? { isStretch: true } : {}) });
      saveData(d);
    }
    const currentLog = collectGymLog(container);
    if (!currentLog.find(e => e.name.toLowerCase() === name.toLowerCase())) {
      currentLog.push({ name, weight: '', sets: '', done: true, isStretch });
    }
    renderGymDetailPanel(container, currentLog);
    if (inTodayForm) autosaveDraft();
  };

  addBtn.onclick = doAdd;
  addInp.onkeydown = e => { if (e.key === 'Enter') doAdd(); };
}

function gymExRowHTML(ex, logEntry, lastEntry) {
  const checked   = logEntry?.done ? ' checked' : '';
  // Use current entry's values, fall back to last session's values
  const weight    = escHtml(logEntry?.weight || lastEntry?.weight || '');
  const sets      = escHtml(logEntry?.sets   || lastEntry?.sets   || '');
  const isStretch = ex.isStretch ? '1' : '0';
  const wPh = ex.isStretch ? 'Duration' : 'Weight';
  const sPh = ex.isStretch ? 'e.g. 90s/side' : 'e.g. 3×8';
  return `<div class="gym-ex-row${checked}" data-name="${escHtml(ex.name)}" data-is-stretch="${isStretch}">
    <div class="gym-ex-check"></div>
    <div class="gym-ex-name">${escHtml(ex.name)}</div>
    <input type="text" class="gym-ex-weight" placeholder="${wPh}" value="${weight}">
    <input type="text" class="gym-ex-sets"   placeholder="${sPh}"  value="${sets}">
  </div>`;
}

function collectGymLog(container) {
  return Array.from(container.querySelectorAll('.gym-ex-row')).map(row => ({
    name:      row.dataset.name,
    weight:    row.querySelector('.gym-ex-weight')?.value.trim() || '',
    sets:      row.querySelector('.gym-ex-sets')?.value.trim() || '',
    done:      row.classList.contains('checked'),
    isStretch: row.dataset.isStretch === '1',
  }));
}

function getCheckedExercises() {
  return Array.from(document.querySelectorAll('.exercise-item.checked'))
    .map(el => el.dataset.type);
}

function autosaveDraft() {
  const draft = collectFormValues();
  saveDraft(draft);
}

function collectFormValues() {
  const vals = {};
  ['noAlcohol','calorieLimitMet','writingCoding','jobApplication','russianPractice','drumPractice'].forEach(h => {
    const row = document.querySelector(`.habit-row[data-habit="${h}"]`);
    vals[h] = row ? row.classList.contains('checked') : false;
  });
  const calVal = document.getElementById('calories-input').value.trim();
  vals.calories = calVal || 'n/a';
  vals.exercises     = getCheckedExercises();
  vals.exerciseNotes = document.getElementById('exercise-notes').value;
  vals.foodNotes     = document.getElementById('food-notes').value;
  const gymPanel = document.getElementById('exercise-list')?.querySelector('.gym-detail-panel');
  vals.gymLog = gymPanel ? collectGymLog(gymPanel) : [];
  return vals;
}

function saveToday() {
  const vals  = collectFormValues();
  const today = todayISO();
  const score = calcScore(vals);
  const entry = {
    ...vals,
    score,
    completedAt: new Date().toISOString()
  };
  const data = loadData();
  if (!data.entries) data.entries = {};
  data.entries[today] = entry;
  saveData(data);
  clearDraft();

  showScoreReveal(score, calcStreak(data.entries));
}

function showScoreReveal(score, streak) {
  const reveal = document.getElementById('score-reveal');
  reveal.classList.remove('hidden');

  const numEl = document.getElementById('reveal-number');
  numEl.classList.toggle('perfect', score === 100);
  numEl.textContent = '0';

  document.getElementById('reveal-streak').textContent =
    streak > 0 ? `🔥 ${streak} day${streak===1?'':'s'} streak` : '';
  document.getElementById('reveal-motivation').textContent = motivation(score);

  // Count-up animation
  let current = 0;
  const duration = 800;
  const steps = 40;
  const increment = score / steps;
  const interval = duration / steps;
  const timer = setInterval(() => {
    current = Math.min(current + increment, score);
    numEl.textContent = Math.round(current);
    if (current >= score) { clearInterval(timer); numEl.textContent = score; }
  }, interval);

  if (score === 100) launchConfetti();

  document.getElementById('reveal-close-btn').onclick = () => {
    reveal.classList.add('hidden');
    renderToday();
  };
}

// ─── Confetti ────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#3498db','#27ae60','#f39c12','#e74c3c','#9b59b6','#1abc9c'];

function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = [
      `left: ${Math.random()*100}%`,
      `background: ${CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)]}`,
      `width: ${6+Math.random()*8}px`,
      `height: ${8+Math.random()*10}px`,
      `border-radius: ${Math.random() > .5 ? '50%' : '2px'}`,
      `animation-duration: ${1.5+Math.random()*2}s`,
      `animation-delay: ${Math.random()*.8}s`,
    ].join(';');
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 4000);
}

// ─── HISTORY VIEW ────────────────────────────────────────────────────
function renderHistory() {
  const data    = loadData();
  const entries = data.entries || {};
  const dates   = Object.keys(entries).sort().reverse();

  const tbody   = document.getElementById('history-body');
  const emptyEl = document.getElementById('history-empty');
  const tableWrap = document.getElementById('history-table-wrap');

  if (!dates.length) {
    emptyEl.classList.remove('hidden');
    document.getElementById('history-table').classList.add('hidden');
    document.getElementById('history-pagination').innerHTML = '';
    return;
  }

  emptyEl.classList.add('hidden');
  document.getElementById('history-table').classList.remove('hidden');

  const totalPages = Math.ceil(dates.length / HISTORY_PER_PAGE);
  if (historyPage >= totalPages) historyPage = 0;

  const pageDates = dates.slice(
    historyPage * HISTORY_PER_PAGE,
    (historyPage + 1) * HISTORY_PER_PAGE
  );

  tbody.innerHTML = '';
  pageDates.forEach(d => {
    const e = entries[d];
    tbody.appendChild(buildHistoryRow(d, e));
    if (expandedHistoryDate === d) {
      tbody.appendChild(buildExpandRow(d, e));
    }
  });

  renderPagination(totalPages);
}

function buildHistoryRow(dateISO, e) {
  const tr = document.createElement('tr');
  tr.className = 'data-row';
  tr.dataset.date = dateISO;

  const sc = e.score;
  const pillClass = sc >= 71 ? 'high' : sc >= 43 ? 'mid' : 'low';
  const ex = Array.isArray(e.exercises) && e.exercises.length > 0;

  tr.innerHTML = `
    <td>${formatDate(dateISO)}</td>
    <td>${formatShortDay(dateISO)}</td>
    <td><span class="score-pill ${pillClass}">${sc}</span></td>
    <td class="habit-col">${chk(e.noAlcohol)}</td>
    <td class="habit-col">${chk(e.calorieLimitMet)}</td>
    <td class="habit-col">${chk(ex)}</td>
    <td class="habit-col">${chk(e.writingCoding)}</td>
    <td class="habit-col">${chk(e.jobApplication)}</td>
    <td class="habit-col">${chk(e.russianPractice)}</td>
    <td class="habit-col">${chk(e.drumPractice)}</td>
  `;

  tr.onclick = () => {
    if (expandedHistoryDate === dateISO) {
      expandedHistoryDate = null;
    } else {
      expandedHistoryDate = dateISO;
    }
    renderHistory();
  };
  return tr;
}

function buildExpandRow(dateISO, e) {
  const tr = document.createElement('tr');
  tr.className = 'expand-row';

  const exList = Array.isArray(e.exercises) && e.exercises.length
    ? e.exercises.join(', ') : '—';

  let gymLogHTML = '';
  if (e.gymLog && e.gymLog.some(g => g.done)) {
    const items = e.gymLog.filter(g => g.done).map(g => {
      const detail = [g.weight, g.sets].filter(Boolean).join(' · ');
      return escHtml(g.name) + (detail ? ` <span style="color:var(--text-faint)">(${escHtml(detail)})</span>` : '');
    });
    gymLogHTML = `<div><strong>Gym log:</strong> ${items.join(', ')}</div>`;
  }

  const notes = [
    gymLogHTML,
    e.exerciseNotes ? `<div><strong>Exercise notes:</strong> ${escHtml(e.exerciseNotes)}</div>` : '',
    e.foodNotes     ? `<div><strong>Food:</strong> ${escHtml(e.foodNotes)}</div>` : '',
    e.calories && e.calories !== 'n/a' ? `<div><strong>Calories:</strong> ${escHtml(e.calories)}</div>` : '',
  ].filter(Boolean).join('') || '<div>No notes.</div>';

  const colspan = 10;
  tr.innerHTML = `<td colspan="${colspan}">
    <div class="expand-inner">
      <div><strong>Exercise:</strong> ${escHtml(exList)}</div>
      ${notes}
      <button class="btn btn-secondary expand-edit-btn" data-date="${dateISO}">Edit entry</button>
    </div>
  </td>`;

  tr.querySelector('.expand-edit-btn').onclick = (ev) => {
    ev.stopPropagation();
    const data = loadData();
    openEditPanel(dateISO, data.entries[dateISO]);
  };
  return tr;
}

function chk(val) {
  return val
    ? '<span class="check-yes">✓</span>'
    : '<span class="check-no">–</span>';
}

function renderPagination(totalPages) {
  const el = document.getElementById('history-pagination');
  el.innerHTML = '';
  if (totalPages <= 1) return;
  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === historyPage ? ' active' : '');
    btn.textContent = i + 1;
    btn.onclick = () => { historyPage = i; renderHistory(); };
    el.appendChild(btn);
  }
}

// ─── Edit panel ──────────────────────────────────────────────────────
function openEditPanel(dateISO, entry) {
  const panel = document.getElementById('history-edit-panel');
  panel.classList.remove('hidden');
  document.getElementById('edit-panel-date').textContent =
    formatDate(dateISO) + ' · ' + formatDay(dateISO);

  const body = document.getElementById('edit-panel-body');
  body.innerHTML = buildFormHTML(dateISO, entry);
  wireFormEvents(body, dateISO, entry);

  document.getElementById('edit-panel-close').onclick = () => {
    panel.classList.add('hidden');
  };

  document.getElementById('edit-save-btn').onclick = () => {
    const vals = collectFormValuesFrom(body);
    const score = calcScore(vals);
    const data = loadData();
    data.entries[dateISO] = {
      ...vals,
      score,
      completedAt: data.entries[dateISO]?.completedAt || new Date().toISOString()
    };
    saveData(data);
    panel.classList.add('hidden');
    if (currentView === 'today' && dateISO === todayISO()) renderToday();
    if (currentView === 'history') renderHistory();
  };
}

function buildFormHTML(dateISO, e) {
  const data = loadData();
  const allExercises = data.exercises || DEFAULT_EXERCISES;

  const habitRows = [
    ['noAlcohol',       'No Alcohol'],
    ['calorieLimitMet', 'Calorie Limit Met'],
    ['writingCoding',   'Writing / Coding'],
    ['jobApplication',  'Job Application'],
    ['russianPractice', 'Russian Practice'],
    ['drumPractice',    'Drum Practice'],
  ].map(([k, label]) => {
    const checked = e && e[k] ? ' checked' : '';
    return `<div class="habit-row${checked}" data-habit="${k}">
      <div class="habit-toggle"></div>
      <div class="habit-label">${label}</div>
      ${k === 'calorieLimitMet' ? `<input type="text" class="calorie-input edit-calories" placeholder="kcal" value="${e && e.calories && e.calories !== 'n/a' ? e.calories : ''}">` : ''}
    </div>`;
  }).join('');

  const exerciseItems = allExercises.map(t => {
    const checked = e && Array.isArray(e.exercises) && e.exercises.includes(t) ? ' checked' : '';
    const isGym = t === 'Gym / Strength Training';
    return `<div class="exercise-item${checked}" data-type="${escHtml(t)}">
      <div class="exercise-checkbox"></div>
      <div class="exercise-name">${escHtml(t)}</div>
    </div>${isGym ? '<div class="gym-detail-panel edit-gym-panel"></div>' : ''}`;
  }).join('');

  return `
    <div class="card">${habitRows}</div>
    <div class="card">
      <div class="card-title">Exercise</div>
      <div class="edit-exercise-list">${exerciseItems}</div>
    </div>
    <div class="card">
      <div class="card-title">Notes</div>
      <label class="notes-label">Exercise Notes</label>
      <div class="notes-textarea-wrap">
        <textarea class="edit-exercise-notes">${escHtml(e?.exerciseNotes||'')}</textarea>
        <button class="btn-cleanup" data-type="exercise" title="Clean up with AI">✨</button>
      </div>
      <label class="notes-label" style="margin-top:10px">Food Notes</label>
      <div class="notes-textarea-wrap">
        <textarea class="edit-food-notes">${escHtml(e?.foodNotes||'')}</textarea>
        <button class="btn-cleanup" data-type="food" title="Clean up with AI">✨</button>
      </div>
    </div>
  `;
}

function wireFormEvents(container, dateISO, entry) {
  container.querySelectorAll('.habit-row').forEach(row => {
    row.onclick = () => row.classList.toggle('checked');
  });

  const gymLog = entry?.gymLog || [];

  const exItems = container.querySelectorAll('.exercise-item');
  exItems.forEach(item => {
    const isGym = item.dataset.type === 'Gym / Strength Training';
    item.onclick = () => {
      const wasChecked = item.classList.contains('checked');
      // Mutually exclusive — deselect all first
      exItems.forEach(el => el.classList.remove('checked'));
      container.querySelectorAll('.edit-gym-panel').forEach(el => el.classList.add('hidden'));
      if (!wasChecked) {
        item.classList.add('checked');
        if (isGym) {
          const panel = item.nextElementSibling;
          if (panel?.classList.contains('edit-gym-panel')) panel.classList.remove('hidden');
        }
      }
    };
  });

  // Render gym detail panel in edit form
  const gymItem  = container.querySelector('.exercise-item[data-type="Gym / Strength Training"]');
  const gymPanel = container.querySelector('.edit-gym-panel');
  if (gymPanel) {
    if (!gymItem?.classList.contains('checked')) gymPanel.classList.add('hidden');
    renderGymDetailPanel(gymPanel, gymLog);
  }

  wireCleanupButtons(container);
}

function collectFormValuesFrom(container) {
  const vals = {};
  ['noAlcohol','calorieLimitMet','writingCoding','jobApplication','russianPractice','drumPractice'].forEach(h => {
    const row = container.querySelector(`.habit-row[data-habit="${h}"]`);
    vals[h] = row ? row.classList.contains('checked') : false;
  });
  const calEl = container.querySelector('.edit-calories');
  vals.calories = calEl ? (calEl.value.trim() || 'n/a') : 'n/a';
  vals.exercises = Array.from(container.querySelectorAll('.exercise-item.checked'))
    .map(el => el.dataset.type);
  vals.exerciseNotes = (container.querySelector('.edit-exercise-notes')?.value || '').trim();
  vals.foodNotes     = (container.querySelector('.edit-food-notes')?.value || '').trim();
  const gymPanel = container.querySelector('.edit-gym-panel');
  vals.gymLog = gymPanel ? collectGymLog(gymPanel) : [];
  return vals;
}

// ─── STATS VIEW ──────────────────────────────────────────────────────
function renderStats() {
  const data    = loadData();
  const entries = data.entries || {};

  // Range selector
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      statsRange = btn.dataset.range;
      renderStats();
    });
  });

  // Filter entries by range
  const allDates = Object.keys(entries).sort();
  let filtered;
  if (statsRange === 'all') {
    filtered = allDates;
  } else {
    const n = parseInt(statsRange);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - n);
    const cutISO = cutoff.toISOString().split('T')[0];
    filtered = allDates.filter(d => d >= cutISO);
  }

  const filteredEntries = {};
  filtered.forEach(d => { filteredEntries[d] = entries[d]; });

  // Summary
  const scores = filtered.map(d => entries[d].score);
  const avg = scores.length ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : null;
  const streak = calcStreak(entries);
  const longest = calcLongestStreak(entries);

  document.getElementById('stat-avg').textContent     = avg !== null ? avg : '—';
  document.getElementById('stat-streak').textContent  = streak;
  document.getElementById('stat-longest').textContent = longest;
  document.getElementById('stat-total').textContent   = filtered.length;

  // Habit completion bars
  const HABITS = [
    ['noAlcohol',       'No Alcohol'],
    ['calorieLimitMet', 'Calories'],
    ['exercises',       'Exercise'],
    ['writingCoding',   'Writing/Coding'],
    ['jobApplication',  'Job App'],
    ['russianPractice', 'Russian'],
    ['drumPractice',    'Drums'],
  ];
  const barsEl = document.getElementById('habit-bars');
  barsEl.innerHTML = '';
  HABITS.forEach(([key, label]) => {
    const count = filtered.filter(d => {
      if (key === 'exercises') return Array.isArray(entries[d].exercises) && entries[d].exercises.length > 0;
      return !!entries[d][key];
    }).length;
    const pct = filtered.length ? Math.round((count / filtered.length) * 100) : 0;
    const row = document.createElement('div');
    row.className = 'habit-bar-row';
    row.innerHTML = `
      <div class="habit-bar-name">${label}</div>
      <div class="habit-bar-track"><div class="habit-bar-fill" style="width:${pct}%"></div></div>
      <div class="habit-bar-pct">${pct}%</div>
    `;
    barsEl.appendChild(row);
  });

  // Sparkline
  renderSparkline(filtered, entries);

  // Best / worst
  const bwEl = document.getElementById('best-worst');
  bwEl.innerHTML = '';
  if (filtered.length) {
    const best  = filtered.reduce((a,b) => entries[a].score >= entries[b].score ? a : b);
    const worst = filtered.reduce((a,b) => entries[a].score <= entries[b].score ? a : b);
    [[best,'Best day'],[worst,'Worst day']].forEach(([d, label]) => {
      const row = document.createElement('div');
      row.className = 'bw-row';
      row.innerHTML = `
        <span class="bw-label">${label}</span>
        <span class="bw-date">${formatDate(d)} — <strong>${entries[d].score}</strong></span>
      `;
      bwEl.appendChild(row);
    });
  } else {
    bwEl.textContent = 'No data in selected range.';
  }

  // Import / export
  setupDataActions();
}

function renderSparkline(dates, entries) {
  const svg = document.getElementById('sparkline');
  svg.innerHTML = '';
  if (dates.length < 2) {
    svg.innerHTML = '<text x="150" y="35" text-anchor="middle" fill="var(--text-faint)" font-size="13">Not enough data</text>';
    return;
  }

  const scores = dates.map(d => entries[d].score);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const W = 300, H = 60, PAD = 6;
  const xStep = (W - PAD*2) / (scores.length - 1);

  const points = scores.map((s, i) => {
    const x = PAD + i * xStep;
    const y = max === min ? H/2 : PAD + (1 - (s - min) / (max - min)) * (H - PAD*2);
    return [x, y];
  });

  // Area path
  const areaD = `M${points[0][0]},${H} ` +
    points.map(([x,y]) => `L${x},${y}`).join(' ') +
    ` L${points[points.length-1][0]},${H} Z`;
  const area = document.createElementNS('http://www.w3.org/2000/svg','path');
  area.setAttribute('d', areaD);
  area.setAttribute('class', 'spark-area');
  svg.appendChild(area);

  // Line path
  const lineD = 'M' + points.map(([x,y]) => `${x},${y}`).join(' L');
  const line = document.createElementNS('http://www.w3.org/2000/svg','path');
  line.setAttribute('d', lineD);
  line.setAttribute('class', 'spark-line');
  svg.appendChild(line);

  // Dots (only if few points)
  if (scores.length <= 20) {
    points.forEach(([x,y]) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('cx', x);
      dot.setAttribute('cy', y);
      dot.setAttribute('r', '3');
      dot.setAttribute('class', 'spark-dot');
      svg.appendChild(dot);
    });
  }
}

// ─── AI note cleanup ─────────────────────────────────────────────────
const API_KEY_STORE = 'habitApiKey';

async function callClaude(text, type) {
  let key = localStorage.getItem(API_KEY_STORE);
  if (!key) {
    key = prompt('Enter your Anthropic API key to use AI cleanup (stored locally):');
    if (!key) return null;
    localStorage.setItem(API_KEY_STORE, key.trim());
  }

  const systemPrompts = {
    exercise: 'You are a terse fitness logger. Format the raw exercise notes into a clean, consistent log. One exercise per line, format: "Name: weight × sets×reps" or "Stretch: duration". Fix typos. Return only the log, nothing else.',
    food: 'You are a concise culinary note-taker with a chef\'s eye. Clean up these raw cooking notes into a brief, readable chef\'s log entry. Preserve all key observations, substitutions, techniques, and ideas for next time. Return only the cleaned notes, nothing else.',
  };

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompts[type],
        messages: [{ role: 'user', content: text }],
      }),
    });

    if (res.status === 401) {
      localStorage.removeItem(API_KEY_STORE);
      alert('Invalid API key — cleared. Please try again.');
      return null;
    }
    if (!res.ok) {
      alert(`API error ${res.status}. Check console for details.`);
      console.error(await res.text());
      return null;
    }

    const data = await res.json();
    return data.content?.[0]?.text ?? null;
  } catch (err) {
    alert('Network error calling Anthropic API. See console.');
    console.error(err);
    return null;
  }
}

function wireCleanupButtons(container) {
  container.querySelectorAll('.btn-cleanup').forEach(btn => {
    btn.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wrap = btn.closest('.notes-textarea-wrap');
      const textarea = wrap?.querySelector('textarea');
      if (!textarea || !textarea.value.trim()) return;
      btn.disabled = true;
      btn.textContent = '⏳';
      const result = await callClaude(textarea.value, btn.dataset.type);
      btn.disabled = false;
      btn.textContent = '✨';
      if (result) {
        textarea.value = result;
        textarea.dispatchEvent(new Event('input'));
      }
    };
  });
}

// ─── Import / Export ─────────────────────────────────────────────────
function setupDataActions() {
  document.getElementById('import-csv-btn').onclick = () => {
    document.getElementById('import-panel').classList.toggle('hidden');
  };
  document.getElementById('import-cancel-btn').onclick = () => {
    document.getElementById('import-panel').classList.add('hidden');
    document.getElementById('import-preview').classList.add('hidden');
  };
  document.getElementById('import-file').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById('import-textarea').value = ev.target.result;
    };
    reader.readAsText(file);
  };
  document.getElementById('import-preview-btn').onclick = previewImport;
  document.getElementById('export-json-btn').onclick = exportJSON;
  document.getElementById('export-csv-btn').onclick  = exportCSV;

  // API key management
  const apiKeyInp    = document.getElementById('api-key-input');
  const apiKeyStatus = document.getElementById('api-key-status');
  const existing     = localStorage.getItem(API_KEY_STORE);
  if (existing) apiKeyInp.value = existing;

  document.getElementById('api-key-save-btn').onclick = () => {
    const val = apiKeyInp.value.trim();
    if (!val) return;
    localStorage.setItem(API_KEY_STORE, val);
    apiKeyStatus.textContent = 'API key saved.';
    apiKeyStatus.classList.remove('hidden');
    setTimeout(() => apiKeyStatus.classList.add('hidden'), 2000);
  };

  document.getElementById('api-key-clear-btn').onclick = () => {
    localStorage.removeItem(API_KEY_STORE);
    apiKeyInp.value = '';
    apiKeyStatus.textContent = 'API key cleared.';
    apiKeyStatus.classList.remove('hidden');
    setTimeout(() => apiKeyStatus.classList.add('hidden'), 2000);
  };

  setupSyncUI();
}

function previewImport() {
  const csv = document.getElementById('import-textarea').value.trim();
  if (!csv) return;
  const parsed = parseCSV(csv);
  const previewEl = document.getElementById('import-preview');

  if (!parsed.length) {
    previewEl.innerHTML = '<p>No valid rows found.</p>';
    previewEl.classList.remove('hidden');
    return;
  }

  const data = loadData();
  const existing = data.entries || {};
  const overwrite = document.getElementById('import-overwrite')?.checked;
  const newDates  = parsed.filter(e => !existing[e.date]).map(e => e.date);
  const overDates = parsed.filter(e =>  existing[e.date]).map(e => e.date);

  const summary = overwrite
    ? `<strong>${parsed.length}</strong> rows found — all will be imported (${overDates.length} existing will be overwritten).`
    : `<strong>${parsed.length}</strong> rows found. <strong>${newDates.length}</strong> new, ${overDates.length} already exist and will be skipped.`;

  const importCount = overwrite ? parsed.length : newDates.length;

  previewEl.innerHTML = `
    <p>${summary}</p>
    <div style="margin-top:8px; display:flex; gap:8px;">
      <button class="btn btn-primary" id="import-confirm-btn">Import ${importCount} entries</button>
    </div>
  `;
  previewEl.classList.remove('hidden');

  document.getElementById('import-confirm-btn').onclick = () => {
    parsed.forEach(e => {
      if (overwrite || !existing[e.date]) existing[e.date] = e.entry;
    });
    data.entries = existing;
    saveData(data);
    document.getElementById('import-panel').classList.add('hidden');
    previewEl.classList.add('hidden');
    document.getElementById('import-textarea').value = '';
    renderStats();
  };
}

// Proper CSV parser — handles quoted fields that contain newlines
function csvToRows(text) {
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } // escaped ""
      else if (c === '"') { inQ = false; }
      else { cell += c; } // newlines inside quotes are part of the cell value
    } else {
      if (c === '"') {
        inQ = true;
      } else if (c === ',') {
        row.push(cell); cell = '';
      } else if (c === '\r' || c === '\n') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); cell = '';
        if (row.some(v => v.trim())) rows.push(row);
        row = [];
      } else {
        cell += c;
      }
    }
  }
  row.push(cell);
  if (row.some(v => v.trim())) rows.push(row);
  return rows;
}

function parseCSV(csv) {
  const rows = csvToRows(csv);
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.trim().toLowerCase());

  const idx = (names) => {
    for (const n of names) {
      const i = headers.findIndex(h => h.includes(n.toLowerCase()));
      if (i !== -1) return i;
    }
    return -1;
  };

  const col = {
    date:      idx(['date']),
    alcohol:   idx(['alcohol']),
    calories:  idx(['calories consumed', 'calorie count', 'calories']),
    calMet:    idx(['calorie limit met', 'calorie limit', 'cal limit']),
    exercise:  idx(['exercise', 'workout']),
    writing:   idx(['writing', 'coding', 'write']),
    job:       idx(['job application', 'job app', 'application']),
    russian:   idx(['russian']),
    drum:      idx(['drum']),
    exNotes:   idx(['exercise notes', 'workout notes']),
    foodNotes: idx(['food notes', 'diet notes']),
  };

  const bool = (v) => /^(yes|true|1|x)$/i.test(v);

  const results = [];
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i];
    const get = (c) => (c !== -1 && cells[c] != null) ? cells[c].trim() : '';

    const dateRaw = get(col.date);
    if (!dateRaw) continue;
    const dateISO = normaliseDate(dateRaw);
    if (!dateISO) continue;

    // Skip rows with no meaningful habit/note data (e.g. pre-populated blank future rows)
    const hasContent = [col.alcohol, col.calMet, col.exercise, col.writing,
      col.job, col.russian, col.drum, col.exNotes, col.foodNotes]
      .some(c => c !== -1 && cells[c] && cells[c].trim());
    if (!hasContent) continue;

    // "Alcohol (Y/N)" column means "did you drink?" — invert for noAlcohol
    // Empty cell = no data (false), "No" = didn't drink (true), "Yes" = drank (false)
    const alcoholRaw = get(col.alcohol);
    const noAlcohol = alcoholRaw ? !bool(alcoholRaw) : false;

    // Exercise column may contain "No" / "No exercise" for days with no exercise
    const exRaw = get(col.exercise);
    const exercises = (exRaw && !/^(no|none|n\/a)$/i.test(exRaw))
      ? exRaw.split(/[,;|]/).map(s => s.trim()).filter(Boolean)
      : [];

    const exerciseNotes = get(col.exNotes);

    // Parse exercise notes into structured gymLog so last-session defaults work
    const gymLog = exerciseNotes ? parseExerciseNotes(exerciseNotes) : [];

    const entry = {
      noAlcohol,
      calories:        get(col.calories) || 'n/a',
      calorieLimitMet: bool(get(col.calMet)),
      exercises,
      writingCoding:   bool(get(col.writing)),
      jobApplication:  bool(get(col.job)),
      russianPractice: bool(get(col.russian)),
      drumPractice:    bool(get(col.drum)),
      exerciseNotes,
      foodNotes:       get(col.foodNotes),
      gymLog,
      score:           0,
      completedAt:     dateISO + 'T21:00:00',
    };
    entry.score = calcScore(entry);
    results.push({ date: dateISO, entry });
  }
  return results;
}

// Parse free-text exercise notes into structured gymLog rows.
// Handles patterns like:
//   "bench press 90 3x8"   → { name, weight:"90", sets:"3x8" }
//   "curls 3x30"           → { name, weight:"",   sets:"3x30" }
//   "couch stretch 90sec per side" → { name, weight:"90sec per side", isStretch:true }
function parseExerciseNotes(text) {
  if (!text) return [];
  return text.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
    // name weight NxReps  — e.g. "bench press 90 3x8"
    let m = line.match(/^(.+?)\s+([\d.]+)\s+(\d+\s*[x×]\s*[\w.]+)\s*$/i);
    if (m) return { name: capFirst(m[1].trim()), weight: m[2], sets: m[3].replace(/\s+/g,''), done: true, isStretch: false };

    // name NxReps  — e.g. "curls 3x30"
    m = line.match(/^(.+?)\s+(\d+\s*[x×]\s*[\w.]+)\s*$/i);
    if (m) return { name: capFirst(m[1].trim()), weight: '', sets: m[2].replace(/\s+/g,''), done: true, isStretch: false };

    // stretch with duration  — e.g. "couch stretch 90sec per side"
    m = line.match(/^(.+?)\s+([\d][\w\s/\-]+(?:sec|min)\b.*)\s*$/i);
    if (m) return { name: capFirst(m[1].trim()), weight: m[2].trim(), sets: '', done: true, isStretch: true };

    const isStretch = /stretch|hold/i.test(line);
    return { name: capFirst(line), weight: '', sets: '', done: true, isStretch };
  });
}

function capFirst(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function normaliseDate(s) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) {
    let [, mo, dd, yy] = m;
    if (yy.length === 2) yy = (parseInt(yy) < 50 ? '20' : '19') + yy;
    return `${yy}-${mo.padStart(2,'0')}-${dd.padStart(2,'0')}`;
  }
  return null;
}

function exportJSON() {
  const data = loadData();
  download(JSON.stringify(data, null, 2), 'habit-tracker.json', 'application/json');
}

function exportCSV() {
  const data    = loadData();
  const entries = data.entries || {};
  const dates   = Object.keys(entries).sort();
  if (!dates.length) { alert('No entries to export.'); return; }

  const headers = ['Date','No Alcohol','Calorie Limit Met','Calories','Exercise','Writing/Coding','Job Application','Russian Practice','Drum Practice','Exercise Notes','Food Notes','Score'];
  const rows = [headers.join(',')];
  dates.forEach(d => {
    const e = entries[d];
    rows.push([
      d,
      e.noAlcohol ? 'yes':'no',
      e.calorieLimitMet ? 'yes':'no',
      e.calories || 'n/a',
      (e.exercises||[]).join('; '),
      e.writingCoding ? 'yes':'no',
      e.jobApplication ? 'yes':'no',
      e.russianPractice ? 'yes':'no',
      e.drumPractice ? 'yes':'no',
      csvCell(e.exerciseNotes),
      csvCell(e.foodNotes),
      e.score,
    ].join(','));
  });
  download(rows.join('\n'), 'habit-tracker.csv', 'text/csv');
}

function csvCell(v) {
  if (!v) return '';
  return '"' + String(v).replace(/"/g, '""') + '"';
}

function download(content, filename, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ─── GitHub Gist Sync ────────────────────────────────────────────────
const GIST_TOKEN_KEY = 'habitGistToken';
const GIST_ID_KEY    = 'habitGistId';
const GIST_FILENAME  = 'habit-tracker-data.json';

async function gistPush(data) {
  const token = localStorage.getItem(GIST_TOKEN_KEY);
  if (!token) return;
  const content = JSON.stringify(data);
  let gistId = localStorage.getItem(GIST_ID_KEY);
  try {
    let res;
    if (gistId) {
      res = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'PATCH',
        headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: { [GIST_FILENAME]: { content } } }),
      });
    } else {
      res = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: 'Habit Tracker Data',
          public: false,
          files: { [GIST_FILENAME]: { content } },
        }),
      });
      if (res.ok) {
        const json = await res.json();
        localStorage.setItem(GIST_ID_KEY, json.id);
        updateSyncUI();
      }
    }
    if (res && !res.ok) console.error('Gist push error:', res.status, await res.text());
  } catch (err) {
    console.error('Gist push failed:', err);
  }
}

async function gistPull() {
  const token  = localStorage.getItem(GIST_TOKEN_KEY);
  const gistId = localStorage.getItem(GIST_ID_KEY);
  if (!token || !gistId) return null;
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: { Authorization: `token ${token}` },
    });
    if (!res.ok) return null;
    const json    = await res.json();
    const content = json.files?.[GIST_FILENAME]?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    console.error('Gist pull failed:', err);
    return null;
  }
}

// Merge remote data into local — per entry, newer completedAt wins
function mergeData(local, remote) {
  if (!remote) return local;
  const merged = { ...local };
  merged.entries = { ...(local.entries || {}) };
  Object.entries(remote.entries || {}).forEach(([date, remoteEntry]) => {
    const localEntry = merged.entries[date];
    if (!localEntry) {
      merged.entries[date] = remoteEntry;
    } else {
      const lt = localEntry.completedAt  || '0';
      const rt = remoteEntry.completedAt || '0';
      if (rt > lt) merged.entries[date] = remoteEntry;
    }
  });
  if (remote.exercises) {
    const seen = new Set(local.exercises || []);
    (remote.exercises || []).forEach(e => seen.add(e));
    merged.exercises = Array.from(seen);
  }
  if (remote.gymExercises) {
    const localNames = new Set((local.gymExercises || []).map(e => e.name.toLowerCase()));
    const extra = remote.gymExercises.filter(e => !localNames.has(e.name.toLowerCase()));
    merged.gymExercises = [...(local.gymExercises || []), ...extra];
  }
  return merged;
}

// Pull from Gist and merge into local storage (runs silently after unlock)
async function syncFromGist() {
  const remote = await gistPull();
  if (!remote) return;
  const local  = loadData();
  const merged = mergeData(local, remote);
  saveDataLocal(merged);
  if (currentView === 'today')   renderToday();
  if (currentView === 'history') renderHistory();
  if (currentView === 'stats')   renderStats();
}

// Pull from Gist on a brand-new device (replaces local storage with remote data)
async function restoreFromGist(token, gistId) {
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: { Authorization: `token ${token}` },
    });
    if (!res.ok) return { ok: false, error: `GitHub error ${res.status}` };
    const json    = await res.json();
    const content = json.files?.[GIST_FILENAME]?.content;
    if (!content) return { ok: false, error: 'No habit data found in that Gist.' };
    const data = JSON.parse(content);
    if (!data.pin) return { ok: false, error: 'Data is missing a PIN — cannot restore.' };
    localStorage.setItem(GIST_TOKEN_KEY, token);
    localStorage.setItem(GIST_ID_KEY, gistId);
    saveDataLocal(data);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: 'Network error: ' + err.message };
  }
}

function setupGateSync() {
  const restoreBtn = document.getElementById('gate-restore-btn');
  const syncForm   = document.getElementById('gate-sync-form');
  const submitBtn  = document.getElementById('gate-restore-submit-btn');
  const errorEl    = document.getElementById('gate-restore-error');
  if (!restoreBtn) return;

  restoreBtn.onclick = () => syncForm.classList.toggle('hidden');

  submitBtn.onclick = async () => {
    const token  = document.getElementById('gate-gist-token').value.trim();
    const gistId = document.getElementById('gate-gist-id').value.trim();
    errorEl.classList.add('hidden');
    if (!token || !gistId) {
      errorEl.textContent = 'Both fields are required.';
      errorEl.classList.remove('hidden');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Restoring…';
    const result = await restoreFromGist(token, gistId);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Restore Data';
    if (result.ok) {
      unlockApp();
    } else {
      errorEl.textContent = result.error;
      errorEl.classList.remove('hidden');
    }
  };
}

function updateSyncUI() {
  const gistId  = localStorage.getItem(GIST_ID_KEY);
  const display = document.getElementById('sync-gist-id-display');
  if (display) display.textContent = gistId ? `Gist ID: ${gistId}` : '';
}

function setupSyncUI() {
  const tokenInp = document.getElementById('sync-token-input');
  const saveBtn  = document.getElementById('sync-save-btn');
  const clearBtn = document.getElementById('sync-clear-btn');
  const pushBtn  = document.getElementById('sync-push-btn');
  const pullBtn  = document.getElementById('sync-pull-btn');
  const statusEl = document.getElementById('sync-status');
  if (!tokenInp) return;

  const existing = localStorage.getItem(GIST_TOKEN_KEY);
  if (existing) tokenInp.value = existing;
  updateSyncUI();

  const showStatus = (msg, err = false) => {
    statusEl.textContent = msg;
    statusEl.style.color = err ? 'var(--danger)' : 'var(--success)';
    statusEl.classList.remove('hidden');
    setTimeout(() => statusEl.classList.add('hidden'), 3000);
  };

  saveBtn.onclick = () => {
    const val = tokenInp.value.trim();
    if (!val) return;
    localStorage.setItem(GIST_TOKEN_KEY, val);
    showStatus('Token saved.');
  };

  clearBtn.onclick = () => {
    localStorage.removeItem(GIST_TOKEN_KEY);
    localStorage.removeItem(GIST_ID_KEY);
    tokenInp.value = '';
    updateSyncUI();
    showStatus('Sync cleared.');
  };

  pushBtn.onclick = async () => {
    const token = localStorage.getItem(GIST_TOKEN_KEY);
    if (!token) { showStatus('Save a GitHub token first.', true); return; }
    pushBtn.disabled = true; pushBtn.textContent = 'Pushing…';
    await gistPush(loadData());
    pushBtn.disabled = false; pushBtn.textContent = 'Push now';
    showStatus('Pushed to Gist.');
    updateSyncUI();
  };

  pullBtn.onclick = async () => {
    const token  = localStorage.getItem(GIST_TOKEN_KEY);
    const gistId = localStorage.getItem(GIST_ID_KEY);
    if (!token || !gistId) { showStatus('Configure sync first.', true); return; }
    pullBtn.disabled = true; pullBtn.textContent = 'Pulling…';
    const remote = await gistPull();
    pullBtn.disabled = false; pullBtn.textContent = 'Pull now';
    if (remote) {
      const merged = mergeData(loadData(), remote);
      saveDataLocal(merged);
      renderStats();
      showStatus('Pulled and merged.');
    } else {
      showStatus('Pull failed — check console.', true);
    }
  };
}

// ─── Utilities ───────────────────────────────────────────────────────
function escHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
