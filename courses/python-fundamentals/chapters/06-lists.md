---
title: 'Lists'
order: 6
description: 'Store ordered collections, access items, and use common list operations.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Make and use a list

Lists hold ordered items. Indexing starts at `0`; negative indexes count from the end. Use `append()` to add an item:

```python
shopping = ["tea", "rice"]
shopping.append("apples")

print(shopping[0])
print(shopping[-1])
print(len(shopping))
```

Lists can contain values of different types, though a list with one clear purpose is usually easier to work with. Assignment does not copy a list:

```python
first = ["red", "blue"]
second = first
second.append("green")
print(first)  # The same list was changed.
```

Use `first.copy()` or `first[:]` for a shallow copy when that is what you need. A shallow copy does not recursively copy nested objects.

## Iterate through items

Use `for item in items` when you need values rather than positions. Use slicing such as `items[:2]` to create a shallow list containing part of the sequence.

**Exercise:** Build a list of three favorite foods, add a fourth, and print each item with a loop.

**Sources:** [Python Tutorial: Data Structures](https://docs.python.org/3/tutorial/datastructures.html), [LearnPython.org: Lists](https://www.learnpython.org/en/Lists), [Google’s Python Class: Lists](https://developers.google.com/edu/python/lists)
