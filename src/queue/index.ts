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
