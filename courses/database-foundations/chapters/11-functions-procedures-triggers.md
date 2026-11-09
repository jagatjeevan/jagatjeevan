---
title: 'Functions, procedures, and triggers'
order: 11
description: 'Compare reusable database routines and automatic trigger behavior.'
---

## Reusable database logic

Relational databases can define reusable logic near the data. A **function** returns a value or rows and can often be used in a query. A **procedure** is invoked as an operation and may perform work without returning a query value. Exact capabilities and invocation syntax differ by DBMS.

PostgreSQL functions and procedures can use SQL or procedural languages such as PL/pgSQL. A minimal SQL function looks like this:

```sql
CREATE FUNCTION order_line_total(quantity integer, unit_price numeric)
RETURNS numeric
LANGUAGE SQL
IMMUTABLE
AS $$
    SELECT quantity * unit_price;
$$;
```

Then call it with:

```sql
SELECT order_line_total(3, 12.50);
```

For example, a PostgreSQL procedure can update an order's status:

```sql
CREATE PROCEDURE mark_order_paid(target_order_id integer)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE orders
    SET status = 'paid'
    WHERE order_id = target_order_id;
END;
$$;

CALL mark_order_paid(42);
```

## Triggers

A **trigger** runs a function automatically when a configured table event occurs, such as an insert or update. Triggers can support auditing or enforce rules that need to run consistently for multiple clients. They can also hide behavior and make writes harder to reason about; keep them focused, documented, and tested.

```sql
CREATE FUNCTION set_order_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;
```

This function would need to be attached to a table and event with `CREATE TRIGGER`; it also requires that the table has an `updated_at` column. A trigger is not a substitute for a clear application-level transaction design.

Stored procedures, triggers, permissions, and languages are product-specific. Check the target engine before adopting these patterns. PostgreSQL also documents [procedures](https://www.postgresql.org/docs/current/sql-createprocedure.html), [functions](https://www.postgresql.org/docs/current/sql-createfunction.html), and [triggers](https://www.postgresql.org/docs/current/triggers.html).

**Exercise:** Name one rule that belongs in a table constraint and one task that might reasonably be handled by a trigger.
