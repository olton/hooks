const id_store = new Map()
let id_counter = 0

const useId = (el: HTMLElement, prefix = 'id') => {
    if (id_store.has(el)) {
        return id_store.get(el)
    }
    const id = `:${prefix}:${id_counter++}`
    id_store.set(el, id)
    return id    
}

export { useId }