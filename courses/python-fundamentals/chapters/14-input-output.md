---
title: 'Input and output'
order: 14
description: 'Read user input and text files, and write output safely with clear encoding.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Console input and output

`input()` reads a line of text and returns a string. Convert it when the program needs another type:

```python
raw_age = input("Age: ")
age = int(raw_age)
print(f"Next year you will be {age + 1}.")
```

If a user may enter invalid text, handle the expected `ValueError` as described in [Errors You Will Encounter](./03-errors-encountered).

## Read and write files

Use a `with` statement so a file is closed when the block finishes. Specify an encoding when working with text:

```python
from pathlib import Path

path = Path("notes.txt")
path.write_text("First note\n", encoding="utf-8")
contents = path.read_text(encoding="utf-8")
print(contents)
```

This overwrites the file when writing. Check the documentation and choose a suitable mode if you need to append rather than replace. File paths are interpreted relative to the process's current working directory unless you provide another path.

Real file operations can fail—for example, if the file is absent or access is denied. Handle specific expected exceptions and avoid silently treating a failed read as successful.

**Exercise:** Ask for a short note, write it to a text file, read it back, and print it. Try a path where you do not have write permission and inspect the error.

**Sources:** [Python Tutorial: Input and Output](https://docs.python.org/3/tutorial/inputoutput.html), [Python built-in functions: `input`, `open`, and `print`](https://docs.python.org/3/library/functions.html), [Python `pathlib`](https://docs.python.org/3/library/pathlib.html)
