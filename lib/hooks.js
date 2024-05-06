
/*!
 * HooksJS - The set of hooks  (https://hooks.io)
 * Copyright 2024 by Serhii Pimenov
 * Licensed under MIT
 !*/

var Hooks = (function (exports) {
    'use strict';

    class StateValue {
        val = null

        constructor(initialValue) {
            this.val = initialValue;
        }

        get state(){
            return this.val
        }

        set state(state) {
            if (Object.is(state, this.state)) return
            this.state = state;
        }
    }

    const useState = (initialState, onStateChange) => {
        let machine = new StateValue(initialState);
        let sm = new Proxy(machine, {
            get: function(target, prop) {
                return target[prop];
            },
            set: function(target, prop, value) {
                const old = target[prop];
                target[prop] = value;
                if (typeof onStateChange === "function") {
                    onStateChange({
                        prop,
                        oldVal: old,
                        newVal: value
                    });
                }
                return true;
            }
        });

        const setState = (newState) => {
            if (typeof newState === "object") {
                Object.keys(newState).forEach(key => {
                    sm[key] = newState[key];
                });
            } else {
                sm.val = newState;
            }

            return state()
        };

        const state = () => {
            if (Object.keys(sm).length === 1 && Object.keys(sm)[0] === "val") {
                return sm.val
            }
            return sm
        };

        return [
            state,
            setState
        ]
    };

    const useEventDefaults = {
        effect: null,
        event: "load",
        target: globalThis,
        one: false
    };

    const useEvent = ({effect, event, target, one} = useEventDefaults) => {
        let _target, _event;

        if (!target) {
            _target = globalThis;
        } else if (typeof target === "string") {
            _target = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            _target = target;
        }

        _event = !event ? "load" : event;

        if (typeof effect !== "function") {
            throw Error(`Effect must be a function!`)
        }

        const listener = (e) => {
            if (one) {
                _target.removeEventListener(_event, listener);
            }
            effect(e);
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
