/**
 * The `useCookie` hook is a simple utility to manage browser cookies. It allows getting, setting, and deleting cookies in a straightforward way.
 *
 * ## Functions Provided:
 * - `get`: Retrieves the value of the cookie by its name.
 * - `set`: Sets a new value for the cookie with additional options (such as expiration or path).
 * - `delete`: Deletes the cookie by setting a negative `max-age`.
 *
 * ## Usage Examples:
 *
 * ### Retrieving a Cookie
 * ```typescript
 * const { get } = useCookie('user-token');
 * const token = get();
 * console.log(token); // Prints the cookie value if exists, otherwise null
 * ```
 *
 * ### Setting a Cookie
 * ```typescript
 * const { set } = useCookie('user-token');
 * set('abc123', { path: '/', expires: new Date(Date.now() + 3600 * 1000) }); // Expires in 1 hour
 * ```
 *
 * ### Deleting a Cookie
 * ```typescript
 * const { delete: deleteCookie } = useCookie('user-token');
 * deleteCookie();
 * console.log(document.cookie); // The 'user-token' cookie is now deleted
 * ```
 *
 * ## Notes:
 * - The options parameter in `set()` accepts cookie attributes (e.g., `path`, `max-age`, `expires`, `secure`, etc.).
 * - Use `name` as the cookie's key and manage the value using the functions of the hook.
 */
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