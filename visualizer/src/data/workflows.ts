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
    description: 'Full lifecycle from Board request through product definition, COO review, engineering, and delivery.',
    icon: 'Sparkles',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Requests feature', description: 'Board or user requests a new feature. The request enters the system through the Founder.', type: 'delegate' },
      { id: 2, from: 'ceo', to: 'ceo', action: 'Triages request', description: 'CEO triages the incoming request, determines priority and correct owner.', type: 'execute' },
      { id: 3, from: 'ceo', to: 'cpo', action: 'Assigns product definition', description: 'CEO assigns product definition to CPO. CPO will define problem, user story, and acceptance criteria.', type: 'delegate' },
      { id: 4, from: 'cpo', to: 'cpo', action: 'Defines product spec', description: 'CPO defines problem statement, target user, user story, acceptance criteria, success metrics, and business priority.', type: 'execute' },
      { id: 5, from: 'cpo', to: 'cto', action: 'Requests feasibility', description: 'CPO aligns with CTO on technical feasibility before implementation begins.', type: 'delegate' },
      { id: 6, from: 'cto', to: 'cpo', action: 'Returns feasibility', description: 'CTO defines technical approach, risks, dependencies, and implementation breakdown. Returns feasibility assessment to CPO.', type: 'respond' },
      { id: 7, from: 'cpo', to: 'ceo', action: 'Plan ready', description: 'Product plan is complete with feasibility notes. CEO reviews before operational check.', type: 'respond' },
      { id: 8, from: 'ceo', to: 'coo', action: 'Requests operational review', description: 'CEO sends the plan to COO for operational completeness review before approving implementation.', type: 'delegate' },
      { id: 9, from: 'coo', to: 'coo', action: 'Reviews operational completeness', description: 'COO checks CPO ownership, CTO feasibility, handoff clarity, QA needs, approval gates, and conflicts with active work.', type: 'review' },
      { id: 10, from: 'coo', to: 'ceo', action: 'Operational review complete', description: 'COO confirms the workflow is operationally sound or recommends revisions before implementation.', type: 'respond' },
      { id: 11, from: 'ceo', to: 'cto', action: 'Approves plan', description: 'CEO approves the implementation plan. CTO creates engineering tasks for the team.', type: 'approve' },
      { id: 12, from: 'cto', to: 'backend', action: 'Assigns backend tasks', description: 'CTO assigns backend work: APIs, database schemas, business logic, and integrations.', type: 'delegate' },
      { id: 13, from: 'cto', to: 'frontend', action: 'Assigns frontend tasks', description: 'CTO assigns frontend work: screens, flows, forms, responsive behavior.', type: 'delegate' },
      { id: 14, from: 'cto', to: 'devops', action: 'Assigns infra tasks', description: 'CTO assigns infrastructure work: deployment pipeline, environment setup, monitoring.', type: 'delegate' },
      { id: 15, from: 'backend', to: 'cto', action: 'Backend complete', description: 'Backend Engineer completes implementation and reports back to CTO.', type: 'respond' },
      { id: 16, from: 'frontend', to: 'cto', action: 'Frontend complete', description: 'Frontend Engineer completes implementation and reports back to CTO.', type: 'respond' },
      { id: 17, from: 'devops', to: 'cto', action: 'Infra ready', description: 'DevOps Engineer completes infrastructure setup and reports back to CTO.', type: 'respond' },
      { id: 18, from: 'cto', to: 'cto', action: 'Reviews integration', description: 'CTO reviews the integrated result across backend, frontend, and infrastructure.', type: 'review' },
      { id: 19, from: 'cto', to: 'ceo', action: 'Delivery summary', description: 'CTO provides final delivery summary to CEO. Feature is complete.', type: 'report' },
      { id: 20, from: 'ceo', to: 'board', action: 'Final update', description: 'CEO delivers final update to the Board. Feature has been delivered successfully.', type: 'report' },
    ],
  },
  {
    id: 'bug',
    name: 'Bug Fix',
    description: 'Triage, diagnosis, fix, review, and COO workflow health check.',
    icon: 'Bug',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Reports bug', description: 'A bug is reported by a user or board member.', type: 'report' },
      { id: 2, from: 'ceo', to: 'cto', action: 'Routes to CTO', description: 'CEO or CTO receives the issue. CEO routes technical issues to CTO for triage.', type: 'delegate' },
      { id: 3, from: 'cto', to: 'cto', action: 'Triages bug', description: 'CTO triages the technical area: backend, frontend, or infrastructure.', type: 'execute' },
      { id: 4, from: 'cto', to: 'backend', action: 'Assigns to Backend', description: 'Backend/API/database bug is assigned to the Backend Engineer for diagnosis and fix.', type: 'delegate' },
      { id: 5, from: 'backend', to: 'backend', action: 'Fixes bug', description: 'Backend Engineer investigates, diagnoses, and fixes the bug.', type: 'execute' },
      { id: 6, from: 'backend', to: 'cto', action: 'Fix complete', description: 'Backend Engineer reports the fix is complete and ready for review.', type: 'respond' },
      { id: 7, from: 'cto', to: 'cto', action: 'Reviews fix', description: 'CTO reviews the fix for quality, correctness, and regression risk.', type: 'review' },
      { id: 8, from: 'cto', to: 'coo', action: 'Requests workflow review', description: 'CTO notifies COO to review bug workflow health for patterns, missing QA, or routing issues.', type: 'delegate' },
      { id: 9, from: 'coo', to: 'coo', action: 'Reviews bug workflow health', description: 'COO checks routing correctness, repeated bugs exposing missing QA, business-impact escalation, and closure validation.', type: 'review' },
      { id: 10, from: 'coo', to: 'cto', action: 'Workflow health report', description: 'COO reports whether the bug workflow needs improvement, such as adding QA or monitoring.', type: 'respond' },
      { id: 11, from: 'cto', to: 'ceo', action: 'Fix verified', description: 'CTO confirms the bug fix is verified and deployed.', type: 'report' },
      { id: 12, from: 'ceo', to: 'board', action: 'Status update', description: 'CEO updates the Board if the bug had business impact.', type: 'report' },
    ],
  },
  {
    id: 'product-planning',
    name: 'Product Planning',
    description: 'Roadmap definition with COO process review and feasibility alignment.',
    icon: 'Map',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Gives direction', description: 'Board or user provides product direction, strategic priorities, or a specific request.', type: 'delegate' },
      { id: 2, from: 'ceo', to: 'cpo', action: 'Assigns product work', description: 'CEO assigns product planning work to CPO for definition and scoping.', type: 'delegate' },
      { id: 3, from: 'cpo', to: 'cpo', action: 'Defines product plan', description: 'CPO defines product objective, target users, problem statement, user stories, and acceptance criteria.', type: 'execute' },
      { id: 4, from: 'cpo', to: 'cto', action: 'Requests feasibility', description: 'CPO asks CTO for technical feasibility review of the product plan.', type: 'delegate' },
      { id: 5, from: 'cto', to: 'cpo', action: 'Feasibility response', description: 'CTO provides risks, dependencies, technical implications, and effort estimates.', type: 'respond' },
      { id: 6, from: 'cpo', to: 'ceo', action: 'Updated plan', description: 'CPO updates the product plan based on technical feasibility and presents to CEO.', type: 'respond' },
      { id: 7, from: 'ceo', to: 'coo', action: 'Requests process review', description: 'CEO sends the planning output to COO to verify the process is executable.', type: 'delegate' },
      { id: 8, from: 'coo', to: 'coo', action: 'Reviews planning process', description: 'COO checks requirement clarity, feasibility inclusion, roadmap connection, approval gates, dependencies, and CTO handoff completeness.', type: 'review' },
      { id: 9, from: 'coo', to: 'ceo', action: 'Process review complete', description: 'COO confirms the planning process is operationally sound or flags issues.', type: 'respond' },
      { id: 10, from: 'ceo', to: 'ceo', action: 'Decides next step', description: 'CEO approves the plan, prioritizes it on the roadmap, or escalates to Board for approval.', type: 'approve' },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Infrastructure needs with COO operational risk review and cross-agent coordination.',
    icon: 'Cloud',
    steps: [
      { id: 1, from: 'ceo', to: 'cto', action: 'Identifies infra need', description: 'CEO or CTO identifies an infrastructure need: deployment, CI/CD, environments, or reliability.', type: 'delegate' },
      { id: 2, from: 'cto', to: 'devops', action: 'Assigns to DevOps', description: 'CTO assigns the infrastructure task to the DevOps Engineer.', type: 'delegate' },
      { id: 3, from: 'devops', to: 'devops', action: 'Plans infrastructure', description: 'DevOps Engineer defines the infrastructure or deployment plan.', type: 'execute' },
      { id: 4, from: 'devops', to: 'coo', action: 'Requests risk review', description: 'DevOps sends the plan to COO for operational risk and cross-agent impact review.', type: 'delegate' },
      { id: 5, from: 'coo', to: 'coo', action: 'Reviews operational risk', description: 'COO checks DevOps ownership, CTO review, application impact on Backend/Frontend, production risk, rollback plan, and monitoring.', type: 'review' },
      { id: 6, from: 'coo', to: 'devops', action: 'Risk review complete', description: 'COO confirms the workflow is safe and coordinated, or flags cross-agent issues.', type: 'respond' },
      { id: 7, from: 'devops', to: 'backend', action: 'Coordinates with Backend', description: 'DevOps coordinates with Backend Engineer if application behavior is affected.', type: 'delegate' },
      { id: 8, from: 'devops', to: 'devops', action: 'Implements changes', description: 'DevOps Engineer completes the infrastructure implementation.', type: 'execute' },
      { id: 9, from: 'devops', to: 'cto', action: 'Implementation done', description: 'DevOps reports completion to CTO for review.', type: 'respond' },
      { id: 10, from: 'cto', to: 'ceo', action: 'Infra update', description: 'CTO updates CEO if there is release or business impact from the infrastructure changes.', type: 'report' },
    ],
  },
  {
    id: 'customer-feedback',
    name: 'Customer Feedback',
    description: 'Feedback intake, routing, COO flow review, and roadmap impact assessment.',
    icon: 'MessageCircle',
    steps: [
      { id: 1, from: 'board', to: 'ceo', action: 'Feedback received', description: 'Customer or user feedback is received and enters the system.', type: 'report' },
      { id: 2, from: 'ceo', to: 'ceo', action: 'Classifies feedback', description: 'CEO classifies the feedback: product feedback, technical bug, or strategic input.', type: 'execute' },
      { id: 3, from: 'ceo', to: 'cpo', action: 'Routes product feedback', description: 'Product feedback is routed to CPO for analysis and potential roadmap impact.', type: 'delegate' },
      { id: 4, from: 'ceo', to: 'cto', action: 'Routes technical bugs', description: 'Technical bugs from feedback are routed to CTO for triage.', type: 'delegate' },
      { id: 5, from: 'cpo', to: 'cpo', action: 'Summarizes insights', description: 'CPO summarizes recurring product insights and identifies patterns across feedback.', type: 'execute' },
      { id: 6, from: 'cpo', to: 'ceo', action: 'Product insights', description: 'CPO presents summarized insights and recommendations to CEO.', type: 'respond' },
      { id: 7, from: 'ceo', to: 'coo', action: 'Requests flow review', description: 'CEO asks COO to review how feedback moves through the organization.', type: 'delegate' },
      { id: 8, from: 'coo', to: 'coo', action: 'Reviews feedback flow', description: 'COO checks classification, routing to CPO/CTO/CEO, recurring theme summaries, and whether Customer Support Agent is needed.', type: 'review' },
      { id: 9, from: 'coo', to: 'ceo', action: 'Flow review complete', description: 'COO confirms feedback workflow clarity or recommends improvements.', type: 'respond' },
      { id: 10, from: 'ceo', to: 'ceo', action: 'Decides roadmap change', description: 'CEO decides whether the roadmap or priorities should change based on feedback patterns.', type: 'approve' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Marketing needs with COO alignment review and campaign approval.',
    icon: 'Megaphone',
    steps: [
      { id: 1, from: 'ceo', to: 'ceo', action: 'Defines marketing need', description: 'CEO receives or defines a marketing need: positioning, content, launch, campaigns, or growth.', type: 'execute' },
      { id: 2, from: 'ceo', to: 'cpo', action: 'Aligns with product', description: 'CEO coordinates with CPO for product accuracy in messaging. CMO would handle this if hired.', type: 'delegate' },
      { id: 3, from: 'cpo', to: 'cpo', action: 'Validates messaging', description: 'CPO validates product messaging for accuracy and alignment with product vision.', type: 'execute' },
      { id: 4, from: 'cpo', to: 'ceo', action: 'Messaging approved', description: 'CPO approves the product messaging and returns it to CEO.', type: 'respond' },
      { id: 5, from: 'ceo', to: 'coo', action: 'Requests alignment review', description: 'CEO asks COO to review marketing workflow alignment with product and release timing.', type: 'delegate' },
      { id: 6, from: 'coo', to: 'coo', action: 'Reviews marketing alignment', description: 'COO checks launch dependencies, approval gates, product-capability alignment, and release timing conflicts.', type: 'review' },
      { id: 7, from: 'coo', to: 'ceo', action: 'Alignment confirmed', description: 'COO confirms operational alignment or escalates conflicts with roadmap or release.', type: 'respond' },
      { id: 8, from: 'ceo', to: 'ceo', action: 'Approves direction', description: 'CEO approves the final marketing direction and campaign. Evaluates if CMO hire is needed.', type: 'approve' },
    ],
  },
  {
    id: 'hiring',
    name: 'Hiring',
    description: 'Agent hiring from need identification through COO validation, HR onboarding, and activation.',
    icon: 'UserPlus',
    steps: [
      { id: 1, from: 'ceo', to: 'ceo', action: 'Identifies hiring need', description: 'CEO identifies that a repeatable workflow lacks a permanent owner and a new agent may be needed.', type: 'execute' },
      { id: 2, from: 'ceo', to: 'coo', action: 'Requests operational validation', description: 'CEO asks COO to validate whether the workflow need justifies a new agent hire.', type: 'delegate' },
      { id: 3, from: 'coo', to: 'coo', action: 'Validates operational need', description: 'COO checks if work is recurring, workflow is mature, hiring would not create conflicts, and existing workflows benefit.', type: 'review' },
      { id: 4, from: 'coo', to: 'ceo', action: 'Operational validation complete', description: 'COO confirms the operational need or recommends improving existing processes first.', type: 'respond' },
      { id: 5, from: 'ceo', to: 'ceo', action: 'Approves hiring', description: 'CEO makes the final decision to proceed with hiring the new agent.', type: 'approve' },
      { id: 6, from: 'ceo', to: 'hr', action: 'Assigns agent creation', description: 'CEO delegates the new agent creation and onboarding process to HR.', type: 'delegate' },
      { id: 7, from: 'hr', to: 'hr', action: 'Defines role and prompt', description: 'HR defines the agent role, drafts the prompt, sets reporting line, responsibilities, boundaries, and success metrics.', type: 'execute' },
      { id: 8, from: 'hr', to: 'coo', action: 'Requests workflow fit review', description: 'HR asks COO to confirm the new role fits into existing workflows without conflict.', type: 'delegate' },
      { id: 9, from: 'coo', to: 'hr', action: 'Workflow fit confirmed', description: 'COO validates that the new agent integrates cleanly with existing workflows and responsibilities.', type: 'respond' },
      { id: 10, from: 'hr', to: 'ceo', action: 'Handshake with CEO', description: 'HR runs the handshake process: new agent meets CEO for company mission, authority, escalation, and priorities.', type: 'execute' },
      { id: 11, from: 'hr', to: 'cto', action: 'Handshake with CTO', description: 'HR runs handshake with CTO for technical boundaries, engineering standards, and code quality expectations.', type: 'execute' },
      { id: 12, from: 'hr', to: 'cpo', action: 'Handshake with CPO', description: 'HR runs handshake with CPO for product context, user understanding, and requirement workflows.', type: 'execute' },
      { id: 13, from: 'hr', to: 'hr', action: 'Updates prompt from handshakes', description: 'HR updates the agent prompt based on findings from all handshake interactions.', type: 'execute' },
      { id: 14, from: 'hr', to: 'ceo', action: 'Submits for final approval', description: 'HR submits the finalized prompt and role definition to CEO for final approval.', type: 'respond' },
      { id: 15, from: 'ceo', to: 'ceo', action: 'Final hiring approval', description: 'CEO reviews and gives final approval for the new agent to be activated.', type: 'approve' },
      { id: 16, from: 'hr', to: 'hr', action: 'Activates new agent', description: 'HR creates the new agent and monitors it during the first operating cycle.', type: 'execute' },
      { id: 17, from: 'hr', to: 'ceo', action: 'Onboarding complete', description: 'HR reports that the new agent has been activated, onboarded, and is operational.', type: 'report' },
    ],
  },
  {
    id: 'performance-review',
    name: 'Performance Review',
    description: 'HR weekly agent performance review with COO workflow alignment check.',
    icon: 'ClipboardCheck',
    steps: [
      { id: 1, from: 'hr', to: 'hr', action: 'Initiates weekly review', description: 'HR begins the weekly performance review cycle across all agents.', type: 'execute' },
      { id: 2, from: 'hr', to: 'cto', action: 'Reviews engineering agents', description: 'HR evaluates Backend, Frontend, and DevOps performance: task completion, role boundaries, handoff quality.', type: 'review' },
      { id: 3, from: 'hr', to: 'cpo', action: 'Reviews CPO performance', description: 'HR evaluates CPO: requirement clarity, feasibility handoffs, acceptance criteria quality.', type: 'review' },
      { id: 4, from: 'hr', to: 'coo', action: 'Reviews COO and requests alignment', description: 'HR evaluates COO performance and requests workflow-role alignment check.', type: 'review' },
      { id: 5, from: 'coo', to: 'hr', action: 'Workflow alignment report', description: 'COO provides workflow health observations, conflict detections, and bottleneck analysis.', type: 'respond' },
      { id: 6, from: 'hr', to: 'hr', action: 'Compiles performance report', description: 'HR compiles work completed, handoff quality, blockers, role clarity issues, prompt recommendations, and workflow conflicts.', type: 'execute' },
      { id: 7, from: 'hr', to: 'ceo', action: 'Weekly performance summary', description: 'HR delivers the weekly performance summary with suggested actions for CEO, COO, CTO, and CPO.', type: 'report' },
      { id: 8, from: 'ceo', to: 'ceo', action: 'Decides on actions', description: 'CEO reviews the performance report and decides on prompt improvements, hiring, or process changes.', type: 'approve' },
    ],
  },
];

export const workflowMap = Object.fromEntries(workflows.map((w) => [w.id, w]));
