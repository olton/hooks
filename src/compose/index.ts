/**
 * type: Function
 */
type AnyFunction = (...args: any[]) => any;

/**
 * Hook for the composition of functions (performance from right to left)
 * f(g(h(x))) => compose(f, g, h)(x)
 *
 * Example usage:
 *
 * // Example 1: Basic composition of mathematical functions
 * const add = (x: number) => x + 1;
 * const multiply = (x: number) => x * 2;
 * const subtract = (x: number) => x - 3;
 *
 * const composedMath = useCompose(subtract, multiply, add); // f(g(h(x))) => subtract(multiply(add(x)))
 * const result = composedMath(5); // ((5 + 1) * 2) - 3 = 9
 * console.log(result); // Output: 9
 *
 * // Example 2: String manipulation
 * const trim = (str: string) => str.trim();
 * const toUpperCase = (str: string) => str.toUpperCase();
 * const exclaim = (str: string) => str + '!';
 *
 * const composedString = useCompose(exclaim, toUpperCase, trim);
 * const message = composedString(" hello world ");
 * console.log(message); // Output: "HELLO WORLD!"
 *
 * // Example 3: No-op (when no functions are provided)
 * const identity = useCompose();
 * console.log(identity(42)); // Output: 42
 */
function useCompose<R>(...functions: AnyFunction[]): (...args: any[]) => R {
    if (!functions.every(fn => typeof fn === 'function')) {
        throw new Error('useCompose: All arguments should be functions');
    }

    switch (functions.length) {
        // No functions provided
        case 0:
            return (x: any) => x as unknown as R;
        // One function provided    
        case 1:
            return functions[0] as (...args: any[]) => R;
        // Two functions provided
        case 2: {
            const [f, g] = functions;
            return (...args: any[]) => f(g(...args)) as R;
        }
        // Three or more functions provided
        default:
            return function composed(...args: any[]) {
                let result = functions[functions.length - 1](...args);
                for (let i = functions.length - 2; i >= 0; i--) {
                    result = functions[i](result);
                }
                return result as R;
            };
    }
}

export { useCompose }