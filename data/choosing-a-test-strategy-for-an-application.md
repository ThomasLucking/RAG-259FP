---
title: Choosing a test strategy for an application
summary: Surveys the levels of automated testing, their cost and speed trade-offs, and how to justify a test level instead of testing everything everywhere.
tags:
  - testing
  - software-engineering
  - test-strategy
updated: 2026-07-20
---

## The levels of automated testing

Automated tests are grouped by what they exercise: a unit of logic, a
slice of the system through its real boundaries, an interface component,
or a whole user journey through a browser. Each level asks a different
question and answers it at a different price.

### Unit tests

A unit test targets a small piece of logic in isolation, typically a
function or a class, with no database, network or file system. It runs
in milliseconds and, when it fails, points at almost exactly the wrong
line. Unit tests suit code with real branching — calculations, validation
rules, state transitions — where the answer depends on conditions
combining in specific ways.

### Functional or integration tests

A functional test, also called an integration test, exercises a slice of
the system through a real boundary: a request against a real API backed
by a real database, rather than mocked pieces. It answers a different
question than a unit test — not "is this rule correct" but "do these
parts work together the way they are wired in production". It runs
slower, needs its own prepared data, and should leave no state behind
that changes how a later run behaves.

### Component tests

A component test targets a piece of a user interface through what a
person can see and do with it, rather than through its internal
structure. It renders the component, then queries it the way a user
would find it — by visible text, label or role — which keeps it stable
when markup changes and fragile only when behaviour changes.

### End-to-end tests

An end-to-end test drives a real browser through a real interface, over
a real network call, against a real backend and database. It is the most
faithful reproduction of a user's experience, and also the slowest and
least specific: a failure says "something in this journey is broken"
without saying where. Because of that cost, end-to-end suites stay small
and cover only journeys that justify a slow, occasionally flaky test.

## Choosing between levels

None of the four levels replaces another; a suite built entirely out of
one kind fails in a predictable way. Moving toward an end-to-end test
buys realism and gives up speed, so verification is usually pushed to
the cheapest level that can express the behaviour. Teams disagree on the
exact distribution — some favour many unit tests, others concentrate on
the integration layer — but the disagreement is about proportion, not
about needing every level.

### Honest faking

A test double replaces a real dependency with a stand-in: a stub
returning a fixed answer, a mock recording how it was called, a fake
implementing a simplified working version, or a spy observing the real
thing. Faking is honest when it replaces something genuinely outside the
scope of the test — a third-party service, the passage of time — and
dishonest when it replaces the very thing the test claims to verify.

### What coverage does not tell you

A coverage percentage says which lines executed while the suite ran; it
says nothing about whether the assertions were meaningful, or whether
the right behaviour was checked at all. Code can be fully covered and
still wrong, since a line can run without anyone asserting what it
should have produced. Coverage helps find unused code, and is a poor
target to chase for its own sake.

### Justifying a level rather than testing everywhere

Testing every behaviour at every level is not thoroughness; it is
duplicated cost with no added confidence, leaving the suite slow and
brittle without being more trustworthy. A defensible strategy states,
for each behaviour, which single level is best placed to catch its
regressions, and why the others would miss it or cost more than the
risk they protect against — and it means deleting a test once it stops
paying for the time it costs on every run.
