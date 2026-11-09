---
title: 'Subqueries, CTEs, and views'
order: 7
description: 'Break queries into understandable steps and reuse named query interfaces.'
---

## Subqueries

A **subquery** is a query nested inside another SQL statement. It can provide a value or a set of rows to the outer query:

```sql
SELECT product_id, name, price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
);
```

Use `EXISTS` when the question is whether at least one related row exists:

```sql
SELECT c.customer_id, c.name
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);
```

## Common table expressions

A **common table expression (CTE)** names a query result for one statement. The `WITH` clause can make a multi-step query easier to read:

```sql
WITH customer_totals AS (
    SELECT customer_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY customer_id
)
SELECT c.name, totals.order_count
FROM customer_totals AS totals
JOIN customers AS c USING (customer_id)
WHERE totals.order_count > 1;
```

A CTE is not automatically a performance optimization; its planning and materialization behavior depends on the DBMS and query. Use it when the named step makes the logic clearer, then inspect performance if needed.

## Views

A **view** gives a reusable name to a query:

```sql
CREATE VIEW order_summary AS
SELECT o.order_id, c.name AS customer_name, o.ordered_at, o.status
FROM orders AS o
JOIN customers AS c USING (customer_id);
```

Applications can query the view much like a table. A normal view stores the query definition rather than a separate snapshot of its result. Materialized views, where supported, store results and need refresh management.

**Exercise:** Create a query or view that shows each customer's total number of orders.

**Sources:** [PostgreSQL: WITH Queries](https://www.postgresql.org/docs/current/queries-with.html), [PostgreSQL: Views](https://www.postgresql.org/docs/current/tutorial-views.html)
