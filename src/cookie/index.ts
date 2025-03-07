function useCookie(name: string) {
    function getCookie(): string | null {
        const matches = document.cookie.match(
            new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
        );
        return matches ? decodeURIComponent(matches[1]) : null;
    }

    function setCookie(value: string, options: Record<string, any> = {}) {
        options = { path: '/', ...options };

        // Исправляем использование Object.entries для совместимости
        document.cookie = `${name}=${encodeURIComponent(value)}; ${
            Object.keys(options)
                .map((key: string) => `${key}=${options[key]}`)
                .join('; ')
        }`;
    }

    function deleteCookie() {
        setCookie('', { 'max-age': -1 });
    }

    return { get: getCookie, set: setCookie, delete: deleteCookie };
}

export { useCookie }