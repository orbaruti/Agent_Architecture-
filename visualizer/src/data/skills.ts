export interface Skill {
  id: string;
  name: string;
  description: string;
  tools?: string[];
}

export const skills: Skill[] = [
  // CEO skills
  { id: 'work-triage', name: 'Work Triage', description: 'Classify incoming requests and determine priority and correct owner.' },
  { id: 'strategic-delegation', name: 'Strategic Delegation', description: 'Delegate work to the correct agent with clear context and expectations.' },
  { id: 'priority-assessment', name: 'Priority Assessment', description: 'Evaluate business priority and urgency of tasks across the organization.' },
  { id: 'escalation-management', name: 'Escalation Management', description: 'Escalate decisions to the Board when founder-level authority is required.' },
  { id: 'hiring-evaluation', name: 'Hiring Evaluation', description: 'Assess whether a repeatable workflow justifies creating a new agent.' },
  { id: 'cross-team-coordination', name: 'Cross-Team Coordination', description: 'Resolve ambiguity and coordinate across product, engineering, and operations.' },

  // COO skills
  { id: 'workflow-design', name: 'Workflow Design', description: 'Design new operational workflows with clear ownership, handoffs, and gates.' },
  { id: 'conflict-analysis', name: 'Conflict Analysis', description: 'Detect conflicts between proposed and existing workflows.' },
  { id: 'operational-review', name: 'Operational Review', description: 'Review workflows for operational completeness and executability.' },
  { id: 'process-audit', name: 'Process Audit', description: 'Audit existing processes for consistency and improvement opportunities.' },
  { id: 'bottleneck-identification', name: 'Bottleneck Identification', description: 'Identify and report operational bottlenecks across workflows.' },

  // CPO skills
  { id: 'requirement-definition', name: 'Requirement Definition', description: 'Define problem statements, target users, and product objectives.' },
  { id: 'user-story-authoring', name: 'User Story Authoring', description: 'Write user stories with clear acceptance criteria and success metrics.' },
  { id: 'acceptance-criteria-design', name: 'Acceptance Criteria Design', description: 'Design measurable acceptance criteria for features.' },
  { id: 'product-validation', name: 'Product Validation', description: 'Validate product decisions against user needs and business goals.' },
  { id: 'roadmap-prioritization', name: 'Roadmap Prioritization', description: 'Prioritize features on the product roadmap based on business value.' },
  { id: 'messaging-validation', name: 'Messaging Validation', description: 'Validate product messaging for accuracy and alignment with vision.' },

  // CTO skills
  { id: 'architecture-design', name: 'Architecture Design', description: 'Design high-level technical architecture for features and systems.' },
  { id: 'feasibility-assessment', name: 'Feasibility Assessment', description: 'Assess technical feasibility, risks, and dependencies of product plans.' },
  { id: 'implementation-planning', name: 'Implementation Planning', description: 'Break technical work into clear, assignable engineering tasks.' },
  { id: 'integration-review', name: 'Integration Review', description: 'Review integrated results across backend, frontend, and infrastructure.' },
  { id: 'engineering-standards', name: 'Engineering Standards', description: 'Define and enforce code quality, testing, and engineering standards.' },
  { id: 'technical-triage', name: 'Technical Triage', description: 'Triage technical issues to the correct engineering area.' },
  { id: 'release-decision', name: 'Release Decision', description: 'Decide release readiness based on QA results and technical quality.' },
  { id: 'failure-classification', name: 'Failure Classification', description: 'Classify CI/CD failures as real bugs vs automation issues.' },

  // HR skills
  { id: 'prompt-engineering', name: 'Prompt Engineering', description: 'Draft and refine agent prompts following the Prompt Management Standard.' },
  { id: 'agent-onboarding', name: 'Agent Onboarding', description: 'Run the full onboarding workflow for new agents including handshakes.' },
  { id: 'performance-evaluation', name: 'Performance Evaluation', description: 'Evaluate agent performance weekly across defined metrics.' },
  { id: 'role-definition', name: 'Role Definition', description: 'Define agent roles, responsibilities, boundaries, and reporting lines.' },
  { id: 'handshake-facilitation', name: 'Handshake Facilitation', description: 'Facilitate handshake processes between new and existing agents.' },

  // Backend Lead skills
  { id: 'backend-detailed-design', name: 'Backend Detailed Design', description: 'Create detailed backend designs from high-level CTO architecture.' },
  { id: 'backend-code-review', name: 'Backend Code Review', description: 'Review backend code for quality, test coverage, and performance.' },
  { id: 'backend-task-breakdown', name: 'Backend Task Breakdown', description: 'Break backend work into specific implementation tasks.' },
  { id: 'backend-bug-evaluation', name: 'Backend Bug Evaluation', description: 'Evaluate backend bugs and determine fix approach.' },

  // Backend Engineer skills
  { id: 'api-development', name: 'API Development', description: 'Design and implement API endpoints and contracts.', tools: ['IDE', 'GitHub'] },
  { id: 'database-design', name: 'Database Design', description: 'Design database schemas, write migrations, and optimize queries.', tools: ['IDE', 'Database'] },
  { id: 'business-logic', name: 'Business Logic', description: 'Implement core business logic and service layers.', tools: ['IDE'] },
  { id: 'backend-testing', name: 'Backend Testing', description: 'Write unit and integration tests for backend code.', tools: ['IDE', 'CI/CD'] },
  { id: 'backend-bug-fixing', name: 'Backend Bug Fixing', description: 'Investigate, diagnose, and fix backend bugs.', tools: ['IDE', 'GitHub'] },

  // Frontend Lead skills
  { id: 'frontend-detailed-design', name: 'Frontend Detailed Design', description: 'Create detailed frontend designs with component structure and interaction flows.' },
  { id: 'frontend-code-review', name: 'Frontend Code Review', description: 'Review frontend code for quality, test coverage, and performance.' },
  { id: 'frontend-task-breakdown', name: 'Frontend Task Breakdown', description: 'Break frontend work into specific implementation tasks.' },
  { id: 'ui-ux-evaluation', name: 'UI/UX Evaluation', description: 'Evaluate UI implementations for design quality and user experience.' },

  // Frontend Engineer skills
  { id: 'ui-development', name: 'UI Development', description: 'Build user-facing components, screens, and interactive elements.', tools: ['IDE', 'GitHub'] },
  { id: 'form-implementation', name: 'Form Implementation', description: 'Implement forms with validation, error handling, and state management.', tools: ['IDE'] },
  { id: 'responsive-design', name: 'Responsive Design', description: 'Implement responsive layouts and cross-device behavior.', tools: ['IDE', 'Browser DevTools'] },
  { id: 'frontend-testing', name: 'Frontend Testing', description: 'Write unit, integration, and visual tests for frontend code.', tools: ['IDE', 'CI/CD'] },

  // QA Lead skills
  { id: 'test-plan-creation', name: 'Test Plan Creation', description: 'Create structured test plans from product requirements and user stories.' },
  { id: 'test-strategy', name: 'Requirement-Based Test Strategy', description: 'Design test strategy derived from acceptance criteria and user flows.' },
  { id: 'risk-coverage-analysis', name: 'Risk Coverage Analysis', description: 'Analyze risk areas and ensure adequate test coverage.' },
  { id: 'edge-case-definition', name: 'Edge Case Definition', description: 'Define boundary, negative, and unusual test cases.' },

  // QA Engineer skills
  { id: 'test-execution', name: 'Test Execution', description: 'Execute approved test plans and record results per scenario.', tools: ['Testing Framework'] },
  { id: 'bug-reproduction', name: 'Bug Reproduction', description: 'Reproduce reported bugs with clear steps and evidence.', tools: ['Browser DevTools'] },
  { id: 'regression-testing', name: 'Regression Testing', description: 'Run regression test suites to verify no existing functionality is broken.', tools: ['Testing Framework', 'CI/CD'] },
  { id: 'severity-classification', name: 'Severity Classification', description: 'Classify issues by severity: Critical, High, Medium, Low.' },
  { id: 'release-validation', name: 'Release Validation', description: 'Validate builds against exit criteria and provide release recommendations.' },
  { id: 'failure-investigation', name: 'Failure Investigation', description: 'Investigate CI/CD test failures and classify root cause.' },

  // DevOps skills
  { id: 'cicd-management', name: 'CI/CD Management', description: 'Design, maintain, and troubleshoot CI/CD pipelines.', tools: ['CI/CD', 'GitHub Actions'] },
  { id: 'infra-automation', name: 'Infrastructure Automation', description: 'Automate infrastructure provisioning and configuration.', tools: ['Terraform', 'Docker'] },
  { id: 'environment-provisioning', name: 'Environment Provisioning', description: 'Set up and manage development, staging, and production environments.', tools: ['Cloud Platform'] },
  { id: 'monitoring-setup', name: 'Monitoring Setup', description: 'Configure monitoring, alerting, and logging for applications.', tools: ['Monitoring Tools'] },
  { id: 'deployment-management', name: 'Deployment Management', description: 'Manage deployments with rollback procedures and release strategies.', tools: ['CI/CD', 'Cloud Platform'] },
];

export const skillMap = Object.fromEntries(skills.map((s) => [s.id, s]));

export const agentSkills: Record<string, string[]> = {
  board: [],
  ceo: ['work-triage', 'strategic-delegation', 'priority-assessment', 'escalation-management', 'hiring-evaluation', 'cross-team-coordination'],
  coo: ['workflow-design', 'conflict-analysis', 'operational-review', 'process-audit', 'bottleneck-identification'],
  cpo: ['requirement-definition', 'user-story-authoring', 'acceptance-criteria-design', 'product-validation', 'roadmap-prioritization', 'messaging-validation'],
  cto: ['architecture-design', 'feasibility-assessment', 'implementation-planning', 'integration-review', 'engineering-standards', 'technical-triage', 'release-decision', 'failure-classification'],
  hr: ['prompt-engineering', 'agent-onboarding', 'performance-evaluation', 'role-definition', 'handshake-facilitation'],
  'backend-lead': ['backend-detailed-design', 'backend-code-review', 'backend-task-breakdown', 'backend-bug-evaluation'],
  backend: ['api-development', 'database-design', 'business-logic', 'backend-testing', 'backend-bug-fixing'],
  'frontend-lead': ['frontend-detailed-design', 'frontend-code-review', 'frontend-task-breakdown', 'ui-ux-evaluation'],
  frontend: ['ui-development', 'form-implementation', 'responsive-design', 'frontend-testing'],
  'qa-lead': ['test-plan-creation', 'test-strategy', 'risk-coverage-analysis', 'edge-case-definition'],
  qa: ['test-execution', 'bug-reproduction', 'regression-testing', 'severity-classification', 'release-validation', 'failure-investigation'],
  devops: ['cicd-management', 'infra-automation', 'environment-provisioning', 'monitoring-setup', 'deployment-management'],
};
