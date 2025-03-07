/**
 * `useClickOutside` is a utility function to detect when a click occurs outside of a given DOM element.
 * The function accepts a target `element` and a `callback` function.
 * If a click event happens outside of the specified element, the `callback` will be executed.
 *
 * Example usage:
 *
 * ```typescript
 * import { useClickOutside } from './path-to-file';
 *
 * const myDiv = document.getElementById('my-div');
 * const handleOutsideClick = () => {
 *     console.log('Clicked outside the div!');
 * };
 *
 * const { attach, detach } = useClickOutside(myDiv, handleOutsideClick);
 *
 * // Attach the click listener
 * attach();
 *
 * // Later, if you need to remove the listener
 * detach();
 * ```
 *
 * @param element - The HTMLElement to detect clicks outside of. Can be `null`.
 * @param callback - The function to call when a click happens outside the element.
 * @returns An object containing two methods:
 *   - `attach` - to start listening for outside clicks,
 *   - `detach` - to stop listening for outside clicks.
 */
function useClickOutside(element: HTMLElement | null, callback: Function) {
    if (!element) return { attach: () => {}, detach: () => {} };

    const handleClick = (e: MouseEvent) => {
        if (!element.contains(e.target as Node)) {
            callback();
        }
    };

    const attach = () => document.addEventListener('click', handleClick);
    const detach = () => document.removeEventListener('click', handleClick);

    return { attach, detach };
}

export { useClickOutside }