type MemoFunction = <T>(...args: any[]) => T;

interface MemoOptions {
    maxSize?: number;
}

const useMemo = <T extends MemoFunction>(fn: T, options: MemoOptions = {}) => {
    const cache = new Map<string, ReturnType<T>>();
    const { maxSize } = options;

    const memoized = (...args: Parameters<T>): ReturnType<T> => {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = fn(...args);

        // Если кэш достиг максимального размера, удаляем самый старый элемент
        if (maxSize && cache.size >= maxSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }

        // @ts-ignore
        cache.set(key, result);
        
        // @ts-ignore
        return result;
    };

    // Добавляем метод очистки кэша
    memoized.clearCache = () => {
        cache.clear();
        return true;
    };

    return memoized;
};

export {
    useMemo
}