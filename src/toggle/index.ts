function useToggle(initialValue = false) {
    let value = initialValue;

    return {
        get: () => value,
        toggle: () => { value = !value; return value; },
        set: (newValue: boolean) => { value = newValue; return value; }
    };
}

export { useToggle }