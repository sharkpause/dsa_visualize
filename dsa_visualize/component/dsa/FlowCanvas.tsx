'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { LinkedListNode, generateLinkedListFlow } from './linkedlist/LinkedListVisualizer';

export default function FlowCanvas() {
	const nodeTypes = {
		linkedlistnode: LinkedListNode
	}

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	return (
		<div
			className="w-full h-[720px] border rounded overflow-hidden"
		>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				fitView
			>
			</ReactFlow>
		</div>
	)
}

