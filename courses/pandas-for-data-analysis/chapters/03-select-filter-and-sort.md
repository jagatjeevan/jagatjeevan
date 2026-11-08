---
title: 'Select, filter, and sort'
order: 3
description: 'Select columns and rows using labels, positions, and Boolean conditions.'
---

## Select columns and rows

Square brackets select columns by name. Use `.loc` for label-based row and column selection and `.iloc` for integer positions:

```python
import pandas as pd

people = pd.DataFrame(
    {"name": ["Ari", "Bea", "Chen"], "age": [29, 41, 35], "city": ["Oslo", "Lima", "Oslo"]},
    index=["p1", "p2", "p3"],
)

ages = people["age"]               # Series
name_and_age = people[["name", "age"]]  # DataFrame
bea = people.loc["p2", ["name", "age"]]
first_person = people.iloc[0]
```

Use the list form `people[["age"]]` when a one-column DataFrame is required; `people["age"]` returns a Series.

## Filter with conditions

Comparisons produce a Boolean Series that can filter rows. Use `&` and `|` for elementwise combinations, with parentheses around each comparison:

```python
older_people = people[people["age"] >= 35]
oslo_adults = people[(people["city"] == "Oslo") & (people["age"] >= 30)]

print(oslo_adults["name"].tolist())  # ['Chen']
```

## Sort and keep the result clear

Sort rows by one or more columns or by the index:

```python
by_age = people.sort_values("age", ascending=False)
by_label = people.sort_index()
print(by_age.iloc[0]["name"])  # Bea
```

Selection operations usually create a result that you can assign to a new variable. To edit a selected part of a DataFrame, use a single `.loc` assignment such as `people.loc[people["age"] < 30, "age"] = 30`, instead of chained selections that can make it unclear which object is being changed.

**Exercise:** Select only names and cities for people whose age is between 30 and 40, then sort the result by age.

**Sources:** [pandas indexing and selection](https://pandas.pydata.org/docs/user_guide/indexing.html), [pandas introductory tutorial: subset data](https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html)
