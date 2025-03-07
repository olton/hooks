interface ThrottleOptions {
    leading?: boolean; // Выполнить функцию сразу, а потом ждать
    trailing?: boolean; // Выполнить функцию в конце периода ожидания
}

interface ThrottledFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel: () => void;
}

/**
 * Создает throttle-обертку для функции
 * @param fn Исходная функция
 * @param wait Время задержки в мс
 * @param options Дополнительные настройки
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