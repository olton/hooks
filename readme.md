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
