---
title: Practising test-driven development with katas
summary: Explains the red-green-refactor cycle, why TDD is a design technique rather than a testing technique, what a unit is, and what a kata is.
tags:
  - testing
  - tdd
  - software-design
  - katas
updated: 2026-07-06
---

## The red-green-refactor cycle

Test-driven development inverts the usual order of writing software: a
developer writes a test expressing one requirement first, watches it
fail, then writes the code that satisfies it. The cycle repeats one
requirement at a time and is named after its three phases.

### Red: a test that has never failed proves nothing

The first phase is to write one test and run it before any implementation
exists, expecting it to fail for the reason expected, not a typo or a
missing import. Skipping this step, by writing test and code together and
running the test only once, removes the one piece of evidence that
matters: a test never seen failing could pass for the wrong reason.

### Green: the smallest code that makes it pass

Once a test fails for the right reason, the next step is to make it pass
with as little code as possible: a hardcoded return value or an
obviously naive implementation both count as legitimate answers, as long
as the whole suite goes green. The discipline is temporary, since each
later requirement adds its own failing test and forces the code to
generalize step by step rather than anticipating every case upfront.

### Refactor: improving structure under a safety net

With the test passing, the developer decides whether the code just
written needs restructuring. Refactoring changes internal structure
without changing observable behavior, and the existing tests make that
safe: a broken refactor fails a test immediately instead of surfacing
later as a bug. Not every green step needs one; the decision weighs
whether the code has grown harder to read before the next requirement.

## TDD as a design technique

Test-driven development is often introduced as a way to obtain test
coverage, but that framing undersells what the practice changes: writing
the test before the code forces a decision about what the code should do,
as observable behavior, before any decision about how it is implemented.

### Why the order of decisions matters

Deciding behavior before implementation tends to produce smaller
functions, clearer names, and fewer branches that no requirement asked
for. A test written after the code, by contrast, tends to describe
whatever the code already does, including behavior nobody intended. Many
teams require tests before code mainly for this design pressure,
independently of the resulting coverage.

### What a unit actually is

A "unit test" is often misread as "a test for one function" or "a test
for one class," producing suites tightly bound to internal structure
that break on every refactor even when observable behavior has not
changed. A unit is better understood as a coherent piece of behavior
reached through a public entry point, regardless of how many functions
cooperate behind it: what triggers a new test, not what triggers a new
function, is what keeps a suite stable while structure keeps evolving.

## Katas as a practice format

A kata is a short, well-known exercise, borrowed from martial arts
training, solved for the sake of practising a movement rather than the
value of the result. In software, a kata typically has no infrastructure,
no interface, and a small, self-contained statement.

### Isolating the cycle from everything else

Removing infrastructure and interface concerns is deliberate: a kata
gives a developer nothing else to think about besides writing a failing
test, making it pass minimally, and refactoring before the next
requirement. Because the problem is often solvable in minutes without
any discipline at all, the value of a kata lies entirely in the cycle
practised while solving it, not in the resulting code.
