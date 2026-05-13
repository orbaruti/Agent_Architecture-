import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Zap, ChevronDown, ChevronRight, Wrench } from 'lucide-react';
import { agentMap } from '../../data/agents';
import { agentPrompts } from '../../data/prompts';
import { agentSkills, skillMap } from '../../data/skills';

interface AgentDetailProps {
  agentId: string;
  onClose: () => void;
}

export default function AgentDetail({ agentId, onClose }: AgentDetailProps) {
  const agent = agentMap[agentId];
  const prompt = agentPrompts[agentId] ?? '';
  const skillIds = agentSkills[agentId] ?? [];
  const skills = skillIds.map((id) => skillMap[id]).filter(Boolean);
  const [tab, setTab] = useState<'prompt' | 'skills'>('prompt');

  if (!agent) return null;

  return (
    <div className="h-full flex flex-col border-l border-border bg-surface-light overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: agent.color }}
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-text-primary truncate" style={{ color: agent.color }}>
                {agent.role}
              </div>
              <div className="text-[10px] text-text-muted">{agent.title}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface transition-colors cursor-pointer"
          >
            <X size={14} className="text-text-muted" />
          </button>
        </div>

        <div className="flex gap-1 mt-3">
          <TabButton
            active={tab === 'prompt'}
            onClick={() => setTab('prompt')}
            icon={<FileText size={11} />}
            label="Prompt"
            color={agent.color}
          />
          <TabButton
            active={tab === 'skills'}
            onClick={() => setTab('skills')}
            icon={<Zap size={11} />}
            label={`Skills (${skills.length})`}
            color={agent.color}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === 'prompt' ? (
          <PromptView prompt={prompt} color={agent.color} />
        ) : (
          <SkillsView skills={skills} color={agent.color} />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-all cursor-pointer"
      style={{
        background: active ? `${color}15` : 'transparent',
        border: `1px solid ${active ? `${color}30` : 'transparent'}`,
        color: active ? color : '#8888a0',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function PromptView({ prompt, color }: { prompt: string; color: string }) {
  const sections = parseMarkdownSections(prompt);

  return (
    <div className="px-4 py-3 space-y-1">
      {sections.map((section, i) => (
        <PromptSection key={i} section={section} color={color} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

interface Section {
  title: string;
  content: string;
  level: number;
}

function parseMarkdownSections(md: string): Section[] {
  const lines = md.split('\n');
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      if (current) sections.push(current);
      current = {
        title: headingMatch[2],
        content: '',
        level: headingMatch[1].length,
      };
    } else if (current) {
      current.content += line + '\n';
    }
  }
  if (current) sections.push(current);

  return sections.filter((s) => s.content.trim().length > 0);
}

function PromptSection({
  section,
  color,
  defaultOpen,
}: {
  section: Section;
  color: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-2 text-left cursor-pointer group"
      >
        {open ? (
          <ChevronDown size={12} className="text-text-muted shrink-0" />
        ) : (
          <ChevronRight size={12} className="text-text-muted shrink-0" />
        )}
        <span
          className="text-[11px] font-semibold tracking-wide group-hover:opacity-80 transition-opacity"
          style={{ color: section.level === 1 ? color : '#c0c0d0' }}
        >
          {section.title}
        </span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="pb-2 pl-5"
        >
          <RenderedContent content={section.content} />
        </motion.div>
      )}
    </div>
  );
}

function RenderedContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex gap-1.5 items-start">
              <span className="text-text-muted text-[10px] mt-0.5 shrink-0">{'•'}</span>
              <span className="text-[11px] text-text-secondary leading-relaxed">
                {trimmed.slice(2)}
              </span>
            </div>
          );
        }

        return (
          <p key={i} className="text-[11px] text-text-secondary leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function SkillsView({
  skills,
  color,
}: {
  skills: { id: string; name: string; description: string; tools?: string[] }[];
  color: string;
}) {
  if (skills.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <Zap size={24} className="text-text-muted/20 mx-auto mb-2" />
        <p className="text-xs text-text-muted">No skills defined</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-2">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="rounded-lg p-3 border transition-colors"
          style={{
            background: `${color}08`,
            borderColor: `${color}20`,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Zap size={11} style={{ color }} />
            <span className="text-[11px] font-semibold" style={{ color }}>
              {skill.name}
            </span>
          </div>
          <p className="text-[10px] text-text-secondary leading-relaxed pl-[19px]">
            {skill.description}
          </p>
          {skill.tools && skill.tools.length > 0 && (
            <div className="flex gap-1 mt-1.5 pl-[19px] flex-wrap">
              {skill.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium"
                  style={{
                    background: 'rgba(42, 42, 62, 0.6)',
                    color: '#8888a0',
                  }}
                >
                  <Wrench size={8} />
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
