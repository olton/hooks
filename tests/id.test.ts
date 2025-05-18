import { useId } from '../src/index.ts';
import { describe, it, expect, beforeEach } from '@olton/latte';

describe('useId', () => {
    beforeEach(() => {
    });

    it('should generate an id with default options', () => {
        const id = useId('test-key');
        
        expect(id).toBeString();
        expect(id).toMatch(/^id-test_key-\d+$/);
    });

    it('should generate the same id for the same key', () => {
        const id1 = useId('test-key');
        const id2 = useId('test-key');
        
        expect(id1).toBe(id2);
    });

    it('should generate different ids for different keys', () => {
        const id1 = useId('test-key-1');
        const id2 = useId('test-key-2');
        
        expect(id1).not.toBe(id2);
    });

    it('should generate a new id when forceNew is true', () => {
        const id1 = useId('test-key');
        const id2 = useId('test-key', { forceNew: true });
        
        expect(id1).not.toBe(id2);
    });

    it('should generate an id with custom prefix and divider', () => {
        const id = useId('test-key', { prefix: 'custom', divider: '.' });
        
        expect(id).toMatch(/^custom\.test_key\.\d+$/);
    });
});
