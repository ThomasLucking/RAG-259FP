---
title: Functional programming in TypeScript
summary: Covers pure functions, immutability, higher-order functions, composition, and modelling errors as values in TypeScript, with the trade-offs of each.
tags:
  - typescript
  - functional-programming
  - immutability
  - error-handling
updated: 2026-01-12
---

## Pure functions and why mutation gets avoided

A pure function returns a value that depends only on its arguments and
produces no observable side effect: no writes to a shared variable, no
network call, no console output. Given the same input, it always returns
the same output, which makes it easy to test in isolation and reason about
without tracing the rest of the program.

Avoiding mutation is the natural companion to purity. When a function
returns a modified copy of an object or array instead of editing it in
place, callers never have to worry about a reference changing under them.
TypeScript's `readonly` modifier does not enforce this at runtime, but it
lets the compiler catch accidental writes during development.

The cost is real: copying nested structures instead of mutating them
allocates more memory and can hurt performance in hot loops or on large
data sets. Most everyday code never notices the difference; performance-
critical code sometimes trades purity for speed deliberately.

## Higher-order functions, map, filter, reduce

A higher-order function either takes a function as an argument or returns
one. `Array.prototype.map`, `filter`, and `reduce` are the most common
examples in everyday TypeScript: `map` transforms each element, `filter`
keeps elements matching a predicate, and `reduce` folds a collection into a
single value. Together they replace many hand-written loops that mix
iteration logic with business logic.

Composition is the practice of building a complex transformation from
smaller ones, typically with `pipe` or `compose` helpers that chain
single-argument functions left to right or right to left. Small, named
functions are easier to test individually than one long procedure, and a
pipeline reads as a sequence of transformations rather than instructions.

This style is not free of downsides. Chains of `map`/`filter`/`reduce` can
allocate an intermediate array at every step, less efficient than a single
hand-written loop over large collections. Deeply composed pipelines can
also be harder to debug, since a stack trace points at the composition
helper rather than at the step that actually failed.

## Discriminated unions and exhaustive matching

A discriminated union models a value that can be one of several distinct
shapes, each tagged with a literal field such as `kind` or `type`.
TypeScript narrows the type inside a conditional or `switch` branch once
that tag is checked, so each branch only sees the fields that exist there.

Exhaustive matching means every branch of the union is handled and the
compiler proves it. A `switch` with a `default` case that assigns the
unmatched value to a variable typed `never` fails to compile if a new
variant is added later and forgotten in the switch, turning a class of
runtime bugs into a compile-time error.

## Errors as values instead of exceptions

Instead of throwing an exception when an operation can fail, a function can
return a value that represents either success or failure, commonly named
`Result` or `Either`. An `Option` (or `Maybe`) type plays the same role for
absent values, replacing scattered `null` checks with a single type that
the compiler tracks through the rest of the program.

The benefit is visibility: a function's signature states that it can fail,
and the type system forces the caller to handle both cases before using the
result. Exceptions, by contrast, can be thrown from deep inside a call
stack without appearing anywhere in a function's type.

The trade-off is verbosity: every call site that can fail needs an explicit
check, which adds boilerplate next to a plain `try`/`catch` around a whole
block. Calling exception-throwing library code from functions that model
errors as values is a common source of confusion in mixed codebases.
