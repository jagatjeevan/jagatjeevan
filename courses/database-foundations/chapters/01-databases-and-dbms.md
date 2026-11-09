---
title: 'Databases, DBMSs, and data models'
order: 1
description: 'Understand what a database system does and how relational and NoSQL models differ.'
---

## Database versus DBMS

A **database** is an organized collection of data. A **database management system (DBMS)** is the software that stores, retrieves, protects, and coordinates access to that data. PostgreSQL, MySQL, and SQL Server are relational DBMSs; MongoDB and Redis are examples of non-relational systems with different data models.

An application normally sends requests to a DBMS rather than manipulating database files directly. The DBMS enforces rules, manages concurrent work, and provides a query language or API.

## Relational and non-relational models

Relational systems organize data into tables of rows and columns. Tables can be connected through keys, and SQL describes the data to retrieve or change. This is a strong fit when relationships and integrity rules are central.

“NoSQL” is an umbrella term, not one single model. Document databases store nested documents; key-value stores retrieve values by key; wide-column and graph databases organize data in other ways. These systems can be useful for particular access patterns, but they still require deliberate modeling and consistency decisions.

| Question | Relational example | Document example |
|---|---|---|
| How is an order represented? | An `orders` row plus related `order_items` rows | An order document may embed its line items |
| How are related records connected? | Primary and foreign keys, queried with joins | Embedded values or references, depending on access patterns |
| When is the model attractive? | Shared entities, constraints, and flexible relationships | Data commonly read together with a known document shape |

Neither model is universally better. Start from the application’s data, integrity requirements, and common reads and writes—not a database trend.

## Application architecture

A common three-tier design has a client, an application service, and a database server. The application service validates requests and applies business rules; the database persists and protects shared data. In a simpler two-tier setup, a client connects more directly to the database. Keeping credentials and authorization checks in a trusted service is generally preferable for public-facing applications.

**Check your understanding:** Is a spreadsheet file itself a DBMS? Which part of a three-tier application is responsible for connecting user actions to database queries?

**Sources:** [GeeksforGeeks: DBMS Tutorial](https://www.geeksforgeeks.org/dbms/dbms/), [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html), [MongoDB: Data Modeling](https://www.mongodb.com/docs/manual/data-modeling/)
