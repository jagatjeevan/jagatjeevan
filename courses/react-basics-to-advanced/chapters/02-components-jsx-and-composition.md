---
title: 'Components, JSX, and composition'
order: 2
description: 'Break a page into cohesive components and compose them through JSX.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## JSX describes UI

JSX is syntax that lets JavaScript describe a tree of UI elements. It is not a string of HTML. Use curly braces to insert JavaScript expressions, and remember that JSX attributes use JavaScript naming such as `className`.

```jsx
function ProfileCard() {
  const name = 'Ada';
  return (
    <article className="profile-card">
      <h2>{name}</h2>
      <p>Engineer and mathematician</p>
    </article>
  );
}
```

Components begin with a capital letter, can use other components, and should be small enough to explain in a sentence. A useful boundary often corresponds to a visual or behavioral responsibility, not every individual HTML tag.

## Compose instead of building giant components

Pass a nested UI through the `children` prop when a component owns layout or behavior but not the content:

```jsx
function Panel({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return <Panel title="Getting started"><p>Build one piece at a time.</p></Panel>;
}
```

Keep components focused. Avoid a single component that owns unrelated page sections, fetching, form state, and formatting. Extract a component when it clarifies a responsibility or can be reused—not just to reduce line count.

## Exercise

Create `PageHeader`, `ProfileCard`, and `Panel` components. Compose them in `App`. Add a prop to `ProfileCard` and render two profiles with different values.
