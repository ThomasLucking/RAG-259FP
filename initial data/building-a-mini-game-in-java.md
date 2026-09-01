---
title: Building a mini game in Java
summary: Why a small turn-based game is a natural exercise for object modelling, covering game loops, state, class design, and separating rules from display.
tags:
  - java
  - oop
  - software-design
  - game-development
updated: 2026-04-20
---

## Why a game is a convenient modelling exercise

A small interactive game packs a full domain into a manageable size. It has
actors with attributes, actions that change those attributes, rules that
decide what is allowed, and a sequence of turns presented to a user. Each of
these pieces maps naturally onto an object-oriented concept, which is why
games recur as an exercise for learning object-oriented programming (OOP)
rather than being a niche topic on their own. Unlike a web form or a data
pipeline, a game has behaviour that unfolds over time and depends on prior
state, which forces a design to deal with mutable state deliberately: a
design that looks fine for one turn often breaks down once several turns
interact.

## Game loop and state

Most simple games share the same skeleton: read input, update the state,
render the result, check whether the game has ended, and repeat. This loop
is the backbone of the program and is usually the first piece written, even
before any domain classes exist, because everything else plugs into it.

The state is whatever must persist between iterations of the loop: a
player's health, an opponent's status, an inventory, a turn counter. Keeping
this state in a small number of well-defined objects, instead of scattered
local variables, is what makes the loop easy to reason about. A common
mistake is letting the loop itself accumulate logic that belongs to the
domain, such as damage formulas or victory conditions: the loop should
orchestrate, and the domain objects should decide.

## Turning domain concepts into classes

A character, an item, or a spell are natural candidates for classes: each has
data (attributes) and behaviour (what it can do). Encapsulation means keeping
that data private and exposing only the operations that make sense, so a
health value cannot be set to an invalid number from outside the class.

When several character types share behaviour but differ in details, the
design has to choose between inheritance and composition. Inheritance suits
subclasses that are genuine specialisations of a shared concept, for example
several fighter classes sharing an attack method but computing damage
differently. Composition suits a capability that is optional or shared
across unrelated types, such as attaching a status effect to any character
regardless of its class. Favouring composition when the relationship is not
a strict "is-a" avoids brittle hierarchies that break as a new combination
appears.

Polymorphism ties the two together: code that resolves a turn calls the same
method on any combatant and lets each concrete class supply its own
behaviour, without a chain of conditionals checking the character's type.

## Input handling and separating rules from display

A text-based game still needs an input boundary: code that reads what the
player typed and translates it into an action the domain understands.
Keeping that translation separate from the rules means the rules can be
tested without a terminal attached, and the input layer can reject or
re-prompt on malformed input without touching game logic.

The same separation applies to output. Domain classes should describe what
happened — an attack landed, a character fainted — without deciding how it
is printed; a dedicated presentation piece turns those facts into text. A
domain model that does not know how it is displayed is easier to change or
reuse elsewhere. Abstraction pulls these boundaries together: hiding the
mechanics of combat resolution behind a simple method call keeps the loop,
the input handler, and the display code short and focused on their own
concern.
