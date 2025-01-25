# Hooks
The sets of hooks

![npm](https://img.shields.io/npm/v/@olton/hooks)
![GitHub](https://img.shields.io/github/license/olton/hooks)
![GitHub issues](https://img.shields.io/github/issues/olton/hooks)
![GitHub pull requests](https://img.shields.io/github/issues-pr/olton/hooks)


Current implemented:

+ [x] [useState()](#usestate)
+ [x] [useEvent()](#useevent)
+ [x] [useMemo()](#usememo)
+ [x] [usePipe](#usepipe)
+ [x] [useDebounce](#usedebounce)
+ [x] [useCurry](#usecurry)
+ [x] [useCompose](#usecompose)
+ [x] [useThrottle](#usethrottle)

## Using

### Install
```shell
npm i --save @olton/hooks
```

## Population

### Browser

If you use library directly in browser, all functions to create user hooks collected in the global namespace named `Hooks`.

```html
<script src="https://cdn.statically.io/gh/olton/hooks/master/lib/hooks.js"></script>
```

### Node.js

If you use library in Node.js, you can import functions from the library.

```javascript
import Hooks from "@olton/hooks"
```

or 

```javascript
import {useMemo} from "@olton/hooks"
```


## Functions

### `useState()`

The `useState` function creates a state variable and a function to change it.

```javascript
function onStateChange(){
    console.log([...arguments])
}
const [state, setState] = Hooks.useState('initial value', onStateChange);
console.log(state.value); // initial value

setState('new value');
setState((old_value) => old_value + ' -> new value');
``` 

### `useMemo()`

Do memoization with hook `useMemo`. You can pass function as argument to `useMemo` and return memoized function.

```javascript
const factorial = Hooks.useMemo( n => {
    return n <= 1 ? 1 : n * factorial(n-1)
})
console.log(factorial(5)) // Real calc
console.log(factorial(5)) // Cached result
```

### `useDebounce()`

The `useDebounce` function creates a debounced function.

```javascript
const debounced = Hooks.useDebounce( (value) => {
    console.log(value)
}, 1000)
debounced('Hello, World!')
```

### `useThrottle()`

The `useThrottle` function creates a throttled function.

```javascript
const throttled = Hooks.useThrottle( (value) => {
    console.log(value)
}, 1000)
throttled('Hello, World!')
```

### `usePipe()`

The `usePipe` function creates a piped function.

```javascript
const fn1 = v => v + " world!"
const fn2 = v => v + " usePipe()"
const fn3 = v => v + " Enjoy!"

const pipeResult = Hooks.usePipe(fn1, fn2, fn3)("Hello")
console.log(pipeResult) // Hello world! usePipe() Enjoy!
```

### `useCompose()`

The `useCompose` function creates a composed function.

```javascript
const fn1 = v => v + " world!"
const fn2 = v => v + " useCompose()"
const fn3 = v => v + " Enjoy!"

const composeResult = Hooks.useCompose(fn1, fn2, fn3)("Hello")
console.log(composeResult) // Hello Enjoy! useCompose() world!
```

### `useCurry()`

The `useCurry` function creates a curried function.

```javascript
const sum = Hooks.useCurry((a, b, c) => a + b + c)
console.log(sum(1)(2)(3)) // 6

const sum2 = Hooks.useCurry((a, b, c) => a + b + c)
console.log(sum2(1, 2)(3)) // 6

const sum3 = Hooks.useCurry((a, b, c) => a + b + c)
console.log(sum3(1)(2)(3)) // 6
```

### useEvent
This hook is designed to trigger the effect under certain conditions:
- `load` - perform the effect when the element appears in the document
- `viewport` - perform the effect when the element appears in the viewport
- `attribute` - perform the effect when the element attributes changed
- `children` - perform the effect when the element children changed (add or remove)
- `data` - perform the effect when the element text content was changed

```javascript
import { useEvent, EVENTS } from "@olton/hooks"

useEvent({
    target: "#btn",
    event: EVENTS.VIEWPORT,
    effect: (target) => console.log(`Element showing in viewport`)
})
```
