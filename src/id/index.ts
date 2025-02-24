const id_store = new WeakMap()
let id_counter = 0

type Key = string | number | symbol | HTMLElement
type IdOptions = {
    prefix?: string
    divider?: string
}

const useId = (el: Key, options: IdOptions = {}) => {
    const {divider = "_", prefix = "x"} = options

    if (typeof el === 'object' && el !== null && id_store.has(el)) {
        return id_store.get(el)
    }

    const maxAttempts = 1000
    let attempts = 0

    const gen = () => `${divider}${divider}id${divider}${prefix}${divider}${id_counter++}`
    
    let id = gen()

    while (document.getElementById(id)) {
        if (attempts++ > maxAttempts) {
            throw new Error('Could not generate unique ID')
        }

        id = gen()
    }
    
    if (typeof el === 'object' && el !== null) {
        id_store.set(el, id)
    }

    return id    
}

export { useId }