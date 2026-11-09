---
title: 'The relational model and relationships'
order: 2
description: 'Turn real-world concepts into related tables with keys and clear relationship rules.'
---

## From entities to tables

Begin by identifying the things the application needs to remember. In a shop, **customers**, **products**, and **orders** are entities. Each entity has attributes: a customer has a name and email; a product has a name and current price.

A table represents one kind of entity, a row represents one record, and a column represents one attribute. A **primary key** identifies a row. A **foreign key** points from one table to a key in another table, expressing a relationship and allowing the database to enforce that the referenced row exists.

![Customers place orders; orders contain order items that reference products](/courses/database-foundations/diagrams/shop-relationships.svg)

The diagram's one-to-many relationships follow the relational modeling and foreign-key concepts in the [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial-fk.html).

## Relationship patterns

- **One-to-one:** one account has one profile. A unique foreign key can enforce this.
- **One-to-many:** one customer can place many orders. Put the customer key on each order.
- **Many-to-many:** an order can contain many products, and a product can appear in many orders. Represent the relationship with a linking table such as `order_items`.

The linking table can also hold facts about the relationship, such as the quantity and price captured when a product was purchased. This is why `order_items` is more than a technical bridge.

## Keys and good identifiers

Use a key that is stable and unique. A generated numeric identifier is convenient for internal references; a real-world attribute such as email can still have a `UNIQUE` constraint when the business rule requires it. Do not assume a customer's email or name will never change.

**Exercise:** Sketch tables for a library with books, authors, and loans. Which relationship needs a linking table if a book can have multiple authors?

**Sources:** [PostgreSQL: Foreign Keys](https://www.postgresql.org/docs/current/tutorial-fk.html), [GeeksforGeeks: DBMS Tutorial](https://www.geeksforgeeks.org/dbms/dbms/)
