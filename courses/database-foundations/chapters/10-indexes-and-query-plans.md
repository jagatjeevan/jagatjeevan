---
title: 'Indexes, query plans, and performance'
order: 10
description: 'Learn what indexes trade off and use a query plan to guide optimization.'
---

## What an index does

An **index** is an auxiliary data structure that can help a DBMS find rows without scanning every row in a table. A B-tree index is a common default for equality and range comparisons:

```sql
CREATE INDEX orders_customer_ordered_at_idx
ON orders (customer_id, ordered_at DESC);
```

This may help a query that filters by `customer_id` and sorts by `ordered_at`. The column order matters, and an index helps only when the planner considers it useful for the actual query and data.

Indexes consume storage and add work to inserts, updates, and deletes. Avoid creating an index for every column; measure the workload and consider existing primary-key and unique-constraint indexes before adding another.

## Read a query plan

PostgreSQL's `EXPLAIN` displays the planner's chosen strategy; `EXPLAIN ANALYZE` also runs the query and reports actual timing and row counts. Use `ANALYZE` carefully on statements that modify data.

```sql
EXPLAIN
SELECT order_id, ordered_at
FROM orders
WHERE customer_id = 7
ORDER BY ordered_at DESC;
```

Look at which nodes scan or join data, estimated rows, and whether the plan uses an index. Estimates and plan choices depend on table size, statistics, and cost settings. A sequential scan is not automatically a problem—it can be efficient for small tables or queries reading much of a table.

## Scale up thoughtfully

Before adding infrastructure, verify the query, schema, indexes, and workload. Scaling **up** means giving a database server more resources; scaling **out** can involve read replicas, partitioning, or sharding, each with consistency and operational trade-offs. A read replica does not necessarily return the newest write immediately.

**Exercise:** Propose a query pattern an index on `(customer_id, ordered_at)` could support. What writes become more expensive when that index is maintained?

**Sources:** [PostgreSQL: Indexes](https://www.postgresql.org/docs/current/indexes.html), [PostgreSQL: Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html), [GeeksforGeeks: DBMS Tutorial — Indexing](https://www.geeksforgeeks.org/dbms/dbms/)
