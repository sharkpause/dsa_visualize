class ListNode {
    value: number;
    next: ListNode | null;

    constructor(value: number, next: ListNode | null = null) {
        this.value = value;
        this.next = next
    }
}

class LinkedList {
    head: ListNode | null;
    tail: ListNode | null;
    
    constructor(head: ListNode | null = null) {
        this.head = head;
        this.tail = head;
    }

    to_array(): number[] { // 10 20 30 40
        if(this.head == null) {
            return []
        }

        const arr: number[] = [this.head.value]
        let currentNode: ListNode = this.head

        while(currentNode.next != null) {
            currentNode = currentNode.next
            arr.push(currentNode.value)
        }

        return arr;
    }

    add_node(value: number): number {
        if(this.head == null) {
            this.head = new ListNode(value)
            this.tail = this.head

            return 0;
        }

        this.tail!.next = new ListNode(value);
        this.tail = this.tail!.next

        return 0;
    }
}



// TESTING CODE BELOW

// const sample_list = new LinkedList()

// for(let i = 10; i <= 100; i += 10) {
//     sample_list.add_node(i);
// }

// console.log(sample_list.to_array())