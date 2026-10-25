---
title: 'Custom hooks and server state'
order: 7
description: 'Reuse stateful behavior with hooks and distinguish remote server data from local UI state.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## Custom hooks share behavior

A custom hook is a function whose name starts with `use` and that can call other hooks. It can package reusable behavior, not a separate component instance or shared state by itself.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
}
```

Call hooks at the top level of components or other hooks, not in conditions or loops. Extract a hook when it makes behavior easier to reuse or reason about.

## Server state has different needs

UI state such as an open menu is usually local and short-lived. Server state is remote, asynchronous, can become stale, and may be shared by many views. A data-fetching library can manage caching, invalidation, retries, and background refreshes—but adds a dependency and concepts to learn.

This portfolio has an existing article introducing [React Query](/blogs/react-query). Use the official TanStack Query documentation in the course references for current setup instructions.

**Exercise:** Extract the resize listener into a custom hook. Then identify which values in a sample app are local UI state and which are server state.
