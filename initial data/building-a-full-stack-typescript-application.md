---
title: Building a full-stack TypeScript application
summary: Explains what full-stack TypeScript adds when a typed client, a typed API, and a relational database share one codebase.
tags:
  - typescript
  - full-stack
  - api
  - postgresql
  - architecture
updated: 2026-01-26
---

A full-stack TypeScript application puts the browser client, the server API,
and the database behind one language and one type system. The interesting
part is not writing TypeScript twice; it is deciding what the client and the
server agree on, and what each layer owns on its own.

## The shared contract between client and server

### One language, different runtimes

The front end runs in a browser and the API runs in a server runtime such as
Bun or Node: separate processes with separate lifecycles. Sharing TypeScript
lets both sides import the same type definitions for requests, responses,
and domain entities, so a renamed field on the server surfaces as a compile
error on the client instead of a silent mismatch found in production. This
only pays off if the shared types live in a dedicated module treated as a
contract, not as an accidental side effect of importing server code.

### Validation at the boundary

Shared types describe what data should look like, but they disappear at
runtime: a compiled server has no memory of TypeScript's structural checks.
Anything arriving over HTTP — query strings, JSON bodies, path parameters —
must be validated again once it crosses the network boundary.

Schema validation libraries close this gap by describing the same shapes at
runtime and rejecting anything that does not match, with structured error
output the client can display. Every API needs one clear boundary where
untrusted input becomes typed data, and one consistent format for reporting
what failed.

## Layered architecture on both sides

### Routing as the entry point

On the client, a router maps URLs to views and decides what data each view
needs before it renders, which avoids flashes of missing content and keeps
navigation state (filters, pagination, the current record) reflected in the
address bar. File-based routers infer this mapping from the folder structure
itself, turning the file tree into documentation of the application's pages.

On the server, routing maps HTTP verbs and paths to handlers. A handler
should stay thin: parse and validate input, call into a service or
repository layer, then shape a response. Once handlers grow request logic,
business rules, and database queries together, the code becomes hard to
test and hard to reuse from a second entry point such as a background job.

Rather than grouping files by technical type (all routes together, all
models together), many back ends group them by feature: everything related
to one domain concept — its routes, validation schemas, and data access —
lives in one folder, which keeps related changes close together.

### Relational persistence

A relational database enforces structure that application code cannot fully
guarantee on its own: foreign keys keep references valid, constraints reject
impossible states, and a documented schema (defined as SQL data definition
language) is the definitive description of what the application stores,
independent of any particular library used to query it.

Read-heavy views — totals, aggregates, anything sliced by time or category —
are often the slowest part of an otherwise simple schema. Materialised
views precompute such aggregates and refresh them on a schedule or on
demand, trading a small amount of staleness for a query that stays fast as
the underlying tables grow.

## From exercise to a usable product

A tutorial project and a small real product differ less in code volume than
in the seams between layers. A product needs consistent error handling
across every endpoint, pagination on any list that can grow without bound,
and a setup process that lets someone unfamiliar with the code run it
locally without guessing missing steps.

Typing alone does not guarantee any of this: a fully typed application can
still return inconsistent error shapes, skip pagination, or leave the
database schema implicit. The type system removes one category of mistake —
shape mismatches — and leaves the rest, such as choosing what belongs in the
API layer versus the data layer, to the design of the application itself.
