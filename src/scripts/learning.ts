const STORAGE_KEY = 'coe:learning';

function load(): Set<string> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return new Set(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

function save(done: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]));
  } catch {
    // Progress still works for this visit if storage is unavailable.
  }
}

function render(done: Set<string>) {
  for (const box of document.querySelectorAll<HTMLInputElement>('input[data-coe-lesson]')) {
    box.checked = done.has(box.dataset.coeLesson ?? '');
    box.closest('[data-coe-lesson-box]')?.classList.toggle('is-done', box.checked);
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-coe-module-progress]')) {
    const keys = (el.dataset.lessons ?? '').split('|').filter(Boolean);
    const count = keys.filter((k) => done.has(k)).length;
    const bar = el.querySelector<HTMLElement>('[data-bar]');
    const label = el.querySelector<HTMLElement>('[data-label]');
    if (bar) bar.style.width = keys.length ? `${(count / keys.length) * 100}%` : '0%';
    if (label) label.textContent = count === keys.length && count > 0 ? 'Complete' : `${count} of ${keys.length} done`;
  }
}

const done = load();
render(done);

for (const box of document.querySelectorAll<HTMLInputElement>('input[data-coe-lesson]')) {
  box.addEventListener('change', () => {
    const key = box.dataset.coeLesson ?? '';
    if (box.checked) done.add(key);
    else done.delete(key);
    save(done);
    render(done);
  });
}

document.querySelector<HTMLButtonElement>('[data-coe-learning-reset]')?.addEventListener('click', () => {
  done.clear();
  save(done);
  render(done);
  const status = document.querySelector<HTMLElement>('[data-coe-learning-reset-status]');
  if (status) status.textContent = 'Progress reset.';
});
