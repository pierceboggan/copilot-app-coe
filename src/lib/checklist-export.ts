import type { ChecklistPhase } from '../data/checklist';

/** Renders checklist progress as GitHub-flavored Markdown task lists. */
export function checklistMarkdown(phases: ChecklistPhase[], done: Set<string>, includeDetail = true): string {
  const total = phases.reduce((n, p) => n + p.items.length, 0);
  const completed = phases.reduce((n, p) => n + p.items.filter((i) => done.has(i.id)).length, 0);
  const lines = [
    '# Copilot app rollout checklist',
    '',
    `Progress: ${completed} of ${total} complete.`,
    '',
  ];
  phases.forEach((phase, index) => {
    lines.push(`## Phase ${index + 1}: ${phase.name} (${phase.timeframe})`, '', phase.goal, '');
    for (const item of phase.items) {
      lines.push(`- [${done.has(item.id) ? 'x' : ' '}] **${item.title}** (${item.owner})`);
      if (includeDetail) lines.push(`  ${item.detail}`);
    }
    lines.push('', `Exit criteria: ${phase.exitCriteria}`, '');
  });
  return lines.join('\n');
}

/** GitHub's new-issue URL accepts a prefilled title and body. Keep the body short enough for a URL. */
export function newIssueUrl(repo: string, title: string, body: string): string {
  const params = new URLSearchParams({ title, body });
  return `https://github.com/${repo}/issues/new?${params.toString()}`;
}
