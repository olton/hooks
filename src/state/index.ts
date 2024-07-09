interface State {
    value: unknown
}

const state: State[]  = [];
let stateIndex = -1

const useState = (initialState: unknown, onStateChange: unknown) => {
    const index = stateIndex++
    state[index] = {value: initialState};

    const setState = (arg: unknown) => {
        const old = state[index].value

        state[index].value = typeof arg === "function" ? arg(old) : arg

        if (typeof onStateChange === "function") {
            onStateChange(state[index].value, old)
        }
    }

    return [state[index], setState]
}

export {
    useState,
}
