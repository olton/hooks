const id_store = new Map()
let id_counter = 0

type Key = string | number | HTMLElement
type IdOptions = {
    prefix?: string
    divider?: string
}

const createKey = () => Object.freeze({})

const useId = (key?: Key, options: IdOptions = {}) => {
    const actualKey = key ?? createKey()
    const {divider = "-", prefix = "id"} = options

    if (id_store.has(actualKey)) {
        return id_store.get(actualKey)
    }

    const maxAttempts = 1000
    let attempts = 0

    const gen = () => `__${prefix}${divider}${id_counter++}`
    
    let id = gen()

    while (document.getElementById(id)) {
        if (attempts++ > maxAttempts) {
            throw new Error('Could not generate unique ID')
        }

        id = gen()
    }

    id_store.set(actualKey, id)

    return id    
}

export { useId }