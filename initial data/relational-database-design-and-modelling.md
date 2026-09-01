---
title: Relational database design and modelling
summary: Explains why relational storage beats plain files, the relation and key concepts behind it, and how modelling turns entities into tables.
tags:
  - databases
  - data-modelling
  - sql
updated: 2026-02-02
---

## Why a relational structure

### Files and ad hoc storage

Storing information in plain files or spreadsheets works until several
pieces of data must stay consistent with each other. A change in one
place can silently leave a duplicate untouched elsewhere, and queries
combining facts from different files need manual, error-prone
matching.

A relational database management system removes that risk by
enforcing a schema, a fixed structure every inserted row must satisfy.
A well-designed schema makes the system itself refuse inconsistent
data, instead of relying on discipline from whoever enters it.

### The relation, the tuple, and the key

The relational model organizes data into relations, commonly called
tables. Each relation holds tuples, the individual rows, and every
tuple carries a value for each attribute, the columns, defined for
that relation. Sharing the same attributes across all tuples is what
makes the data queryable as a set.

A key is one attribute, or a small combination of them, whose values
never repeat within a relation. It lets one tuple be pointed at
precisely, and it is the mechanism relationships between relations
rely on.

## From concepts to tables

### Entities, relationships, and cardinality

A conceptual model captures the subject matter in business terms
before any table exists. It identifies entities, the things worth
tracking such as a student or a course, their attributes, and the
relationships connecting them, independently of any database product.

Cardinality states how many instances of one entity can relate to how
many instances of another: one-to-one, one-to-many, or many-to-many.
Deciding it forces precise questions, such as whether a course can
have several instructors, and getting it wrong forces a costly
redesign later.

### Primary and foreign keys

The logical model translates the conceptual one into tables, columns,
and explicit keys, still independent of any particular engine. Each
table needs a primary key, an identifier both unique and stable over
time; a generated identifier is usually preferred over a natural
value, such as an email address, because natural values can change.

Relationships become foreign keys: a column in one table holding the
primary key value of a related row, letting the system enforce that a
reference always points to something that exists, a property called
referential integrity. A many-to-many relationship needs a junction
table carrying a foreign key toward each side.

## Normalisation as a safeguard

### Redundancy and the anomalies it causes

Repeating the same fact in more than one row, or more than one table,
opens the door to anomalies. An update to one copy can leave the
others outdated, an insertion can be blocked by unrelated missing
data, and a deletion can erase information unrelated to the row being
removed. Normalisation is the set of rules guiding how tables are
split so each fact is recorded once, attached to the key it depends
on, and it is a direct response to these anomalies rather than an
aesthetic preference.

### Modelling as a series of decisions

A diagram is only the visible trace of modelling, not its substance.
The real work is a sequence of decisions: whether something is an
entity or an attribute, whether a relationship needs its own table,
which candidate key is trustworthy enough to become primary, and how
far normalisation should go before it starts complicating queries.

Those decisions follow from the questions the database must answer
and from how the data behaves, not from the notation used to draw
boxes and lines. Two models can look alike on paper and behave very
differently once real data meets them.
