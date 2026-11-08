---
title: 'Combine and reshape tables'
order: 7
description: 'Concatenate tables, merge related records by key, and reshape summarized data.'
---

## Concatenate similar tables

Use `pd.concat` to stack DataFrames with compatible columns. `ignore_index=True` creates a new sequential row index:

```python
import pandas as pd

week_one = pd.DataFrame({"item": ["tea", "coffee"], "units": [8, 5]})
week_two = pd.DataFrame({"item": ["tea", "juice"], "units": [6, 4]})

all_weeks = pd.concat([week_one, week_two], ignore_index=True)
```

Concatenation aligns columns by label. If inputs have different columns, the result may contain missing values where a particular table had no matching column.

## Merge by a key

Use `merge` to combine records from tables that share a key, much like a SQL join:

```python
orders = pd.DataFrame(
    {"product_id": [1, 2, 1], "units": [4, 3, 6]}
)
products = pd.DataFrame(
    {"product_id": [1, 2], "name": ["tea", "coffee"], "price": [2.5, 4.0]}
)

enriched = orders.merge(products, on="product_id", how="left", validate="many_to_one")
enriched["revenue"] = enriched["units"] * enriched["price"]
```

A left merge keeps every row from `orders`. The `validate` option checks the assumed key relationship; here many orders may refer to one product row. Check key uniqueness and row counts when joining, since duplicate keys can multiply rows unexpectedly.

## Pivot an aggregate to a table

`pivot_table` summarizes values across row and column categories:

```python
report = enriched.pivot_table(
    index="name",
    columns="product_id",
    values="revenue",
    aggfunc="sum",
    fill_value=0,
)
print(report)
```

Unlike `pivot`, `pivot_table` can aggregate duplicate combinations. Choose an aggregation function that matches the question, and do not fill missing combinations with zero unless zero is the intended interpretation.

**Exercise:** Concatenate two monthly order tables, merge them with a product lookup table, and build a product-by-month summary.

**Sources:** [pandas merge, join, concatenate and compare](https://pandas.pydata.org/docs/user_guide/merging.html), [pandas reshaping and pivot tables](https://pandas.pydata.org/docs/user_guide/reshaping.html)
