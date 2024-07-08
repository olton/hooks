const useMemo = (fn: any) => {
    const cache = new Map()
    return function(...args: any[]){
        const key = "" + args.length + args.join("+")
        if (cache.has(key)) {
            return cache.get(key)
        } else {
            const result = fn(...args)
            cache.set(key, result)
            return result
        }
    }
}

export {
    useMemo
}