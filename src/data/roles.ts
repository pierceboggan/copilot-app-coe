import type { SessionMode } from '../lib/deeplink';
import { outcomesFor, type OutcomeId } from './outcomes';

export type Feature =
  | 'Plan mode'
  | 'Interactive mode'
  | 'Autopilot mode'
  | 'Parallel sessions'
  | 'My work'
  | 'Chats'
  | 'Automations'
  | 'Cloud sandbox'
  | 'Local sandbox'
  | 'Canvases'
  | 'Repository config'
  | '/security-review'
  | 'Rubber duck agent'
  | 'Deep links'
  | 'Integrated browser'
  // "Agent merge" matches docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests.
  // "Child sessions", "Dynamic workflows", "Connectors" and the Word, Excel and PowerPoint canvases are named in the
  // public release notes at github.com/github/app/releases.
  // TODO: no docs.github.com page covers child sessions or dynamic workflows yet. Who would know: GitHub, through github/app issues or the docs.github.com feedback link.
  | 'Agent merge'
  | 'Child sessions'
  | 'Connectors'
  | 'Dynamic workflows'
  | 'Office canvases';

export interface FeatureStatus {
  label: string;
  note: string;
}

// Features that public docs mark as preview, or that may not be on for every account yet.
export const featureStatus: Partial<Record<Feature, FeatureStatus>> = {
  Connectors: {
    label: 'Availability varies',
    note: 'Connectors may not be on for your account yet. If they are not in the Customize view, add the service as an MCP server where your admin allows it, or attach an export.',
  },
  'Office canvases': {
    label: 'Availability varies',
    note: 'The Word, Excel and PowerPoint canvases may not be on for your account yet. If they are not in the Canvas view in Customize, ask the agent to write the .docx, .xlsx or .pptx file with a script and open it in Office.',
  },
  'Cloud sandbox': {
    label: 'Public preview',
    note: 'Cloud sandboxes are in public preview, and an admin may need to enable them for your organization or enterprise.',
  },
  '/security-review': {
    label: 'Public preview',
    note: 'The /security-review command is in public preview.',
  },
};

export interface Demo {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface UseCase {
  id: string;
  title: string;
  summary: string;
  mode: SessionMode;
  prompt: string;
  outcome: string;
  features: Feature[];
  steps?: string[];
  demo?: Demo;
}

export interface Role {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  available: boolean;
  dayInTheLife?: { time: string; text: string }[];
  useCases?: UseCase[];
  pitfalls?: string[];
}

export const roles: Role[] = [
  {
    slug: 'engineer',
    name: 'Engineer',
    icon: 'code',
    tagline: 'Run several agent sessions in parallel and take an issue all the way to a merged pull request.',
    available: true,
    dayInTheLife: [
      { time: '9:00', text: 'A morning automation has already summarized your open PRs. Two have failing checks.' },
      { time: '9:15', text: 'You click Fix on the failing checks, then start a Plan mode session from the top issue in My work.' },
      { time: '10:30', text: 'Three sessions run side by side in their own worktrees. You review plans and approve them.' },
      { time: '14:00', text: 'You run /security-review on the finished change, address one finding and open the PR.' },
      { time: '16:30', text: 'Review comments come in. The agent addresses them while you pair with a teammate.' },
    ],
    useCases: [
      {
        id: 'issue-to-pr',
        demo: { src: '/demos/plan-review.webp', width: 1000, height: 346, alt: "Review plan prompt with three choices: Approve and implement this plan, Exit plan mode and I will prompt myself, and Suggest changes to the plan. Cancel and Continue buttons sit below.", caption: "Plan mode asks you to approve, redirect or exit before it changes anything." },
        title: 'Take an issue to a pull request',
        summary: 'Start from an issue in My work, review the plan, then let the agent implement and open the PR.',
        mode: 'plan',
        prompt:
          'Read the linked issue and the code it touches. Propose a plan that lists the files you will change, the approach, and the tests you will add or update. Wait for my approval before writing code. After approval, implement the change, run the relevant tests, and open a pull request that follows the repository template.',
        outcome: 'A reviewed plan, a passing change on its own branch and a pull request linked to the issue.',
        features: ['My work', 'Plan mode', 'Parallel sessions'],
        steps: [
          'Open My work in the sidebar and select the issue.',
          'Click New session so the issue context loads automatically.',
          'Choose Plan mode, paste the prompt and approve the plan when it looks right.',
        ],
      },
      {
        id: 'parallel-sessions',
        title: 'Work three tasks at once',
        summary: 'Each session runs in its own working tree, so a bug fix, a refactor and a spike never collide.',
        mode: 'autopilot',
        prompt:
          'Investigate why the test suite is flaky on CI. Run the failing tests repeatedly to reproduce the failure, identify the root cause, and fix it without disabling or skipping any tests. Summarize the cause and the fix when you are done.',
        outcome: 'A root-cause summary and a fix, produced while you focus on other sessions.',
        features: ['Parallel sessions', 'Autopilot mode'],
        steps: [
          'Start one session per task and pick New working tree as the location.',
          'Use Autopilot for well-scoped tasks and Interactive for the ones you want to steer.',
          'Switch between sessions from the sidebar as each one needs you.',
        ],
      },
      {
        id: 'review-feedback',
        title: 'Address review comments and failing CI',
        summary: 'Let the agent resolve review threads and red checks on your pull request.',
        mode: 'interactive',
        prompt:
          'Address every unresolved review comment on this pull request. For each comment, make the change or explain why you disagree. Then fix any failing CI checks, run the affected tests locally, and push the updates.',
        outcome: 'Review threads answered, checks green and a short summary of what changed.',
        features: ['My work', 'Interactive mode'],
        steps: [
          'Open the pull request from My work.',
          'Click Fix on a single comment or a failing check, or start a session and use this prompt for all of them.',
        ],
      },
      {
        id: 'security-review',
        title: 'Security check before you open a PR',
        summary: 'Run /security-review on in-progress changes to catch high-confidence vulnerabilities early.',
        mode: 'interactive',
        prompt: '/security-review',
        outcome: 'Prioritized findings with severity, confidence and suggested fixes you can apply in the same session.',
        features: ['/security-review'],
      },
      {
        id: 'rubber-duck',
        title: 'Get a second opinion on a plan',
        summary: 'Ask the built-in rubber duck agent to critique a plan or implementation before you commit to it.',
        mode: 'plan',
        prompt:
          'Before implementing, ask the rubber duck agent to review your plan for logic errors, missed edge cases, and simpler alternatives. Incorporate its feedback and show me the revised plan.',
        outcome: 'A plan that has already been challenged once, with risks called out.',
        features: ['Rubber duck agent', 'Plan mode'],
      },
      {
        id: 'repo-config',
        title: 'Make a repository agent-ready',
        summary: 'Add .github/github-app.yml so every session installs dependencies and can start the dev server.',
        mode: 'interactive',
        prompt:
          'Create .github/github-app.yml for this repository. Add short instructions that capture our conventions, a Setup script that runs on session.create, a Run script that starts the dev server, and a server_ready_pattern that matches the dev server URL. Read the README and package scripts to choose the right commands.',
        outcome: 'A reviewed config file that makes new sessions start ready to build, test and preview.',
        features: ['Repository config', 'Integrated browser'],
      },
      {
        id: 'morning-automation',
        demo: { src: '/demos/scheduled-automation.webp', width: 1000, height: 744, alt: "Edit scheduled automation dialog. Instructions read: Review the pull request queue and summarize anything that needs attention. Schedule is Daily at 9:00 AM, with Delete schedule, Cancel and Save buttons.", caption: "A scheduled automation is a prompt plus a schedule." },
        title: 'Start the day with a PR briefing',
        summary: 'A daily automation that checks your open pull requests before you sit down.',
        mode: 'interactive',
        prompt:
          'List my open pull requests in this repository. For each one, report CI status, unresolved review threads, and whether it has merge conflicts. Put anything that needs my action first.',
        outcome: 'A prioritized briefing waiting in the app each morning.',
        features: ['Automations'],
        steps: ['Open Automations, click New automation, choose a Daily trigger and paste the prompt.'],
      },
      {
        id: 'cloud-sandbox',
        title: 'Offload a heavy upgrade to the cloud',
        summary: 'Run resource-intensive work in a GitHub-hosted cloud sandbox and keep your machine free.',
        mode: 'autopilot',
        prompt:
          'Upgrade the project to the latest major version of our test framework. Follow the official migration guide, update configuration and affected tests, run the full test suite until it passes, and summarize any behavior changes reviewers should know about.',
        outcome: 'A completed upgrade branch built and tested off your machine.',
        features: ['Cloud sandbox', 'Autopilot mode'],
      },
      {
        id: 'nightly-cloud-automation',
        title: 'Pair a cloud sandbox with a nightly automation',
        summary: 'Run a recurring heavy job, such as dependency upgrades, off your machine while you sleep.',
        mode: 'autopilot',
        prompt:
          'Check for outdated dependencies, upgrade patch and minor versions, run the full test suite and open one pull request with the upgrades that pass. List any upgrade that failed and why.',
        outcome: 'An upgrade pull request waiting each morning, built and tested in the cloud.',
        features: ['Automations', 'Cloud sandbox'],
      },
      {
        id: 'agent-merge',
        title: 'Shepherd a pull request with agent merge',
        summary: 'Agent merge addresses review comments, fixes failing checks and resolves conflicts while you start the next task.',
        mode: 'interactive',
        prompt:
          'Turn on agent merge for this pull request. Address review comments, fix failing checks and resolve merge conflicts. Do not merge until I confirm.',
        outcome: 'A pull request that keeps moving without you watching it.',
        // Verified: docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests ("Merging a pull request").
        // Agent merge merges as soon as GitHub allows, so branch protection and required reviews are the control.
        features: ['Agent merge', 'My work'],
        steps: [
          'Agent merge merges as soon as GitHub allows. Your branch protection rules and required reviews decide when that is.',
          'Check in when CI stays red after two fix attempts, or when a fix touches files outside the pull request.',
        ],
      },
    ],
    pitfalls: [
      'Vague prompts produce vague plans. Name the files, the constraint and how you will judge success.',
      'Autopilot is great for well-scoped tasks. Use Plan mode when the approach is still open.',
      'Check in when CI fails twice on the same check. Agents can loop on a red build, so read the failure yourself and give a concrete hint or take over.',
      'Accept a repository configuration only after reading every script it runs.',
      'Keep one task per session. Long, wandering sessions are harder to review.',
    ],
  },
  {
    slug: 'product-manager',
    name: 'Product manager',
    icon: 'project',
    tagline: 'Turn feedback into specs, prototypes and release notes without waiting on an engineering slot.',
    available: true,
    dayInTheLife: [
      { time: '8:30', text: 'Your daily triage automation has labeled and summarized overnight issues.' },
      { time: '10:00', text: 'In a Chat, you turn customer interview notes into a one-page spec.' },
      { time: '11:00', text: 'You start a Plan mode session to prototype the UI change and preview it in the integrated browser.' },
      { time: '15:00', text: 'The prototype link goes into the spec so engineers can react to something real.' },
      { time: '17:00', text: 'A weekly automation drafts the status update from merged PRs and closed issues.' },
    ],
    useCases: [
      {
        id: 'spec-from-notes',
        title: 'Draft a spec from raw notes',
        summary: 'Use a Chat for thinking work that does not need a branch or a working tree.',
        mode: 'interactive',
        prompt:
          'Turn the notes below into a one-page product spec with these sections: problem, target users, goals, non-goals, proposed solution, success metrics, risks, and open questions. Flag any claim in the notes that lacks evidence.\n\n<paste notes here>',
        outcome: 'A structured spec draft with gaps called out.',
        features: ['Chats'],
      },
      {
        id: 'spec-from-work-context',
        demo: { src: '/demos/featured-plugins.webp', width: 1000, height: 307, alt: "Three plugin cards from the Featured section of Customize: Azure, WorkIQ for answers across Microsoft 365 emails, meetings, documents and Teams messages, and Security Best Practices.", caption: "Featured plugins in Customize, including WorkIQ for Microsoft 365 context." },
        title: 'Pull Teams and meeting context into a spec or deck',
        summary: 'Use a connected work data source, such as WorkIQ, to gather discussion before you write.',
        mode: 'plan',
        prompt:
          'Using the connected work data source, collect the last two weeks of discussion about <topic> from our team channel and meeting notes. Summarize decisions, open questions and customer evidence with names removed. Then draft a one-page spec as a Word document and a five-slide summary deck. Show me the outline first.',
        outcome: 'A spec and deck grounded in what the team discussed.',
        // Public release notes (github.com/github/app/releases) list WorkIQ as a featured plugin in Customize.
        // TODO: Microsoft 365 tenant admin prerequisites for WorkIQ are not documented. Who would know: your Microsoft 365 admin, or GitHub through github/app issues.
        features: ['Connectors', 'Office canvases', 'Plan mode'],
      },
      {
        id: 'prototype',
        title: 'Rapid prototyping',
        summary: 'Build a rough, clickable version of an idea in the real product, or try two directions at once.',
        mode: 'plan',
        prompt:
          'Build a quick prototype of the following change so I can try it in the browser: <describe the change>. Keep it on this branch only, favor speed over polish and use fake data where real data would slow you down. Start the dev server when done, open the page in the browser canvas and list what is stubbed.',
        outcome: 'A running prototype on its own branch that you can share in a review or link from a spec.',
        features: ['Plan mode', 'Integrated browser', 'Parallel sessions'],
        steps: [
          'To compare directions, start a second session with a different description. Each runs in its own worktree.',
          'Share a screenshot or a short screen recording in the spec rather than asking people to run the branch.',
        ],
      },
      {
        id: 'issue-triage',
        title: 'Automate daily issue triage',
        summary: 'A scheduled automation that labels, deduplicates and summarizes new issues.',
        mode: 'interactive',
        prompt:
          'Review issues opened in the last 24 hours. For each one, suggest a label from our existing labels, flag likely duplicates with links, and note any that are missing reproduction steps. End with a three-line summary of themes.',
        outcome: 'A triage digest every morning and a cleaner backlog.',
        features: ['Automations'],
        steps: [
          'Create a new automation with a Daily trigger.',
          'For a cloud automation, select only the tools it needs, such as updating issue labels.',
        ],
      },
      {
        id: 'feedback-synthesis',
        title: 'Feedback triage',
        summary: 'Pull feedback from issues, discussions and connected channels into ranked themes, then file what is new.',
        mode: 'plan',
        prompt:
          'Collect feedback from the last 30 days: open issues labeled feedback, repository discussions and <connected channel, if approved>. Remove customer and personal names. Group items into themes with a count, two representative quotes with links and a suggested next step. Match each theme to an existing issue where one exists. Show me the table, then open issues only for the themes I approve.',
        outcome: 'A ranked theme table for planning, and new issues only where nothing was tracked.',
        features: ['Plan mode', 'My work', 'Connectors'],
        steps: [
          'Run it as a weekly automation once the output is useful. Give the automation only the tools it needs.',
          'Pair it with the daily issue triage automation, which handles labels and duplicates on new issues.',
        ],
      },
      {
        id: 'pm-data-analysis',
        title: 'Data analysis',
        summary: 'Answer a product question from a usage export or survey CSV without waiting for an analyst.',
        mode: 'interactive',
        prompt:
          'Open the attached CSV in an Excel canvas. It is <describe the data, for example weekly active users by feature and plan>. Answer: <your question>. Show the formulas or pivot you used, chart the result, and tell me which caveats in the data could change the answer.',
        outcome: 'A worked answer with a chart and the caveats you need before you quote it.',
        features: ['Chats', 'Office canvases'],
        steps: [
          'Remove customer identifiers from the export before you attach it.',
          'For a source the team queries often, set up a shared data-question project instead. See the Business & operations role.',
        ],
      },
      {
        id: 'pm-presentation',
        title: 'Build a quality presentation',
        summary: 'Go from spec and data to a reviewed deck, with speaker notes and a critique pass.',
        mode: 'plan',
        prompt:
          'Create a PowerPoint deck for <audience> about <topic> from the spec and data below. Use 8 slides or fewer, one message per slide, with the message as the slide title. Add speaker notes. Then review the deck as a skeptical <audience member>: list weak claims, missing data and slides to cut, and fix them.\n\n<paste or attach spec and data>',
        outcome: 'A tight deck with speaker notes that has already survived one round of critique.',
        features: ['Plan mode', 'Office canvases', 'Rubber duck agent'],
        steps: ['Ask for the outline first. Rewriting an outline costs less than reworking a finished deck.'],
      },
      {
        id: 'issues-from-meeting',
        title: 'Turn a planning meeting into issues',
        summary: 'Create well-formed issues that follow your repository templates.',
        mode: 'plan',
        prompt:
          'From the meeting notes below, propose a list of issues to create. Use the feature request template for new work and the bug template for defects. Show me the list for approval before creating anything.\n\n<paste notes here>',
        outcome: 'Template-compliant issues created after your review.',
        features: ['Plan mode'],
      },
      {
        id: 'release-notes',
        title: 'Write release notes from merged PRs',
        summary: 'Summarize what shipped in language customers understand.',
        mode: 'interactive',
        prompt:
          'Summarize the pull requests merged into main since the last release tag. Group them into New, Improved, and Fixed. Write each entry for customers rather than engineers, and skip internal refactors and test-only changes.',
        outcome: 'Customer-ready release notes you can edit and publish.',
        features: ['Interactive mode'],
      },
      {
        id: 'weekly-status',
        demo: { src: '/demos/scheduled-automation.webp', width: 1000, height: 744, alt: "Edit scheduled automation dialog. Instructions read: Review the pull request queue and summarize anything that needs attention. Schedule is Daily at 9:00 AM, with Delete schedule, Cancel and Save buttons.", caption: "A scheduled automation is a prompt plus a schedule." },
        title: 'Weekly status on autopilot',
        summary: 'A weekly automation drafts the team update from real repository activity.',
        mode: 'interactive',
        prompt:
          'Draft this week\'s team status update. Include shipped work from merged pull requests, notable issues opened or closed, anything blocked for more than five days, and next week\'s focus based on open milestones. Keep it under 250 words.',
        outcome: 'A draft update grounded in what happened, ready for you to edit.',
        features: ['Automations'],
      },
    ],
    pitfalls: [
      'Use Chats for brainstorming. Start a session only when you want files or a branch.',
      'Ask for a proposal before the agent creates issues or labels, so you stay in control.',
      'Keep prototypes on their own branch and label them clearly so nobody mistakes them for production work.',
      'Check numbers in a generated chart or deck against the source before you present them.',
    ],
  },
  {
    slug: 'designer',
    name: 'Designer',
    icon: 'paintbrush',
    tagline: 'Explore UI directions in code and review them in the integrated browser.',
    available: true,
    dayInTheLife: [
      { time: '9:30', text: 'You open a Chat to think through three layout options for the new settings page.' },
      { time: '10:15', text: 'Three Plan mode sessions each build one option on its own branch.' },
      { time: '11:30', text: 'You click through all three in the integrated browser and leave notes in each session.' },
      { time: '14:00', text: 'An accessibility pass on the winning option fixes contrast and focus order.' },
      { time: '16:00', text: 'You share the branch in design review so engineers react to working UI.' },
    ],
    useCases: [
      {
        id: 'design-variants',
        demo: { src: '/demos/plan-review.webp', width: 1000, height: 346, alt: "Review plan prompt with three choices: Approve and implement this plan, Exit plan mode and I will prompt myself, and Suggest changes to the plan. Cancel and Continue buttons sit below.", caption: "Plan mode asks you to approve, redirect or exit before it changes anything." },
        title: 'Build three directions side by side',
        summary: 'Run one session per variant so each idea lives on its own branch and preview.',
        mode: 'plan',
        prompt:
          'Build a variant of the <page or component> that follows this direction: <describe direction>. Reuse our existing design tokens and components. Do not change shared components. Start the dev server when done so I can compare it in the browser.',
        outcome: 'Three running variants you can compare without touching each other.',
        features: ['Parallel sessions', 'Plan mode', 'Integrated browser'],
        steps: [
          'Start a session per direction, each in a new working tree.',
          'Paste the prompt and change only the direction line.',
          'Open each preview in the integrated browser and compare.',
        ],
      },
      {
        id: 'design-polish',
        title: 'Polish spacing and states on a real page',
        summary: 'Point the agent at visual details while you watch the live preview update.',
        mode: 'interactive',
        prompt:
          'On the <page>, align spacing to our 4px scale, add hover, focus and disabled states to every interactive element, and make empty and loading states match our design system. Show me each change in the browser before moving on.',
        outcome: 'A page that matches the design system in every state, reviewed step by step.',
        features: ['Interactive mode', 'Integrated browser'],
      },
      {
        id: 'design-a11y',
        title: 'Run an accessibility pass',
        summary: 'Catch contrast, labeling and keyboard issues before review.',
        mode: 'interactive',
        prompt:
          'Audit <page> for WCAG 2.2 AA issues. Check color contrast in light and dark modes, labels on form controls and icon buttons, heading order, focus visibility and keyboard traps. Fix what you can, and list anything that needs a design decision.',
        outcome: 'Fixes for clear issues and a short list of decisions for you.',
        features: ['Interactive mode', 'Integrated browser'],
      },
      {
        id: 'design-tokens',
        title: 'Find drift from the design system',
        summary: 'Locate hard-coded colors, sizes and one-off components.',
        mode: 'plan',
        prompt:
          'Search the codebase for hard-coded colors, font sizes and spacing values that should use design tokens, and for components that duplicate ones in our design system. Group findings by area and propose a migration plan. Do not change code until I approve.',
        outcome: 'A ranked map of design debt with a plan you control.',
        features: ['Plan mode'],
      },
      {
        id: 'design-canvas',
        title: 'Write an interaction spec with the agent',
        summary: 'Draft the spec in an editor canvas so you and the agent edit the same document.',
        mode: 'interactive',
        prompt:
          'Open an editor canvas with a draft interaction spec for <feature>. Cover entry points, states, error handling and copy. I will edit alongside you, so reread the document before each change.',
        outcome: 'A spec you and the agent edited together, ready to hand to engineering.',
        features: ['Canvases', 'Chats'],
      },
    ],
    pitfalls: [
      'Tell the agent which tokens and components to reuse, or it may invent new ones.',
      'Keep variants on separate branches so a discarded idea never leaks into the winner.',
      'Check both color modes. Many contrast bugs only show up in one of them.',
    ],
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    icon: 'megaphone',
    tagline: 'Draft launch content, changelogs and demos grounded in what shipped.',
    available: true,
    dayInTheLife: [
      { time: '9:00', text: 'A weekly automation lists merged pull requests tagged for the next launch.' },
      { time: '10:00', text: 'In a Chat, you turn the list into a launch brief with messaging pillars.' },
      { time: '11:30', text: 'A session drafts the blog post and checks every claim against the code and docs.' },
      { time: '14:00', text: 'Another session builds a small demo app you can screen-record.' },
      { time: '16:00', text: 'You update landing page copy on a branch and preview it before review.' },
    ],
    useCases: [
      {
        id: 'mkt-launch-brief',
        title: 'Turn shipped work into a launch brief',
        summary: 'Start from what merged, so messaging matches the product.',
        mode: 'interactive',
        prompt:
          'Read the pull requests merged since <date or tag> that touch <area>. Write a launch brief with the audience, the problem, three messaging pillars with proof points linked to the PRs, and anything that is not ready to talk about yet.',
        outcome: 'A brief where every claim links to the change that backs it.',
        features: ['Interactive mode', 'My work'],
      },
      {
        id: 'mkt-blog',
        title: 'Draft a technically accurate blog post',
        summary: 'Write with the agent reading the code instead of guessing at it.',
        mode: 'plan',
        prompt:
          'Draft an 800-word blog post announcing <feature> for <audience>. Base every technical statement on the code and docs in this repository. Include a short getting-started snippet that you have run. Outline first and wait for my approval.',
        outcome: 'An outline you approve, then a draft with a tested code sample.',
        features: ['Plan mode'],
      },
      {
        id: 'mkt-deck',
        title: 'Build the launch deck in the app',
        summary: 'Create a PowerPoint deck in a canvas from the approved brief.',
        mode: 'interactive',
        prompt:
          'Create a PowerPoint deck from the launch brief above: title slide, problem, three pillar slides with proof points, a demo slide and a call to action. Keep text to three bullets per slide and add speaker notes.',
        outcome: 'A first-draft deck you refine slide by slide.',
        features: ['Office canvases'],
      },
      {
        id: 'mkt-site-copy',
        title: 'Update site copy and preview it',
        summary: 'Edit marketing pages on a branch and review the rendered result.',
        mode: 'interactive',
        prompt:
          'Update the copy on <page> to match this message: <message>. Keep the existing layout and components. Start the dev server and open the page so I can review the change before you commit.',
        outcome: 'A previewed copy change on its own branch, ready for review.',
        features: ['Interactive mode', 'Integrated browser'],
      },
      {
        id: 'mkt-demo',
        title: 'Build a demo you can record',
        summary: 'Get a small, reliable sample app for a video or live demo.',
        mode: 'autopilot',
        prompt:
          'Create a minimal demo app in a new folder that shows <feature> in under two minutes of screen time. Seed realistic sample data, make the happy path work end to end, and write a numbered demo script in DEMO.md.',
        outcome: 'A runnable demo and a script to record from.',
        features: ['Autopilot mode', 'Cloud sandbox'],
      },
      {
        id: 'mkt-changelog',
        demo: { src: '/demos/scheduled-automation.webp', width: 1000, height: 744, alt: "Edit scheduled automation dialog. Instructions read: Review the pull request queue and summarize anything that needs attention. Schedule is Daily at 9:00 AM, with Delete schedule, Cancel and Save buttons.", caption: "A scheduled automation is a prompt plus a schedule." },
        title: 'Weekly changelog draft',
        summary: 'An automation drafts customer-facing changelog entries every week.',
        mode: 'interactive',
        prompt:
          'Draft changelog entries for pull requests merged in the last 7 days that change user-facing behavior. Write one or two sentences each in plain language and link the PR. Skip internal and test-only changes.',
        outcome: 'A changelog draft waiting for you each Monday.',
        features: ['Automations'],
      },
    ],
    pitfalls: [
      'Ask the agent to cite the pull request or file behind every claim.',
      'Keep embargoed launch details out of prompts in shared deep links.',
      'Have an engineer check any code sample before it ships, even if the agent ran it.',
    ],
  },
  {
    slug: 'business-ops',
    name: 'Business & operations',
    icon: 'briefcase',
    tagline: 'Analyze data and build trackers, docs and decks in HR, finance and ops. No repository needed.',
    available: true,
    dayInTheLife: [
      { time: '9:00', text: 'You attach last quarter\'s review export to a Chat and open it in an Excel canvas.' },
      { time: '10:00', text: 'The agent tags each review by theme and builds a chart you tweak in plain language.' },
      { time: '13:00', text: 'You turn sales data into a forecast workbook with a dashboard tab.' },
      { time: '15:00', text: 'Meeting notes become a Word memo, a short deck and a tracker with owners.' },
      { time: '16:30', text: 'A teammate asks a question in the shared data project and gets an answer with its source.' },
    ],
    useCases: [
      {
        id: 'ops-csv-reviews',
        title: 'Analyze a CSV of customer reviews',
        summary: 'A good first session for anyone who does not work in a repository.',
        mode: 'interactive',
        prompt:
          'Open the attached CSV of customer reviews in an Excel canvas. Add columns for sentiment and theme, build a pivot of themes by month, and chart the top five themes. Tell me which rows you could not classify and why.',
        outcome: 'A tagged workbook with a theme chart you can share.',
        features: ['Office canvases', 'Chats'],
        steps: [
          'Start a Chat. You do not need a project or a branch.',
          'Attach the CSV, paste the prompt and keep refining in plain language.',
        ],
      },
      {
        id: 'ops-forecast',
        title: 'Build a forecast dashboard',
        summary: 'Turn raw sales or ops data into a tracker you iterate on by describing changes.',
        mode: 'interactive',
        prompt:
          'Using the attached data, build a workbook with a monthly forecast for the next two quarters, a tab that explains the method in plain language, and a dashboard sheet with charts. Then wait for my changes.',
        outcome: 'A forecast workbook with its method written down.',
        features: ['Office canvases', 'Chats'],
      },
      {
        id: 'ops-office-files',
        title: 'Turn notes into a memo, a deck and a tracker',
        summary: 'Create Word, PowerPoint and Excel files from one set of notes.',
        mode: 'interactive',
        prompt:
          'From the notes below, create a one-page Word memo, a three-slide PowerPoint summary and an Excel tracker of action items with owner, due date and status columns.\n\n<paste notes here>',
        outcome: 'Three matching files ready to edit and share.',
        features: ['Office canvases', 'Chats'],
      },
      {
        id: 'ops-data-project',
        title: 'Set up a shared data-question project',
        summary: 'A project with instructions and reference files that teammates use to ask questions about a data source.',
        mode: 'plan',
        prompt:
          'Help me set up a project that answers questions about <data source>. Draft project instructions that describe the tables, define our key metrics and require every answer to cite the table and query it used. Add a README with five example questions.',
        outcome: 'A reusable project where answers come with their sources.',
        features: ['Repository config', 'Connectors'],
      },
      {
        id: 'ops-m365-context',
        demo: { src: '/demos/featured-plugins.webp', width: 1000, height: 307, alt: "Three plugin cards from the Featured section of Customize: Azure, WorkIQ for answers across Microsoft 365 emails, meetings, documents and Teams messages, and Security Best Practices.", caption: "Featured plugins in Customize, including WorkIQ for Microsoft 365 context." },
        title: 'Pull work context into a document',
        summary: 'Use a connected work data source to gather Teams threads and meeting notes before you draft.',
        mode: 'plan',
        prompt:
          'Using the connected work data source, collect the last two weeks of discussion about <topic> from our team channel and meeting notes. Summarize decisions, open questions and owners, then draft a Word document. Show me the outline first.',
        outcome: 'A document grounded in what the team discussed.',
        // TODO: Microsoft 365 tenant admin prerequisites for WorkIQ are not documented. Who would know: your Microsoft 365 admin, or GitHub through github/app issues.
        features: ['Connectors', 'Office canvases'],
      },
    ],
    pitfalls: [
      'Remove personal and customer data from files before you attach them.',
      'Decide where generated files live, on your machine or in OneDrive or SharePoint, before you share them.',
      'Ask the agent to show its formulas. Check one or two by hand before you trust a forecast.',
    ],
  },
  {
    slug: 'sales',
    name: 'Sales',
    icon: 'graph',
    tagline: 'Prepare for accounts, build sales presentations and hear what customers are saying, without digging through tools.',
    available: true,
    dayInTheLife: [
      { time: '8:30', text: 'A morning automation lists today\'s meetings with a short brief on each account and its open opportunities.' },
      { time: '10:00', text: 'Before a renewal call, you ask for the account\'s recent feedback and support history in one summary.' },
      { time: '13:00', text: 'You turn the discovery notes into a tailored PowerPoint deck and review it with the agent.' },
      { time: '15:30', text: 'You review the pipeline for the quarter and get a list of deals with no next step.' },
      { time: '17:00', text: 'You draft follow-up emails from your call notes and send them yourself.' },
    ],
    useCases: [
      {
        id: 'sales-account-brief',
        title: 'Query account information and opportunities',
        summary: 'Ask plain-language questions about an account and its open opportunities in your CRM.',
        mode: 'interactive',
        prompt:
          'Using the connected CRM, give me a one-page brief on <account>: open opportunities with stage, amount and close date, the last three activities, key contacts by role and any risks noted in the record. Flag fields that look out of date. Do not change any records.',
        outcome: 'A meeting-ready account brief pulled from the system of record.',
        // TODO: no public docs or release notes name a Salesforce connector. Unknown: whether one ships and its read
        // scopes. Who would know: GitHub through github/app issues, or your CRM admin for third-party MCP servers. CSV export works today.
        features: ['Chats', 'Connectors'],
        steps: [
          'Prerequisite: an admin-approved Salesforce connector or MCP server, authorized with your own account and read-only scope.',
          'Without a connector, export the account or opportunity report to CSV and attach it.',
        ],
      },
      {
        id: 'sales-pipeline',
        title: 'Review the pipeline',
        summary: 'Find deals that need attention before the forecast call.',
        mode: 'interactive',
        prompt:
          'From the attached opportunity export (or the connected CRM), open an Excel canvas with my open opportunities this quarter. Add columns for days in stage and days since last activity. Highlight deals with no next step, a close date in the past or no activity in 14 days, and chart pipeline by stage.',
        outcome: 'A pipeline sheet with the deals that need you highlighted.',
        // TODO: same Salesforce connector question as sales-account-brief. CSV export works today.
        features: ['Office canvases', 'Connectors'],
      },
      {
        id: 'sales-deck',
        demo: { src: '/demos/plan-review.webp', width: 1000, height: 346, alt: "Review plan prompt with three choices: Approve and implement this plan, Exit plan mode and I will prompt myself, and Suggest changes to the plan. Cancel and Continue buttons sit below.", caption: "Plan mode asks you to approve, redirect or exit before it changes anything." },
        title: 'Create a sales presentation',
        summary: 'Tailor a deck to one account from your notes and approved product material.',
        mode: 'plan',
        prompt:
          'Create a PowerPoint deck for <account type, for example a mid-size retailer> from the discovery notes and approved product material below. Use 8 slides or fewer: their goals in their words, current challenges, how we help, proof points, rollout plan and next steps. Add speaker notes. Use only claims from the approved material and list any you could not support.\n\n<paste notes and material>',
        outcome: 'A tailored deck with speaker notes and no unsupported claims.',
        features: ['Plan mode', 'Office canvases'],
        steps: ['Start from your team\'s template file so the deck matches brand guidelines.'],
      },
      {
        id: 'sales-feedback',
        title: 'Understand account feedback in Salesforce',
        summary: 'Summarize what an account has said across cases, notes and activities.',
        mode: 'interactive',
        prompt:
          'Using the connected CRM, collect feedback for <account> from the last 6 months: cases, call notes and activity comments. Group it into themes with dates and one short quote each. Separate product gaps from service issues, and list any feedback that already has a linked product issue.',
        outcome: 'A clear picture of the account\'s feedback before a renewal or QBR.',
        // TODO: which Salesforce objects (cases, notes, activities) a connector can read is not documented. Who would know: GitHub through github/app issues, or your CRM admin.
        features: ['Chats', 'Connectors'],
        steps: ['Share product gaps with your PM through the feedback triage workflow, with the account name removed if it leaves the sales team.'],
      },
      {
        id: 'sales-followup',
        title: 'Draft follow-ups from call notes',
        summary: 'Turn rough notes into a recap email and next steps.',
        mode: 'interactive',
        prompt:
          'Turn the call notes below into a short recap email: what we heard, what we agreed and next steps with owners and dates. Keep it under 150 words and match a friendly, direct tone. Then list the CRM fields I should update.\n\n<paste notes>',
        outcome: 'A recap email and a CRM update list, ready for you to send and enter.',
        features: ['Chats'],
      },
    ],
    pitfalls: [
      'CRM access needs an approved connector or MCP server. Ask your admin before you authorize anything.',
      'Keep connector access read-only. Make record changes yourself.',
      'Keep account and customer names out of shared prompts, prompt libraries and screenshots.',
      'Check every number in a generated deck against the CRM before it goes to a customer.',
    ],
  },
  {
    slug: 'engineering-manager',
    name: 'Engineering manager',
    icon: 'people',
    tagline: 'Track delivery, reduce toil and coach your team on agent workflows.',
    available: true,
    dayInTheLife: [
      { time: '8:45', text: 'A daily automation flags pull requests waiting on review for more than a day.' },
      { time: '9:30', text: 'The overnight feedback coordinator opened two fix PRs from user reports. You assign reviewers.' },
      { time: '13:00', text: 'A Plan mode session breaks a new project into issues for the team to pick up.' },
      { time: '15:00', text: 'You add two prompts that worked well to the team prompt library.' },
      { time: '17:00', text: 'A weekly automation drafts the status update for your director.' },
    ],
    useCases: [
      {
        id: 'em-review-queue',
        demo: { src: '/demos/scheduled-automation.webp', width: 1000, height: 744, alt: "Edit scheduled automation dialog. Instructions read: Review the pull request queue and summarize anything that needs attention. Schedule is Daily at 9:00 AM, with Delete schedule, Cancel and Save buttons.", caption: "A scheduled automation is a prompt plus a schedule." },
        title: 'Keep the review queue moving',
        summary: 'A daily automation that finds stuck pull requests before they age.',
        mode: 'interactive',
        prompt:
          'List open pull requests in this repository that have waited more than 24 hours for a first review or more than 48 hours since the last update. Group by author, show requested reviewers, and suggest who could review based on recent changes to the same files.',
        outcome: 'A daily list of stuck PRs with suggested reviewers.',
        features: ['Automations', 'My work'],
      },
      {
        id: 'em-coordinator',
        title: 'Run a feedback-to-fix coordinator on a schedule',
        summary:
          'An automation reads user feedback and error data, dedupes it into issues, investigates and opens fix PRs, then repeats.',
        mode: 'autopilot',
        prompt:
          'Collect feedback from <Teams or Slack channel> and errors from <error tracker> for the last 24 hours. Group them into distinct problems, match each to an existing issue or open a new one, and investigate the top three. For any with a clear fix, open a pull request with a test and confirm CI passes. Report what you did and what needs a human.',
        outcome: 'A daily loop from user signal to reviewed fix PRs, with a report of what still needs people.',
        // Public release notes (github.com/github/app/releases) cover Dynamic Workflows, renamed from Agent Factories.
        // TODO: no docs.github.com page covers limits or plan availability yet. Who would know: GitHub, through github/app issues or the docs.github.com feedback link.
        features: ['Automations', 'Connectors', 'Child sessions', 'Dynamic workflows'],
        steps: [
          'Connect the chat and error-tracking sources the automation needs, such as Slack or a Sentry MCP server.',
          'Create a daily automation with the prompt and the smallest tool set that works.',
          'Read the first week of reports yourself before you trust it to open PRs unattended.',
        ],
      },
      {
        id: 'em-breakdown',
        title: 'Break a project into issues',
        summary: 'Turn a design doc into scoped issues the team can pick up.',
        mode: 'plan',
        prompt:
          'Read the design doc below and the code it affects. Propose a breakdown into issues of one to three days each, with acceptance criteria, dependencies and a suggested order. Show me the list before creating anything.\n\n<paste design doc>',
        outcome: 'A reviewed issue breakdown created from your repository templates.',
        features: ['Plan mode'],
      },
      {
        id: 'em-toil',
        title: 'Retire one recurring chore',
        summary: 'Find a repeated manual task and turn it into an automation.',
        mode: 'interactive',
        prompt:
          'Look at issues and pull requests from the last 60 days and find recurring manual chores, such as dependency bumps, flaky test reruns or release checklists. Rank them by how often they happen and propose an automation prompt for the top one.',
        outcome: 'A ranked chore list and a ready-to-save automation.',
        features: ['Automations', 'Chats'],
      },
      {
        id: 'em-onboarding',
        title: 'Onboard a new teammate faster',
        summary: 'Generate a guided tour of the codebase for someone new.',
        mode: 'interactive',
        prompt:
          'Write an onboarding guide for a new engineer joining this repository. Cover the architecture, how to build and test, the five most important directories, common pitfalls from recent bug fixes and three good first issues that are open now.',
        outcome: 'A current onboarding guide based on the code as it is today.',
        features: ['Interactive mode'],
      },
      {
        id: 'em-status',
        title: 'Draft the weekly status update',
        summary: 'Report delivery from real activity instead of memory.',
        mode: 'interactive',
        prompt:
          'Draft my weekly team update. Include work shipped, work in review, anything blocked, risks to the current milestone and one highlight per person based on their merged pull requests. Keep it under 300 words.',
        outcome: 'A grounded status draft you edit and send.',
        features: ['Automations'],
      },
    ],
    pitfalls: [
      'Never use agent activity as a performance metric for individuals. Measure team outcomes.',
      'Model the workflow yourself. Teams copy what their manager does.',
      'Give champions real time for the role, or the program stalls after the pilot.',
    ],
  },
  {
    slug: 'devrel-support',
    name: 'DevRel & support',
    icon: 'comment-discussion',
    tagline: 'Reproduce reports, write samples and answer questions faster.',
    available: true,
    dayInTheLife: [
      { time: '9:00', text: 'A daily automation groups new support issues by theme and flags likely duplicates.' },
      { time: '10:00', text: 'A session reproduces a customer bug in a cloud sandbox and writes a failing test.' },
      { time: '11:30', text: 'You turn the fix into a short sample and update the docs page that caused confusion.' },
      { time: '14:00', text: 'You draft a blog post from a sample that already runs, and kick off a Remotion render of the demo video.' },
      { time: '16:00', text: 'A weekly automation summarizes top questions for the product team.' },
    ],
    useCases: [
      {
        id: 'dr-repro',
        title: 'Reproduce a bug report',
        summary: 'Turn a vague report into a failing test or a clear "cannot reproduce".',
        mode: 'autopilot',
        prompt:
          'Reproduce the bug in the linked issue. Follow the reported steps, then try likely variations. If you reproduce it, write a minimal failing test and stop. If you cannot, list what you tried and the information to ask the reporter for.',
        outcome: 'A failing test or a precise follow-up question for the reporter.',
        features: ['Autopilot mode', 'Cloud sandbox', 'My work'],
      },
      {
        id: 'dr-sample',
        demo: { src: '/demos/plan-review.webp', width: 1000, height: 346, alt: "Review plan prompt with three choices: Approve and implement this plan, Exit plan mode and I will prompt myself, and Suggest changes to the plan. Cancel and Continue buttons sit below.", caption: "Plan mode asks you to approve, redirect or exit before it changes anything." },
        title: 'Write and test a code sample',
        summary: 'Create samples that run, not samples that look right.',
        mode: 'plan',
        prompt:
          'Create a sample in <language> that shows how to <task> with our SDK. Keep it under 60 lines, add comments only where the API is surprising, run it against the test environment and add a README with setup steps.',
        outcome: 'A runnable, tested sample with setup instructions.',
        features: ['Plan mode'],
      },
      {
        id: 'dr-blog',
        title: 'Write a blog post with code that runs',
        summary: 'Draft a tutorial post where every snippet comes from a tested sample.',
        mode: 'plan',
        prompt:
          'Write a developer blog post about <topic> for <audience>. Build the sample first in a samples/<slug> folder and run it. Pull every code snippet in the post from that sample, so nothing is untested. Include prerequisites, the steps, the expected output and a "what to try next" section. Keep it under 1,200 words.',
        outcome: 'A draft post and a runnable sample that back each other up.',
        features: ['Plan mode', 'Canvases'],
        steps: ['Open the draft in an editor canvas to edit it together with the agent before review.'],
      },
      {
        id: 'dr-video',
        title: 'Create a video',
        summary: 'Script, storyboard and render a short demo or explainer video from code.',
        mode: 'plan',
        prompt:
          'Plan a 90-second video that shows <feature>. First write the script with timings and a shot-by-shot storyboard, and wait for my approval. Then build it as a Remotion project in videos/<slug>: title card, screen captures I provide in assets/, captions from the script and an end card. Render it to MP4 and use ffmpeg to make a 30-second cut for social.',
        outcome: 'An approved script, a storyboard and rendered MP4 files you can regenerate when the product changes.',
        // Checked: neither docs.github.com nor the public release notes describe built-in voiceover, screen recording
        // or video generation, so this workflow relies on code tools like Remotion and ffmpeg.
        features: ['Plan mode', 'Canvases'],
        steps: [
          'Record the screen captures yourself, or have the agent script them with a browser automation tool your team already uses.',
          'Keep the video as code in the repository so updates are a prompt away.',
        ],
      },
      {
        id: 'dr-social',
        title: 'Summarize social media feedback',
        summary: 'Turn a week of posts and replies into themes, sentiment and follow-ups.',
        mode: 'interactive',
        prompt:
          'Open the attached export of social posts that mention <product> from the last 7 days. Remove usernames. Group posts into themes with a count, overall sentiment and two representative quotes each. Flag bug reports and link any that match an existing issue. Draft a reply for the three posts that most need one, for me to review and post myself.',
        outcome: 'A weekly social digest, matched issues and draft replies that a person posts.',
        // TODO: no first-party social platform connector found. The MCP registry lists third-party social servers;
        // each needs security review. Owner: your security team. Use an exported CSV until one is approved.
        features: ['Chats', 'Office canvases', 'My work'],
      },
      {
        id: 'dr-docs-gap',
        title: 'Fix the docs page behind repeat questions',
        summary: 'Find where docs and code disagree and correct them.',
        mode: 'interactive',
        prompt:
          'Compare the docs page <path> with the current implementation. List every place where the docs are wrong, missing or out of date. Then update the page, and preview it if the docs site has a dev server.',
        outcome: 'A docs fix grounded in the code, with a preview.',
        features: ['Interactive mode', 'Integrated browser'],
      },
      {
        id: 'dr-feedback-loop',
        title: 'Turn community feedback into tracked issues',
        summary: 'A scheduled automation reads a chat channel and error data, then files deduplicated issues.',
        mode: 'interactive',
        prompt:
          'Read the last 24 hours of <Slack or Teams channel> and recent errors from <error tracker>. Group reports that describe the same problem, link each group to an existing issue or open a new one with steps and quotes, and post a short summary of what you filed.',
        outcome: 'A clean issue backlog that reflects what users report.',
        features: ['Automations', 'Connectors'],
      },
      {
        id: 'dr-insights',
        title: 'Send the top questions to product',
        summary: 'A weekly summary that turns support load into product input.',
        mode: 'interactive',
        prompt:
          'Summarize the support and discussion threads from the last 7 days. List the top five questions by volume with links, the docs or product change that would remove each one, and any quotes worth sharing with customer details removed.',
        outcome: 'A weekly digest the product team can act on.',
        features: ['Automations', 'Chats'],
      },
    ],
    pitfalls: [
      'Strip customer data from reports before you paste them into a prompt.',
      'Run reproductions in a sandbox, especially when the report includes scripts or files.',
      'Keep samples small. The agent will add features unless you set a limit.',
      'Never let an agent post to social channels for you. Draft replies, then post them yourself.',
    ],
  },
  {
    slug: 'security-admin',
    name: 'Security & admin',
    icon: 'shield-lock',
    tagline: 'Set policy, review configurations and keep sessions safe.',
    available: true,
    dayInTheLife: [
      { time: '9:00', text: 'You review new or changed .github/github-app.yml files from the past week.' },
      { time: '10:30', text: 'A session runs /security-review on a sensitive service before a release.' },
      { time: '13:00', text: 'You approve a connector request with read-only scope and record the decision.' },
      { time: '14:30', text: 'You narrow a cloud automation\'s tools before it goes live.' },
      { time: '16:00', text: 'You move the next ring of users from the pilot cohort to general availability.' },
    ],
    useCases: [
      {
        id: 'sec-review',
        title: 'Run a security review before release',
        summary: 'Find high-confidence vulnerabilities in changed code.',
        mode: 'interactive',
        prompt: '/security-review',
        outcome: 'Findings with severity, confidence and suggested fixes.',
        features: ['/security-review'],
      },
      {
        id: 'sec-config-audit',
        title: 'Audit repository configurations',
        summary: 'Check every github-app.yml for risky scripts.',
        mode: 'plan',
        prompt:
          'Review .github/github-app.yml in this repository. For each script, explain what it runs, what network and credential access it needs, and whether it downloads and executes remote code. Flag anything that should require security sign-off and propose safer alternatives.',
        outcome: 'A risk review of every script that runs with GitHub credentials.',
        features: ['Repository config', 'Plan mode'],
      },
      {
        id: 'sec-sandbox',
        title: 'Choose sandbox defaults per repository',
        summary: 'Decide where local sandboxing or cloud sandboxes fit.',
        mode: 'interactive',
        prompt:
          'Based on this repository\'s build, test and dev server needs, recommend whether sessions should default to a local sandbox or a cloud sandbox. List the network hosts and file paths the agent needs, and anything that should stay blocked.',
        outcome: 'A documented sandbox default with a network allow list.',
        features: ['Local sandbox', 'Cloud sandbox'],
      },
      {
        id: 'sec-automation-scope',
        title: 'Narrow cloud automation tools',
        summary: 'Give each automation the least access it needs.',
        mode: 'interactive',
        prompt:
          'Review this automation prompt and list the minimum tools it needs to succeed. Mark each tool as read or write, explain why it is needed, and suggest how to split the automation if write access is only needed for one step.\n\n<paste automation prompt>',
        outcome: 'A least-privilege tool list for every automation you approve.',
        features: ['Automations'],
      },
      {
        id: 'sec-connectors',
        demo: { src: '/demos/featured-plugins.webp', width: 1000, height: 307, alt: "Three plugin cards from the Featured section of Customize: Azure, WorkIQ for answers across Microsoft 365 emails, meetings, documents and Teams messages, and Security Best Practices.", caption: "Featured plugins in Customize, including WorkIQ for Microsoft 365 context." },
        title: 'Review connector and MCP server requests',
        summary: 'Assess what data a requested integration can read and change before anyone authorizes it.',
        mode: 'plan',
        prompt:
          'A team wants to add the <name> connector. Summarize what data it can read and write, how it authenticates, where data leaves our network and what a misused prompt could do with it. Recommend approve, approve with limits or reject.',
        outcome: 'A consistent review record for every integration request.',
        // Verified: the "MCP servers in Copilot" and "Restrict MCP access to registry servers" policies apply to the app
        // (docs.github.com/en/copilot/reference/supported-surfaces-for-policies), and managed-settings.json supports
        // allowedMcpServers and deniedMcpServers (reference/enterprise-administrators/enterprise-managed-settings).
        features: ['Connectors', 'Plan mode'],
        steps: [
          'Approved servers go in allowedMcpServers in your enterprise managed-settings.json. Blocked servers go in deniedMcpServers, which always wins.',
          'The "MCP servers in Copilot" and "Restrict MCP access to registry servers" policies also apply to the app.',
        ],
      },
      {
        id: 'sec-deps',
        title: 'Fix vulnerable dependencies',
        summary: 'Upgrade flagged packages with tests passing.',
        mode: 'autopilot',
        prompt:
          'Find dependencies in this repository with known vulnerabilities. Upgrade each to the lowest fixed version, run the test suite after each upgrade, and stop to report if an upgrade needs code changes beyond a few lines.',
        outcome: 'Patched dependencies with green tests, or a clear report on the hard ones.',
        features: ['Autopilot mode', 'Cloud sandbox'],
      },
    ],
    pitfalls: [
      'Require code owner review on .github/github-app.yml, the same as CI workflows.',
      'Write down who approves write access for cloud automations before the first request arrives.',
      'Never embed secrets in prompts, deep links or automation definitions.',
    ],
  },
];

export const availableRoles = roles.filter((r) => r.available);

export interface PromptEntry extends UseCase {
  role: Pick<Role, 'slug' | 'name' | 'icon'>;
  outcomes: OutcomeId[];
}

export const promptEntries: PromptEntry[] = availableRoles.flatMap((role) =>
  (role.useCases ?? []).map((u) => ({
    ...u,
    role: { slug: role.slug, name: role.name, icon: role.icon },
    outcomes: outcomesFor(u.id),
  })),
);
