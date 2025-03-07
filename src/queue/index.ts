/**
 * A utility hook for managing a queue of items.
 * Provides methods to add, remove, and inspect items in the queue.
 *
 * @template T - The type of the items to be stored in the queue.
 *
 * @returns {Object} The methods to interact with the queue:
 *  - `enqueue(item: T): number` - Adds an item to the queue and returns the new size of the queue.
 *  - `dequeue(): T | undefined` - Removes and returns the item at the front of the queue. Returns `undefined` if the queue is empty.
 *  - `peek(): T | null` - Returns the item at the front of the queue without removing it. Returns `null` if the queue is empty.
 *  - `size(): number` - Returns the number of items in the queue.
 *  - `isEmpty(): boolean` - Checks if the queue is empty and returns a boolean value.
 *  - `clear(): void` - Clears all items in the queue.
 *
 * @example
 * // Create a new queue
 * const { enqueue, dequeue, peek, size, isEmpty, clear } = useQueue<number>();
 *
 * // Add items to the queue
 * enqueue(1);  // Queue: [1], returns 1
 * enqueue(2);  // Queue: [1, 2], returns 2
 *
 * // Check the first item
 * console.log(peek());  // Output: 1
 *
 * // Remove the first item
 * console.log(dequeue());  // Output: 1, Queue: [2]
 *
 * // Check the size of the queue
 * console.log(size());  // Output: 1
 *
 * // Check if the queue is empty
 * console.log(isEmpty());  // Output: false
 *
 * // Clear the queue
 * clear();  // Queue: []
 * console.log(isEmpty());  // Output: true
 */
function useQueue<T>() {
    const queue: T[] = [];

    return {
        enqueue: (item: T) => { queue.push(item); return queue.length; },
        dequeue: () => queue.shift(),
        peek: () => queue[0] || null,
        size: () => queue.length,
        isEmpty: () => queue.length === 0,
        clear: () => { queue.length = 0; }
    };
}

export { useQueue }
