export type SessionMode = 'plan' | 'interactive' | 'autopilot';

const LAUNCHER = 'https://github.com/copilot/app/launch?open=';

/** Wraps a ghapp:// link in the hosted launcher, per the public deep link docs. */
export function launcherUrl(appLink: string): string {
  return `${LAUNCHER}${encodeURIComponent(appLink)}`;
}

/** Opens a new session with a kickoff prompt. The docs require `repo` for ghapp://session/new. */
export function newSessionLink(prompt: string, mode: SessionMode, repo: string): string {
  const params = new URLSearchParams({ repo, mode, prompt });
  // URLSearchParams encodes spaces as "+", which the app link spec does not use.
  const query = params.toString().replace(/\+/g, '%20');
  return launcherUrl(`ghapp://session/new?${query}`);
}

export function newAutomationLink(name: string, prompt: string, trigger = 'daily', time = '09:00'): string {
  const query = new URLSearchParams({ name, trigger, time, prompt }).toString().replace(/\+/g, '%20');
  return launcherUrl(`ghapp://automations/new?${query}`);
}

const REPO_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

export function isValidRepo(value: string): boolean {
  return REPO_PATTERN.test(value);
}
