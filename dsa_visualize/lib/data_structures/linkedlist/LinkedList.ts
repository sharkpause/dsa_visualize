export class ListNode {
    value: number;
    next: ListNode | null;
    id = crypto.randomUUID()

    constructor(value: number, next: ListNode | null = null) {
        this.value = value;
        this.next = next
    }
}

export class LinkedList {
    head: ListNode | null;
    tail: ListNode | null;
    length: number = 0;
    
    constructor(head: ListNode | null = null) {
        this.head = head;
        this.tail = head;
    }

    to_array(): number[] { // TODO: Turn this to return a node objecct instead of just the value
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
        this.length++;
        
        if(this.head == null) {
            this.head = new ListNode(value)
            this.tail = this.head

            return 0;
        }

        this.tail!.next = new ListNode(value);
        this.tail = this.tail!.next

        return 0;
    }

    clone() {
        const newList: LinkedList = new LinkedList();
        const currentList: number[] = this.to_array();

        for(let value of currentList) {
            newList.add_node(value);
        }

        return newList;
    }

    delete_at(index: number) {
        if(this.head == null || index >= this.length) {
            return 1;
        }
        if(this.length == 1) {
            this.head = null
            this.tail = null
            
            return 0;
        }
        if(index == 0) {
            this.head = this.head.next;

            return 0;
        }
        
        let currentNode: ListNode | null = this.head;
        let i = 0;
        
        while(i < index-1) {
            currentNode = currentNode!.next;
        
            i++;
        }
        
        if(currentNode!.next!.next == null) {
            currentNode!.next = null;
            this.tail = currentNode;
        } else {
            currentNode!.next = currentNode!.next!.next;
            this.tail = currentNode!.next;
        }

        return 0;
    }

    edit_at(index: number, newValue: number) {
        if(this.head == null || index >= this.length) {
            return 1;
        }
        if(this.length == 1) {
            this.head.value = newValue;
            this.tail!.value = newValue;
            
            return 0;
        }
        if(index == 0) {
            this.head.value = newValue;

            return 0;
        }
        
        let currentNode: ListNode | null = this.head;
        let i = 0;
        
        while(i < index) {
            currentNode = currentNode!.next;
        
            i++;
        }
        
        currentNode!.value = newValue;

        return 0;
    }
}



// TESTING CODE BELOW

// const sample_list = new LinkedList()

// for(let i = 10; i <= 100; i += 10) {
//     sample_list.add_node(i);
// }

// console.log(sample_list.to_array())