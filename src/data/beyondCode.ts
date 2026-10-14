export interface BeyondCodeLink {
  label: string;
  path: string;
}

export interface BeyondCodeTheme {
  id: string;
  title: string;
  icon: string;
  summary: string;
  links: BeyondCodeLink[];
}

export const beyondCode: BeyondCodeTheme[] = [
  {
    id: 'investigate',
    title: 'Bug investigations',
    icon: 'bug',
    summary: 'Hand off a vague bug report and get back a reproduction, a likely cause and a proposed fix.',
    links: [
      { label: 'Engineer: investigate a bug', path: '/roles/engineer/#eng-investigate' },
      { label: 'Engineer: incident follow-up', path: '/roles/engineer/#eng-incident' },
    ],
  },
  {
    id: 'reviews',
    title: 'Reviews',
    icon: 'eye',
    summary: "Read a teammate's pull request with a second pair of eyes, then post the comments you agree with.",
    links: [
      { label: 'Engineer: review a teammate PR', path: '/roles/engineer/#eng-review-pr' },
      { label: 'Engineer: security review', path: '/roles/engineer/#security-review' },
    ],
  },
  {
    id: 'design',
    title: 'Design docs and research',
    icon: 'telescope',
    summary: 'Compare approaches with a cited research report, then turn it into a design doc grounded in your code.',
    links: [
      { label: 'Engineer: research a decision', path: '/roles/engineer/#eng-research' },
      { label: 'Engineer: design doc', path: '/roles/engineer/#eng-design-doc' },
      { label: 'PM: spec from work context', path: '/roles/product-manager/#spec-from-work-context' },
    ],
  },
  {
    id: 'docs',
    title: 'Docs',
    icon: 'book',
    summary: 'Fix stale READMEs and setup guides, and write release notes from what actually merged.',
    links: [
      { label: 'Engineer: update docs', path: '/roles/engineer/#eng-docs' },
      { label: 'DevRel: docs gaps', path: '/roles/devrel-support/#dr-docs-gap' },
      { label: 'PM: release notes', path: '/roles/product-manager/#release-notes' },
    ],
  },
  {
    id: 'triage',
    title: 'Triage and planning',
    icon: 'inbox',
    summary: 'Sort the issue backlog into themes and break an epic into issues the team can pick up.',
    links: [
      { label: 'Engineer: triage issues', path: '/roles/engineer/#eng-triage' },
      { label: 'Engineer: plan an epic', path: '/roles/engineer/#eng-plan-epic' },
      { label: 'PM: feedback triage', path: '/roles/product-manager/#feedback-synthesis' },
    ],
  },
  {
    id: 'status',
    title: 'Status updates and automations',
    icon: 'workflow',
    summary: 'Draft the weekly update from merged work, and let an automation run it every Friday.',
    links: [
      { label: 'Engineer: weekly status', path: '/roles/engineer/#eng-status' },
      { label: 'Engineer: morning briefing', path: '/roles/engineer/#morning-automation' },
      { label: 'Manager: coordinator automation', path: '/roles/engineering-manager/#em-coordinator' },
    ],
  },
  {
    id: 'presentations',
    title: 'Decks and Office files',
    icon: 'project-template',
    summary: 'Build the sprint demo deck in the PowerPoint canvas, or a Word or Excel file, without leaving the app.',
    links: [
      { label: 'Engineer: sprint demo deck', path: '/roles/engineer/#eng-demo-deck' },
      { label: 'Business: Word, Excel and PowerPoint', path: '/roles/business-ops/#ops-office-files' },
      { label: 'Sales: sales deck', path: '/roles/sales/#sales-deck' },
    ],
  },
  {
    id: 'data',
    title: 'Data analysis',
    icon: 'graph',
    summary: 'Ask questions of logs, benchmarks or a CSV export and get a chart in the Excel canvas.',
    links: [
      { label: 'Engineer: analyze data', path: '/roles/engineer/#eng-data' },
      { label: 'PM: data analysis', path: '/roles/product-manager/#pm-data-analysis' },
      { label: 'Business: forecast dashboard', path: '/roles/business-ops/#ops-forecast' },
    ],
  },
];
