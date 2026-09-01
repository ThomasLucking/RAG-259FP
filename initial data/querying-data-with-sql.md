---
title: Querying data with SQL
summary: Explains SELECT projection, filtering, ordering, joins, aggregation with GROUP BY and HAVING, subqueries, and how INSERT, UPDATE and DELETE change data.
tags:
  - sql
  - queries
  - joins
  - aggregation
updated: 2026-02-17
---

## Reading data with SELECT

SQL is a declarative language: a query describes the result that is
wanted, not the steps needed to compute it. The database engine decides
how to scan, filter, and combine rows to produce that result.

### Projection and filtering

The `select` statement retrieves rows from one or more tables. Listing
column names instead of the wildcard `*` is called projection: the
result keeps only the columns of interest. The `where` clause then
keeps only rows meeting one or more conditions, combined with `and`
and `or`, and this filtering happens before any grouping.

### Ordering and limiting

Without an explicit `order by`, the database is free to return rows in
any order, including one that changes between runs. Sorting by one or
more columns, ascending or descending, makes the result predictable,
and combining `order by` with `limit` answers questions such as "the
ten most recent records".

## Combining and summarizing data

### Joins and their kinds

Real schemas spread related data across tables linked by foreign keys.
A join recombines that data using an `on` condition matching rows
between two tables. An inner join keeps only matches on both sides; a
left or right join also keeps unmatched rows from one side, filling
the other with nulls; a full outer join keeps unmatched rows from both.

### Grouping with GROUP BY and HAVING

Aggregate functions such as `count`, `sum`, `avg`, `min`, and `max`
collapse many rows into one value. The `group by` clause defines which
rows are grouped together before an aggregate applies, for example one
group per department, and `having` then filters on that aggregated
result, whereas `where` filters raw rows before grouping happens.

### Subqueries

A subquery is a `select` nested inside another query, used where a
single value, a list of values, or a whole table would otherwise
appear. It lets a query reference an intermediate result, such as an
average or a matching set of rows, without computing it separately
first, appearing in the filter, the column list, or in place of a
table.

### Putting it together

The clauses above compose into one query, joining tables, filtering,
aggregating per group, and ordering the result, as shown below.

```sql
-- for each department, total salary of employees hired since 2015,
-- restricted to departments with more than five such employees
select
  department.name as department_name,
  count(employee.id) as employee_count,
  sum(salary.amount) as total_salary
from department
-- bring in the employees of each department, then their salary rows
join employee on employee.department_id = department.id
join salary on salary.employee_id = employee.id
-- keep only employees hired in the last decade
where employee.hire_date >= '2015-01-01'
-- one group per department; aggregates apply within each group
group by department.name
-- filter on the aggregate itself, not on individual rows
having count(employee.id) > 5
-- highest-paying departments first, top ten only
order by total_salary desc
limit 10;
```

## Changing data: INSERT, UPDATE and DELETE

Besides reading data, SQL also changes it. The `insert into` statement
adds new rows, naming the target columns and supplying matching values.
The `update` statement changes existing rows, setting new values for
whichever rows a `where` clause selects, and `delete from` removes rows
chosen the same way; omitting the `where` clause on either statement
applies the change to every row in the table.
