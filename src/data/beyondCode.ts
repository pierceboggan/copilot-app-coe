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
    id: 'research',
    title: 'Research',
    icon: 'telescope',
    summary: 'Pull context from issues, docs, Teams or the web into one sourced summary or spec.',
    links: [
      { label: 'PM: spec from work context', path: '/roles/product-manager/#spec-from-work-context' },
      { label: 'Business: Microsoft 365 context', path: '/roles/business-ops/#ops-m365-context' },
      { label: 'Sales: account brief', path: '/roles/sales/#sales-account-brief' },
    ],
  },
  {
    id: 'docs',
    title: 'Docs and writing',
    icon: 'book',
    summary: 'Find gaps in docs, draft blog posts with tested code samples and write release notes.',
    links: [
      { label: 'DevRel: docs gaps', path: '/roles/devrel-support/#dr-docs-gap' },
      { label: 'DevRel: blog post', path: '/roles/devrel-support/#dr-blog' },
      { label: 'PM: release notes', path: '/roles/product-manager/#release-notes' },
    ],
  },
  {
    id: 'office',
    title: 'Office files',
    icon: 'file',
    summary: 'Create and edit Word, Excel and PowerPoint files in canvases, no repository needed.',
    links: [
      { label: 'Business: Word, Excel and PowerPoint', path: '/roles/business-ops/#ops-office-files' },
      { label: 'Marketing: launch deck', path: '/roles/marketing/#mkt-deck' },
    ],
  },
  {
    id: 'data',
    title: 'Data analysis',
    icon: 'graph',
    summary: 'Clean a CSV, find themes, build a forecast or a tracker, and iterate in plain language.',
    links: [
      { label: 'PM: data analysis', path: '/roles/product-manager/#pm-data-analysis' },
      { label: 'Business: customer review CSV', path: '/roles/business-ops/#ops-csv-reviews' },
      { label: 'Business: forecast dashboard', path: '/roles/business-ops/#ops-forecast' },
    ],
  },
  {
    id: 'automations',
    title: 'Automations',
    icon: 'workflow',
    summary: 'Run the same job every morning or every week: briefings, status drafts and coordinator loops.',
    links: [
      { label: 'Manager: coordinator automation', path: '/roles/engineering-manager/#em-coordinator' },
      { label: 'Engineer: morning briefing', path: '/roles/engineer/#morning-automation' },
      { label: 'PM: weekly status', path: '/roles/product-manager/#weekly-status' },
    ],
  },
  {
    id: 'triage',
    title: 'Triage',
    icon: 'inbox',
    summary: 'Sort issues, feedback and account notes into themes and next steps.',
    links: [
      { label: 'PM: feedback triage', path: '/roles/product-manager/#feedback-synthesis' },
      { label: 'PM: issue triage', path: '/roles/product-manager/#issue-triage' },
      { label: 'Sales: account feedback', path: '/roles/sales/#sales-feedback' },
    ],
  },
  {
    id: 'presentations',
    title: 'Presentations',
    icon: 'project-template',
    summary: 'Draft a deck from real data, then run a critique pass before anyone sees it.',
    links: [
      { label: 'PM: quality presentation', path: '/roles/product-manager/#pm-presentation' },
      { label: 'Sales: sales deck', path: '/roles/sales/#sales-deck' },
      { label: 'Marketing: launch deck', path: '/roles/marketing/#mkt-deck' },
    ],
  },
];
