---
title: Delivering a Laravel application as a Scrum team
summary: Overview of a capstone project where a team builds a Laravel app for a stakeholder using short Scrum sprints, rotating roles, and shared-codebase code review.
tags:
  - laravel
  - scrum
  - teamwork
  - code-review
updated: 2026-06-15
---

## A capstone built around a real stakeholder

This project is the largest team exercise of the training. A team of four to
six apprentices builds a full web application for a stakeholder who plays the
role of a client. Unlike earlier exercises, the product idea is not given in
advance: the team must contact the stakeholder, schedule a first meeting, and
discover the business need directly, the way a professional team would.

### Discovering the need instead of receiving it

The first responsibility of the team is organizational, not technical. Before
any code exists, apprentices prepare questions about goals, users,
constraints, priorities, and acceptance conditions, then run a kickoff
meeting. Only after that meeting does the team know what it is building,
mirroring how real mandates start: requirements are gathered, not assumed.

### A fixed technology stack

The application is built with Laravel, using its conventions for routing,
controllers, models, views, form validation, migrations, and authorization.
Fixing the stack removes one axis of decision-making so the team spends its
energy on collaboration, delivery, and product quality instead of debating
tools, while still applying Blade templates, Eloquent models, and migrations
consistently across a codebase that several people touch at once.

## Running the work as short Scrum cycles

The team organizes its work in three-day sprints, a much shorter cycle than a
typical two-week sprint. Short sprints force the team to keep scope small,
integrate work frequently, and get feedback from the stakeholder often rather
than accumulating a large amount of unreviewed work between demonstrations.

### Roles that rotate

At the start, the team chooses who acts as Product Owner, Scrum Master, and
Developers. These roles rotate every two sprints, so several apprentices
practice backlog ownership, facilitation, and coordination rather than one
person settling permanently into a single function. A retrospective at each
rotation point produces concrete improvement actions for the next cycle.

### A backlog that turns into demonstrable increments

Every sprint must end with something that runs and can be shown to the
stakeholder, not a set of half-finished features. This shapes how the backlog
is written: user stories need clear acceptance criteria, work is sliced small
enough to finish inside three days, and the team prioritizes what proves value
early over what looks technically interesting. Feedback from each sprint
review feeds back into the backlog, so the product evolves through repeated,
visible checkpoints instead of a single handover at the end.

## Collaborating on one codebase

Because the whole team commits to a single Laravel repository, the project
also exercises collaboration mechanics that smaller solo projects do not
require: consistent branching, pull requests, and reviews that keep a shared
history readable.

### Working across different experience levels

Team members rarely arrive with the same amount of prior Laravel practice.
Rather than treating this as a problem to route around, the project expects
more experienced apprentices to mentor others and pair on the hardest parts —
architecture, authentication, authorization, data modelling — instead of
quietly doing the work alone. Distributing tasks fairly while accounting for
uneven skill levels is itself part of what the project evaluates.

### Branching, review, and integration discipline

Work happens on branches tied to backlog issues, merged through pull requests
that another team member reviews before integration. This keeps the codebase
in a state where any member can run it locally at any time, following setup
instructions in the README. Regular, reviewed integration also reduces the
risk that a sprint ends with unmerged or conflicting work, threatening the
sprint's demonstrable increment. Generative tools may support understanding
or debugging, but analysis and code review remain the team's own work.
