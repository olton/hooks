import { useEvent, EVENTS } from '../src/index.ts';
import { describe, it, expect, mock, beforeEach, afterEach } from '@olton/latte';

describe('useEvent', () => {
    beforeEach(() => {
        // Підготовка DOM-елементів для тестів
        document.body.innerHTML = `
            <div id="test-element">Test Content</div>
            <div id="viewport-element">Viewport Test</div>
        `;
    });

    afterEach(() => {
        // Очищення DOM після тестів
        document.body.innerHTML = '';
    });

    it('should throw an error if effect is not a function', () => {
        expect(() => {
            // @ts-ignore - ігноруємо типову помилку для тестування помилки під час виконання
            useEvent({
                event: 'click',
                target: '#test-element',
                effect: 'not a function'
            });
        }).toThrow('Side effect must be a function!');
    });

    it('should throw an error if target element does not exist', () => {
        expect(() => {
            useEvent({
                event: 'click',
                target: '#non-existent-element',
                effect: () => {}
            });
        }).toThrow('Please specify a target element!');
    });

    it('should set up event listener for DOM events', () => {
        // @ts-ignore
        const mockEffect = mock();
        const element = document.querySelector('#test-element') as HTMLElement;
        
        useEvent({
            event: 'click',
            target: '#test-element',
            effect: mockEffect
        });
        
        // Імітуємо клік на елементі
        const clickEvent = new MouseEvent('click');
        element.dispatchEvent(clickEvent);
        
        expect(mockEffect).toHaveBeenCalledTimes(1);
        expect(mockEffect).toHaveBeenCalledWith(element, clickEvent);
    });

    it('should handle attribute mutations', () => {
        // @ts-ignore
        const mockEffect = mock();
        const element = document.querySelector('#test-element') as HTMLElement;
        
        useEvent({
            event: EVENTS.ATTRIBUTE,
            target: '#test-element',
            effect: mockEffect
        });
        
        // Змінюємо атрибут елемента
        setTimeout(() => {
            element.setAttribute('data-test', 'test-value');
            
            setTimeout(() => {
                expect(mockEffect).toHaveBeenCalledTimes(1);
                expect(mockEffect).toHaveBeenCalledWith(element, 'data-test', 'test-value');
            }, 0);
        }, 0);
    });

    it('should handle children mutations', () => {
        // @ts-ignore
        const mockEffect = mock();
        const element = document.querySelector('#test-element') as HTMLElement;
        
        useEvent({
            event: EVENTS.CHILDREN,
            target: '#test-element',
            effect: mockEffect
        });
        
        // Додаємо дочірній елемент
        setTimeout(() => {
            const childElement = document.createElement('span');
            element.appendChild(childElement);
            
            setTimeout(() => {
                expect(mockEffect).toHaveBeenCalledTimes(1);
            }, 0);
        }, 0);
    });

    it('should handle data mutations', () => {
        const mockEffect = mock();
        const element = document.querySelector('#test-element') as HTMLElement;
        const textNode = element.firstChild as Text;
        
        useEvent({
            event: EVENTS.DATA,
            target: '#test-element',
            effect: mockEffect
        });
        
        // Змінюємо текстовий вміст
        setTimeout(() => {
            textNode.nodeValue = 'Updated Content';
            
            setTimeout(() => {
                expect(mockEffect).toHaveBeenCalledTimes(1);
                expect(mockEffect).toHaveBeenCalledWith(element, 'Updated Content');
            }, 0);
        }, 0);
    });
});
