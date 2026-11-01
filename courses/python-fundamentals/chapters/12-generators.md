---
title: 'Generators'
order: 12
description: 'Produce values one at a time with yield instead of building every result up front.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Yield values as needed

A function containing `yield` is a generator function. Calling it creates a generator; each iteration resumes the function until it yields the next value or finishes:

```python
def countdown(start):
    while start > 0:
        yield start
        start -= 1

for number in countdown(3):
    print(number)
```

This produces `3`, `2`, and `1` as the loop asks for them. A generator is useful when values can be produced incrementally, especially when the full sequence is not needed at once. It is also consumed as it is iterated; create a new generator if you need to repeat the computation.

## Generator expression

For a short transformation, a generator expression looks like a comprehension in parentheses:

```python
squares = (number * number for number in range(4))
print(sum(squares))
```

`sum` consumes the values from the generator. Contrast this with a list comprehension, which creates a list immediately.

**Exercise:** Write a generator that yields the first `n` multiples of a number. Try summing its output without converting it to a list.

**Sources:** [Python Tutorial: Iterators](https://docs.python.org/3/howto/functional.html#iterators), [LearnPython.org: Generators](https://www.learnpython.org/en/Generators)
