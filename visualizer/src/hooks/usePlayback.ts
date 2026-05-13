import { useState, useCallback, useRef, useEffect } from 'react';
import { workflows } from '../data/workflows';
import type { Workflow, WorkflowStep } from '../data/workflows';

export type PlaybackSpeed = 0.5 | 1 | 2 | 3;

export interface PlaybackState {
  workflow: Workflow;
  stepIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  currentStep: WorkflowStep | null;
  totalSteps: number;
  progress: number;
}

export interface PlaybackControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (index: number) => void;
  skipToStart: () => void;
  skipToEnd: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  selectWorkflow: (workflowId: string) => void;
}

const BASE_INTERVAL_MS = 3000;

export function usePlayback(): [PlaybackState, PlaybackControls] {
  const [workflowId, setWorkflowId] = useState(workflows[0].id);
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState<PlaybackSpeed>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const workflow = workflows.find((w) => w.id === workflowId) ?? workflows[0];
  const totalSteps = workflow.steps.length;
  const currentStep = stepIndex >= 0 && stepIndex < totalSteps ? workflow.steps[stepIndex] : null;
  const progress = totalSteps > 0 ? ((stepIndex + 1) / totalSteps) * 100 : 0;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    const ms = BASE_INTERVAL_MS / speed;
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, ms);
  }, [speed, totalSteps, clearTimer]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isPlaying, startTimer, clearTimer]);

  useEffect(() => {
    if (stepIndex >= totalSteps - 1 && isPlaying) {
      setIsPlaying(false);
    }
  }, [stepIndex, totalSteps, isPlaying]);

  const play = useCallback(() => {
    if (stepIndex >= totalSteps - 1) {
      setStepIndex(0);
    } else if (stepIndex < 0) {
      setStepIndex(0);
    }
    setIsPlaying(true);
  }, [stepIndex, totalSteps]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const seekTo = useCallback(
    (index: number) => {
      setStepIndex(Math.max(0, Math.min(index, totalSteps - 1)));
    },
    [totalSteps],
  );

  const skipToStart = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(0);
  }, []);

  const skipToEnd = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(totalSteps - 1);
  }, [totalSteps]);

  const setSpeed = useCallback((s: PlaybackSpeed) => {
    setSpeedState(s);
  }, []);

  const selectWorkflow = useCallback(
    (id: string) => {
      setIsPlaying(false);
      clearTimer();
      setWorkflowId(id);
      setStepIndex(-1);
    },
    [clearTimer],
  );

  const state: PlaybackState = {
    workflow,
    stepIndex,
    isPlaying,
    speed,
    currentStep,
    totalSteps,
    progress,
  };

  const controls: PlaybackControls = {
    play,
    pause,
    togglePlay,
    next,
    prev,
    seekTo,
    skipToStart,
    skipToEnd,
    setSpeed,
    selectWorkflow,
  };

  return [state, controls];
}
