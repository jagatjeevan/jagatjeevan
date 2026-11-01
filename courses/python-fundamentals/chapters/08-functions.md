---
title: 'Functions'
order: 8
description: 'Define reusable behavior with parameters, return values, and docstrings.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Define a function

Functions give a useful piece of behavior a name. Parameters receive values from the caller, and `return` sends a result back:

```python
def area(width, height):
    """Return the area of a rectangle."""
    return width * height

print(area(4, 3))
```

Calling a function runs its body. A function that reaches the end without `return` produces `None`; printing inside a function is not the same as returning a value.

Default values can make an argument optional:

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

Keep a function focused on one task, choose descriptive names, and document non-obvious expectations. These habits make functions easier to reuse and test.

**Exercise:** Write `is_even(number)` that returns `True` for even integers and `False` otherwise. Call it with at least two values.

**Sources:** [Python Tutorial: Defining Functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions), [LearnPython.org: Functions](https://www.learnpython.org/en/Functions), [Google’s Python Class: Introduction](https://developers.google.com/edu/python/introduction)
