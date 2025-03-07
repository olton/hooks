type AnyFunction = (...args: any[]) => any;

/**
 * Хук для последовательного выполнения функций (слева направо)
 * Для входных данных x: pipe(f, g, h)(x) === h(g(f(x)))
 * @param functions Функции для последовательного выполнения
 * @returns Скомпонованная функция
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