const idStore = new Map<Key, string>();
let idCounter = 0;

type Key = string | number | HTMLElement | symbol | object;
type IdOptions = {
    prefix?: string;
    divider?: string;
    forceNew?: boolean;
};

/**
 * Normalizes the key line for use in the identifier
 * Replaces unacceptable characters with safe
 */
function normalizeKeyForId(keyStr: string): string {
    // Заменяем недопустимые символы на безопасные
    return keyStr.replace(/[^a-zA-Z0-9_-]/g, '_');
}


/**
 * Generates a unique ID associated with a given key, utilizing options for customization.
 * The IDs are stored internally to ensure they are reused unless `forceNew` is set in the `options`.
 *
 * @param {Key} [key] - The key to associate with the unique ID. It can be a string, number,
 * HTMLElement, symbol, or object. If not provided, a generic symbol-based key is used.
 * @param {IdOptions} [options] - Options to customize the generated ID.
 * @param {string} [options.prefix="id"] - A prefix for the generated ID.
 * @param {string} [options.divider="-"] - A divider to separate components of the ID.
 * @param {boolean} [options.forceNew=false] - If `true`, forces the generation of a new ID even if one already exists for the key.
 *
 * @returns {string} - A unique ID string.
 *
 * @example
 * // Generate an ID for a string key
 * const id1 = useId("my-key");
 * console.log(id1); // Outputs: "id-my_key-0" (depends on current counter)
 *
 * @example
 * // Generate an ID with customization options
 * const id2 = useId("customElement", { prefix: "custom", divider: ".", forceNew: true });
 * console.log(id2); // Outputs: "custom.customElement.0" (depends on current counter)
 *
 * @example
 * // Reuse an existing ID for the same key
 * const id3 = useId("my-key");
 * console.log(id3 === id1); // true
 *
 * @example
 * // Generate IDs for different key types
 * const id4 = useId(symbolKey);
 * const id5 = useId(domElement);
 * console.log(id4); // Example: "id-symbol-1"
 * console.log(id5); // Example: "id-div-2"
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