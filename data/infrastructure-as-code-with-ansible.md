---
title: Infrastructure as code with Ansible
summary: Explains why describing a server's desired state in a file beats manual setup, and how Ansible applies that state over SSH.
tags:
  - ansible
  - infrastructure-as-code
  - devops
  - automation
updated: 2026-06-29
---

## The cost of configuring machines by hand

### A server only one person understands

A server built by typing commands one at a time works, but the
knowledge of how it was built lives only in the head of whoever typed
them. Nothing on disk records that a package was installed or a cron
job was added, so if that person leaves, the server becomes a black
box: functional today, unreproducible tomorrow. A crash or an expired
subscription then destroys the only record of its configuration, and
rebuilding it means guessing at steps nobody wrote down. Infrastructure
as code moves that description out of memory into a versioned text
file, which becomes the trusted source instead of the running machine.

### Drift between the file and reality

Even a server built from a script drifts once people touch it
directly: a file edited "just to test", a firewall rule added during
an incident and never removed. Infrastructure as code treats this
drift as a defect to correct rather than a fact to accept: because
the desired state is written down, a tool can compare it against the
real machine and reconcile the two, turning a server from a unique
artifact to nurse along into a disposable instance reapplied as
often as needed.

## Declarative state and idempotence

### Describing an end state instead of a sequence

An imperative script lists steps to take: install this package, start
this service, edit this file. It assumes a known starting point, and
if that assumption is wrong, or a step fails partway through, the
result is undefined — running the same script twice can produce a
different, sometimes broken, outcome.

A declarative description instead states the condition a machine
should be in: this package present, this service running, this file
containing this content. The tool reading it works out what must
change to reach that condition, and does nothing when the machine
already matches it, so the description stays valid no matter how many
times it is applied.

### Idempotence as the property that makes this work

Idempotence is the guarantee that applying the same description twice
produces the same result as applying it once: a tool that respects it
inspects the current state before acting, changes only what differs
from the target, and reports when nothing is left to do, making
reruns on a schedule, after an incident, or out of simple doubt a
safe, routine act rather than a risky one. Without it, a description
degrades into one-off actions that cannot be trusted to run twice.

## Applying desired state without agents

### Inventories, playbooks, and tasks

Ansible organizes a description around a few plain concepts: an
inventory lists the machines to manage, usually grouped by role, so a
description can target "the web servers" instead of naming hosts one
by one, and a playbook is the checklist itself, an ordered set of
tasks each naming the state a small part of a machine should be in,
such as a package being present or a file holding given content.

Each task delegates its work to a module, a small unit that knows how
to inspect and change one kind of thing — packages, users, files, or
scheduled jobs. Variables let one playbook adapt to different
targets, and templates combine variables with a file skeleton to
generate per-machine configuration from one shared definition.

### Roles, and no agent required

As a set of tasks grows, roles group related tasks, templates, and
variables into a reusable unit, so a "web server" or "database"
definition applies to any number of machines without duplicating its
content, letting a description scale from one server to a fleet.

Ansible needs nothing installed on managed machines beyond a working
SSH connection and a Python interpreter already present on most
systems: it connects over SSH, applies the described state, and
disconnects, keeping the target machine ordinary.

Once the file is accepted as the truth about a server, changing the
server starts with a change to that file, reviewed like any other
code, rather than a command typed directly into production. Anyone
on the team can see what a machine should look like without logging
into it, and rebuilding a machine stops depending on one person's
memory.
