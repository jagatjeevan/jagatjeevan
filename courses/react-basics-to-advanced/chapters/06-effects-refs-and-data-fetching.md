---
title: 'Effects, refs, and data fetching'
order: 6
description: 'Synchronize with external systems when needed, and represent asynchronous UI states explicitly.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## Effects synchronize with external systems

An effect runs after rendering to synchronize with something outside React: a browser API, subscription, or network connection. Most calculations based on props or state do not need an effect; calculate them during render instead.

```jsx
useEffect(() => {
  document.title = `Tasks: ${tasks.length}`;
}, [tasks.length]);
```

If an effect creates a subscription, timer, or listener, return a cleanup function. Dependencies describe the reactive values the effect reads. Do not silence dependency problems with an empty array; restructure the effect or include the required dependencies.

## Refs hold non-rendering values

A ref can retain a value between renders without triggering a render when it changes. DOM refs are useful for focus, measurement, and integrations with imperative APIs. If a value should change the visible UI, it usually belongs in state, not a ref.

## Fetching requires UI states and cleanup

When fetching manually, model loading, success, and error states. Prevent an obsolete response from updating the UI after the request or component is no longer current. Framework data APIs or server-state libraries may provide a better solution for caching, retries, and synchronization.

```jsx
useEffect(() => {
  const controller = new AbortController();
  setStatus('loading');

  fetch('/api/items', { signal: controller.signal })
    .then((response) => {
      if (!response.ok) throw new Error('Request failed');
      return response.json();
    })
    .then((items) => {
      setItems(items);
      setStatus('success');
    })
    .catch((error) => {
      if (error.name !== 'AbortError') setStatus('error');
    });

  return () => controller.abort();
}, []);
```

**Exercise:** Show loading, error, empty, and populated states. Then compare this small example with a framework's built-in data-loading approach.
