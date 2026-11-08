---
title: 'Arrays, shapes, and data types'
order: 1
description: 'Create NumPy arrays and inspect their dimensions, shape, size, and dtype.'
---

## Why use an ndarray?

NumPy's central structure is the `ndarray`: an N-dimensional array whose elements normally share one data type. That regular structure is useful for numerical work because a whole array can be transformed or measured with NumPy operations. A Python list is still a better fit for many general-purpose collections; NumPy is especially useful when the data is large and mostly numeric.

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
feature_ids = np.arange(1, 6)
sample_points = np.linspace(0.0, 1.0, num=5)

print(feature_ids)    # [1 2 3 4 5]
print(sample_points)  # [0.   0.25 0.5  0.75 1.  ]
```

Use `arange` for integer steps and `linspace` when you need a specified number of evenly spaced values. Floating-point steps can make the length of an `arange` result surprising. An `empty` array is not initialized with zeros; only use it when every value will be filled before it is read.

`dtype` matters. For example, an integer array cannot represent fractions without a conversion, and narrow integer types have limited ranges. Use `.astype()` when an explicit conversion is intended:

```python
raw_counts = np.array([2, 3, 4])
rates = raw_counts.astype(np.float64) / 10
print(rates)  # [0.2 0.3 0.4]
```

**Exercise:** Create a 3-by-2 array of floating-point measurements. Print its `ndim`, `shape`, `size`, and `dtype`, then create five evenly spaced values between -1 and 1.

**Sources:** [NumPy: The absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html), [Array creation](https://numpy.org/doc/stable/user/basics.creation.html), [Data types](https://numpy.org/doc/stable/user/basics.types.html)
