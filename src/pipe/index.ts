type AnyFunction = (...args: any[]) => any;


/**
 * Creates a pipeline of functions where the output of one function is passed as the input to the next.
 *
 * This utility supports 0, 1, 2, or more functions as input:
 * - If no functions are provided, it returns an identity function.
 * - If one function is provided, it returns that function.
 * - If two functions are provided, it optimizes the pipeline for two functions.
 * - For more than two functions, it chains all functions in order.
 *
 * @typeParam R - The result type of the final function in the pipeline.
 * @param {...AnyFunction[]} functions - A list of functions to pipe. Each function should accept the result of the previous as input.
 * @returns {(...args: any[]) => R} A new function that represents the piped execution of all provided functions.
 *
 * @throws {Error} If any of the provided arguments is not a function.
 *
 * @example
 * // Piping two functions: adding 1 and doubling the result
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const piped = usePipe(addOne, double);
 * console.log(piped(2)); // Output: 6
 *
 * @example
 * // Using a function pipeline with strings
 * const toUpperCase = (str: string) => str.toUpperCase();
 * const appendExclamation = (str: string) => `${str}!`;
 * const piped = usePipe(toUpperCase, appendExclamation);
 * console.log(piped('hello')); // Output: 'HELLO!'
 *
 * @example
 * // With no functions passed
 * const piped = usePipe();
 * console.log(piped('unchanged')); // Output: 'unchanged'
 *
 * @example
 * // Chaining multiple functions
 * const increment = (x: number) => x + 1;
 * const square = (x: number) => x * x;
 * const half = (x: number) => x / 2;
 * const piped = usePipe(increment, square, half);
 * console.log(piped(2)); // Output: 4.5
 */
function usePipe<R>(...functions: AnyFunction[]): (...args: any[]) => R {
    // Проверка, что все аргументы - функции
    if (!functions.every(fn => typeof fn === 'function')) {
        throw new Error('usePipe: все аргументы должны быть функциями');
    }

    // Оптимизация для разных случаев
    switch (functions.length) {
        case 0:
            return (x: any) => x as unknown as R;
        case 1:
            return functions[0] as (...args: any[]) => R;
        case 2: {
            const [f, g] = functions;
            return (...args: any[]) => g(f(...args)) as R;
        }
        default:
            return function piped(...args: any[]) {
                let result = functions[0](...args);
                for (let i = 1; i < functions.length; i++) {
                    result = functions[i](result);
                }
                return result as R;
            };
    }
}

export { usePipe }