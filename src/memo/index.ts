type MemoFunction = <T>(...args: any[]) => T;

interface MemoOptions {
    maxSize?: number;
}


/**
 * A hook to memoize the result of a function, with an optional maximum cache size.
 *
 * @template T - The type of the memoized function.
 * @param {T} fn - The function to memoize.
 * @param {MemoOptions} [options] - Optional settings for memoization.
 * @param {number} [options.maxSize] - The maximum number of cached results. When exceeded, the oldest cached result is removed.
 * @returns {T & { clearCache: () => boolean }} A memoized version of the function with an additional `clearCache` method.
 *
 * @example
 * const add = (a: number, b: number): number => a + b;
 * const memoizedAdd = useMemo(add, { maxSize: 3 });
 *
 * // Memoized function calls
 * console.log(memoizedAdd(1, 2)); // 3, computed
 * console.log(memoizedAdd(1, 2)); // 3, from cache
 *
 * // Clear the cache
 * memoizedAdd.clearCache();
 * console.log(memoizedAdd(1, 2)); // 3, computed again after cache clear
 */
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
            if (typeof firstKey === "string") {
                cache.delete(firstKey);
            }
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