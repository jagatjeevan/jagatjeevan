---
title: 'The React mental model'
order: 1
description: 'Understand declarative UI, rendering, and the component tree before writing application code.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## What React does

React is a JavaScript library for describing user interfaces as a tree of components. A component receives inputs, commonly called props, and may read state. It returns a description of what should appear. When relevant inputs change, React renders again and updates the affected parts of the page.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

The component is a function. Its return value describes the UI; React handles creating and updating the DOM. This is a declarative approach: describe the result for the current data instead of manually issuing DOM commands for every change.

## Render is not the same as mount

A render means React calls components to calculate the next UI. It does not necessarily mean every DOM node is recreated. React compares the new description with the current one and commits the necessary changes. Rendering should therefore be pure: for the same props and state, return the same UI and do not mutate external data.

```jsx
function CounterLabel({ count }) {
  return <p>You clicked {count} times.</p>;
}
```

Avoid changing a global variable, making a network request, or modifying the DOM while rendering. Those actions belong in event handlers or, when appropriate, an effect.

## Try it

Start with a small React app in the linked sandbox. Make a `Greeting` component, render it from `App`, and change the name prop. Notice that changing data changes the description React renders.

**Exercise:** Add a second component that displays a short list of favorite topics. Keep its output a pure function of its props.

**Check your understanding:** What should a component return for the same props and state? What kinds of work should not happen during render?
