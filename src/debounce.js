const useDebounce = (fn, wait) => {
    let timer;
    return function() {
        const func = () => {
            fn.apply(this, arguments);
        }
        clearTimeout(timer);
        timer = setTimeout(func, wait);
    };
}

export {
    useDebounce
}