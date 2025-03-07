/**
 * Debounce options
 */
interface DebounceOptions {
    immediate?: boolean; // Выполнить функцию сразу, а потом ждать
}

/**
 * Debounced function type
 */
interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel: () => void;
}

/**
 * Hook for debouncing a function
 * f(x) => useDebounce(f, 1000)(x)
 *
 * Example usage:
 *
 * // Example 1: Basic debouncing
 * const log = (message: string) => console.log(message);
 * const debouncedLog = useDebounce(log, 1000);
 * debouncedLog('Hello'); // Will log "Hello" after 1 second
 *
 * // Example 2: Immediate
 * const immediateLog = useDebounce(log, 1000, { immediate: true });
 * immediateLog('Immediate Hello'); // Will log "Immediate Hello" immediately
 *  
 *  // Example 3: Canceling
 *  const cancelableLog = useDebounce(log, 1000);
 *  cancelableLog('Cancel me'); // Will log "Cancel me" after 1 second
 *  cancelableLog.cancel(); // Cancels the debounced function
 *      
 * // Example 4: No-op (when no arguments are provided)
 * const noop = useDebounce();
 * console.log(noop()); // Output: undefined
 * 
 * ## Notes:
 * - The `immediate` option allows the function to be executed immediately on the leading edge of the timeout.
 * - The `cancel` method can be used to cancel the debounced function if needed.
 * - The function will not execute if the wait time is negative.
 * - The function will not execute if the first argument is not a function.
 * 
 * @returns {DebouncedFunction<T>} A debounced version of the provided function.
 */
function useDebounce<T extends (...args: any[]) => any>(
    fn: T,
    wait: number,
    options: DebounceOptions = {}
): DebouncedFunction<T> {
    // Проверка входных данных
    if (typeof fn !== 'function') {
        throw new Error('useDebounce: первый аргумент должен быть функцией');
    }

    if (wait < 0) {
        throw new Error('useDebounce: время ожидания должно быть положительным числом');
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    let result: ReturnType<T> | undefined;

    function debounced(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
        const context = this;
        const callNow = options.immediate && !timer;

        // Очищаем предыдущий таймер
        if (timer !== null) {
            clearTimeout(timer);
        }

        // Создаем новый таймер
        timer = setTimeout(() => {
            timer = null;
            if (!options.immediate) {
                result = fn.apply(context, args);
            }
        }, wait);

        // Немедленное выполнение, если указано
        if (callNow) {
            result = fn.apply(context, args);
        }

        return result;
    }

    // Добавляем метод отмены
    debounced.cancel = function() {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    };

    return debounced;
}

export {
    useDebounce
}