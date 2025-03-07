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