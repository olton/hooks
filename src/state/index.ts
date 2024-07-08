let state = [];
let stateIndex = -1

const useState = (initialState: any, onStateChange: any) => {
    const index = stateIndex++
    state[index] = {value: initialState};

    const setState = (arg: any) => {
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
