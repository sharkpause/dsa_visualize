import { useState } from "react";
import { LinkedList } from "@/lib/data_structures/linkedlist/LinkedList";

import generateLinkedListFlow from "./generateLinkedListFlow";

import {
	Node,
	Edge,
	MarkerType,
	Position,
} from 'reactflow';

import { useRef, useEffect, useCallback } from 'react';

export default function useLinkedListFlow(initialValues: number[] = []) {
	const [list, setList] = useState(new LinkedList());
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);

	const pendingEdgesRef = useRef<Edge[]>([]);
	const pendingEdgeTargetRef = useRef<string | null>(null);

	const addNewLinkedListNode = useCallback(() => {
		setNodes(prevNodes => {
			if (prevNodes.length === 0) return prevNodes;

			const addButton = prevNodes[prevNodes.length - 1];
			const nodesWithoutAdd = prevNodes.slice(0, -1);
			const prevNode = nodesWithoutAdd[nodesWithoutAdd.length - 1];

			const newValue = Math.floor(Math.random() * 100); // gon change this in the future probably

			const newNodeId = `ll-${crypto.randomUUID()}`;
			const newNode = {
				id: newNodeId,
				type: 'linkedlistnode',
				position: {
					x: addButton.position.x,
					y: addButton.position.y
				},
				data: {
					value: newValue 
				},
			};

			const shiftedAddButton = {
				...addButton,
				position: { x: addButton.position.x + 150, y: addButton.position.y },
			};

			// Build edges — store them in refs to add them after nodes are committed
			const edgeToNewNode: Edge = {
				id: `ll-edge-${crypto.randomUUID()}`,
				source: prevNode.id,
				target: newNodeId,
				type: 'straight',
				markerEnd: { type: MarkerType.ArrowClosed },
				sourceHandle: Position.Right,
				targetHandle: Position.Left,
			};

			const edgeToAddButton: Edge = {
				id: `ll-edge-${crypto.randomUUID()}`,
				source: newNodeId,
				target: shiftedAddButton.id,
				type: 'straight',
				markerEnd: { type: MarkerType.ArrowClosed },
				sourceHandle: Position.Right,
				targetHandle: Position.Left,
			};

			pendingEdgesRef.current = [edgeToNewNode, edgeToAddButton];
			pendingEdgeTargetRef.current = addButton.id;

			return [...nodesWithoutAdd, newNode, shiftedAddButton];
		});
	}, [setNodes]);

	// Add edges after DOM update
	useEffect(() => {
		if (pendingEdgesRef.current.length === 0) return;

		setEdges(prevEdges => {
			const targetId = pendingEdgeTargetRef.current;
			const edgesWithoutOldAdd = targetId
				? prevEdges.filter(e => e.target !== targetId)
				: prevEdges.slice(); // slice to make shallow copy, remember

			const newEdges = [...edgesWithoutOldAdd, ...pendingEdgesRef.current];

			pendingEdgesRef.current = [];
			pendingEdgeTargetRef.current = null;

			return newEdges;
		});
	}, [nodes, setEdges]);


	function addLinkedList() {
		const sampleLinkedList = new LinkedList();
		for (let i = 0; i < initialValues.length; i++) {
			sampleLinkedList.addNode(initialValues[i]);
		}
		setList(sampleLinkedList);

		const { nodes: newNodes, edges: newEdges } = generateLinkedListFlow(sampleLinkedList, 50, 50);

		const addNode = {
			id: "add-node",
			type: "addnode",
			data: { onAdd: addNewLinkedListNode },
			position: {
				x: newNodes[newNodes.length - 1].position.x + 150,
				y: newNodes[newNodes.length - 1].position.y,
			},
		};

		const addEdge = {
			id: `ll-edge-${crypto.randomUUID()}`,
			source: newNodes[newNodes.length - 1].id,
			target: addNode.id,
			type: 'straight',
			markerEnd: { type: MarkerType.ArrowClosed },
			sourceHandle: Position.Right,
			targetHandle: Position.Left,
		};

		setNodes(prev => [...prev, ...newNodes, addNode]);
		setEdges(prev => [...prev, ...newEdges, addEdge]);
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

