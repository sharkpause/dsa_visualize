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
import { applyNodeChanges } from 'reactflow';

import { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';

import { LinkedListNode, generateLinkedListFlow } from './linkedlist/LinkedListVisualizer';
import AddNode from './AddNode';
import { randomInt } from 'crypto';

const nodeTypes = {
	linkedlistnode: LinkedListNode,
	addNode: AddNode,
}

export default function FlowCanvas() {
	const [open, setOpen] = useState(false);

	const [list, setList] = useState(new LinkedList());
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const handleNodesChange = (changes) => {
		const updatedNodes = applyNodeChanges(changes, nodes);
		onNodesChange(changes);

		setEdges(prevEdges =>
			prevEdges.map(edge => {
				const sourceNode = updatedNodes.find(n => n.id == edge.source);
				const targetNode = updatedNodes.find(n => n.id == edge.target);

				if(!sourceNode || !targetNode) return edge;

				const deltaY = targetNode.position.y - sourceNode.position.y;
				const deltaX = targetNode.position.x - sourceNode.position.x;

				let newSourceHandle: 'top' | 'bottom' | 'left' | 'right';
				let newTargetHandle: 'top' | 'bottom' | 'left' | 'right';

				const absX = Math.abs(deltaX);
				const absY = Math.abs(deltaY);

				if (absY > absX) {
					if (deltaY > 0) {
						newSourceHandle = 'bottom';
						newTargetHandle = 'top';
					} else {
						newSourceHandle = 'top';
						newTargetHandle = 'bottom';
					}
				} else {
					if (deltaX > 0) {
						newSourceHandle = 'right';
						newTargetHandle = 'left';
					} else {
						newSourceHandle = 'left';
						newTargetHandle = 'right';
					}
				}
			
			//	if(targetNode.position.y < sourceNode.position.y) {
			//		newTargetHandle = 'bottom';
			//	} else if(targetNode.position.y > sourceNode.position.y) {
			//		newTargetHandle = 'top';
			//	}

				//const newSourceHandle = sourceNode.position.y > targetNode.position.y ? 'top' : 'bottom';
				//const newTargetHandle = targetNode.position.y < sourceNode.position.y ? 'bottom' : 'top';

				return { ...edge, sourceHandle: newSourceHandle, targetHandle: newTargetHandle };
			})
		)
	}

	function addNewLinkedListNode() {
		const clonedList = list.clone();
		const newListNode = clonedList.addNode(5);
		setList(clonedList);

		// Find the LAST real linked list node in ReactFlow
		const lastRealNode = nodes
		.filter(n => n.type === "linkedlistnode")
		.at(-1);

		if (!lastRealNode) return;

		const newNode = {
			id: newListNode.id,
			type: "linkedlistnode",
			data: { value: newListNode.value },
			position: {
				x: lastRealNode.position.x + 100,
				y: lastRealNode.position.y,
			},
		};
		// TODO: implement adding add node button
		// rebuild the array:
		// [all real list nodes] + [new node] + [add-node]
		const withoutAdd = nodes.filter(n => n.id !== "add-node");

		const addNodeButton = {
			id: "add-node",
			type: "addNode",
			data: { onAdd: addNewLinkedListNode },
			position: {
				x: newNode.position.x + 100,
				y: newNode.position.y,
			}
		};

		setNodes([...withoutAdd, newNode, addNodeButton]);
	}


	const addLinkedList = () => {
		const sampleLinkedList = new LinkedList();
		for(let i = 10; i <= 30; i += 10) {
			sampleLinkedList.addNode(i);
		}

		setList(sampleLinkedList);

		const { nodes: newNodes, edges: newEdges } = generateLinkedListFlow(sampleLinkedList, 50, 50);

		newNodes.push({
			id: 'add-node',
			type: 'addNode',
			data: {
				onAdd: () => addNewLinkedListNode(),
			},
			position: {
				x: newNodes[newNodes.length-1].position.x + 100,
				y: newNodes[newNodes.length-1].position.y
			}
		});

		setNodes(prev => [...prev, ...newNodes]);
		setEdges(prev => [...prev, ...newEdges]);
	}

	return (
		<div className="w-full h-screen relative">
			<div className="absolute z-49">
				<button
					onClick={() => setOpen(!open)}
					className="absolute top-4 left-4 z-50"
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
					onNodesChange={handleNodesChange}
					onEdgesChange={onEdgesChange}
					nodeTypes={nodeTypes}
					fitView
				>
				</ReactFlow>
			</div>
		</div>
	)
}

