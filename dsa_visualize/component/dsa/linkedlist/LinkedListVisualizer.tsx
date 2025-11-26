'use client';

import { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';

export function generateLinkedListFlow(list: LinkedList, offsetX = 0, offsetY = 0) {
  const values = list.toArray();

  const nodes = values.map((node, index) => ({
    id: `ll-${crypto.randomUUID()}`,
    position: { x: offsetX + index * 150, y: offsetY },
    type: 'linkedlistnode',
    data: { value: node.value }
  }));

  const edges = nodes.slice(0, -1).map((node, index) => ({
    id: `ll-edge-${crypto.randomUUID()}`,
    source: node.id,
    target: nodes[index + 1].id,
    type: 'smoothstep'
  }));

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
			<span>{data.value}</span>
		</div>
	)
}
