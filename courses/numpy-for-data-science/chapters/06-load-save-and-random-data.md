---
title: 'Load, save, and generate data'
order: 6
description: 'Read simple numerical text files, save arrays efficiently, and generate reproducible samples.'
---

## Read numeric text and CSV data

For a clean, numeric text file, `np.loadtxt` is a compact option:

```python
import numpy as np

# readings.csv contains a header followed by comma-separated numbers.
readings = np.loadtxt("readings.csv", delimiter=",", skiprows=1)
print(readings.shape)
```

For numeric CSV data that may contain missing fields, `np.genfromtxt` can use NaN or a chosen fill value:

```python
readings = np.genfromtxt(
    "readings.csv",
    delimiter=",",
    skip_header=1,
    filling_values=np.nan,
)
```

Inspect the returned shape and missing values before analyzing a file. These routines are designed for numerical data; a CSV with mixed text and labeled columns may be better handled by a table-oriented library.

## Save arrays for later

Use `.npy` to preserve a single NumPy array's shape and data type, or a text format when people need to inspect the values:

```python
np.save("readings.npy", readings)
restored = np.load("readings.npy", allow_pickle=False)

np.savetxt("readings-export.csv", readings, delimiter=",", fmt="%.2f")
```

Avoid object arrays and leave `allow_pickle=False` unless there is a specific trusted reason to load pickled Python objects. Pickle-based data can execute code when loaded.

## Make random examples reproducible

Create a `Generator` with `default_rng`. The generator methods shown here are the modern equivalents of common random-sampling examples; supplying the same seed lets an example or experiment repeat its random sequence:

```python
rng = np.random.default_rng(42)
sample = rng.integers(low=0, high=10, size=5)
print(sample)

synthetic_measurements = rng.normal(loc=20.0, scale=2.0, size=(4, 3))
print(synthetic_measurements.shape)  # (4, 3)
```

Random sampling quick reference:

- `rng.random(size)`: draw uniform values in `[0, 1)`.
- `rng.standard_normal(size)`: draw from a normal distribution with mean 0 and standard deviation 1; values are not restricted to `[-1, 1]`.
- `rng.integers(low, high, size)`: draw integers from `low` up to, but not including, `high`.
- `rng.normal(loc, scale, size)`: draw from a normal distribution with the given mean and standard deviation.

Older examples may use `np.random.rand`, `np.random.randn`, and `np.random.randint`; prefer a seeded `Generator` for new code.

Use an explicit seed in examples and tests when repeatability matters. NumPy's random generators are for simulation and statistical sampling, not cryptographic secrets.

**Exercise:** Load a small numeric CSV, print its shape and dtype, save it to `.npy`, load it back with `allow_pickle=False`, and verify that the arrays match using `np.array_equal`.

**Sources:** [Reading and writing files](https://numpy.org/doc/stable/user/how-to-io.html), [Random sampling](https://numpy.org/doc/stable/reference/random/index.html)
