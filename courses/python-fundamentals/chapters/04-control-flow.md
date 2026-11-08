---
title: 'Control flow: conditions and conditional expressions'
order: 4
description: 'Make decisions using if/elif/else, comparisons, and Python conditional expressions.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Choose which block runs

An `if` statement evaluates a condition and runs its indented body when that condition is true. `elif` adds another branch, and `else` handles the remaining case:

```python
score = 82

if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "Keep practicing"
```

Comparisons include `==`, `!=`, `<`, `<=`, `>`, and `>=`. Combine conditions with `and`, `or`, and `not`. Python uses indentation to mark blocks, so keep the indentation consistent.

![A decision diagram showing if, elif, and else branches](/courses/python-fundamentals/diagrams/condition-branches.svg)

## Conditional expression

For a short choice that produces one value, Python has a conditional expression:

```python
status = "adult" if age >= 18 else "minor"
```

Read this as “use `adult` if the condition is true, otherwise use `minor`.” Prefer a normal `if` block when the branches are long or nested; clarity matters more than shortening a line.

**Exercise:** Set a `temperature` value and assign `"cold"`, `"mild"`, or `"warm"` using `if`/`elif`/`else`. Try a conditional expression for a separate yes/no label.

**Sources:** [Python Tutorial: if Statements](https://docs.python.org/3/tutorial/controlflow.html#if-statements), [LearnPython.org: Conditions](https://www.learnpython.org/en/Conditions)
