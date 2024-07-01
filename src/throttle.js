const useThrottle = (fn, wait) => {
    let isThrottled = false
    let saveThis, saveArgs

    function wrapper() {
        if (isThrottled) {
            saveThis = this
            saveArgs = arguments
            return
        }

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