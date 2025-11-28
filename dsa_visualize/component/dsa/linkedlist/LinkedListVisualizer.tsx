'use client';

import { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';
import { MarkerType, Handle, Position } from 'reactflow';

type FlowNode = {
	id: string;
	position: { x: number, y: number };
	type: 'linkedlistnode' | 'addnode';
	data: { value: number } | { onAdd: () => void }
} 

export function generateLinkedListFlow(list: LinkedList, offsetX = 0, offsetY = 0) {
	const values = list.toArray();

	const nodes: FlowNode[] = values.map((node, index) => ({
		id: `ll-${crypto.randomUUID()}`,
		position: { x: offsetX + index * 150, y: offsetY },
		type: 'linkedlistnode',
		data: { value: node.value }
	}));

	const edges = nodes.slice(0, -1).map((node, index) => {
		const nextNode = nodes[index + 1];

		const sourcePos = node.position.y < nextNode.position.y ? Position.Bottom : Position.Right;
		const targetPos = node.position.y < nextNode.position.y ? Position.Top : Position.Left;

		return {
			id: `ll-edge-${crypto.randomUUID()}`,
			source: node.id,
			target: nextNode.id,
			type: 'straight',
			markerEnd: {
				type: MarkerType.ArrowClosed,
			},
			sourceHandle: sourcePos,
			targetHandle: targetPos
		};
	});

	return { nodes, edges };
}

export function LinkedListNode({ data, selected }) {
	return (
		<div
			className={`
				bg-blue-500 text-white px-3 py-2 rounded-md flex items-center gap-2
				transition-all
				${selected ? 'ring-2 ring-white' : ''}
			`}
		>
			<Handle type="source" position={Position.Top} id="top" />
			<Handle type="target" position={Position.Top} id="top" />
			<Handle type="source" position={Position.Right} id="right" />
			<Handle type="target" position={Position.Right} id="right" />
			<Handle type="source" position={Position.Bottom} id="bottom" />
			<Handle type="target" position={Position.Bottom} id="bottom" />
			<Handle type="source" position={Position.Left} id="left" />
			<Handle type="target" position={Position.Left} id="left" />

			<span>{data.value}</span>
		</div>
	)
}
