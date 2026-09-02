---
title: Defining a database schema with SQL
summary: Covers turning a logical data model into SQL tables, with column types, defaults, and the constraints a database uses to enforce integrity.
tags:
  - sql
  - database
  - ddl
  - constraints
updated: 2026-02-10
---

## From a logical model to a physical schema

Data Definition Language, or DDL, is the subset of SQL used to create and
change the structures that hold data: tables, columns, constraints, and
indexes. It sits downstream of the modeling work that produces entities,
attributes, and relationships on paper, and turning that logical model into
a physical one is mostly mechanical: each entity becomes a table, each
attribute becomes a column, and each relationship becomes a foreign key
linking one table to another. Exact syntax differs slightly between
database systems, so the reference documentation of the system in use
remains the final authority.

A table's shape is rarely fixed forever. Applications evolve, attributes
appear or disappear, which is why altering an existing schema is as much a
part of DDL as creating one from scratch.

## Columns, defaults, and generated values

Choosing a column type is a design decision, not a formality. It affects
storage size, the range of valid values, and how efficiently the database
can compare, sort, or index that column. Common choices include integers,
fixed or variable length character strings, unlimited text, timestamps, and
booleans, alongside more specialized types such as `json` or `jsonb` for
semi-structured data, arrays, ranges, and `uuid` for identifiers that must
stay unique across systems.

A `not null` clause tells the database a column can never be left empty,
closing off a missing value for an attribute the rest of the schema depends
on. A `default` clause supplies a value automatically when a statement does
not provide one, such as `now()` for a creation timestamp. Identity columns
go further: a column declared with `generated always as identity` produces
its own incrementing value, the common way to build a surrogate primary key
without the application inventing one.

## Constraints defend the database's own consistency

Constraints are not documentation of intent; the database itself checks them
on every insert or update and rejects any statement that would break them,
which is what separates a schema from a mere convention held in application
code.

A primary key constraint marks the column, or set of columns, that uniquely
identifies each row, combining uniqueness with a not-null guarantee, and a
table can have only one. A foreign key constraint ties a column to the
primary key of another table, so the database refuses any row pointing to
a parent that does not exist, the mechanism behind referential integrity
between tables.

A unique constraint enforces that no two rows share the same value in a
column, or combination of columns, independently of the primary key, such
as an email address. A check constraint goes further, encoding a business
rule as a boolean expression checked on every insert or update, for example
forbidding a negative price.

Foreign keys also define referential actions for deletion or update of the
referenced row: blocking the operation outright, cascading the change to
dependent rows, or clearing the reference to a null value. Picking the
wrong action can cascade deletions further than intended or leave orphaned
references behind, so it deserves as much thought as the constraint itself.

## Altering a schema that already holds data

An `alter table` statement adds, changes, or drops columns and constraints
on a table that may already contain rows, and existing data constrains what
is allowed: adding a column with a default backfills every existing row
with that value, while adding a `not null` constraint on a column that
already contains nulls fails until those rows are fixed.

Adding a foreign key to an existing table triggers a validation pass over
current rows, so the constraint only takes effect once every existing value
already satisfies it. Dropping a table or a column is destructive, and if
other tables still reference it through a foreign key, the database refuses
the operation until those dependent objects are removed first. The same
mechanism that defends data integrity in a stable schema also slows down
changes that would otherwise corrupt it silently.
