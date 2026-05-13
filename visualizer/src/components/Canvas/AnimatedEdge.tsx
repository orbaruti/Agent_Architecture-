import { memo, useId } from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';

export interface AnimatedEdgeData {
  active: boolean;
  color: string;
  label?: string;
  [key: string]: unknown;
}

function AnimatedEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const { active, color, label } = (data ?? { active: false, color: '#3a3a4e' }) as AnimatedEdgeData;
  const gradientId = useId();
  const particleId = useId();
  const glowId = useId();

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 20,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: active ? `${color}40` : '#2a2a3e30',
          strokeWidth: active ? 2.5 : 1.5,
          transition: 'stroke 0.4s, stroke-width 0.4s',
        }}
      />

      {active && (
        <>
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="40%" stopColor={color} stopOpacity="0.8" />
              <stop offset="60%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <circle id={particleId} r="4" fill={color} filter={`url(#${glowId})`} />
          </defs>

          <path
            d={edgePath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeLinecap="round"
            className="animated-trail"
            style={{
              strokeDasharray: 80,
              strokeDashoffset: 80,
              animation: 'trail-flow 2s ease-in-out forwards',
            }}
          />

          <circle r="5" fill={color} filter={`url(#${glowId})`}>
            <animateMotion dur="1.8s" fill="freeze" path={edgePath} keyTimes="0;1" keySplines="0.4 0 0.2 1" calcMode="spline" />
            <animate attributeName="r" values="3;5;3" dur="1.8s" fill="freeze" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.8s" fill="freeze" />
          </circle>

          <circle r="10" fill={color} opacity="0.15" filter={`url(#${glowId})`}>
            <animateMotion dur="1.8s" fill="freeze" path={edgePath} keyTimes="0;1" keySplines="0.4 0 0.2 1" calcMode="spline" />
            <animate attributeName="opacity" values="0;0.2;0.2;0" keyTimes="0;0.1;0.85;1" dur="1.8s" fill="freeze" />
          </circle>

          {label && (
            <g>
              <foreignObject
                x={labelX - 80}
                y={labelY - 14}
                width={160}
                height={28}
                className="overflow-visible pointer-events-none"
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    animation: 'float-in 0.4s ease-out forwards',
                  }}
                >
                  <span
                    className="px-2.5 py-1 rounded-md text-[10px] font-medium whitespace-nowrap"
                    style={{
                      background: 'rgba(10, 10, 15, 0.9)',
                      border: `1px solid ${color}50`,
                      color,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {label}
                  </span>
                </div>
              </foreignObject>
            </g>
          )}
        </>
      )}
    </>
  );
}

export default memo(AnimatedEdgeComponent);
