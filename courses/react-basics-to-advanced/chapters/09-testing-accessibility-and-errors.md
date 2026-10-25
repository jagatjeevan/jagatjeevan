---
title: 'Testing, accessibility, and errors'
order: 9
description: 'Test meaningful behavior, use semantic HTML, and make failures understandable to users.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## Test behavior users rely on

Prefer tests that interact with the interface the way a user does: find a labeled input, type, submit, and verify the visible result. Avoid making every test depend on internal component state or implementation details.

```jsx
render(<NameForm />);
await user.type(screen.getByRole('textbox', { name: /name/i }), 'Ada');
await user.click(screen.getByRole('button', { name: /save/i }));
expect(screen.getByText('Saved Ada')).toBeInTheDocument();
```

The example uses Testing Library concepts. This portfolio already has an article about [React Testing Library](/blogs/react-testing-library).

## Accessibility is part of implementation

Use semantic elements, visible labels, keyboard-operable controls, meaningful link text, and clear status/error messages. Do not use a clickable `div` when a button is the appropriate control. Ensure focus remains visible and color is not the only way to communicate meaning.

## Errors should be visible and recoverable

Show a useful message when an action fails and, when appropriate, allow the user to retry. Error boundaries can catch rendering errors in descendant components; they do not replace handling rejected network requests or form validation.

**Exercise:** Add a test for a failed submission and check that the error is associated with the relevant form control and announced accessibly.
