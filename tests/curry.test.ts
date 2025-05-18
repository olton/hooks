import { useCurry } from '../src/index.ts';
import { describe, it, expect, mock } from '@olton/latte';

describe('useCurry', () => {
    it('should curry a function with two arguments', () => {
        const add = (a: number, b: number): number => a + b;
        const curriedAdd = useCurry(add);
        
        expect(curriedAdd(1)(2)).toBe(3);
        expect(curriedAdd(5)(7)).toBe(12);
    });

    it('should curry a function with three arguments', () => {
        const add3 = (a: number, b: number, c: number): number => a + b + c;
        const curriedAdd3 = useCurry(add3);
        
        expect(curriedAdd3(1)(2)(3)).toBe(6);
        expect(curriedAdd3(10)(20)(30)).toBe(60);
    });

    it('should allow partial application', () => {
        const multiply = (a: number, b: number, c: number): number => a * b * c;
        const curriedMultiply = useCurry(multiply);
        
        const multiplyBy2 = curriedMultiply(2);
        expect(multiplyBy2(3)(4)).toBe(24);
        expect(multiplyBy2(5)(6)).toBe(60);
    });

    it('should handle function with no arguments', () => {
        const returnFive = (): number => 5;
        const curriedReturnFive = useCurry(returnFive);
        
        expect(curriedReturnFive()).toBe(5);
    });

    it('should work with all arguments at once if provided', () => {
        const subtract = (a: number, b: number): number => a - b;
        const curriedSubtract = useCurry(subtract);
        
        // Передаємо всі аргументи одразу
        expect(curriedSubtract(10, 5)).toBe(5);
    });

    it('should throw an error if first argument is not a function', () => {
        expect(() => {
            // @ts-ignore - ігноруємо типову помилку для тестування помилки під час виконання
            useCurry("not a function");
        }).toThrow("useCurry: перший аргумент повинен бути функцією");
    });

    it('should preserve \'this\' context', () => {
        const obj = {
            multiplier: 2,
            multiply: function(a: number) {
                return a * this.multiplier;
            }
        };
        
        const curriedMultiply = useCurry(obj.multiply);
        
        expect(curriedMultiply.call(obj, 5)).toBe(10);
    });
});
