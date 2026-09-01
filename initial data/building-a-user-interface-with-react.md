---
title: Building a user interface with React
summary: Overview of the React component model, from JSX and props to hooks, list rendering, data fetching, and shared state stores.
tags:
  - react
  - components
  - hooks
  - jsx
  - frontend
updated: 2025-11-24
---

## From manual DOM updates to components

Early web interfaces are often built by writing HTML, then reaching into
the page with plain JavaScript or TypeScript to update elements when
something changes. This works for small pages, but it grows fragile: every
piece of interactivity needs its own code to find a node and patch it by
hand, and it becomes hard to know which code touched which part of the
page.

Component-based libraries such as React address this by inverting the
flow: a developer describes what the interface should look like for a
given state, and the library figures out which parts of the page need to
change. Angular, Vue, Svelte, and Solid follow variations of the same
idea; React remains one of the most widely adopted, with a large ecosystem
behind it.

## Components, props, and JSX

A React component is a function that returns a description of some part
of the interface. Components nest inside one another, so a full page is
usually a tree of smaller components. Data flows into a component through
props, which behave like function arguments; a parent decides what a
child receives and re-creates it whenever the relevant props change, which
keeps components reusable across the tree.

Most React code is written in JSX, a syntax extension that lets markup and
logic live in the same function. JSX looks like HTML but compiles down to
regular function calls, and it allows expressions and conditions to be
embedded directly where the markup is produced.

## State, hooks, and the render cycle

Props alone cannot express information that changes because of user
actions, such as a checkbox being ticked or a form field being edited. That
kind of data lives in local state, managed through a hook that stores a
value and a function to update it. Calling that function does not change
the interface in place; it tells the library that data has changed, and
the library recomputes what the component should render, compares it with
what is currently shown, and applies only the differences to the page. This
cycle repeats every time state or props change, removing the need to
manually locate and patch DOM nodes.

Hooks also cover side effects, work that must run after a component
appears on screen or after certain values change, such as synchronizing
with a browser API. Using hooks correctly requires a few rules, such as
always calling them in the same order, since the library relies on that
order to track each piece of state.

## Lists, data fetching, and outgrowing local state

Interfaces frequently render a collection of items, such as rows in a
table or cards in a list. Each rendered item should carry a stable, unique
key so the library can tell which item was added, removed, or reordered
between renders, rather than treating the whole list as new every time.
Interfaces also commonly need data that does not live in the browser, most
often fetched from a remote API: a component typically triggers a fetch as
a side effect when it first appears, stores the result in local state, and
re-renders once the response arrives, with loading and error conditions
handled the same way, as extra pieces of state.

Local state works well as long as data is only needed by one component and
its direct children. Once several unrelated parts of the interface need to
read or update the same information, passing it down through many props
layers becomes awkward, and applications commonly move that information
to a shared store: state kept outside any single component and read by
whichever component needs it, keeping components decoupled from one
another. Once built, such an application compiles down to static HTML,
CSS, and JavaScript files, which can be served from any static file host
without a server-side rendering step, keeping deployment simple.
