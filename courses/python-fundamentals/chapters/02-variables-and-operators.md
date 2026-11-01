---
title: 'Variables and arithmetic order'
order: 2
description: 'Name values, work with basic types, and understand Python operator precedence.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Names and values

Assignment binds a name to a value. Python values have types such as `int`, `float`, `str`, and `bool`:

```python
items = 3
unit_price = 2.5
label = "notebook"
in_stock = True

total = items * unit_price
print(f"{items} {label}s cost {total}")
```

Use descriptive names and remember that `=` assigns, while `==` compares two values.

## BODMAS, PEMDAS, and Python

BODMAS and PEMDAS are memory aids for arithmetic order; they are not Python syntax. Python follows its own documented precedence. For the arithmetic covered here:

1. Parentheses group an expression.
2. Exponentiation (`**`) binds more tightly than multiplication and addition.
3. Multiplication (`*`), division (`/`), floor division (`//`), and remainder (`%`) share a precedence level and evaluate left to right.
4. Addition (`+`) and subtraction (`-`) share a lower precedence level and evaluate left to right.

For example:

```python
print(2 + 3 * 4)      # 14
print((2 + 3) * 4)    # 20
print(20 / 5 * 2)     # 8.0: same precedence, left to right
```

Use parentheses when they make your intent clearer, even if precedence already determines the result. See the [operator precedence reference](https://docs.python.org/3/reference/expressions.html#operator-precedence) for the complete table.

**Exercise:** Predict the result of `18 - 2 * 3 ** 2`, then verify it in Python. Add parentheses to make a different order explicit.

**Sources:** [Python Tutorial: An Informal Introduction](https://docs.python.org/3/tutorial/introduction.html), [Python expression reference: Operator precedence](https://docs.python.org/3/reference/expressions.html#operator-precedence), [LearnPython.org: Variables and Types](https://www.learnpython.org/en/Variables_and_Types)
