const usePipe = (...functions: any[]) => {
    return (first: any) => functions.reduce((acc, fn) => fn(acc), first);
}

export { usePipe }