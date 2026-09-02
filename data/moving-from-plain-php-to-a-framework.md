---
title: Moving from plain PHP to a framework
summary: Compares hand-written PHP with a framework's conventions for MVC, routing, templating, an ORM, validation, and dependency injection.
tags:
  - php
  - frameworks
  - mvc
  - web-development
updated: 2026-02-23
---

## Why plain PHP stops scaling

A small PHP site can live in a handful of files: a script reads the
request, touches the database directly, and prints HTML inline. This
works until the project grows, concerns mix together, the same
validation check gets copied across pages, and every developer
invents their own folder layout.

A framework does not add capabilities PHP lacks. It packages answers
to problems every non-trivial app already has: how to organise files,
route a request, and keep data access consistent. The trade is
convention over configuration — the framework picks a default way of
doing things, and the project follows it unless there is a strong
reason not to.

## Structure: MVC, routing, and templating

Hand-written PHP tends to mix logic and markup in the same file
because nothing forces a separation. Frameworks default to the
Model-View-Controller pattern: models hold data and rules, views
render output, controllers connect a request to the right model and
view — a split that pays off once a codebase outgrows a few pages.

Routing replaces the old habit of mapping URLs to files on disk
(`/apartments.php`, `/apartment_edit.php`): a router declares which
controller handles a given URL pattern, including parameters like an
id, instead of scattering that mapping across the file system.

Templating engines, such as Twig or Blade, replace raw `echo` and
mixed HTML/PHP blocks. They escape output by default, closing a
common source of cross-site scripting bugs, and give a shared syntax
for loops, conditionals, and layout inheritance.

## Data: an ORM, migrations, and validation

Talking to a database by hand usually means writing raw SQL strings
and assembling them with concatenation, a direct path to SQL
injection unless every parameter is escaped correctly every time. An
object-relational mapper wraps tables as classes and rows as objects,
builds parameterised queries under the hood, and lets a developer
describe relationships between entities instead of re-deriving joins
by hand.

Migrations solve a related problem, keeping the schema in sync across
machines: instead of running ad hoc SQL against a shared database,
each schema change becomes a small, versioned file that can be
applied or rolled back, so any environment rebuilds the same
structure from scratch. Validation follows the same logic — instead
of checking each form field manually and hoping every entry point
remembers to, the framework states the rules declaratively and
applies them before data reaches the model.

## Dependency injection and the cost of conventions

Frameworks also manage how objects get created and wired together.
Instead of a controller instantiating a database connection or a
mailer directly, a dependency injection container builds those
services once and hands them out, easing swaps and isolated tests.

None of this is free. Conventions someone else chose — folder names,
naming patterns, a way of registering routes — have to be learned
before they help, and constrain choices a hand-rolled script would
leave open. An upgrade can even force changes on code that never
asked to be touched, when it alters a convention that code relied on.

The trade generally favours the framework once an application is
built by more than one person, or expected to live for months: shared
structure lowers the cost of reading someone else's code, at the
price of everyone accepting the same defaults.
