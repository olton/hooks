/**
 * A custom hook to manage a boolean state with toggle and set capabilities.
 *
 * @param {boolean} [initialValue=false] - The initial value of the toggle state.
 * @returns {object} An object containing methods to manage the toggle state:
 *   - `get()`: Gets the current value.
 *   - `toggle()`: Toggles the current value between true and false and returns the new value.
 *   - `set(newValue: boolean)`: Sets the value to the specified boolean and returns it.
 *
 * @example
 * // Basic usage
 * const toggle = useToggle();
 * console.log(toggle.get()); // false
 * toggle.toggle(); // true
 * toggle.set(false); // false
 *
 * @example
 * // Initialize with a custom starting value
 * const toggle = useToggle(true);
 * console.log(toggle.get()); // true
 * toggle.toggle(); // false
 */
function useToggle(initialValue: boolean = false): object {
    let value = initialValue;

    return {
        get: () => value,
        toggle: () => { value = !value; return value; },
        set: (newValue: boolean) => { value = newValue; return value; }
    };
}

export { useToggle }