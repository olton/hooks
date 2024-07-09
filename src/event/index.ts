enum EVENTS {
    LOAD = 'load',
    VIEWPORT = 'viewport',
    ATTRIBUTE = 'attribute',
    CHILDREN = 'children',
    DATA = 'data',
}

type UseEvent = {
    event: EVENTS,
    target: string | HTMLElement,
    root: null | string | HTMLElement,
    effect: unknown
}

const useEvent = ({event, root, target, effect}: UseEvent) => {
    const _target = typeof target === "string" ? document.querySelector(target) : target;

    if (typeof effect !== "function") {
        throw Error("Side effect must be a function!")
    }

    if (!_target) {
        throw Error("Please specify a target element!")
    }

    switch (event) {
        case EVENTS.LOAD: {
            const observer = new MutationObserver((mutations, observer) => {
                const el = document.querySelector(target as unknown as string)
                if (el !== null) {
                    effect(el)
                    observer.disconnect()
                }
            })
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            })

            break
        }
        case EVENTS.VIEWPORT: {
            const _root = root instanceof HTMLElement ? root : typeof root === "string" ? document.querySelector(root) : null
            const observerOptions = {
                root: _root,
                rootMargin: "0px",
                threshold: 0.5
            }
            const observer = new IntersectionObserver((entries, observer)=>{
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        effect(_target)
                    }
                }
            }, observerOptions)
            observer.observe(_target)

            break
        }
        case EVENTS.ATTRIBUTE: {
            const observer = new MutationObserver((mutations) => {
                for (const mut of mutations) {
                    if (mut.target === _target && mut.type === 'attributes') {
                        effect(_target, mut.attributeName, _target.getAttribute(mut.attributeName as string))
                    }
                }
            })
            observer.observe(_target, {
                attributes: true,
            })

            break
        }
        case EVENTS.CHILDREN: {
            const observer = new MutationObserver((mutations) => {
                for (const mut of mutations) {
                    if (mut.target === _target && mut.type === 'childList') {
                        effect(_target, mut.addedNodes, mut.removedNodes)
                    }
                }
            })
            observer.observe(_target, {
                childList: true,
                subtree: true,
            })

            break
        }
        case EVENTS.DATA: {
            const observer = new MutationObserver((mutations) => {
                for (const mut of mutations) {
                    if (mut.target === _target && mut.type === 'characterData') {
                        effect(_target, _target.textContent)
                    }
                }
            })
            observer.observe(_target, {
                characterData: true,
            })

            break
        }
        default: {
            if (_target instanceof HTMLElement) {
                _target.addEventListener(event, (e) => {
                    effect(_target, e)
                })
            }
        }
    }
}

export {
    useEvent,
    EVENTS
}