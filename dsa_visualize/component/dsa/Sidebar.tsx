interface SidebarProps {
	open: boolean;
	onToggle: () => void;
	onAddLinkedList: () => void;
}

export default function Sidebar({ open, onToggle, onAddLinkedList }: SidebarProps) {
	return (
		<div className="absolute z-49">
			<button
				onClick={onToggle}
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
					onClick={onAddLinkedList}
				>
					Add LinkedList
				</button>
			</aside>
		</div>
	);
}

