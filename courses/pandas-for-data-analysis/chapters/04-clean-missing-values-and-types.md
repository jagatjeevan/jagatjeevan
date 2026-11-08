---
title: 'Clean missing values and types'
order: 4
description: 'Detect missing observations, handle duplicates, and choose a suitable column type.'
---

## Find missing values

Pandas represents missing values with sentinels that can differ by dtype. Use `isna()` and `notna()` to detect them instead of comparing directly to `None`, `NaN`, or `pd.NA`:

```python
import pandas as pd

records = pd.DataFrame(
    {
        "name": ["Ari", "Bea", "Chen", "Chen"],
        "visits": [3, None, 2, 2],
        "score": [88.0, 91.0, None, None],
    }
)

print(records.isna().sum())
```

Choose a missing-value policy based on what the field means. You can remove incomplete rows with `dropna`, fill values with `fillna`, or retain missing values and use methods that skip them. Filling a missing score with zero would imply a real score of zero, so it may not be a defensible choice.

```python
with_visit_counts = records.dropna(subset=["visits"]).copy()
records["score"] = records["score"].fillna(records["score"].median())
```

## Find and remove duplicate rows

`duplicated()` flags repeated records; `drop_duplicates()` returns a DataFrame with duplicate rows removed:

```python
duplicate_rows = records.duplicated()
unique_records = records.drop_duplicates(subset=["name", "visits"])
```

Check which fields define a duplicate before removing rows. Two people may share a name; a unique record may require a stable ID instead.

## Check and convert types

Inspect `dtypes` after reading. Convert columns explicitly when values have been validated:

```python
counts = pd.Series(["3", "5", "8"])
numeric_counts = pd.to_numeric(counts, errors="raise")

nullable_visits = pd.Series([3, None], dtype="Int64")
print(nullable_visits.dtype)  # Int64, nullable integer
```

The nullable `"Int64"` dtype (capital I) can store integer values and `pd.NA`. Parsing malformed values with `errors="coerce"` changes them to missing values, so use that only when converting and then inspect the newly missing entries.

**Exercise:** Add a missing value and a duplicate row to a small table. Count both, decide which rows to keep, and convert a string-number column to numeric.

**Sources:** [pandas missing data](https://pandas.pydata.org/docs/user_guide/missing_data.html), [pandas 10 minutes: data types](https://pandas.pydata.org/docs/user_guide/10min.html), [NVIDIA: What Is pandas?](https://www.nvidia.com/en-in/glossary/pandas-python/)
