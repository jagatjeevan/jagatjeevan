---
title: 'NoSQL alternatives and scaling choices'
order: 12
description: 'Compare common non-relational models and choose storage around data and access patterns.'
---

## NoSQL is a set of trade-offs

Non-relational databases include several models rather than one interchangeable alternative to SQL:

- **Document stores** represent records as nested documents, useful when related data is commonly read as one unit.
- **Key-value stores** retrieve a value by a key, often for simple, fast lookups.
- **Wide-column stores** organize large datasets around partition and clustering keys.
- **Graph databases** emphasize relationships and traversals between connected entities.

For a document shop order, line items might be embedded because they are typically read with the order. The product catalog may remain separate because product information changes independently and is shared across orders. These choices depend on lifecycle, update patterns, and consistency needs. MongoDB's documentation describes embedding and references as alternative modeling approaches rather than universal rules.

## Decide with requirements

Ask:

1. What are the most common reads and writes?
2. Which facts must remain consistent together?
3. Are relationships and ad hoc queries central?
4. How large is the data, and what availability or latency targets matter?
5. Who will operate backups, replicas, migrations, monitoring, and recovery?

Relational systems also scale in multiple ways. A single server can scale up; replicas can serve some read traffic; partitioning can divide a large table; sharding distributes data across servers but adds routing and operational complexity. NoSQL is not automatically more scalable, and a relational database is not automatically a bottleneck.

Choose the simplest system that meets measured needs. A hybrid architecture can be appropriate, but each datastore increases operational complexity and should have a clear purpose.

**Exercise:** For a chat application, compare a relational model with a document or key-value model for message history. Which query patterns and consistency requirements would drive your choice?

**Sources:** [MongoDB: Data Modeling](https://www.mongodb.com/docs/manual/data-modeling/), [GeeksforGeeks: DBMS Tutorial](https://www.geeksforgeeks.org/dbms/dbms/)
