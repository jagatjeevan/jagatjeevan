---
title: 'Transactions, ACID, and concurrent work'
order: 9
description: 'Group related changes into transactions and understand the guarantees they provide.'
---

## A transaction is one unit of work

A **transaction** groups database operations so they can be committed together or rolled back together. Consider recording an order: creating the order and its line items should not leave a half-finished order if one step fails.

```sql
BEGIN;

INSERT INTO orders (customer_id, status)
VALUES (7, 'pending')
RETURNING order_id;

-- Insert the order_items rows using the returned order_id.

COMMIT;
```

If a step fails, the application can issue `ROLLBACK` rather than committing partial work. In application code, use the driver's transaction API and ensure errors trigger rollback.

## ACID properties

- **Atomicity:** all work in a transaction is committed or none of it is.
- **Consistency:** committed changes preserve constraints and application invariants.
- **Isolation:** concurrent transactions are controlled so their effects follow the database's isolation rules.
- **Durability:** committed changes are designed to survive failures according to the DBMS's durability configuration.

Isolation levels, locking, and concurrency behavior vary in detail across systems. Transactions can also hold locks and resources, so keep them focused and avoid waiting for unrelated work while one is open.

![A transaction groups changes and either commits them together or rolls them back](/courses/database-foundations/diagrams/transaction-flow.svg)

The transaction flow illustrates PostgreSQL's documented transaction commands; it is a conceptual view, not a full concurrency or recovery model. See [PostgreSQL: Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html).

**Exercise:** If creating an order succeeds but inserting its second line item fails, what should the application do to avoid leaving an incomplete order?

**Sources:** [PostgreSQL: Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [GeeksforGeeks: DBMS Tutorial — Transactions and Concurrency Control](https://www.geeksforgeeks.org/dbms/dbms/)
