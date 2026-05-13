import { motion } from 'framer-motion';
import {
  Sparkles,
  Bug,
  Map,
  Cloud,
  MessageCircle,
  Megaphone,
} from 'lucide-react';
import { workflows } from '../../data/workflows';
import type { PlaybackState, PlaybackControls } from '../../hooks/usePlayback';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles,
  Bug,
  Map,
  Cloud,
  MessageCircle,
  Megaphone,
};

interface WorkflowSelectorProps {
  playback: PlaybackState;
  controls: PlaybackControls;
}

export default function WorkflowSelector({ playback, controls }: WorkflowSelectorProps) {
  const { workflow: activeWorkflow } = playback;

  return (
    <div className="h-full flex flex-col bg-surface-light border-r border-border">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-sm font-bold tracking-wider text-text-primary uppercase">
          Paperclip
        </h1>
        <p className="text-[10px] text-text-muted mt-1 tracking-wide uppercase">
          Agent Architecture
        </p>
      </div>

      <div className="px-3 pb-2">
        <div className="h-px bg-border" />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <p className="text-[10px] text-text-muted uppercase tracking-widest px-2 mb-2 font-medium">
          Workflows
        </p>
        <div className="space-y-1">
          {workflows.map((wf) => {
            const isActive = wf.id === activeWorkflow.id;
            const Icon = iconMap[wf.icon] ?? Sparkles;

            return (
              <motion.button
                key={wf.id}
                onClick={() => controls.selectWorkflow(wf.id)}
                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors group cursor-pointer ${
                  isActive
                    ? 'bg-surface-lighter border border-border-light'
                    : 'hover:bg-surface-lighter/50 border border-transparent'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-md ${
                      isActive ? 'bg-accent-blue/20' : 'bg-surface-lighter/60'
                    }`}
                  >
                    <Icon
                      size={14}
                      className={isActive ? 'text-accent-blue' : 'text-text-muted group-hover:text-text-secondary'}
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-medium truncate ${
                        isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {wf.name}
                    </div>
                    <div className="text-[10px] text-text-muted truncate mt-0.5">
                      {wf.steps.length} steps
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="px-3 pb-4">
        <div className="h-px bg-border mb-3" />
        <div className="px-2">
          <p className="text-[10px] text-text-muted leading-relaxed">
            Click a workflow to visualize. Use playback controls to animate step-by-step.
          </p>
        </div>
      </div>
    </div>
  );
}
