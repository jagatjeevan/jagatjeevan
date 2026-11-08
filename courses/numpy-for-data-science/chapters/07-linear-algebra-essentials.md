---
title: 'Linear algebra essentials'
order: 7
description: 'Distinguish element-wise operations from matrix products and solve a small linear system.'
---

## Element-wise multiplication is not a matrix product

The `*` operator multiplies corresponding elements when shapes are compatible. Use `@` for a matrix product:

```python
weights = np.array([[1.0, 2.0],
                    [3.0, 4.0]])
inputs = np.array([10.0, 20.0])

print(weights * 2)  # scales every element
print(weights @ inputs)  # one weighted sum per row: [50. 110.]
```

The inner dimensions must match for matrix multiplication. Here `(2, 2) @ (2,)` produces `(2,)`. Inspect shapes whenever a product raises an error or returns an unexpected shape.

## Solve a small linear system

`np.linalg.solve(A, b)` solves `A @ x = b` when `A` is square and full rank:

```python
coefficients = np.array([[1.0, 2.0],
                         [3.0, 5.0]])
observations = np.array([1.0, 2.0])

solution = np.linalg.solve(coefficients, observations)
print(solution)  # [-1.  1.]
print(np.allclose(coefficients @ solution, observations))  # True
```

If `A` is singular or not square, `solve` is not the appropriate tool; NumPy documents `np.linalg.lstsq` for least-squares problems. For broader scientific linear algebra features, the official NumPy docs point to SciPy.

**Exercise:** Create a 2-by-2 coefficient array and a two-value right-hand side. Solve it, then substitute the result back into `A @ x` and verify with `np.allclose`.

**Sources:** [NumPy linear algebra](https://numpy.org/doc/stable/reference/routines.linalg.html), [numpy.linalg.solve](https://numpy.org/doc/stable/reference/generated/numpy.linalg.solve.html)
