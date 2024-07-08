const useThrottle = (fn: any, wait: number) => {
    let isThrottled = false
    let saveThis: any
    let saveArgs: any

    function wrapper() {
        if (isThrottled) {
            // @ts-ignore
            saveThis = this
            saveArgs = arguments
            return
        }

        // @ts-ignore
        fn.apply(this, arguments)
        isThrottled = true
        setTimeout(function (){
            if (saveArgs) {
                wrapper.apply(saveThis, saveArgs)
                saveArgs = saveThis = null
            }
        }, wait)
    }

    return wrapper;
}

export { useThrottle }