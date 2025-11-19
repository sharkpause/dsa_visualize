'use client';

import { useState } from 'react';

import { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';

function makeSampleLinkedList(): LinkedList {
    const list: LinkedList = new LinkedList();
    
    for(let i = 10; i <= 30; i += 10) {
        list.add_node(i);
    }

    return list;
}

export default function LinkedListVisualizer() {
    const [list, setSampleLinkedList] = useState(() => makeSampleLinkedList());
    
    function handlePlusButtonClick() {
        const clonedList = list.clone();
        clonedList.add_node(Math.floor(Math.random() * 100));
        
        setSampleLinkedList(clonedList);
    }

    function handleEditButtonClick(index: number) {
        const clonedList = list.clone();
        alert(index)
    }

    function handleDeleteButtonClick(index: number) {
        const clonedList = list.clone();
        alert(index);
        // clonedList.delete_node()
    }

    return <div>
        <div>
            {
                list.to_array().map((value, idx) => (
                    <div key={idx} className="group relative inline-block">
                      <div className="px-4 py-2 bg-white border rounded-md shadow-sm">
                        {value}
                      </div>

                      <div className="mt-3 absolute bg-gray-100 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditButtonClick(idx)} className="py-1">Edit</button>
                        <button onClick={() => handleDeleteButtonClick(idx)} className="py-1 text-red-600">Delete</button>
                      </div>
                    </div>
                ))
            }
            <button className="cursor-pointer border-solid border-black outline p-1" onClick={handlePlusButtonClick}>
                +
            </button>
        </div>
    </div>
}