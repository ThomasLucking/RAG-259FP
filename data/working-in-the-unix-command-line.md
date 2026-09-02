---
summary: Covers the shell versus the terminal, filesystem navigation, standard streams, pipes and redirection, permissions, and the move from commands to scripts.
tags:
  - unix
  - bash
  - shell
  - linux
updated: 2025-09-15
---

## Shell and terminal are not the same thing

A terminal is a window that displays text and forwards keystrokes; the shell
is the program that actually interprets what gets typed. On most Linux
distributions the default shell is bash, both an interactive command
interpreter and a small programming language. The terminal emulator hosts
the shell but has no idea what a command means — it just relays characters.

Understanding this split matters because a beginner tends to blame "the
terminal" when a command fails, when the failure usually comes from the
shell's parsing rules, the current working directory, or the program being
invoked. Swapping terminal emulators does not change how bash behaves,
because the shell is a separate program running inside the window.

## Navigating a hierarchical filesystem

UNIX-like systems organize everything under a single root, written `/`, with
no separate drive letters. Directories such as `/home`, `/etc`, `/usr`, or
`/var` each have a conventional role, and every file or directory has exactly
one absolute path describing how to reach it from the root.

A path can be absolute, starting at `/`, or relative to the shell's current
working directory. Two shorthand entries appear in every directory: `.` for
the current directory and `..` for its parent, which is why relative paths
often start with `../` to move upward before going back down another branch.

Apprentices are expected to move between directories, list their contents,
and create, rename, copy, or delete files and directories with confidence,
since almost every later exercise assumes fluent navigation.

## Standard streams, pipes, and redirection

Every command runs with three default channels: standard input, standard
output, and standard error. A program normally reads from standard input and
writes results to standard output, keeping error messages on a separate
channel so they do not get mixed into useful data.

Redirection operators let a user swap these channels for files instead of
the terminal: `>` sends output to a file, `>>` appends to it, and `<` feeds a
file in as input. The pipe operator, `|`, connects the standard output of
one command directly to the standard input of the next, which is how small,
single-purpose commands get combined into longer processing chains without
writing any intermediate file.

## Permissions and the step to scripting

Every file carries a set of permissions for its owner, its group, and
everyone else, covering the right to read, write, or execute it. Directories
use the execute bit differently: it controls whether a user can enter that
directory at all, not run it. Misreading permissions is a common source of
"command not found" or "permission denied" errors that have nothing to do
with the command itself.

Once a sequence of commands becomes repetitive, it stops being a set of
one-off manual actions and becomes a script: a plain text file, made
executable, containing bash instructions read and run in order. A script
introduces variables to hold values, conditions to branch on those values,
and loops to repeat a block over a list of items or files — the same
building blocks found in any programming language, applied to the shell.

The transition from typed commands to a script is less about new syntax and
more about a change in mindset: a script must run correctly on its own,
without a human present to notice and fix a mistake interactively.
