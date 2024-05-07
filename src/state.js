const states = new Map()
let index = 0

const useState = (initialState, onStateChange) => {
    const stateIndex = index
    states.set(index, initialState)
    index++

    const getState = () => {
        return states.get(stateIndex)
    }

    const setState = (newState) => {
        const oldState = states.get(stateIndex)
        states.set(stateIndex, typeof newState === "object" ? Object.assign({}, newState) : newState)
        if (typeof onStateChange === 'function') {
            onStateChange(states.get(stateIndex), oldState)
        }
    }

    return [getState, setState]
}

export {
    useState
}
