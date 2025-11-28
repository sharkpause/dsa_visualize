import { MarkerType, Position, Node } from 'reactflow';

import type { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';

export default function generateLinkedListFlow(list: LinkedList, offsetX = 0, offsetY = 0) {
	const values = list.toArray();

	const nodes: Node[] = values.map((node, index) => ({
		id: `ll-${crypto.randomUUID()}`,
		position: { x: offsetX + index * 150, y: offsetY },
		type: 'linkedlistnode',
		data: { value: node.value }
	}));

	const edges = nodes.slice(0, -1).map((node, index) => {
		const nextNode = nodes[index + 1];

		// might delete these two lines since the list always appear side by side right now
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

