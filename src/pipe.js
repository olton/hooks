const usePipe = (...functions) => {
    return (first) => functions.reduce((acc, fn) => fn(acc), first);
}

export { usePipe }