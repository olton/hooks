# Hooks
The sets of hooks

Current implemented:

+ [x] [useState()](#usestate)
+ [x] [useEvent()](#useevent)
+ [x] [useEffect()](#useffect)
+ [x] [useMemo()](#usememo)
+ [x] [usePipe](#usepipe)
+ [x] [useDebounce](#usedebounce)
+ [x] [useCurry](#usecurry)
+ [x] [useCompose](#usecompose)

## Using

### Direct into browser
```html
<script src="https://cdn.jsdelivr.net/npm/@olton/hooks@latest"></script>
<script>
    Hooks.useEffect({...})
</script>
```

### NPM
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
This is a shortcut for `addEventListener`. You can use hook `useEvent` to quick access to the events.
```javascript
import { useEvent } from "@olton/hooks"

// Each time when user click on the button
useEvent({
    target: "#btn",
    event: "click",
    effect: (event) => console.log(`You clicked on button`)
})

// One time and remove listener
useEvent({
    target: "#btn",
    event: "click",
    effect: (event) => console.log(`You clicked on button`),
    one: true
})
```

### useEffect
This hook is designed to trigger the effect under certain conditions:
- `load` - perform the effect when the element appears in the document
- `viewport` - perform the effect when the element appears in the viewport
- `attribute` - perform the effect when the element attribute(s) changed
- `children` - perform the effect when the element children changed (add or remove)
- `data` - perform the effect when the element text content was changed

```javascript
import { useEffect, USE_EFFECT_EVENTS } from "@olton/hooks"

useEffect({
    target: "#btn",
    event: USE_EFFECT_EVENTS.LOAD,
    effect: (target) => console.log(`Element added to document`)
})

useEffect({
    target: "#btn",
    event: USE_EFFECT_EVENTS.VIEWPORT,
    effect: (target) => console.log(`Element showing in viewport`)
})

useEffect({
    target: "#btn",
    root: "#root-element",
    event: USE_EFFECT_EVENTS.VIEWPORT,
    effect: (target) => console.log(`Element showing in root element`)
})

useEffect({
    target: "#btn",
    event: USE_EFFECT_EVENTS.ATTRIBUTE,
    effect: (target, attribute, value) => console.log(`Attribute changed in Element`)
})

useEffect({
    target: "#btn",
    event: USE_EFFECT_EVENTS.CHILDREN,
    effect: (target, addedNodes, removedNodes) => console.log(`Element children changed`)
})

useEffect({
    target: "#btn",
    event: USE_EFFECT_EVENTS.DATA,
    effect: (target, textContent) => console.log(`Element text content was changed`)
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