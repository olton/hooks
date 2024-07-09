import {useState} from "./state/index.js"
import {useEvent, EVENTS} from "./event/index.js"
import {useMemo} from "./memo/index.js";
import {useDebounce} from "./debounce/index.js";
import {usePipe} from "./pipe/index.js";
import {useCurry} from "./curry/index.js";
import {useCompose} from "./compose/index.js";
import {useThrottle} from "./throttle/index.js";

const version = "0.10.0"
const build_time = "09.07.2024, 13:04:50"

const info = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
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