import WorkflowCanvas from '../Canvas/WorkflowCanvas';
import WorkflowSelector from '../Sidebar/WorkflowSelector';
import PlaybackControls from '../Controls/PlaybackControls';
import StepDetail from '../Controls/StepDetail';
import type { PlaybackState, PlaybackControls as Controls } from '../../hooks/usePlayback';

interface AppLayoutProps {
  playback: PlaybackState;
  controls: Controls;
}

export default function AppLayout({ playback, controls }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-surface overflow-hidden">
      <div className="flex flex-1 min-h-0">
        <div className="w-52 shrink-0">
          <WorkflowSelector playback={playback} controls={controls} />
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 min-h-0 relative">
            <WorkflowCanvas playback={playback} />

            <div className="absolute top-4 left-4 right-4 pointer-events-none">
              <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/80 border border-border backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                <span className="text-[11px] font-medium text-text-primary">
                  {playback.workflow.name}
                </span>
                <span className="text-[10px] text-text-muted">
                  — {playback.workflow.description}
                </span>
              </div>
            </div>
          </div>

          <div className="h-14 shrink-0 border-t border-border bg-surface-light">
            <PlaybackControls playback={playback} controls={controls} />
          </div>
        </div>

        <div className="w-72 shrink-0">
          <StepDetail playback={playback} />
        </div>
      </div>
    </div>
  );
}
