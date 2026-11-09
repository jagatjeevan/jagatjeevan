---
title: 'Join related tables'
order: 5
description: 'Combine rows from related tables with explicit join conditions.'
---

## Why joins?

Related facts live in separate tables to avoid duplication and to keep relationships explicit. A **join** combines rows according to a condition—usually matching a foreign key to a primary key.

```sql
SELECT
    o.order_id,
    c.name AS customer_name,
    o.ordered_at,
    o.status
FROM orders AS o
JOIN customers AS c
    ON c.customer_id = o.customer_id
ORDER BY o.ordered_at DESC;
```

An inner `JOIN` includes only rows with a match on both sides. A `LEFT JOIN` keeps every row from its left input and fills unmatched right-side columns with `NULL`:

```sql
SELECT c.customer_id, c.name, o.order_id
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id;
```

That query can reveal customers with no orders. When filtering a `LEFT JOIN`, be mindful of whether a condition belongs in `ON` or `WHERE`: filtering a right-side column in `WHERE` can remove the unmatched rows and make the result behave like an inner join.

## Join order items to products

```sql
SELECT
    oi.order_id,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM order_items AS oi
JOIN products AS p
    ON p.product_id = oi.product_id
WHERE oi.order_id = 42;
```

Qualify columns with table aliases in multi-table queries. This avoids ambiguity and makes each relationship visible. A many-to-many relationship generally requires joining through its linking table.

**Exercise:** Write a query that lists each order ID and its customer's email.

**Sources:** [PostgreSQL: Joins Between Tables](https://www.postgresql.org/docs/current/tutorial-join.html), [PostgreSQL: Foreign Keys](https://www.postgresql.org/docs/current/tutorial-fk.html)
