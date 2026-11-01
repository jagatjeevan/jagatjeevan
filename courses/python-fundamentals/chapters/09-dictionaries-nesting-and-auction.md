---
title: 'Dictionaries, nesting, and a secret auction'
order: 9
description: 'Represent named data, combine dictionaries and lists, and use nested records to find a winning bid.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Store named values in a dictionary

A dictionary maps keys to values:

```python
book = {"title": "North Wind", "year": 2024}
book["author"] = "A. Example"
print(book["title"])
```

Use `.get(key)` when a key may be missing and a default value is appropriate. Use `key in dictionary` to check whether a key exists.

## Nest collections for structured data

A list can hold dictionaries, and a dictionary can hold lists. This lets a program represent a set of related records:

```python
bids = [
    {"name": "Ari", "amount": 25},
    {"name": "Bo", "amount": 40},
]

winner = max(bids, key=lambda bid: bid["amount"])
print(f"{winner['name']} wins with {winner['amount']}.")
```

`max` with a `key` function compares each record by its `"amount"` field. In a real auction, also define rules for invalid bids, ties, currency, privacy, and when bidding closes; this tiny example only chooses the largest value in a fixed list.

## Secret auction exercise

Write a command-line exercise that asks for a bidder name and amount, stores each bid as a dictionary in a list, and repeats until there are no more bidders. Then report the highest bid. Decide explicitly how your program handles blank names, invalid amounts, and ties.

**Sources:** [Python Tutorial: Data Structures](https://docs.python.org/3/tutorial/datastructures.html), [LearnPython.org: Dictionaries](https://www.learnpython.org/en/Dictionaries), [Python built-in functions: `max`](https://docs.python.org/3/library/functions.html#max)
