interface DebounceOptions {
    immediate?: boolean; // Выполнить функцию сразу, а потом ждать
}

interface DebouncedFunction<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel: () => void;
}

/**
 * Создает дебаунс-обертку для функции
 * @param fn Исходная функция
 * @param wait Время задержки в мс
 * @param options Дополнительные настройки
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