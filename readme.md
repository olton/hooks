# Hooks
The sets of hooks

Current implemented:

+ [x] [useState()](#usestate)
+ [x] [useEvent()](#useevent)
+ [x] [useEffect()](#useffect)

## Using

### Direct into browser
```html
<script src="https://cdn.jsdelivr.net/gh/olton/hooks/lib/hooks.js"></script>
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
<button id="btn">Clicks (0)</button>
```

```javascript
import { useState } from "@olton/hooks"

const [state, setState] = useState(0)
const button = document.querySelector("#btn")
button.addEventListener("click", (e) => {
    setState( state() + 1 )
    e.target.textContent = `Clicks (${state()})`
})
```

```javascript
import { useState } from "@olton/hooks"

const onStateChange = ({prop, oldVal, newVal}) => {
    console.log("ku")
}

const [state, setState] = useState(0, onStateChange)
const button = document.querySelector("#btn")
button.addEventListener("click", (e) => {
    setState( state() + 1 )
    e.target.textContent = `Clicks (${state()})`
})
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