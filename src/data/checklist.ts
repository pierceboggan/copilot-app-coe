export type Owner = 'Sponsor' | 'CoE lead' | 'Champions' | 'Admin' | 'Security';

export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
  owner: Owner;
  link?: { label: string; url: string };
}

export interface ChecklistPhase {
  id: string;
  name: string;
  /** Memorable name used in comms and headings. */
  nickname: string;
  timeframe: string;
  goal: string;
  exitCriteria: string;
  items: ChecklistItem[];
}

const DOCS = 'https://docs.github.com/en/copilot';

export const phases: ChecklistPhase[] = [
  {
    id: 'pilot',
    name: 'Pilot',
    nickname: 'Prove it',
    timeframe: 'Weeks 1–2',
    goal: 'Run a short validation sprint that clears admin, security and support blockers for an org-wide launch.',
    exitCriteria: 'Validation users have run real sessions, nothing blocks a broad launch, and the launch date is set.',
    items: [
      {
        id: 'pilot-sponsor',
        title: 'Name an executive sponsor and a CoE lead',
        detail: 'The sponsor clears blockers and funds time. The lead runs the program day to day.',
        owner: 'Sponsor',
        link: { label: 'Operating model', url: '/coe/#roles' },
      },
      {
        id: 'pilot-access',
        title: 'Confirm Copilot seats and organization policies',
        detail:
          'Check that pilot users have seats, and review policies for Copilot cloud agent, automations and storing local sessions in the cloud.',
        owner: 'Admin',
        link: { label: 'Automation prerequisites', url: `${DOCS}/how-tos/github-copilot-app/using-automations` },
      },
      {
        id: 'pilot-repos',
        title: 'Pick one to three pilot repositories',
        detail: 'Choose active repositories with good tests and owners who want to participate.',
        owner: 'CoE lead',
      },
      {
        id: 'pilot-config',
        title: 'Add .github/github-app.yml to each pilot repository',
        detail: 'Include project instructions, a Setup script on session.create and a Run script with a server_ready_pattern.',
        owner: 'Champions',
        link: { label: 'Repository configuration', url: `${DOCS}/reference/github-copilot-app-reference/repository-configuration` },
      },
      {
        id: 'pilot-users',
        title: 'Recruit 20 to 50 validation users across roles',
        detail:
          'Include engineers, PMs, designers and at least one business team so you test more than coding workflows. Their job is to find blockers in two weeks, not to prove value over a quarter.',
        owner: 'CoE lead',
        link: { label: 'Use cases by role', url: '/roles/' },
      },
      {
        id: 'pilot-baseline',
        title: 'Capture baseline metrics',
        detail: 'Record PR cycle time, review turnaround and time to first commit before anyone starts.',
        owner: 'CoE lead',
        link: { label: 'Metrics to track', url: '/coe/measurement/' },
      },
      {
        id: 'pilot-kickoff',
        title: 'Run a kickoff with the first-hour quickstart',
        detail: 'Everyone installs, signs in and completes one Plan mode session on a real issue during the meeting.',
        owner: 'CoE lead',
        link: { label: 'Get started', url: '/get-started/' },
      },
      {
        id: 'pilot-feedback',
        title: 'Open a feedback channel and weekly office hours',
        detail: 'Give pilot users one place to ask questions and share wins and problems.',
        owner: 'CoE lead',
      },
      {
        id: 'pilot-sandbox',
        title: 'Decide the sandbox defaults for pilot repositories',
        detail: 'Choose when to use local sandboxing or cloud sandboxes, and document the default in project settings.',
        owner: 'Security',
        link: { label: 'Sessions and sandboxes', url: `${DOCS}/how-tos/github-copilot-app/agent-sessions` },
      },
      {
        id: 'pilot-admin-package',
        title: 'Brief admins with the readiness package',
        detail: 'Walk admins and security through settings, controls and sandbox guidance before users install anything.',
        owner: 'Admin',
        link: { label: 'Admin readiness package', url: '/resources/#admin-readiness' },
      },
      {
        id: 'pilot-rings',
        title: 'Set a fast ring schedule',
        detail:
          'Plan the validation cohort for weeks 1 and 2 and everyone with a seat by week 4. Decide who gets early builds and who stays on stable, which features to hold back, and any version pinning needs.',
        owner: 'Admin',
        link: { label: 'Governance', url: '/coe/governance/#controlled-rollout' },
      },
      {
        id: 'pilot-connectors',
        title: 'Set up connector and MCP server approval',
        detail:
          'Decide who approves connectors and MCP servers, such as Sentry or WorkIQ, and confirm admin prerequisites for Microsoft 365 sources before pilot users ask.',
        owner: 'Security',
        link: { label: 'Connector approval', url: '/coe/governance/#connectors-and-mcp' },
      },
    ],
  },
  {
    id: 'expand',
    name: 'Expand',
    nickname: 'Switch it on',
    timeframe: 'Weeks 3–4',
    goal: 'Turn the app on by default for everyone with a Copilot seat and get them to a first session.',
    exitCriteria: 'The app is enabled org-wide, launch comms have gone out, and most of the org has opened it once.',
    items: [
      {
        id: 'expand-champions',
        title: 'Line up one champion per team before launch day',
        detail: 'Champions run local demos in launch week, answer first-line questions and report patterns back to the CoE.',
        owner: 'CoE lead',
      },
      {
        id: 'expand-prompts',
        title: 'Publish a starter prompt library with deep links',
        detail: 'Share proven prompts with Open in Copilot app links so teammates start from a working example.',
        owner: 'Champions',
        link: { label: 'Deep links', url: `${DOCS}/how-tos/github-copilot-app/open-with-deep-links` },
      },
      {
        id: 'expand-instructions',
        title: 'Ship custom instructions and starter skills in top repositories',
        detail:
          'Add .github/copilot-instructions.md and two or three skills that capture conventions, test commands and things the agent should never do.',
        owner: 'Champions',
        link: { label: 'Customizations', url: '/coe/customizations/#the-building-blocks' },
      },
      {
        id: 'expand-review',
        title: 'Agree on how to review repository configurations',
        detail: 'Treat changes to .github/github-app.yml like CI changes. Scripts run with GitHub credentials.',
        owner: 'Security',
        link: { label: 'Review and trust', url: `${DOCS}/reference/github-copilot-app-reference/repository-configuration` },
      },
      {
        id: 'expand-automation',
        title: 'Automate one recurring chore per team',
        detail: 'Good first candidates are issue triage, a PR briefing and a weekly status draft.',
        owner: 'Champions',
        link: { label: 'Using automations', url: `${DOCS}/how-tos/github-copilot-app/using-automations` },
      },
      {
        id: 'expand-cloud-tools',
        title: 'Set a policy for cloud automation tools',
        detail: 'Cloud automations should select only the tools a task needs. Write down who approves broader access.',
        owner: 'Security',
      },
      {
        id: 'expand-stories',
        title: 'Share three internal success stories',
        detail: 'Short write-ups with before and after numbers do more for adoption than any slide deck.',
        owner: 'CoE lead',
      },
      {
        id: 'expand-launch-comms',
        title: 'Tell existing Copilot users the app exists',
        detail:
          'Many people with a Copilot seat have never heard of the app. Send the launch email and chat post, and put "try this" prompts where people already work.',
        owner: 'CoE lead',
        link: { label: 'Launch comms templates', url: '/resources/#launch-comms' },
      },
      {
        id: 'expand-starter-prompts',
        title: 'Replace generic onboarding with starter prompts',
        detail: 'Give each new user concrete prompts they can run on day one, including one for each canvas type.',
        owner: 'Champions',
        link: { label: 'Starter prompt library', url: '/resources/#starter-prompts' },
      },
      {
        id: 'expand-next-ring',
        title: 'Enable the app org-wide by default',
        detail:
          'Turn it on for everyone with a seat in one step on launch day. Watch support load for the first 48 hours and hold back only features that failed validation.',
        owner: 'Admin',
        link: { label: 'Controlled rollout', url: '/coe/governance/#controlled-rollout' },
      },
      {
        id: 'expand-marketplace',
        title: 'Publish a private plugin marketplace with a starter kit',
        detail: 'Bundle your approved agents, skills and MCP servers as a plugin in a CoE-owned private repository.',
        owner: 'Champions',
        link: { label: 'Plugin marketplaces', url: '/coe/customizations/#plugin-marketplaces' },
      },
      {
        id: 'expand-managed-settings',
        title: 'Configure enterprise-managed settings for plugins and MCP servers',
        detail:
          'Register your marketplace with extraKnownMarketplaces, require the starter kit with enabledPlugins, and set allowedMcpServers or deniedMcpServers. Use MDM or a managed settings file where a rule must hold offline.',
        owner: 'Admin',
        link: { label: 'Managed settings', url: '/coe/customizations/#enterprise-managed-settings' },
      },
      {
        id: 'expand-reliability',
        title: 'Add reliability reports to the feedback loop',
        detail: 'Ask users to report crashes and hangs in the feedback channel, and review them in office hours.',
        owner: 'Champions',
        link: { label: 'Community', url: '/community/' },
      },
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    nickname: 'Make it a habit',
    timeframe: 'Months 2–3',
    goal: 'Move everyone from a first session to weekly use, and make the app the default way teams start work.',
    exitCriteria: 'Most active developers use the app weekly, and onboarding is part of standard team setup.',
    items: [
      {
        id: 'scale-onboarding',
        title: 'Add the app to standard onboarding',
        detail: 'New hires install the app and complete the first-hour quickstart in their first week.',
        owner: 'CoE lead',
      },
      {
        id: 'scale-launch-buttons',
        title: 'Add launch buttons to internal docs and ticket templates',
        detail: 'Deep links in runbooks and issue templates take people straight to the right session or automation.',
        owner: 'Champions',
        link: { label: 'Deep links', url: `${DOCS}/how-tos/github-copilot-app/open-with-deep-links` },
      },
      {
        id: 'scale-config-coverage',
        title: 'Reach config coverage on active repositories',
        detail: 'Track which active repositories have a reviewed .github/github-app.yml and close the gap.',
        owner: 'Champions',
      },
      {
        id: 'scale-workshops',
        title: 'Run role-based workshops',
        detail: 'Hold separate sessions for engineers, PMs and designers using the use cases on this site.',
        owner: 'CoE lead',
        link: { label: 'Use cases by role', url: '/roles/' },
      },
      {
        id: 'scale-cloud',
        title: 'Offer cloud sandboxes for heavy work',
        detail: 'Document when to pick a cloud sandbox, such as large upgrades or several parallel builds.',
        owner: 'Admin',
      },
      {
        id: 'scale-strict-marketplaces',
        title: 'Decide whether to allow only approved marketplaces',
        detail:
          'Once your catalog covers common requests, consider strictKnownMarketplaces so users install plugins only from approved sources. Review new plugin requests monthly.',
        owner: 'Security',
        link: { label: 'Managed settings', url: '/coe/customizations/#enterprise-managed-settings' },
      },
      {
        id: 'scale-review',
        title: 'Hold a monthly adoption review',
        detail: 'Sponsor, lead and champions review metrics, top blockers and next month\'s focus.',
        owner: 'Sponsor',
      },
      {
        id: 'scale-funnel',
        title: 'Track the activation funnel',
        detail: 'Measure download, first open, first session and weekly active use. Fix the biggest drop first.',
        owner: 'CoE lead',
        link: { label: 'Measurement', url: '/coe/measurement/#activation-funnel' },
      },
      {
        id: 'scale-which-tool',
        title: 'Publish a "which tool when" guide',
        detail: 'Help people pick between the app, the CLI, VS Code, automations and agents by the problem they have.',
        owner: 'Champions',
        link: { label: 'Which tool when', url: '/which-tool/' },
      },
      {
        id: 'scale-demo-day',
        title: 'Run a demo day for admins and decision makers',
        detail: 'Show real internal workflows end to end and answer governance questions in the room.',
        owner: 'CoE lead',
        link: { label: 'Demo day format', url: '/resources/#demo-day' },
      },
    ],
  },
  {
    id: 'optimize',
    name: 'Optimize',
    nickname: 'Compound it',
    timeframe: 'Ongoing',
    goal: 'Turn usage into measurable outcomes and keep improving.',
    exitCriteria: 'You can show outcome changes against baseline and the program runs without heroics.',
    items: [
      {
        id: 'optimize-outcomes',
        title: 'Compare outcomes against your baseline',
        detail: 'Report changes in PR cycle time, review turnaround and throughput each quarter.',
        owner: 'CoE lead',
        link: { label: 'Metrics to track', url: '/coe/measurement/' },
      },
      {
        id: 'optimize-prune',
        title: 'Prune and tune automations',
        detail: 'Retire automations nobody reads, and tighten prompts on the ones that produce noise.',
        owner: 'Champions',
      },
      {
        id: 'optimize-assessment',
        title: 'Run a quarterly maturity check',
        detail: 'Revisit this checklist and record which phase each team is in.',
        owner: 'CoE lead',
      },
      {
        id: 'optimize-feedback',
        title: 'Send product feedback to GitHub',
        detail: 'Collect the top requests from your feedback channel and share them with your GitHub account team.',
        owner: 'CoE lead',
      },
      {
        id: 'optimize-rotate',
        title: 'Rotate champions and refresh content',
        detail: 'Bring in new champions twice a year and update the prompt library as the app changes.',
        owner: 'Sponsor',
      },
    ],
  },
];

export const totalItems = phases.reduce((n, p) => n + p.items.length, 0);
