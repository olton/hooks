import {useState} from "./state.js"
import {useEvent} from "./event.js"
import {useEffect, USE_EFFECT_EVENTS} from "./effect.js"

const version = "0.3.0"
const build_time = "08.05.2024, 12:58:44"

const info = () => {
    console.info(`%c Hooks %c v${version} %c ${build_time} `, "color: #ffffff; font-weight: bold; background: #5c2c05", "color: white; background: darkgreen", "color: white; background: #0080fe;")
}

export {
    useState,
    useEvent,
    useEffect, USE_EFFECT_EVENTS,
    info
}