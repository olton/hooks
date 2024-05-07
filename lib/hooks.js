
/*!
 * HooksJS - The set of hooks  (https://hooks.io)
 * Copyright 2024 by Serhii Pimenov
 * Licensed under MIT
 !*/

var Hooks = (function (exports) {
    'use strict';

    const states = new Map();
    let index = 0;

    const useState = (initialState, onStateChange) => {
        const stateIndex = index;
        states.set(index, initialState);
        index++;

        const getState = () => {
            return states.get(stateIndex)
        };

        const setState = (newState) => {
            const oldState = states.get(stateIndex);
            states.set(stateIndex, typeof newState === "object" ? Object.assign({}, newState) : newState);
            if (typeof onStateChange === 'function') {
                onStateChange(states.get(stateIndex), oldState);
            }
        };

        return [getState, setState]
    };

    const useEvent = (/*useEventDefaults*/ arg) => {
        let _target, _event, _effect, _one;

        if (typeof arg === "function") {
            _target = globalThis;
            _event = "load";
            _effect = arg;
            _one = true;
        } else if (typeof arg === "object" && arg === arg) {
            _target = arg.target || globalThis;
            _event = arg.event || "load";
            _effect = arg.effect || (() => {});
            _one = arg.one || false;
        } else {
            throw Error(`Invalid argument type!`)
        }

        if (typeof _target === "string") {
            _target = document.querySelector(_target);
        }

        if (typeof _effect !== "function") {
            throw Error(`Effect must be a function!`)
        }

        const listener = (e) => {
            if (_one) {
                _target.removeEventListener(_event, listener);
            }
            _effect(e);
        };

        return _target.addEventListener(_event, listener);
    };

    const USE_EFFECT_EVENTS = {
        LOAD: 'load',
        VIEWPORT: 'viewport',
        ATTRIBUTE: 'attribute',
        CHILDREN: 'children',
        DATA: 'data',
    };

    const useEffectDefaults = {
        effect: f => f,
        target: globalThis,
        event: 'load',
        root: null
    };

    const useEffect = ({effect, target, event, root} = useEffectDefaults) => {
        let _target, _event = event.toLowerCase();

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
                _target = document.querySelector(target);
            } else if (target instanceof HTMLElement) {
                _target = target;
            } else {
                throw Error(`Invalid target element!`)
            }
        }

        if (_event === USE_EFFECT_EVENTS.LOAD) {
            const el = document.querySelector(_target);
            if (el !== null) {
                effect(el);
            } else {
                const observer = new MutationObserver((mutations, observer) => {
                    const el = document.querySelector(_target);
                    if (el !== null) {
                        effect(el);
                        observer.disconnect();
                    }
                });
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                });
            }
        } else if (_event === USE_EFFECT_EVENTS.VIEWPORT) {
            let _root = root === null ? null : typeof root === "string" ? document.querySelector(root) : root;
            const observerOptions = {
                root: _root,
                rootMargin: "0px",
                threshold: 0.5
            };
            const observer = new IntersectionObserver((entries, observer)=>{
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        effect(_target);
                    }
                });
            }, observerOptions);
            observer.observe(_target);
        } else if (_event === USE_EFFECT_EVENTS.ATTRIBUTE) {
            const observer = new MutationObserver((mutations) => {
                for (let mut of mutations) {
                    if (mut.target === _target && mut.type === 'attributes') {
                        effect(_target, mut.attributeName, _target.getAttribute(mut.attributeName));
                    }
                }
            });
            observer.observe(_target, {
                attributes: true,
            });
        } else if (_event === USE_EFFECT_EVENTS.CHILDREN) {
            const observer = new MutationObserver((mutations) => {
                for (let mut of mutations) {
                    if (mut.target === _target && mut.type === 'childList') {
                        effect(_target, mut.addedNodes, mut.removedNodes);
                    }
                }
            });
            observer.observe(_target, {
                childList: true,
                subtree: true,
            });
        } else if (_event === USE_EFFECT_EVENTS.DATA) {
            const observer = new MutationObserver((mutations) => {
                for (let mut of mutations) {
                    if (mut.target === _target && mut.type === 'characterData') {
                        effect(_target, _target.textContent);
                    }
                }
            });
            observer.observe(_target, {
                characterData: true,
            });
        } else ;
    };

    exports.USE_EFFECT_EVENTS = USE_EFFECT_EVENTS;
    exports.useEffect = useEffect;
    exports.useEvent = useEvent;
    exports.useState = useState;

    return exports;

})({});
//# sourceMappingURL=hooks.js.map
