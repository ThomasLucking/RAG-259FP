---
title: Inside a modern development environment
summary: Describes the language server, syntax tree, formatter, linter, debugger, and build cache components that make up a modern code editor.
tags:
  - ide
  - lsp
  - tooling
  - debugging
updated: 2026-01-05
---

## An editor is an assembly, not a monolith

### Ten jobs, one window

A code editor looks like a single program, but most of what it shows on
screen comes from separate processes running alongside it. Syntax
highlighting, autocompletion, inline error markers, automatic
formatting, project-wide rename, and step-through debugging are each
handled by a distinct component, not by the editor's own code. The
editor mainly displays text, accepts keystrokes, and merges results
from those components into one interface.

### Interchangeable by design

None of these components know, or need to know, which editor launched
them. A tool built to serve one editor behaves identically when
connected to another, because it speaks a shared protocol rather than a
private plugin interface. When something misbehaves, the fix is to
identify and restart the one responsible piece, not the whole editor.

## Reading and understanding code

### The Language Server Protocol

Before a shared protocol existed, every editor needed its own plugin
for every language, so integrations to maintain grew with the product
of editors and languages. A standard protocol turns that multiplication
into addition: one language server per language, spoken by any editor
that implements the protocol. Editor and server exchange structured
messages — a file opened, text changed, a request for completions or
hover information at a position — and the server answers with
candidates, diagnostics, or documentation, neither side needing special
knowledge of the other. Since the server is a separate process,
restarting it rather than the editor is usually the fix when it stalls.

### Syntax trees for structure

Highlighting and navigation used to rely on pattern matching over raw
text, which breaks down quickly: a keyword inside a string, a comment
that looks like code, or a nested template can all fool a naive scan. A
syntax tree instead gives the editor a structural model of the file —
where each function, block, and string starts and ends — built
incrementally so a single keystroke never requires reparsing the whole
file. The editor then colors, selects, and folds code based on that
structure instead of guessing from patterns. A syntax tree describes
shape, not meaning, so it rarely explains a type error or an
unused-variable warning; those come from the tools below.

## Shaping, checking, running, and building code

### Formatters and linters

A formatter rearranges code without changing what it does: indentation,
line breaks, spacing, alignment. It never renames anything, adds logic,
or fixes a bug, and typically runs on save so a project's style stays
consistent as long as every contributor uses the same pinned version. A
linter asks a different question: does this code contain a risky
pattern, an unused binding, or a style violation worth flagging? Some
linters can apply a fix automatically, but their primary role is to
surface a problem, not to reformat correct code. A squiggle under a
line can come from a language server, a linter, or a compiler, and each
points to a different next step.

### The Debug Adapter Protocol

Debugging follows the same pattern as language intelligence: rather
than each editor building its own integration for each debugger, a
shared protocol lets one debug adapter per language work with any
editor that implements it. The editor sends commands — set a breakpoint
at a line, resume execution, request the current variables — and the
adapter drives the running program and reports back where execution
stopped and what the local state looks like, removing the need to
sprinkle temporary print statements through code just to see a value at
runtime.

### Build caches and fast linking

Compiled languages add two more components that live outside the editor
entirely. A build cache intercepts each compilation step, hashes its
inputs, and reuses a previous result when those inputs were already
compiled, sometimes by an unrelated project on the same machine. A fast
linker replaces the final step, where compiled pieces are assembled
into one binary, with an implementation tuned for speed on large
codebases. Neither tool changes program behavior; both shorten the wait
between saving a file and seeing the result.
