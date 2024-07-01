const useCompose = (...functions) => {
    return (first) => functions.reduceRight((acc, fn) => fn(acc), first);
}

export { useCompose }