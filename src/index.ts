import {useState} from "./state"
import {useEvent, USE_EVENT_EVENTS} from "./event"
import {useMemo} from "./memo";
import {useDebounce} from "./debounce";
import {usePipe} from "./pipe";
import {useCurry} from "./curry";
import {useCompose} from "./compose";
import {useThrottle} from "./throttle";

const version = "0.7.0"
const build_time = "08.07.2024, 19:53:33"

const info = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
    useState,
    useEvent,
    USE_EVENT_EVENTS,
    useMemo,
    useDebounce,
    usePipe,
    useCurry,
    useCompose,
    useThrottle,
    info
}