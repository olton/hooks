const usePipe = (...functions: unknown[]) => {
    // @ts-ignore
    return (first: unknown) => functions.reduce((acc, fn) => fn(acc), first);
}

export { usePipe }