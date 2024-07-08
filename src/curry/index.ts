const useCurry = (func: any) => {
    return function curried(...args: any[]) {
        if (args.length >= func.length) {
            // @ts-ignore
            return func.apply(this, args);
        } else {
            return function(...args2: any[]) {
                // @ts-ignore
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

export { useCurry }