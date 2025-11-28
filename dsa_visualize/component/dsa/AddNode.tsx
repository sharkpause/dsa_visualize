import { Handle, Position } from 'reactflow';

type AddNodeData = {
	data: { onAdd: () => void };
}

export default function AddNode({ data }: AddNodeData) {
	return (
		<div
			onClick={data.onAdd}
			style={{
				width: 50,
				height: 50,
				borderRadius: 8,
				border: "2px dashed #3b82f6",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
				background: "white",
				color: "#3b82f6",
				fontSize: 24,
				fontWeight: 600,
				transition: "0.15s",
			}}
			className="add-node"
		>
			<Handle
				type="target"
				position={Position.Left}
				style={{ opacity: 0 }} // hidden
			/>
			<span>+</span>
		</div>
	);
}
