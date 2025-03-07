/**
 * Custom hook to manage an interval timer.
 *
 * @param {Function} callback - The function to execute at each interval.
 * @param {number} delay - The delay (in milliseconds) between each execution of the callback.
 * @returns {{ start: Function, stop: Function }} Object containing `start` and `stop` methods to control the interval.
 *
 * @example
 * const { start, stop } = useInterval(() => {
 *     console.log('Interval triggered');
 * }, 1000);
 *
 * start(); // Starts the interval
 * stop();  // Stops the interval
 */
function useInterval(callback: Function, delay: number) {
    let timerId: number | null = null;

    function start() {
        if (timerId) return;
        timerId = window.setInterval(() => callback(), delay);
    }

    function stop() {
        if (timerId) {
            window.clearInterval(timerId);
            timerId = null;
        }
    }

    return { start, stop };
}

export { useInterval }