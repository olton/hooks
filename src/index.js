import {useState} from "./state.js"
import {useEvent} from "./event.js"
import {useEffect, USE_EFFECT_EVENTS} from "./effect.js"
import {useMemo} from "./memo.js";

const version = "0.4.0"
const build_time = "11.06.2024, 16:50:24"

const info = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
    useState,
    useEvent,
    useEffect, USE_EFFECT_EVENTS,
    useMemo,
    info
}