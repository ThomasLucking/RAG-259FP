---
title: First steps with JavaScript
summary: Introduces JavaScript as the training's first scripting language for the browser, covering values, functions, control flow and the DOM.
tags:
  - javascript
  - programming-fundamentals
  - dom
  - web-development
updated: 2025-10-20
---

## Why JavaScript comes after Bash, HTML and CSS

By the time apprentices meet JavaScript, they have already written Bash
scripts and built static pages with HTML and CSS. That order matters: Bash
gives a first taste of variables, conditions and loops outside any browser,
while HTML and CSS describe structure and appearance without behaviour.
JavaScript is the piece that turns a static page into something a visitor
can interact with, so it only makes sense once the page itself exists.

JavaScript's syntax differs noticeably from Bash, using curly braces,
semicolons and a C-like structure for functions and blocks. Apprentices
often notice its logical structure — conditionals, loops, functions — feels
closer to languages like Rust than to Bash, even though the surface syntax
differs again. The core ideas of programming carry over; the notation does
not.

## Values, types and variables

JavaScript is dynamically typed: a variable's type is decided by the value
it holds, not by a declaration. The main primitive types are numbers,
strings, booleans, `null` and `undefined`, plus the special value `NaN` for
failed numeric operations. Variables are declared with `let` or `const`,
the latter preventing reassignment; the older `var` keyword still exists
but behaves less predictably with scope.

Type coercion is a frequent source of confusion for beginners: JavaScript
will often convert values implicitly when comparing or combining them with
different types. Understanding when the language coerces values, and when
to compare strictly, is one of the first habits the fundamentals build.

## Functions, control flow and collections

Functions are first-class values in JavaScript: they can be assigned to
variables, passed as arguments, and written either as named declarations or
as arrow functions with a lighter syntax. This flexibility is central to
how JavaScript later expresses interactivity, since many browser events are
simply handled by passing a function.

Control flow relies on the familiar building blocks of conditionals and
loops, plus array methods that iterate without an explicit loop keyword.
Arrays hold ordered lists of values, while objects group related data under
named keys; together they cover most of the data shapes a beginner program
needs, from a list of numbers to a record describing one entity.

## The DOM as the bridge between a script and a page

The Document Object Model, or DOM, is the browser's live representation of
an HTML page as a tree of objects. JavaScript reads and modifies this tree
to change text, styles, attributes and structure after the page has
loaded, which is what makes a page reactive instead of static.

Manipulating the DOM introduces apprentices to events: a script can attach
a function to a click, an input change or another user action, and that
function runs only when the event occurs. This event-driven style is a
shift from straight top-to-bottom execution, and it is usually the first
time apprentices see code that waits for something to happen rather than
running immediately.

Because the DOM connects a script to visible, clickable results, it is
often where the abstract fundamentals — variables, functions, conditionals
— start to feel concrete, since every change to the tree is immediately
visible on the page.
