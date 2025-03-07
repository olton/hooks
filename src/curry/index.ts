// Type definitions for useCurry
type AnyFunction = (...args: any[]) => any;

/**
 * Hook for currying a function
 * f(x, y, z) => f(x)(y)(z)
 *
 * Example usage:
 *
 * // Example 1: Basic currying
 * const add = (x: number, y: number) => x + y;
 * const curriedAdd = useCurry(add);
 * console.log(curriedAdd(2)(3)); // Output: 5
 *
 * // Example 2: String concatenation
 * const concat = (a: string, b: string, c: string) => a + b + c;
 * const curriedConcat = useCurry(concat);
 * console.log(curriedConcat('Hello')(' ')('World!')); // Output: "Hello World!"
 *
 * // Example 3: No-op (when no arguments are provided)
 * const noop = useCurry();
 * console.log(noop()); // Output: undefined
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