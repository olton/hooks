import { useCompose } from '../src/index.ts';
import { describe, it, expect, mock } from '@olton/latte';

describe('useCompose', () => {
    it('should compose functions right to left', () => {
        const addOne = mock((x: number) => x + 1);
        const multiplyByTwo = mock((x: number) => x * 2);
        
        const composed = useCompose(addOne, multiplyByTwo);
        
        // (5 * 2) + 1 = 11
        expect(composed(5)).toBe(11);
        expect(multiplyByTwo).toHaveBeenCalledWith(5);
        expect(addOne).toHaveBeenCalledWith(10);
    });

    it('should compose multiple functions', () => {
        const addOne = (x: number) => x + 1;
        const multiplyByTwo = (x: number) => x * 2;
        const subtractThree = (x: number) => x - 3;
        
        const composed = useCompose(addOne, multiplyByTwo, subtractThree);
        
        // ((5 - 3) * 2) + 1 = 5
        expect(composed(5)).toBe(5);
    });

    it('should return input if no functions provided', () => {
        const composed = useCompose();
        
        expect(composed(5)).toBe(5);
        expect(composed('test')).toBe('test');
    });

    it('should return function result if only one function provided', () => {
        const addOne = (x: number) => x + 1;
        const composed = useCompose(addOne);
        
        expect(composed(5)).toBe(6);
    });

    it('should handle functions with different return/input types', () => {
        const numberToString = (x: number) => x.toString();
        const appendExclamation = (x: string) => x + '!';
        
        const composed = useCompose(appendExclamation, numberToString);
        
        expect(composed(42)).toBe('42!');
    });

    it('should preserve this context in functions', () => {
        const obj = {
            value: 5,
            addValue: function(x: number) {
                return x + this.value;
            }
        };
        
        const multiplyByTwo = function(x: number) {
            return x * 2;
        };
        
        const composed = useCompose(obj.addValue.bind(obj), multiplyByTwo);
        
        // (10 * 2) + 5 = 25
        expect(composed(10)).toBe(25);
    });
});
