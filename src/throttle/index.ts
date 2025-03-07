interface ThrottleOptions {
    leading?: boolean; // Выполнить функцию сразу, а потом ждать
    trailing?: boolean; // Выполнить функцию в конце периода ожидания
}

interface ThrottledFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel: () => void;
}


/**
 * Creates a throttled version of a given function that limits its execution to at most once
 * every `wait` milliseconds. Supports options to control whether the function executes on the
 * leading and/or trailing edge of the timeout.
 *
 * @template T - The type of the function to throttle.
 * @param {T} fn - The function to throttle.
 * @param {number} wait - The number of milliseconds to wait before the function can be called again.
 * @param {ThrottleOptions} [options={}] - Configuration options for throttling.
 * @param {boolean} [options.leading=true] - If `true`, the function will execute on the leading edge of the wait timeout.
 * @param {boolean} [options.trailing=true] - If `true`, the function will execute on the trailing edge of the wait timeout.
 * @returns {ThrottledFunction<T>} - A throttled version of the function that includes a `cancel` method to cancel pending executions.
 *
 * @throws {Error} Throws if `fn` is not a function or if `wait` is a negative number.
 *
 * @example
 * // Throttle a function that logs a message
 * const throttledLog = useThrottle((message) => console.log(message), 1000, { leading: true });
 * throttledLog("Hello"); // Logs "Hello" immediately
 * throttledLog("World"); // Ignored, as it's within the 1000ms wait period
 *
 * setTimeout(() => {
 *   throttledLog("Goodbye"); // Logs "Goodbye" after 1000ms
 * }, 1500);
 *
 * @example
 * // Cancel pending execution
 * const throttledFn = useThrottle(() => console.log("Executed"), 2000);
 * throttledFn();
 * throttledFn.cancel(); // Prevents the execution of the trailing call
 */
function useThrottle<T extends (...args: any[]) => any>(
    fn: T,
    wait: number,
    options: ThrottleOptions = {}
): ThrottledFunction<T> {
    // Проверка входных данных
    if (typeof fn !== 'function') {
        throw new Error('useThrottle: первый аргумент должен быть функцией');
    }

    if (wait < 0) {
        throw new Error('useThrottle: время ожидания должно быть положительным числом');
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: Parameters<T> | null = null;
    let lastThis: any = null;
    let result: ReturnType<T> | undefined;
    let lastCallTime: number | null = null;

    const { leading = true, trailing = true } = options;

    function invokeFunction() {
        result = fn.apply(lastThis, lastArgs as Parameters<T>);
        lastArgs = lastThis = null;
        lastCallTime = Date.now();
    }

    function throttled(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
        const now = Date.now();

        if (!lastCallTime && !leading) {
            lastCallTime = now;
        }

        const remainingTime = wait - (now - (lastCallTime as number));

        lastArgs = args;
        lastThis = this;

        if (remainingTime <= 0 || remainingTime > wait) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            invokeFunction();
        } else if (!timer && trailing) {
            timer = setTimeout(() => {
                timer = null;
                if (trailing && lastArgs) {
                    invokeFunction();
                }
            }, remainingTime);
        }

        return result;
    }

    // Добавляем метод отмены
    throttled.cancel = function() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        lastArgs = lastThis = null;
        lastCallTime = null;
    };

    return throttled;
}

export {
    useThrottle
}