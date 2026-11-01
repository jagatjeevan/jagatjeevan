---
title: 'Introduction, links, and a quick reference'
order: 1
description: 'Know where to continue learning and keep a small reference to useful built-ins close at hand.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## A few useful learning links

- [Python documentation](https://www.python.org/doc/) is the official entry point to tutorials, language references, and library documentation.
- [The Python Tutorial](https://docs.python.org/3/tutorial/) is an authoritative guide, written for readers who already have some programming experience.
- [LearnPython.org](https://www.learnpython.org/) offers interactive lessons and exercises.
- [Google’s Python Class](https://developers.google.com/edu/python) includes written lessons and exercises and assumes some prior programming experience.
- [Built-in functions](https://docs.python.org/3/library/functions.html) is the complete reference for functions available without an import.

## Mini cheat sheet

| Need | Example |
| --- | --- |
| Display a value | `print("Hello")` |
| Read a line of text | `name = input("Name: ")` |
| Convert a value | `int("42")`, `float("3.5")`, `str(42)` |
| Count items | `len(["a", "b"])` |
| Iterate over a range | `range(5)` produces `0` through `4` |
| Add numeric items | `sum([2, 3, 4])` |
| Find an extreme | `min([2, 3, 4])`, `max([2, 3, 4])` |
| Sort values | `sorted([3, 1, 2])` returns a new sorted list |

These are built-in functions, so they do not need an `import`. Check the linked reference for their full behavior and options.

## Run a first example

```python
name = input("What is your name? ")
print(f"Hello, {name}!")
```

You can try the example in a browser-based Python REPL:

- [Programiz Online Python Compiler](https://www.programiz.com/python-programming/online-compiler/)
- [OnlineGDB Python Compiler](https://www.onlinegdb.com/online_python_compiler)
- [Online Python](https://www.online-python.com/)

Or save it as `hello.py` and run it locally with `python hello.py` or `python3 hello.py`, depending on how Python is named on your system. Online tools are handy for short examples; use your local development environment for exercises that need local files, installed packages, or project setup.

**Exercise:** Choose three built-ins from the table and try each with a different value. What happens if you pass `input()` text such as `"42"` to `int()`?

**Sources:** [Python documentation](https://www.python.org/doc/), [Python built-in functions](https://docs.python.org/3/library/functions.html), [LearnPython.org](https://www.learnpython.org/), [Google’s Python Class](https://developers.google.com/edu/python), [Programiz Online Python Compiler](https://www.programiz.com/python-programming/online-compiler/), [OnlineGDB Python Compiler](https://www.onlinegdb.com/online_python_compiler), [Online Python](https://www.online-python.com/)
