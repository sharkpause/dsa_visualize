'use client';

import { useState } from 'react';

import ReactFlow, {
	applyNodeChanges
} from 'reactflow';

import 'reactflow/dist/style.css';

import useLinkedListFlow from './linkedlist/useLinkedListFlow';
import LinkedListNode from './linkedlist/LinkedListNode';
import AddNode from './AddNode';
import Sidebar from './Sidebar';

const nodeTypes = {
	linkedlistnode: LinkedListNode,
	addnode: AddNode,
};

export default function FlowCanvas() {
	const [open, setOpen] = useState(false);

	const {
		nodes,
		edges,
		setNodes,
		setEdges,
		addLinkedList,
	} = useLinkedListFlow([10, 20, 30]);

	const handleNodesChange = (changes) => {
		const updatedNodes = applyNodeChanges(changes, nodes);

		setNodes(updatedNodes);

		setEdges(prevEdges =>
			prevEdges.map(edge => {
				const sourceNode = updatedNodes.find(n => n.id === edge.source);
				const targetNode = updatedNodes.find(n => n.id === edge.target);

				if (!sourceNode || !targetNode) return edge;

				const deltaX = targetNode.position.x - sourceNode.position.x;
				const deltaY = targetNode.position.y - sourceNode.position.y;

				let newSourceHandle: 'top' | 'bottom' | 'left' | 'right';
				let newTargetHandle: 'top' | 'bottom' | 'left' | 'right';

				if (Math.abs(deltaY) > Math.abs(deltaX)) {
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

				return { ...edge, sourceHandle: newSourceHandle, targetHandle: newTargetHandle };
			})
		);
	};

	return (
		<div className="w-full h-screen relative">
			<Sidebar
				open={open}
				onToggle={() => setOpen(!open)}
				onAddLinkedList={addLinkedList}
			/>

			<div className="w-full h-full overflow-hidden">
				<ReactFlow
					className="w-full h-full"
					nodes={nodes}
					edges={edges}
					onNodesChange={handleNodesChange}
	//				onEdgesChange={setEdges}
					nodeTypes={nodeTypes}
					fitView
				/>
			</div>
		</div>
	);
}

