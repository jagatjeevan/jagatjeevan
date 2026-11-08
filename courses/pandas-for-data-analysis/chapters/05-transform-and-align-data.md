---
title: 'Transform and align data'
order: 5
description: 'Create derived columns and understand how pandas aligns labels during calculations.'
---

## Create a derived column

Vectorized operations on Series can transform entire columns without an explicit Python loop:

```python
import pandas as pd

sales = pd.DataFrame(
    {
        "product": ["tea", "coffee", "juice"],
        "units": [12, 8, 5],
        "unit_price": [2.5, 4.0, 3.0],
    }
)

sales["revenue"] = sales["units"] * sales["unit_price"]
print(sales[["product", "revenue"]])
```

Use `assign` when you want to create a transformed DataFrame as part of a chain:

```python
with_tax = sales.assign(total=sales["revenue"] * 1.1)
```

The original `sales` remains available, while `with_tax` contains the added column. Choose descriptive names that communicate units and meaning.

## Labels align values

Operations on labeled Series align by index, not merely by their current row positions. When assigning a Series to a DataFrame column, pandas matches index labels:

```python
frame = pd.DataFrame({"item": ["tea", "coffee"]}, index=["row_a", "row_b"])
ratings = pd.Series([5, 3], index=["row_b", "row_a"])

frame["rating"] = ratings
print(frame["rating"].tolist())  # [3, 5]
```

If labels do not match, the result can include missing values. If positional assignment is truly intended, first make sure the values have the correct order and use a positional representation deliberately. Do not reset indexes just to hide a misalignment without checking what the labels represent.

**Exercise:** Add a discount column to the sales table. Then assign a Series with its index labels reversed and verify that the values align by label.

**Sources:** [pandas essential basic functionality](https://pandas.pydata.org/docs/user_guide/basics.html), [pandas indexing and selection](https://pandas.pydata.org/docs/user_guide/indexing.html), [NVIDIA: What Is pandas?](https://www.nvidia.com/en-in/glossary/pandas-python/)
