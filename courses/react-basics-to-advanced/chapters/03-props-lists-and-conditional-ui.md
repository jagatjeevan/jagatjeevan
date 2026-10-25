---
title: 'Props, lists, and conditional UI'
order: 3
description: 'Pass data into components and render collections and alternate states predictably.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## Props are inputs

Props are read-only values supplied by a parent. They let a component be reused with different data. Do not mutate props; if a value needs to change in response to user interaction, identify the component that should own that state.

```jsx
function Topic({ name, level }) {
  return <li>{name} — {level}</li>;
}
```

## Render a collection

Use `map` to turn data into elements. Give each sibling a stable key that identifies the item across updates. Keys help React associate each item with its previous instance; an array index is a poor key when items can be inserted, deleted, or reordered.

```jsx
const topics = [
  { id: 'state', name: 'State', level: 'core' },
  { id: 'effects', name: 'Effects', level: 'advanced' },
];

function TopicList() {
  return (
    <ul>
      {topics.map((topic) => (
        <Topic key={topic.id} name={topic.name} level={topic.level} />
      ))}
    </ul>
  );
}
```

## Conditional UI

Use ordinary JavaScript expressions for loading, empty, error, and success states. Decide what a user should see in each state instead of rendering a blank area when data is missing.

```jsx
function Results({ items, isLoading }) {
  if (isLoading) return <p>Loading results…</p>;
  if (items.length === 0) return <p>No results yet.</p>;
  return <ul>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

**Exercise:** Render a list of learning goals, add an empty state, then reorder or remove an item. Verify that keys use stable item IDs.
