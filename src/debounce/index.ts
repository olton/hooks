const useDebounce = (fn: unknown, wait: number) => {
    let timer: number;
    return function(...args: unknown[]) {
        const func = () => {
            // @ts-ignore
            fn.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(func, wait);
    };
}

export {
    useDebounce
}