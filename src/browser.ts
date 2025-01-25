import {useState} from "./state/index.ts"
import {useEvent, EVENTS} from "./event/index.ts"
import {useMemo} from "./memo/index.ts";
import {useDebounce} from "./debounce/index.ts";
import {usePipe} from "./pipe/index.ts";
import {useCurry} from "./curry/index.ts";
import {useCompose} from "./compose/index.ts";
import {useThrottle} from "./throttle/index.ts";
import info from "./info/index.ts";

const Hooks = {
    useState,
    useEvent,
    EVENTS,
    useMemo,
    useDebounce,
    usePipe,
    useCurry,
    useCompose,
    useThrottle,
    info
}

// @ts-ignore
globalThis.Hooks = Hooks

info()