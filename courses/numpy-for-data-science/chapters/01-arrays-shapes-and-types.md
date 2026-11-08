---
title: 'Arrays, shapes, and data types'
order: 1
description: 'Create NumPy arrays and inspect their dimensions, shape, size, and dtype.'
---

## Why use an ndarray?

NumPy's central structure is the `ndarray`: an N-dimensional array whose elements normally share one data type. That regular structure is useful for numerical work because a whole array can be transformed or measured with NumPy operations. A Python list is still a better fit for many general-purpose collections; NumPy is especially useful when the data is large and mostly numeric.

An array has a fixed shape while it exists, but it is not immutable: you can assign new values to its elements. Changing its size generally creates or reallocates storage. Homogeneous dtypes and compact numeric storage can make arrays more memory-efficient and faster for bulk numerical operations than Python lists, though the exact benefit depends on the data and operation.

```python
import numpy as np

temperatures = np.array([18.5, 20.0, 21.5])
print(temperatures + 1)  # [19.5 21.  22.5]
```

## Inspect an array before using it

The attributes `ndim`, `shape`, `size`, and `dtype` answer different questions:

```python
measurements = np.array([[10, 12, 14], [9, 11, 13]], dtype=np.float64)

print(measurements.ndim)   # 2 axes
print(measurements.shape)  # 2 rows, 3 columns
print(measurements.size)   # 6 values
print(measurements.dtype)  # float64
```

Shape is often the first thing to check when an operation gives a surprising result. A list of rows intended as a table should be rectangular: each row needs the same number of values.

## Create arrays deliberately

Convert a regular Python sequence, or use helpers for common patterns:

```python
counts = np.array([3, 5, 8], dtype=np.int64)
empty_table = np.zeros((2, 3))
filled_table = np.ones((2, 3))
identity = np.eye(3)
feature_ids = np.arange(1, 6)
sample_points = np.linspace(0.0, 1.0, num=5)

print(feature_ids)    # [1 2 3 4 5]
print(sample_points)  # [0.   0.25 0.5  0.75 1.  ]
print(identity)
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]
```

Use `arange` for integer steps and `linspace` when you need a specified number of evenly spaced values. Floating-point steps can make the length of an `arange` result surprising. An `empty` array is not initialized with zeros; only use it when every value will be filled before it is read.

Common creation functions:

- `np.array(sequence)`: convert nested Python sequences to an array.
- `np.zeros(shape)` / `np.ones(shape)`: fill an array with zeros or ones.
- `np.eye(n)`: create an identity matrix.
- `np.arange(start, stop, step)`: generate step-spaced values.
- `np.linspace(start, stop, num)`: generate a specified number of evenly spaced values.

Nest sequences to create dimensions; `ndim` reports how many axes the resulting array has.

`dtype` matters. For example, an integer array cannot represent fractions without a conversion, and narrow integer types have limited ranges. Use `.astype()` when an explicit conversion is intended:

```python
raw_counts = np.array([2, 3, 4])
rates = raw_counts.astype(np.float64) / 10
print(rates)  # [0.2 0.3 0.4]
```

Array inspection and conversion:

- `type(arr)`: Python runtime type, usually `numpy.ndarray`.
- `arr.ndim`, `arr.shape`, `arr.size`, `arr.dtype`: axis count, axis lengths, element count, and element type.
- `arr.astype(dtype)`: convert values to a chosen dtype.
- `arr.tolist()`: convert to nested Python lists (or a Python scalar for a zero-dimensional array).

`shape` is an attribute, not a method. Common dtypes include `np.int8`/`np.int64`, `np.float32`/`np.float64`, `np.bool_`, and `np.complex128`. The `dtype.kind` codes include `b` boolean, `i` signed integer, `u` unsigned integer, `f` float, `c` complex, `m` timedelta, `M` datetime, `S` byte string, `U` Unicode string, and `O` object.

**Exercise:** Create a 3-by-2 array of floating-point measurements. Print its `ndim`, `shape`, `size`, and `dtype`, then create five evenly spaced values between -1 and 1.

**Sources:** [NumPy: The absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html), [Array creation](https://numpy.org/doc/stable/user/basics.creation.html), [Data types](https://numpy.org/doc/stable/user/basics.types.html), [numpy.ndarray.tolist](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.tolist.html)
