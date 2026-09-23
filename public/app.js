const form = document.querySelector('#query-form');
const username = document.querySelector('#username');
const level = document.querySelector('#level');
const sqlOutput = document.querySelector('#sql-output');
const rowsOutput = document.querySelector('#rows-output');
const summary = document.querySelector('#result-summary');
const badge = document.querySelector('#result-badge');

for (const button of document.querySelectorAll('[data-value]')) {
  button.addEventListener('click', () => {
    username.value = button.dataset.value;
    username.focus();
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  badge.textContent = 'RUNNING';
  try {
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, level: level.value })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Request failed');
    badge.textContent = result.blocked ? 'BLOCKED' : `${result.rows.length} ROW${result.rows.length === 1 ? '' : 'S'}`;
    summary.innerHTML = `<strong>${escapeHtml(result.message)}</strong><span>${escapeHtml(result.levels[result.level].description)}</span>`;
    sqlOutput.textContent = result.sql;
    rowsOutput.innerHTML = result.rows.length
      ? result.rows.map(row => `<tr><td>${row.id}</td><td>${escapeHtml(row.username)}</td><td>${escapeHtml(row.role)}</td></tr>`).join('')
      : '<tr><td colspan="3" class="empty">No rows returned.</td></tr>';
  } catch (error) {
    badge.textContent = 'ERROR';
    summary.innerHTML = `<strong>${escapeHtml(error.message)}</strong><span>Could not complete the local request.</span>`;
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}
