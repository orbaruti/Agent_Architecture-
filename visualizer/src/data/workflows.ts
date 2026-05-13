export type StepType = 'delegate' | 'respond' | 'execute' | 'review' | 'escalate' | 'approve' | 'report';

export interface WorkflowStep {
  id: number;
  from: string;
  to: string;
  action: string;
  description: string;
  type: StepType;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: string;
  steps: WorkflowStep[];
}

export const workflows: Workflow[] = [
  {
    id: 'new-feature',
    name: 'New Feature',
    description: 'Full lifecycle from Board request through product definition, engineering, and delivery.',
    icon: 'Sparkles',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Requests feature', description: 'Board or user requests a new feature. The request enters the system through the Founder.', type: 'delegate' },
      { id: 2, from: 'ceo', to: 'ceo', action: 'Triages request', description: 'CEO triages the incoming request, determines priority and correct owner.', type: 'execute' },
      { id: 3, from: 'ceo', to: 'cpo', action: 'Assigns product definition', description: 'CEO assigns product definition to CPO. CPO will define problem, user story, and acceptance criteria.', type: 'delegate' },
      { id: 4, from: 'cpo', to: 'cpo', action: 'Defines product spec', description: 'CPO defines problem statement, target user, user story, acceptance criteria, success metrics, and business priority.', type: 'execute' },
      { id: 5, from: 'cpo', to: 'cto', action: 'Requests feasibility', description: 'CPO aligns with CTO on technical feasibility before implementation begins.', type: 'delegate' },
      { id: 6, from: 'cto', to: 'cpo', action: 'Returns feasibility', description: 'CTO defines technical approach, risks, dependencies, and implementation breakdown. Returns feasibility assessment to CPO.', type: 'respond' },
      { id: 7, from: 'cpo', to: 'ceo', action: 'Plan ready', description: 'Product plan is complete with feasibility notes. CEO approves or escalates to Board.', type: 'respond' },
      { id: 8, from: 'ceo', to: 'cto', action: 'Approves plan', description: 'CEO approves the implementation plan. CTO creates engineering tasks for the team.', type: 'approve' },
      { id: 9, from: 'cto', to: 'backend', action: 'Assigns backend tasks', description: 'CTO assigns backend work: APIs, database schemas, business logic, and integrations.', type: 'delegate' },
      { id: 10, from: 'cto', to: 'frontend', action: 'Assigns frontend tasks', description: 'CTO assigns frontend work: screens, flows, forms, responsive behavior.', type: 'delegate' },
      { id: 11, from: 'cto', to: 'devops', action: 'Assigns infra tasks', description: 'CTO assigns infrastructure work: deployment pipeline, environment setup, monitoring.', type: 'delegate' },
      { id: 12, from: 'backend', to: 'cto', action: 'Backend complete', description: 'Backend Engineer completes implementation and reports back to CTO.', type: 'respond' },
      { id: 13, from: 'frontend', to: 'cto', action: 'Frontend complete', description: 'Frontend Engineer completes implementation and reports back to CTO.', type: 'respond' },
      { id: 14, from: 'devops', to: 'cto', action: 'Infra ready', description: 'DevOps Engineer completes infrastructure setup and reports back to CTO.', type: 'respond' },
      { id: 15, from: 'cto', to: 'cto', action: 'Reviews integration', description: 'CTO reviews the integrated result across backend, frontend, and infrastructure.', type: 'review' },
      { id: 16, from: 'cto', to: 'ceo', action: 'Delivery summary', description: 'CTO provides final delivery summary to CEO. Feature is complete.', type: 'report' },
      { id: 17, from: 'ceo', to: 'board', action: 'Final update', description: 'CEO delivers final update to the Board. Feature has been delivered successfully.', type: 'report' },
    ],
  },
  {
    id: 'bug',
    name: 'Bug Fix',
    description: 'Triage, diagnosis, fix, and review cycle for reported bugs.',
    icon: 'Bug',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Reports bug', description: 'A bug is reported by a user or board member.', type: 'report' },
      { id: 2, from: 'ceo', to: 'cto', action: 'Routes to CTO', description: 'CEO or CTO receives the issue. CEO routes technical issues to CTO for triage.', type: 'delegate' },
      { id: 3, from: 'cto', to: 'cto', action: 'Triages bug', description: 'CTO triages the technical area: backend, frontend, or infrastructure.', type: 'execute' },
      { id: 4, from: 'cto', to: 'backend', action: 'Assigns to Backend', description: 'Backend/API/database bug is assigned to the Backend Engineer for diagnosis and fix.', type: 'delegate' },
      { id: 5, from: 'backend', to: 'backend', action: 'Fixes bug', description: 'Backend Engineer investigates, diagnoses, and fixes the bug.', type: 'execute' },
      { id: 6, from: 'backend', to: 'cto', action: 'Fix complete', description: 'Backend Engineer reports the fix is complete and ready for review.', type: 'respond' },
      { id: 7, from: 'cto', to: 'cto', action: 'Reviews fix', description: 'CTO reviews the fix for quality, correctness, and regression risk.', type: 'review' },
      { id: 8, from: 'cto', to: 'ceo', action: 'Fix verified', description: 'CTO confirms the bug fix is verified and deployed.', type: 'report' },
      { id: 9, from: 'ceo', to: 'board', action: 'Status update', description: 'CEO updates the Board if the bug had business impact.', type: 'report' },
    ],
  },
  {
    id: 'product-planning',
    name: 'Product Planning',
    description: 'Roadmap definition, feature scoping, and product direction alignment.',
    icon: 'Map',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Gives direction', description: 'Board or user provides product direction, strategic priorities, or a specific request.', type: 'delegate' },
      { id: 2, from: 'ceo', to: 'cpo', action: 'Assigns product work', description: 'CEO assigns product planning work to CPO for definition and scoping.', type: 'delegate' },
      { id: 3, from: 'cpo', to: 'cpo', action: 'Defines product plan', description: 'CPO defines product objective, target users, problem statement, user stories, and acceptance criteria.', type: 'execute' },
      { id: 4, from: 'cpo', to: 'cto', action: 'Requests feasibility', description: 'CPO asks CTO for technical feasibility review of the product plan.', type: 'delegate' },
      { id: 5, from: 'cto', to: 'cpo', action: 'Feasibility response', description: 'CTO provides risks, dependencies, technical implications, and effort estimates.', type: 'respond' },
      { id: 6, from: 'cpo', to: 'ceo', action: 'Updated plan', description: 'CPO updates the product plan based on technical feasibility and presents to CEO.', type: 'respond' },
      { id: 7, from: 'ceo', to: 'ceo', action: 'Decides next step', description: 'CEO approves the plan, prioritizes it on the roadmap, or escalates to Board for approval.', type: 'approve' },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Infrastructure needs from identification through deployment and review.',
    icon: 'Cloud',
    steps: [
      { id: 1, from: 'ceo', to: 'cto', action: 'Identifies infra need', description: 'CEO or CTO identifies an infrastructure need: deployment, CI/CD, environments, or reliability.', type: 'delegate' },
      { id: 2, from: 'cto', to: 'devops', action: 'Assigns to DevOps', description: 'CTO assigns the infrastructure task to the DevOps Engineer.', type: 'delegate' },
      { id: 3, from: 'devops', to: 'devops', action: 'Plans infrastructure', description: 'DevOps Engineer defines the infrastructure or deployment plan.', type: 'execute' },
      { id: 4, from: 'devops', to: 'backend', action: 'Coordinates with Backend', description: 'DevOps coordinates with Backend Engineer if application behavior is affected.', type: 'delegate' },
      { id: 5, from: 'devops', to: 'devops', action: 'Implements changes', description: 'DevOps Engineer completes the infrastructure implementation.', type: 'execute' },
      { id: 6, from: 'devops', to: 'cto', action: 'Implementation done', description: 'DevOps reports completion to CTO for review.', type: 'respond' },
      { id: 7, from: 'cto', to: 'ceo', action: 'Infra update', description: 'CTO updates CEO if there is release or business impact from the infrastructure changes.', type: 'report' },
    ],
  },
  {
    id: 'customer-feedback',
    name: 'Customer Feedback',
    description: 'Feedback intake, routing, and roadmap impact assessment.',
    icon: 'MessageCircle',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Feedback received', description: 'Customer or user feedback is received and enters the system.', type: 'report' },
      { id: 2, from: 'ceo', to: 'ceo', action: 'Classifies feedback', description: 'CEO classifies the feedback: product feedback, technical bug, or strategic input.', type: 'execute' },
      { id: 3, from: 'ceo', to: 'cpo', action: 'Routes product feedback', description: 'Product feedback is routed to CPO for analysis and potential roadmap impact.', type: 'delegate' },
      { id: 4, from: 'ceo', to: 'cto', action: 'Routes technical bugs', description: 'Technical bugs from feedback are routed to CTO for triage.', type: 'delegate' },
      { id: 5, from: 'cpo', to: 'cpo', action: 'Summarizes insights', description: 'CPO summarizes recurring product insights and identifies patterns across feedback.', type: 'execute' },
      { id: 6, from: 'cpo', to: 'ceo', action: 'Product insights', description: 'CPO presents summarized insights and recommendations to CEO.', type: 'respond' },
      { id: 7, from: 'ceo', to: 'ceo', action: 'Decides roadmap change', description: 'CEO decides whether the roadmap or priorities should change based on feedback patterns.', type: 'approve' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing needs from positioning through campaign approval.',
    icon: 'Megaphone',
    steps: [
      { id: 1, from: 'ceo', to: 'ceo', action: 'Defines marketing need', description: 'CEO receives or defines a marketing need: positioning, content, launch, campaigns, or growth.', type: 'execute' },
      { id: 2, from: 'ceo', to: 'cpo', action: 'Aligns with product', description: 'CEO coordinates with CPO for product accuracy in messaging. CMO would handle this if hired.', type: 'delegate' },
      { id: 3, from: 'cpo', to: 'cpo', action: 'Validates messaging', description: 'CPO validates product messaging for accuracy and alignment with product vision.', type: 'execute' },
      { id: 4, from: 'cpo', to: 'ceo', action: 'Messaging approved', description: 'CPO approves the product messaging and returns it to CEO.', type: 'respond' },
      { id: 5, from: 'ceo', to: 'ceo', action: 'Approves direction', description: 'CEO approves the final marketing direction and campaign. Evaluates if CMO hire is needed.', type: 'approve' },
    ],
  },
];

export const workflowMap = Object.fromEntries(workflows.map((w) => [w.id, w]));
