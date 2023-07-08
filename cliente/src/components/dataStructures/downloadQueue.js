class Queue {
    constructor() {
        const storedQueue = localStorage.getItem('queue');
        this.items = storedQueue ? JSON.parse(storedQueue) : [];
    }

    enqueue(element) {
        if (!this.exists(element)) { // Verificar si el elemento ya existe
            this.items.push(element);
            this.saveToLocalStorage();
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const removedItem = this.items.shift();
        this.saveToLocalStorage();
        return removedItem;
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('queue', JSON.stringify(this.items));
    }

    exists(element) {
        return this.items.some((item) => item === element);
    }
}

export default Queue;
