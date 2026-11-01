---
title: 'Loops'
order: 7
description: 'Repeat actions with for and while loops and control when iteration ends.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Use `for` to visit items

A `for` loop visits values from an iterable, such as a list, string, or `range`:

```python
for number in range(1, 4):
    print(number)
```

The stop value in `range(start, stop)` is excluded. Use `enumerate(items)` when you need both each position and its item:

```python
for index, color in enumerate(["red", "blue"]):
    print(index, color)
```

## Use `while` for a condition

A `while` loop repeats as long as its condition is true. Make sure its body can change the condition or exit with `break`:

```python
remaining = 3
while remaining > 0:
    print(remaining)
    remaining -= 1
```

`break` exits the nearest loop. `continue` skips the rest of the current iteration and proceeds to the next. Prefer a direct `for` loop for ordinary collection processing; it avoids manually managing an index.

**Exercise:** Print only the even numbers in a list. Then modify the loop to stop when it reaches a chosen sentinel value.

**Sources:** [Python Tutorial: for Statements and range](https://docs.python.org/3/tutorial/controlflow.html#for-statements), [LearnPython.org: Loops](https://www.learnpython.org/en/Loops), [Google’s Python Class: Lists](https://developers.google.com/edu/python/lists)
