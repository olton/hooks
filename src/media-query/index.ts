function useMediaQuery(query: string): boolean {
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