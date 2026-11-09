---
title: 'Database Foundations: SQL, Design, and Scale'
level: 'Beginner to intermediate'
audience: 'Learners who want to understand databases and build reliable relational data applications'
description: 'Learn database fundamentals, relational modeling, PostgreSQL SQL, transactions, performance, and when NoSQL or scale-out designs fit.'
outcomesHeading: 'What you will learn'
useCasesHeading: 'Where to use these skills'
avoidCasesHeading: 'What this course does not cover'
chaptersHeading: 'Course chapters'
referencesHeading: 'Documentation and further reading'
useCases:
  - 'Design relational schemas for applications with connected records.'
  - 'Write SQL to define, read, create, update, and delete data.'
  - 'Understand transactions, indexes, query plans, and database trade-offs.'
avoidCases:
  - 'This course is not a vendor certification guide or a complete database administration manual.'
  - 'Examples use PostgreSQL; syntax and procedural languages vary across database products.'
outcomes:
  - 'Explain what a DBMS does and compare relational and common NoSQL models.'
  - 'Model entities, keys, relationships, and constraints in a relational schema.'
  - 'Use PostgreSQL DDL and SQL CRUD, joins, aggregates, subqueries, and CTEs.'
  - 'Recognize normalization trade-offs and use transactions to protect multi-step work.'
  - 'Read a basic query plan and explain the costs and uses of indexes.'
  - 'Describe views, functions, procedures, triggers, and common scaling choices.'
references:
  - title: 'PostgreSQL Tutorial'
    url: 'https://www.postgresql.org/docs/current/tutorial.html'
    description: 'First-party introduction to PostgreSQL, tables, queries, joins, aggregates, transactions, and views.'
  - title: 'PostgreSQL documentation'
    url: 'https://www.postgresql.org/docs/current/'
    description: 'Authoritative reference for PostgreSQL SQL syntax, data definition, indexes, and procedural features.'
  - title: 'MongoDB data modeling'
    url: 'https://www.mongodb.com/docs/manual/data-modeling/'
    description: 'Official guidance on document data models, embedding, references, and modeling around access patterns.'
  - title: 'GeeksforGeeks: DBMS Tutorial'
    url: 'https://www.geeksforgeeks.org/dbms/dbms/'
    description: 'A broad topic map covering relational models, normalization, transactions, indexing, architecture, and SQL.'
  - title: 'GeeksforGeeks: What is a Database?'
    url: 'https://www.geeksforgeeks.org/dbms/what-is-database/'
    description: 'User-provided introductory reading; page access was limited during course preparation.'
  - title: 'SQL: Zero to Hero'
    url: 'https://blog.devgenius.io/sql-zero-to-hero-83264f7d71a3'
    description: 'User-provided supplementary reading; only the opening material was accessible during course preparation.'
  - title: 'Introduction to SQL: From Zero to Hero'
    url: 'https://medium.com/@andres.tellez/introduction-to-sql-from-zero-to-hero-f719610d345d'
    description: 'User-provided SQL introduction; portions of the article were accessible during course preparation.'
  - title: 'Learning SQL Zero to Hero'
    url: 'https://www.scribd.com/document/756046824/Learning-SQL-Zero-to-Hero'
    description: 'User-provided reading link; only title and metadata were accessible, so its contents were not used.'
  - title: 'YouTube database learning video'
    url: 'https://www.youtube.com/watch?v=8IuqFU5gw1E&t=3s'
    description: 'User-provided video; no substantive transcript or captions were accessible during course preparation.'
---

This course takes a practical path from database concepts to SQL used in applications. A small shop schema—customers, products, orders, and order items—provides a consistent example across chapters.

The SQL examples target PostgreSQL. Core relational ideas transfer broadly, but data types, identity columns, pattern matching, stored-program languages, and some administrative commands differ by product. The examples use PostgreSQL-specific syntax where needed and call out important portability limits.

No prior database experience is required. Basic comfort reading code and tables is helpful. Follow the chapters in order, try the queries in a local PostgreSQL database, and use the final chapter as a searchable SQL reference.

![A roadmap from database concepts and relational design through SQL, transactions, performance, and scaling](/courses/database-foundations/diagrams/course-roadmap.svg)

The relational-versus-document comparison is informed by the [GeeksforGeeks DBMS topic guide](https://www.geeksforgeeks.org/dbms/dbms/) and [MongoDB's data-modeling guide](https://www.mongodb.com/docs/manual/data-modeling/).
