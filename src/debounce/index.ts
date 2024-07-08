const useDebounce = (fn: any, wait: number) => {
    let timer: number;
    return function() {
        const func = () => {
            // @ts-ignore
            fn.apply(this, arguments);
        }
        clearTimeout(timer);
        timer = setTimeout(func, wait);
    };
}

export {
    useDebounce
}