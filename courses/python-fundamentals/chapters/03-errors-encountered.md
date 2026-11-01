---
title: 'Errors you will encounter'
order: 3
description: 'Read Python error messages and recognize common syntax and runtime failures.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Two useful categories

A `SyntaxError` means Python could not parse the code, often because of a missing colon, unmatched quote, or indentation problem. An exception occurs while otherwise valid code is running.

| Error | Common beginner cause |
| --- | --- |
| `NameError` | Using a name that has not been defined, or using the wrong spelling/capitalization |
| `TypeError` | Applying an operation to incompatible types, such as `"2" + 2` |
| `ValueError` | A value has the right general type but cannot be converted, such as `int("two")` |
| `IndexError` | Reading a sequence position that does not exist |
| `KeyError` | Looking up a dictionary key that is absent |
| `ZeroDivisionError` | Dividing a number by zero |

## Read the traceback

When an exception is unhandled, Python prints a traceback. Read from the bottom upward: the last line names the exception and summarizes the problem; the lines above show where the calls happened.

```python
count = int("many")
```

This raises `ValueError`, because `"many"` cannot be converted to an integer. The problem is different from a `TypeError`, which would indicate an operation was used with an unsuitable type.

When a program should recover from a known failure, handle the specific exception:

```python
try:
    count = int(input("How many? "))
except ValueError:
    print("Enter a whole number.")
```

Do not hide unknown problems by catching every exception indiscriminately. A traceback is useful evidence when debugging.

**Exercise:** Run `int("many")`, `[1, 2][5]`, and `10 / 0` separately. Note the exception type and identify the expression that caused each one.

**Sources:** [Python Tutorial: Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html), [LearnPython.org: Exception Handling](https://www.learnpython.org/en/Exception_Handling)
