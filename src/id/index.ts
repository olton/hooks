const id_store = new Map()
let id_counter = 0

const useId = (el: HTMLElement, prefix = 'x', divider = "-") => {
    if (id_store.has(el)) {
        return id_store.get(el)
    }
    const id = `__id${divider}${prefix}${divider}${id_counter++}`
    id_store.set(el, id)
    return id    
}

export { useId }