# Hooks
The sets of hooks

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
```javascript
import {useState} from "@olton/hooks"

const [state, setState] = useState(0)
```

## Description

### useState
If you are using React, you are known a hook `useState` ;) This is analogue for using in outside a React.

The function `useState` - returns a tuple with two functions: `state()` - getter and `setState()` - setter.
`useState` can take two parameters: **initial** value for state and event handler for state changing (optional).

#### Example of usage:
```html
<button id="bt1">Clicks (0)</button>
<button id="bt2">Clicks (0)</button>
```

```javascript
function onStateChange(){
    console.log([...arguments])
}

{
    const [state1, setState1] = Hooks.useState(0, onStateChange)
    document.querySelector('#b1').addEventListener('click', function () {
        setState1(state1.value + 1)
        setTimeout(()=>{
            this.textContent = `Clicks (${state1.value})`
        }, 100)
    });
}

{
    const [state2, setState2] = Hooks.useState(1, onStateChange)
    document.querySelector('#b2').addEventListener('click', function () {
        setState2((old) => {
            return old * 2
        })
        setTimeout(()=>{
            this.textContent = `Clicks (${state2.value})`
        }, 100)
    });
}
```

### useEvent
This hook is designed to trigger the effect under certain conditions:
- `load` - perform the effect when the element appears in the document
- `viewport` - perform the effect when the element appears in the viewport
- `attribute` - perform the effect when the element attribute(s) changed
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

### useMemo
Do memoization with hook `useMemo`. You can pass function as argument to `useMemo` and return memoized function.
```javascript
import {useMemo} from "@olton/hooks"

const factorial = Hooks.useMemo( n => {
    return n <= 1 ? 1 : n * factorial(n-1)
})

console.log(factorial(5)) // calc
console.log(factorial(5)) // use cache for 1!, 2!, 3!, 4!, 5!

```

### usePipe
```javascript
import {usePipe} from "@olton/hooks"

const fn1 = v => v + " world!"
const fn2 = v => v + " usePipe()"
const fn3 = v => v + " Enjoy!"

const pipeResult = Hooks.usePipe(fn1, fn2, fn3)("Hello")

console.log(pipeResult)
// --> Hello world! usePipe() Enjoy!
```

### useDebounce
### useThrottle
### useCompose
### useCurry