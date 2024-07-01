import {useState} from "./state.js"
import {useEvent} from "./event.js"
import {useEffect, USE_EFFECT_EVENTS} from "./effect.js"
import {useMemo} from "./memo.js";
import {useDebounce} from "./debounce.js";
import {usePipe} from "./pipe.js";
import {useCurry} from "./curry.js";
import {useCompose} from "./compose.js";

const version = "0.6.0"
const build_time = "01.07.2024, 18:15:34"

const info = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
    useState,
    useEvent,
    useEffect, USE_EFFECT_EVENTS,
    useMemo,
    useDebounce,
    usePipe,
    useCurry,
    useCompose,
    info
}