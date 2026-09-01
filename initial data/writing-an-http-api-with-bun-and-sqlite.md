---
title: Writing an HTTP API with Bun and SQLite
summary: Introduces server-side JavaScript runtimes, HTTP API design, runtime input validation, and persistence with an embedded SQL database.
tags:
  - http
  - api
  - runtime
  - sqlite
  - validation
updated: 2025-12-08
---

## A JavaScript runtime outside the browser

### What a runtime provides

A JavaScript runtime pairs an engine that parses and executes code with a
set of host APIs it can call into. In a browser those APIs cover the page,
the DOM and user events. Outside the browser, a runtime instead exposes
the operating system: opening network sockets, reading files, and
listening for incoming connections — what lets the same language run a
server instead of only a script attached to a page.

### Why this project introduces one

Earlier projects consumed an existing API from the browser; this project is
the first time apprentices write the server themselves, which requires a
runtime able to bind a port and answer requests. Some runtimes also bundle
a package manager, a test runner and TypeScript support, so a project can
start from one install without assembling separate tools.

## Shaping an HTTP API

### Resources, routes and methods

An HTTP API exposes resources, the nouns of the domain, at routes, which
are URL paths. A route combined with an HTTP method describes one action
on a resource: GET reads it, POST creates a new one, PUT or PATCH updates
an existing one, and DELETE removes it. Conventions favour plural resource
names, with a single item addressed by appending its identifier to the
collection's path.

### Status codes and message bodies

Every response carries a status code that summarises the outcome: codes
starting with 2 mean success, 4 mean a problem caused by the request
itself, and 5 mean a failure on the server side. A handful of codes cover
most cases — success, successful creation, no content to return, a
malformed request, a missing resource, an unexpected error. Request and
response bodies are usually JSON, and their shape is a contract that the
rest of an application, such as a frontend, relies on staying stable.

### Validating input at runtime

Static types describe the shape a value should have while the code is
being written, but they disappear once the program runs — nothing stops a
client from sending a body missing a field, or a string where a number was
expected. Because that input crosses a boundary the language cannot see
through, it must be checked explicitly once it arrives: presence, type and
basic constraints, before the value is trusted anywhere else. A request
that fails this check is rejected with a client error and a clear
explanation, rather than allowed to corrupt data further down the chain —
a discipline that matters even in a fully typed codebase, since typing
only protects the code that wrote it, not data arriving from outside it.

## Persisting data in an embedded database

### Why an embedded engine fits this scale

An embedded SQL database runs inside the same process as the application,
storing everything in a single file rather than requiring a separate
server to install, configure and keep running. That removes a category of
setup work — connection strings, credentials, a service to monitor — while
keeping the relational model of tables, columns and SQL queries, a
trade-off that favours simplicity at this project's scale.

### From request to row and back

Underneath the API sits a small, consistent flow: a request arrives, its
body is validated, the handler turns it into a SQL statement, and the
result — a new row, an updated one, or matching rows — is mapped back into
the JSON shape the client expects. Prepared statements keep SQL text and
parameters separate rather than concatenated as a string, avoiding a
common source of injection while being reused efficiently across calls.
Keeping this mapping thin is what lets a hand-rolled API mimic the
behaviour of a previously used external one.
