---
title: 'CRUD and basic SQL queries'
order: 4
description: 'Read and change table data with SELECT, INSERT, UPDATE, and DELETE.'
---

## Data manipulation language

**Data Manipulation Language (DML)** reads and changes rows. The core CRUD actions are **Create** (`INSERT`), **Read** (`SELECT`), **Update** (`UPDATE`), and **Delete** (`DELETE`).

```sql
INSERT INTO customers (name, email)
VALUES ('Asha Rao', 'asha@example.test');

SELECT customer_id, name, email
FROM customers
WHERE email = 'asha@example.test';

UPDATE customers
SET name = 'Asha R.'
WHERE email = 'asha@example.test';

DELETE FROM customers
WHERE email = 'asha@example.test';
```

The final `DELETE` is only a practice example: a real customer may be referenced by an order, and the foreign key intentionally prevents removing a still-referenced customer. Always inspect the target rows and include a deliberate `WHERE` condition before updating or deleting.

## Selecting useful rows

`SELECT` names the output columns; `FROM` identifies the source table; `WHERE` filters input rows. Sort results explicitly with `ORDER BY` and use `LIMIT` in PostgreSQL to cap returned rows:

```sql
SELECT product_id, name, price
FROM products
WHERE active = true AND price < 50
ORDER BY price ASC, name ASC
LIMIT 20;
```

Use `IS NULL` and `IS NOT NULL` to test for missing values—`= NULL` does not work as a normal equality test. PostgreSQL's `ILIKE` performs case-insensitive pattern matching; `LIKE` is more portable.

For application code, pass user-provided values as parameters through the database driver. Do not build SQL by joining raw user input into the query text.

**Exercise:** List active products priced at least 20, from most expensive to least expensive.

**Sources:** [PostgreSQL: Querying a Table](https://www.postgresql.org/docs/current/tutorial-select.html), [PostgreSQL: Modifying Tables](https://www.postgresql.org/docs/current/dml.html)
