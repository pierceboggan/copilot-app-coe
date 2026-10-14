import { isValidRepo, newSessionLink, type SessionMode } from '../lib/deeplink';

const STORAGE_KEY = 'coe:repo';
export const REPO_CHANGED = 'coe:repo-changed';

export function readRepo(): string {
  try {
    const value = localStorage.getItem(STORAGE_KEY) ?? '';
    return isValidRepo(value) ? value : '';
  } catch {
    return '';
  }
}

export function writeRepo(value: string): void {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private browsing; links fall back to the setting prompt.
  }
  document.dispatchEvent(new CustomEvent(REPO_CHANGED));
}

export function refreshLaunchLinks(): void {
  const repo = readRepo();
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-coe-launch]')) {
    const prompt = link.dataset.prompt ?? '';
    const mode = (link.dataset.mode ?? 'interactive') as SessionMode;
    const label = link.querySelector<HTMLElement>('[data-coe-launch-label]');
    if (repo) {
      link.href = newSessionLink(prompt, mode, repo);
      if (label) label.textContent = `Open in Copilot app`;
      link.title = `Starts a ${mode} session in ${repo}`;
    } else {
      link.href = '#repo-setting';
      if (label) label.textContent = 'Set a repository to open';
      link.title = 'Choose a repository first';
    }
  }
}

document.addEventListener(REPO_CHANGED, refreshLaunchLinks);
refreshLaunchLinks();
