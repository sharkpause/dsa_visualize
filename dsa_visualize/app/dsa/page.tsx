'use client';

import { useState } from 'react';

import "../globals.css";
import FlowCanvas from '@/component/dsa/FlowCanvas';

export default function DSAPage() {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex">
			<div className="relative">
				<button
					onClick={() => setOpen(!open)}
					className="absolute m-4 z-50"
				>
					☰
				</button>
				<aside
					className={`
						${open ? "translate-x-0" : "-translate-x-full"} 
						h-screen w-64 bg-gray-100 transform transition-transform duration-300
					`}
				>
				</aside>
			</div>

			<main className="flex-1 p-6">
				<FlowCanvas />
			</main>
		</div>
	);
}
