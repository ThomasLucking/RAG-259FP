---
title: Principles that keep code maintainable
summary: Explains DRY, KISS, YAGNI and SOLID, and the shared idea that code is read far more than it is written.
tags:
  - programming
  - code-quality
  - design-principles
updated: 2026-03-16
---

## Common shorthand

Developers often reach for an acronym instead of spelling an idea out
every time. DRY stands for Don't Repeat Yourself: the same logic should
live in one place, so a change only has to happen once. KISS, Keep It
Simple, favors the plainest solution that solves the problem over a
clever one. YAGNI, You Aren't Gonna Need It, discourages building a
feature before anyone actually needs it.

SOLID groups five related guidelines for object-oriented design. Two of
the best known are the Single Responsibility Principle, which says a
piece of code should have one reason to change, and the Open/Closed
principle, which favors extending behavior over rewriting it. A related
idea, dependency inversion, asks code to depend on abstractions rather
than on concrete details, keeping modules loosely coupled.

## Why the shorthand exists

These labels get quoted in reviews and design talks because a short tag
travels faster than a paragraph. Behind all of them sits one assumption:
code is read, debugged and modified far more often than it is written
the first time. Repetition, cleverness, and premature flexibility cost
little to write but a lot to revisit later.

Composition and separation of concerns push toward the same outcome by
keeping parts independent and easy to recombine. Fail fast and measure
first add a practical check: surface mistakes early, and confirm a
change is actually needed before spending effort on it.
</content>
</invoke>
