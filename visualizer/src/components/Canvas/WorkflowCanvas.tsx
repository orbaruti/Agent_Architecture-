import { useMemo, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import AgentNode from './AgentNode';
import AnimatedEdge from './AnimatedEdge';
import { agents, agentMap } from '../../data/agents';
import type { PlaybackState } from '../../hooks/usePlayback';
import type { AgentNodeStatus } from './AgentNode';

const nodeTypes = { agent: AgentNode };
const edgeTypes = { animated: AnimatedEdge };

interface WorkflowCanvasProps {
  playback: PlaybackState;
}

function buildEdgeId(from: string, to: string) {
  return `e-${from}-${to}`;
}

function getAgentStatus(
  agentId: string,
  currentFrom: string | null,
  currentTo: string | null,
  involvedAgents: Set<string>,
): AgentNodeStatus {
  if (!currentFrom) {
    return involvedAgents.size > 0 && !involvedAgents.has(agentId) ? 'dimmed' : 'idle';
  }
  if (currentFrom === currentTo && currentFrom === agentId) return 'self';
  if (agentId === currentFrom) return 'sender';
  if (agentId === currentTo) return 'receiver';
  if (!involvedAgents.has(agentId)) return 'dimmed';
  return 'idle';
}

export default function WorkflowCanvas({ playback }: WorkflowCanvasProps) {
  const { workflow, currentStep, stepIndex } = playback;

  const involvedAgents = useMemo(() => {
    const set = new Set<string>();
    workflow.steps.forEach((s) => {
      set.add(s.from);
      set.add(s.to);
    });
    return set;
  }, [workflow]);

  const currentFrom = currentStep?.from ?? null;
  const currentTo = currentStep?.to ?? null;

  const initialNodes: Node[] = useMemo(
    () =>
      agents.map((agent) => ({
        id: agent.id,
        type: 'agent',
        position: agent.position,
        draggable: false,
        data: {
          role: agent.role,
          title: agent.title,
          icon: agent.icon,
          color: agent.color,
          status: 'idle' as AgentNodeStatus,
        },
      })),
    [],
  );

  const edgePairs = useMemo(() => {
    const pairs = new Set<string>();
    workflow.steps.forEach((step) => {
      if (step.from !== step.to) {
        const key = [step.from, step.to].sort().join('--');
        pairs.add(key);
      }
    });
    return pairs;
  }, [workflow]);

  const initialEdges: Edge[] = useMemo(
    () =>
      Array.from(edgePairs).map((pair) => {
        const [a, b] = pair.split('--');
        return {
          id: buildEdgeId(a, b),
          source: a,
          target: b,
          type: 'animated',
          data: { active: false, color: '#3a3a4e' },
        };
      }),
    [edgePairs],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateGraph = useCallback(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const status = getAgentStatus(node.id, currentFrom, currentTo, involvedAgents);
        const selfAction = status === 'self' && currentStep ? currentStep.action : undefined;
        return {
          ...node,
          data: {
            ...node.data,
            status,
            selfAction,
          },
        };
      }),
    );

    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        if (!currentStep || currentFrom === currentTo) {
          return { ...edge, data: { ...edge.data, active: false, label: undefined } };
        }
        const sortedKey = [currentFrom!, currentTo!].sort().join('--');
        const edgeKey = [edge.source, edge.target].sort().join('--');
        const isActive = edgeKey === sortedKey;
        const color = isActive ? (agentMap[currentFrom!]?.color ?? '#3b82f6') : '#3a3a4e';
        return {
          ...edge,
          data: {
            ...edge.data,
            active: isActive,
            color,
            label: isActive ? currentStep.action : undefined,
          },
        };
      }),
    );
  }, [currentStep, currentFrom, currentTo, involvedAgents, setNodes, setEdges]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [workflow.id, initialEdges, setEdges]);

  useEffect(() => {
    updateGraph();
  }, [stepIndex, workflow.id, updateGraph]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3, maxZoom: 1.2 }}
        minZoom={0.5}
        maxZoom={2}
        panOnDrag
        zoomOnScroll
        preventScrolling
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1a1a2e" />
      </ReactFlow>
    </div>
  );
}
