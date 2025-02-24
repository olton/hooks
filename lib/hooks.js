
/*!
 * Hooks v0.12.4 (@olton/hooks)
 * Copyright 2025 by Serhii Pimenov <serhii@pimenov.com.ua>
 * Built: 24.02.2025, 04:05:55
 * Licensed under MIT
 */

"use strict";
(() => {
  // src/state/index.ts
  var state = [];
  var stateIndex = -1;
  var useState = (initialState, onStateChange) => {
    const index = stateIndex++;
    state[index] = { value: initialState };
    const setState = (arg) => {
      const old = state[index].value;
      state[index].value = typeof arg === "function" ? arg(old) : arg;
      if (typeof onStateChange === "function") {
        onStateChange(state[index].value, old);
      }
    };
    return [state[index], setState];
  };

  // src/event/index.ts
  var EVENTS = /* @__PURE__ */ ((EVENTS2) => {
    EVENTS2["LOAD"] = "load";
    EVENTS2["VIEWPORT"] = "viewport";
    EVENTS2["ATTRIBUTE"] = "attribute";
    EVENTS2["CHILDREN"] = "children";
    EVENTS2["DATA"] = "data";
    return EVENTS2;
  })(EVENTS || {});
  var useEvent = ({ event, root, target, effect }) => {
    const _target = typeof target === "string" ? document.querySelector(target) : target;
    if (typeof effect !== "function") {
      throw Error("Side effect must be a function!");
    }
    if (!_target) {
      throw Error("Please specify a target element!");
    }
    switch (event) {
      case "load" /* LOAD */: {
        const observer = new MutationObserver((mutations, observer2) => {
          const el = document.querySelector(target);
          if (el !== null) {
            effect(el);
            observer2.disconnect();
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        break;
      }
      case "viewport" /* VIEWPORT */: {
        const _root = root instanceof HTMLElement ? root : typeof root === "string" ? document.querySelector(root) : null;
        const observerOptions = {
          root: _root,
          rootMargin: "0px",
          threshold: 0.5
        };
        const observer = new IntersectionObserver((entries, observer2) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              effect(_target);
            }
          }
        }, observerOptions);
        observer.observe(_target);
        break;
      }
      case "attribute" /* ATTRIBUTE */: {
        const observer = new MutationObserver((mutations) => {
          for (const mut of mutations) {
            if (mut.target === _target && mut.type === "attributes") {
              effect(_target, mut.attributeName, _target.getAttribute(mut.attributeName));
            }
          }
        });
        observer.observe(_target, {
          attributes: true
        });
        break;
      }
      case "children" /* CHILDREN */: {
        const observer = new MutationObserver((mutations) => {
          for (const mut of mutations) {
            if (mut.target === _target && mut.type === "childList") {
              effect(_target, mut.addedNodes, mut.removedNodes);
            }
          }
        });
        observer.observe(_target, {
          childList: true,
          subtree: true
        });
        break;
      }
      case "data" /* DATA */: {
        const observer = new MutationObserver((mutations) => {
          for (const mut of mutations) {
            if (mut.target === _target && mut.type === "characterData") {
              effect(_target, _target.textContent);
            }
          }
        });
        observer.observe(_target, {
          characterData: true
        });
        break;
      }
      default: {
        if (_target instanceof HTMLElement) {
          _target.addEventListener(event, (e) => {
            effect(_target, e);
          });
        }
      }
    }
  };

  // src/memo/index.ts
  var useMemo = (fn) => {
    const cache = /* @__PURE__ */ new Map();
    return (...args) => {
      const key = `${args.length}${args.join("+")}`;
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(null, args);
      cache.set(key, result);
      return result;
    };
  };

  // src/debounce/index.ts
  var useDebounce = (fn, wait) => {
    let timer;
    return function(...args) {
      const func = () => {
        fn.apply(this, args);
      };
      clearTimeout(timer);
      timer = setTimeout(func, wait);
    };
  };

  // src/pipe/index.ts
  var usePipe = (...functions) => {
    return (first) => functions.reduce((acc, fn) => fn(acc), first);
  };

  // src/curry/index.ts
  var useCurry = (func) => {
    return function curried(...args) {
      if (args.length >= func.length) {
        return func.apply(this, args);
      }
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    };
  };

  // src/compose/index.ts
  var useCompose = (...functions) => {
    return (first) => functions.reduceRight((acc, fn) => fn(acc), first);
  };

  // src/throttle/index.ts
  var useThrottle = (fn, wait) => {
    let isThrottled = false;
    let saveThis;
    let saveArgs;
    function wrapper(...args) {
      if (isThrottled) {
        saveThis = this;
        saveArgs = args;
        return;
      }
      fn.apply(this, args);
      isThrottled = true;
      setTimeout(() => {
        if (saveArgs) {
          wrapper.apply(saveThis, saveArgs);
          saveArgs = saveThis = null;
        }
      }, wait);
    }
    return wrapper;
  };

  // src/id/index.ts
  var id_store = /* @__PURE__ */ new Map();
  var id_counter = 0;
  var useId = (el, prefix = "x", divider = "-") => {
    if (id_store.has(el)) {
      return id_store.get(el);
    }
    const id = `__id${divider}${prefix}${divider}${id_counter++}`;
    id_store.set(el, id);
    return id;
  };

  // src/info/index.ts
  var version = "2025";
  var build_time = "24.02.2025, 04:05:55";
  var info_default = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;");
  };

  // src/browser.ts
  var Hooks = {
    useState,
    useEvent,
    EVENTS,
    useMemo,
    useDebounce,
    usePipe,
    useCurry,
    useCompose,
    useThrottle,
    useId,
    info: info_default
  };
  globalThis.Hooks = Hooks;
  info_default();
})();
