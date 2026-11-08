---
title: 'Pandas for Data Analysis'
level: 'Beginner to intermediate'
audience: 'Python learners who want to work with labeled, tabular data'
description: 'Learn to load, inspect, select, clean, transform, summarize, and combine real-world tabular data with pandas.'
outcomesHeading: 'What you will learn'
useCasesHeading: 'Where to use pandas'
avoidCasesHeading: 'What this course does not cover'
chaptersHeading: 'Course chapters'
referencesHeading: 'Documentation and further reading'
useCases:
  - 'Explore and prepare spreadsheet-like or database-style data in Python.'
  - 'Clean missing, duplicated, and incorrectly typed tabular values.'
  - 'Summarize records by category and combine related datasets.'
avoidCases:
  - 'Pandas is not designed to replace a relational database for storing and querying datasets too large for memory.'
  - 'This course focuses on tabular analysis, not a complete statistics, visualization, or machine-learning curriculum.'
outcomes:
  - 'Explain the roles of Series, DataFrame, and index labels.'
  - 'Read and write common tabular files and inspect data shape, values, and types.'
  - 'Select rows and columns with labels, positions, and Boolean conditions.'
  - 'Handle missing data, duplicates, and column types deliberately.'
  - 'Create derived columns and aggregate data with groupby.'
  - 'Combine tables using concatenation and key-based merges.'
  - 'Complete a small analysis from raw records to a checked summary.'
references:
  - title: 'pandas'
    url: 'https://pandas.pydata.org/'
    description: 'Official project overview, installation, tutorials, user guide, and API reference.'
  - title: 'pandas API reference'
    url: 'https://pandas.pydata.org/docs/reference/index.html'
    description: 'Public pandas objects, functions, and methods.'
  - title: '10 minutes to pandas'
    url: 'https://pandas.pydata.org/docs/user_guide/10min.html'
    description: 'Official quick introduction to pandas data structures and common operations.'
  - title: 'Intro to data structures'
    url: 'https://pandas.pydata.org/docs/user_guide/dsintro.html'
    description: 'Series, DataFrame, indexes, and labeled data.'
  - title: 'Indexing and selecting data'
    url: 'https://pandas.pydata.org/docs/user_guide/indexing.html'
    description: 'Select and set data with labels, positions, and conditions.'
  - title: 'Reading and writing files'
    url: 'https://pandas.pydata.org/docs/user_guide/io.html'
    description: 'Read and write CSV, spreadsheet, SQL, and other data formats.'
  - title: 'Working with missing data'
    url: 'https://pandas.pydata.org/docs/user_guide/missing_data.html'
    description: 'Detect, represent, and handle missing values.'
  - title: 'Group by: split-apply-combine'
    url: 'https://pandas.pydata.org/docs/user_guide/groupby.html'
    description: 'Aggregate, transform, or filter data by groups.'
  - title: 'Merge, join, concatenate and compare'
    url: 'https://pandas.pydata.org/docs/user_guide/merging.html'
    description: 'Combine Series and DataFrames along axes or by matching keys.'
  - title: 'Reshaping and pivot tables'
    url: 'https://pandas.pydata.org/docs/user_guide/reshaping.html'
    description: 'Reshape long and wide data and produce pivot tables.'
  - title: 'GeeksforGeeks: Pandas Introduction'
    url: 'https://www.geeksforgeeks.org/pandas/introduction-to-pandas-in-python/'
    description: 'An introductory overview of pandas structures, common cleaning tasks, and grouped analysis.'
  - title: 'NVIDIA: What Is pandas?'
    url: 'https://www.nvidia.com/en-in/glossary/pandas-python/'
    description: 'An overview of tabular data structures, pandas operations, and its role in the Python data ecosystem.'
---

## How to use this course

This course assumes basic Python knowledge, including lists, dictionaries, functions, and importing packages. Install pandas with `python -m pip install pandas`, then run examples in a Python script, REPL, or notebook. The examples use the conventional `import pandas as pd`.

Work through the chapters in order. Pandas keeps row and column labels alongside values, so understanding indexes and alignment helps prevent subtle selection and arithmetic errors. Examples focus on small in-memory datasets; for very large datasets, choose storage and processing tools appropriate to their size.

![A tabular analysis workflow from loading and inspection through cleaning, transformation, validation, and communication](/courses/pandas-for-data-analysis/diagrams/analysis-workflow.svg)

This visual roadmap reflects the operations described in the [official pandas user guide](https://pandas.pydata.org/docs/user_guide/index.html).
