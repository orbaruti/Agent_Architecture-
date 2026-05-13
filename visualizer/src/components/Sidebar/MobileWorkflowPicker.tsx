import {
  Sparkles,
  Bug,
  Map,
  Cloud,
  MessageCircle,
  Megaphone,
  UserPlus,
  ClipboardCheck,
  SearchCheck,
} from 'lucide-react';
import { workflows } from '../../data/workflows';
import type { PlaybackState, PlaybackControls } from '../../hooks/usePlayback';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles, Bug, Map, Cloud, MessageCircle, Megaphone, UserPlus, ClipboardCheck, SearchCheck,
};

interface MobileWorkflowPickerProps {
  playback: PlaybackState;
  controls: PlaybackControls;
}

export default function MobileWorkflowPicker({ playback, controls }: MobileWorkflowPickerProps) {
  const { workflow: activeWorkflow } = playback;

  return (
    <div className="shrink-0 bg-surface-light border-b border-border">
      <div className="flex items-center gap-1 px-2 py-2 overflow-x-auto scrollbar-hide">
        {workflows.map((wf) => {
          const isActive = wf.id === activeWorkflow.id;
          const Icon = iconMap[wf.icon] ?? Sparkles;

          return (
            <button
              key={wf.id}
              onClick={() => controls.selectWorkflow(wf.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30'
                  : 'text-text-secondary border border-border hover:bg-surface-lighter'
              }`}
            >
              <Icon size={12} />
              {wf.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
