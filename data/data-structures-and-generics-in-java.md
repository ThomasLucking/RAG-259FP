---
title: Data structures and generics in Java
summary: Overview of Java's static typing, collections framework, generics, and equals/hashCode contracts for apprentices coming from JavaScript.
tags:
  - java
  - data-structures
  - generics
  - oop
updated: 2026-04-07
---

## A statically typed language after JavaScript

Apprentices who start learning Java usually already know JavaScript, a
dynamically typed and interpreted language. Java is compiled and statically
typed: every variable, parameter, and return value has a type that the
compiler checks before the program ever runs. A mismatch is a compile error,
not a runtime surprise discovered in production.

This shift changes how a program is designed. Java code declares classes and
interfaces up front and lets the type system enforce the contract between
them, so the compiler rejects a wrong shape of data long before a test suite
would catch it. Java is also object-oriented in a stricter sense than
JavaScript: every piece of executable code lives inside a class, and an
interface describes a capability — what a type can do — while a class
describes how that capability is implemented.

## Classes, interfaces, and the collections framework

The Java Collections Framework is the standard library's answer to "how do I
store a group of objects". It is organised around a small set of interfaces —
`List`, `Set`, `Map`, and their common ancestor `Collection` — each with
several concrete implementations that trade memory, ordering, and speed
differently.

A `List` keeps insertion order and allows duplicates; `ArrayList` backs it
with a resizable array, while `LinkedList` backs it with linked nodes. A `Set`
guarantees uniqueness; `HashSet` favours fast lookups with no order guarantee,
`TreeSet` keeps elements sorted at the cost of slower inserts. A `Map`
associates keys with values, with `HashMap` and `TreeMap` mirroring the same
trade-off between speed and ordering.

Choosing among these implementations forces a comparison of algorithmic
complexity for the operations that matter — adding, searching, removing —
expressed with big-O notation rather than measured informally.

## Generics and type parameters

Generics let a class or method be written once and reused for any type,
while keeping the compiler's static checks. A `List` declared as
`List<String>` only ever holds strings; the compiler rejects any attempt to
insert something else, and no cast is needed when reading elements back out.

Before generics, collections held plain objects and every read required an
explicit cast, with the risk of a runtime error if the cast was wrong.
Generics move that risk to compile time: a type parameter such as `T` acts as
a placeholder that the compiler fills in with a concrete type at each use
site, so one class definition serves many purposes without losing type
safety. Generic bounds refine this further, restricting a type parameter to
types that share a capability, such as any type that supports comparison.

## Equality, hashing, and building structures by hand

Every Java object inherits two methods worth understanding closely: `equals`
and `hashCode`. The default versions compare objects by memory identity, which
is rarely what a data structure needs when it must recognise two separate
objects as representing the same value.

Hash-based collections such as `HashMap` and `HashSet` rely on a contract
between the two methods: objects considered equal must produce the same hash
code, otherwise lookups silently fail to find entries that are logically
present. Overriding one without the other is a common source of bugs.

Beyond the standard library, implementing a structure by hand — a list, a
stack, or a simple hash table built from an array of buckets — exposes what
the library normally hides: how a resize copies every element, why a good
hash function keeps buckets balanced, and how allocation patterns and memory
locality affect measured performance, not just theoretical complexity.
