import { useCookie } from '../src/index.ts';
import { describe, it, expect, mock, beforeEach, afterEach } from '@olton/latte';

describe('useCookie', () => {
    beforeEach(() => {
        // Очищуємо document.cookie перед кожним тестом
        document.cookie.split(';').forEach(c => {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
    });

    it('should get a cookie value', () => {
        // Встановлюємо cookie напряму
        document.cookie = 'test-cookie=test-value; path=/';
        
        const { get } = useCookie('test-cookie');
        expect(get()).toBe('test-value');
    });

    it('should return null when cookie does not exist', () => {
        const { get } = useCookie('non-existent-cookie');
        expect(get()).toBe(null);
    });

    it('should set a cookie with default options', () => {
        const { set, get } = useCookie('test-cookie');
        set('test-value');
        
        expect(get()).toBe('test-value');
        expect(document.cookie).toContain('test-cookie=test-value');
    });

    it('should set a cookie with custom options', () => {
        const { set } = useCookie('test-cookie');
        set('test-value', { path: '/', 'max-age': 3600 });
        
        expect(document.cookie).toContain('test-cookie=test-value');
        expect(document.cookie).toContain('max-age=3600');
    });

    it('should delete a cookie', () => {
        // Спочатку встановлюємо cookie
        const { set, delete: deleteCookie, get } = useCookie('test-cookie');
        set('test-value');
        
        // Перевіряємо, що cookie встановлено
        expect(get()).toBe('test-value');
        
        // Видаляємо cookie
        deleteCookie();
        
        // Перевіряємо, що cookie видалено
        expect(get()).toBe(null);
    });
});
