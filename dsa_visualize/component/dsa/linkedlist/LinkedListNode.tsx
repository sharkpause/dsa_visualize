import {
	Handle,
	Position,
	NodeProps
} from 'reactflow';

type LinkedListNodeData = {
	value: number;
}

export default function LinkedListNode({ data, selected }: NodeProps<LinkedListNodeData>) {
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
