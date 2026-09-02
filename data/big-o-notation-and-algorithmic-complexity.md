---
title: Big O notation and algorithmic complexity
summary: Explains what Big O measures and ignores, the common growth classes, and why small inputs can favor a slower algorithm.
tags:
  - algorithms
  - complexity
  - performance
updated: 2026-04-14
---

## What Big O describes

Big O notation describes how the resource needs of an algorithm grow as
its input grows. It answers one question: as the input size n gets
larger, how many more operations, or how much more memory, does the
algorithm need? It is a statement about growth, not about absolute
speed. Two algorithms with the same Big O can run at different speeds on
the same machine; Big O only orders them by how they scale.

Because it targets growth rather than a specific runtime, Big O drops
information on purpose. Constant factors and lower-order terms
disappear: an algorithm that performs 5n + 20 operations is still
described as O(n), because as n grows without bound the 5 and the 20
stop mattering next to n itself. Two O(n) algorithms can still differ by
a large constant factor in practice, which is why real benchmarks stay
useful alongside the notation.

Big O usually describes the worst case: the input arrangement that
forces the most work. A search that finds its target on the first try
is not representative, so Big O generalizes from the hardest input to
handle, not the easiest.

## What it deliberately ignores

Big O ignores anything that does not change with the size of the
problem: hardware speed, programming language, compiler optimizations,
cache behavior, and one-time setup cost that runs regardless of n. Two
implementations of the same O(n) algorithm can differ tenfold in
wall-clock time and still share the same notation, because that factor
stays fixed as n grows.

It also ignores best-case and typical-case behavior unless stated
otherwise. Related notations exist for those situations — Big Omega for
best case and Big Theta for a tight bound in both directions — but Big O
alone is a ceiling: a description of how bad things can get, not a
promise of how they usually go.

## Common complexity classes

Algorithms are grouped into a small number of growth classes, each named
after the shape of its growth curve. From fastest to slowest for large n:

| Name | Notation | Example operation |
| --- | --- | --- |
| Constant | O(1) | Reading a value by array index |
| Logarithmic | O(log n) | Binary search in a sorted list |
| Linear | O(n) | Scanning a list once |
| Linearithmic | O(n log n) | Merge sort or quicksort on average |
| Quadratic | O(n^2) | Comparing every pair in a list |
| Exponential | O(2^n) | Trying every subset of a set |

These classes matter because they diverge quickly. Doubling the input
barely affects a logarithmic algorithm, doubles the work of a linear
one, and quadruples the work of a quadratic one. At small n the
difference is negligible; at large n it decides whether a program
finishes in a second or does not finish in reasonable time.

## Time, space, and choosing wisely

Big O applies to both time and space. Time complexity counts operations;
space complexity counts the extra memory an algorithm needs beyond its
input, such as auxiliary arrays, recursion stacks, or hash tables built
along the way. The two often trade off: an algorithm can run faster by
using more memory to remember previous results, or use less memory at
the cost of recomputing them.

A lower complexity class is not automatically the right choice. An
algorithm with worse asymptotic complexity can still run faster in
practice when the input is small, because its constant factors and
setup cost are lower and the input never grows large enough for the
asymptotic behavior to dominate. Sorting illustrates this well: many
practical libraries fall back to a simple quadratic sort for small
partitions and switch to an asymptotically better algorithm past a
threshold, because the simple one wins in that range.

Big O predicts which approach wins once the input is large enough, and
leaves the choice for small or predictable inputs to measurement.
