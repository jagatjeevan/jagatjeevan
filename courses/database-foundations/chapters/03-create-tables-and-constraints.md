---
title: 'Create tables with types and constraints'
order: 3
description: 'Use DDL to define a small relational schema and let the database enforce its rules.'
---

## Data definition language

**Data Definition Language (DDL)** changes database structure. `CREATE TABLE` defines a table, `ALTER TABLE` changes one, and `DROP TABLE` removes one. Treat destructive DDL carefully, especially outside a practice database.

The following PostgreSQL schema supports the examples in this course:

```sql
CREATE TABLE customers (
    customer_id  integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name         text NOT NULL,
    email        text NOT NULL UNIQUE,
    created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
    product_id   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name         text NOT NULL,
    price        numeric(10, 2) NOT NULL CHECK (price >= 0),
    active       boolean NOT NULL DEFAULT true
);

CREATE TABLE orders (
    order_id     integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id  integer NOT NULL REFERENCES customers(customer_id),
    ordered_at   timestamptz NOT NULL DEFAULT now(),
    status       text NOT NULL CHECK (status IN ('pending', 'paid', 'cancelled'))
);

CREATE TABLE order_items (
    order_id     integer NOT NULL REFERENCES orders(order_id),
    product_id   integer NOT NULL REFERENCES products(product_id),
    quantity     integer NOT NULL CHECK (quantity > 0),
    unit_price   numeric(10, 2) NOT NULL CHECK (unit_price >= 0),
    PRIMARY KEY (order_id, product_id)
);
```

## Data types and constraints

Choose a type that fits the value. `integer` works for whole-number IDs and counts; `numeric(10, 2)` stores decimal prices exactly to two fractional digits; `boolean` stores true/false; `timestamptz` represents a timestamp with time-zone handling. PostgreSQL's `text` is commonly used for variable-length strings.

Constraints make invalid states harder to store:

- `PRIMARY KEY` makes each row identifiable and non-null.
- `FOREIGN KEY` enforces a valid reference to another table.
- `NOT NULL` requires a value.
- `UNIQUE` prevents duplicates in a column or column combination.
- `CHECK` requires a Boolean condition to hold.
- `DEFAULT` supplies a value when an insert omits the column.

The identity-column syntax and `timestamptz` are PostgreSQL-oriented; other DBMSs may use different spellings or semantics. See [PostgreSQL table creation](https://www.postgresql.org/docs/current/tutorial-table.html) and [constraints](https://www.postgresql.org/docs/current/ddl-constraints.html).

**Exercise:** Add a `discount_percent` column that permits values from 0 through 100. Which type and constraint would you use?
