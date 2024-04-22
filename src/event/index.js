const useEventDefaults = {
    effect: null,
    event: "load",
    target: globalThis,
    one: false
}

const useEvent = ({effect, event, target, one} = useEventDefaults) => {
    let _target, _event

    if (!target) {
        _target = globalThis
    } else if (typeof target === "string") {
        _target = document.querySelector(target)
    } else if (target instanceof HTMLElement) {
        _target = target
    }

    _event = !event ? "load" : event

    if (typeof effect !== "function") {
        throw Error(`Effect must be a function!`)
    }

    const listener = (e) => {
        if (one) {
            _target.removeEventListener(_event, listener)
        }
        effect(e)
    }

    return _target.addEventListener(_event, listener);
}

export {
    useEvent
}
