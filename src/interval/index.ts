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