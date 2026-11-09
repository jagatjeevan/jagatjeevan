---
title: 'Normalization and schema quality'
order: 8
description: 'Reduce avoidable duplication and understand when denormalization is a deliberate trade-off.'
---

## Why normalize?

Storing the same fact repeatedly can create **update anomalies**: a change is missed in some copies, an insert requires unrelated data, or deleting a record accidentally removes a fact still needed elsewhere.

For example, putting customer name and email on every order repeats customer facts. Keeping customers in one table and referencing them from orders provides one authoritative place to update those facts.

Normalization organizes relations around dependencies between attributes. In practical introductory design:

- **First normal form (1NF):** represent each field as an appropriate single value rather than a repeating list of values in one cell.
- **Second normal form (2NF):** be in 1NF and avoid attributes depending on only part of a composite key.
- **Third normal form (3NF):** be in 2NF and avoid non-key facts depending transitively on another non-key fact.

## Apply the idea

Suppose a single order table repeats `customer_email`, `customer_name`, `product_name`, and `quantity` for every line item. Separate the entities into `customers`, `orders`, `products`, and `order_items`. Keep order-specific facts, such as the purchased `unit_price`, on `order_items`: it records the price at the time of the sale, not necessarily today's product price.

Normalization is a design tool, not a goal to maximize blindly. Some systems intentionally duplicate or precompute data to optimize common reads; that denormalization adds a responsibility to keep copies consistent.

**Exercise:** A table stores a student's name and course name on every enrollment row. Identify a likely update anomaly and propose a set of tables that avoids it.

**Sources:** [GeeksforGeeks: DBMS Tutorial — Normalization](https://www.geeksforgeeks.org/dbms/dbms/), [PostgreSQL: Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
