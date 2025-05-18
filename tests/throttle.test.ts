import { useThrottle } from '../src/index.ts';
import { describe, it, expect, mock, waitFor } from '@olton/latte';

describe('useThrottle', () => {
    it('should execute function immediately', () => {
        // @ts-ignore
        const mockFn = mock();
        const throttled = useThrottle(mockFn, 100);
        
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not execute function immediately', () => {
        // @ts-ignore
        const mockFn = mock();
        const throttled = useThrottle(mockFn, 100);
        
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(0);
        
        waitFor(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should limit function execution to once per wait period', () => {
        // @ts-ignore
        const mockFn = mock();
        const throttled = useThrottle(mockFn, 100);
        
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        // Виклики в період очікування повинні ігноруватися
        throttled();
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        // Після очікування наступний виклик має спрацювати
        waitFor(100);
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should execute trailing calls with trailing=true', () => {
        // @ts-ignore
        const mockFn = mock();
        const throttled = useThrottle(mockFn, 100, { trailing: true });
        
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        // Виклики в період очікування запам'ятовуються і виконуються в кінці
        throttled();
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        waitFor(100);
        expect(mockFn).toHaveBeenCalledTimes(2); // Кінцевий виклик виконано
    });

    it('should not execute trailing calls with trailing=false', () => {
        // @ts-ignore
        const mockFn = mock();
        const throttled = useThrottle(mockFn, 100, { trailing: false });
        
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        // Виклики в період очікування ігноруються
        throttled();
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        waitFor(100);
        expect(mockFn).toHaveBeenCalledTimes(1); // Кінцевий виклик не виконується
    });

    it('should pass arguments to the throttled function', () => {
        const mockFn = mock((a: number, b: number) => a + b);
        const throttled = useThrottle(mockFn, 100);
        
        expect(throttled(2, 3)).toBe(5);
        expect(mockFn).toHaveBeenCalledWith([2, 3]);
    });

    it('should cancel pending executions when cancel is called', () => {
        // @ts-ignore
        const mockFn = mock();
        const throttled = useThrottle(mockFn, 100, { trailing: true });
        
        throttled();
        expect(mockFn).toHaveBeenCalledTimes(1);
        
        throttled(); // Буде виконано в кінці періоду очікування
        throttled.cancel(); // Скасовуємо відкладене виконання
        
        waitFor(100);
        expect(mockFn).toHaveBeenCalledTimes(1); // Відкладений виклик не відбувся
    });

    it('should throw an error if first argument is not a function', () => {
        expect(() => {
            // @ts-ignore - ігноруємо типову помилку для тестування помилки під час виконання
            useThrottle("not a function", 100);
        }).toThrow("useThrottle: перший аргумент повинен бути функцією");
    });

    it('should throw an error if wait is negative', () => {
        expect(() => {
            useThrottle(() => {}, -100);
        }).toThrow("useThrottle: час очікування повинен бути позитивним числом");
    });
});
