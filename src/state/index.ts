/**
 * A State interface
 */
interface State {
    value: unknown
}

const state: State[] = [];
let stateIndex = -1;

/**
 *  A class that represents a state value in a custom hook.
 */
class StateValue<T> {
    private index: number;

    constructor(index: number) {
        this.index = index;
    }

    valueOf(): T {
        return state[this.index].value as T;
    }

    toString(): string {
        const value = state[this.index].value;
        return String(value);
    }

    [Symbol.toPrimitive](hint: string): T | string | number {
        const value = state[this.index].value;
        if (hint === 'number' && typeof value === 'number') return value;
        if (hint === 'string') return String(value);
        return value as T;
    }
}


/**
 * A custom hook that manages state, similar to React's useState.
 * It allows tracking of state values and processes an optional callback
 * when the state changes.
 *
 * @template T - The type of the state value.
 * @param {T} initialState - The initial state value.
 * @param {(newValue: T, oldValue: T) => void} [onStateChange] - Optional callback function
 *     to handle side effects whenever the state is updated. The function
 *     receives the new state value and the previous state value as arguments.
 * @returns {[StateValue<T>, (arg: T | ((prev: T) => T)) => void]} - Returns
 *     a tuple with the following:
 *     - `StateValue<T>`: A proxy object for the current state offering
 *         optional type casting (e.g., via valueOf, toString, and Symbol.toPrimitive).
 *     - `setState`: A function to update the state. It accepts either a
 *         new value or a callback function with the previous state as an argument.
 *
 * @example
 * const [count, setCount] = useState(0, (newValue, oldValue) => {
 *     console.log(`State changed from ${oldValue} to ${newValue}`);
 * });
 *
 * console.log(+count); // Logs: 0
 *
 * setCount(5); // Logs: "State changed from 0 to 5"
 *
 * setCount(prev => prev + 1); // Logs: "State changed from 5 to 6"
 * console.log(+count); // Logs: 6
 *
 * console.log(String(count)); // Logs: "6"
 */
const useState = <T>(initialState: T, onStateChange?: (newValue: T, oldValue: T) => void) => {
    const index = stateIndex++;

    if (!state[index]) {
        state[index] = { value: initialState };
    }

    const stateValue = new StateValue<T>(index);

    const setState = (arg: T | ((prev: T) => T)) => {
        const old = state[index].value as T;
        const newValue = typeof arg === "function"
            ? (arg as Function)(old)
            : arg;

        state[index].value = newValue;

        if (typeof onStateChange === "function") {
            onStateChange(newValue as T, old);
        }
    };

    return [stateValue, setState];
};

export {
    useState,
};