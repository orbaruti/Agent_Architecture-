import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import {
  Crown,
  Lightbulb,
  Wrench,
  Server,
  Monitor,
  Rocket,
  Users,
  Settings,
  UserCog,
  ShieldCheck,
  ClipboardList,
  GitBranch,
  Layout,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Crown,
  Lightbulb,
  Wrench,
  Server,
  Monitor,
  Rocket,
  Users,
  Settings,
  UserCog,
  ShieldCheck,
  ClipboardList,
  GitBranch,
  Layout,
};

export type AgentNodeStatus = 'idle' | 'sender' | 'receiver' | 'dimmed' | 'self';

export interface AgentNodeData {
  role: string;
  title: string;
  icon: string;
  color: string;
  status: AgentNodeStatus;
  selfAction?: string;
  [key: string]: unknown;
}

function AgentNodeComponent({ data }: NodeProps) {
  const { role, title, icon, color, status, selfAction } = data as unknown as AgentNodeData;
  const Icon = iconMap[icon] ?? Users;

  const isDimmed = status === 'dimmed';
  const isActive = status === 'sender' || status === 'receiver' || status === 'self';

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" id="left-target" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" id="right-source" />

      {isActive && (
        <motion.div
          className="absolute -inset-3 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at center, ${color}30 0%, transparent 70%)`,
            boxShadow: `0 0 40px ${color}20, 0 0 80px ${color}10`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <motion.div
        className="relative flex flex-col items-center gap-2 px-5 py-4 rounded-xl border"
        style={{
          background: isDimmed
            ? 'rgba(18, 18, 26, 0.5)'
            : `linear-gradient(135deg, rgba(18, 18, 26, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)`,
          borderColor: isActive ? `${color}80` : isDimmed ? 'rgba(42, 42, 62, 0.3)' : 'rgba(42, 42, 62, 0.8)',
          minWidth: 140,
        }}
        animate={{
          opacity: isDimmed ? 0.35 : 1,
          scale: isActive ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="flex items-center justify-center w-11 h-11 rounded-full"
          style={{
            background: isDimmed
              ? 'rgba(42, 42, 62, 0.4)'
              : `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
            border: `2px solid ${isDimmed ? 'rgba(42, 42, 62, 0.4)' : `${color}60`}`,
          }}
          animate={
            status === 'self'
              ? {
                  boxShadow: [
                    `0 0 0px ${color}00`,
                    `0 0 30px ${color}80`,
                    `0 0 15px ${color}40`,
                    `0 0 30px ${color}80`,
                    `0 0 0px ${color}00`,
                  ],
                  rotate: [0, 360],
                }
              : status === 'sender'
                ? { boxShadow: [`0 0 0px ${color}00`, `0 0 20px ${color}60`, `0 0 0px ${color}00`] }
                : status === 'receiver'
                  ? { boxShadow: [`0 0 0px ${color}00`, `0 0 25px ${color}80`, `0 0 0px ${color}00`] }
                  : {}
          }
          transition={
            status === 'self'
              ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 1.5, repeat: Infinity }
          }
        >
          <Icon size={20} className={isDimmed ? 'text-text-muted' : ''} style={isDimmed ? {} : { color }} />
        </motion.div>

        <div className="text-center">
          <div
            className="text-xs font-semibold tracking-wide"
            style={{ color: isDimmed ? '#555570' : color }}
          >
            {role}
          </div>
          <div className="text-[10px] text-[#8888a0] mt-0.5">{title}</div>
        </div>
      </motion.div>

      {status === 'self' && selfAction && (
        <motion.div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="px-2 py-0.5 rounded text-[9px] font-medium"
            style={{
              background: 'rgba(10, 10, 15, 0.9)',
              border: `1px solid ${color}50`,
              color,
            }}
          >
            {selfAction}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default memo(AgentNodeComponent);
