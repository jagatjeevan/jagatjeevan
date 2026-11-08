---
title: 'Load, inspect, and save data'
order: 2
description: 'Read tabular data and perform initial checks before analyzing it.'
---

## Read a CSV file

`read_csv` loads comma-separated tabular data into a DataFrame. Use a small in-memory CSV here so the example can run without a separate data file:

```python
from io import StringIO
import pandas as pd

csv_text = """product,region,units
tea,west,12
coffee,east,8
juice,west,5
"""

sales = pd.read_csv(StringIO(csv_text))
print(sales.head(2))
```

Pandas has readers and writers for a variety of formats. Additional engines or packages may be required for some formats, such as Excel workbooks. Use options such as `parse_dates` or `dtype` when you know how a column should be interpreted, and verify the result after loading.

## Inspect before changing the data

Check the size, column names, data types, and a preview to catch parsing surprises early:

```python
print(sales.shape)      # (3, 3)
print(sales.columns)    # column labels
print(sales.dtypes)     # one dtype per column
print(sales.info())     # non-null counts and memory summary
print(sales.describe()) # summary for numeric columns
```

`shape` and `dtypes` are attributes, so they do not have parentheses. `head`, `info`, and `describe` are methods, so they do. `info()` prints its report and returns `None`.

## Save a result

Write a DataFrame to CSV with `to_csv`. Set `index=False` if the row index is not part of the data you want in the file:

```python
output = StringIO()
sales.to_csv(output, index=False)
print(output.getvalue().splitlines()[0])  # product,region,units
```

**Exercise:** Change the input CSV to include one more row. Load it, check the shape and dtypes, and write it back without the generated row index.

**Sources:** [pandas I/O tools](https://pandas.pydata.org/docs/user_guide/io.html), [pandas introductory tutorial: read and write tabular data](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html), [GeeksforGeeks: Pandas Introduction](https://www.geeksforgeeks.org/pandas/introduction-to-pandas-in-python/)
