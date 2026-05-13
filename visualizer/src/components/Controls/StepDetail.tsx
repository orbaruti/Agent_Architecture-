import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  RotateCw,
  Send,
  Eye,
  AlertTriangle,
  ThumbsUp,
  FileText,
  PlayCircle,
} from 'lucide-react';
import type { PlaybackState } from '../../hooks/usePlayback';
import { agentMap } from '../../data/agents';
import type { StepType } from '../../data/workflows';

const typeConfig: Record<StepType, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; color: string }> = {
  delegate: { icon: Send, label: 'Delegates', color: '#3b82f6' },
  respond: { icon: ArrowRight, label: 'Responds', color: '#22c55e' },
  execute: { icon: RotateCw, label: 'Executes', color: '#f97316' },
  review: { icon: Eye, label: 'Reviews', color: '#a855f7' },
  escalate: { icon: AlertTriangle, label: 'Escalates', color: '#f43f5e' },
  approve: { icon: ThumbsUp, label: 'Approves', color: '#f5c542' },
  report: { icon: FileText, label: 'Reports', color: '#06b6d4' },
};

interface StepDetailProps {
  playback: PlaybackState;
  compact?: boolean;
}

export default function StepDetail({ playback, compact }: StepDetailProps) {
  const { currentStep, stepIndex, workflow, totalSteps } = playback;

  if (compact) {
    return (
      <div className="bg-surface-light px-4 py-3">
        <AnimatePresence mode="wait">
          {currentStep && (
            <motion.div
              key={`${workflow.id}-${stepIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <StepTypeBadge type={currentStep.type} />
                <div className="flex items-center gap-1.5">
                  <AgentBadge agentId={currentStep.from} />
                  {currentStep.from !== currentStep.to && (
                    <>
                      <ArrowRight size={10} className="text-text-muted" />
                      <AgentBadge agentId={currentStep.to} />
                    </>
                  )}
                  {currentStep.from === currentStep.to && (
                    <span className="text-[10px] text-text-muted italic">(self)</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                {currentStep.description}
              </p>

              <div className="flex gap-0.5">
                {workflow.steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full flex-1 min-w-[3px] transition-all duration-300"
                    style={{
                      background: i === stepIndex
                        ? '#3b82f6'
                        : i < stepIndex
                          ? '#3b82f640'
                          : 'rgba(42, 42, 62, 0.6)',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border-l border-border bg-surface-light overflow-hidden">
      <div className="px-4 pt-4 pb-2 border-b border-border">
        <div className="text-[10px] text-text-muted uppercase tracking-widest font-medium">
          Step Detail
        </div>
        {currentStep && (
          <div className="text-[11px] text-text-secondary mt-1">
            Step {stepIndex + 1} of {totalSteps}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <AnimatePresence mode="wait">
          {currentStep ? (
            <motion.div
              key={`${workflow.id}-${stepIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <StepTypeBadge type={currentStep.type} />

              <div className="space-y-2">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">
                  Participants
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <AgentBadge agentId={currentStep.from} label="sender" />
                  {currentStep.from !== currentStep.to && (
                    <>
                      <ArrowRight size={12} className="text-text-muted shrink-0" />
                      <AgentBadge agentId={currentStep.to} label="receiver" />
                    </>
                  )}
                  {currentStep.from === currentStep.to && (
                    <span className="text-[10px] text-text-muted italic">(self)</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">
                  Action
                </div>
                <div className="text-sm font-medium text-text-primary">
                  {currentStep.action}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">
                  Description
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {currentStep.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center h-full"
            >
              <div className="text-center py-16">
                <PlayCircle size={32} className="text-text-muted/20 mx-auto mb-3" />
                <p className="text-xs text-text-muted">
                  Press play or step forward
                </p>
                <p className="text-[10px] text-text-muted/60 mt-1">
                  to begin the workflow
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-border">
        <div className="flex gap-0.5 flex-wrap">
          {workflow.steps.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full flex-1 min-w-[4px] transition-all duration-300"
              style={{
                background: i === stepIndex
                  ? '#3b82f6'
                  : i < stepIndex
                    ? '#3b82f640'
                    : 'rgba(42, 42, 62, 0.6)',
                boxShadow: i === stepIndex ? '0 0 6px #3b82f680' : 'none',
              }}
            />
          ))}
        </div>
        <div className="text-[10px] text-text-muted mt-2 text-center">
          {workflow.name}
        </div>
      </div>
    </div>
  );
}

function StepTypeBadge({ type }: { type: StepType }) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium w-fit"
      style={{
        background: `${config.color}15`,
        border: `1px solid ${config.color}30`,
        color: config.color,
      }}
    >
      <Icon size={12} />
      {config.label}
    </div>
  );
}

function AgentBadge({ agentId, label }: { agentId: string; label?: string }) {
  const agent = agentMap[agentId];
  if (!agent) return null;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium"
        style={{
          background: `${agent.color}15`,
          border: `1px solid ${agent.color}30`,
          color: agent.color,
        }}
      >
        {agent.role}
      </span>
      {label && (
        <span className="text-[9px] text-text-muted">{label}</span>
      )}
    </div>
  );
}
