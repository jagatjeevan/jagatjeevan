---
title: 'Performance and rendering'
order: 8
description: 'Measure first, then choose targeted optimizations for expensive rendering work.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## Start with a measurement

An additional memoization layer can make code harder to understand and may not improve the experience. First reproduce a user-visible slowdown and use browser tools or React Developer Tools to find the expensive work.

Common sources include rendering a very large list, repeated expensive calculations, unnecessary state placed too high in the tree, and network or image loading—not just component render count.

## Keep updates focused

State location influences how much of the component tree must respond to an update. Keep state near the components that use it. For large collections, consider pagination or virtualization. For expensive calculations, consider memoization after measuring.

```jsx
const visibleItems = useMemo(
  () => items.filter((item) => item.name.includes(query)),
  [items, query],
);
```

`useMemo` caches a calculation between renders when its dependencies are unchanged. It is an optimization, not a correctness mechanism. `memo` and `useCallback` are also tools to apply based on a measured need, not defaults for every component and function.

**Exercise:** Render a large list, profile it, and compare a straightforward implementation with a measured optimization. Record the user-visible improvement, if any.
