const USE_EFFECT_EVENTS = {
    LOAD: 'load',
    VIEWPORT: 'viewport',
    ATTRIBUTE: 'attribute',
    CHILDREN: 'children',
    DATA: 'data',
}

const useEffectDefaults = {
    effect: f => f,
    target: globalThis,
    event: 'load'
}

const useEffect = ({effect, target, event} = useEffectDefaults) => {
    let _target, _event = event.toLowerCase()

    if (typeof effect !== "function") {
        throw Error(`Effect must be a function!`)
    }

    if (!target) {
        throw Error(`Please specify a target element!`)
    }

    if (event === USE_EFFECT_EVENTS.LOAD) {
        _target = target;
    } else {
        if (typeof target === "string") {
            _target = document.querySelector(target)
        } else if (target instanceof HTMLElement) {
            _target = target
        }
    }

    if (_event === USE_EFFECT_EVENTS.LOAD) {
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
    } else if (_event === USE_EFFECT_EVENTS.VIEWPORT) {
        const observerOptions = {
            root: null,
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
    } else if (_event === USE_EFFECT_EVENTS.ATTRIBUTE) {
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
    } else if (_event === USE_EFFECT_EVENTS.CHILDREN) {
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
    } else if (_event === USE_EFFECT_EVENTS.DATA) {
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
    useEffect,
    USE_EFFECT_EVENTS
}