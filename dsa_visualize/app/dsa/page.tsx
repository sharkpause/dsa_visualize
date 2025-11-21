import "../globals.css";
import LinkedListVisualizer from "@/component/dsa/linkedlist/LinkedListVisualizer";

export default function DSAPage() {    
    return <div>
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">

            </aside>

            <main className="flex-1 p-6">
                <LinkedListVisualizer />
            </main>
        </div>
    </div>
}