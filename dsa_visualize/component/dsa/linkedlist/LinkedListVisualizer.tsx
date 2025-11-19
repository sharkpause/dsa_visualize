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

function handlePlusButtonClick() {

}

export default function LinkedListVisualizer() {
    const [sampleLinkedList, setSampleLinkedList] = useState(() => makeSampleLinkedList());
    const sampleLinkedListArray: number[] = sampleLinkedList.to_array();
    
    return <div>
        <div>
            {
                sampleLinkedListArray.map((value, idx) => (
                    <span key={idx}>
                        {value}
                        {' → '}
                    </span>
                ))
            }
            <button className="cursor-pointer bg-sky-950" onClick={handlePlusButtonClick}>
                +
            </button>
        </div>
    </div>
}