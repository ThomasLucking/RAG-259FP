---
title: Adding types to JavaScript with TypeScript
summary: How TypeScript's type system - annotations, inference, interfaces, unions, and generics - helps catch mistakes before code runs, and how those ideas apply inside a browser application.
tags:
  - typescript
  - javascript
  - type-system
  - web-development
updated: 2025-11-05
---

## Why a type system matters

JavaScript only reports many mistakes once a bad line actually runs:
calling a method that does not exist, or passing a string where a number
was expected. TypeScript adds a layer on top of JavaScript that checks
these assumptions before the program executes, by describing the shape of
values ahead of time.

### Annotations and inference

Developers can write an explicit type next to a variable, a parameter, or
a return value, but in many cases this is unnecessary: TypeScript infers a
type from how a value is initialized. A variable set to a number literal
is treated as a number from then on, and assigning it a string later
becomes an error. Explicit annotations stay useful on function signatures,
since parameters have no initial value to infer from.

### Interfaces and type aliases

Object shapes are described with an interface or a type alias, both
naming a structure once so it can be reused across a codebase. An
interface lists the properties an object must have, including optional
ones and methods. Type aliases can additionally describe unions, tuples,
or primitive shortcuts. Editors use these descriptions to offer accurate
autocompletion and to flag a missing or misspelled property immediately.

### Unions, literal types and narrowing

A value often has more than one legitimate shape, such as a function
argument accepting either a string or a number. Union types express this
directly, and literal types narrow it further by allowing only specific
values, such as one of three named statuses. Because a union hides which
branch is active, the code must check first, typically with a `typeof` or
equality test; this narrowing tells the compiler which type applies
inside each branch.

### Generics, strict mode and compilation

Some functions work the same way regardless of the type they operate on,
such as one that wraps a value in an array. Generics let a function or
type alias take a type parameter, filled in wherever it is used, so one
definition covers every case while the compiler still enforces
consistency between calls.

TypeScript is never run directly by a browser or Node.js; a compiler
turns it into plain JavaScript first, discarding the type information
since it only helped during development. Strict mode is a group of
compiler settings that closes common gaps, such as forbidding implicit
`any` types, and is usually enabled from the start of a project, since
retrofitting it onto a large untyped codebase is far more disruptive.

## Typing a browser application

The same ideas apply once a project moves from small exercises to a full
front-end application, with the added constraint that the code interacts
with a DOM that TypeScript cannot fully predict.

### Modules as the unit of organization

A browser application is usually split into modules, each exporting a
focused set of functions, types, or constants. Modules keep related
declarations together and make dependencies explicit through import
statements, rather than relying on globals shared across script tags.
Typed exports let importing code see the correct shapes immediately,
without inspecting the module's implementation.

### Separating state from rendering

A common pattern keeps the application's data - the list of items, their
status, filters applied - in plain typed objects, separate from the
functions that turn that data into HTML. Rendering functions read the
state and update markup, but never hold state themselves, which makes
changes easier to reason about since one typed structure describes
everything the interface currently reflects.

### Typing the DOM access

Browser APIs return values whose precise type is not always known in
advance: selecting an element by id returns a type covering any possible
element, not the specific one expected. Developers narrow this down with
a type assertion or a runtime check before using element-specific
properties, so the compiler can confirm that reading an input's value or
listening for a click matches the actual element involved.
