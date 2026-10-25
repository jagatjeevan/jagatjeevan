---
title: 'State, events, and forms'
order: 4
description: 'Model changing UI with state and respond to user actions without mutating data.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## State remembers information between renders

Use a state hook for values that change over time and affect what the component displays. Calling the setter requests another render. Do not assign directly to a state variable or mutate an object held in state.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((current) => current + 1)}>Count: {count}</button>;
}
```

The updater function is useful when the next value depends on the previous one. For objects, create a new object with the changed fields rather than editing the old one in place.

## Events and controlled forms

Pass a function to event props such as `onClick` or `onChange`. For a controlled input, the displayed value comes from state and each change updates that state:

```jsx
function NameForm() {
  const [name, setName] = useState('');
  return (
    <label>
      Name
      <input value={name} onChange={(event) => setName(event.target.value)} />
    </label>
  );
}
```

Use a real `<form>` and handle its `onSubmit` for form submission. Validate user input, communicate errors in text, and use labels so controls are usable with assistive technology.

## Exercise

Build a short task list. Add a task through a form, clear the input after submission, and remove a task by its stable ID. Keep the array immutable when adding or removing items.
