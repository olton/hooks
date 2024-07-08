enum USE_EVENT_EVENTS {
    LOAD = 'load',
    VIEWPORT = 'viewport',
    ATTRIBUTE = 'attribute',
    CHILDREN = 'children',
    DATA = 'data',
}

type useEventDefaults = {
    effect: any,
    target: any,
    event: USE_EVENT_EVENTS.LOAD,
    root: null
}

const useEvent = ({effect, target, event, root}: useEventDefaults) => {
    let _target, _event = event.toLowerCase()

    if (typeof effect !== "function") {
        throw Error(`Effect must be a function!`)
    }

    if (!target) {
        throw Error(`Please specify a target element!`)
    }

    if (event === USE_EVENT_EVENTS.LOAD) {
        _target = target;
    } else {
        if (typeof target === "string") {
            _target = document.querySelector(target)
        } else if (target instanceof HTMLElement) {
            _target = target
        } else {
            throw Error(`Invalid target element!`)
        }
    }

    if (_event === USE_EVENT_EVENTS.LOAD) {
        const el = document.querySelector(_target)
        if (el !== null) {
            effect(el)
        } else {
            const observer = new MutationObserver((mutations, observer) => {
                const el = document.querySelector(_target)
                if (el !== null) {
                    effect(el)
                    observer.disconnect()
                }
            })
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            })
        }
    } else if (_event === USE_EVENT_EVENTS.VIEWPORT) {
        let _root = root === null ? null : typeof root === "string" ? document.querySelector(root) : root
        const observerOptions = {
            root: _root,
            rootMargin: "0px",
            threshold: 0.5
        }
        const observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    effect(_target)
                }
            })
        }, observerOptions)
        observer.observe(_target)
    } else if (_event === USE_EVENT_EVENTS.ATTRIBUTE) {
        const observer = new MutationObserver((mutations) => {
            for (let mut of mutations) {
                if (mut.target === _target && mut.type === 'attributes') {
                    effect(_target, mut.attributeName, _target.getAttribute(mut.attributeName))
                }
            }
        })
        observer.observe(_target, {
            attributes: true,
        })
    } else if (_event === USE_EVENT_EVENTS.CHILDREN) {
        const observer = new MutationObserver((mutations) => {
            for (let mut of mutations) {
                if (mut.target === _target && mut.type === 'childList') {
                    effect(_target, mut.addedNodes, mut.removedNodes)
                }
            }
        })
        observer.observe(_target, {
            childList: true,
            subtree: true,
        })
    } else if (_event === USE_EVENT_EVENTS.DATA) {
        const observer = new MutationObserver((mutations) => {
            for (let mut of mutations) {
                if (mut.target === _target && mut.type === 'characterData') {
                    effect(_target, _target.textContent)
                }
            }
        })
        observer.observe(_target, {
            characterData: true,
        })
    } else {

    }
}

export {
    useEvent,
    USE_EVENT_EVENTS
}