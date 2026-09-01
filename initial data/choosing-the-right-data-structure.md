---
title: Choosing the right data structure
summary: Frames data structures as trade-offs between operations, covering sequences, stacks, queues, hash maps, sets, trees, and graphs.
tags:
  - data-structures
  - algorithms
  - programming
updated: 2026-04-01
---

## Why the choice matters

A data structure organizes data in memory so a program can store, find, and
update it. No structure is good at everything: each one makes some
operations fast by making others slow. Picking one means deciding which
operations a program performs most often, and accepting the cost of the
rest.

The choice rarely changes whether a program produces the right answer. It
changes how well the program behaves as the amount of data grows: a
structure that feels instant with a handful of records can become the
bottleneck once the same code runs against thousands or millions of them.

Comparing structures usually comes down to four operations: reading an
element, searching for a value, inserting one, and removing one. A structure
fast at one of these is often slow at another, and that pairing matters more
than memorizing any single structure in isolation.

## Sequences, stacks, and queues

A sequence keeps items in a specific order and is read either by position or
by walking through it from one end. A contiguous sequence gives instant
access to any position, since the location of each item can be computed
directly, but inserting or removing in the middle is costly because every
later item has to shift. A linked sequence trades that away: adding or
removing at an end is cheap, since only a couple of references change, but
reaching an arbitrary position means following links one at a time from the
start.

Stacks and queues restrict access further, which is what makes them useful.
A stack exposes only the most recently added item, so work is handled
last-in, first-out; it fits problems that backtrack, undo a step, or track
nested work. A queue exposes only the item that has waited longest, so work
is handled first-in, first-out; it fits problems that must process things in
arrival order, such as scheduling tasks or exploring connections level by
level. Both give up access to the middle of the collection for operations at
the ends that stay cheap no matter how large the collection grows.

## Hash maps and sets

A hash map answers a different question than a sequence does: not "what is
at this position" but "what value is attached to this key." Given a
well-distributed hash function, a hash map finds, adds, or removes an entry
in roughly constant time, regardless of how many entries it holds. The
trade-off is order: iterating over a hash map does not reproduce insertion
order or any sorted order, and a poorly chosen hash function can degrade
every operation at once.

A set is close to a hash map without values: it exists only to record
whether something belongs to a collection. It answers membership questions
quickly and removes duplicates by construction, which makes it a natural fit
whenever a program needs to know "has this been seen already" without caring
about order or position.

## Trees and graphs

Trees and graphs model relationships that a flat sequence cannot express:
hierarchy, an order that must stay sorted, or connections that do not form a
straight line. A balanced tree keeps its elements sorted at all times and
finds, inserts, or removes an element in logarithmic time. That is slower
than a hash map for a plain lookup, but a tree can answer questions a hash
map cannot, such as finding the smallest element or every element within a
range.

A graph generalizes further by connecting items without imposing hierarchy
at all. It fits naturally whenever relationships form a network rather than
a line or a branching structure, such as connections between people,
locations, or dependent tasks. Its operations are usually described by the
cost of traversing connections, because the interesting questions concern
paths and connectivity, not retrieval of one item.
