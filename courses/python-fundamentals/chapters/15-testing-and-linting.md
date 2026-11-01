---
title: 'Test and lint your code'
order: 15
description: 'Check behavior with unittest and improve code consistency with a linter and formatter.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Write a small test

Tests check that code behaves as expected and help catch regressions when it changes:

```python
# calculator.py
def add(left, right):
    return left + right
```

```python
# test_calculator.py
import unittest

from calculator import add


class AddTests(unittest.TestCase):
    def test_adds_two_numbers(self):
        self.assertEqual(add(2, 3), 5)


if __name__ == "__main__":
    unittest.main()
```

Run the test from the project directory with `python -m unittest`. A useful test checks a specific expected behavior, including important edge cases.

## Run a linter and formatter

A linter reports code patterns that may be errors or inconsistent with the project's rules. A formatter applies consistent layout. [Ruff](https://docs.astral.sh/ruff/) can provide both tools:

```bash
python -m pip install ruff
ruff check .
ruff format --check .
```

The first command installs Ruff in the active environment. `ruff check` reports lint findings; `ruff format --check` checks formatting without changing files. Run `ruff format .` when you want it to apply formatting. Projects can configure tools differently, so follow the repository's existing settings.

Linting does not prove a program is correct, and passing tests do not guarantee that all bugs are absent. Use both as feedback alongside reading and exercising the code.

**Exercise:** Add a test for a second input to `add`, run the test suite, then intentionally break the implementation and confirm the test fails. Run Ruff on the project and resolve one finding.

**Sources:** [Python `unittest` documentation](https://docs.python.org/3/library/unittest.html), [PEP 8: Style Guide for Python Code](https://peps.python.org/pep-0008/), [Ruff documentation](https://docs.astral.sh/ruff/)
