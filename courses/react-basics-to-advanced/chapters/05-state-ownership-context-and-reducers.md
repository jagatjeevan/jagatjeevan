---
title: 'State ownership, context, and reducers'
order: 5
description: 'Place state near its users, share it deliberately, and model complex transitions with a reducer.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## Keep state close to where it is used

Start with the component that needs a value. If sibling components need the same state, move it to their nearest common parent and pass the value and event handlers as props. This is called lifting state up. Avoid duplicating a value in multiple places when one source of truth will do.

## Context is for shared values

Context lets a parent provide a value to descendants without threading it through every intermediate component. It can help with values such as the current theme or signed-in user. It is not automatically a better replacement for props: keep simple, local data local.

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

## Reducers make transitions explicit

When several actions update related state, use a reducer to define the transition from current state and action to next state:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'added':
      return [...state, action.task];
    case 'removed':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
}
```

Reducers should be pure and return new values. Do not use context or a reducer solely to make a small component appear more abstract.

**Exercise:** Add a filter to the task list. Decide which component owns the filter and which components need to read it. Use a reducer only if the set of transitions benefits from being centralized.
