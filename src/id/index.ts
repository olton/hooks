// Надежное хранилище для идентификаторов
const idStore = new Map<Key, string>();
let idCounter = 0;

type Key = string | number | HTMLElement | symbol | object;
type IdOptions = {
    prefix?: string;
    divider?: string;
    forceNew?: boolean;
};

/**
 * Нормализует строковое представление ключа для использования в ID
 */
function normalizeKeyForId(keyStr: string): string {
    // Заменяем недопустимые символы на безопасные
    return keyStr.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/**
 * Создает уникальный идентификатор
 * @param key Ключ для идентификатора (опционально)
 * @param options Опции для генерации ID
 * @returns Уникальный идентификатор
 */
function useId(key?: Key, options: IdOptions = {}): string {
    // Создаем уникальный ключ, если не предоставлен
    const actualKey = key ?? Symbol('id-key');
    const { divider = "-", prefix = "id", forceNew = false } = options;

    // Если ID уже существует для этого ключа и не требуется новый
    if (!forceNew && idStore.has(actualKey)) {
        return idStore.get(actualKey)!;
    }

    const isClient = typeof document !== 'undefined';
    const maxAttempts = 1000;
    let attempts = 0;

    // Функция генерации ID
    const generateId = (): string => {
        let keyType: string;

        if (key instanceof HTMLElement) {
            keyType = key.tagName.toLowerCase();
        } else if (typeof key === 'object' && key !== null) {
            keyType = 'object';
        } else if (key !== undefined) {
            // Нормализуем строковое представление ключа
            keyType = normalizeKeyForId(String(key));
        } else {
            keyType = 'generic';
        }

        return `${prefix}${divider}${keyType}${divider}${idCounter++}`;
    };

    let id = generateId();

    // Проверка на уникальность в DOM (только в браузере)
    if (isClient) {
        while (document.getElementById(id)) {
            if (attempts++ > maxAttempts) {
                throw new Error('useId: не удалось сгенерировать уникальный ID после многочисленных попыток');
            }
            id = generateId();
        }
    }

    // Сохраняем ID в хранилище
    idStore.set(actualKey, id);
    return id;
}

/**
 * Освобождает идентификатор для указанного ключа
 */
function releaseId(key: Key): boolean {
    return idStore.delete(key);
}

/**
 * Проверяет существование ID для указанного ключа
 */
function hasId(key: Key): boolean {
    return idStore.has(key);
}

/**
 * Сбрасывает все сохраненные идентификаторы
 */
function resetIds(): void {
    idStore.clear();
    idCounter = 0;
}

export {
    useId,
    releaseId,
    hasId,
    resetIds
}