---
title: Building a static website with semantic HTML and CSS
summary: Covers semantic HTML, readable CSS organization, Flexbox and Grid layout, responsive design, and building from a Figma specification.
tags:
  - html
  - css
  - flexbox
  - grid
  - semantic-html
updated: 2025-10-01
---

## Why a static site comes first

A static website — plain HTML and CSS, no server logic, no JavaScript — is a
common entry point into web development. It isolates two skills that later
projects build on: structuring content correctly and styling it without a
framework doing the work.

Removing JavaScript from the equation is deliberate. Apprentices cannot
reach for a script to fix a layout problem, so they must solve it with the
right HTML element or the right CSS property instead. That constraint
forces a solid grasp of the box model, selectors, and layout systems before
anything else is added.

Working from an existing design, rather than inventing one, also mirrors
front-end work in practice: a designer produces a specification and a
developer turns it into code. A Figma file plays that role, defining
exact spacing, font sizes, colors, and component boundaries. Reproducing
it faithfully trains a skill distinct from designing — reading
measurements out of a design tool and mapping them onto markup and rules.

## Semantic HTML as the foundation

### Why element choice matters

HTML tags carry meaning beyond how they render. A `nav`, a `header`, an
`article`, or a `button` tells the browser, assistive technologies, and
other developers what a piece of content *is*, not just how it looks.
Reaching for a generic container everywhere throws that meaning away.

Semantic markup has concrete payoffs: screen readers jump between
landmarks, and browsers apply sensible defaults — a `button` is
keyboard-operable for free, a generic clickable division is not. A page
should also read correctly before any CSS loads; building that skeleton
first keeps structure and style separate.

## Organizing CSS and choosing a layout system

### Keeping a stylesheet readable

As a stylesheet grows, unstructured rules turn into a maintenance problem:
duplicated declarations, overly specific selectors, and styles that only
make sense next to the element they target. Grouping rules by component,
naming classes for what an element represents rather than how it looks,
and favoring reusable classes over one-off selectors keeps a stylesheet
legible as it scales — a set of rules another developer can scan and
predict, not a growing pile of exceptions.

### Flexbox and Grid

Modern CSS offers two complementary layout systems. Flexbox distributes
elements along a single axis — a row of navigation links, a group of cards
that should wrap evenly — and excels at alignment within that axis. Grid
defines a two-dimensional structure of rows and columns at once, suited to
full-page layouts or any section that must line up on both axes.

Neither replaces the other; a typical page nests both, using Grid for
major regions and Flexbox for elements inside each region. Using either
removes the need for older techniques such as floats, which were never
designed for layout and need workarounds to behave predictably.

### Responsive design as a layout concern

Responsive design adapts a layout to different screen sizes rather than
fixing it to one resolution. It typically relies on relative units,
flexible containers, and media queries that change styling rules past
certain breakpoints. Flexbox and Grid make this easier because their
sizing is proportional by nature, rather than based on fixed pixel
positions.

A project can legitimately target a single resolution first and treat
responsiveness as a later concern, but early layout choices — semantic
structure, Flexbox and Grid over fixed positioning — decide how much
rework that later adaptation will require.
