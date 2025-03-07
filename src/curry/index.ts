type AnyFunction = (...args: any[]) => any;

/**
 * Преобразует функцию в каррированную форму
 * @param func Исходная функция
 * @returns Каррированная функция
 */
function useCurry<F extends AnyFunction>(func: F) {
    // Проверка, что func - это функция
    if (typeof func !== 'function') {
        throw new Error('useCurry: первый аргумент должен быть функцией');
    }

    return function curried(this: any, ...args: any[]) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        }

        return function(this: any, ...args2: any[]) {
            return curried.apply(this, args.concat(args2));
        };
    };
}

export { useCurry }