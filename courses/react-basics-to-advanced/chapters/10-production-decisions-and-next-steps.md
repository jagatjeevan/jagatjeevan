---
title: 'Production decisions and next steps'
order: 10
description: 'Choose architecture and framework features based on product needs, then plan what to learn next.'
tryItUrl: 'https://codesandbox.io/s/new?template=react'
---

## React is part of a larger system

Production applications also need routing, data loading, forms, accessibility, error reporting, security, deployment, and performance budgets. React itself does not prescribe every decision. A framework may provide routing, server rendering, static generation, and data conventions; a smaller client-only app may not need that complexity.

Choose based on the product and team: rendering needs, accessibility expectations, hosting constraints, data sources, performance, and maintenance. Understand the trade-offs before adding a state library, design system, or abstraction.

## Review the course concepts

- Components describe UI from their inputs; rendering stays pure.
- Props pass data down, while state belongs at the lowest common owner that needs it.
- Effects synchronize with external systems; they are not a general-purpose place for derived values.
- Server state has caching and consistency concerns beyond local UI state.
- Tests should protect user-visible behavior, and semantic HTML improves both accessibility and testability.
- Measure performance before adding optimizations.

## Next steps

Choose a small project and make it complete: define the user problem, sketch the UI, model state, implement loading and error cases, test key flows, and deploy it. Revisit the course references for current APIs and framework-specific guidance. The [course reference list](/courses/react-basics-to-advanced#references) is a good starting point.

**Final exercise:** Build a searchable, accessible list backed by remote data. Include loading, empty, error, and success states; test a core user flow; then profile it before deciding whether any optimization is needed.
