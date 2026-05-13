import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { PlaybackState, PlaybackControls as Controls, PlaybackSpeed } from '../../hooks/usePlayback';

const speeds: PlaybackSpeed[] = [0.5, 1, 2, 3];

interface PlaybackControlsProps {
  playback: PlaybackState;
  controls: Controls;
}

export default function PlaybackControls({ playback, controls }: PlaybackControlsProps) {
  const { isPlaying, stepIndex, totalSteps, speed, workflow } = playback;
  const hasStarted = stepIndex >= 0;

  return (
    <div className="flex items-center gap-4 h-full px-5">
      <div className="flex items-center gap-1.5">
        <ControlButton onClick={controls.skipToStart} title="Skip to start" disabled={!hasStarted || stepIndex === 0}>
          <ChevronsLeft size={14} />
        </ControlButton>
        <ControlButton onClick={controls.prev} title="Previous step" disabled={!hasStarted || stepIndex === 0}>
          <SkipBack size={13} />
        </ControlButton>

        <motion.button
          onClick={controls.togglePlay}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-accent-blue/20 border border-accent-blue/40 text-accent-blue hover:bg-accent-blue/30 transition-colors cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </motion.button>

        <ControlButton onClick={controls.next} title="Next step" disabled={stepIndex >= totalSteps - 1}>
          <SkipForward size={13} />
        </ControlButton>
        <ControlButton onClick={controls.skipToEnd} title="Skip to end" disabled={stepIndex >= totalSteps - 1}>
          <ChevronsRight size={14} />
        </ControlButton>
      </div>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-muted font-mono shrink-0">
            {hasStarted ? stepIndex + 1 : 0}/{totalSteps}
          </span>
          <div
            className="flex-1 h-1.5 bg-surface-lighter rounded-full cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const idx = Math.round(pct * (totalSteps - 1));
              controls.seekTo(idx);
            }}
          >
            <motion.div
              className="h-full rounded-full bg-accent-blue/60"
              animate={{ width: `${hasStarted ? ((stepIndex + 1) / totalSteps) * 100 : 0}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 h-full bg-transparent group-hover:bg-white/5 rounded-full transition-colors" />
          </div>
        </div>
        <div className="text-[10px] text-text-muted truncate">
          {workflow.name}
          {hasStarted && playback.currentStep ? ` — ${playback.currentStep.action}` : ''}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => controls.setSpeed(s)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
              speed === s
                ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30'
                : 'text-text-muted hover:text-text-secondary border border-transparent'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}

function ControlButton({
  children,
  onClick,
  title,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors cursor-pointer ${
        disabled
          ? 'text-text-muted/30 cursor-not-allowed'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-lighter'
      }`}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
}
