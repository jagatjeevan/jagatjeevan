---
title: 'Aggregations, grouping, and summaries'
order: 6
description: 'Summarize rows with aggregate functions, GROUP BY, and HAVING.'
---

## Aggregate functions

An aggregate computes a summary from multiple rows. Common SQL aggregates include `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`. For example:

```sql
SELECT
    COUNT(*) AS order_count,
    MIN(ordered_at) AS first_order,
    MAX(ordered_at) AS latest_order
FROM orders;
```

`COUNT(*)` counts rows. `COUNT(column)` counts only rows where that column is not `NULL`. Most aggregates ignore null input values; check the selected DBMS documentation for details.

## One summary per group

`GROUP BY` partitions input rows by one or more expressions, then computes aggregates for each group:

```sql
SELECT
    customer_id,
    COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
ORDER BY order_count DESC;
```

Use `HAVING` to filter groups after aggregation. Use `WHERE` to filter individual rows before the groups are formed:

```sql
SELECT customer_id, COUNT(*) AS paid_order_count
FROM orders
WHERE status = 'paid'
GROUP BY customer_id
HAVING COUNT(*) >= 2;
```

In a grouped query, every selected expression must either be grouped or aggregated. This keeps the result meaningful when a group contains multiple source rows.

**Exercise:** Calculate the total quantity of each product sold, using `order_items`. Extend it to show only products with at least five units sold.

**Sources:** [PostgreSQL: Aggregate Functions](https://www.postgresql.org/docs/current/tutorial-agg.html), [PostgreSQL: Aggregate Functions Reference](https://www.postgresql.org/docs/current/functions-aggregate.html)
