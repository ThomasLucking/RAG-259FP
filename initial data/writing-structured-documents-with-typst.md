---
title: Writing structured documents with Typst
summary: Explains Typst's markup and code modes, templates, set/show rules, figures and bibliographies, and why plain-text documents suit version control.
tags:
  - typst
  - typesetting
  - templates
  - version-control
updated: 2025-10-13
---

Typst is a markup language for composing documents, with a compiler written
in Rust that recompiles a file in a fraction of a second. Unlike a word
processor, the document is plain text: visible content and the styling
rules that shape it live in the same file, written as source code rather
than clicked through in a graphical interface.

## Content and code as one language

### Markup and code modes

By default, a Typst file is read in markup mode: headings, bold text, lists
and paragraphs use lightweight symbols meant for the actual content a
reader sees, without instructions on layout. A second mode, entered with a
`#` prefix, switches the parser into a small programming language with
variables, loops, conditionals and function calls. The two modes interleave
freely, so a paragraph can drop into code mode for one computed value and
return to prose immediately after.

### Math mode

A third mode, delimited by `$`, is dedicated to mathematical notation.
Symbols are typed as they are pronounced rather than through verbose
commands, fractions and enlarged brackets are inferred from the expression,
and single-letter variables are italicised automatically. Typesetting
formulas is common enough in technical writing to deserve its own syntax
rather than being bolted onto markup mode.

## Separating content from presentation

### Set and show rules

Two keywords control how a document looks without touching its content. A
`set` rule changes the default parameters of an element type, such as the
font used for all text or whether paragraphs are justified. A `show` rule
instead replaces or decorates every occurrence of an element, for example
turning headings uppercase or changing how links render. The distinction
matters: `set` adjusts a value, `show` changes a behaviour, and both apply
globally from the point they are declared.

### Functions and templates

A function can do more than return a small piece of formatted text: it can
wrap an entire document body, applying margins, fonts, headers and page
numbering in one place. The convention is a function whose last parameter
receives the rest of the document as content, invoked once near the top of
the file. This turns a house style into a reusable template that other
documents adopt by importing one file and calling one function, instead of
copying formatting rules around.

### Multi-file projects

Larger documents split across several files rather than one block of text:
one file holds the styling function, another the content, a main file
assembles them. Two keywords do this — one evaluates another file and
inserts its rendered output, the other imports functions or styling rules
so they can be called without rendering that file's content. The choice
depends on whether the goal is reusing a definition or including finished
prose.

## Figures, references and durable documents

### Figures and bibliographies

Numbered figures with captions come from a dedicated function that also
feeds an automatically generated table of contents or list of figures.
Citations work the same way: a bibliography file supplies the sources, and
the compiler formats in-text citations and the final reference list
consistently, so changing citation style is a one-line edit rather than a
manual pass over every reference. External packages extend this further,
for instance drawing diagrams directly in code instead of embedding
pixel-based images that need redrawing whenever they change.

### Why plain text behaves better

Because a Typst source file is plain text, it can be tracked with ordinary
version control: every change to wording or layout is a diff a reviewer
can read, conflicts are merged the same way as in any codebase, and the
history of a long document is not reduced to a folder of files named after
successive final versions. Such documents also travel well between
machines, since the source compiles to the same output anywhere the
compiler runs, without depending on fonts or settings hidden inside a
proprietary file format.
