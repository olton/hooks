type AnyFunction = (...args: any[]) => any;

/**
 * Хук для композиции функций (выполнение справа налево)
 * f(g(h(x))) => compose(f, g, h)(x)
 */
function useCompose<R>(...functions: AnyFunction[]): (...args: any[]) => R {
    // Проверка, что все аргументы - функции
    if (!functions.every(fn => typeof fn === 'function')) {
        throw new Error('useCompose: все аргументы должны быть функциями');
    }

    // Оптимизация для разных случаев
    switch (functions.length) {
        case 0:
            return (x: any) => x as unknown as R;
        case 1:
            return functions[0] as (...args: any[]) => R;
        case 2: {
            const [f, g] = functions;
            return (...args: any[]) => f(g(...args)) as R;
        }
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