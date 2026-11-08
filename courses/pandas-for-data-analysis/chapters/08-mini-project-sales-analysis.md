---
title: 'Mini-project: analyze a small sales dataset'
order: 8
description: 'Put file loading, data checks, filtering, grouping, and interpretation together in a compact analysis.'
---

## Build a small raw dataset

The data below includes a missing quantity and a repeated record. Start by inspecting the table and explicitly checking for those issues:

```python
import pandas as pd

orders = pd.DataFrame(
    {
        "order_id": [101, 102, 103, 103, 104],
        "date": ["2026-03-01", "2026-03-01", "2026-03-02", "2026-03-02", "2026-03-03"],
        "region": ["west", "east", "west", "west", "east"],
        "product": ["tea", "coffee", "juice", "juice", "tea"],
        "units": [4, 2, 3, 3, None],
        "unit_price": [2.5, 4.0, 3.0, 3.0, 2.5],
    }
)

print(orders.shape)
print(orders.isna().sum())
print(orders.duplicated().sum())
```

## Clean and derive

This example removes exact duplicate rows and records missing quantities as unknown. The choice to omit rows with unknown units is explicit for this particular revenue summary; a real analysis may use a different policy:

```python
clean = orders.drop_duplicates().copy()
clean["date"] = pd.to_datetime(clean["date"], errors="raise")
complete_orders = clean.dropna(subset=["units"]).copy()
complete_orders["revenue"] = complete_orders["units"] * complete_orders["unit_price"]
```

The date conversion uses `errors="raise"` so malformed dates are surfaced rather than silently converted to missing values.

## Summarize and validate

Calculate total revenue by region, then compare the aggregated total with the row-level total:

```python
revenue_by_region = (
    complete_orders.groupby("region", as_index=False)
    .agg(order_count=("order_id", "size"), revenue=("revenue", "sum"))
    .sort_values("revenue", ascending=False)
)

print(revenue_by_region)
assert complete_orders["revenue"].sum() == revenue_by_region["revenue"].sum()
```

The assertion checks arithmetic consistency, not whether the cleaning choices were correct. Before sharing an analysis, explain how duplicates and missing values were treated and verify that the resulting rows and totals make sense for the data.

**Exercise:** Extend the report to include revenue by product and date. Change the missing-quantity policy and explain how it changes the summary.

**Sources:** [pandas: 10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html), [pandas I/O tools](https://pandas.pydata.org/docs/user_guide/io.html), [pandas missing data](https://pandas.pydata.org/docs/user_guide/missing_data.html), [pandas groupby](https://pandas.pydata.org/docs/user_guide/groupby.html), [GeeksforGeeks: Pandas Introduction](https://www.geeksforgeeks.org/pandas/introduction-to-pandas-in-python/)
