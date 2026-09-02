---
title: A command-line todo list in Rust
summary: Introduces Rust's ownership model, Option and Result, pattern matching, Cargo, and what makes a CLI pleasant to use.
tags:
  - rust
  - memory-safety
  - cli
  - cargo
updated: 2026-05-04
---

## Memory safety without a garbage collector

Rust is a compiled, systems-level language that aims for the performance of
C or C++ without their common source of bugs: manual memory management.
Instead of a garbage collector scanning the heap at runtime, Rust enforces
memory rules at compile time through its ownership system. Every value has
exactly one owner, and when that owner goes out of scope the value is
dropped and its memory freed automatically, with no runtime cost.

Values can be lent out temporarily through borrowing. A borrow can be
read-only (any number of these can coexist) or mutable (only one at a
time, and never alongside a read-only borrow). This rule, checked by the
compiler's borrow checker, prevents data races and use-after-free errors
before the program ever runs.

Lifetimes describe how long a borrowed reference stays valid relative to
the data it points to. The compiler infers them silently most of the
time; they only need to be spelled out when a function signature is
ambiguous about which input a returned reference borrows from. The
practical effect is a compiler that refuses to build code with dangling
references, rather than a runtime crash discovered later.

## Absence and failure as values, not exceptions

Rust has no null pointers. A value that might be missing is wrapped in an
`Option`, which is either `Some(value)` or `None`. A value that might fail
is wrapped in a `Result`, which is either `Ok(value)` or `Err(error)`. Both
are ordinary enums, not special language constructs, and the compiler
forces every case to be handled somewhere before the wrapped value can be
used.

Pattern matching is the idiomatic way to unwrap these types. A `match`
expression lists every possible shape of a value and what to do for
each, and the compiler rejects code that leaves a case unhandled. This
turns runtime surprises — forgetting to check whether a file read
succeeded, or whether a lookup returned anything — into a compile-time
requirement instead of a hidden trap, and it applies just as naturally to
parsing command-line input or converting between data formats. There is
no separate exception hierarchy to learn, and no `try`/`catch` block that
can silently swallow a problem.

## Cargo as build tool and package manager

Cargo is Rust's official build tool and package manager, bundled with the
standard toolchain. `cargo init` scaffolds a new project with a manifest
file describing its name, version, and dependencies. `cargo build` and
`cargo run` compile and execute the project, while `cargo fmt` and
`cargo clippy` enforce consistent formatting and catch common mistakes or
non-idiomatic patterns before they become habits.

External libraries, called crates, are declared in the manifest and
downloaded automatically from the public registry, with exact versions
locked in a separate file so builds stay reproducible. This removes most
of the manual setup other ecosystems still require, and gives beginners
a single, consistent workflow for building, testing, and formatting a
project regardless of its size.

## What makes a command-line tool pleasant to use

A command-line program earns trust through predictable behaviour: clear,
short help text, sensible defaults, and flags that follow common
conventions rather than inventing new ones. Errors should describe what
went wrong and, where possible, how to fix it, instead of printing a raw
technical failure.

Persisting data between runs raises its own small design questions: what
format to store data in, how to handle a missing or corrupted file
gracefully, and how to keep output stable enough to be read by both
humans and other tools. A tool that reports success or failure through
its exit code integrates far better into scripts than one that only
looks right when run interactively.
