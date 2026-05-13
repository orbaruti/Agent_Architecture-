import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import WorkflowCanvas from '../Canvas/WorkflowCanvas';
import WorkflowSelector from '../Sidebar/WorkflowSelector';
import MobileWorkflowPicker from '../Sidebar/MobileWorkflowPicker';
import PlaybackControls from '../Controls/PlaybackControls';
import StepDetail from '../Controls/StepDetail';
import AgentDetail from '../Controls/AgentDetail';
import type { PlaybackState, PlaybackControls as Controls } from '../../hooks/usePlayback';

interface AppLayoutProps {
  playback: PlaybackState;
  controls: Controls;
}

export default function AppLayout({ playback, controls }: AppLayoutProps) {
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const handleAgentClick = useCallback(
    (agentId: string) => {
      controls.selectAgent(playback.selectedAgentId === agentId ? null : agentId);
    },
    [controls, playback.selectedAgentId],
  );

  const handleAgentClose = useCallback(() => {
    controls.selectAgent(null);
  }, [controls]);

  return (
    <>
      {/* Desktop layout (md+) */}
      <div className="hidden md:flex h-screen w-screen flex-col bg-surface overflow-hidden">
        <div className="flex flex-1 min-h-0">
          <div className="w-52 shrink-0">
            <WorkflowSelector playback={playback} controls={controls} />
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex-1 min-h-0 relative">
              <WorkflowCanvas playback={playback} onAgentClick={handleAgentClick} />
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
            {playback.selectedAgentId ? (
              <AgentDetail agentId={playback.selectedAgentId} onClose={handleAgentClose} />
            ) : (
              <StepDetail playback={playback} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile layout (<md) */}
      <div className="flex md:hidden h-screen w-screen flex-col bg-surface overflow-hidden">
        <MobileWorkflowPicker playback={playback} controls={controls} />

        <div className="flex-1 min-h-0 relative">
          <WorkflowCanvas playback={playback} onAgentClick={handleAgentClick} />
        </div>

        <div className="shrink-0 border-t border-border bg-surface-light">
          <div className="h-14">
            <PlaybackControls playback={playback} controls={controls} mobile />
          </div>

          {playback.currentStep && (
            <button
              onClick={() => setMobileDetailOpen(!mobileDetailOpen)}
              className="w-full flex items-center justify-between px-4 py-2 border-t border-border bg-surface-light cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] text-text-muted font-mono shrink-0">
                  {playback.stepIndex + 1}/{playback.totalSteps}
                </span>
                <span className="text-xs text-text-primary truncate">
                  {playback.currentStep.action}
                </span>
              </div>
              {mobileDetailOpen ? (
                <ChevronDown size={14} className="text-text-muted shrink-0" />
              ) : (
                <ChevronUp size={14} className="text-text-muted shrink-0" />
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {playback.selectedAgentId && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="shrink-0 overflow-hidden border-t border-border"
            >
              <div className="max-h-[40vh] overflow-y-auto">
                <AgentDetail agentId={playback.selectedAgentId} onClose={handleAgentClose} />
              </div>
            </motion.div>
          )}
          {mobileDetailOpen && playback.currentStep && !playback.selectedAgentId && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="shrink-0 overflow-hidden border-t border-border"
            >
              <div className="max-h-[40vh] overflow-y-auto">
                <StepDetail playback={playback} compact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
