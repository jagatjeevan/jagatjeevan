---
title: 'Modules and packages'
order: 5
description: 'Import standard-library and project code without putting an entire program in one file.'
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

## Organize your own code

Put reusable definitions in one file and import them in another:

```text
project/
    app.py
    greetings.py
```

```python
# greetings.py
def greet(name):
    return f"Hello, {name}!"
```

```python
# app.py
from greetings import greet

print(greet("Ada"))
```

A package groups related modules under a package name. Python's import system supports regular packages and namespace packages; for a beginner project, follow the package layout and instructions of the tool or library you are using. Keep importable modules focused and avoid doing unrelated work at import time.

**Exercise:** Create a `math_helpers.py` file with a function that doubles a number. Import and call it from `main.py`.

**Sources:** [Python Tutorial: Modules](https://docs.python.org/3/tutorial/modules.html), [LearnPython.org: Modules and Packages](https://www.learnpython.org/en/Modules_and_Packages), [Google’s Python Class: Introduction](https://developers.google.com/edu/python/introduction)
