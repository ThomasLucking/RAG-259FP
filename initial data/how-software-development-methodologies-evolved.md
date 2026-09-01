---
title: How software development methodologies evolved
summary: Traces how teams have organised the building of software, from sequential planning through agile and DevOps to specification-driven work with AI.
tags:
  - methodology
  - agile
  - devops
  - software-engineering
updated: 2026-03-02
---

## Organising work before the code exists

Software projects inherited their earliest planning models from physical
engineering. Building a bridge or a house rewards front-loaded certainty:
architects settle every design decision before construction starts, because
changing a poured foundation is expensive. Early software teams borrowed that
logic wholesale.

### The sequential answer

The waterfall model formalises this instinct. A project moves through fixed
phases — requirements, design, implementation, testing, deployment — each one
completed and signed off before the next begins. The underlying assumption is
that every requirement can be known in advance, so the whole effort reduces to
executing a plan correctly.

### Why the sequence broke

Software resists that assumption because it stays malleable long after
release, and the people who commission it discover what they actually want
only once they see something running. In waterfall, that discovery arrives at
the testing phase, when returning to the design stage means reopening work
declared finished months earlier. The cost of a late change grows with every
phase it has already passed through, which is the opposite of what a
business needs from a system it expects to keep changing.

## Learning to change direction mid-project

### Iterative and incremental development

Object-oriented programming gave teams a technical reason to reconsider the
sequence: components could be built, tested, and replaced independently
instead of as one procedural block. Iterative and incremental methods used
that modularity to split a project into a series of smaller cycles, each one
producing a working slice of the system rather than a single artefact at the
very end. A misjudged requirement now surfaces after weeks, not years.

### The agile turn

The Agile Manifesto of 2001 turned that practice into an explicit set of
values, reacting directly against the paperwork and rigidity of waterfall. It
favours working software over exhaustive documentation, collaboration with
the customer over fixed contracts, and responding to change over following a
plan drafted before anyone had evidence. Frameworks such as Scrum or Extreme
Programming organise this around short iterations, typically a few weeks
long, closing with a review of what was actually built.

### Delivery becomes continuous

Agile shortened planning cycles, but shipping still often depended on manual,
error-prone release procedures that could not keep pace with weekly or daily
iterations. DevOps addresses that mismatch by folding operations into the
development cycle itself: automated pipelines build, test, and deploy each
change, and infrastructure is defined and versioned like code. Continuous
integration and continuous delivery make "released" a routine event rather
than a project milestone, so the bottleneck moves away from deployment and
back toward deciding what should change next.

## Organising work for an AI collaborator

### From code-first to specification-first

AI coding assistants can produce large volumes of code in seconds, which
exposes a different failure mode: code generated without architectural intent
accumulates as debt just as fast as it appears, a pattern sometimes called
"vibe coding". Specification-driven development answers this by treating a
written specification, not the code, as the source of truth. Humans describe
intent and constraints in natural language; an agent turns that description
into a technical plan and then into code.

### The developer as orchestrator

When a specification changes, the response is not to patch the generated
code by hand but to update the specification and regenerate from it. This
shifts the developer's role away from writing syntax and toward defining
outcomes and constraints precisely enough for an agent to act on, a posture
sometimes described as intent-driven development. Each stage in this
sequence answers the same underlying question — how to organise the building
of software — differently, because each one reacts to what broke in the
answer that came before it.
