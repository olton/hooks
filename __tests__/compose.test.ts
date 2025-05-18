import {useCompose} from '../src/index.ts'; // Замініть шлях на ваш
// @ts-ignore
import {test, expect, mock} from '@olton/latte';

test('useCompose - should compose functions correctly', () => {
    const funcA = mock((x:number) => x + 1);
    const funcB = mock((x:number) => x * 2);

    const result = useCompose(funcA, funcB)

    // Перевіряємо обчислення
    expect(result(3)).toBe(7); // (3 * 2) + 1 = 7
    expect(funcA).toHaveBeenCalledWith([6]);
    expect(funcB).toHaveBeenCalledWith([3]);
});
