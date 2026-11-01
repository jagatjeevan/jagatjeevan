---
title: 'Scope and where names live'
order: 10
description: 'Understand local and outer names and avoid surprising changes to global state.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## A function has local names

A name assigned inside a function is local to that function unless declared otherwise:

```python
def describe():
    message = "This name is local."
    return message

print(describe())
```

The name `message` is not automatically available outside the function. Parameters are local names too.

## Look outward carefully

When Python looks up a name in a function, it searches the local scope and then enclosing function scopes, the module's global scope, and built-ins. This is commonly summarized as LEGB: Local, Enclosing, Global, Built-in.

```python
label = "module"

def show_label():
    label = "local"
    print(label)

show_label()     # local
print(label)     # module
```

The local assignment does not replace the module-level value. `global` and `nonlocal` can rebind names in outer scopes, but returning a value or passing it as an argument is often easier to reason about:

```python
def make_label(prefix, name):
    return f"{prefix}: {name}"
```

**Exercise:** Create an outer variable and a function with a local variable of the same name. Predict both printed values before running the code.

**Sources:** [Python execution model: Resolution of names](https://docs.python.org/3/reference/executionmodel.html#resolution-of-names), [Python Tutorial: Scopes and Namespaces](https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces)
