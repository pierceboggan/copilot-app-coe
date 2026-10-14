export type OutcomeId =
  | 'pr-cycle-time'
  | 'review-turnaround'
  | 'time-to-first-draft'
  | 'triage-time'
  | 'time-to-insight'
  | 'time-to-prototype'
  | 'issues-caught-before-merge'
  | 'vulnerability-fix-time'
  | 'toil-hours'
  | 'onboarding-time';

export interface Outcome {
  id: OutcomeId;
  label: string;
  measure: string;
  source: string;
}

export const outcomes: Outcome[] = [
  {
    id: 'pr-cycle-time',
    label: 'PR cycle time',
    measure: 'Median hours from pull request opened to merged.',
    source: 'Pull request data from the GitHub API or the pull request lifecycle metrics in Copilot usage metrics.',
  },
  {
    id: 'review-turnaround',
    label: 'Review turnaround',
    measure: 'Median hours from review requested to first review, and from review comment to fix.',
    source: 'Pull request review data from the GitHub API.',
  },
  {
    id: 'time-to-first-draft',
    label: 'Time to first draft',
    measure: 'Hours from "we need a doc, deck or post" to a draft someone else can review.',
    source: 'Self-reported in the monthly pulse survey, or a short time study on three real tasks.',
  },
  {
    id: 'triage-time',
    label: 'Triage time',
    measure: 'Median hours from a new issue or feedback item to labeled, deduplicated and assigned.',
    source: 'Issue timeline events from the GitHub API.',
  },
  {
    id: 'time-to-insight',
    label: 'Time to insight',
    measure: 'Hours from a data question to an answer with a chart or table you trust.',
    source: 'Self-reported in the pulse survey, or a before and after time study.',
  },
  {
    id: 'time-to-prototype',
    label: 'Time to prototype',
    measure: 'Hours from an idea to something people can click.',
    source: 'Self-reported in the pulse survey, or a before and after time study.',
  },
  {
    id: 'issues-caught-before-merge',
    label: 'Issues caught before merge',
    measure: 'Security, accessibility and design-system findings fixed before merge, against findings reported after release.',
    source: 'Code scanning alerts, review comments and your bug tracker.',
  },
  {
    id: 'vulnerability-fix-time',
    label: 'Vulnerability fix time',
    measure: 'Median days from a vulnerable dependency alert to a merged fix.',
    source: 'Dependabot alert data from the GitHub API.',
  },
  {
    id: 'toil-hours',
    label: 'Toil hours',
    measure: 'Hours a week spent on recurring chores such as status updates, changelogs and briefings.',
    source: 'Self-reported in the pulse survey. Count the automations that replaced each chore.',
  },
  {
    id: 'onboarding-time',
    label: 'Onboarding time',
    measure: 'Days from a new teammate or repository joining to their first merged pull request.',
    source: 'Pull request data from the GitHub API.',
  },
];

export const outcomeById = Object.fromEntries(outcomes.map((o) => [o.id, o])) as Record<OutcomeId, Outcome>;

const tags: Record<string, OutcomeId[]> = {
  'issue-to-pr': ['pr-cycle-time'],
  'parallel-sessions': ['pr-cycle-time'],
  'review-feedback': ['review-turnaround', 'pr-cycle-time'],
  'security-review': ['issues-caught-before-merge'],
  'rubber-duck': ['issues-caught-before-merge'],
  'repo-config': ['onboarding-time'],
  'morning-automation': ['review-turnaround', 'toil-hours'],
  'cloud-sandbox': ['pr-cycle-time'],
  'nightly-cloud-automation': ['toil-hours'],
  'cross-repo-orchestrate': ['pr-cycle-time'],
  'fleet-plan': ['pr-cycle-time'],
  'eng-investigate': ['time-to-insight', 'pr-cycle-time'],
  'eng-review-pr': ['review-turnaround', 'issues-caught-before-merge'],
  'eng-research': ['time-to-insight'],
  'eng-design-doc': ['time-to-first-draft'],
  'eng-docs': ['time-to-first-draft', 'onboarding-time'],
  'eng-triage': ['triage-time'],
  'eng-incident': ['time-to-first-draft', 'toil-hours'],
  'eng-plan-epic': ['pr-cycle-time'],
  'eng-status': ['toil-hours'],
  'eng-demo-deck': ['time-to-first-draft'],
  'eng-data': ['time-to-insight'],
  'agent-merge': ['pr-cycle-time', 'review-turnaround'],
  'spec-from-notes': ['time-to-first-draft'],
  'spec-from-work-context': ['time-to-first-draft'],
  prototype: ['time-to-prototype'],
  'issue-triage': ['triage-time'],
  'feedback-synthesis': ['triage-time'],
  'pm-fan-out': ['time-to-first-draft', 'triage-time'],
  'pm-data-analysis': ['time-to-insight'],
  'pm-presentation': ['time-to-first-draft'],
  'issues-from-meeting': ['time-to-first-draft', 'triage-time'],
  'release-notes': ['time-to-first-draft', 'toil-hours'],
  'weekly-status': ['toil-hours'],
  'design-variants': ['time-to-prototype'],
  'design-polish': ['issues-caught-before-merge'],
  'design-a11y': ['issues-caught-before-merge'],
  'design-tokens': ['issues-caught-before-merge'],
  'design-canvas': ['time-to-first-draft'],
  'mkt-launch-brief': ['time-to-first-draft'],
  'mkt-blog': ['time-to-first-draft'],
  'mkt-deck': ['time-to-first-draft'],
  'mkt-site-copy': ['pr-cycle-time'],
  'mkt-demo': ['time-to-prototype'],
  'mkt-changelog': ['toil-hours'],
  'ops-csv-reviews': ['time-to-insight'],
  'ops-forecast': ['time-to-insight'],
  'ops-office-files': ['time-to-first-draft'],
  'ops-data-project': ['time-to-insight'],
  'ops-m365-context': ['time-to-first-draft'],
  'sales-account-brief': ['time-to-insight'],
  'sales-parallel-briefs': ['time-to-insight'],
  'sales-pipeline': ['time-to-insight'],
  'sales-deck': ['time-to-first-draft'],
  'sales-feedback': ['time-to-insight'],
  'sales-followup': ['time-to-first-draft'],
  'em-review-queue': ['review-turnaround'],
  'em-coordinator': ['triage-time', 'pr-cycle-time'],
  'em-breakdown': ['time-to-first-draft'],
  'em-toil': ['toil-hours'],
  'em-onboarding': ['onboarding-time'],
  'em-status': ['toil-hours'],
  'dr-repro': ['triage-time'],
  'dr-sample': ['time-to-first-draft'],
  'dr-blog': ['time-to-first-draft'],
  'dr-parallel-content': ['time-to-first-draft'],
  'dr-video': ['time-to-first-draft'],
  'dr-social': ['triage-time'],
  'dr-docs-gap': ['triage-time'],
  'dr-feedback-loop': ['triage-time'],
  'dr-insights': ['time-to-insight'],
  'sec-review': ['issues-caught-before-merge'],
  'sec-config-audit': ['issues-caught-before-merge'],
  'sec-sandbox': ['issues-caught-before-merge'],
  'sec-automation-scope': ['issues-caught-before-merge'],
  'sec-connectors': ['toil-hours'],
  'sec-deps': ['vulnerability-fix-time'],
};

export function outcomesFor(useCaseId: string): OutcomeId[] {
  const found = tags[useCaseId];
  if (!found?.length) throw new Error(`Use case "${useCaseId}" has no outcome tag in src/data/outcomes.ts`);
  return found;
}
