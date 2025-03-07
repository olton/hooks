
function useMediaQuery(query: string): boolean {
    /**
     * A custom hook that listens to changes in a specified media query and returns
     * whether the media query currently matches.
     *
     * This hook leverages the `window.matchMedia` API to evaluate and react to changes
     * in the provided media query string. It ensures that the value reflects the current state
     * of the media query, making it useful for implementing responsive and dynamic designs in your application.
     *
     * Note: This hook should be used in browser-compatible environments where `window.matchMedia` is supported.
     *
     * @param {string} query - The media query string to evaluate (e.g., "(max-width: 600px)").
     * @returns {boolean} - `true` if the media query matches the current viewport or condition, otherwise `false`.
     *
     * @example
     * // Example 1: Check if the viewport width is 600px or less
     * const isSmallScreen = useMediaQuery("(max-width: 600px)");
     * console.log(isSmallScreen); // Outputs `true` or `false` based on the screen size.
     *
     * @example
     * // Example 2: Detect if the user prefers dark mode
     * const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
     * console.log(prefersDarkMode); // Outputs `true` if the user prefers dark mode.
     *
     * @example
     * // Example 3: Detect if the device is in portrait mode
     * const isPortrait = useMediaQuery("(orientation: portrait)");
     * console.log(isPortrait); // Outputs `true` if the device is in portrait mode.
     */
    const mediaQuery = window.matchMedia(query);
    function getMatches(): boolean {
        return mediaQuery.matches;
    }

    let matches = getMatches();

    function handleChange() {
        matches = getMatches();
    }

    mediaQuery.addEventListener('change', handleChange);

    return matches;
}

export { useMediaQuery }