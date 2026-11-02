---
title: 'Modules and packages'
order: 5
description: 'Create a small importable package and understand the import details that help avoid common pitfalls.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Import a module

A module is a `.py` file containing Python definitions and statements. Importing the module lets you use its names through the module name:

```python
import statistics

scores = [7, 9, 10]
print(statistics.mean(scores))
```

This form makes it clear where `mean` comes from. You can import selected names with `from statistics import mean`, but avoid `from module import *` in application code because it can make names unclear.

## Create a custom package

For a small project, a package is a directory that groups related Python modules. A regular package includes an `__init__.py` file. It can be empty, or it can expose a convenient public interface:

```text
my_project/
    app.py
    greetings/
        __init__.py
        messages.py
```

Put reusable code in the module:

```python
# greetings/messages.py
def greet(name):
    return f"Hello, {name}!"
```

The initializer can re-export the function using a package-relative import:

```python
# greetings/__init__.py
from .messages import greet
```

Now code at the project root can import it through the package:

```python
# app.py
from greetings import greet

def main():
    print(greet("Ada"))


if __name__ == "__main__":
    main()
```

Run `app.py` from the `my_project` directory with `python app.py`. The `if __name__ == "__main__":` guard means `main()` runs when the file is executed as a script, but not simply because another module imports it. Import statements use package and module names, not filenames with `.py`.

## Import details worth remembering

- When Python imports a module, it executes that module's top-level statements the first time in a process, then reuses the loaded module on later imports. Keep top-level code focused on definitions and setup; put actions such as starting an application inside a function.
- Python searches configured import locations, including the script directory or current directory in common launch modes. Run this example from the project root so Python can find `greetings`. Avoid naming your files after standard-library modules such as `statistics.py`, which can shadow the real module.
- A relative import such as `from .messages import greet` is intended for code imported as part of a package. Running `messages.py` directly does not give it the same package context; run the top-level application or use Python's `-m` option for package modules instead.
- An importable package inside your project is not automatically a distributable project. Sharing or publishing it for installation requires packaging metadata and a build configuration, which the [Python Packaging User Guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/) covers separately.

The [LearnPython.org module lesson](https://www.learnpython.org/en/Modules_and_Packages) also demonstrates importing project files and the `__main__` guard. Its examples of manually extending `sys.path` or using `PYTHONPATH` are advanced escape hatches, not the normal first choice for organizing a project; prefer a clear project layout and supported package installation.

**Exercise:** Create the `greetings` package above, add a second function in `messages.py`, and import it from `app.py`. Then import `greetings` from a Python interpreter launched in the project root and confirm that importing it does not print the greeting.

**Sources:** [Python Tutorial: Modules](https://docs.python.org/3/tutorial/modules.html), [LearnPython.org: Modules and Packages](https://www.learnpython.org/en/Modules_and_Packages), [Python Packaging User Guide: Packaging Python Projects](https://packaging.python.org/en/latest/tutorials/packaging-projects/), [Google’s Python Class: Introduction](https://developers.google.com/edu/python/introduction)
