---
title: 'Vectorized operations and broadcasting'
order: 4
description: 'Apply element-wise calculations to whole arrays and use compatible shapes without writing Python loops.'
---

## Vectorize element-wise calculations

NumPy arithmetic and many functions operate element by element over an array. This style is called vectorization; it expresses the calculation on the whole array instead of writing a Python loop for every value:

```python
readings = np.array([18.0, 20.5, 23.0])
fahrenheit = readings * 9 / 5 + 32

print(fahrenheit)  # [64.4 68.9 73.4]
print(np.round(fahrenheit))  # [64. 69. 73.]
```

Universal functions, or ufuncs, include operations such as `np.sqrt`, `np.exp`, and `np.add`. Comparisons are element-wise too:

```python
values = np.array([1.0, 4.0, 9.0])
print(np.sqrt(values))       # [1. 2. 3.]
print(np.isfinite(values))   # [ True  True  True]
```

Common element-wise functions:

- `np.add`, `np.subtract`, `np.multiply`, `np.divide`: arithmetic counterparts of `+`, `-`, `*`, `/`.
- `np.mod`, `np.power`: counterparts of `%` and `**`.
- `np.reciprocal`: element-wise reciprocals; use a floating dtype when fractional results are expected.
- `np.square`, `np.sqrt`: square and square-root each value.
- `np.sin`, `np.cos`: trigonometric functions; inputs are in radians.

For numeric arrays, `*` means element-wise multiplication, not matrix multiplication:

```python
left = np.array([1, 2, 3])
right = np.array([10, 20, 30])
print(left * right)  # [10 40 90]
```

## Let shapes broadcast

Broadcasting lets operations combine shapes when their dimensions are compatible. Compare shapes from the right: dimensions must be equal, or one of them must be `1`. A missing leading dimension behaves like `1`.

```python
observations = np.array([[10.0, 20.0, 30.0],
                         [12.0, 18.0, 27.0]])
offsets = np.array([1.0, 2.0, 3.0])

adjusted = observations + offsets
print(adjusted.shape)  # (2, 3)
print(adjusted)
```

The one-dimensional `offsets` array aligns with the final axis, so each row receives the same column-wise offsets. Add an axis explicitly if you want to combine each row value with every value from another vector:

```python
row_values = np.array([10, 20])
column_values = np.array([1, 2, 3])
all_pairs = row_values[:, np.newaxis] + column_values

print(all_pairs.shape)  # (2, 3)
```

If two dimensions differ and neither is one, NumPy raises a `ValueError`. Print both shapes and check their trailing dimensions before trying to reshape data.

**Exercise:** Convert a `(3, 4)` table from meters to centimeters with one array expression. Then add a four-element per-feature offset. Try an incompatible shape and explain the error.

**Sources:** [Universal functions](https://numpy.org/doc/stable/user/basics.ufuncs.html), [Mathematical functions](https://numpy.org/doc/stable/reference/routines.math.html), [Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html)
