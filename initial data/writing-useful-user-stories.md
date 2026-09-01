---
title: Writing useful user stories
summary: Covers the As a/I want/so that shape, acceptance criteria, how epics, tasks and bugs differ from stories, and how to slice and estimate work without hiding technical tasks inside it.
tags:
  - agile
  - user-stories
  - project-management
updated: 2026-03-30
---

## Describing work from the user's point of view

A user story states a piece of work as something a user gets to do, not
as a technical instruction to a developer. The classic shape is: "As a
[persona], I want [goal], so that [benefit]." The persona names who is
affected, the goal names the action, and the benefit explains why the
action matters enough to prioritize. Teams often define personas ahead
of a project so that every story can point back to a concrete, if
fictional, user rather than an abstract "the system".

The benefit clause is often skipped by teams in a hurry, but it carries
real information: it tells reviewers why the story exists and helps them
judge whether a proposed acceptance criterion actually serves that
reason. A story without a "so that" clause reads like a command; a
story with one reads like a justified request.

## Acceptance criteria

Acceptance criteria are the conditions a story must satisfy before it
counts as done. They are usually written as "Given [a starting
situation], when [an action happens], then [a result is expected]."
Each criterion isolates one scenario, including edge cases and error
paths, so a developer knows what to build and a reviewer knows what to
check without re-reading the whole story.

A story can carry several criteria, and the list grows with the
complexity of the feature: a login story, for instance, needs criteria
for successful login, wrong credentials, missing fields, and alternate
paths such as pressing Enter instead of clicking a button. Criteria stay
about behavior visible to the user; they do not describe how the code is
structured internally.

## Epics, tasks, and bugs are different shapes of work

An epic is a large feature or group of features, broad enough to span
several sprints, and it is normally too big to finish or verify
directly. It groups related stories, carries a high-level acceptance
idea and a rough overall estimate, and links out to the stories that
implement it. Very large programs sometimes group epics again into
"initiatives".

A task is smaller and more technical than a story: it describes internal
work, such as setting up a database, without needing a user point of
view. Tasks exist to break a story or an epic into steps the development
team can pick up directly, and they still carry a description, an
estimate, and acceptance criteria of their own.

A bug report is a different kind of task again: it documents a defect
rather than new work. A useful bug report states the problem, the steps
that reproduce it, the expected behavior, the actual behavior, and the
environment in which it happened (software version, operating system,
browser). Screenshots or logs support the report but do not replace the
written description.

## Slicing, estimating, and spotting a disguised task

A story is only useful if it is small enough to finish inside a single
sprint; a story that quietly bundles a whole feature is really an epic
in disguise and needs splitting until each piece still reads as one
user outcome. A good slice keeps the "as a / I want / so that" sentence
true for a small, shippable behavior rather than for a whole workflow.

Teams rarely estimate stories in hours or days, since individual pace
varies too much for that to stay meaningful across a team. Instead they
use relative "story points": an arbitrary scale such as 1-2-3-4, T-shirt
sizes, or a Fibonacci-like sequence, chosen by the team itself to compare
the effort of one story against another. Priority levels such as High,
Medium, and Low sit alongside the estimate to decide sequencing.

The most common failure mode is a story written from the developer's
point of view instead of the user's: "create the users table" or "add
an index to speed up search" describe implementation, not a benefit
anyone outside the team can recognize. Such items are legitimate work,
but they belong to the task type, not the story type; forcing them into
the "as a user" template only hides that no user actually asked for
them.
