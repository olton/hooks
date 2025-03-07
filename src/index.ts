import {useClickOutside} from "./click-outside/index.ts"
import {useCompose} from "./compose/index.ts";
import {useCookie} from "./cookie/index.ts";
import {useCurry} from "./curry/index.ts";
import {useDebounce} from "./debounce/index.ts";
import {useEvent, EVENTS} from "./event/index.ts"
import {useId} from "./id/index.js";
import {useInterval} from "./interval/index.js";
import {useMediaQuery} from "./media-query/index.js";
import {useMemo} from "./memo/index.ts";
import {usePipe} from "./pipe/index.ts";
import {useQueue} from "./queue/index.ts";
import {useState} from "./state/index.ts"
import {useThrottle} from "./throttle/index.ts";
import {useToggle} from "./toggle/index.ts";

const version = "__VERSION__"
const build_time = "__BUILD_TIME__"

const info = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
    useClickOutside,
    useCompose,
    useCookie,
    useCurry,
    useDebounce,
    useEvent,
    EVENTS,
    useId,
    useInterval,
    useMediaQuery,
    useMemo,
    usePipe,
    useQueue,
    useState,
    useThrottle,
    useToggle,
    info
}