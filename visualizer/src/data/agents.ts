export interface Agent {
  id: string;
  role: string;
  title: string;
  icon: string;
  color: string;
  responsibilities: string[];
  position: { x: number; y: number };
}

export const agents: Agent[] = [
  {
    id: 'board',
    role: 'Human Board',
    title: 'Founder',
    icon: 'Users',
    color: '#f5c542',
    responsibilities: [
      'Final business direction',
      'Budget approval',
      'Major strategic decisions',
      'Approval of new agents',
      'Priority changes',
    ],
    position: { x: 0, y: 0 },
  },
  {
    id: 'ceo',
    role: 'CEO',
    title: 'Strategy & Delegation',
    icon: 'Crown',
    color: '#f5c542',
    responsibilities: [
      'Triage incoming work',
      'Delegate to correct owner',
      'Hire new agents',
      'Resolve cross-team ambiguity',
      'Escalate to Board',
    ],
    position: { x: 0, y: 150 },
  },
  {
    id: 'cpo',
    role: 'CPO',
    title: 'Product Vision',
    icon: 'Lightbulb',
    color: '#a855f7',
    responsibilities: [
      'Product vision & strategy',
      'Roadmap',
      'User stories',
      'Acceptance criteria',
      'Success metrics',
    ],
    position: { x: -200, y: 300 },
  },
  {
    id: 'cto',
    role: 'CTO',
    title: 'Technical Architecture',
    icon: 'Wrench',
    color: '#3b82f6',
    responsibilities: [
      'Technical architecture',
      'Engineering planning',
      'Technical feasibility',
      'Code quality',
      'Engineering standards',
    ],
    position: { x: 200, y: 300 },
  },
  {
    id: 'backend',
    role: 'Backend Engineer',
    title: 'APIs & Services',
    icon: 'Server',
    color: '#22c55e',
    responsibilities: [
      'APIs',
      'Database schemas',
      'Backend services',
      'Business logic',
      'Backend testing',
    ],
    position: { x: 0, y: 460 },
  },
  {
    id: 'frontend',
    role: 'Frontend Engineer',
    title: 'UI & Screens',
    icon: 'Monitor',
    color: '#06b6d4',
    responsibilities: [
      'User-facing screens',
      'Frontend flows',
      'Forms & validation',
      'Responsive behavior',
      'Accessibility',
    ],
    position: { x: 250, y: 460 },
  },
  {
    id: 'devops',
    role: 'DevOps Engineer',
    title: 'Infrastructure & Delivery',
    icon: 'Rocket',
    color: '#f97316',
    responsibilities: [
      'Deployment',
      'CI/CD',
      'Infrastructure automation',
      'Monitoring & logging',
      'Release reliability',
    ],
    position: { x: 450, y: 460 },
  },
];

export const agentMap = Object.fromEntries(agents.map((a) => [a.id, a]));
