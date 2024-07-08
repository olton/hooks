const useCompose = (...functions: any[]) => {
    return (first: any) => functions.reduceRight((acc, fn) => fn(acc), first);
}

export { useCompose }