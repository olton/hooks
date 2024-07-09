const useCurry = (func: unknown) => {
    return function curried(...args: unknown[]) {
        // @ts-ignore
        if (args.length >= func.length) {
            // @ts-ignore
            return func.apply(this, args);
        }
        return function(...args2: Array<unknown>) {
            // @ts-ignore
            return curried.apply(this, args.concat(args2));
        };
    };
}

export { useCurry }