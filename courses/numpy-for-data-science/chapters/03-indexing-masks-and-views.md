---
title: 'Select data with indices and masks'
order: 3
description: 'Choose array elements using indices, slices, and Boolean conditions, while avoiding accidental shared-data edits.'
---

## Select rows and columns

NumPy indices start at zero. Separate dimensions with commas inside one pair of brackets:

```python
data = np.array([[12, 18, 25], [14, 20, 28], [9, 16, 22]])

print(data[0, 1])  # row 0, column 1: 18
print(data[:, 0])  # every row, first column
print(data[1:, 1:])  # rows 1 onward, columns 1 onward
```

The slice `start:stop:step` excludes `stop`, just like ordinary Python slicing. A two-dimensional slice keeps its two axes; indexing a row with one integer returns a one-dimensional array.

## Boolean masks

Comparisons produce Boolean arrays that can select matching values. Combine conditions with parentheses and elementwise operators such as `&` and `|`:

```python
scores = np.array([55, 72, 88, 91])
passed = scores >= 70

print(passed)         # [False  True  True  True]
print(scores[passed]) # [72 88 91]

middle_scores = scores[(scores >= 70) & (scores < 90)]
print(middle_scores)  # [72 88]
```

For a two-dimensional array, `data[data > 20]` selects matching entries into a one-dimensional result. To replace values in place, assign through the mask:

```python
cleaned = data.copy()
cleaned[cleaned < 12] = 12
```

## Slices can be views

Basic slicing usually creates a view into the original array. Editing the view can therefore change the source:

```python
values = np.array([10, 20, 30, 40])
first_two = values[:2]
first_two[0] = 99

print(values)  # [99 20 30 40]
```

Boolean or integer-array selection creates a separate result. When in doubt, use `.copy()` to make independent data explicit:

```python
large = np.arange(10)
subset = large[large % 2 == 0].copy()
subset[0] = -1

print(large[0])  # still 0
```

## Fancy indexing and sorting

Integer-array indexing selects arbitrary positions. When row and column index arrays are paired, NumPy selects matching coordinate pairs; use `np.ix_` when you want every combination of selected rows and columns:

```python
grid = np.arange(20).reshape(4, 5)
print(grid[[0, 2], [1, 4]])  # [ 1 14]: (row 0, col 1) and (row 2, col 4)
print(grid[np.ix_([0, 2], [1, 4])])
# [[ 1  4]
#  [11 14]]
```

Sorting quick reference:

- `np.sort(arr, axis=1)`: sort each row; use `axis=0` to sort each column.
- `np.sort(arr, axis=None)`: sort the flattened values.
- `arr.sort(axis=...)`: sort the array in place; `np.sort` instead returns a sorted copy.
- `np.argmin(arr)` / `np.argmax(arr)`: return the flattened index of the minimum / maximum by default; pass `axis` for an index per slice.

**Exercise:** Select all rows from a table whose second column is at least 50. Change one value in a slice and observe whether the original changes; then repeat with `.copy()`.

**Sources:** [Indexing on ndarrays](https://numpy.org/doc/stable/user/basics.indexing.html), [Copies and views](https://numpy.org/doc/stable/user/basics.copies.html), [Sorting, searching, and counting](https://numpy.org/doc/stable/reference/routines.sort.html)
