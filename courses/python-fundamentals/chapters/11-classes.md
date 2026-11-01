---
title: 'Classes and objects'
order: 11
description: 'Bundle related data and behavior in a class when a program benefits from its own object type.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Define a class

A class defines a kind of object. Calling the class creates an instance; `__init__` initializes that instance, and methods describe behavior:

```python
class Counter:
    def __init__(self, start=0):
        self.value = start

    def increment(self):
        self.value += 1

counter = Counter()
counter.increment()
print(counter.value)
```

`self` refers to the instance receiving the method call. Each `Counter` instance has its own `value`.

## When to use a class

Use a class when a concept has data and operations that belong together, such as a counter or a bank account. A few related functions may be simpler if they do not need shared per-instance state. Start with the simplest representation that makes the program clear.

**Exercise:** Create a `Book` class initialized with a title and author. Add a method that returns a readable description, then create two instances.

**Sources:** [Python Tutorial: Classes](https://docs.python.org/3/tutorial/classes.html), [LearnPython.org: Classes and Objects](https://www.learnpython.org/en/Classes_and_Objects)
