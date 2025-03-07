interface State {
    value: unknown
}

const state: State[] = [];
let stateIndex = -1;

// Класс-обертка для значений
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

    // Чтобы при консоль логе показывалось актуальное значение
    [Symbol.toPrimitive](hint: string): T | string | number {
        const value = state[this.index].value;
        if (hint === 'number' && typeof value === 'number') return value;
        if (hint === 'string') return String(value);
        return value as T;
    }
}

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