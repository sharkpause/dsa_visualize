'use client';

import { useState } from 'react';

import { LinkedList } from '@/lib/data_structures/linkedlist/LinkedList';

function makeSampleLinkedList(): LinkedList {
    const list: LinkedList = new LinkedList();
    
    for(let i = 10; i <= 50; i += 10) {
        list.add_node(i);
    }

    return list;
}

export default function LinkedListVisualizer() {
    const [sampleLinkedList, setSampleLinkedList] = useState(() => makeSampleLinkedList());
    
    function handlePlusButtonClick() {
        const clonedList = sampleLinkedList.clone();
        clonedList.add_node(Math.floor(Math.random() * 100));
        
        setSampleLinkedList(clonedList);
    }

    return <div>
        <div>
            {
                sampleLinkedList.to_array().map((value, idx) => (
                    <span key={idx}>
                        <span>{value}</span>
                        {' → '}
                    </span>
                ))
            }
            <button className="cursor-pointer border-solid border-black outline p-1" onClick={handlePlusButtonClick}>
                +
            </button>
        </div>
    </div>
}