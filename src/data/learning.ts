export interface Lesson {
  id: string;
  title: string;
}

export interface LearningModule {
  id: string;
  name: string;
  path: string;
  icon: string;
  time: string;
  summary: string;
  lessons: Lesson[];
}

export const modules: LearningModule[] = [
  {
    id: 'first-hour',
    name: 'First hour',
    path: '/get-started/first-hour/',
    icon: 'rocket',
    time: 'About 1 hour',
    summary: 'Install the app, learn the core ideas and take one real issue to a pull request.',
    lessons: [
      { id: 'core-ideas', title: 'Learn the core ideas' },
      { id: 'install', title: 'Install and sign in' },
      { id: 'project', title: 'Add a project' },
      { id: 'plan-session', title: 'Run a Plan mode session' },
      { id: 'review-pr', title: 'Review and open the pull request' },
    ],
  },
  {
    id: 'fluency',
    name: 'Copilot app fluency',
    path: '/get-started/fluency/',
    icon: 'light-bulb',
    time: 'About 20 minutes',
    summary: 'Four habits for working well with agents: Scope, Context, Check and Share.',
    lessons: [
      { id: 'scope', title: 'Scope the task' },
      { id: 'context', title: 'Give it context' },
      { id: 'check', title: 'Check the work' },
      { id: 'share', title: 'Share what worked' },
    ],
  },
  {
    id: 'first-week',
    name: 'First week',
    path: '/get-started/first-week/',
    icon: 'milestone',
    time: '15 to 30 minutes a day',
    summary: 'Run sessions in parallel, try a canvas, make your repository agent-ready and save your first automation.',
    lessons: [
      { id: 'parallel', title: 'Run two sessions in parallel' },
      { id: 'canvas', title: 'Work in a canvas without a repository' },
      { id: 'review-loop', title: 'Fix review comments and failing checks' },
      { id: 'repo-config', title: 'Make your repository agent-ready' },
      { id: 'second-opinion', title: 'Get a second opinion before you merge' },
      { id: 'automation', title: 'Save your first automation' },
    ],
  },
  {
    id: 'first-month',
    name: 'First month',
    path: '/get-started/first-month/',
    icon: 'mortar-board',
    time: 'A few hours across the month',
    summary: 'Teach the agent your team\'s conventions, schedule work, try more autonomy and help a teammate start.',
    lessons: [
      { id: 'instructions', title: 'Write instructions for your team' },
      { id: 'plugins', title: 'Install a skill or plugin from your organization' },
      { id: 'schedule', title: 'Put a recurring chore on a schedule' },
      { id: 'cloud', title: 'Hand a long task to a cloud sandbox' },
      { id: 'agent-merge', title: 'Let Agent merge shepherd a pull request' },
      { id: 'teach', title: 'Share one workflow with your team' },
    ],
  },
];

export const lessonKey = (moduleId: string, lessonId: string) => `${moduleId}/${lessonId}`;
export const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
