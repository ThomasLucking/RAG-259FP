---
title: Working well inside a development team
summary: Covers the human side of shared codebases, from communication and asking for help to code review, disagreement, and admitting mistakes.
tags:
  - teamwork
  - communication
  - code-review
  - collaboration
updated: 2026-03-04
---

## Communication and attitude

Working on a shared codebase is rarely blocked by tooling. It is
blocked by how people talk to each other about the work. Listening to
a teammate's idea, even one that clashes with a personal preference,
is a skill on its own, separate from having good ideas. Explaining a
position clearly matters just as much: stating the reasoning behind
it, not only the conclusion, lets others evaluate it instead of
guessing.

Trust is the resource that makes this possible. A team without trust
hesitates before raising problems, slowing down exactly when speed
matters most. It is built through small, repeated acts, such as doing
what was said and admitting uncertainty honestly, and it erodes far
faster than it forms.

## Asking for help and sharing knowledge

Knowing when to ask for help is a judgment call. Asking too early,
before trying anything, teaches nothing; asking too late wastes both
the apprentice's time and the team's. A reasonable middle ground is to
try, note what was attempted, and ask once the attempt produces a
specific obstacle rather than a vague feeling of being lost. Naming
what was tried, expected, and observed turns a vague "it doesn't
work" into something a teammate can reason about.

Knowledge sharing is the mirror image: someone who solves a tricky
problem and keeps the solution private creates a single point of
failure, since only they can fix it next time or explain it to a
newcomer. Teams that function well treat know-how as shared, through
pairing, short write-ups, or thinking aloud, rather than as a
personal advantage worth protecting.

## Code review without making it personal

Code review exists to catch problems and spread understanding of the
codebase, not to judge the person who wrote it. Framing comments
around the code, rather than the author, keeps the exchange useful:
"this function does two unrelated things" invites a fix, while "you
always overcomplicate things" invites defensiveness. Asking a
question instead of issuing a verdict, such as "what happens if this
list is empty?", often reveals the author already considered it, and
explaining why a change matters teaches something reusable for next
time. Receiving review well is its own skill: comments about the code
are not comments about competence, and a defensive reaction
discourages colleagues from reviewing carefully in the future.

## Disagreement and admitting mistakes

Disagreement about a technical decision is normal on a team that
cares about quality; its absence often signals that people stopped
speaking up, not that everyone agrees. Separating the decision from
the people involved helps: the goal is the option that serves the
project, not winning an argument or protecting an earlier choice out
of pride. When argument alone does not resolve things, naming the
actual trade-offs, time-boxing the discussion, or trying a reversible
option and revisiting it later all keep the team moving.

A team is safe enough for someone to admit a mistake when speaking up
costs less, visibly, than staying silent. That safety comes from
precedent: how the team reacted the last time someone said "I broke
the build." Teams that respond with blame teach people to hide
problems until they grow; teams that respond by fixing the issue
together teach people to surface problems early, while they are still
small and cheap to fix.
