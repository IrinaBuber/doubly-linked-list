const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = this._tail = null;      
        this.length = 0;
    }

    append(data) {
        var newNode = new Node(data, this._tail, null);
        if (this.length === 0)  {
            this._head =  this._tail = newNode;
        }
        else {                      
            this._tail.next = newNode;
            this._tail = newNode;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head === null ? null : this._head.data;
    }

    tail() {
        return this._tail === null ? null : this._tail.data;
    }

    at(index) {
        let result = null;
        if (index + 1 > this.length || index < 0) return result;
        
        if (index > this.length / 2) {
            let revertedIndex = this.length - index - 1;            
            for (let tmpNode = this._tail, counter = 0; counter <= revertedIndex; tmpNode = tmpNode.prev, counter++)
                result = tmpNode.data;
        }
        else {
            for (let tmpNode = this._head, counter = 0; counter <= index; tmpNode = tmpNode.next, counter++)
                result = tmpNode.data;
        }        
        return result;
    }

    insertAt(index, data) {                
        if (index + 1 > this.length || index < 0) return this;
        let shiftedNode = null;

        if (index === 0) {
            shiftedNode = this._head;          
        }
        else if (index === this.length - 1) {
            shiftedNode = this._tail;      
        }            
        else if (index > this.length / 2) {
            let revertedIndex = this.length - index - 1;            
            for (let tmpNode = this._tail, counter = 0; counter <= revertedIndex; tmpNode = tmpNode.prev, counter++)
                 shiftedNode = tmpNode;
        }
        else {            
            for (let tmpNode = this._head, counter = 0; counter <= index; tmpNode = tmpNode.next, counter++)
                shiftedNode = tmpNode;                      
        }      
        let newNode = new Node(data, shiftedNode.prev, shiftedNode);
        if (shiftedNode.prev !== null)
            shiftedNode.prev.next = newNode;
        else
            this._head = newNode;
        shiftedNode.prev = newNode; 
        this.length++;  
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index + 1 > this.length || index < 0) return this;
        
        let deletedNode = null;

        if (index === 0) {
            deletedNode = this._head;          
        }
        else if (index === this.length - 1) {
            deletedNode = this._tail;      
        }            
        else if (index > this.length / 2) {
            let revertedIndex = this.length - index - 1;            
            for (let tmpNode = this._tail, counter = 0; counter <= revertedIndex; tmpNode = tmpNode.prev, counter++)
                 deletedNode = tmpNode;
        }
        else {            
            for (let tmpNode = this._head, counter = 0; counter <= index; tmpNode = tmpNode.next, counter++)
                deletedNode = tmpNode;                      
        }              
        if (deletedNode.prev === null) {
            this._head.prev = null;
            this._head = deletedNode.next === null ? null : deletedNode.next;
                  
        }
        else if (deletedNode.next === null) {        
            this._tail.next = null;
            this._tail = deletedNode.prev === null ? null : deletedNode.prev;                        
        }            
        else  {
            deletedNode.prev.next = deletedNode.next;
            deletedNode.next.prev = deletedNode.prev;
        }        
        deletedNode = null;    
        this.length--;
        return this;
    }

    reverse() {
        if (this.length < 2) return this;
        for (let currentNode = this._head.next, counter = 1; counter < this.length - 1; currentNode = currentNode.prev, counter++) {                   
                let tmpNode = currentNode.next;
                currentNode.next = currentNode.prev;
                currentNode.prev = tmpNode;                           
        }

        const tmpNode = this._tail;
        this._head.prev = this._head.next;
        this._head.next = null;
        this._tail = this._head;

        this._head = tmpNode;
        this._head.next = this._head.prev;
        this._head.prev = null;     

        return this;
    }

    indexOf(data) {
        let result = -1;
        
        if (this.length == 0) return result;
        
        for(let tmpNode = this._head, counter = 0; counter < this.length; tmpNode = tmpNode.next, counter++)
            if (tmpNode.data == data) {
                result = counter;
                break;
            }

        return result;
    }
}

module.exports = LinkedList;
