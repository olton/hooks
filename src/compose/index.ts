const useCompose = (...functions: unknown[]) => {
    // @ts-ignore
    return (first: unknown) => functions.reduceRight((acc, fn) => fn(acc), first);
}

export { useCompose }