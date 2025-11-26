'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';

import { LinkedListNode, generateLinkedListFlow } from './linkedlist/LinkedListVisualizer';

export default function FlowCanvas() {
	const nodeTypes = {
		linkedlistnode: LinkedListNode
	}
	const [open, setOpen] = useState(false);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const addLinkedList = () => {
		const sampleLinkedList = new LinkedList();
		for(let i = 10; i <= 30; i += 10) {
			sampleLinkedList.addNode(i);
		}

		const { nodes: newNodes, edges: newEdges } = generateLinkedListFlow(sampleLinkedList, 50, 50);

		setNodes(prev => [...prev, ...newNodes]);
		setEdges(prev => [...prev, ...newEdges]);
	}

	return (
		<div className="w-full h-screen relative">
			<div className="absolute z-50">
				<button
					onClick={() => setOpen(!open)}
					className="absolute top-4 left-4 z-100"
				>
					☰
				</button>
				<aside
					className={`
						${open ? "translate-x-0" : "-translate-x-full"} 
						top-0 left-0
						h-screen w-64 bg-gray-100 transform transition-transform duration-300
					`}
				>
					<button
						className="w-full py-2 px-3 bg-gray-700 text-white mt-12"
						onClick={() => addLinkedList()}
					>
						Add LinkedList
					</button>
				</aside>
			</div>
			<div
				className="w-full h-full overflow-hidden"
			>
				<ReactFlow
					className="w-full h-full"
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					nodeTypes={nodeTypes}
					fitView
				>
				</ReactFlow>
			</div>
		</div>
	)
}

