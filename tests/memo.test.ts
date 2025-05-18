import { useMemo } from '../src/index.ts';
import { describe, it, expect, mock } from '@olton/latte';

describe('useMemo', () => {
    it('should memoize function results', () => {
        const add = mock((a: number, b: number): number => a + b);
        const memoizedAdd = useMemo(add);
        
        // Перший виклик з аргументами 1, 2
        expect(memoizedAdd(1, 2)).toBe(3);
        expect(add).toHaveBeenCalledTimes(1);
        
        // Другий виклик з тими ж аргументами
        expect(memoizedAdd(1, 2)).toBe(3);
        expect(add).toHaveBeenCalledTimes(1); // Функція не повинна викликатися повторно
        
        // Виклик з новими аргументами
        expect(memoizedAdd(2, 3)).toBe(5);
        expect(add).toHaveBeenCalledTimes(2);
    });

    it('should respect maxSize option', () => {
        const multiply = mock((a: number, b: number): number => a * b);
        const memoizedMultiply = useMemo(multiply, { maxSize: 2 });
        
        // Заповнюємо кеш
        expect(memoizedMultiply(1, 1)).toBe(1);
        expect(memoizedMultiply(2, 2)).toBe(4);
        expect(multiply).toHaveBeenCalledTimes(2);
        
        // Додаємо третій результат, перший повинен бути видалений з кешу
        expect(memoizedMultiply(3, 3)).toBe(9);
        expect(multiply).toHaveBeenCalledTimes(3);
        
        // Повторний виклик першого результату повинен викликати функцію знову
        expect(memoizedMultiply(1, 1)).toBe(1);
        expect(multiply).toHaveBeenCalledTimes(4);
        
        // Але другий результат повинен залишатися в кеші
        expect(memoizedMultiply(2, 2)).toBe(4);
        expect(multiply).toHaveBeenCalledTimes(4);
    });

    it('should clear cache when clearCache is called', () => {
        const subtract = mock((a: number, b: number): number => a - b);
        const memoizedSubtract = useMemo(subtract);
        
        expect(memoizedSubtract(5, 2)).toBe(3);
        expect(subtract).toHaveBeenCalledTimes(1);
        
        // Повторний виклик з тими ж аргументами
        expect(memoizedSubtract(5, 2)).toBe(3);
        expect(subtract).toHaveBeenCalledTimes(1);
        
        // Очищення кешу
        const clearResult = memoizedSubtract.clearCache();
        expect(clearResult).toBe(true);
        
        // Після очищення кешу функція повинна викликатися знову
        expect(memoizedSubtract(5, 2)).toBe(3);
        expect(subtract).toHaveBeenCalledTimes(2);
    });
});
