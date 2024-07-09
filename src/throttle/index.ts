const useThrottle = (fn: unknown, wait: number) => {
    let isThrottled = false
    let saveThis: unknown
    let saveArgs: unknown

    function wrapper(...args: unknown[]) {
        if (isThrottled) {
            // @ts-ignore
            saveThis = this
            saveArgs = args
            return
        }

        // @ts-ignore
        fn.apply(this, args)
        isThrottled = true
        setTimeout(() => {
            if (saveArgs) {
                // @ts-ignore
                wrapper.apply(saveThis, saveArgs)
                saveArgs = saveThis = null
            }
        }, wait)
    }

    return wrapper;
}

export { useThrottle }