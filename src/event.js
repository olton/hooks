const useEventDefaults = {
    effect: null,
    event: "load",
    target: globalThis,
    one: false
}

const useEvent = (/*useEventDefaults*/ arg) => {
    let _target, _event, _effect, _one

    if (typeof arg === "function") {
        _target = globalThis
        _event = "load"
        _effect = arg
        _one = true
    } else if (typeof arg === "object" && arg === arg) {
        _target = arg.target || globalThis
        _event = arg.event || "load"
        _effect = arg.effect || (() => {})
        _one = arg.one || false
    } else {
        throw Error(`Invalid argument type!`)
    }

    if (typeof _target === "string") {
        _target = document.querySelector(_target)
    }

    if (typeof _effect !== "function") {
        throw Error(`Effect must be a function!`)
    }

    const listener = (e) => {
        if (_one) {
            _target.removeEventListener(_event, listener)
        }
        _effect(e)
    }

    return _target.addEventListener(_event, listener);
}

export {
    useEvent
}
