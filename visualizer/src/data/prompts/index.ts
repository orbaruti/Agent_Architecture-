import boardPrompt from './board.md?raw';
import ceoPrompt from './ceo.md?raw';
import cooPrompt from './coo.md?raw';
import cpoPrompt from './cpo.md?raw';
import ctoPrompt from './cto.md?raw';
import hrPrompt from './hr.md?raw';
import backendLeadPrompt from './backend-lead.md?raw';
import backendPrompt from './backend.md?raw';
import frontendLeadPrompt from './frontend-lead.md?raw';
import frontendPrompt from './frontend.md?raw';
import qaLeadPrompt from './qa-lead.md?raw';
import qaPrompt from './qa.md?raw';
import devopsPrompt from './devops.md?raw';

export const agentPrompts: Record<string, string> = {
  board: boardPrompt,
  ceo: ceoPrompt,
  coo: cooPrompt,
  cpo: cpoPrompt,
  cto: ctoPrompt,
  hr: hrPrompt,
  'backend-lead': backendLeadPrompt,
  backend: backendPrompt,
  'frontend-lead': frontendLeadPrompt,
  frontend: frontendPrompt,
  'qa-lead': qaLeadPrompt,
  qa: qaPrompt,
  devops: devopsPrompt,
};
