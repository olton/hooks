const useMemo = (fn: unknown) => {
    const cache = new Map()
    return (...args: Array<unknown>) => {
        const key = `${args.length}${args.join("+")}`
        if (cache.has(key)) {
            return cache.get(key)
        }
        // @ts-ignore
        const result = fn.apply(null, args)
        cache.set(key, result)
        return result
    }
}

export {
    useMemo
}