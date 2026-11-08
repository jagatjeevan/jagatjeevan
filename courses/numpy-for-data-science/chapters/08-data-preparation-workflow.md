---
title: 'Mini-project: prepare a numerical dataset'
order: 8
description: 'Combine array inspection, missing-value filtering, masks, reductions, and broadcasting in a compact data-preparation workflow.'
---

## Start with a small dataset

Rows below represent observations and columns represent three features. One observation has a missing measurement:

```python
import numpy as np

measurements = np.array([
    [12.0, 100.0, 0.8],
    [15.0, 120.0, 0.7],
    [np.nan, 110.0, 0.9],
    [18.0, 130.0, 0.6],
])

print(measurements.shape)  # (4, 3)
print(measurements.dtype)  # float64
print(np.isnan(measurements).sum(axis=0))  # missing values per feature
```

Shape and dtype checks are quick ways to confirm that the data has the structure your next operation assumes.

## Filter complete observations and summarize features

Create a Boolean mask for rows that contain no NaN values. Boolean selection creates a separate array; `.copy()` makes the intent to work with independent data clear:

```python
complete_rows = ~np.isnan(measurements).any(axis=1)
clean = measurements[complete_rows].copy()

print(complete_rows)  # [ True  True False  True]
print(clean.shape)    # (3, 3)
```

Calculate feature-wise summaries with `axis=0`, then standardize each feature using broadcasting:

```python
feature_mean = clean.mean(axis=0)
feature_std = clean.std(axis=0)

standardized = (clean - feature_mean) / feature_std
print(standardized.shape)  # (3, 3)
print(standardized.mean(axis=0))  # close to [0. 0. 0.]
```

Use a mask to select observations that meet a data-dependent condition:

```python
high_first_feature = clean[:, 0] >= 15
selected = clean[high_first_feature]
print(selected[:, 0])  # [15. 18.]
```

This example removes any row containing a missing value; real analyses may need a different policy, such as imputing values or retaining partial rows. Document that decision rather than silently dropping data.

## Extend the exercise

Try a different missing-value policy, compare `np.nanmean` with filtering, or save the standardized data with `np.savetxt`. For every step, state the expected input shape and output shape before running the code.

For a quick performance check in a Jupyter notebook or IPython shell, `%timeit expression` measures one expression and `%%timeit` measures the code in a notebook cell. These are IPython magics, not Python syntax for ordinary `.py` files. Benchmark equivalent work on representative input sizes, and verify that the results are correct before comparing timings.

**Exercise:** Add a feature to the sample data, mark one additional value as missing, and update the code to report the number of complete observations and the mean of each feature using your chosen policy.

**Sources:** [NumPy: The absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html), [Indexing on ndarrays](https://numpy.org/doc/stable/user/basics.indexing.html), [Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html), [NumPy statistics routines](https://numpy.org/doc/stable/reference/routines.statistics.html), [IPython `%timeit` magic](https://ipython.readthedocs.io/en/stable/interactive/magics.html#magic-timeit)
