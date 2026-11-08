---
title: 'Summaries, statistics, and missing values'
order: 5
description: 'Summarize arrays along the intended axis and handle NaN values explicitly.'
---

## Summarize the intended dimension

NumPy provides reductions such as `sum`, `mean`, `median`, `min`, `max`, and `std`. For a two-dimensional dataset, pass `axis` to specify which direction to reduce:

```python
measurements = np.array([[10.0, 15.0], [12.0, 18.0], [14.0, 21.0]])

print(np.mean(measurements, axis=0))  # mean for each measurement column
print(np.max(measurements, axis=1))   # maximum per observation
print(np.std(measurements, axis=0))   # standard deviation per column
```

Common reduction functions:

- `np.min`, `np.max`, `np.sum`: reduce values to a minimum, maximum, or total.
- `np.argmin`, `np.argmax`: return the positions of the minimum and maximum.
- `np.cumsum`: return cumulative sums in traversal order.

Each accepts an `axis` argument to operate along one dimension. For example, `np.cumsum(values)` returns a running total, while `np.cumsum(table, axis=0)` runs down each column.

With `axis=None` (the default), a reduction combines all elements:

```python
print(np.median(measurements))  # one median across the whole array
```

The mean is sensitive to unusually large or small values; the median is often a useful complementary summary. A standard deviation describes spread in the units of the input. Be clear about the axis and the question each statistic answers.

## Make missing numeric values visible

The floating-point value `np.nan` can represent a missing numeric observation. Ordinary arithmetic and many reductions propagate it:

```python
values = np.array([2.0, np.nan, 8.0])
print(np.mean(values))  # nan
print(np.isnan(values))  # [False  True False]
```

NumPy also provides `nanmean`, `nanmedian`, and related functions that skip NaNs for the reduction:

```python
print(np.nanmean(values))  # 5.0
```

Skipping a missing value is a decision, not a universal cleaning rule. Check how many values are missing, whether a whole row or column is absent, and what your analysis expects. `nanmean` cannot produce a meaningful value when every item being reduced is NaN.

## A simple feature standardization

For numeric features on different scales, a common transformation subtracts each feature's mean and divides by its standard deviation. Choose `axis=0` when rows are observations and columns are features:

```python
features = np.array([[10.0, 100.0],
                     [12.0, 140.0],
                     [14.0, 120.0]])

mean = features.mean(axis=0)
spread = features.std(axis=0)
standardized = (features - mean) / spread

print(standardized.mean(axis=0))  # approximately [0. 0.]
print(standardized.std(axis=0))   # [1. 1.]
```

If a feature has zero standard deviation, division by zero needs an explicit policy; the example assumes each feature varies.

**Exercise:** Put one `np.nan` into a column of a small table. Compare `mean` and `nanmean`, count the missing values with `np.isnan`, and report a median alongside the mean.

**Sources:** [NumPy statistics routines](https://numpy.org/doc/stable/reference/routines.statistics.html), [Mathematical functions](https://numpy.org/doc/stable/reference/routines.math.html), [numpy.mean](https://numpy.org/doc/stable/reference/generated/numpy.mean.html)
