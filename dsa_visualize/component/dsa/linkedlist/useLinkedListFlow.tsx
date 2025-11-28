import { useState } from "react";
import { LinkedList } from "@/lib/data_structures/linkedlist/LinkedList";

import generateLinkedListFlow from "./generateLinkedListFlow";

import { Node, Edge } from 'reactflow';

export default function useLinkedListFlow(initialValues: number[] = []) {
	const [list, setList] = useState(new LinkedList());
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);

	function addNewLinkedListNode() {
		console.log("a");
	}

	function addLinkedList() {
		const sampleLinkedList = new LinkedList();
		for (let i = 0; i < initialValues.length; i++) {
			sampleLinkedList.addNode(initialValues[i]);
		}
		setList(sampleLinkedList);

		const { nodes: newNodes, edges: newEdges } = generateLinkedListFlow(sampleLinkedList, 50, 50);

		newNodes.push({
			id: "add-node",
			type: "addnode",
			data: { onAdd: addNewLinkedListNode },
			position: {
				x: newNodes[newNodes.length - 1].position.x + 100,
				y: newNodes[newNodes.length - 1].position.y,
			},
		});

		setNodes(prev => [...prev, ...newNodes]);
		setEdges(prev => [...prev, ...newEdges]);
	}

	return {
		list,
		nodes,
		edges,
		addLinkedList,
		addNewLinkedListNode,
		setNodes,
		setEdges,
	};
}

